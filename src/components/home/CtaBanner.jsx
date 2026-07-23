import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const CTABanner = () => {
  const { t } = useTranslation()

  const badges = [
    { icon: '🏅', key: 'rera' },
    { icon: '🔒', key: 'secure' },
    { icon: '🌍', key: 'nationalities' },
    { icon: '⭐', key: 'rating' },
  ]

  return (
    <section style={{ backgroundColor: '#0a1630', padding: '40px 0' }}>
      <Container>
        <div style={{
          background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 50%, #0d1f4e 100%)',
          border: '1px solid rgba(74,144,217,0.3)', borderRadius: '24px',
          padding: '70px 60px', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.08, filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', backgroundColor: '#4a90d9', opacity: 0.06, filter: 'blur(60px)' }} />

          <Row className="align-items-center g-4">
            <Col lg={7}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.4)', borderRadius: '30px', padding: '5px 14px', marginBottom: '20px' }}>
                <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('cta.badge')}</span>
              </div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', marginBottom: '6px' }}>{t('cta.title1')}</h2>
              <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '20px' }}>{t('cta.title2')}</h2>
              <p style={{ color: '#8aafd4', fontSize: '1rem', lineHeight: '1.7', maxWidth: '480px' }}>{t('cta.subtitle')}</p>
            </Col>
            <Col lg={5}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <a href="https://wa.me/+971 56 111 9233 " target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#25d366', color: '#fff', padding: '16px 28px', borderRadius: '12px', fontSize: '0.95rem', fontWeight: '700', textDecoration: 'none', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1ebe5d'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#25d366'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  💬 {t('cta.whatsapp')}
                </a>
                <Link to="/contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#2d5fc4', color: '#fff', padding: '16px 28px', borderRadius: '12px', fontSize: '0.95rem', fontWeight: '700', textDecoration: 'none', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1a3a7c'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#2d5fc4'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  📅 {t('cta.book')}
                </Link>
                <a href="tel:+971 42 999 088 " style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: 'transparent', color: '#ffffff', padding: '16px 28px', borderRadius: '12px', fontSize: '0.95rem', fontWeight: '600', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.25)', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.color = '#4a90d9'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  📞 {t('cta.call')}
                </a>
              </div>
            </Col>
          </Row>

          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginTop: '20px', paddingTop: '32px', borderTop: '1px solid rgba(45,95,196,0.2)' }}>
            {badges.map((badge, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.1rem' }}>{badge.icon}</span>
                <span style={{ color: '#8aafd4', fontSize: '0.82rem', fontWeight: '500' }}>{t(`cta.badges.${badge.key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CTABanner