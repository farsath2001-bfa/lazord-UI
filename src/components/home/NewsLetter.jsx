import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    setLoading(true)
    setError('')
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  const topics = [
    { icon: '🏠', text: 'New Listings' },
    { icon: '📊', text: 'Market Updates' },
    { icon: '💰', text: 'Investment Tips' },
    { icon: '🏗️', text: 'Off Plan Projects' },
  ]

  return (
    <section style={{
      backgroundColor: '#0a1630',
      padding: '80px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '20%', transform: 'translateY(-50%)', width: '400px', height: '300px', backgroundColor: '#2d5fc4', opacity: 0.04, filter: 'blur(100px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: '50%', right: '20%', transform: 'translateY(-50%)', width: '300px', height: '300px', backgroundColor: '#4a90d9', opacity: 0.04, filter: 'blur(80px)', borderRadius: '50%' }} />

      <Container>
        <div style={{
          background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 50%, #0d1f4e 100%)',
          border: '1px solid rgba(74,144,217,0.3)',
          borderRadius: '24px',
          padding: '60px 48px',
          position: 'relative',
          overflow: 'hidden'
        }}>

          <Row className="align-items-center g-4">

            {/* Left */}
            <Col lg={6}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.4)', borderRadius: '30px', padding: '5px 14px', marginBottom: '20px' }}>
                <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ Newsletter</span>
              </div>

              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '300', marginBottom: '6px' }}>
                Stay in the Loop with
              </h2>
              <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '800', marginBottom: '16px' }}>
                Dubai Real Estate
              </h2>
              <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '28px', maxWidth: '420px' }}>
                Join 5,000+ investors and homebuyers receiving our weekly market insights, new listings and exclusive off-plan opportunities.
              </p>

              {/* Topics */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {topics.map((topic, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    backgroundColor: 'rgba(45,95,196,0.15)',
                    border: '1px solid rgba(74,144,217,0.25)',
                    borderRadius: '20px', padding: '6px 14px'
                  }}>
                    <span style={{ fontSize: '0.9rem' }}>{topic.icon}</span>
                    <span style={{ color: '#8aafd4', fontSize: '0.8rem', fontWeight: '500' }}>{topic.text}</span>
                  </div>
                ))}
              </div>
            </Col>

            {/* Right */}
            <Col lg={6}>
              {submitted ? (
                <div style={{
                  backgroundColor: 'rgba(39,174,96,0.12)',
                  border: '1px solid rgba(39,174,96,0.3)',
                  borderRadius: '16px', padding: '40px 32px', textAlign: 'center'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🎉</div>
                  <h3 style={{ color: '#27ae60', fontWeight: '700', marginBottom: '10px', fontSize: '1.2rem' }}>
                    You're Subscribed!
                  </h3>
                  <p style={{ color: '#8aafd4', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '0' }}>
                    Welcome to our community! You'll receive your first newsletter with the latest Dubai property market updates soon.
                  </p>
                </div>
              ) : (
                <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(74,144,217,0.2)', borderRadius: '16px', padding: '36px 32px' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '6px' }}>
                    Subscribe for Free
                  </h3>
                  <p style={{ color: '#8aafd4', fontSize: '0.85rem', marginBottom: '24px' }}>
                    Weekly updates every Sunday. No spam, unsubscribe anytime.
                  </p>

                  <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={e => { setEmail(e.target.value); setError('') }}
                          required
                          style={{
                            flex: 1, backgroundColor: '#060f26',
                            border: `1px solid ${error ? '#e74c3c' : 'rgba(45,95,196,0.35)'}`,
                            borderRadius: '10px', color: '#ffffff',
                            padding: '13px 16px', fontSize: '0.9rem',
                            outline: 'none', boxSizing: 'border-box',
                            transition: 'border-color 0.2s ease'
                          }}
                          onFocus={e => e.target.style.borderColor = '#4a90d9'}
                          onBlur={e => e.target.style.borderColor = error ? '#e74c3c' : 'rgba(45,95,196,0.35)'}
                        />
                        <button
                          type="submit"
                          disabled={loading}
                          style={{
                            backgroundColor: loading ? '#1a3a7c' : '#2d5fc4',
                            color: '#fff', border: 'none', borderRadius: '10px',
                            padding: '13px 24px', fontSize: '0.9rem', fontWeight: '700',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            whiteSpace: 'nowrap', transition: 'background 0.2s ease',
                            display: 'flex', alignItems: 'center', gap: '6px'
                          }}
                          onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#1a3a7c' }}
                          onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#2d5fc4' }}
                        >
                          {loading ? (
                            <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                          ) : '→'}
                        </button>
                      </div>
                      {error && <p style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '6px', marginBottom: 0 }}>{error}</p>}
                    </div>

                    {/* Preferences */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <p style={{ color: '#8aafd4', fontSize: '0.78rem', margin: '0 0 4px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                        I'm interested in:
                      </p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['Buying', 'Renting', 'Investing', 'Off Plan'].map((pref, i) => (
                          <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" defaultChecked={i === 0} style={{ accentColor: '#4a90d9', width: '14px', height: '14px' }} />
                            <span style={{ color: '#8aafd4', fontSize: '0.82rem' }}>{pref}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Privacy note */}
                    <p style={{ color: '#555f7a', fontSize: '0.75rem', marginTop: '16px', marginBottom: 0, lineHeight: '1.5' }}>
                      🔒 We respect your privacy. Your email will never be shared with third parties.
                    </p>
                  </form>
                </div>
              )}

              {/* Social Proof */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
                <div style={{ display: 'flex' }}>
                  {['#2d5fc4', '#27ae60', '#e67e22', '#8e44ad', '#16a085'].map((color, i) => (
                    <div key={i} style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      backgroundColor: color, border: '2px solid #0a1630',
                      marginLeft: i > 0 ? '-8px' : '0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontSize: '0.65rem', fontWeight: '700'
                    }}>
                      {['M', 'S', 'R', 'F', 'J'][i]}
                    </div>
                  ))}
                </div>
                <p style={{ color: '#8aafd4', fontSize: '0.82rem', margin: 0 }}>
                  <span style={{ color: '#ffffff', fontWeight: '700' }}>5,000+</span> subscribers already joined
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: #4a5a7a; }
      `}</style>
    </section>
  )
}

export default Newsletter