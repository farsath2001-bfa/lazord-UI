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
    { key: 'buy',     label: t('hero.tabs.buy') },
    { key: 'rent',    label: t('hero.tabs.rent') },
    { key: 'sell',    label: t('hero.tabs.sell') },
    { key: 'offplan', label: t('hero.tabs.offplan') },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrentBg(prev => (prev + 1) % bgImages.length)
        setFade(true)
      }, 500)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = () => {
    navigate(`/properties?search=${searchQuery}&type=${activeTab}`)
  }

  return (
    <div style={{
      position: 'relative', width: '100%',
      minHeight: 'calc(100vh - 80px)',
      display: 'flex', alignItems: 'center', overflow: 'hidden'
    }}>

      {/* Background Images */}
      {bgImages.map((img, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: i === currentBg ? (fade ? 1 : 0) : 0,
          transition: 'opacity 0.8s ease',
          zIndex: 0
        }} />
      ))}

      {/* Dark Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(5,15,40,0.92) 40%, rgba(5,15,40,0.5) 100%)',
        zIndex: 1
      }} />

      {/* ✅ Particle Background */}
      <ParticleBackground />

      {/* Content */}
      <Container style={{ position: 'relative', zIndex: 2, padding: '30px 30px 50px 30px' }}>
        <Row>
          <Col lg={8} xl={7}>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundColor: 'rgba(45,95,196,0.25)',
              border: '1px solid rgba(74,144,217,0.5)',
              borderRadius: '30px', padding: '6px 16px', marginBottom: '20px'
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4a90d9', animation: 'pulse 2s infinite' }} />
              <span style={{ color: '#8aafd4', fontSize: '0.82rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {t('hero.badge')}
              </span>
            </div>

            {/* Headline */}
            <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: '300', lineHeight: '1.15', marginBottom: '10px', letterSpacing: '-0.5px' }}>
              {t('hero.headline1')}
            </h1>
            <h1 style={{ color: '#4a90d9', fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '16px', letterSpacing: '-1px' }}>
              {t('hero.headline2')}
            </h1>

            {/* Subtitle */}
            <p style={{ color: '#b0c4de', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', lineHeight: '1.7', marginBottom: '24px', maxWidth: '520px' }}>
              {t('hero.subtitle')}
            </p>

            {/* Search Box */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: '12px',
              padding: '6px', maxWidth: '600px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)', marginBottom: '36px'
            }}>
              <div style={{ display: 'flex', gap: '4px', padding: '4px 4px 10px 4px', borderBottom: '1px solid #e8ecf2' }}>
                {tabs.map(tab => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                    padding: '7px 18px', borderRadius: '8px', border: 'none',
                    cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600',
                    transition: 'all 0.2s ease',
                    backgroundColor: activeTab === tab.key ? '#0d1f4e' : 'transparent',
                    color: activeTab === tab.key ? '#ffffff' : '#666'
                  }}>
                    {tab.label}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 8px 4px 8px' }}>
                <span style={{ fontSize: '1.1rem', paddingLeft: '6px' }}>🔍</span>
                <input
                  type="text"
                  placeholder={t('hero.searchPlaceholder')}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  style={{ flex: 1, border: 'none', outline: 'none', fontSize: '0.95rem', color: '#1a1a2e', backgroundColor: 'transparent', padding: '8px 4px' }}
                />
                <button onClick={handleSearch} style={{
                  backgroundColor: '#2d5fc4', color: '#ffffff', border: 'none',
                  borderRadius: '8px', padding: '12px 28px', fontSize: '0.9rem',
                  fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.2s ease'
                }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}
                >
                  {t('hero.searchBtn')}
                </button>
              </div>
            </div>

            {/* Stats with Counter */}
            <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap' }}>
              {[
                { target: 1500, suffix: '+', label: t('hero.stats.properties') },
                { target: 1200, suffix: '+', label: t('hero.stats.clients') },
                { target: 22,   suffix: '+', label: t('hero.stats.experience') },
              ].map((stat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  {i > 0 && <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(74,144,217,0.3)', margin: '0 28px' }} />}
                  <div>
                    <div style={{ color: '#ffffff', fontSize: '2rem', fontWeight: '700', lineHeight: '1' }}>
                      <CounterNumber target={stat.target} suffix={stat.suffix} duration={2000} />
                    </div>
                    <div style={{ color: '#8aafd4', fontSize: '0.8rem', letterSpacing: '0.5px', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

          </Col>
        </Row>

        {/* Slide Indicators */}
        <div style={{ position: 'absolute', bottom: '20px', right: '30px', display: 'flex', gap: '8px' }}>
          {bgImages.map((_, i) => (
            <div
              key={i}
              onClick={() => { setFade(false); setTimeout(() => { setCurrentBg(i); setFade(true) }, 300) }}
              style={{
                width: i === currentBg ? '28px' : '8px',
                height: '8px', borderRadius: '4px',
                backgroundColor: i === currentBg ? '#4a90d9' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer', transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

      </Container>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  )
}

export default Hero