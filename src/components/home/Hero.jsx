import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import ParticleBackground from '../common/ParticleBackground'
import CounterNumber from '../common/CounterNumber'

const bgImages = [
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80',
  'https://plus.unsplash.com/premium_photo-1697729914552-368899dc4757?fm=jpg&q=60&w=3000&auto=format&fit=crop',
  'https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7?fm=jpg&q=60&w=3000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
]

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Buy')
  const [currentBg, setCurrentBg] = useState(0)
  const [fade, setFade] = useState(true)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const tabs = [
    { key: 'Buy',      label: t('hero.tabs.buy') },
    { key: 'Rent',     label: t('hero.tabs.rent') },
    { key: 'Off Plan', label: t('hero.tabs.offplan') },
    { key: 'Commercial', label: t('nav.commercial') },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => { setCurrentBg(prev => (prev + 1) % bgImages.length); setFade(true) }, 500)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = () => {
    navigate(`/properties?search=${searchQuery}&type=${activeTab}`)
  }

  const stats = [
    { target: 1500, suffix: '+', label: t('hero.stats.properties') },
    { target: 1200, suffix: '+', label: t('hero.stats.clients') },
    { target: 18,   suffix: '+', label: t('hero.stats.experience') },
    { target: 40,   suffix: '+', label: 'Nationalities' },
  ]

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

      {/* Background Images */}
      {bgImages.map((img, i) => (
        <div key={i} style={{ position: 'absolute', inset: 0, backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: i === currentBg ? (fade ? 1 : 0) : 0, transition: 'opacity 0.8s ease', zIndex: 0 }} />
      ))}

      {/* Overlay — lighter on right for image visibility */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,15,40,0.95) 35%, rgba(5,15,40,0.55) 65%, rgba(5,15,40,0.3) 100%)', zIndex: 1 }} />

      <ParticleBackground />

      <Container style={{ position: 'relative', zIndex: 2, padding: '40px 20px 60px' }}>
        <Row className="align-items-center">

          {/* LEFT — Content */}
          <Col lg={7} xl={6}>

            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.25)', border: '1px solid rgba(74,144,217,0.5)', borderRadius: '30px', padding: '6px 16px', marginBottom: '20px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4a90d9', animation: 'pulse 2s infinite' }} />
              <span style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{t('hero.badge')}</span>
            </div>

            {/* Headline */}
            <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 4vw, 3.4rem)', fontWeight: '300', lineHeight: '1.15', marginBottom: '10px', letterSpacing: '-0.5px' }}>
              {t('hero.headline1')}
            </h1>
            <h1 style={{ color: '#4a90d9', fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '16px', letterSpacing: '-1px' }}>
              {t('hero.headline2')}
            </h1>

            {/* Subtitle */}
            <p style={{ color: '#b0c4de', fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', lineHeight: '1.7', marginBottom: '28px', maxWidth: '480px' }}>
              {t('hero.subtitle')}
            </p>

            {/* Search Box — wider */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: '14px', padding: '8px', maxWidth: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', marginBottom: '36px' }}>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: '4px', padding: '4px 4px 10px 4px', borderBottom: '1px solid #e8ecf2' }}>
                {tabs.map(tab => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                    style={{ flex: 1, padding: '8px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600', transition: 'all 0.2s ease', backgroundColor: activeTab === tab.key ? '#0d1f4e' : 'transparent', color: activeTab === tab.key ? '#ffffff' : '#666', whiteSpace: 'nowrap' }}>
                    {tab.label}
                  </button>
                ))}
              </div>
              {/* Search input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 8px 4px 8px' }}>
                <span style={{ fontSize: '1.1rem', paddingLeft: '6px', flexShrink: 0 }}>🔍</span>
                <input
                  type="text"
                  placeholder={t('hero.searchPlaceholder')}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  style={{ flex: 1, border: 'none', outline: 'none', fontSize: '0.92rem', color: '#1a1a2e', backgroundColor: 'transparent', padding: '8px 4px', minWidth: 0 }}
                />
                <button onClick={handleSearch}
                  style={{ backgroundColor: '#2d5fc4', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}
                >
                  {t('hero.searchBtn')}
                </button>
              </div>
            </div>

            {/* Stats — improved with icons */}
            <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap' }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  {i > 0 && <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(74,144,217,0.3)', margin: '0 20px' }} />}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: '800', lineHeight: '1' }}>
                      <CounterNumber target={stat.target} suffix={stat.suffix} duration={2000} />
                    </div>
                    <div style={{ color: '#8aafd4', fontSize: '0.72rem', letterSpacing: '0.5px', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

          </Col>

          {/* RIGHT — Floating Property Card (desktop only) */}
          <Col lg={5} xl={6} className="d-none d-lg-flex justify-content-end align-items-center">
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>

              {/* Floating card */}
              <div style={{
                backgroundColor: 'rgba(13,31,78,0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(74,144,217,0.4)',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                animation: 'floatCard 4s ease-in-out infinite'
              }}>
                {/* Featured tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ backgroundColor: 'rgba(45,95,196,0.3)', color: '#4a90d9', padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>⭐ Featured</span>
                  <span style={{ backgroundColor: 'rgba(39,174,96,0.2)', color: '#27ae60', padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '700' }}>Available</span>
                </div>

                {/* Property preview */}
                <div style={{ backgroundColor: 'rgba(45,95,196,0.1)', borderRadius: '12px', padding: '16px', marginBottom: '16px', border: '1px solid rgba(45,95,196,0.2)' }}>
                  <div style={{ color: '#4a90d9', fontSize: '0.75rem', marginBottom: '6px' }}>📍 Downtown Dubai</div>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.05rem', marginBottom: '8px' }}>Luxury 2BR Apartment</div>
                  <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.4rem' }}>AED 2.8M</div>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                    {[['🛏', '2 Beds'], ['🚿', '3 Baths'], ['📐', '1,450 sqft']].map(([icon, label]) => (
                      <div key={label} style={{ color: '#8aafd4', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>{icon}</span><span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { label: 'Properties', value: '1,500+', icon: '🏠' },
                    { label: 'Happy Clients', value: '1,200+', icon: '👥' },
                    { label: 'RERA Licensed', value: '2007', icon: '✅' },
                    { label: 'Nationalities', value: '40+', icon: '🌍' },
                  ].map((item, i) => (
                    <div key={i} style={{ backgroundColor: 'rgba(45,95,196,0.1)', borderRadius: '10px', padding: '10px', textAlign: 'center', border: '1px solid rgba(45,95,196,0.2)' }}>
                      <div style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{item.icon}</div>
                      <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '0.9rem' }}>{item.value}</div>
                      <div style={{ color: '#8aafd4', fontSize: '0.65rem', marginTop: '2px' }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative glow */}
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.12, filter: 'blur(40px)', zIndex: -1 }} />
              <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#4a90d9', opacity: 0.1, filter: 'blur(30px)', zIndex: -1 }} />
            </div>
          </Col>

        </Row>

        {/* Slide Indicators */}
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
          {bgImages.map((_, i) => (
            <div key={i} onClick={() => { setFade(false); setTimeout(() => { setCurrentBg(i); setFade(true) }, 300) }}
              style={{ width: i === currentBg ? '28px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === currentBg ? '#4a90d9' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.3s ease' }} />
          ))}
        </div>
      </Container>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
        @keyframes floatCard { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
      `}</style>
    </div>
  )
}

export default Hero