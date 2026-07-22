import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import useScrollReveal from '../hooks/useScrollReveal'
import Services from '../components/home/Services'
import Testimonials from '../components/home/Testimonials'

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
  { year: '2007', title: 'Company Founded',        desc: 'Lazord Real Estate LLC established in Dubai as a trusted real estate brokerage serving the UAE market.' },
  { year: '2010', title: 'Market Expansion',       desc: 'Expanded portfolio across key Dubai communities including Downtown, Marina and JBR.' },
  { year: '2015', title: 'Strategic Partnerships', desc: 'Became registered brokers with major UAE developers including Nakheel and Dubai Properties.' },
  { year: '2019', title: 'RERA Certified',         desc: 'Achieved full RERA registration and DED licensing, ensuring fully compliant transactions.' },
  { year: '2024', title: 'Digital Transformation', desc: 'Launched digital property platform to serve international investors remotely.' },
  { year: '2026', title: 'Today',                  desc: 'Continuing to grow with 1,500+ listings, 18+ years of expertise and dedicated professionals.' },
]

const About = () => {
  const statsRef       = useScrollReveal({ direction: 'up',    delay: 0, duration: 700 })
  const storyLeftRef   = useScrollReveal({ direction: 'left',  delay: 0, duration: 700 })
  const storyImgRef    = useScrollReveal({ direction: 'right', delay: 0, duration: 700 })
  const milestonesRef  = useScrollReveal({ direction: 'up',    delay: 0, duration: 700 })
  const missionRef     = useScrollReveal({ direction: 'up',    delay: 0, duration: 700 })
  const servicesRef    = useScrollReveal({ direction: 'up',    delay: 0, duration: 700 })
  const valuesRef      = useScrollReveal({ direction: 'up',    delay: 0, duration: 700 })
  const whyImgRef      = useScrollReveal({ direction: 'right', delay: 0, duration: 700 })
  const teamRef        = useScrollReveal({ direction: 'up',    delay: 0, duration: 700 })
  const testimonialsRef = useScrollReveal({ direction: 'up',   delay: 0, duration: 700 })
  const ctaRef         = useScrollReveal({ direction: 'up',    delay: 0, duration: 700 })

  const cardStyle = {
    backgroundColor: '#0d1f4e',
    border: '1px solid rgba(45,95,196,0.25)',
    borderRadius: '14px', padding: '28px 22px',
    height: '100%', transition: 'all 0.25s ease'
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

  const imgStyle = {
    width: '100%', height: '100%',
    objectFit: 'cover', borderRadius: '16px', display: 'block'
  }

  const sectionGap = { marginBottom: '64px' }

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Hero Banner — compact */}
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '48px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.06, filter: 'blur(100px)' }} />
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <div style={badgeStyle}><span style={badgeTextStyle}>✦ About Lazord</span></div>
              <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '300', marginBottom: '6px' }}>Dubai's Most Trusted</h1>
              <h1 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '16px' }}>Real Estate Partner Since 2007</h1>
              <p style={{ color: '#8aafd4', fontSize: '1rem', lineHeight: '1.8', maxWidth: '620px', margin: 0 }}>
                Lazord Real Estate LLC is a fully RERA registered and DED licensed brokerage, established in Dubai in 2007. With over 18 years of market experience, we specialize in residential sales, leasing, and investment consultancy.
              </p>
            </Col>
            <Col lg={4} className="d-none d-lg-flex justify-content-end align-items-center">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[['18+', 'Years Experience'], ['1,500+', 'Properties'], ['40+', 'Nationalities']].map(([num, label]) => (
                  <div key={label} style={{ backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.25)', borderRadius: '12px', padding: '14px 20px', textAlign: 'center', minWidth: '140px' }}>
                    <div style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: '800' }}>{num}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.75rem', marginTop: '2px' }}>{label}</div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container style={{ paddingTop: '56px' }}>

        {/* Stats — mobile only (desktop shows in header) */}
        <div ref={statsRef} className="d-lg-none" style={{ ...sectionGap }}>
          <Row className="g-3">
            {[
              { number: '18+',    label: 'Years of Experience',    icon: '🏆' },
              { number: '1,500+', label: 'Properties Listed',      icon: '🏙️' },
              { number: '1,200+', label: 'Happy Clients',          icon: '👥' },
              { number: 'RERA',   label: 'Registered & Licensed',  icon: '📋' },
              { number: '40+',    label: 'Nationalities Served',   icon: '🌍' },
              { number: '2007',   label: 'Established',            icon: '🏗️' },
            ].map((stat, i) => (
              <Col key={i} xs={6} sm={4}>
                <div style={{ ...cardStyle, textAlign: 'center', padding: '16px' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{stat.icon}</div>
                  <div style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '800' }}>{stat.number}</div>
                  <div style={{ color: '#8aafd4', fontSize: '0.72rem', marginTop: '4px' }}>{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Our Story */}
        <Row className="align-items-center g-5" style={sectionGap}>
          <Col lg={6} ref={storyLeftRef}>
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
              style={{ display: 'inline-block', backgroundColor: '#2d5fc4', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', transition: 'background 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}>
              Get in Touch →
            </Link>
          </Col>
          <Col lg={6} ref={storyImgRef}>
            <div style={{ position: 'relative', height: 'clamp(260px, 40vw, 420px)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(45,95,196,0.25)' }}>
              <img src={IMAGE_STORY} alt="Dubai Skyline" style={imgStyle} />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'rgba(6,15,38,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '12px', padding: '12px 18px' }}>
                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.9rem' }}>Dubai, UAE</div>
                <div style={{ color: '#4a90d9', fontSize: '0.78rem', marginTop: '2px' }}>18+ Years Serving This Market</div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Milestones */}
        <div ref={milestonesRef} style={sectionGap}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={badgeStyle}><span style={badgeTextStyle}>✦ Our Journey</span></div>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '4px' }}>From 2007</h2>
            <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800' }}>To Today</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '700px', margin: '0 auto' }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '56px', height: '52px', borderRadius: '10px', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a90d9', fontWeight: '800', fontSize: '0.78rem' }}>{m.year}</div>
                <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.2)', borderRadius: '10px', padding: '12px 16px', flex: 1 }}>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.9rem', marginBottom: '3px' }}>{m.title}</div>
                  <div style={{ color: '#8aafd4', fontSize: '0.82rem', lineHeight: '1.6' }}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div ref={missionRef} style={sectionGap}>
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
                <div style={{ ...cardStyle, borderColor: 'rgba(45,95,196,0.4)', ...(item.grad ? { background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 100%)' } : {}) }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.4)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
                  <h4 style={{ color: item.color, fontWeight: '800', fontSize: '1rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.title}</h4>
                  <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.8', margin: 0 }}>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Services */}
        <div ref={servicesRef} style={sectionGap}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={badgeStyle}><span style={badgeTextStyle}>✦ Our Services</span></div>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '4px' }}>What We</h2>
            <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800' }}>Offer</h2>
          </div>
          <Services />
        </div>

        {/* Why Choose Us */}
        <Row className="align-items-center g-5" style={sectionGap}>
          <Col lg={7} ref={valuesRef}>
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
                  <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start', transition: 'all 0.25s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                    <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>{v.icon}</div>
                    <div>
                      <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.88rem', marginBottom: '3px' }}>{v.title}</div>
                      <div style={{ color: '#8aafd4', fontSize: '0.8rem', lineHeight: '1.6' }}>{v.desc}</div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
          <Col lg={5} ref={whyImgRef}>
            <div style={{ position: 'relative', height: 'clamp(260px, 40vw, 400px)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(45,95,196,0.25)' }}>
              <img src={IMAGE_WHY} alt="Dubai Marina" style={imgStyle} />
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
          </Col>
        </Row>

        {/* Testimonials */}
        <div ref={testimonialsRef} style={sectionGap}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={badgeStyle}><span style={badgeTextStyle}>✦ Client Stories</span></div>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '4px' }}>What Our</h2>
            <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800' }}>Clients Say</h2>
          </div>
          <Testimonials />
        </div>

        {/* Team */}
        <div ref={teamRef} style={sectionGap}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={badgeStyle}><span style={badgeTextStyle}>✦ Our Team</span></div>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '4px' }}>Meet the</h2>
            <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800' }}>Experts Behind Lazord</h2>
          </div>
          <Row className="g-4">
            {team.map((member, i) => (
              <Col key={i} lg={4} md={6}>
                <div style={cardStyle}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(45,95,196,0.2)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '1.3rem', flexShrink: 0 }}>{member.avatar}</div>
                    <div>
                      <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.95rem' }}>{member.name}</div>
                      <div style={{ color: '#4a90d9', fontSize: '0.8rem', marginTop: '2px' }}>{member.role}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {[{ icon: '🏆', text: member.exp }, { icon: '🌍', text: member.langs }, { icon: '🏠', text: member.spec }].map((item, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.85rem' }}>{item.icon}</span>
                        <span style={{ color: '#8aafd4', fontSize: '0.8rem' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 50%, #0d1f4e 100%)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '20px', padding: 'clamp(28px, 5vw, 52px) clamp(20px, 4vw, 48px)', textAlign: 'center' }}>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '6px' }}>Ready to Start Your</h2>
          <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800', marginBottom: '14px' }}>Dubai Property Journey?</h2>
          <p style={{ color: '#8aafd4', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 10px' }}>Our team is ready to help you find, buy, rent or sell your property in Dubai.</p>
          <p style={{ color: '#4a90d9', fontSize: '0.88rem', marginBottom: '28px' }}>📞 +971 42 999 088 &nbsp;|&nbsp; ✉️ info@lazordrealestate.ae</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/properties"
              style={{ backgroundColor: '#2d5fc4', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', transition: 'background 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}>
              Browse Properties
            </Link>
            <Link to="/contact"
              style={{ backgroundColor: 'transparent', color: '#ffffff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.92rem', border: '1.5px solid rgba(255,255,255,0.25)', transition: 'all 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.color = '#4a90d9' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#ffffff' }}>
              Contact Us
            </Link>
          </div>
        </div>

      </Container>
    </div>
  )
}

export default About