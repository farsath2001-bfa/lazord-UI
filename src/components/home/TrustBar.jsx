import { Container } from 'react-bootstrap'
import emaar from '../../assets/image/emaar.png'
import damac from '../../assets/image/damac.png'
import nakheel from '../../assets/image/nakheel.png'
import meraas from '../../assets/image/meraas.png'
import dubaiProperties from '../../assets/image/dubaiproperties.jfif'
import binghatti from '../../assets/image/binghatti.png'

const developers = [
  { name: 'Emaar',            logo: emaar },
  { name: 'DAMAC',            logo: damac },
  { name: 'Nakheel',          logo: nakheel },
  { name: 'Meraas',           logo: meraas },
  { name: 'Dubai Properties', logo: dubaiProperties },
  { name: 'Binghatti',        logo: binghatti },
]

const TrustBar = () => {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #060f26 0%, #0d1f4e 50%, #060f26 100%)',
      padding: '56px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '200px', backgroundColor: '#2d5fc4', opacity: 0.04, filter: 'blur(80px)', borderRadius: '50%' }} />

      <Container>

        {/* Top Rating Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '44px' }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(74,144,217,0.25)',
            borderRadius: '16px', padding: '20px 36px',
            flexWrap: 'wrap', justifyContent: 'center', gap: '24px'
          }}>
            {/* Rating */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: '900', color: '#ffffff', lineHeight: '1', marginBottom: '4px' }}>4.9</div>
              <div style={{ color: '#f1c40f', fontSize: '1rem', letterSpacing: '3px' }}>★★★★★</div>
              <div style={{ color: '#8aafd4', fontSize: '0.72rem', marginTop: '4px', letterSpacing: '0.5px' }}>RATING</div>
            </div>
            <div style={{ width: '1px', height: '50px', backgroundColor: 'rgba(74,144,217,0.3)' }} />
            {/* Tagline */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#ffffff', fontSize: '1rem', lineHeight: '1.7', fontWeight: '300' }}>
                Every real estate <span style={{ color: '#e67e22', fontWeight: '700' }}>decision.</span>
              </div>
              <div style={{ color: '#ffffff', fontSize: '1rem', lineHeight: '1.7', fontWeight: '300' }}>
                One <span style={{ color: '#4a90d9', fontWeight: '700' }}>trusted</span> partner.
              </div>
            </div>
            <div style={{ width: '1px', height: '50px', backgroundColor: 'rgba(74,144,217,0.3)' }} />
            {/* Google */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'center', marginBottom: '4px' }}>
                {['G','o','o','g','l','e'].map((l, i) => (
                  <span key={i} style={{ fontWeight: '800', fontSize: '0.9rem', color: ['#4285F4','#EA4335','#FBBC05','#4285F4','#34A853','#EA4335'][i] }}>{l}</span>
                ))}
              </div>
              <div style={{ color: '#ffffff', fontWeight: '900', fontSize: '1.8rem', lineHeight: '1' }}>15,000+</div>
              <div style={{ color: '#8aafd4', fontSize: '0.72rem', marginTop: '4px', letterSpacing: '0.5px' }}>REVIEWS</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(74,144,217,0.2)' }} />
          <p style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600', margin: 0, whiteSpace: 'nowrap' }}>
            Trusted Partner of the Most Prominent Developers
          </p>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(74,144,217,0.2)' }} />
        </div>

        {/* Logos — white background cards */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          {developers.map((dev, i) => (
            <div key={i} style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(74,144,217,0.2)',
              borderRadius: '12px', padding: '14px 22px',
              minWidth: '140px', height: '72px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#4a90d9'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(74,144,217,0.25)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(74,144,217,0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <img
                src={dev.logo}
                alt={dev.name}
                style={{
                  maxHeight: '40px', maxWidth: '110px',
                  objectFit: 'contain',
                  filter: 'grayscale(100%)',
                  opacity: 0.75,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.opacity = '1' }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = '0.75' }}
              />
            </div>
          ))}
        </div>

      </Container>
    </section>
  )
}

export default TrustBar