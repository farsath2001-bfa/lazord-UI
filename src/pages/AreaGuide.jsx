import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import PropertyCard from '../components/common/PropertyCard'
import { fetchProperties } from '../utils/propertiesApi'
import { AREA_META, AREA_SLUGS, areaGuides } from '../data/areaGuides'

const matches = (p, keyword) => {
  const k = keyword.toLowerCase()
  return [p.title, p.location, p.community].some(v => typeof v === 'string' && v.toLowerCase().includes(k))
}

const AreaGuide = () => {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'ar' ? 'ar' : 'en'
  const meta = AREA_META[slug]
  const [list, setList] = useState(null)

  useEffect(() => {
    if (!meta) return
    let cancelled = false
    fetchProperties()
      .then(all => { if (!cancelled) setList(all.filter(p => matches(p, meta.keyword))) })
      .catch(() => { if (!cancelled) setList([]) })
    return () => { cancelled = true }
  }, [meta])

  if (!meta) return <Navigate to="/areas" replace />

  const g = areaGuides[lang][slug]
  const name = t(`areasSection.items.${meta.key}.name`)
  const box = { backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '14px', padding: '20px', height: '100%' }
  const li = { color: '#c8d8ee', fontSize: '0.9rem', marginBottom: '8px' }

  return (
    <>
      <SEO title={`${name} — ${g.tagline}`} description={g.intro} path={`/areas/${slug}`} image={meta.image} />
      <div style={{ backgroundColor: '#060f26', minHeight: '80vh', paddingBottom: '80px' }}>
        <div style={{ backgroundImage: `linear-gradient(rgba(6,15,38,0.7), rgba(6,15,38,0.95)), url(${meta.image})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '70px 0 50px' }}>
          <Container>
            <Link to="/areas" style={{ color: '#8aafd4', fontSize: '0.82rem', textDecoration: 'none' }}>← {t('areas.all')}</Link>
            <h1 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', margin: '10px 0 6px' }}>{name}</h1>
            <p style={{ color: '#e0bf6a', fontSize: '1.05rem', margin: 0 }}>{g.tagline}</p>
          </Container>
        </div>

        <Container style={{ paddingTop: '32px' }}>
          <p style={{ color: '#c8d8ee', fontSize: '1rem', lineHeight: 1.8, maxWidth: '820px' }}>{g.intro}</p>

          <Row className="g-4 mb-4">
            <Col md={6}>
              <div style={box}>
                <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '12px' }}>{t('areas.highlights')}</h3>
                <ul style={{ paddingInlineStart: '18px', margin: 0 }}>{g.highlights.map(h => <li key={h} style={li}>{h}</li>)}</ul>
              </div>
            </Col>
            <Col md={6}>
              <div style={box}>
                <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '12px' }}>{t('areas.bestFor')}</h3>
                <ul style={{ paddingInlineStart: '18px', margin: 0 }}>{g.bestFor.map(h => <li key={h} style={li}>{h}</li>)}</ul>
              </div>
            </Col>
          </Row>

          <h2 style={{ color: '#fff', fontSize: '1.4rem', margin: '36px 0 16px' }}>{t('areas.listings', { area: name })}</h2>
          {list === null && <p style={{ color: '#8aafd4' }}>{t('common.loading')}</p>}
          {list && list.length === 0 && <p style={{ color: '#8aafd4' }}>{t('areas.noListings')}</p>}
          {list && list.length > 0 && (
            <Row className="g-4">
              {list.slice(0, 6).map(p => (
                <Col md={6} lg={4} key={p._id || p.id}><PropertyCard property={p} /></Col>
              ))}
            </Row>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '28px' }}>
            <Link to={`/properties?search=${encodeURIComponent(meta.keyword)}`} style={{ backgroundColor: '#2d5fc4', color: '#fff', padding: '12px 26px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>{t('areas.viewAll')}</Link>
            <Link to="/contact" style={{ border: '1px solid #c9a24b', color: '#e0bf6a', padding: '12px 26px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>{t('areas.enquire')}</Link>
            <Link to="/investment-tools" style={{ border: '1px solid rgba(74,144,217,0.5)', color: '#8aafd4', padding: '12px 26px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>{t('areas.tools')}</Link>
          </div>

          <h3 style={{ color: '#fff', fontSize: '1.05rem', margin: '40px 0 12px' }}>{t('areas.otherAreas')}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {AREA_SLUGS.filter(s => s !== slug).map(s => (
              <Link key={s} to={`/areas/${s}`} style={{ background: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', color: '#fff', borderRadius: '20px', padding: '6px 16px', fontSize: '0.82rem', textDecoration: 'none' }}>
                {t(`areasSection.items.${AREA_META[s].key}.name`)}
              </Link>
            ))}
          </div>
          <p style={{ color: '#6f8db3', fontSize: '0.78rem', marginTop: '24px' }}>{t('areas.note')}</p>
        </Container>
      </div>
    </>
  )
}

export default AreaGuide
