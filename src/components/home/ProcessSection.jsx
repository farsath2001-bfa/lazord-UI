import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ProcessSection = () => {
  const { t } = useTranslation()

  const steps = [
    { number: '01', icon: '🤝', color: '#2d5fc4', titleKey: 'process.steps.consultation.title', descKey: 'process.steps.consultation.desc' },
    { number: '02', icon: '🔍', color: '#27ae60', titleKey: 'process.steps.search.title',       descKey: 'process.steps.search.desc' },
    { number: '03', icon: '🏠', color: '#e67e22', titleKey: 'process.steps.viewing.title',      descKey: 'process.steps.viewing.desc' },
    { number: '04', icon: '🔑', color: '#8e44ad', titleKey: 'process.steps.close.title',        descKey: 'process.steps.close.desc' },
  ]

  const guarantees = [
    t('process.guarantee.items.rera'),
    t('process.guarantee.items.valuation'),
    t('process.guarantee.items.fees'),
    t('process.guarantee.items.docs'),
    t('process.guarantee.items.team'),
    t('process.guarantee.items.support'),
  ]

  return (
    <section style={{ backgroundColor: '#060f26', padding: '40px 0' }}>
      <Container>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('process.badge')}</span>
          </div>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', marginBottom: '6px' }}>{t('process.title1')}</h2>
          <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '16px' }}>{t('process.title2')}</h2>
          <p style={{ color: '#8aafd4', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7' }}>{t('process.subtitle')}</p>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative', marginBottom: '80px' }}>
          <div style={{ position: 'absolute', top: '48px', left: '12.5%', right: '12.5%', height: '2px', background: 'linear-gradient(to right, #2d5fc4, #27ae60, #e67e22, #8e44ad)', opacity: 0.3, zIndex: 0 }} className="d-none d-lg-block" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', position: 'relative', zIndex: 1 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
                  <div style={{ width: '96px', height: '96px', borderRadius: '50%', backgroundColor: '#0d1f4e', border: `2px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', boxShadow: `0 0 30px ${step.color}30`, margin: '0 auto', transition: 'all 0.3s ease', cursor: 'default' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 50px ${step.color}60`; e.currentTarget.style.transform = 'scale(1.08)' }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 30px ${step.color}30`; e.currentTarget.style.transform = 'scale(1)' }}>
                    {step.icon}
                  </div>
                  <div style={{ position: 'absolute', top: '-6px', right: '-6px', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '0.7rem', fontWeight: '800' }}>
                    {step.number}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="d-lg-none" style={{ color: '#4a4a6a', fontSize: '1.5rem', marginBottom: '8px' }}>↓</div>
                )}
                <h3 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: '700', marginBottom: '10px' }}>{t(step.titleKey)}</h3>
                <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.7', margin: '0 auto', maxWidth: '220px' }}>{t(step.descKey)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Guarantee */}
        <div style={{ background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 100%)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '20px', padding: 'clamp(28px, 4vw, 48px)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '48px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '240px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
                <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('process.guarantee.badge')}</span>
              </div>
              <h3 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: '300', marginBottom: '6px' }}>{t('process.guarantee.title1')}</h3>
              <h3 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: '800', marginBottom: '16px' }}>{t('process.guarantee.title2')}</h3>
              <p style={{ color: '#8aafd4', fontSize: '0.92rem', lineHeight: '1.8', marginBottom: '24px' }}>{t('process.guarantee.desc')}</p>
              <Link to="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#2d5fc4', color: '#fff', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem', transition: 'background 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}>
                {t('process.guarantee.cta')} →
              </Link>
            </div>
            <div style={{ flex: '1', minWidth: '240px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {guarantees.map((g, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(45,95,196,0.1)', border: '1px solid rgba(74,144,217,0.2)', borderRadius: '10px', padding: '12px 16px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(39,174,96,0.2)', border: '1px solid rgba(39,174,96,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', color: '#27ae60', fontWeight: '800' }}>✓</div>
                    <span style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: '600' }}>{g}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </Container>
    </section>
  )
}

export default ProcessSection