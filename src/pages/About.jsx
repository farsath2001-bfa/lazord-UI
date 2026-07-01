import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import useScrollReveal from '../hooks/useScrollReveal'

const team = [
  { name: 'Mohammed Al Nimer', role: 'CEO', exp: '15 Years Experience', avatar: 'M', color: '#2d5fc4', langs: 'Arabic, English', spec: 'Luxury Villas & Penthouses' },
  { name: 'Khairy', role: 'Senior Sales Director', exp: '14 Years Experience', avatar: 'K', color: '#27ae60', langs: 'English, Arabic', spec: 'Off Plan & Investments' },
  { name: 'Fethi', role: 'Property Consultant', exp: '7 Years Experience', avatar: 'F', color: '#e67e22', langs: 'English, Arabic', spec: 'Apartments & Rentals' },
  { name: 'Abdullah', role: 'Client Relations Manager', exp: '14 Years Experience', avatar: 'G', color: '#8e44ad', langs: 'Arabic, English', spec: 'Client Experience' },
  { name: 'Jardali', role: 'Investment Advisor', exp: '11 Years Experience', avatar: 'J', color: '#16a085', langs: 'English, Brazilian, Arabic', spec: 'Commercial & Portfolio' },
  { name: 'Ahmed', role: 'Property Consultant', exp: '8 Years Experience', avatar: 'A', color: '#c0392b', langs: 'Arabic, English', spec: 'Business Bay & PlanetLand RealEstate' },
]

const milestones = [
  { year: '2003', title: 'Founded', desc: 'Lazord Real Estate established in Dubai with a vision to redefine luxury property services.' },
  { year: '2008', title: 'Expanded', desc: 'Survived the market downturn and emerged stronger with 3 new office locations across Dubai.' },
  { year: '2015', title: 'RERA Certified', desc: 'Achieved full RERA certification and launched our off-plan investment division.' },
  { year: '2020', title: 'Digital Transformation', desc: 'Launched digital property tours and remote transaction capabilities during the pandemic.' },
  { year: '2024', title: '1,200+ Clients', desc: 'Surpassed 1,200 happy clients and AED 2 billion in total property transactions.' },
  { year: '2026', title: 'Today', desc: 'Continuing to grow with 1,500+ listings and a team of 30+ dedicated professionals.' },
]

const values = [
  { icon: '🤝', title: 'Integrity', desc: 'Every transaction is handled with full transparency, honesty and professionalism.' },
  { icon: '🏆', title: 'Excellence', desc: 'We set the highest standards in service delivery and property expertise.' },
  { icon: '🌍', title: 'Global Vision', desc: "Connecting international buyers with Dubai's finest real estate opportunities." },
  { icon: '💡', title: 'Innovation', desc: 'Leveraging technology to provide smarter, faster and better property solutions.' },
]

const About = () => {
  const statsRef      = useScrollReveal({ direction: 'up',   delay: 0,   duration: 700 })
  const storyLeftRef  = useScrollReveal({ direction: 'left', delay: 0,   duration: 700 })
  const storyRightRef = useScrollReveal({ direction: 'right',delay: 0,   duration: 700 })
  const valuesRef     = useScrollReveal({ direction: 'up',   delay: 0,   duration: 700 })
  const teamRef       = useScrollReveal({ direction: 'up',   delay: 0,   duration: 700 })
  const ctaRef        = useScrollReveal({ direction: 'up',   delay: 0,   duration: 700 })

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Hero Banner — no reveal, shows immediately */}
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '70px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.06, filter: 'blur(100px)' }} />
        <Container>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ About Lazord</span>
          </div>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '300', marginBottom: '8px' }}>Dubai's Most Trusted</h1>
          <h1 style={{ color: '#4a90d9', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '20px' }}>Real Estate Partner</h1>
          <p style={{ color: '#8aafd4', fontSize: '1rem', lineHeight: '1.8', maxWidth: '600px' }}>
            Since 2003, Lazord Real Estate has been connecting buyers, investors and renters with Dubai's finest properties. With over two decades of market expertise, we deliver unparalleled service to clients from 40+ nationalities worldwide.
          </p>
        </Container>
      </div>

      <Container style={{ paddingTop: '70px' }}>

        {/* Stats */}
        <div ref={statsRef}>
          <Row className="g-4" style={{ marginBottom: '80px' }}>
            {[
              { number: '22+', label: 'Years in Dubai Market', icon: '🏆' },
              { number: '1,500+', label: 'Properties Listed', icon: '🏙️' },
              { number: '1,200+', label: 'Happy Clients', icon: '🤝' },
              { number: 'AED 2B+', label: 'Deals Closed', icon: '💰' },
              { number: '40+', label: 'Nationalities Served', icon: '🌍' },
              { number: '30+', label: 'Expert Agents', icon: '👥' },
            ].map((stat, i) => (
              <Col key={i} lg={2} md={4} sm={6}>
                <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '14px', padding: '24px 16px', textAlign: 'center', height: '100%', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{stat.icon}</div>
                  <div style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: '800', lineHeight: '1' }}>{stat.number}</div>
                  <div style={{ color: '#8aafd4', fontSize: '0.78rem', marginTop: '6px', lineHeight: '1.4' }}>{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Our Story */}
        <Row className="align-items-center g-5" style={{ marginBottom: '80px' }}>
          <Col lg={6} ref={storyLeftRef}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
              <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ Our Story</span>
            </div>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '300', marginBottom: '6px' }}>Two Decades of</h2>
            <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '800', marginBottom: '20px' }}>Shaping Dubai Living</h2>
            <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.9', marginBottom: '16px' }}>
              Founded in 2003 by Mohammed Al Rashid, Lazord Real Estate was born from a simple belief — that every client deserves honest, expert guidance when making one of life's biggest decisions.
            </p>
            <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.9', marginBottom: '24px' }}>
              Starting from a single office in Deira, we have grown into one of Dubai's most respected agencies — with specialists covering every community from Palm Jumeirah to Dubai Creek Harbour.
            </p>
            <Link to="/contact" style={{ display: 'inline-block', backgroundColor: '#2d5fc4', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', transition: 'background 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}
            >Get in Touch →</Link>
          </Col>
          <Col lg={6} ref={storyRightRef}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {milestones.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '56px', height: '56px', borderRadius: '12px', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a90d9', fontWeight: '800', fontSize: '0.82rem' }}>{m.year}</div>
                  <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.2)', borderRadius: '10px', padding: '14px 18px', flex: 1 }}>
                    <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.92rem', marginBottom: '4px' }}>{m.title}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.82rem', lineHeight: '1.6' }}>{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        {/* Values */}
        <div ref={valuesRef} style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
              <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ Our Values</span>
            </div>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '300', marginBottom: '6px' }}>What We</h2>
            <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '800' }}>Stand For</h2>
          </div>
          <Row className="g-4">
            {values.map((v, i) => (
              <Col key={i} lg={3} md={6}>
                <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '14px', padding: '28px 22px', textAlign: 'center', height: '100%', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: '2.2rem', marginBottom: '14px' }}>{v.icon}</div>
                  <h4 style={{ color: '#ffffff', fontWeight: '700', fontSize: '1rem', marginBottom: '10px' }}>{v.title}</h4>
                  <p style={{ color: '#8aafd4', fontSize: '0.87rem', lineHeight: '1.7', margin: 0 }}>{v.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Team */}
        <div ref={teamRef} style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
              <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ Our Team</span>
            </div>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '300', marginBottom: '6px' }}>Meet the</h2>
            <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '800' }}>Experts Behind Lazord</h2>
          </div>
          <Row className="g-4">
            {team.map((member, i) => (
              <Col key={i} lg={4} md={6}>
                <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: '28px 24px', height: '100%', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(45,95,196,0.2)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '1.4rem', flexShrink: 0 }}>{member.avatar}</div>
                    <div>
                      <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1rem' }}>{member.name}</div>
                      <div style={{ color: '#4a90d9', fontSize: '0.82rem', marginTop: '2px' }}>{member.role}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[{ icon: '🏆', text: member.exp }, { icon: '🌍', text: member.langs }, { icon: '🏠', text: member.spec }].map((item, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.9rem' }}>{item.icon}</span>
                        <span style={{ color: '#8aafd4', fontSize: '0.82rem' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 50%, #0d1f4e 100%)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '20px', padding: '56px 48px', textAlign: 'center' }}>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '300', marginBottom: '6px' }}>Ready to Start Your</h2>
          <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '800', marginBottom: '16px' }}>Dubai Property Journey?</h2>
          <p style={{ color: '#8aafd4', fontSize: '1rem', marginBottom: '32px', maxWidth: '460px', margin: '0 auto 32px' }}>Our team is ready to help you find, buy, rent or sell your property in Dubai.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/properties" style={{ backgroundColor: '#2d5fc4', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', transition: 'background 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}
            >Browse Properties</Link>
            <Link to="/contact" style={{ backgroundColor: 'transparent', color: '#ffffff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.92rem', border: '1.5px solid rgba(255,255,255,0.25)', transition: 'all 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.color = '#4a90d9' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#ffffff' }}
            >Contact Us</Link>
          </div>
        </div>

      </Container>
    </div>
  )
}

export default About