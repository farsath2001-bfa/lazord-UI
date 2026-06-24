import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const WhyChooseUs = () => {
  const { t } = useTranslation()

  const stats = [
    { number: '1,500+',  label: t('hero.stats.properties'), icon: '🏙️' },
    { number: '1,200+',  label: t('hero.stats.clients'),    icon: '🤝' },
    { number: '22+',     label: t('hero.stats.experience'), icon: '🏆' },
    { number: 'AED 2B+', label: 'Deals Closed',             icon: '💰' },
  ]

  const reasons = [
    { icon: '🔑', key: 'exclusive' },
    { icon: '📊', key: 'expertise' },
    { icon: '🛡️', key: 'trusted' },
    { icon: '🌍', key: 'global' },
    { icon: '💬', key: 'support' },
    { icon: '⚡', key: 'fast' },
  ]

  return (
    <section style={{ backgroundColor: '#0a1630', padding: '90px 0' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(45,95,196,0.15)',
            border: '1px solid rgba(74,144,217,0.3)',
            borderRadius: '30px', padding: '5px 14px', marginBottom: '16px'
          }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>
              ✦ {t('why.badge')}
            </span>
          </div>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', marginBottom: '6px' }}>
            {t('why.title1')}
          </h2>
          <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '16px' }}>
            {t('why.title2')}
          </h2>
          <p style={{ color: '#8aafd4', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7' }}>
            {t('why.subtitle')}
          </p>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
          backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)',
          borderRadius: '16px', padding: '32px 40px', marginBottom: '64px'
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', flex: '1', minWidth: '140px', position: 'relative' }}>
              <div style={{ fontSize: '2rem', marginBottom: '6px' }}>{stat.icon}</div>
              <div style={{ color: '#ffffff', fontSize: '2rem', fontWeight: '800', lineHeight: '1', marginBottom: '6px' }}>{stat.number}</div>
              <div style={{ color: '#8aafd4', fontSize: '0.82rem' }}>{stat.label}</div>
              {i < stats.length - 1 && (
                <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '1px', height: '60px', backgroundColor: 'rgba(45,95,196,0.3)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Reasons */}
        <Row className="g-4">
          {reasons.map((item, i) => (
            <Col key={i} lg={4} md={6}>
              <div style={{
                backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)',
                borderRadius: '14px', padding: '28px 24px', height: '100%', transition: 'all 0.25s ease'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(45,95,196,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '12px',
                  backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', marginBottom: '18px'
                }}>
                  {item.icon}
                </div>
                <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '10px' }}>
                  {t(`why.reasons.${item.key}.title`)}
                </h4>
                <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.7', margin: 0 }}>
                  {t(`why.reasons.${item.key}.desc`)}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default WhyChooseUs