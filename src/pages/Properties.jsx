import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import PropertyCard from '../components/common/PropertyCard'
import propertiesData from '../assets/data/Properties'

const Properties = () => {
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()

  const [search, setSearch]     = useState(searchParams.get('search') || '')
  const [type, setType]         = useState(searchParams.get('type') || 'All')
  const [category, setCategory] = useState('All')
  const [beds, setBeds]         = useState('All')
  const [sort, setSort]         = useState('newest')

  const propertyTypes = ['All', 'Buy', 'Rent', 'Off Plan']
  const categories    = ['All', 'Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Studio']
  const bedOptions    = ['All', 'Studio', '1', '2', '3', '4', '5+']
  const sortOptions   = [
    { label: t('properties.sort.newest'),   value: 'newest' },
    { label: t('properties.sort.priceAsc'), value: 'price_asc' },
    { label: t('properties.sort.priceDesc'),value: 'price_desc' },
    { label: t('properties.sort.areaDesc'), value: 'area_desc' },
  ]

  const filtered = useMemo(() => {
    let list = [...propertiesData]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.community.toLowerCase().includes(q)
      )
    }
    if (type !== 'All')     list = list.filter(p => p.type === type)
    if (category !== 'All') list = list.filter(p => p.category === category)
    if (beds !== 'All') {
      if (beds === 'Studio')   list = list.filter(p => p.bedrooms === 0)
      else if (beds === '5+')  list = list.filter(p => p.bedrooms >= 5)
      else list = list.filter(p => p.bedrooms === parseInt(beds))
    }
    if (sort === 'price_asc')  list.sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'area_desc')  list.sort((a, b) => b.area - a.area)
    return list
  }, [search, type, category, beds, sort])

  const inputStyle = {
    backgroundColor: '#0d1f4e',
    border: '1px solid rgba(45,95,196,0.35)',
    borderRadius: '8px', color: '#ffffff',
    padding: '10px 14px', fontSize: '0.88rem',
    outline: 'none', width: '100%', cursor: 'pointer'
  }

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '48px 0 36px' }}>
        <Container>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '14px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('properties.title')}</span>
          </div>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: '700', marginBottom: '8px' }}>{t('properties.title')}</h1>
          <p style={{ color: '#8aafd4', fontSize: '0.95rem', margin: 0 }}>{filtered.length} {t('properties.found')}</p>
        </Container>
      </div>

      <Container style={{ paddingTop: '36px' }}>

        {/* Filter Bar */}
        <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '14px', padding: '20px 24px', marginBottom: '32px' }}>
          <Row className="g-3 align-items-end">
            <Col lg={4} md={12}>
              <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>{t('properties.search')}</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>🔍</span>
                <input type="text" placeholder={t('properties.searchPlaceholder')} value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: '36px' }} />
              </div>
            </Col>
            <Col lg={2} md={4}>
              <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>{t('properties.type')}</label>
              <select value={type} onChange={e => setType(e.target.value)} style={inputStyle}>
                {propertyTypes.map(t2 => <option key={t2} value={t2}>{t2}</option>)}
              </select>
            </Col>
            <Col lg={2} md={4}>
              <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>{t('properties.category')}</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Col>
            <Col lg={2} md={4}>
              <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>{t('properties.bedrooms')}</label>
              <select value={beds} onChange={e => setBeds(e.target.value)} style={inputStyle}>
                {bedOptions.map(b => <option key={b} value={b}>{b === 'All' ? 'Any' : b}</option>)}
              </select>
            </Col>
            <Col lg={2} md={6}>
              <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>{t('properties.sortBy')}</label>
              <select value={sort} onChange={e => setSort(e.target.value)} style={inputStyle}>
                {sortOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </Col>
          </Row>

          {/* Active Filters */}
          {(type !== 'All' || category !== 'All' || beds !== 'All' || search) && (
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
              <div onClick={() => { setSearch(''); setType('All'); setCategory('All'); setBeds('All') }} style={{ color: '#e74c3c', fontSize: '0.8rem', cursor: 'pointer', alignSelf: 'center', marginLeft: '4px' }}>
                {t('properties.clearAll')}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ color: '#ffffff', marginBottom: '10px' }}>{t('properties.noResults')}</h3>
            <p style={{ color: '#8aafd4' }}>{t('properties.noResultsDesc')}</p>
          </div>
        ) : (
          <Row className="g-4">
            {filtered.map(property => (
              <Col key={property.id} lg={4} md={6}>
                <PropertyCard property={property} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  )
}

export default Properties