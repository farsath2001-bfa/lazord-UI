import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import PropertyCard from '../common/PropertyCard'
import propertiesData from '../../assets/data/Properties'

const FeaturedProperties = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('All')

  const tabs = [
    { key: 'All',      label: t('featured.tabs.all') },
    { key: 'Buy',      label: t('featured.tabs.buy') },
    { key: 'Rent',     label: t('featured.tabs.rent') },
    { key: 'Off Plan', label: t('featured.tabs.offplan') },
  ]

  const filtered = propertiesData
    .filter(p => activeTab === 'All' ? p.featured : p.type === activeTab)
    .slice(0, 6)

  return (
    <section style={{ backgroundColor: '#060f26', padding: '90px 0' }}>
      <Container>
        <div style={{ marginBottom: '50px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(45,95,196,0.15)',
            border: '1px solid rgba(74,144,217,0.3)',
            borderRadius: '30px', padding: '5px 14px', marginBottom: '16px'
          }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>
              ✦ {t('featured.badge')}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', lineHeight: '1.2', marginBottom: '6px' }}>
                {t('featured.title1')}
              </h2>
              <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', lineHeight: '1.2', marginBottom: '0' }}>
                {t('featured.title2')}
              </h2>
            </div>
            <Link to="/properties" style={{
              color: '#4a90d9', border: '1.5px solid #4a90d9', borderRadius: '8px',
              padding: '10px 22px', fontSize: '0.85rem', fontWeight: '600',
              textDecoration: 'none', transition: 'all 0.2s ease', whiteSpace: 'nowrap'
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#4a90d9'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#4a90d9' }}
            >
              {t('featured.viewAll')}
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '36px', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              padding: '8px 22px', borderRadius: '30px',
              border: activeTab === tab.key ? '1.5px solid #4a90d9' : '1.5px solid rgba(45,95,196,0.3)',
              cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600',
              transition: 'all 0.2s ease',
              backgroundColor: activeTab === tab.key ? '#2d5fc4' : 'transparent',
              color: activeTab === tab.key ? '#ffffff' : '#8aafd4',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        <Row className="g-4">
          {filtered.map(property => (
            <Col key={property.id} lg={4} md={6}>
              <PropertyCard property={property} />
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <p style={{ color: '#8aafd4', marginBottom: '20px', fontSize: '0.95rem' }}>
            {t('featured.portfolio')} {propertiesData.length}+ {t('featured.premiumProperties')}
          </p>
          <Link to="/properties" style={{
            display: 'inline-block', backgroundColor: '#2d5fc4', color: '#ffffff',
            padding: '14px 40px', borderRadius: '10px', fontSize: '0.95rem',
            fontWeight: '700', textDecoration: 'none', transition: 'background 0.2s ease'
          }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}
          >
            {t('featured.browseAll')}
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default FeaturedProperties