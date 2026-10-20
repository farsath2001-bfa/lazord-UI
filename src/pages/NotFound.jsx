import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import SEO from '../components/SEO'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <>
      <SEO
        title={t('notFound.seoTitle')}
        description={t('notFound.seoDesc')}
        path="/404"
        noindex
      />
      <div style={{ backgroundColor: '#060f26', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

        {/* Grid overlay, matches other page heroes */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(45,95,196,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(45,95,196,0.06) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '360px', height: '360px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.1, filter: 'blur(90px)' }} />
        <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '360px', height: '360px', borderRadius: '50%', backgroundColor: '#4a90d9', opacity: 0.08, filter: 'blur(90px)' }} />

        <Container style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '20px' }}>
          <div style={{
            fontSize: 'clamp(4rem, 12vw, 8rem)', fontWeight: '800',
            background: 'linear-gradient(135deg, #2d5fc4, #4a90d9)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            lineHeight: 1, marginBottom: '8px'
          }}>
            404
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '20px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>{t('notFound.badge')}</span>
          </div>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '700', marginBottom: '12px' }}>
            {t('notFound.title')}
          </h1>
          <p style={{ color: '#8aafd4', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto 32px', lineHeight: '1.7' }}>
            {t('notFound.desc')}
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" style={{ backgroundColor: '#2d5fc4', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', boxShadow: '0 6px 20px rgba(45,95,196,0.3)' }}>
              {t('notFound.home')}
            </Link>
            <Link to="/properties" style={{ backgroundColor: 'transparent', color: '#ffffff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.92rem', border: '1.5px solid rgba(255,255,255,0.25)' }}>
              {t('notFound.browse')}
            </Link>
          </div>
        </Container>
      </div>
    </>
  )
}

export default NotFound