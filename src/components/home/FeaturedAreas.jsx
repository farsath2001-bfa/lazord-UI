import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

const areas = [
  {
    name: 'Downtown Dubai',
    properties: 142,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    tag: 'Most Popular',
    tagColor: '#2d5fc4',
    desc: 'Burj Khalifa, Dubai Mall & Opera District'
  },
  {
    name: 'Palm Jumeirah',
    properties: 98,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
    tag: 'Luxury',
    tagColor: '#e67e22',
    desc: 'Iconic island living with private beaches'
  },
  {
    name: 'Dubai Marina',
    properties: 215,
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80',
    tag: 'High ROI',
    tagColor: '#27ae60',
    desc: 'Waterfront towers & vibrant promenade'
  },
  {
    name: 'Business Bay',
    properties: 176,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    tag: 'Investment',
    tagColor: '#8e44ad',
    desc: 'Dubai\'s thriving business & residential hub'
  },
  {
    name: 'Creek Harbour',
    properties: 64,
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
    tag: 'Off Plan',
    tagColor: '#c0392b',
    desc: 'Future skyline — next to Creek Tower'
  },
  {
    name: 'Jumeirah Village',
    properties: 189,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    tag: 'Affordable',
    tagColor: '#16a085',
    desc: 'Community living with high rental yields'
  },
]

const FeaturedAreas = () => {
  return (
    <section style={{ backgroundColor: '#060f26', padding: '90px 0' }}>
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
              ✦ Prime Locations
            </span>
          </div>
          <h2 style={{
            color: '#ffffff',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: '300',
            lineHeight: '1.2',
            marginBottom: '6px'
          }}>
            Explore Dubai's Most
          </h2>
          <h2 style={{
            color: '#4a90d9',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '16px'
          }}>
            Prestigious Communities
          </h2>
          <p style={{
            color: '#8aafd4',
            fontSize: '1rem',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            From iconic waterfront towers to peaceful family communities — find your perfect Dubai neighbourhood.
          </p>
        </div>

        {/* Areas Grid */}
        <Row className="g-4">
          {/* Large card - first item */}
          <Col lg={6} md={12}>
            <AreaCard area={areas[0]} height="420px" large />
          </Col>

          {/* Two stacked cards */}
          <Col lg={6} md={12}>
            <Row className="g-4">
              <Col md={6} sm={6}>
                <AreaCard area={areas[1]} height="200px" />
              </Col>
              <Col md={6} sm={6}>
                <AreaCard area={areas[2]} height="200px" />
              </Col>
              <Col md={6} sm={6}>
                <AreaCard area={areas[3]} height="200px" />
              </Col>
              <Col md={6} sm={6}>
                <AreaCard area={areas[4]} height="200px" />
              </Col>
            </Row>
          </Col>

          {/* Bottom full-width card */}
          <Col md={12}>
            <AreaCard area={areas[5]} height="180px" wide />
          </Col>
        </Row>

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
            Explore All Areas →
          </Link>
        </div>

      </Container>
    </section>
  )
}

const AreaCard = ({ area, height, large, wide }) => {
  return (
    <Link
      to={`/properties?location=${encodeURIComponent(area.name)}`}
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
          alt={area.name}
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
          left: '14px',
          backgroundColor: area.tagColor,
          color: '#fff',
          fontSize: '0.7rem',
          fontWeight: '700',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          padding: '4px 10px',
          borderRadius: '20px'
        }}>
          {area.tag}
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
            {area.name}
          </h3>
          {(large || wide) && (
            <p style={{
              color: '#8aafd4',
              fontSize: '0.82rem',
              marginBottom: '8px',
              lineHeight: '1.4'
            }}>
              {area.desc}
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
              {area.properties} Properties
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default FeaturedAreas
