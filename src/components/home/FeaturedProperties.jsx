import { useState, useEffect, useMemo, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useLocalize } from '../../utils/useLocalize'
import { motion } from 'framer-motion'
import PropertyCard from '../common/PropertyCard'
import PropertyCardSkeleton from '../common/PropertyCardSkeleton'
import { fetchProperties } from '../../utils/propertiesApi'

const PropertyCardSlider = lazy(() => import('../common/PropertyCardSlider'))

const FeaturedProperties = () => {
  const { t, tv } = useLocalize()
  const [properties, setProperties] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeSort, setActiveSort] = useState('newest')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [slow, setSlow] = useState(false)
  const [attempt, setAttempt] = useState(0)

  const filters = ['All', 'Buy', 'Rent', 'Off Plan']
  const sortOptions = [
    { value: 'newest',     label: '🕐 Newest' },
    { value: 'price_asc',  label: '💰 Low → High' },
    { value: 'price_desc', label: '💰 High → Low' },
    { value: 'area_desc',  label: '📐 Largest' },
  ]

  useEffect(() => {
    let cancelled = false
    // After 3.5s still waiting -> the server is probably waking up, tell the visitor
    const slowTimer = setTimeout(() => { if (!cancelled) setSlow(true) }, 3500)
    fetchProperties({ force: attempt > 0 })
      .then(data => { if (!cancelled) { setProperties(data); setError(false) } })
      .catch(err => { console.error(err); if (!cancelled) setError(true) })
      .finally(() => { if (!cancelled) { setLoading(false); setSlow(false) } })
    return () => { cancelled = true; clearTimeout(slowTimer) }
  }, [attempt])

  const handleRetry = () => {
    setLoading(true)
    setError(false)
    setAttempt(a => a + 1)
  }

  const filtered = useMemo(() => {
    const result = activeFilter === 'All'
      ? [...properties]
      : properties.filter(p => p.type === activeFilter)
    switch (activeSort) {
      case 'price_asc':  result.sort((a, b) => a.price - b.price); break
      case 'price_desc': result.sort((a, b) => b.price - a.price); break
      case 'area_desc':  result.sort((a, b) => (b.area || 0) - (a.area || 0)); break
      default:           result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break
    }
    return result.slice(0, 6)
  }, [properties, activeFilter, activeSort])

  const btnStyle = (active) => ({
    padding: '7px 16px', borderRadius: '30px', border: 'none',
    cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600',
    transition: 'all 0.2s ease',
    backgroundColor: active ? '#2d5fc4' : 'rgba(45,95,196,0.1)',
    color: active ? '#ffffff' : '#8aafd4',
    outline: 'none', whiteSpace: 'nowrap'
  })

  return (
    <section style={{ backgroundColor: '#060f26', padding: '40px 0 80px' }}>
      <Container>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '28px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px' }}>
              <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('featured.badge')}</span>
            </div>
            <Link to="/properties"
              style={{ color: '#4a90d9', border: '1.5px solid rgba(74,144,217,0.4)', borderRadius: '8px', padding: '8px 16px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', transition: 'all 0.2s ease', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(74,144,217,0.1)'; e.currentTarget.style.borderColor = '#4a90d9' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(74,144,217,0.4)' }}
            >
              {t('featured.viewAll')} →
            </Link>
          </div>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontWeight: '300', marginBottom: '4px' }}>{t('featured.title1')}</h2>
          <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontWeight: '800', margin: 0 }}>{t('featured.title2')}</h2>
        </motion.div>

        {/* Filter + Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: '28px' }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '8px', marginBottom: '12px', scrollbarWidth: 'none' }}>
            {filters.map(f => (
              <motion.button key={f} onClick={() => setActiveFilter(f)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={btnStyle(activeFilter === f)}>
                {tv(f)}
              </motion.button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label htmlFor="featured-sort" style={{ color: '#8aafd4', fontSize: '0.82rem', whiteSpace: 'nowrap', flexShrink: 0 }}>{t('featuredList.sortBy')}</label>
            <select id="featured-sort" name="sort" value={activeSort} onChange={e => setActiveSort(e.target.value)}
              style={{ flex: 1, maxWidth: '220px', backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.35)', borderRadius: '8px', color: '#ffffff', padding: '8px 14px', fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}>
              {sortOptions.map(s => <option key={s.value} value={s.value} style={{ backgroundColor: '#0d1f4e' }}>{t(`featuredList.sort.${s.value}`)}</option>)}
            </select>
          </div>
        </motion.div>

        {/* Properties */}
        {loading ? (
          <>
            {slow && (
              <p style={{ textAlign: 'center', color: '#8aafd4', fontSize: '0.85rem', margin: '0 0 16px' }}>
                {t('featuredList.waking')}
              </p>
            )}
            {/* Skeleton — mobile: one wide card row */}
            <div className="d-flex d-lg-none" style={{ gap: '16px', overflowX: 'hidden' }}>
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} style={{ flex: '0 0 78%' }}><PropertyCardSkeleton /></div>
              ))}
            </div>
            {/* Skeleton — desktop: grid of 3 */}
            <div className="d-none d-lg-block">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {Array.from({ length: 3 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
              </div>
            </div>
          </>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>📡</div>
            <p style={{ color: '#8aafd4', marginBottom: '16px' }}>{t('featuredList.error')}</p>
            <button onClick={handleRetry}
              style={{ backgroundColor: '#2d5fc4', color: '#fff', border: 'none', borderRadius: '10px', padding: '11px 28px', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer' }}>
              {t('common.tryAgain')}
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🏠</div>
            <p style={{ color: '#8aafd4' }}>{t('featuredList.none')}</p>
          </div>
        ) : (
          <>
            {/* ✅ MOBILE — Swiper slider, lazy-loaded */}
            <div className="d-block d-lg-none">
              <Suspense fallback={
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#8aafd4', fontSize: '0.85rem' }}>{t('featuredList.loadingSlider')}</div>
              }>
                <PropertyCardSlider properties={filtered} animated />
              </Suspense>
            </div>

            {/* ✅ DESKTOP — Normal grid */}
            <div className="d-none d-lg-block">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {filtered.map((property, i) => (
                  <motion.div
                    key={property._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* View All — mobile bottom */}
        <div className="d-lg-none" style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/properties"
            style={{ display: 'inline-block', backgroundColor: '#2d5fc4', color: '#ffffff', padding: '13px 36px', borderRadius: '10px', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '700', boxShadow: '0 6px 20px rgba(45,95,196,0.3)' }}>
            {t('featured.viewAll')} →
          </Link>
        </div>

      </Container>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        div::-webkit-scrollbar { display: none; }
        .swiper-pagination-bullet { background: rgba(74,144,217,0.4) !important; }
        .swiper-pagination-bullet-active { background: #4a90d9 !important; }
      `}</style>
    </section>
  )
}

export default FeaturedProperties