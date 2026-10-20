import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import { AREA_META, AREA_SLUGS, areaGuides } from '../data/areaGuides'

const Areas = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'ar' ? 'ar' : 'en'
  return (
    <>
      <SEO title={t('areas.seoTitle')} description={t('areas.seoDesc')} path="/areas" />
      <div style={{ backgroundColor: '#060f26', minHeight: '80vh', paddingBottom: '80px' }}>
        <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '32px 0 24px' }}>
          <Container>
            <div style={{ display: 'inline-flex', backgroundColor: 'rgba(201,162,75,0.12)', border: '1px solid rgba(201,162,75,0.4)', borderRadius: '30px', padding: '5px 14px', marginBottom: '10px' }}>
              <span style={{ color: '#e0bf6a', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{t('areas.badge')}</span>
            </div>
            <h1 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: '4px' }}>{t('areas.title')}</h1>
            <p style={{ color: '#8aafd4', fontSize: '0.9rem', margin: 0 }}>{t('areas.subtitle')}</p>
          </Container>
        </div>
        <Container style={{ paddingTop: '32px' }}>
          <Row className="g-4">
            {AREA_SLUGS.map(slug => {
              const m = AREA_META[slug]
              const g = areaGuides[lang][slug]
              return (
                <Col md={6} lg={4} key={slug}>
                  <Link to={`/areas/${slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', overflow: 'hidden', height: '100%' }}>
                      <div style={{ height: '170px', backgroundImage: `url(${m.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                      <div style={{ padding: '18px' }}>
                        <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '6px' }}>{t(`areasSection.items.${m.key}.name`)}</h3>
                        <p style={{ color: '#8aafd4', fontSize: '0.85rem', marginBottom: '10px' }}>{g.tagline}</p>
                        <span style={{ color: '#e0bf6a', fontSize: '0.82rem', fontWeight: 600 }}>{t('areas.read')} →</span>
                      </div>
                    </div>
                  </Link>
                </Col>
              )
            })}
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Areas
