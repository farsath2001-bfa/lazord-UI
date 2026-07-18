import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import PropertyCard from '../common/PropertyCard'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const FeaturedProperties = () => {
  const { t } = useTranslation()
  const [properties, setProperties] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeSort, setActiveSort] = useState('newest')
  const [loading, setLoading] = useState(true)

  const filters = ['All', 'Buy', 'Rent', 'Off Plan']

  const sortOptions = [
    { value: 'newest',     label: '🕐 Newest' },
    { value: 'price_asc',  label: '💰 Price: Low → High' },
    { value: 'price_desc', label: '💰 Price: High → Low' },
    { value: 'area_desc',  label: '📐 Largest Area' },
  ]

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/properties`)
        setProperties(res.data.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  useEffect(() => {
    let result = activeFilter === 'All'
      ? [...properties]
      : properties.filter(p => p.type === activeFilter)

    // Sort
    switch (activeSort) {
      case 'price_asc':  result.sort((a, b) => a.price - b.price); break
      case 'price_desc': result.sort((a, b) => b.price - a.price); break
      case 'area_desc':  result.sort((a, b) => (b.area || 0) - (a.area || 0)); break
      case 'newest':
      default:           result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break
    }

    setFiltered(result.slice(0, 6))
  }, [properties, activeFilter, activeSort])

  const btnStyle = (active) => ({
    padding: '8px 20px', borderRadius: '30px', border: 'none',
    cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600',
    transition: 'all 0.2s ease',
    backgroundColor: active ? '#2d5fc4' : 'rgba(45,95,196,0.1)',
    color: active ? '#ffffff' : '#8aafd4',
    outline: 'none',
  })

  return (
    <section style={{ backgroundColor: '#060f26', padding: '40px 0 80px' }}>
      <Container>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '14px' }}>
              <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('featured.badge')}</span>
            </div>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '300', marginBottom: '4px' }}>{t('featured.title1')}</h2>
            <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '800', margin: 0 }}>{t('featured.title2')}</h2>
          </div>
          <Link to="/properties"
            style={{ color: '#4a90d9', border: '1.5px solid rgba(74,144,217,0.4)', borderRadius: '8px', padding: '10px 20px', textDecoration: 'none', fontSize: '0.88rem', fontWeight: '600', transition: 'all 0.2s ease', whiteSpace: 'nowrap', alignSelf: 'flex-end' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(74,144,217,0.1)'; e.currentTarget.style.borderColor = '#4a90d9' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(74,144,217,0.4)' }}>
            {t('featured.viewAll')} →
          </Link>
        </div>

        {/* Filter + Sort bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>

          {/* Type filter pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={btnStyle(activeFilter === f)}>
                {f}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#8aafd4', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>Sort by:</span>
            <select
              value={activeSort}
              onChange={e => setActiveSort(e.target.value)}
              style={{
                backgroundColor: '#0d1f4e',
                border: '1px solid rgba(45,95,196,0.35)',
                borderRadius: '8px',
                color: '#ffffff',
                padding: '8px 14px',
                fontSize: '0.85rem',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {sortOptions.map(s => (
                <option key={s.value} value={s.value} style={{ backgroundColor: '#0d1f4e' }}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ color: '#4a90d9', fontSize: '2.5rem', animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</div>
            <p style={{ color: '#8aafd4', marginTop: '12px' }}>Loading properties...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🏠</div>
            <p style={{ color: '#8aafd4' }}>No properties found</p>
          </div>
        ) : (
          <Row className="g-4">
            {filtered.map(property => (
              <Col key={property._id} lg={4} md={6} xs={12}>
                <PropertyCard property={property} />
              </Col>
            ))}
          </Row>
        )}

      </Container>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}

export default FeaturedProperties