import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { motion, useInView } from 'framer-motion'
import Services from '../components/home/Services'
import Testimonials from '../components/home/Testimonials'

const IMAGE_HERO  = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=80'
const IMAGE_STORY = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80'
const IMAGE_WHY   = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80'

const team = [
  { name: 'Mohammed Al Nimer', role: 'CEO',                      exp: '15 Years Experience', avatar: 'M', color: '#2d5fc4', langs: 'Arabic, English',            spec: 'Luxury Villas & Penthouses' },
  { name: 'Khairy',            role: 'Senior Sales Director',    exp: '14 Years Experience', avatar: 'K', color: '#27ae60', langs: 'English, Arabic',            spec: 'Off Plan & Investments' },
  { name: 'Fethi',             role: 'Property Consultant',      exp: '7 Years Experience',  avatar: 'F', color: '#e67e22', langs: 'English, Arabic',            spec: 'Apartments & Rentals' },
  { name: 'Abdullah',          role: 'Client Relations Manager', exp: '14 Years Experience', avatar: 'G', color: '#8e44ad', langs: 'Arabic, English',            spec: 'Client Experience' },
  { name: 'Jardali',           role: 'Investment Advisor',       exp: '11 Years Experience', avatar: 'J', color: '#16a085', langs: 'English, Brazilian, Arabic', spec: 'Commercial & Portfolio' },
  { name: 'Ahmed',             role: 'Property Consultant',      exp: '8 Years Experience',  avatar: 'A', color: '#c0392b', langs: 'Arabic, English',            spec: 'Business Bay & Dubai Land' },
]

const milestones = [
  { year: '2007', title: 'Company Founded',        desc: 'Lazord Real Estate LLC established in Dubai as a trusted real estate brokerage serving the UAE market.', icon: '🏗️' },
  { year: '2010', title: 'Market Expansion',       desc: 'Expanded portfolio across key Dubai communities including Downtown, Marina and JBR.', icon: '📈' },
  { year: '2015', title: 'Strategic Partnerships', desc: 'Became registered brokers with major UAE developers including Nakheel and Dubai Properties.', icon: '🤝' },
  { year: '2019', title: 'RERA Certified',         desc: 'Achieved full RERA registration and DED licensing, ensuring fully compliant transactions.', icon: '📋' },
  { year: '2024', title: 'Digital Transformation', desc: 'Launched digital property platform to serve international investors remotely.', icon: '💻' },
  { year: '2026', title: 'Today',                  desc: 'Continuing to grow with 1,500+ listings, 18+ years of expertise and dedicated professionals.', icon: '🚀' },
]

// Reusable fade-up animation wrapper
const FadeUp = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const FadeLeft = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

const FadeRight = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

const badgeStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '8px',
  backgroundColor: 'rgba(45,95,196,0.15)',
  border: '1px solid rgba(74,144,217,0.3)',
  borderRadius: '30px', padding: '5px 14px', marginBottom: '14px'
}
const badgeTextStyle = {
  color: '#4a90d9', fontSize: '0.78rem',
  letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600'
}
const sectionGap = { marginBottom: '80px' }
const cardStyle = {
  backgroundColor: '#0d1f4e',
  border: '1px solid rgba(45,95,196,0.25)',
  borderRadius: '14px', padding: '28px 22px',
  height: '100%', transition: 'all 0.25s ease'
}

const About = () => {
  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* ── HERO with Dubai BG Image ── */}
      <div style={{ position: 'relative', minHeight: '520px', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: '1px solid rgba(45,95,196,0.3)' }}>

        {/* BG Image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${IMAGE_HERO})`,
          backgroundSize: 'cover', backgroundPosition: 'center top',
          filter: 'brightness(0.25)'
        }} />

        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(45,95,196,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(45,95,196,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        {/* Gradient fade bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to bottom, transparent, #060f26)' }} />

        {/* Floating particles */}
        {[
          { left: '70%', bottom: '30%', delay: '0s' },
          { left: '80%', bottom: '50%', delay: '1.2s' },
          { left: '65%', bottom: '20%', delay: '0.6s' },
          { left: '85%', bottom: '40%', delay: '1.8s' },
        ].map((p, i) => (
          <div key={i} style={{
            position: 'absolute', left: p.left, bottom: p.bottom,
            width: '4px', height: '4px', borderRadius: '50%',
            backgroundColor: '#4a90d9', opacity: 0.6,
            animation: `particleFloat 4s ease-out infinite`,
            animationDelay: p.delay
          }} />
        ))}

        {/* Orbit ring */}
        <div style={{
          position: 'absolute', width: '500px', height: '500px',
          border: '1px solid rgba(45,95,196,0.1)', borderRadius: '50%',
          right: '-100px', top: '50%', transform: 'translateY(-50%)',
          animation: 'spinSlow 25s linear infinite'
        }}>
          <div style={{ position: 'absolute', width: '8px', height: '8px', background: '#2d5fc4', borderRadius: '50%', top: '-4px', left: '50%', transform: 'translateX(-50%)' }} />
        </div>
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          border: '1px solid rgba(45,95,196,0.07)', borderRadius: '50%',
          right: '50px', top: '50%', transform: 'translateY(-50%)',
          animation: 'spinSlow 15s linear infinite reverse'
        }} />

        <Container style={{ position: 'relative', zIndex: 2, padding: '80px 20px' }}>
          <Row className="align-items-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <div style={badgeStyle}><span style={badgeTextStyle}>✦ About Lazord</span></div>
                <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: '300', marginBottom: '6px', lineHeight: 1.2 }}>
                  Dubai's Most Trusted
                </h1>
                <h1 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: '800', marginBottom: '20px', lineHeight: 1.2 }}>
                  Real Estate Partner Since 2007
                </h1>
                <p style={{ color: '#8aafd4', fontSize: '1rem', lineHeight: '1.8', maxWidth: '580px', marginBottom: '28px' }}>
                  Lazord Real Estate LLC is a fully RERA registered and DED licensed brokerage, established in Dubai in 2007. With over 18 years of market experience, we specialize in residential sales, leasing, and investment consultancy.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {['✅ RERA Licensed', '🏆 18+ Years', '🌍 40+ Nationalities', '📋 DED Certified'].map((badge, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      style={{
                        backgroundColor: 'rgba(45,95,196,0.2)',
                        border: '1px solid rgba(74,144,217,0.3)',
                        borderRadius: '20px', padding: '6px 14px',
                        color: '#c0d4f0', fontSize: '0.8rem', fontWeight: '600'
                      }}
                    >{badge}</motion.span>
                  ))}
                </div>
              </motion.div>
            </Col>
            <Col lg={4} className="d-none d-lg-flex justify-content-end align-items-center">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                {[['18+', 'Years Experience', '🏆'], ['1,500+', 'Properties', '🏠'], ['40+', 'Nationalities', '🌍']].map(([num, label, icon], i) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.05, borderColor: '#4a90d9' }}
                    style={{
                      backgroundColor: 'rgba(45,95,196,0.15)',
                      border: '1px solid rgba(74,144,217,0.25)',
                      borderRadius: '12px', padding: '16px 24px',
                      textAlign: 'center', minWidth: '150px'
                    }}
                  >
                    <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{icon}</div>
                    <div style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: '800' }}>{num}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.75rem', marginTop: '2px' }}>{label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container style={{ paddingTop: '64px' }}>

        {/* Mobile Stats */}
        <FadeUp className="d-lg-none" delay={0}>
          <Row className="g-3" style={sectionGap}>
            {[
              { number: '18+',    label: 'Years of Experience',   icon: '🏆' },
              { number: '1,500+', label: 'Properties Listed',     icon: '🏙️' },
              { number: '1,200+', label: 'Happy Clients',         icon: '👥' },
              { number: 'RERA',   label: 'Registered & Licensed', icon: '📋' },
              { number: '40+',    label: 'Nationalities Served',  icon: '🌍' },
              { number: '2007',   label: 'Established',           icon: '🏗️' },
            ].map((stat, i) => (
              <Col key={i} xs={6} sm={4}>
                <motion.div
                  whileHover={{ y: -4 }}
                  style={{ ...cardStyle, textAlign: 'center', padding: '16px' }}
                >
                  <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{stat.icon}</div>
                  <div style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '800' }}>{stat.number}</div>
                  <div style={{ color: '#8aafd4', fontSize: '0.72rem', marginTop: '4px' }}>{stat.label}</div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </FadeUp>

        {/* Our Story */}
        <Row className="align-items-center g-5" style={sectionGap}>
          <Col lg={6}>
            <FadeLeft>
              <div style={badgeStyle}><span style={badgeTextStyle}>✦ Our Story</span></div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '300', marginBottom: '6px' }}>18 Years of</h2>
              <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '800', marginBottom: '20px' }}>Shaping Dubai Living</h2>
              <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.9', marginBottom: '14px' }}>
                Founded in 2007, Lazord Real Estate LLC was established with a clear vision — to be the most trusted brokerage in Dubai, known for integrity and long-term client relationships.
              </p>
              <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.9', marginBottom: '14px' }}>
                As a fully licensed RERA and DED brokerage, we are trusted intermediaries for major UAE master developers including Nakheel and Dubai Properties.
              </p>
              <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.9', marginBottom: '24px' }}>
                Our unique approach moves beyond traditional transaction-based services to create a comprehensive experience including all aspects of property investment and lifestyle integration.
              </p>
              <Link to="/contact"
                style={{ display: 'inline-block', backgroundColor: '#2d5fc4', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}>
                Get in Touch →
              </Link>
            </FadeLeft>
          </Col>
          <Col lg={6}>
            <FadeRight>
              <div style={{ position: 'relative', height: 'clamp(260px, 40vw, 420px)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(45,95,196,0.25)' }}>
                <img src={IMAGE_STORY} alt="Dubai Skyline" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'rgba(6,15,38,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '12px', padding: '12px 18px' }}>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.9rem' }}>Dubai, UAE</div>
                  <div style={{ color: '#4a90d9', fontSize: '0.78rem', marginTop: '2px' }}>18+ Years Serving This Market</div>
                </div>
              </div>
            </FadeRight>
          </Col>
        </Row>

        {/* ── TIMELINE — Alternating Cards ── */}
        <div style={sectionGap}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={badgeStyle}><span style={badgeTextStyle}>✦ Our Journey</span></div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '4px' }}>From 2007</h2>
              <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800' }}>To Today</h2>
            </div>
          </FadeUp>

          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>

            {/* Center vertical line (desktop only) */}
            <div className="d-none d-md-block" style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: '2px', transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, rgba(45,95,196,0), #2d5fc4 20%, #2d5fc4 80%, rgba(45,95,196,0))'
            }} />

            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0
              const isLast = i === milestones.length - 1
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    marginBottom: '24px',
                    position: 'relative'
                  }}
                >
                  {/* Center dot */}
                  <div style={{
                    position: 'absolute', left: '50%', top: '28px',
                    transform: 'translate(-50%, -50%)',
                    width: isLast ? '16px' : '12px',
                    height: isLast ? '16px' : '12px',
                    borderRadius: '50%',
                    backgroundColor: isLast ? '#4a90d9' : '#2d5fc4',
                    border: `3px solid ${isLast ? '#ffffff' : '#0d1f4e'}`,
                    boxShadow: isLast ? '0 0 20px rgba(74,144,217,0.6)' : '0 0 10px rgba(45,95,196,0.3)',
                    zIndex: 2
                  }} />

                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    style={{
                      width: 'calc(50% - 32px)',
                      backgroundColor: isLast ? 'rgba(45,95,196,0.12)' : '#0d1f4e',
                      border: `1px solid ${isLast ? 'rgba(74,144,217,0.5)' : 'rgba(45,95,196,0.25)'}`,
                      borderRadius: '16px',
                      padding: '20px 24px',
                      boxShadow: isLast ? '0 8px 32px rgba(45,95,196,0.2)' : 'none',
                      cursor: 'default',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Shimmer on hover */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(105deg, transparent 40%, rgba(74,144,217,0.06) 50%, transparent 60%)',
                      opacity: 0, transition: 'opacity 0.3s'
                    }} />

                    {/* Year pill */}
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      backgroundColor: isLast ? '#2d5fc4' : 'rgba(45,95,196,0.2)',
                      border: `1px solid ${isLast ? '#4a90d9' : 'rgba(74,144,217,0.3)'}`,
                      borderRadius: '20px', padding: '3px 12px',
                      marginBottom: '10px'
                    }}>
                      <span style={{ fontSize: '0.85rem' }}>{m.icon}</span>
                      <span style={{ color: isLast ? '#ffffff' : '#4a90d9', fontWeight: '800', fontSize: '0.82rem' }}>{m.year}</span>
                    </div>

                    <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.95rem', marginBottom: '6px' }}>{m.title}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.82rem', lineHeight: '1.6' }}>{m.desc}</div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile timeline */}
          <div className="d-md-none" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, #2d5fc4, rgba(45,95,196,0.1))' }} />
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ display: 'flex', gap: '16px', marginBottom: '16px', paddingLeft: '8px' }}
              >
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, marginTop: '16px',
                  backgroundColor: i === milestones.length - 1 ? '#4a90d9' : '#2d5fc4',
                  border: '3px solid #060f26',
                  boxShadow: '0 0 10px rgba(45,95,196,0.4)'
                }} />
                <div style={{
                  backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)',
                  borderRadius: '12px', padding: '14px 16px', flex: 1
                }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(45,95,196,0.2)', borderRadius: '20px', padding: '2px 10px', marginBottom: '6px' }}>
                    <span>{m.icon}</span>
                    <span style={{ color: '#4a90d9', fontWeight: '800', fontSize: '0.78rem' }}>{m.year}</span>
                  </div>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.88rem', marginBottom: '3px' }}>{m.title}</div>
                  <div style={{ color: '#8aafd4', fontSize: '0.78rem', lineHeight: '1.6' }}>{m.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <FadeUp delay={0} >
          <div style={sectionGap}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={badgeStyle}><span style={badgeTextStyle}>✦ Mission & Vision</span></div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '4px' }}>What Drives</h2>
              <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800' }}>Us Forward</h2>
            </div>
            <Row className="g-4">
              {[
                { icon: '🎯', title: 'Mission',     color: '#4a90d9', desc: 'To provide accurate, transparent, and actionable real estate advice to every client — constantly creating innovative solutions and working in partnership with clients as a trusted advisor.' },
                { icon: '💎', title: 'Core Values', color: '#ffffff', grad: true, desc: 'Professionalism, Transparency, Market Knowledge, and Client-Centricity — striving to set the highest standards of customer service and intensify focus on absolute client satisfaction.' },
                { icon: '🔭', title: 'Vision',      color: '#4a90d9', desc: 'To be the most trusted brokerage in Dubai, known for integrity and long-term relationships — connecting visionary investors with prime real estate offering exceptional returns.' },
              ].map((item, i) => (
                <Col key={i} lg={4} md={12}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    whileHover={{ y: -6 }}
                    style={{ ...cardStyle, borderColor: 'rgba(45,95,196,0.4)', ...(item.grad ? { background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 100%)' } : {}) }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
                    <h4 style={{ color: item.color, fontWeight: '800', fontSize: '1rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.title}</h4>
                    <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.8', margin: 0 }}>{item.desc}</p>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        </FadeUp>

        {/* Services */}
        <div style={sectionGap}>
          <Services />
        </div>

        {/* Why Choose Us */}
        <Row className="align-items-center g-5" style={sectionGap}>
          <Col lg={7}>
            <FadeLeft>
              <div style={badgeStyle}><span style={badgeTextStyle}>✦ Why Choose Lazord</span></div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '4px' }}>Our Competitive</h2>
              <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800', marginBottom: '18px' }}>Advantages</h2>
              <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '20px' }}>
                We analyze market trends, identify high potential opportunities, and provide strategic advice to help you build a strong and profitable investment portfolio.
              </p>
              <Row className="g-3">
                {[
                  { icon: '📅', title: 'Longevity',  desc: 'Operating since 2007 — stability and deep market knowledge.' },
                  { icon: '✅', title: 'Compliance', desc: 'Fully licensed by RERA and DED, ensuring safe, legal transactions.' },
                  { icon: '🤝', title: 'Access',     desc: 'Registered brokers with Nakheel and Dubai Properties.' },
                  { icon: '💡', title: 'Insight',    desc: 'Decades of data and experience to guide your decisions.' },
                ].map((v, i) => (
                  <Col key={i} md={6}>
                    <motion.div
                      whileHover={{ y: -3, borderColor: '#4a90d9' }}
                      style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}
                    >
                      <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>{v.icon}</div>
                      <div>
                        <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.88rem', marginBottom: '3px' }}>{v.title}</div>
                        <div style={{ color: '#8aafd4', fontSize: '0.8rem', lineHeight: '1.6' }}>{v.desc}</div>
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </FadeLeft>
          </Col>
          <Col lg={5}>
            <FadeRight>
              <div style={{ position: 'relative', height: 'clamp(260px, 40vw, 400px)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(45,95,196,0.25)' }}>
                <img src={IMAGE_WHY} alt="Dubai Marina" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,15,38,0.65) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1rem', marginBottom: '8px' }}>Trusted by 40+ Nationalities</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['RERA Licensed', 'DED Certified', 'Since 2007'].map((tag, i) => (
                      <span key={i} style={{ backgroundColor: 'rgba(45,95,196,0.6)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '600' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeRight>
          </Col>
        </Row>

        {/* Testimonials */}
        <div style={sectionGap}>
          <Testimonials />
        </div>

        {/* ── TEAM — Glassmorphism ── */}
        <FadeUp>
          <div style={sectionGap}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={badgeStyle}><span style={badgeTextStyle}>✦ Our Team</span></div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '4px' }}>Meet the</h2>
              <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800' }}>Experts Behind Lazord</h2>
            </div>
            <Row className="g-4">
              {team.map((member, i) => (
                <Col key={i} lg={4} md={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(45,95,196,0.25)' }}
                    style={{
                      backgroundColor: 'rgba(13,31,78,0.7)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(45,95,196,0.3)',
                      borderRadius: '16px', padding: '28px 22px',
                      height: '100%', cursor: 'default',
                      position: 'relative', overflow: 'hidden'
                    }}
                  >
                    {/* Gradient glow bg */}
                    <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: member.color, opacity: 0.06, filter: 'blur(40px)' }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                      {/* Avatar with ring */}
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '1.3rem' }}>
                          {member.avatar}
                        </div>
                        <div style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${member.color}`, opacity: 0.4, animation: 'pulseRing 3s ease-in-out infinite' }} />
                      </div>
                      <div>
                        <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.95rem' }}>{member.name}</div>
                        <div style={{ color: member.color, fontSize: '0.8rem', marginTop: '2px', fontWeight: '600' }}>{member.role}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[{ icon: '🏆', text: member.exp }, { icon: '🌍', text: member.langs }, { icon: '🏠', text: member.spec }].map((item, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.08)', borderRadius: '8px', padding: '6px 10px' }}>
                          <span style={{ fontSize: '0.85rem' }}>{item.icon}</span>
                          <span style={{ color: '#8aafd4', fontSize: '0.8rem' }}>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        </FadeUp>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 50%, #0d1f4e 100%)',
            border: '1px solid rgba(74,144,217,0.3)',
            borderRadius: '20px',
            padding: 'clamp(28px, 5vw, 52px) clamp(20px, 4vw, 48px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(45,95,196,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(45,95,196,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '6px' }}>Ready to Start Your</h2>
            <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800', marginBottom: '14px' }}>Dubai Property Journey?</h2>
            <p style={{ color: '#8aafd4', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 10px' }}>Our team is ready to help you find, buy, rent or sell your property in Dubai.</p>
            <p style={{ color: '#4a90d9', fontSize: '0.88rem', marginBottom: '28px' }}>📞 +971 42 999 088 &nbsp;|&nbsp; ✉️ info@lazordrealestate.ae</p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.04 }}>
                <Link to="/properties" style={{ backgroundColor: '#2d5fc4', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', display: 'block' }}>
                  Browse Properties
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }}>
                <Link to="/contact" style={{ backgroundColor: 'transparent', color: '#ffffff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.92rem', border: '1.5px solid rgba(255,255,255,0.25)', display: 'block' }}>
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </Container>

      <style>{`
        @keyframes spinSlow { from{transform:translateY(-50%) rotate(0deg)} to{transform:translateY(-50%) rotate(360deg)} }
        @keyframes particleFloat { 0%{transform:translateY(0);opacity:0.6} 100%{transform:translateY(-80px);opacity:0} }
        @keyframes pulseRing { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.1)} }
      `}</style>
    </div>
  )
}

export default About