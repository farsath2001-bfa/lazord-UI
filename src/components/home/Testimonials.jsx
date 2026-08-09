import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const testimonials = [
  { name: 'Ahmed Al Mansouri', role: 'Property Investor',    location: 'Dubai, UAE',      avatar: 'A', avatarColor: '#2d5fc4', rating: 5, text: 'Lazord Real Estate helped me find the perfect investment property in Downtown Dubai. Their market knowledge is unmatched and the entire process was smooth and transparent.' },
  { name: 'Sarah Mitchell',    role: 'Homebuyer',            location: 'London, UK',      avatar: 'S', avatarColor: '#27ae60', rating: 5, text: 'As an overseas buyer, I was nervous about purchasing in Dubai. The Lazord team guided me every step of the way — from property selection to mortgage and handover.' },
  { name: 'Rajesh Patel',      role: 'Business Owner',       location: 'Mumbai, India',   avatar: 'R', avatarColor: '#e67e22', rating: 5, text: 'I have worked with many real estate agencies in Dubai but Lazord stands out. They found me a commercial space in Business Bay that perfectly suits my needs.' },
  { name: 'Fatima Al Zaabi',   role: 'First-time Buyer',     location: 'Abu Dhabi, UAE',  avatar: 'F', avatarColor: '#8e44ad', rating: 5, text: 'Buying my first apartment felt overwhelming but the Lazord team made it so easy. They explained everything clearly and found me a beautiful apartment in Dubai Marina.' },
  { name: 'James Thornton',    role: 'Expat Resident',       location: 'Sydney, Australia',avatar: 'J', avatarColor: '#16a085', rating: 5, text: 'Rented through Lazord and the experience was seamless. They matched me with the perfect apartment in JBR, handled all the paperwork, and even helped with utilities setup.' },
  { name: 'Chen Wei',          role: 'Portfolio Investor',   location: 'Shanghai, China', avatar: 'C', avatarColor: '#c0392b', rating: 5, text: 'I have purchased three off-plan properties through Lazord. Each time they delivered excellent advice on timing, location and developer reputation.' },
]

const Stars = ({ count }) => (
  <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
    {Array.from({ length: count }).map((_, i) => <span key={i} style={{ color: '#f1c40f', fontSize: '1rem' }}>★</span>)}
  </div>
)

const TestimonialCard = ({ t2 }) => (
  <div style={{
    backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)',
    borderRadius: '16px', padding: '28px 24px', height: '100%',
    display: 'flex', flexDirection: 'column', transition: 'all 0.25s ease'
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(45,95,196,0.2)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
  >
    <div style={{ color: '#2d5fc4', fontSize: '3.5rem', lineHeight: '1', marginBottom: '8px', opacity: 0.4, fontFamily: 'Georgia, serif' }}>"</div>
    <Stars count={t2.rating} />
    <p style={{ color: '#b0c4de', fontSize: '0.9rem', lineHeight: '1.8', flex: 1, marginBottom: '24px', fontStyle: 'italic' }}>{t2.text}</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: t2.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '1.1rem', flexShrink: 0 }}>
        {t2.avatar}
      </div>
      <div>
        <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.9rem' }}>{t2.name}</div>
        <div style={{ color: '#a3c0e8', fontSize: '0.78rem', marginTop: '2px' }}>{t2.role} · {t2.location}</div>
      </div>
    </div>
  </div>
)

const Testimonials = () => {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const visibleCount = 3
  const visible = testimonials.slice(active, active + visibleCount)
  const next = () => setActive(p => (p + 1) % (testimonials.length - visibleCount + 1))
  const prev = () => setActive(p => Math.max(0, p - 1))

  return (
    <section style={{ backgroundColor: '#060f26', padding: '90px 0' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)',
            borderRadius: '30px', padding: '5px 14px', marginBottom: '16px'
          }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>
              ✦ {t('testimonials.badge')}
            </span>
          </div>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', marginBottom: '6px' }}>{t('testimonials.title1')}</h2>
          <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '16px' }}>{t('testimonials.title2')}</h2>
          <p style={{ color: '#a3c0e8', fontSize: '1rem', maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>{t('testimonials.subtitle')}</p>
          {/* Mobile swipe hint */}
          <div className="d-md-none" style={{ color: '#4a90d9', fontSize: '0.78rem', fontWeight: '600', marginTop: '12px', opacity: 0.8 }}>
            ← swipe to explore →
          </div>
        </div>

        {/* ── DESKTOP/TABLET — windowed 3-at-a-time carousel with prev/next, untouched ── */}
        <div className="d-none d-md-block">
          <Row className="g-4">
            {visible.map((t2, i) => (
              <Col key={active + i} lg={4} md={6}>
                <TestimonialCard t2={t2} />
              </Col>
            ))}
          </Row>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '44px' }}>
            <button onClick={prev} disabled={active === 0} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid rgba(45,95,196,0.4)', backgroundColor: 'transparent', color: active === 0 ? '#3a4a6a' : '#4a90d9', fontSize: '1.2rem', cursor: active === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
            <div style={{ display: 'flex', gap: '8px' }}>
              {Array.from({ length: testimonials.length - visibleCount + 1 }).map((_, i) => (
                <div key={i} onClick={() => setActive(i)} style={{ width: i === active ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === active ? '#4a90d9' : 'rgba(74,144,217,0.3)', cursor: 'pointer', transition: 'all 0.3s ease' }} />
              ))}
            </div>
            <button onClick={next} disabled={active >= testimonials.length - visibleCount} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid rgba(45,95,196,0.4)', backgroundColor: 'transparent', color: active >= testimonials.length - visibleCount ? '#3a4a6a' : '#4a90d9', fontSize: '1.2rem', cursor: active >= testimonials.length - visibleCount ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
          </div>
        </div>

        {/* ── MOBILE — genuine one-at-a-time swipeable slider through all testimonials ── */}
        <div className="d-md-none">
          <div className="testimonials-slider-track">
            {testimonials.map((t2, i) => (
              <motion.div
                key={i}
                className="testimonials-slide"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <TestimonialCard t2={t2} />
              </motion.div>
            ))}
          </div>
          <div className="testimonials-slider-dots">
            {testimonials.map((t2, i) => (
              <span key={i} style={{ backgroundColor: t2.avatarColor }} />
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        .testimonials-slider-track {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 4px 4px 8px;
          margin: 0 -4px;
        }
        .testimonials-slider-track::-webkit-scrollbar { display: none; }
        .testimonials-slide { flex: 0 0 86%; scroll-snap-align: center; }
        .testimonials-slider-dots {
          display: flex; justify-content: center; gap: 6px; margin-top: 18px; flex-wrap: wrap;
        }
        .testimonials-slider-dots span { width: 6px; height: 6px; border-radius: 50%; opacity: 0.35; }
      `}</style>
    </section>
  )
}

export default Testimonials