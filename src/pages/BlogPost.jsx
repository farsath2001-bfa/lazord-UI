import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import RichText from '../components/common/RichText'
import { fetchPostBySlug, fetchPosts, localized, readingMinutes } from '../utils/postsApi'
import { optimizeImg } from '../utils/img'

const SITE_URL = 'https://lazord-ui.vercel.app' // keep in sync with components/SEO.jsx

const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

const BlogPost = () => {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'
  const [state, setState] = useState({ slug: null, post: null, notFound: false })
  const [related, setRelated] = useState([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchPostBySlug(slug)
      .then(post => { if (!cancelled) setState({ slug, post, notFound: false }) })
      .catch(() => { if (!cancelled) setState({ slug, post: null, notFound: true }) })
    fetchPosts().then(list => { if (!cancelled) setRelated(list.filter(p => p.slug !== slug).slice(0, 3)) }).catch(() => {})
    return () => { cancelled = true }
  }, [slug])

  const loading = state.slug !== slug
  const { post, notFound } = state

  if (!loading && notFound) {
    return (
      <div style={{ backgroundColor: '#060f26', minHeight: '70vh', padding: '80px 0', textAlign: 'center' }}>
        <SEO title={t('blog.notFound')} description="" path={`/blog/${slug}`} noindex />
        <h1 style={{ color: '#fff' }}>{t('blog.notFound')}</h1>
        <Link to="/blog" style={{ color: '#e0bf6a' }}>← {t('blog.back')}</Link>
      </div>
    )
  }
  if (loading || !post) {
    return <div style={{ backgroundColor: '#060f26', minHeight: '70vh', padding: '80px 0', textAlign: 'center', color: '#8aafd4' }}>{t('common.loading')}</div>
  }

  const title = localized(post, 'title', isAr)
  const content = localized(post, 'content', isAr)
  const excerpt = localized(post, 'excerpt', isAr)
  const url = `${SITE_URL}/blog/${post.slug}`

  const copy = () => {
    try { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* clipboard unavailable */ }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: post.author || 'Lazord Real Estate' },
    publisher: { '@type': 'Organization', name: 'Lazord Real Estate' },
    mainEntityOfPage: url,
  }

  return (
    <>
      <SEO title={title} description={excerpt} path={`/blog/${post.slug}`} image={post.coverImage || undefined} />
      <Helmet><script type="application/ld+json">{JSON.stringify(jsonLd)}</script></Helmet>

      <div style={{ backgroundColor: '#060f26', paddingBottom: '80px' }}>
        <div style={{ backgroundImage: post.coverImage ? `linear-gradient(rgba(6,15,38,0.72), rgba(6,15,38,0.96)), url(${optimizeImg(post.coverImage, 1600)})` : 'linear-gradient(#0d1f4e, #060f26)', backgroundSize: 'cover', backgroundPosition: 'center', padding: '64px 0 44px' }}>
          <Container style={{ maxWidth: '820px' }}>
            <Link to="/blog" style={{ color: '#8aafd4', fontSize: '0.82rem', textDecoration: 'none' }}>← {t('blog.back')}</Link>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: '#8aafd4', fontSize: '0.78rem', margin: '14px 0 10px', flexWrap: 'wrap' }}>
              {post.category && <span style={{ color: '#e0bf6a', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.7rem' }}>{post.category}</span>}
              <span>{fmtDate(post.publishedAt)}</span>
              <span>· {t('blog.minRead', { n: readingMinutes(content) })}</span>
            </div>
            <h1 style={{ color: '#fff', fontSize: 'clamp(1.7rem, 4vw, 2.6rem)', fontWeight: 700, lineHeight: 1.25, margin: 0 }}>{title}</h1>
          </Container>
        </div>

        <Container style={{ maxWidth: '820px', paddingTop: '34px' }}>
          <RichText text={content} />

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', margin: '34px 0', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ color: '#8aafd4', fontSize: '0.82rem' }}>{t('blog.share')}</span>
            <a href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer"
              style={{ border: '1px solid rgba(37,211,102,0.4)', color: '#4cd48a', borderRadius: '10px', padding: '7px 14px', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}>WhatsApp</a>
            <button type="button" onClick={copy}
              style={{ background: 'transparent', border: '1px solid rgba(74,144,217,0.4)', color: '#8aafd4', borderRadius: '10px', padding: '7px 14px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>
              {copied ? t('blog.copied') : t('blog.copy')}
            </button>
          </div>

          <div style={{ background: 'linear-gradient(160deg, #0f2456, #0a1840)', border: '1px solid rgba(201,162,75,0.3)', borderRadius: '18px', padding: '26px', textAlign: 'center' }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>{t('blog.ctaTitle')}</h3>
            <p style={{ color: '#8aafd4', fontSize: '0.9rem', marginBottom: '16px' }}>{t('blog.ctaText')}</p>
            <Link to="/contact" style={{ background: 'linear-gradient(135deg, #e9d6a3, #c9a24b)', color: '#0a1630', padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 800, fontSize: '0.9rem' }}>{t('blog.ctaBtn')}</Link>
          </div>

          {related.length > 0 && (
            <>
              <h3 style={{ color: '#fff', fontSize: '1.15rem', margin: '44px 0 14px' }}>{t('blog.more')}</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {related.map(p => (
                  <Link key={p._id} to={`/blog/${p.slug}`} style={{ textDecoration: 'none', background: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '14px', padding: '14px 18px', display: 'block' }}>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>{localized(p, 'title', isAr)}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.8rem', marginTop: '4px' }}>{localized(p, 'excerpt', isAr)}</div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </Container>
      </div>
    </>
  )
}

export default BlogPost
