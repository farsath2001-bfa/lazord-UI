import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { fetchProperties } from '../../utils/propertiesApi'
import { useLocalize } from '../../utils/useLocalize'
import Tilt from '../common/Tilt'

const areas = [
  {
    key: 'downtown',
    name: 'Downtown Dubai',
    keyword: 'Downtown',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    tag: 'Most Popular',
    tagColor: '#2d5fc4',
    desc: 'Burj Khalifa, Dubai Mall & Opera District'
  },
  {
    key: 'palm',
    name: 'Palm Jumeirah',
    keyword: 'Palm Jumeirah',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
    tag: 'Luxury',
    tagColor: '#e67e22',
    desc: 'Iconic island living with private beaches'
  },
  {
    key: 'marina',
    name: 'Dubai Marina',
    keyword: 'Marina',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80',
    tag: 'High ROI',
    tagColor: '#27ae60',
    desc: 'Waterfront towers & vibrant promenade'
  },
  {
    key: 'bay',
    name: 'Business Bay',
    keyword: 'Business Bay',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    tag: 'Investment',
    tagColor: '#8e44ad',
    desc: 'Dubai\'s thriving business & residential hub'
  },
  {
    key: 'creek',
    name: 'Creek Harbour',
    keyword: 'Creek',
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
    tag: 'Off Plan',
    tagColor: '#c0392b',
    desc: 'Future skyline — next to Creek Tower'
  },
  {
    key: 'jvc',
    name: 'Jumeirah Village',
    keyword: 'Jumeirah Village',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    tag: 'Affordable',
    tagColor: '#16a085',
    desc: 'Community living with high rental yields'
  },
]

const matchesArea = (property, keyword) => {
  const k = keyword.toLowerCase()
  return [property.title, property.location, property.community]
    .some(v => typeof v === 'string' && v.toLowerCase().includes(k))
}

const FeaturedAreas = () => {
  const [counts, setCounts] = useState(null)
  const { t } = useLocalize()

  // Real listing counts from the API (same matching the Properties search uses)
  useEffect(() => {
    let cancelled = false
    fetchProperties()
      .then(list => {
        if (cancelled) return
        const next = {}
        areas.forEach(a => { next[a.name] = list.filter(p => matchesArea(p, a.keyword)).length })
        setCounts(next)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const areasWithCounts = areas.map(a => ({ ...a, count: counts ? counts[a.name] : null }))

  return (
    <section style={{ backgroundColor: '#060f26',  padding: '32px 0 60px' }}>
      <Container>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '54px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(45,95,196,0.15)',
            border: '1px solid rgba(74,144,217,0.3)',
            borderRadius: '30px',
            padding: '5px 14px',
            marginBottom: '16px'
          }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>
              ✦ {t('areasSection.badge')}
            </span>
          </div>
          <h2 style={{
            color: '#ffffff',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: '300',
            lineHeight: '1.2',
            marginBottom: '6px'
          }}>
            {t('areasSection.title1')}
          </h2>
          <h2 style={{
            color: '#4a90d9',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '16px'
          }}>
            {t('areasSection.title2')}
          </h2>
          <p style={{
            color: '#8aafd4',
            fontSize: '1rem',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            {t('areasSection.subtitle')}
          </p>
          {/* Mobile swipe hint */}
          <div className="d-lg-none" style={{ color: '#4a90d9', fontSize: '0.78rem', fontWeight: '600', marginTop: '14px', opacity: 0.8 }}>
            {t('common.swipe')}
          </div>
        </div>

        {/* ── DESKTOP/TABLET — original mosaic grid, untouched ── */}
        <div className="d-none d-lg-block">
          <Row className="g-4">
            {/* Large card - first item */}
            <Col lg={6} md={12}>
              <AreaCard area={areasWithCounts[0]} height="420px" large />
            </Col>

            {/* Two stacked cards */}
            <Col lg={6} md={12}>
              <Row className="g-4">
                <Col md={6} sm={6}>
                  <AreaCard area={areasWithCounts[1]} height="200px" />
                </Col>
                <Col md={6} sm={6}>
                  <AreaCard area={areasWithCounts[2]} height="200px" />
                </Col>
                <Col md={6} sm={6}>
                  <AreaCard area={areasWithCounts[3]} height="200px" />
                </Col>
                <Col md={6} sm={6}>
                  <AreaCard area={areasWithCounts[4]} height="200px" />
                </Col>
              </Row>
            </Col>

            {/* Bottom full-width card */}
            <Col md={12}>
              <AreaCard area={areasWithCounts[5]} height="180px" wide />
            </Col>
          </Row>
        </div>

        {/* ── MOBILE — uniform horizontal swipeable slider ── */}
        <div className="d-lg-none">
          <div className="featured-areas-track">
            {areasWithCounts.map((area, i) => (
              <div key={i} className="featured-areas-slide">
                <AreaCard area={area} height="240px" wide />
              </div>
            ))}
          </div>
          <div className="featured-areas-dots">
            {areas.map((area, i) => (
              <span key={i} style={{ backgroundColor: area.tagColor }} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link
            to="/properties"
            style={{
              display: 'inline-block',
              color: '#4a90d9',
              border: '1.5px solid #4a90d9',
              borderRadius: '10px',
              padding: '13px 36px',
              fontSize: '0.9rem',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#2d5fc4'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.borderColor = '#2d5fc4'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#4a90d9'
              e.currentTarget.style.borderColor = '#4a90d9'
            }}
          >
            {t('areasSection.explore')}
          </Link>
        </div>

      </Container>

      <style>{`
        .featured-areas-track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 4px 4px 8px;
          margin: 0 -4px;
        }
        .featured-areas-track::-webkit-scrollbar { display: none; }
        .featured-areas-slide {
          flex: 0 0 82%;
          scroll-snap-align: center;
        }
        .featured-areas-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 14px;
        }
        .featured-areas-dots span {
          width: 6px; height: 6px; border-radius: 50%;
          opacity: 0.35;
        }
        @media (min-width: 480px) {
          .featured-areas-slide { flex-basis: 62%; }
        }
      `}</style>
    </section>
  )
}

const AreaCardInner = ({ area, height, large, wide }) => {
  const { t } = useLocalize()
  const areaName = t(`areasSection.items.${area.key}.name`)
  return (
    <Link
      to={`/properties?search=${encodeURIComponent(area.keyword)}`}
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
    >
      <div style={{
        position: 'relative',
        height: height,
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        width: '100%'
      }}
        onMouseEnter={e => {
          e.currentTarget.querySelector('.area-overlay').style.background =
            'linear-gradient(to top, rgba(5,15,40,0.95) 40%, rgba(5,15,40,0.3) 100%)'
          e.currentTarget.querySelector('.area-img').style.transform = 'scale(1.08)'
        }}
        onMouseLeave={e => {
          e.currentTarget.querySelector('.area-overlay').style.background =
            'linear-gradient(to top, rgba(5,15,40,0.85) 30%, rgba(5,15,40,0.1) 100%)'
          e.currentTarget.querySelector('.area-img').style.transform = 'scale(1)'
        }}
      >
        {/* Image */}
        <img
          className="area-img"
          src={area.image}
          alt={areaName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
        />

        {/* Overlay */}
        <div
          className="area-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(5,15,40,0.85) 30%, rgba(5,15,40,0.1) 100%)',
            transition: 'background 0.3s ease'
          }}
        />

        {/* Tag */}
        <div style={{
          position: 'absolute',
          top: '14px',
          insetInlineStart: '14px',
          backgroundColor: area.tagColor,
          color: '#fff',
          fontSize: '0.7rem',
          fontWeight: '700',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          padding: '4px 10px',
          borderRadius: '20px'
        }}>
          {t(`areasSection.items.${area.key}.tag`)}
        </div>

        {/* Content */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: large ? '24px' : '16px'
        }}>
          <h3 style={{
            color: '#ffffff',
            fontSize: large ? '1.6rem' : '1rem',
            fontWeight: '700',
            marginBottom: '4px',
            lineHeight: '1.2'
          }}>
            {areaName}
          </h3>
          {(large || wide) && (
            <p style={{
              color: '#8aafd4',
              fontSize: '0.82rem',
              marginBottom: '8px',
              lineHeight: '1.4'
            }}>
              {t(`areasSection.items.${area.key}.desc`)}
            </p>
          )}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(45,95,196,0.4)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(74,144,217,0.3)',
            borderRadius: '20px',
            padding: '4px 12px',
          }}>
            <span style={{ color: '#4a90d9', fontSize: '0.75rem', fontWeight: '600' }}>
              {area.count === null || area.count === undefined
                ? t('areasSection.view')
                : area.count === 0 ? t('areasSection.soon')
                : area.count === 1 ? t('areasSection.count1')
                : t('areasSection.count', { n: area.count })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

const AreaCard = (props) => (
  <Tilt max={4}>
    <AreaCardInner {...props} />
  </Tilt>
)

export default FeaturedAreas