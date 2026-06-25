import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const IconHome = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const IconKey = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
const IconBriefcase = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
const IconBuilding = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
const IconOffice = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><rect x="9" y="14" width="6" height="8"/></svg>
const IconChart = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>

const Services = () => {
  const { t } = useTranslation()

  const services = [
    { icon: <IconHome />,     key: 'buy',        link: '/buy',        color: '#2d5fc4', bg: 'rgba(45,95,196,0.12)' },
    { icon: <IconKey />,      key: 'rent',       link: '/rent',       color: '#27ae60', bg: 'rgba(39,174,96,0.12)' },
    { icon: <IconBriefcase />,key: 'sell',       link: '/sell',       color: '#e67e22', bg: 'rgba(230,126,34,0.12)' },
    { icon: <IconBuilding />, key: 'offplan',    link: '/properties', color: '#8e44ad', bg: 'rgba(142,68,173,0.12)' },
    { icon: <IconOffice />,   key: 'commercial', link: '/commercial', color: '#16a085', bg: 'rgba(22,160,133,0.12)' },
    { icon: <IconChart />,    key: 'valuation',  link: '/contact',    color: '#c0392b', bg: 'rgba(192,57,43,0.12)' },
  ]

  return (
    <section style={{ backgroundColor: '#0a1630', padding: '90px 0' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('services.badge')}</span>
          </div>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', marginBottom: '6px' }}>{t('services.title1')}</h2>
          <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '16px' }}>{t('services.title2')}</h2>
          <p style={{ color: '#8aafd4', fontSize: '1rem', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>{t('services.subtitle')}</p>
        </div>

        <Row className="g-4">
          {services.map((service, i) => (
            <Col key={i} lg={4} md={6}>
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.2)', borderRadius: '16px', padding: '32px 28px', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.25s ease', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = service.color; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 20px 50px ${service.color}20` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.2)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: service.color, opacity: 0.06, filter: 'blur(30px)' }} />
                <div style={{ width: '60px', height: '60px', borderRadius: '14px', backgroundColor: service.bg, border: `1px solid ${service.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: service.color, marginBottom: '20px' }}>
                  {service.icon}
                </div>
                <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: '700', marginBottom: '12px' }}>
                  {t(`services.items.${service.key}.title`)}
                </h4>
                <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.7', flex: 1, marginBottom: '24px' }}>
                  {t(`services.items.${service.key}.desc`)}
                </p>
                <Link to={service.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: service.color, fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none', transition: 'gap 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                >
                  {t(`services.items.${service.key}.link`)} →
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Services