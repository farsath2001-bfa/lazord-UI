import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { I18nContext } from 'react-i18next'

const contactInfo = [
  {
    icon: '📍',
    title: 'Office Address',
    lines: ['Rigga Al Butteen', 'Dubai, UAE'],
    color: '#2d5fc4'
  },
  {
    icon: '📞',
    title: 'Phone & WhatsApp',
    lines: ['+971 42 981 077', '+971 56 111 9233'],
    color: '#25d366'
  },
  {
    icon: '✉️',
    title: 'Email Us',
    lines: ['info@lazordrealestate.com', 'sales@lazordrealestate.com'],
    color: '#e67e22'
  },
  {
    icon: '🕐',
    title: 'Working Hours',
    lines: ['Mon – Thu: 9:00 AM – 6:30 PM', 'Sat – Sun : 9:00 AM – 3:00 PM','Fri : Hoilday'],
    color: '#8e44ad'
  },
]

const services = ['Buy a Property', 'Rent a Property', 'Sell My Property', 'Off Plan Investment', 'Commercial Property', 'Free Valuation', 'General Inquiry']

const Contact = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  const inputStyle = {
    width: '100%',
    backgroundColor: '#060f26',
    border: '1px solid rgba(45,95,196,0.3)',
    borderRadius: '10px',
    color: '#ffffff',
    padding: '13px 16px',
    fontSize: '0.92rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease'
  }

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{
        backgroundColor: '#0d1f4e',
        borderBottom: '1px solid rgba(45,95,196,0.3)',
        padding: '70px 0',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          backgroundColor: '#2d5fc4', opacity: 0.06, filter: 'blur(100px)'
        }} />
        <Container>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(45,95,196,0.15)',
            border: '1px solid rgba(74,144,217,0.3)',
            borderRadius: '30px', padding: '5px 14px', marginBottom: '16px'
          }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>
              ✦ Contact Us
            </span>
          </div>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '300', marginBottom: '8px' }}>
            Let's Start Your
          </h1>
          <h1 style={{ color: '#4a90d9', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '20px' }}>
            Property Journey
          </h1>
          <p style={{ color: '#8aafd4', fontSize: '1rem', lineHeight: '1.8', maxWidth: '540px' }}>
            Our expert agents are ready to help you buy, rent, sell or invest in Dubai real estate. Reach out and we'll get back to you within 2 hours.
          </p>
        </Container>
      </div>

      <Container style={{ paddingTop: '60px' }}>

        {/* Contact Info Cards */}
        <Row className="g-4" style={{ marginBottom: '60px' }}>
          {contactInfo.map((info, i) => (
            <Col key={i} lg={3} md={6}>
              <div style={{
                backgroundColor: '#0d1f4e',
                border: '1px solid rgba(45,95,196,0.25)',
                borderRadius: '14px', padding: '24px 20px',
                height: '100%', transition: 'all 0.25s ease'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = info.color
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(45,95,196,0.25)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  backgroundColor: `${info.color}20`,
                  border: `1px solid ${info.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', marginBottom: '14px'
                }}>
                  {info.icon}
                </div>
                <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: '700', marginBottom: '10px' }}>
                  {info.title}
                </h4>
                {info.lines.map((line, j) => (
                  <p key={j} style={{ color: '#8aafd4', fontSize: '0.85rem', margin: '0 0 4px', lineHeight: '1.5' }}>
                    {line}
                  </p>
                ))}
              </div>
            </Col>
          ))}
        </Row>

        {/* Form + Map */}
        <Row className="g-4">

          {/* Contact Form */}
          <Col lg={7}>
            <div style={{
              backgroundColor: '#0d1f4e',
              border: '1px solid rgba(45,95,196,0.3)',
              borderRadius: '20px', padding: '40px 36px'
            }}>
              <h2 style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: '700', marginBottom: '6px' }}>
                Send Us a Message
              </h2>
              <p style={{ color: '#8aafd4', fontSize: '0.88rem', marginBottom: '28px' }}>
                Fill in the form and our team will contact you within 2 hours.
              </p>

              {submitted ? (
                <div style={{
                  backgroundColor: 'rgba(39,174,96,0.12)',
                  border: '1px solid rgba(39,174,96,0.3)',
                  borderRadius: '14px', padding: '48px 32px', textAlign: 'center'
                }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>✅</div>
                  <h3 style={{ color: '#27ae60', fontWeight: '700', marginBottom: '10px' }}>Message Sent Successfully!</h3>
                  <p style={{ color: '#8aafd4', fontSize: '0.92rem', marginBottom: '24px' }}>
                    Thank you for reaching out. One of our expert agents will contact you within 2 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }) }}
                    style={{
                      backgroundColor: '#2d5fc4', color: '#fff', border: 'none',
                      borderRadius: '10px', padding: '12px 28px',
                      fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer'
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                        FULL NAME *
                      </label>
                      <input
                        type="text" name="name" required
                        placeholder="Your full name"
                        value={form.name} onChange={handleChange}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#4a90d9'}
                        onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'}
                      />
                    </Col>
                    <Col md={6}>
                      <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email" name="email" required
                        placeholder="your@email.com"
                        value={form.email} onChange={handleChange}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#4a90d9'}
                        onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'}
                      />
                    </Col>
                    <Col md={6}>
                      <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                        PHONE NUMBER *
                      </label>
                      <input
                        type="tel" name="phone" required
                        placeholder="+971 50 000 0000"
                        value={form.phone} onChange={handleChange}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#4a90d9'}
                        onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'}
                      />
                    </Col>
                    <Col md={6}>
                      <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                        SERVICE NEEDED
                      </label>
                      <select
                        name="service"
                        value={form.service} onChange={handleChange}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        onFocus={e => e.target.style.borderColor = '#4a90d9'}
                        onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'}
                      >
                        <option value="">Select a service...</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Col>
                    <Col md={12}>
                      <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                        MESSAGE
                      </label>
                      <textarea
                        name="message" rows={5}
                        placeholder="Tell us about your property requirements, budget, preferred location..."
                        value={form.message} onChange={handleChange}
                        style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={e => e.target.style.borderColor = '#4a90d9'}
                        onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'}
                      />
                    </Col>
                    <Col md={12}>
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          width: '100%', backgroundColor: loading ? '#1a3a7c' : '#2d5fc4',
                          color: '#fff', border: 'none', borderRadius: '10px',
                          padding: '15px', fontSize: '0.95rem', fontWeight: '700',
                          cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s ease',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                        }}
                        onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#1a3a7c' }}
                        onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#2d5fc4' }}
                      >
                        {loading ? (
                          <>
                            <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                            Sending...
                          </>
                        ) : '📨 Send Message'}
                      </button>
                    </Col>
                  </Row>
                </form>
              )}
            </div>
          </Col>

          {/* Right Side */}
          <Col lg={5}>

            {/* WhatsApp Card */}
            <div style={{
              backgroundColor: '#0d1f4e',
              border: '1px solid rgba(37,211,102,0.3)',
              borderRadius: '16px', padding: '28px 24px', marginBottom: '16px'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>💬</div>
              <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>
                Chat on WhatsApp
              </h3>
              <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '18px' }}>
                Get instant replies from our agents. Available 7 days a week from 9 AM to 9 PM.
              </p>
              <a
                href="https://wa.me/97142981077?text=Hello, I'm interested in a property from Lazord Real Estate."
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  backgroundColor: '#25d366', color: '#fff', padding: '13px 20px',
                  borderRadius: '10px', textDecoration: 'none', fontWeight: '700',
                  fontSize: '0.92rem', transition: 'background 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1ebe5d'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#25d366'}
              >
                Open WhatsApp →
              </a>
            </div>

            {/* Map placeholder */}
            <div style={{
              backgroundColor: '#0d1f4e',
              border: '1px solid rgba(45,95,196,0.25)',
              borderRadius: '16px', overflow: 'hidden'
            }}>
              <iframe
                title="Lazord Office Location"
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3684066212977!2d55.31978247538382!3d25.2581895776718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cd10170bd0f%3A0x33c038729b931804!2sAl%20Salemiyah%20Tower%20(SBK)!5e0!3m2!1sen!2sae!4v1782230235367!5m2!1sen!2sae" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                width="100%"
                height="280"
                style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
              />
              <div style={{ padding: '16px 20px' }}>
                <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '0.9rem', marginBottom: '4px' }}>
                  📍 8th Floor,Office No:803,Lazord Real Estate 
                </div>
                <div style={{ color: '#8aafd4', fontSize: '0.82rem' }}>
                  Rigga Al Butteen, Dubai, UAE
                </div>
              </div>
            </div>

          </Col>
        </Row>

      </Container>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: #4a5a7a; }
        select option { background-color: #0d1f4e; color: #ffffff; }
      `}</style>

    </div>
  )
}

export default Contact