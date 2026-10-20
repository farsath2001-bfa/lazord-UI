import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import ParticleBackground from '../common/ParticleBackground'
import CounterNumber from '../common/CounterNumber'

const bgImages = [
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80',
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80',
  'https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7?fm=jpg&q=60&w=3000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
]

// Headline that reveals word by word
const Words = ({ text, base = 0.25 }) => (
  <>
    {String(text).split(' ').map((w, i) => (
      <motion.span
        key={`${w}-${i}`}
        style={{ display: 'inline-block', marginInlineEnd: '0.28em' }}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: base + i * 0.09, ease: 'easeOut' }}
      >
        {w}
      </motion.span>
    ))}
  </>
)

// Glowing skyline silhouette along the bottom edge
const skylineBlocks = (() => {
  const items = []
  let x = 0
  let i = 0
  while (x < 1200) {
    const w = 26 + ((i * 37) % 28)
    const h = 38 + ((i * 53) % 74)
    items.push({ x, w, h })
    x += w + 2
    i++
  }
  return items
})()

const Skyline = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 1200 150"
    preserveAspectRatio="none"
    style={{ position: 'absolute', left: 0, right: 0, bottom: -1, width: '100%', height: 'clamp(70px, 12vw, 140px)', zIndex: 1, pointerEvents: 'none', filter: 'drop-shadow(0 -4px 12px rgba(201,162,75,0.35))' }}
  >
    {skylineBlocks.map((b, i) => <rect key={i} x={b.x} y={150 - b.h} width={b.w} height={b.h} fill="#060f26" />)}
    <path d="M626 150 L626 78 L632 48 L636 14 L638 14 L642 48 L648 78 L648 150 Z" fill="#060f26" />
    {skylineBlocks.filter((_, i) => i % 3 === 0).map((b, i) => (
      <rect key={`w${i}`} className="sky-window" x={b.x + b.w / 2 - 1} y={150 - b.h + 10} width="2.5" height="3" fill="#e0bf6a" style={{ animationDelay: `${(i % 7) * 0.5}s` }} />
    ))}
  </svg>
)

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Buy')
  const [currentBg, setCurrentBg] = useState(0)
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'
  const [beds, setBeds] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const tabs = [
    { key: 'Buy',        label: t('hero.tabs.buy') },
    { key: 'Rent',       label: t('hero.tabs.rent') },
    { key: 'Off Plan',   label: t('hero.tabs.offplan') },
    { key: 'Commercial', label: t('nav.commercial') },
  ]

  useEffect(() => {
    const interval = setInterval(() => setCurrentBg(prev => (prev + 1) % bgImages.length), 6000)
    return () => clearInterval(interval)
  }, [])

  const goSearch = (q) => {
    const params = new URLSearchParams()
    if (q) params.set('search', q)
    params.set('type', activeTab)
    if (beds) params.set('beds', beds)
    if (maxPrice) params.set('maxPrice', maxPrice)
    navigate(`/properties?${params.toString()}`)
  }
  const handleSearch = () => goSearch(searchQuery.trim())

  const selectTab = (key) => { setActiveTab(key); setMaxPrice('') }

  const priceSteps = activeTab === 'Rent'
    ? [50000, 100000, 150000, 250000, 500000]
    : [1000000, 2000000, 3000000, 5000000, 10000000, 20000000]
  const fmtPrice = (v) => {
    const num = v >= 1000000 ? `${v / 1000000}${isAr ? ' ' : ''}${t('common.million')}` : `${v / 1000}${isAr ? ' ' : ''}${t('hero.thousand')}`
    return t('hero.upTo', { n: isAr ? `${num} ${t('common.aed')}` : `${t('common.aed')} ${num}` })
  }

  const areaChips = [
    { key: 'downtown', q: 'Downtown' },
    { key: 'marina',   q: 'Marina' },
    { key: 'palm',     q: 'Palm Jumeirah' },
    { key: 'bay',      q: 'Business Bay' },
  ]
  const selectStyle = {
    flex: '1 1 130px', minWidth: 0, padding: '9px 10px', borderRadius: '8px',
    border: '1px solid #e1e6ef', backgroundColor: '#f4f6fb', color: '#1a1a2e',
    fontSize: '0.82rem', fontWeight: 600, outline: 'none', cursor: 'pointer'
  }

  const stats = [
    { target: 1500, suffix: '+', label: t('hero.stats.properties') },
    { target: 1200, suffix: '+', label: t('hero.stats.clients') },
    { target: 18,   suffix: '+', label: t('hero.stats.experience') },
    { target: 40,   suffix: '+', label: t('common.nationalities') },
  ]

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

      {/* Background Images */}
      {bgImages.map((img, i) => (
        <div key={i} className="hero-bg" style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: i === currentBg ? 1 : 0,
          transition: 'opacity 1.4s ease', zIndex: 0
        }} />
      ))}

      {/* Overlay */}
      <div className="hero-overlay" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

      <ParticleBackground />
      <Skyline />

      <Container style={{ position: 'relative', zIndex: 2, padding: '40px 20px 20px' }}>
        <Row className="align-items-center">

          {/* LEFT — Content */}
          <Col lg={7} xl={6}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(201,162,75,0.14)', border: '1px solid rgba(201,162,75,0.55)', borderRadius: '30px', padding: '6px 16px', marginBottom: '20px' }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#c9a24b', animation: 'pulse 2s infinite' }} />
                <span style={{ color: '#e9d6a3', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{t('hero.badge')}</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="font-display"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 4vw, 3.4rem)', fontWeight: '300', lineHeight: '1.15', marginBottom: '10px', letterSpacing: '-0.5px' }}
              >
                <Words text={t('hero.headline1')} base={0.25} />
              </motion.h1>
              <motion.h1
                className="font-display"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{ color: '#4a90d9', fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '16px', letterSpacing: '-1px' }}
              >
                <Words text={t('hero.headline2')} base={0.55} />
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ color: '#b0c4de', fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', lineHeight: '1.7', marginBottom: '28px', maxWidth: '480px' }}
              >
                {t('hero.subtitle')}
              </motion.p>

              {/* Search Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: '14px', padding: '8px', maxWidth: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', marginBottom: '36px' }}
              >
                {/* Tabs */}
                <div style={{ display: 'flex', gap: '4px', padding: '4px 4px 10px 4px', borderBottom: '1px solid #e8ecf2' }}>
                  {tabs.map(tab => (
                    <button key={tab.key} onClick={() => selectTab(tab.key)}
                      style={{ flex: 1, padding: '8px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600', transition: 'all 0.2s ease', backgroundColor: activeTab === tab.key ? '#0d1f4e' : 'transparent', color: activeTab === tab.key ? '#ffffff' : '#666', whiteSpace: 'nowrap' }}>
                      {tab.label}
                    </button>
                  ))}
                </div>
                {/* Search input */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 8px 4px 8px' }}>
                  <span style={{ fontSize: '1.1rem', paddingLeft: '6px', flexShrink: 0 }}>🔍</span>
                  <input
                    id="hero-search"
                    name="search"
                    type="text"
                    autoComplete="off"
                    aria-label={t('hero.searchPlaceholder')}
                    placeholder={t('hero.searchPlaceholder')}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    style={{ flex: 1, border: 'none', outline: 'none', fontSize: '0.92rem', color: '#1a1a2e', backgroundColor: 'transparent', padding: '8px 4px', minWidth: 0 }}
                  />
                  <motion.button
                    className="hero-search-btn"
                    onClick={handleSearch}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    style={{ color: '#ffffff', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    {t('hero.searchBtn')}
                  </motion.button>
                </div>
                {/* Filters */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '4px 8px 8px' }}>
                  <select aria-label={t('properties.bedrooms')} value={beds} onChange={e => setBeds(e.target.value)} style={selectStyle}>
                    <option value="">{t('properties.bedrooms')}: {t('common.any')}</option>
                    {['Studio', '1', '2', '3', '4', '5+'].map(b => <option key={b} value={b}>{b === 'Studio' ? t('card.studio') : t('card.bed', { n: b })}</option>)}
                  </select>
                  <select aria-label={t('hero.anyPrice')} value={maxPrice} onChange={e => setMaxPrice(e.target.value)} style={selectStyle}>
                    <option value="">{t('hero.anyPrice')}</option>
                    {priceSteps.map(v => <option key={v} value={v}>{fmtPrice(v)}</option>)}
                  </select>
                </div>
              </motion.div>

              {/* Quick area chips */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginTop: '-20px', marginBottom: '32px' }}>
                <span style={{ color: '#8aafd4', fontSize: '0.78rem' }}>{t('hero.popular')}</span>
                {areaChips.map(c => (
                  <button key={c.key} type="button" className="hero-chip" onClick={() => goSearch(c.q)}>
                    {t(`areasSection.items.${c.key}.name`)}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Stats — staggered */}
            <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap' }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.12 }}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                >
                  {i > 0 && <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(74,144,217,0.3)', margin: '0 20px' }} />}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#e0bf6a', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: '800', lineHeight: '1' }}>
                      <CounterNumber target={stat.target} suffix={stat.suffix} duration={2000} />
                    </div>
                    <div style={{ color: '#8aafd4', fontSize: '0.72rem', letterSpacing: '0.5px', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Col>

          {/* RIGHT — Floating Property Card */}
          <Col lg={5} xl={6} className="d-none d-lg-flex justify-content-end align-items-center">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
              style={{ position: 'relative', width: '100%', maxWidth: '400px' }}
            >
              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  backgroundColor: 'rgba(13,31,78,0.85)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(74,144,217,0.4)',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                }}
              >
                {/* Featured tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ backgroundColor: 'rgba(45,95,196,0.3)', color: '#4a90d9', padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>{t('detail.featuredBadge')}</span>
                  <span style={{ backgroundColor: 'rgba(39,174,96,0.2)', color: '#27ae60', padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '700' }}>{t('values.Available')}</span>
                </div>

                {/* Property preview */}
                <div style={{ backgroundColor: 'rgba(45,95,196,0.1)', borderRadius: '12px', padding: '16px', marginBottom: '16px', border: '1px solid rgba(45,95,196,0.2)' }}>
                  <div style={{ color: '#4a90d9', fontSize: '0.75rem', marginBottom: '6px' }}>📍 {t('areasSection.items.downtown.name')}</div>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.05rem', marginBottom: '8px' }}>{t('hero.mock.title')}</div>
                  <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.4rem' }}>{t('hero.mock.price')}</div>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                    {[['🛏', t('card.bed', { n: 2 })], ['🚿', t('card.bath', { n: 3 })], ['📐', t('card.sqft', { n: '1,450' })]].map(([icon, label]) => (
                      <div key={label} style={{ color: '#8aafd4', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>{icon}</span><span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { label: t('hero.mini.properties'), value: '1,500+', icon: '🏠' },
                    { label: t('hero.mini.clients'), value: '1,200+', icon: '👥' },
                    { label: t('hero.mini.since'), value: '2007', icon: '📅' },
                    { label: t('common.nationalities'), value: '40+', icon: '🌍' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      style={{ backgroundColor: 'rgba(45,95,196,0.1)', borderRadius: '10px', padding: '10px', textAlign: 'center', border: '1px solid rgba(45,95,196,0.2)' }}
                    >
                      <div style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{item.icon}</div>
                      <div style={{ color: '#e0bf6a', fontWeight: '800', fontSize: '0.9rem' }}>{item.value}</div>
                      <div style={{ color: '#8aafd4', fontSize: '0.65rem', marginTop: '2px' }}>{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Decorative glow */}
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.12, filter: 'blur(40px)', zIndex: -1 }} />
              <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#4a90d9', opacity: 0.1, filter: 'blur(30px)', zIndex: -1 }} />
            </motion.div>
          </Col>

        </Row>

        {/* Slide Indicators */}
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
          {bgImages.map((_, i) => (
            <motion.div
              key={i}
              onClick={() => setCurrentBg(i)}
              whileHover={{ scale: 1.3 }}
              style={{ width: i === currentBg ? '28px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === currentBg ? '#4a90d9' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.3s ease' }}
            />
          ))}
        </div>
      </Container>

      <style>{`
        .hero-bg { animation: heroZoom 22s ease-in-out infinite alternate; will-change: transform; }
        @keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.12); } }
        .sky-window { opacity: 0.15; animation: skyTwinkle 4s ease-in-out infinite; }
        @keyframes skyTwinkle { 0%, 100% { opacity: 0.12; } 50% { opacity: 0.95; } }
        @media (prefers-reduced-motion: reduce) { .hero-bg, .sky-window { animation: none; } }
        .hero-overlay { background: linear-gradient(to right, rgba(5,15,40,0.98) 0%, rgba(5,15,40,0.93) 38%, rgba(5,15,40,0.6) 68%, rgba(5,15,40,0.3) 100%); }
        [dir="rtl"] .hero-overlay { background: linear-gradient(to left, rgba(5,15,40,0.98) 0%, rgba(5,15,40,0.93) 38%, rgba(5,15,40,0.6) 68%, rgba(5,15,40,0.3) 100%); }
        @media (max-width: 991.98px) { .hero-overlay, [dir="rtl"] .hero-overlay { background: rgba(5,15,40,0.84); } }
        .hero-search-btn { background-color: #2d5fc4; transition: background-color 0.2s ease, color 0.2s ease; }
        .hero-search-btn:hover { background-color: #c9a24b !important; color: #0a1630 !important; }
        .hero-chip { background: rgba(201,162,75,0.12); border: 1px solid rgba(201,162,75,0.45); color: #e9d6a3; border-radius: 20px; padding: 5px 14px; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
        .hero-chip:hover { background: #c9a24b; color: #0a1630; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
      `}</style>
    </div>
  )
}

export default Hero