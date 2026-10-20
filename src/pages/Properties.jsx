import { useState, useEffect, lazy, Suspense } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useLocalize } from '../utils/useLocalize'
import axios from 'axios'
import PropertyCard from '../components/common/PropertyCard'
import PropertyCardSkeleton from '../components/common/PropertyCardSkeleton'
import FeaturedAreas from '../components/home/FeaturedAreas'
import SEO from '../components/SEO'
import SavedSearches from '../components/common/SavedSearches'

const PropertyCardSlider = lazy(() => import('../components/common/PropertyCardSlider'))

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
  const { t, tv } = useLocalize()

  const [search, setSearch]         = useState(searchParams.get('search') || '')
  const [type, setType]             = useState(searchParams.get('type') || 'All')
  const [category, setCategory]     = useState(searchParams.get('category') || 'All')
  const [beds, setBeds]             = useState(searchParams.get('beds') || 'All')
  const [maxPrice, setMaxPrice]     = useState(searchParams.get('maxPrice') || '')
  const [sort, setSort]             = useState('newest')
  const [properties, setProperties] = useState([])
  const [loading, setLoading]       = useState(true)
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    const nextType = searchParams.get('type') || 'All'
    const nextSearch = searchParams.get('search') || ''
    const nextBeds = searchParams.get('beds') || 'All'
    const nextCategory = searchParams.get('category') || 'All'
    const nextMax = searchParams.get('maxPrice') || ''
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setType(prev => (prev !== nextType ? nextType : prev))
    setSearch(prev => (prev !== nextSearch ? nextSearch : prev))
    setBeds(prev => (prev !== nextBeds ? nextBeds : prev))
    setCategory(prev => (prev !== nextCategory ? nextCategory : prev))
    setMaxPrice(prev => (prev !== nextMax ? nextMax : prev))
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
        if (maxPrice)           params.maxPrice = maxPrice
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
  }, [search, type, category, beds, maxPrice, sort])

  const inputStyle = {
    backgroundColor: '#0d1f4e',
    border: '1px solid rgba(45,95,196,0.35)',
    borderRadius: '8px', color: '#ffffff',
    padding: '10px 14px', fontSize: '0.88rem',
    outline: 'none', width: '100%', cursor: 'pointer'
  }

  const hasActiveFilters = type !== 'All' || category !== 'All' || beds !== 'All' || maxPrice || search

  return (
    <>
      <SEO
        title="Properties for Sale & Rent in Dubai"
        description="Browse verified apartments, villas and commercial units for sale and rent in Dubai. Off-plan and ready properties from Lazord Real Estate."
        path="/properties"
      />
      <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '32px 0 24px' }}>
        <Container>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '10px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>
              ✦ {type !== 'All' ? t('properties.badgeType', { type: tv(type) }) : t('properties.title')}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '700', marginBottom: '4px' }}>
                {type !== 'All' ? t('properties.headingType', { type: tv(type) }) : t('properties.title')}
              </h1>
              <p style={{ color: '#8aafd4', fontSize: '0.88rem', margin: 0 }}>
                {loading ? t('common.loading') : `${properties.length} ${t('properties.found')}`}
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Featured Areas */}
      <FeaturedAreas />

      <Container style={{ paddingTop: '8px' }}>

        {/* ✅ Filter Bar — always visible, scrollable on mobile */}
        <div style={{
          backgroundColor: '#0d1f4e',
          border: '1px solid rgba(45,95,196,0.3)',
          borderRadius: '14px',
          padding: '16px',
          marginBottom: '24px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}>
          {/* Search — full width always */}
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="properties-search" style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block', textTransform: 'uppercase' }}>
              {t('properties.search')}
            </label>
            <div style={{ position: 'relative' }}>
              <span className="properties-search-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', pointerEvents: 'none' }}>🔍</span>
              <input
                id="properties-search"
                name="search"
                type="text"
                inputMode="search"
                placeholder={t('properties.searchPlaceholder')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="properties-search-input"
                style={{
                  ...inputStyle,
                  paddingLeft: '36px',
                  paddingRight: search ? '36px' : '14px',
                  borderColor: searchFocused ? '#4a90d9' : 'rgba(45,95,196,0.35)',
                  boxShadow: searchFocused ? '0 0 0 3px rgba(74,144,217,0.15)' : 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
              />
              {search && (
                <span
                  onClick={() => setSearch('')}
                  className="properties-search-clear"
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#8aafd4', fontWeight: '700', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1, padding: '4px' }}
                >×</span>
              )}
            </div>
          </div>

          {/* Dropdowns — scrollable row on mobile */}
          <div style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '4px'
          }}>
            {/* Type */}
            <div style={{ minWidth: '130px', flex: '1' }}>
              <label htmlFor="properties-type" style={{ color: '#8aafd4', fontSize: '0.72rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block', textTransform: 'uppercase' }}>
                {t('properties.type')}
              </label>
              <select id="properties-type" name="type" value={type} onChange={e => setType(e.target.value)} style={inputStyle}>
                {propertyTypes.map(t2 => <option key={t2} value={t2}>{tv(t2)}</option>)}
              </select>
            </div>

            {/* Category */}
            <div style={{ minWidth: '130px', flex: '1' }}>
              <label htmlFor="properties-category" style={{ color: '#8aafd4', fontSize: '0.72rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block', textTransform: 'uppercase' }}>
                {t('properties.category')}
              </label>
              <select id="properties-category" name="category" value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
                {categories.map(c => <option key={c} value={c}>{tv(c)}</option>)}
              </select>
            </div>

            {/* Bedrooms */}
            <div style={{ minWidth: '120px', flex: '1' }}>
              <label htmlFor="properties-beds" style={{ color: '#8aafd4', fontSize: '0.72rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block', textTransform: 'uppercase' }}>
                {t('properties.bedrooms')}
              </label>
              <select id="properties-beds" name="beds" value={beds} onChange={e => setBeds(e.target.value)} style={inputStyle}>
                {bedOptions.map(b => <option key={b} value={b}>{b === 'All' ? t('common.any') : b === 'Studio' ? t('card.studio') : b}</option>)}
              </select>
            </div>

            {/* Sort */}
            <div style={{ minWidth: '150px', flex: '1' }}>
              <label htmlFor="properties-sort" style={{ color: '#8aafd4', fontSize: '0.72rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block', textTransform: 'uppercase' }}>
                {t('properties.sortBy')}
              </label>
              <select id="properties-sort" name="sort" value={sort} onChange={e => setSort(e.target.value)} style={inputStyle}>
                {sortOptions.map(s => <option key={s.value} value={s.value}>{t(`properties.sort.${s.value}`)}</option>)}
              </select>
            </div>
          </div>

          {/* Active filters */}
          {hasActiveFilters && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(45,95,196,0.2)' }}>
              <span style={{ color: '#8aafd4', fontSize: '0.8rem', alignSelf: 'center' }}>
                {t('properties.activeFilters')}
              </span>
              {[
                search && { label: `"${search}"`, clear: () => setSearch('') },
                type !== 'All' && { label: tv(type), clear: () => setType('All') },
                category !== 'All' && { label: tv(category), clear: () => setCategory('All') },
                beds !== 'All' && { label: t('properties.bedChip', { n: beds }), clear: () => setBeds('All') },
                maxPrice && { label: t('properties.maxChip', { n: Number(maxPrice).toLocaleString('en-US') }), clear: () => setMaxPrice('') },
              ].filter(Boolean).map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '20px', padding: '3px 12px', color: '#4a90d9', fontSize: '0.8rem' }}>
                  {f.label}
                  <span onClick={f.clear} style={{ cursor: 'pointer', color: '#8aafd4', fontWeight: '700', marginLeft: '2px' }}>×</span>
                </div>
              ))}
              <div
                onClick={() => { setSearch(''); setType('All'); setCategory('All'); setBeds('All'); setMaxPrice('') }}
                style={{ color: '#e74c3c', fontSize: '0.8rem', cursor: 'pointer', alignSelf: 'center', marginLeft: '4px' }}
              >
                {t('properties.clearAll')}
              </div>
            </div>
          )}
        </div>

        <SavedSearches filters={{ search, type, category, beds, maxPrice }} />

        {/* Results */}
        {loading ? (
          <>
            {/* Skeleton — mobile: horizontal row of 3 cards */}
            <div className="d-flex d-lg-none" style={{ gap: '16px', overflowX: 'hidden' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ flex: '0 0 78%' }}><PropertyCardSkeleton /></div>
              ))}
            </div>
            {/* Skeleton — desktop: grid of 6 cards */}
            <div className="d-none d-lg-block">
              <Row className="g-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Col key={i} lg={4} md={6}>
                    <PropertyCardSkeleton />
                  </Col>
                ))}
              </Row>
            </div>
          </>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ color: '#ffffff', marginBottom: '10px' }}>{t('properties.noResults')}</h3>
            <p style={{ color: '#8aafd4' }}>{t('properties.noResultsDesc')}</p>
          </div>
        ) : (
          <>
            {/* ✅ MOBILE — Swiper slider, lazy-loaded */}
            <div className="d-block d-lg-none">
              <Suspense fallback={
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#8aafd4', fontSize: '0.85rem' }}>{t('featuredList.loadingSlider')}</div>
              }>
                <PropertyCardSlider properties={properties} />
              </Suspense>
            </div>

            {/* ✅ DESKTOP — Normal grid */}
            <div className="d-none d-lg-block">
              <Row className="g-4">
                {properties.map(property => (
                  <Col key={property._id} lg={4} md={6}>
                    <PropertyCard property={property} />
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}
      </Container>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .swiper-pagination-bullet { background: rgba(74,144,217,0.4) !important; }
        .swiper-pagination-bullet-active { background: #4a90d9 !important; }
        div::-webkit-scrollbar { display: none; }

        /* ── Mobile: bigger, easier-to-tap search bar ── */
        @media (max-width: 767.98px) {
          .properties-search-input {
            padding-top: 14px !important;
            padding-bottom: 14px !important;
            font-size: 1rem !important;
            border-radius: 12px !important;
          }
          .properties-search-icon { font-size: 1.1rem !important; left: 14px !important; }
          .properties-search-clear { font-size: 1.3rem !important; right: 12px !important; }
        }
      `}</style>
      </div>
    </>
  )
}

export default Properties