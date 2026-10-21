import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import { fetchPosts, localized } from '../utils/postsApi'
import { optimizeImg } from '../utils/img'

const FALLBACK = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80'

const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''

const Card = ({ p, big, isAr, t }) => (
  <Link to={`/blog/${p.slug}`} className="bl-card" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
    <div className={`bl-box${big ? ' big' : ''}`}>
      <div className="bl-img" style={{ backgroundImage: `url(${optimizeImg(p.coverImage || FALLBACK, big ? 1100 : 640)})` }} />
      <div className="bl-body">
        <div className="bl-meta">
          {p.category && <span className="bl-cat">{p.category}</span>}
          <span>{fmtDate(p.publishedAt)}</span>
        </div>
        <h3 className="bl-title">{localized(p, 'title', isAr)}</h3>
        <p className="bl-excerpt">{localized(p, 'excerpt', isAr)}</p>
        <span className="bl-read">{t('blog.read')} →</span>
      </div>
    </div>
  </Link>
)

const Blog = () => {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState(false)
  const [cat, setCat] = useState('All')

  useEffect(() => {
    let cancelled = false
    fetchPosts()
      .then(list => { if (!cancelled) setPosts(list) })
      .catch(() => { if (!cancelled) setError(true) })
    return () => { cancelled = true }
  }, [])

  const categories = posts ? ['All', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))] : ['All']
  const shown = (posts || []).filter(p => cat === 'All' || p.category === cat)
  const [first, ...rest] = shown

  return (
    <>
      <SEO title={t('blog.seoTitle')} description={t('blog.seoDesc')} path="/blog" />
      <div style={{ backgroundColor: '#060f26', minHeight: '80vh', paddingBottom: '80px' }}>
        <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '32px 0 24px' }}>
          <Container>
            <div style={{ display: 'inline-flex', backgroundColor: 'rgba(201,162,75,0.12)', border: '1px solid rgba(201,162,75,0.4)', borderRadius: '30px', padding: '5px 14px', marginBottom: '10px' }}>
              <span style={{ color: '#e0bf6a', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{t('blog.badge')}</span>
            </div>
            <h1 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: '4px' }}>{t('blog.title')}</h1>
            <p style={{ color: '#8aafd4', fontSize: '0.9rem', margin: 0 }}>{t('blog.subtitle')}</p>
          </Container>
        </div>

        <Container style={{ paddingTop: '28px' }}>
          {categories.length > 2 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {categories.map(c => (
                <button key={c} type="button" onClick={() => setCat(c)}
                  style={{ background: cat === c ? 'rgba(201,162,75,0.16)' : 'transparent', border: `1px solid ${cat === c ? '#c9a24b' : 'rgba(74,144,217,0.3)'}`, color: cat === c ? '#f0dca0' : '#8aafd4', borderRadius: '999px', padding: '6px 16px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                  {c === 'All' ? t('blog.all') : c}
                </button>
              ))}
            </div>
          )}

          {posts === null && !error && <p style={{ color: '#8aafd4' }}>{t('common.loading')}</p>}
          {error && <p style={{ color: '#8aafd4' }}>{t('blog.error')}</p>}
          {posts && shown.length === 0 && <p style={{ color: '#8aafd4' }}>{t('blog.empty')}</p>}

          {first && (
            <div style={{ marginBottom: '28px' }}><Card p={first} big isAr={isAr} t={t} /></div>
          )}
          {rest.length > 0 && (
            <Row className="g-4">
              {rest.map(p => <Col md={6} lg={4} key={p._id}><Card p={p} isAr={isAr} t={t} /></Col>)}
            </Row>
          )}
        </Container>
      </div>

      <style>{`
        .bl-box { background: #0d1f4e; border: 1px solid rgba(45,95,196,0.25); border-radius: 18px; overflow: hidden; height: 100%; transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
        .bl-card:hover .bl-box { transform: translateY(-4px); border-color: #c9a24b; box-shadow: 0 18px 40px -22px rgba(201,162,75,0.6); }
        .bl-img { height: 190px; background-size: cover; background-position: center; }
        .bl-box.big { display: grid; grid-template-columns: 1.1fr 1fr; }
        .bl-box.big .bl-img { height: 100%; min-height: 280px; }
        .bl-body { padding: 20px 22px 22px; }
        .bl-meta { display: flex; gap: 12px; align-items: center; color: #6f8db3; font-size: 0.75rem; margin-bottom: 10px; }
        .bl-cat { color: #e0bf6a; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; font-size: 0.68rem; }
        .bl-title { color: #fff; font-size: 1.1rem; font-weight: 700; line-height: 1.35; margin: 0 0 8px; }
        .bl-box.big .bl-title { font-size: clamp(1.3rem, 2.4vw, 1.8rem); }
        .bl-excerpt { color: #8aafd4; font-size: 0.88rem; line-height: 1.7; margin: 0 0 14px; }
        .bl-read { color: #e0bf6a; font-size: 0.82rem; font-weight: 700; }
        @media (max-width: 820px) { .bl-box.big { grid-template-columns: 1fr; } .bl-box.big .bl-img { min-height: 200px; height: 200px; } }
      `}</style>
    </>
  )
}

export default Blog
