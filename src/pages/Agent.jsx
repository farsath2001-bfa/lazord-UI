import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const agents = [
  {
    id: 1,
    name: 'Mohammed Al ',
    role: 'CEO & Founder',
    exp: '22 Years Experience',
    color: '#2d5fc4',
    avatar: 'M',
    phone: '+971 42 999 088',
    whatsapp: '+971 42 999 088 ',
    email: 'mohammed@lazordrealestate.com',
    languages: 'Arabic, English',
    speciality: 'Luxury Villas & Penthouses',
    listings: 45,
    deals: 320,
    image: '',
    areas: ['Downtown Dubai', 'Palm Jumeirah', 'Emirates Hills'],
  },
  {
    id: 2,
    name: 'Sarah ',
    role: 'Senior Sales Director',
    exp: '14 Years Experience',
    color: '#27ae60',
    avatar: 'S',
    phone: '+971 42 981 078',
    whatsapp: '97142981078',
    email: 'sarah@lazordrealestate.com',
    languages: 'English, French',
    speciality: 'Off Plan & Investments',
    listings: 38,
    deals: 215,
    image: '',
    areas: ['Dubai Creek Harbour', 'Business Bay', 'DIFC'],
  },
  {
    id: 3,
    name: 'Rajesh ',
    role: 'Property Consultant',
    exp: '9 Years Experience',
    color: '#e67e22',
    avatar: 'R',
    phone: '+971 42 981 079',
    whatsapp: '97142981079',
    email: 'rajesh@lazordrealestate.com',
    languages: 'Hindi, English, Arabic',
    speciality: 'Apartments & Rentals',
    listings: 52,
    deals: 180,
    image: '',
    areas: ['Dubai Marina', 'JBR', 'JVC'],
  },
  {
    id: 4,
    name: 'Fatima',
    role: 'Client Relations Manager',
    exp: '7 Years Experience',
    color: '#8e44ad',
    avatar: 'F',
    phone: '+971 42 981 080',
    whatsapp: '97142981080',
    email: 'fatima@lazordrealestate.com',
    languages: 'Arabic, English',
    speciality: 'Residential Sales',
    listings: 29,
    deals: 142,
    image: '',
    areas: ['Arabian Ranches', 'Jumeirah', 'Al Barsha'],
  },
  {
    id: 5,
    name: 'James',
    role: 'Investment Advisor',
    exp: '11 Years Experience',
    color: '#16a085',
    avatar: 'J',
    phone: '+971 42 981 081',
    whatsapp: '97142981081',
    email: 'james@lazordrealestate.com',
    languages: 'English, Mandarin',
    speciality: 'Commercial & Portfolio',
    listings: 33,
    deals: 198,
    image: '',
    areas: ['Business Bay', 'DIFC', 'Downtown Dubai'],
  },
  {
    id: 6,
    name: 'Elena ',
    role: 'Property Consultant',
    exp: '6 Years Experience',
    color: '#c0392b',
    avatar: 'E',
    phone: '+971 42 981 082',
    whatsapp: '97142981082',
    email: 'elena@lazordrealestate.com',
    languages: 'Russian, English',
    speciality: 'Marina & JBR Properties',
    listings: 27,
    deals: 115,
    image: '',
    areas: ['Dubai Marina', 'Palm Jumeirah', 'JBR'],
  },
]

// Apply Now Modal
const ApplyModal = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', experience: '', cvLink: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
  }

  const inputStyle = {
    width: '100%', backgroundColor: '#060f26',
    border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px',
    color: '#ffffff', padding: '11px 14px', fontSize: '0.88rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s ease'
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      backgroundColor: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', backdropFilter: 'blur(4px)'
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        backgroundColor: '#0d1f4e',
        border: '1px solid rgba(45,95,196,0.4)',
        borderRadius: '20px', padding: '40px',
        width: '100%', maxWidth: '560px',
        maxHeight: '90vh', overflowY: 'auto',
        position: 'relative', animation: 'slideUp 0.3s ease'
      }}>

        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          backgroundColor: 'rgba(255,255,255,0.1)', border: 'none',
          borderRadius: '50%', width: '32px', height: '32px',
          color: '#ffffff', fontSize: '1.1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>×</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
            <h3 style={{ color: '#27ae60', fontWeight: '700', marginBottom: '10px' }}>Application Submitted!</h3>
            <p style={{ color: '#8aafd4', fontSize: '0.92rem', marginBottom: '24px', lineHeight: '1.7' }}>
              Thank you for your interest in joining Lazord Real Estate. Our HR team will review your application and get back to you within 3-5 business days.
            </p>
            <button onClick={onClose} style={{ backgroundColor: '#2d5fc4', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 28px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '4px 12px', marginBottom: '12px' }}>
                <span style={{ color: '#4a90d9', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '600' }}>✦ Join Our Team</span>
              </div>
              <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '700', marginBottom: '6px' }}>Apply Now</h2>
              <p style={{ color: '#8aafd4', fontSize: '0.88rem', margin: 0 }}>Fill in your details and we'll be in touch soon.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <label style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '5px', display: 'block' }}>FULL NAME *</label>
                  <input type="text" name="name" required placeholder="Your full name" value={form.name} onChange={handleChange} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#4a90d9'} onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                </Col>
                <Col md={6}>
                  <label style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '5px', display: 'block' }}>EMAIL *</label>
                  <input type="email" name="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#4a90d9'} onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                </Col>
                <Col md={6}>
                  <label style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '5px', display: 'block' }}>PHONE *</label>
                  <input type="tel" name="phone" required placeholder="+971 50 000 0000" value={form.phone} onChange={handleChange} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#4a90d9'} onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                </Col>
                <Col md={6}>
                  <label style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '5px', display: 'block' }}>POSITION *</label>
                  <select name="position" required value={form.position} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = '#4a90d9'} onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'}>
                    <option value="">Select position...</option>
                    <option>Property Consultant</option>
                    <option>Sales Agent</option>
                    <option>Investment Advisor</option>
                    <option>Client Relations</option>
                    <option>Marketing Executive</option>
                    <option>Other</option>
                  </select>
                </Col>
                <Col md={6}>
                  <label style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '5px', display: 'block' }}>EXPERIENCE</label>
                  <select name="experience" value={form.experience} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = '#4a90d9'} onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'}>
                    <option value="">Years of experience...</option>
                    <option>0-1 years</option>
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5-10 years</option>
                    <option>10+ years</option>
                  </select>
                </Col>
                <Col md={6}>
                  <label style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '5px', display: 'block' }}>CV LINK</label>
                  <input type="url" name="cvLink" placeholder="Google Drive / LinkedIn URL" value={form.cvLink} onChange={handleChange} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#4a90d9'} onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                </Col>
                <Col md={12}>
                  <label style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '5px', display: 'block' }}>WHY JOIN LAZORD?</label>
                  <textarea name="message" rows={3} placeholder="Tell us about yourself and why you want to join our team..." value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = '#4a90d9'} onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                </Col>
                <Col md={12}>
                  <button type="submit" disabled={loading} style={{
                    width: '100%', backgroundColor: loading ? '#1a3a7c' : '#2d5fc4',
                    color: '#fff', border: 'none', borderRadius: '10px',
                    padding: '14px', fontSize: '0.95rem', fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'background 0.2s ease'
                  }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#1a3a7c' }}
                    onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#2d5fc4' }}
                  >
                    {loading ? <><span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span> Submitting...</> : '🚀 Submit Application'}
                  </button>
                </Col>
              </Row>
            </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        select option { background-color: #0d1f4e; color: #ffffff; }
        input::placeholder, textarea::placeholder { color: #4a5a7a; }
      `}</style>
    </div>
  )
}

// Agent Card
const AgentCard = ({ agent }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{
      backgroundColor: '#0d1f4e',
      border: `1px solid ${hovered ? agent.color : 'rgba(45,95,196,0.25)'}`,
      borderRadius: '16px', overflow: 'hidden',
      transition: 'all 0.3s ease',
      transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      boxShadow: hovered ? `0 20px 50px ${agent.color}25` : 'none',
      height: '100%'
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
        <img src={agent.image} alt={agent.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,15,40,0.9) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: agent.color, color: '#fff', fontSize: '0.72rem', fontWeight: '700', padding: '4px 12px', borderRadius: '20px' }}>{agent.role}</div>
        <div style={{ position: 'absolute', bottom: '14px', left: '16px', right: '16px' }}>
          <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', margin: '0 0 2px' }}>{agent.name}</h3>
          <p style={{ color: '#8aafd4', fontSize: '0.78rem', margin: 0 }}>{agent.exp}</p>
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', marginBottom: '16px', backgroundColor: 'rgba(45,95,196,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
          {[{ label: 'Listings', value: agent.listings }, { label: 'Deals', value: agent.deals }].map((stat, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', padding: '12px 8px', borderRight: i === 0 ? '1px solid rgba(45,95,196,0.2)' : 'none' }}>
              <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.2rem' }}>{stat.value}</div>
              <div style={{ color: '#8aafd4', fontSize: '0.72rem', marginTop: '2px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
          {[{ icon: '🏠', text: agent.speciality }, { icon: '🌍', text: agent.languages }, { icon: '📍', text: agent.areas.join(', ') }].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
              <span style={{ color: '#8aafd4', fontSize: '0.82rem', lineHeight: '1.4' }}>{item.text}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" rel="noopener noreferrer"
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25d366', color: '#fff', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: '700', transition: 'background 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1ebe5d'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#25d366'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <a href={`tel:${agent.phone}`}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: 'rgba(45,95,196,0.2)', color: '#4a90d9', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: '700', border: '1px solid rgba(45,95,196,0.3)', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2d5fc4'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.2)'; e.currentTarget.style.color = '#4a90d9' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call
          </a>
        </div>
      </div>
    </div>
  )
}

const Agents = () => {
  const [showApplyModal, setShowApplyModal] = useState(false)

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Apply Modal */}
      {showApplyModal && <ApplyModal onClose={() => setShowApplyModal(false)} />}

      {/* Header */}
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '70px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.06, filter: 'blur(100px)' }} />
        <Container>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ Our Team</span>
          </div>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '300', marginBottom: '8px' }}>Meet Our Expert</h1>
          <h1 style={{ color: '#4a90d9', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '20px' }}>Real Estate Agents</h1>
          <p style={{ color: '#8aafd4', fontSize: '1rem', lineHeight: '1.8', maxWidth: '540px' }}>
            Our team of certified RERA agents brings decades of combined experience to help you find, buy, rent or sell property in Dubai.
          </p>
          <div style={{ display: 'flex', gap: '32px', marginTop: '32px', flexWrap: 'wrap' }}>
            {[{ number: '30+', label: 'Expert Agents' }, { number: '40+', label: 'Nationalities Served' }, { number: '1,200+', label: 'Happy Clients' }].map((stat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && <div style={{ width: '1px', height: '36px', backgroundColor: 'rgba(74,144,217,0.3)', marginRight: '28px' }} />}
                <div>
                  <div style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: '800', lineHeight: '1' }}>{stat.number}</div>
                  <div style={{ color: '#8aafd4', fontSize: '0.78rem', marginTop: '3px' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Container style={{ paddingTop: '56px' }}>
        <Row className="g-4">
          {agents.map(agent => (
            <Col key={agent.id} lg={4} md={6}>
              <AgentCard agent={agent} />
            </Col>
          ))}
        </Row>

        {/* Bottom CTA */}
        <div style={{ marginTop: '60px', background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 50%, #0d1f4e 100%)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
          <h2 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: '300', marginBottom: '6px' }}>Want to Join Our</h2>
          <h2 style={{ color: '#4a90d9', fontSize: '1.8rem', fontWeight: '800', marginBottom: '16px' }}>Agent Team?</h2>
          <p style={{ color: '#8aafd4', fontSize: '0.95rem', marginBottom: '28px', maxWidth: '460px', margin: '0 auto 28px' }}>
            We're always looking for talented real estate professionals to join Lazord. Apply today and start your journey with us.
          </p>
          <button
            onClick={() => setShowApplyModal(true)}
            style={{ display: 'inline-block', backgroundColor: '#2d5fc4', color: '#fff', padding: '14px 36px', borderRadius: '10px', border: 'none', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', transition: 'background 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}
          >
            🚀 Apply Now
          </button>
        </div>
      </Container>
    </div>
  )
}

export default Agents