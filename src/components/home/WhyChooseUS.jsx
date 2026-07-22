import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const WhyChooseUs = () => {
  const { t } = useTranslation()

  const reasons = [
    { icon: '🏆', key: 'exclusive',  color: '#2d5fc4' },
    { icon: '📊', key: 'expertise',  color: '#27ae60' },
    { icon: '✅', key: 'trusted',    color: '#e67e22' },
    { icon: '🌍', key: 'global',     color: '#8e44ad' },
    { icon: '🤝', key: 'support',    color: '#4a90d9' },
    { icon: '⚡', key: 'fast',       color: '#f1c40f' },
  ]

  const stats = [
    { number: '18+',    label: 'Years in Dubai Market' },
    { number: '1,500+', label: 'Properties Listed' },
    { number: '40+',    label: 'Nationalities Served' },
    { number: '100%',   label: 'RERA Compliant' },
  ]

  return (
    <section style={{ backgroundColor: '#060f26', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.04, filter: 'blur(120px)', pointerEvents: 'none' }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('why.badge')}</span>
          </div>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', marginBottom: '6px' }}>{t('why.title1')}</h2>
          <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '16px' }}>{t('why.title2')}</h2>
          <p style={{ color: '#8aafd4', fontSize: '1rem', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>{t('why.subtitle')}</p>
        </div>

        {/* Reasons Grid */}
        <Row className="g-4" style={{ marginBottom: '56px' }}>
          {reasons.map((r, i) => (
            <Col key={i} lg={4} md={6}>
              <div style={{
                backgroundColor: '#0d1f4e',
                border: `1px solid ${r.color}25`,
                borderRadius: '16px', padding: '28px 24px',
                height: '100%', transition: 'all 0.3s ease',
                cursor: 'default'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${r.color}60`
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = `0 16px 40px ${r.color}15`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${r.color}25`
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                {/* Icon */}
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', backgroundColor: `${r.color}20`, border: `1px solid ${r.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '18px', transition: 'all 0.3s ease' }}>
                  {r.icon}
                </div>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '10px' }}>
                  {t(`why.reasons.${r.key}.title`)}
                </h3>
                <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.75', margin: 0 }}>
                  {t(`why.reasons.${r.key}.desc`)}
                </p>
              </div>
            </Col>
          ))}
        </Row>

        {/* Stats Strip */}
        <div style={{ background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 100%)', border: '1px solid rgba(74,144,217,0.25)', borderRadius: '16px', padding: '32px 40px' }}>
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <h3 style={{ color: '#ffffff', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: '700', marginBottom: '8px' }}>
                Trusted by investors from <span style={{ color: '#4a90d9' }}>40+ countries</span>
              </h3>
              <p style={{ color: '#8aafd4', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '20px' }}>
                From first-time buyers to seasoned investors, Lazord Real Estate has helped thousands find their perfect Dubai property since 2007.
              </p>
              <Link to="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#2d5fc4', color: '#fff', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem', transition: 'background 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}>
                Start Your Journey →
              </Link>
            </Col>
            <Col lg={6}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {stats.map((s, i) => (
                  <div key={i} style={{ backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.2)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                    <div style={{ color: '#4a90d9', fontSize: '1.8rem', fontWeight: '800', lineHeight: '1' }}>{s.number}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.75rem', marginTop: '6px', lineHeight: '1.4' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>

      </Container>
    </section>
  )
}

export default WhyChooseUs