import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import PropertyCard from '../components/common/PropertyCard'
import PropertyCardSkeleton from '../components/common/PropertyCardSkeleton'
import SEO from '../components/SEO'
import { useTranslation } from 'react-i18next'
import { useFavorites } from '../hooks/useFavorites'
import { fetchProperties } from '../utils/propertiesApi'

const Favorites = () => {
  const { ids, clear } = useFavorites()
  const { t } = useTranslation()
  const [all, setAll] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchProperties()
      .then(list => { if (!cancelled) setAll(list) })
      .catch(console.error)
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const saved = all.filter(p => ids.includes(p._id))

  return (
    <>
      <SEO title={t('fav.seoTitle')} description={t('fav.seoTitle')} path="/favorites" noindex />
      <div style={{ backgroundColor: '#060f26', minHeight: '70vh', paddingBottom: '80px' }}>
        <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '32px 0 24px' }}>
          <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '700', marginBottom: '4px' }}>{t('fav.title')}</h1>
                <p style={{ color: '#8aafd4', fontSize: '0.88rem', margin: 0 }}>
                  {t('fav.sub', { count: ids.length })}
                </p>
              </div>
              {ids.length > 0 && (
                <button onClick={clear}
                  style={{ background: 'transparent', color: '#e74c3c', border: '1px solid rgba(231,76,60,0.35)', borderRadius: '8px', padding: '8px 16px', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer' }}>
                  {t('fav.clear')}
                </button>
              )}
            </div>
          </Container>
        </div>

        <Container style={{ paddingTop: '32px' }}>
          {loading && ids.length > 0 ? (
            <Row className="g-4">
              {ids.slice(0, 3).map(id => <Col key={id} lg={4} md={6}><PropertyCardSkeleton /></Col>)}
            </Row>
          ) : saved.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '70px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🤍</div>
              <h3 style={{ color: '#ffffff', marginBottom: '8px' }}>{t('fav.emptyTitle')}</h3>
              <p style={{ color: '#8aafd4', marginBottom: '20px' }}>{t('fav.emptyDesc')}</p>
              <Link to="/properties" style={{ backgroundColor: '#2d5fc4', color: '#fff', padding: '12px 30px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700' }}>
                {t('fav.browse')}
              </Link>
            </div>
          ) : (
            <Row className="g-4">
              {saved.map(p => <Col key={p._id} lg={4} md={6}><PropertyCard property={p} /></Col>)}
            </Row>
          )}
        </Container>
      </div>
    </>
  )
}

export default Favorites
