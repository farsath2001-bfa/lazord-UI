import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import heroBg from '../../assets/image/hero.webp'

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Buy')
  const navigate = useNavigate()
  const { t } = useTranslation()

  const tabs = [
    { key: 'buy',     label: t('hero.tabs.buy') },
    { key: 'rent',    label: t('hero.tabs.rent') },
    { key: 'sell',    label: t('hero.tabs.sell') },
    { key: 'offplan', label: t('hero.tabs.offplan') },
  ]

  const handleSearch = () => {
    navigate(`/properties?search=${searchQuery}&type=${activeTab}`)
  }

  return (
    <div style={{
      position: 'relative', width: '100%',
      minHeight: 'calc(100vh - 80px)',
      display: 'flex', alignItems: 'center', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(5,15,40,0.92) 40%, rgba(5,15,40,0.5) 100%)',
        zIndex: 1
      }} />
      
     <Container style={{ position: 'relative', zIndex: 2, padding: '30px 30px 50px 30px' }}>
        <Row>
          <Col lg={8} xl={7}>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundColor: 'rgba(45,95,196,0.25)',
              border: '1px solid rgba(74,144,217,0.5)',
              borderRadius: '30px', padding: '6px 16px', marginBottom: '28px'
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4a90d9', animation: 'pulse 2s infinite' }} />
              <span style={{ color: '#8aafd4', fontSize: '0.82rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {t('hero.badge')}
              </span>
            </div>

            <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: '300', lineHeight: '1.15', marginBottom: '10px', letterSpacing: '-0.5px' }}>
              {t('hero.headline1')}
            </h1>
            <h1 style={{ color: '#4a90d9', fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '16px', letterSpacing: '-1px' }}>
              {t('hero.headline2')}
            </h1>

            <p style={{ color: '#b0c4de', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', lineHeight: '1.7', marginBottom: '24px', maxWidth: '520px' }}>
              {t('hero.subtitle')}
            </p>

            {/* Search Box */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: '12px',
              padding: '6px', maxWidth: '600px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)', marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', gap: '4px', padding: '4px 4px 10px 4px', borderBottom: '1px solid #e8ecf2' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      padding: '7px 18px', borderRadius: '8px', border: 'none',
                      cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600',
                      letterSpacing: '0.5px', transition: 'all 0.2s ease',
                      backgroundColor: activeTab === tab.key ? '#0d1f4e' : 'transparent',
                      color: activeTab === tab.key ? '#ffffff' : '#666'
                    }}
                  >
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
                <button
                  onClick={handleSearch}
                  style={{ backgroundColor: '#2d5fc4', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}
                >
                  {t('hero.searchBtn')}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap' }}>
              {[
                { number: '1,500+', label: t('hero.stats.properties') },
                { number: '1,200+', label: t('hero.stats.clients') },
                { number: '22+',    label: t('hero.stats.experience') },
              ].map((stat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  {i > 0 && <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(74,144,217,0.3)', margin: '0 28px' }} />}
                  <div>
                    <div style={{ color: '#ffffff', fontSize: '2rem', fontWeight: '700', lineHeight: '1' }}>{stat.number}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.8rem', letterSpacing: '0.5px', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

          </Col>
        </Row>
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