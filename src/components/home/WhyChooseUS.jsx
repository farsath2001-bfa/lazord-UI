import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import CounterNumber from '../common/CounterNumber'

const IconKey = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
const IconChart = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
const IconShield = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const IconGlobe = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
const IconHeadset = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
const IconZap = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>

const WhyChooseUs = () => {
  const { t } = useTranslation()

  const stats = [
    { number: <CounterNumber target={1500} suffix="+" duration={2000} />, label: t('hero.stats.properties'), icon: <IconChart /> },
    { number: <CounterNumber target={1200} suffix="+" duration={2200} />, label: t('hero.stats.clients'),    icon: <IconHeadset /> },
    { number: <CounterNumber target={22}   suffix="+" duration={1500} />, label: t('hero.stats.experience'), icon: <IconShield /> },
    { number: <><CounterNumber target={2}  prefix="AED " suffix="B+" duration={1800} /></>, label: 'Deals Closed', icon: <IconKey /> },
  ]

  const reasons = [
    { icon: <IconKey />,     key: 'exclusive', color: '#2d5fc4' },
    { icon: <IconChart />,   key: 'expertise', color: '#27ae60' },
    { icon: <IconShield />,  key: 'trusted',   color: '#e67e22' },
    { icon: <IconGlobe />,   key: 'global',    color: '#8e44ad' },
    { icon: <IconHeadset />, key: 'support',   color: '#16a085' },
    { icon: <IconZap />,     key: 'fast',      color: '#2d5fc4' },
  ]

  return (
    <section style={{ backgroundColor: '#0a1630', padding: '90px 0' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('why.badge')}</span>
          </div>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', marginBottom: '6px' }}>{t('why.title1')}</h2>
          <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '16px' }}>{t('why.title2')}</h2>
          <p style={{ color: '#8aafd4', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7' }}>{t('why.subtitle')}</p>
        </div>

        {/* Stats Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '16px', padding: '32px 40px', marginBottom: '64px' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', flex: '1', minWidth: '140px', position: 'relative' }}>
              <div style={{ color: '#4a90d9', display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>{stat.icon}</div>
              <div style={{ color: '#ffffff', fontSize: '2rem', fontWeight: '800', lineHeight: '1', marginBottom: '6px' }}>{stat.number}</div>
              <div style={{ color: '#8aafd4', fontSize: '0.82rem' }}>{stat.label}</div>
              {i < stats.length - 1 && (
                <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '1px', height: '60px', backgroundColor: 'rgba(45,95,196,0.3)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Reasons Grid */}
        <Row className="g-4">
          {reasons.map((item, i) => (
            <Col key={i} lg={4} md={6}>
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '14px', padding: '28px 24px', height: '100%', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${item.color}20` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', backgroundColor: `${item.color}20`, border: `1px solid ${item.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, marginBottom: '18px' }}>
                  {item.icon}
                </div>
                <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '10px' }}>{t(`why.reasons.${item.key}.title`)}</h4>
                <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.7', margin: 0 }}>{t(`why.reasons.${item.key}.desc`)}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default WhyChooseUs