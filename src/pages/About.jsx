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
  { year: '2007', title: 'Company Founded', desc: 'Lazord Real Estate LLC established in Dubai as a trusted real estate brokerage serving the UAE market.' },
  { year: '2010', title: 'Market Expansion', desc: 'Expanded our portfolio and client base across key Dubai communities including Downtown, Marina and JBR.' },
  { year: '2015', title: 'Strategic Partnerships', desc: 'Became registered brokers with major UAE master developers including Nakheel and Dubai Properties.' },
  { year: '2019', title: 'RERA Certified', desc: 'Achieved full RERA registration and DED licensing, ensuring fully compliant and legal transactions.' },
  { year: '2024', title: 'Digital Transformation', desc: 'Launched digital property platform and remote transaction capabilities to serve international investors.' },
  { year: '2026', title: 'Today', desc: 'Continuing to grow with 1,500+ listings, 18+ years of expertise and a team of dedicated professionals.' },
]

const services = [
  { icon: '🏠', title: 'Residential Sales', desc: 'Villas, Apartments, and Townhouses — primary residences, luxury vacation homes, and affordable housing options.' },
  { icon: '🏢', title: 'Commercial Brokerage', desc: "Offices, retail spaces, and warehouses — investment-grade commercial assets in Dubai's top business districts." },
  { icon: '🔑', title: 'Leasing Services', desc: 'Tenant acquisition and lease management — we handle every aspect of your rental property professionally.' },
  { icon: '📈', title: 'Investment Consultancy', desc: 'ROI analysis and market trend advisory — we help you build a strong and profitable investment portfolio.' },
]

// ─── 3 IMAGE URLS — replace these with your own from postimages.org or unsplash.com ───
const IMAGE_STORY    = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80'  // Dubai skyline
const IMAGE_SERVICES = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'  // Luxury apartment
const IMAGE_WHY      = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80'  // Dubai marina

const About = () => {
  const statsRef      = useScrollReveal({ direction: 'up',    delay: 0, duration: 700 })
  const storyLeftRef  = useScrollReveal({ direction: 'left',  delay: 0, duration: 700 })
  const storyRightRef = useScrollReveal({ direction: 'right', delay: 0, duration: 700 })
  const storyImgRef   = useScrollReveal({ direction: 'right', delay: 0, duration: 700 })
  const missionRef    = useScrollReveal({ direction: 'up',    delay: 0, duration: 700 })
  const servicesRef   = useScrollReveal({ direction: 'up',    delay: 0, duration: 700 })
  const servicesImgRef= useScrollReveal({ direction: 'left',  delay: 0, duration: 700 })
  const valuesRef     = useScrollReveal({ direction: 'up',    delay: 0, duration: 700 })
  const whyImgRef     = useScrollReveal({ direction: 'right', delay: 0, duration: 700 })
  const teamRef       = useScrollReveal({ direction: 'up',    delay: 0, duration: 700 })
  const ctaRef        = useScrollReveal({ direction: 'up',    delay: 0, duration: 700 })

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
    borderRadius: '30px', padding: '5px 14px', marginBottom: '16px'
  }

  const badgeTextStyle = {
    color: '#4a90d9', fontSize: '0.78rem',
    letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600'
  }

  const imgStyle = {
    width: '100%', height: '100%',
    objectFit: 'cover', borderRadius: '16px',
    display: 'block'
  }

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Hero Banner */}
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '70px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.06, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: '#4a90d9', opacity: 0.04, filter: 'blur(80px)' }} />
        <Container>
          <div style={badgeStyle}><span style={badgeTextStyle}>✦ About Lazord</span></div>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '300', marginBottom: '8px' }}>Dubai's Most Trusted</h1>
          <h1 style={{ color: '#4a90d9', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '20px' }}>Real Estate Partner Since 2007</h1>
          <p style={{ color: '#8aafd4', fontSize: '1rem', lineHeight: '1.8', maxWidth: '620px' }}>
            Lazord Real Estate LLC is a fully RERA registered and DED licensed brokerage, established in Dubai in 2007. With over 18 years of market experience, we specialize in residential sales, leasing, and investment consultancy — serving clients from across the globe with transparency, professionalism and deep local knowledge.
          </p>
        </Container>
      </div>

      <Container style={{ paddingTop: '70px' }}>

        {/* Stats */}
        <div ref={statsRef}>
          <Row className="g-4" style={{ marginBottom: '80px' }}>
            {[
              { number: '18+',    label: 'Years of Experience',    icon: '🏆' },
              { number: '2007',   label: 'Established',            icon: '🏗️' },
              { number: '1,500+', label: 'Properties Listed',      icon: '🏙️' },
              { number: '100%',   label: 'Comprehensive Services',  icon: '✅' },
              { number: 'RERA',   label: 'Registered & Licensed',   icon: '📋' },
              { number: '40+',    label: 'Nationalities Served',    icon: '🌍' },
            ].map((stat, i) => (
              <Col key={i} lg={2} md={4} sm={6}>
                <div style={{ ...cardStyle, textAlign: 'center' }}
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

        {/* ── IMAGE 1: Our Story ── */}
        <Row className="align-items-center g-5" style={{ marginBottom: '80px' }}>
          <Col lg={6} ref={storyLeftRef}>
            <div style={badgeStyle}><span style={badgeTextStyle}>✦ Our Story</span></div>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '300', marginBottom: '6px' }}>18 Years of</h2>
            <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '800', marginBottom: '20px' }}>Shaping Dubai Living</h2>
            <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.9', marginBottom: '16px' }}>
              Founded in 2007, Lazord Real Estate LLC was established with a clear vision — to be the most trusted brokerage in Dubai, known for integrity and long-term client relationships. From day one, we have been committed to providing accurate, transparent and actionable real estate advice.
            </p>
            <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.9', marginBottom: '16px' }}>
              As a fully licensed RERA and DED brokerage, we are trusted intermediaries for major UAE master developers including Nakheel and Dubai Properties — connecting visionary investors with prime real estate opportunities offering exceptional returns.
            </p>
            <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.9', marginBottom: '24px' }}>
              Our unique approach moves beyond traditional transaction-based services to create a comprehensive experience including all aspects of property investment and lifestyle integration.
            </p>
            <Link to="/contact"
              style={{ display: 'inline-block', backgroundColor: '#2d5fc4', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', transition: 'background 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}
            >Get in Touch →</Link>
          </Col>

          {/* Image 1 — Dubai Skyline */}
          <Col lg={6} ref={storyImgRef}>
            <div style={{ position: 'relative', height: '420px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(45,95,196,0.25)' }}>
              <img src={IMAGE_STORY} alt="Dubai Skyline" style={imgStyle} />
              {/* overlay badge */}
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'rgba(6,15,38,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '12px', padding: '12px 18px' }}>
                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.9rem' }}>Dubai, UAE</div>
                <div style={{ color: '#4a90d9', fontSize: '0.78rem', marginTop: '2px' }}>18+ Years Serving This Market</div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Milestones */}
        <div ref={storyRightRef} style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={badgeStyle}><span style={badgeTextStyle}>✦ Our Journey</span></div>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '6px' }}>From 2007</h2>
            <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800' }}>To Today</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '700px', margin: '0 auto' }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '60px', height: '56px', borderRadius: '12px', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a90d9', fontWeight: '800', fontSize: '0.82rem' }}>{m.year}</div>
                <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.2)', borderRadius: '10px', padding: '14px 18px', flex: 1 }}>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.92rem', marginBottom: '4px' }}>{m.title}</div>
                  <div style={{ color: '#8aafd4', fontSize: '0.82rem', lineHeight: '1.6' }}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div ref={missionRef} style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={badgeStyle}><span style={badgeTextStyle}>✦ Mission & Vision</span></div>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '300', marginBottom: '6px' }}>What Drives</h2>
            <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '800' }}>Us Forward</h2>
          </div>
          <Row className="g-4">
            <Col lg={4} md={12}>
              <div style={{ ...cardStyle, borderColor: 'rgba(45,95,196,0.4)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.4)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '14px' }}>🎯</div>
                <h4 style={{ color: '#4a90d9', fontWeight: '800', fontSize: '1.1rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Mission</h4>
                <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.8', margin: 0 }}>
                  To provide accurate, transparent, and actionable real estate advice to every client — constantly creating innovative solutions and working in partnership with clients as a trusted advisor and reliable source of wealth-generating strategy.
                </p>
              </div>
            </Col>
            <Col lg={4} md={12}>
              <div style={{ ...cardStyle, borderColor: 'rgba(74,144,217,0.4)', background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 100%)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(74,144,217,0.4)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '14px' }}>💎</div>
                <h4 style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.1rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Core Values</h4>
                <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.8', margin: 0 }}>
                  Professionalism, Transparency, Market Knowledge, and Client-Centricity — striving to set the highest standards of customer service and intensify our focus on absolute client satisfaction.
                </p>
              </div>
            </Col>
            <Col lg={4} md={12}>
              <div style={{ ...cardStyle, borderColor: 'rgba(45,95,196,0.4)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.4)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '14px' }}>🔭</div>
                <h4 style={{ color: '#4a90d9', fontWeight: '800', fontSize: '1.1rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Vision</h4>
                <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.8', margin: 0 }}>
                  To be the most trusted brokerage in Dubai, known for integrity and long-term relationships — connecting visionary investors with prime real estate and inviting opportunities offering exceptional returns.
                </p>
              </div>
            </Col>
          </Row>
        </div>

        {/* ── IMAGE 2: Our Services ── */}
        <div ref={servicesRef} style={{ marginBottom: '80px' }}>
          <Row className="align-items-center g-5" style={{ marginBottom: '48px' }}>
            {/* Image 2 — Luxury Apartment */}
            <Col lg={5} ref={servicesImgRef}>
              <div style={{ position: 'relative', height: '380px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(45,95,196,0.25)' }}>
                <img src={IMAGE_SERVICES} alt="Luxury Property Dubai" style={imgStyle} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,15,38,0.7) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1rem' }}>Premium Properties</div>
                  <div style={{ color: '#4a90d9', fontSize: '0.82rem', marginTop: '4px' }}>Residential & Commercial</div>
                </div>
              </div>
            </Col>
            <Col lg={7}>
              <div style={badgeStyle}><span style={badgeTextStyle}>✦ Our Services</span></div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '300', marginBottom: '6px' }}>Comprehensive</h2>
              <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '800', marginBottom: '20px' }}>Property Solutions</h2>
              <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '24px' }}>
                Dubai is a hub for international business and investment. To support your objectives, we offer comprehensive core services tailored to your needs:
              </p>
              <Row className="g-3">
                {services.map((s, i) => (
                  <Col key={i} md={6}>
                    <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '12px', padding: '18px', transition: 'all 0.25s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{s.icon}</div>
                      <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.9rem', marginBottom: '6px' }}>{s.title}</div>
                      <div style={{ color: '#8aafd4', fontSize: '0.8rem', lineHeight: '1.6' }}>{s.desc}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>

        {/* ── IMAGE 3: Why Choose Us ── */}
        <div ref={valuesRef} style={{ marginBottom: '80px' }}>
          <Row className="align-items-center g-5">
            <Col lg={7}>
              <div style={badgeStyle}><span style={badgeTextStyle}>✦ Why Choose Lazord</span></div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '300', marginBottom: '6px' }}>Our Competitive</h2>
              <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '800', marginBottom: '20px' }}>Advantages</h2>
              <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '24px' }}>
                We analyze market trends, identify high potential opportunities, and provide strategic advice to help you build a strong and profitable investment portfolio.
              </p>
              <Row className="g-3">
                {[
                  { icon: '📅', title: 'Longevity', desc: 'Operating since 2007 — stability and deep market knowledge in a volatile market.' },
                  { icon: '✅', title: 'Compliance', desc: 'Fully licensed by RERA and DED, ensuring safe, legal and fully transparent transactions.' },
                  { icon: '🤝', title: 'Access', desc: 'Registered brokers with Nakheel and Dubai Properties — exclusive developer access.' },
                  { icon: '💡', title: 'Insight', desc: 'Decades of data and experience to guide your investment decisions with confidence.' },
                ].map((v, i) => (
                  <Col key={i} md={6}>
                    <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '12px', padding: '18px', display: 'flex', gap: '14px', alignItems: 'flex-start', transition: 'all 0.25s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      <div style={{ fontSize: '1.6rem', flexShrink: 0 }}>{v.icon}</div>
                      <div>
                        <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px' }}>{v.title}</div>
                        <div style={{ color: '#8aafd4', fontSize: '0.8rem', lineHeight: '1.6' }}>{v.desc}</div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>

            {/* Image 3 — Dubai Marina */}
            <Col lg={5} ref={whyImgRef}>
              <div style={{ position: 'relative', height: '420px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(45,95,196,0.25)' }}>
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
        </div>

        {/* Team */}
        <div ref={teamRef} style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={badgeStyle}><span style={badgeTextStyle}>✦ Our Team</span></div>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '300', marginBottom: '6px' }}>Meet the</h2>
            <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '800' }}>Experts Behind Lazord</h2>
          </div>
          <Row className="g-4">
            {team.map((member, i) => (
              <Col key={i} lg={4} md={6}>
                <div style={cardStyle}
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
          <p style={{ color: '#8aafd4', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 12px' }}>
            Our team is ready to help you find, buy, rent or sell your property in Dubai.
          </p>
          <p style={{ color: '#4a90d9', fontSize: '0.88rem', marginBottom: '32px' }}>
            📞 +971 42 999 088 &nbsp;|&nbsp; ✉️ info@lazordrealestate.ae
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/properties"
              style={{ backgroundColor: '#2d5fc4', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', transition: 'background 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}
            >Browse Properties</Link>
            <Link to="/contact"
              style={{ backgroundColor: 'transparent', color: '#ffffff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.92rem', border: '1.5px solid rgba(255,255,255,0.25)', transition: 'all 0.2s ease' }}
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