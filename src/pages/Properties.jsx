import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import PropertyCard from '../components/common/PropertyCard'
import FeaturedAreas from '../components/home/FeaturedAreas'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const propertyTypes = ['All', 'Buy', 'Rent', 'Off Plan', 'Sell', 'Commercial']
const categories    = ['All', 'Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Studio']
const bedOptions    = ['All', 'Studio', '1', '2', '3', '4', '5+']
const sortOptions   = [
  { label: 'Newest First',    value: 'newest' },
  { label: 'Price: Low→High', value: 'price_asc' },
  { label: 'Price: High→Low', value: 'price_desc' },
  { label: 'Area: Largest',   value: 'area_desc' },
]

const Properties = () => {
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()

  const [search, setSearch]     = useState(searchParams.get('search') || '')
  const [type, setType]         = useState(searchParams.get('type') || 'All')
  const [category, setCategory] = useState('All')
  const [beds, setBeds]         = useState('All')
  const [sort, setSort]         = useState('newest')
  const [properties, setProperties] = useState([])
  const [loading, setLoading]   = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    const urlType   = searchParams.get('type') || 'All'
    const urlSearch = searchParams.get('search') || ''
    setType(urlType)
    setSearch(urlSearch)
  }, [searchParams])

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const params = {}
        if (search)             params.search   = search
        if (type !== 'All')     params.type     = type
        if (category !== 'All') params.category = category
        if (beds !== 'All')     params.beds     = beds
        if (sort)               params.sort     = sort
        const res = await axios.get(`${API_URL}/api/properties`, { params })
        setProperties(res.data.data || [])
      } catch (err) {
        console.error(err)
        setProperties([])
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [search, type, category, beds, sort])

  const inputStyle = {
    backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.35)',
    borderRadius: '8px', color: '#ffffff', padding: '10px 14px',
    fontSize: '0.88rem', outline: 'none', width: '100%', cursor: 'pointer'
  }

  const hasActiveFilters = type !== 'All' || category !== 'All' || beds !== 'All' || search

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Header — compact, no extra padding */}
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '32px 0 24px' }}>
        <Container>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '10px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>
              ✦ {type !== 'All' ? `${type} Properties` : t('properties.title')}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '700', marginBottom: '4px' }}>
                {type !== 'All' ? `${type} Properties in Dubai` : t('properties.title')}
              </h1>
              <p style={{ color: '#8aafd4', fontSize: '0.88rem', margin: 0 }}>
                {loading ? 'Loading...' : `${properties.length} ${t('properties.found')}`}
              </p>
            </div>
            {/* Mobile filter toggle */}
            <button className="d-lg-none" onClick={() => setFiltersOpen(!filtersOpen)}
              style={{ backgroundColor: hasActiveFilters ? 'rgba(45,95,196,0.3)' : '#0d1f4e', border: '1px solid rgba(45,95,196,0.35)', borderRadius: '8px', color: '#ffffff', padding: '9px 16px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🔍 {hasActiveFilters ? 'Filters Active' : 'Filters'} {filtersOpen ? '▲' : '▼'}
            </button>
          </div>
        </Container>
      </div>

      {/* Featured Areas — directly below header, no gap */}
      <FeaturedAreas />

      <Container style={{ paddingTop: '8px' }}>

        {/* Filter Bar */}
        <div className={filtersOpen ? 'd-block' : 'd-none d-lg-block'}>
          <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
            <Row className="g-3 align-items-end">
              <Col lg={4} xs={12}>
                <label style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block', textTransform: 'uppercase' }}>{t('properties.search')}</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>🔍</span>
                  <input type="text" placeholder={t('properties.searchPlaceholder')} value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ ...inputStyle, paddingLeft: '36px' }} />
                </div>
              </Col>
              <Col lg={2} xs={6}>
                <label style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block', textTransform: 'uppercase' }}>{t('properties.type')}</label>
                <select value={type} onChange={e => setType(e.target.value)} style={inputStyle}>
                  {propertyTypes.map(t2 => <option key={t2} value={t2}>{t2}</option>)}
                </select>
              </Col>
              <Col lg={2} xs={6}>
                <label style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block', textTransform: 'uppercase' }}>{t('properties.category')}</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Col>
              <Col lg={2} xs={6}>
                <label style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block', textTransform: 'uppercase' }}>{t('properties.bedrooms')}</label>
                <select value={beds} onChange={e => setBeds(e.target.value)} style={inputStyle}>
                  {bedOptions.map(b => <option key={b} value={b}>{b === 'All' ? 'Any' : b}</option>)}
                </select>
              </Col>
              <Col lg={2} xs={6}>
                <label style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block', textTransform: 'uppercase' }}>{t('properties.sortBy')}</label>
                <select value={sort} onChange={e => setSort(e.target.value)} style={inputStyle}>
                  {sortOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </Col>
            </Row>

            {hasActiveFilters && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(45,95,196,0.2)' }}>
                <span style={{ color: '#8aafd4', fontSize: '0.8rem', alignSelf: 'center' }}>{t('properties.activeFilters')}</span>
                {[
                  search && { label: `"${search}"`, clear: () => setSearch('') },
                  type !== 'All' && { label: type, clear: () => setType('All') },
                  category !== 'All' && { label: category, clear: () => setCategory('All') },
                  beds !== 'All' && { label: `${beds} bed`, clear: () => setBeds('All') },
                ].filter(Boolean).map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '20px', padding: '3px 12px', color: '#4a90d9', fontSize: '0.8rem' }}>
                    {f.label}
                    <span onClick={f.clear} style={{ cursor: 'pointer', color: '#8aafd4', fontWeight: '700', marginLeft: '2px' }}>×</span>
                  </div>
                ))}
                <div onClick={() => { setSearch(''); setType('All'); setCategory('All'); setBeds('All') }}
                  style={{ color: '#e74c3c', fontSize: '0.8rem', cursor: 'pointer', alignSelf: 'center', marginLeft: '4px' }}>
                  {t('properties.clearAll')}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ color: '#4a90d9', fontSize: '2.5rem', animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</div>
            <p style={{ color: '#8aafd4', marginTop: '16px' }}>Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ color: '#ffffff', marginBottom: '10px' }}>{t('properties.noResults')}</h3>
            <p style={{ color: '#8aafd4' }}>{t('properties.noResultsDesc')}</p>
          </div>
        ) : (
          <Row className="g-4">
            {properties.map(property => (
              <Col key={property._id} lg={4} md={6} xs={12}>
                <PropertyCard property={property} />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default Properties