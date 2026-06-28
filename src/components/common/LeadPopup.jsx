import { useState, useEffect } from 'react'
import axios from 'axios'
import logo from '../../assets/image/lazordlogoo.png'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const LeadPopup = () => {
  const [show, setShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState('')
  const [form, setForm] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    const seen = sessionStorage.getItem('leadPopupSeen')
    if (!seen) {
      const timer = setTimeout(() => setShow(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setShow(false)
    sessionStorage.setItem('leadPopupSeen', 'true')
  }

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${API_URL}/api/leads`, {
        name: `${form.title} ${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: '+971' + form.phone,
        service: 'General Inquiry',
        source: 'Website Popup',
        message: 'Registered interest via website popup'
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setSubmitted(true)
      sessionStorage.setItem('leadPopupSeen', 'true')
      setTimeout(() => setShow(false), 3000)
    }
  }

  if (!show) return null

  const fieldStyle = (name) => ({
    width: '100%',
    backgroundColor: '#060f26',
    border: `1px solid ${focused === name ? '#4a90d9' : 'rgba(45,95,196,0.3)'}`,
    borderRadius: '10px',
    color: '#ffffff',
    padding: '13px 16px',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
    cursor: name === 'title' ? 'pointer' : 'text'
  })

  return (
    <>
      {/* Backdrop */}
      <div onClick={handleClose} style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(5,15,40,0.85)',
        zIndex: 99998,
        backdropFilter: 'blur(3px)',
        animation: 'fadeIn 0.3s ease'
      }} />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 99999,
        width: '94%',
        maxWidth: '460px',
        maxHeight: '92vh',
        overflowY: 'auto',
        borderRadius: '20px',
        backgroundColor: '#0d1f4e',
        border: '1px solid rgba(74,144,217,0.25)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #060f26 0%, #0d1f4e 100%)',
          padding: '32px 32px 24px',
          textAlign: 'center',
          position: 'relative',
          borderBottom: '1px solid rgba(74,144,217,0.15)'
        }}>

          {/* Glow */}
          <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '200px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.08, filter: 'blur(60px)', pointerEvents: 'none' }} />

          {/* Close */}
          <button onClick={handleClose} style={{
            position: 'absolute', top: '14px', right: '14px',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '50%', width: '32px', height: '32px',
            color: '#8aafd4', fontSize: '1.1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease', lineHeight: '1'
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#8aafd4' }}
          >×</button>

          {/* Logo — same as navbar */}
         <div dir="ltr" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px', direction: 'ltr', unicodeBidi: 'isolate' }}>
  <div style={{ border: '2px solid rgba(255,255,255,0.8)', borderRadius: '8px', padding: '3px 6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img src={logo} alt="Lazord Real Estate" style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block' }} />
  </div>
  <div dir="ltr" style={{ lineHeight: '1.2', textAlign: 'left', direction: 'ltr', unicodeBidi: 'isolate' }}>
    <div dir="ltr" style={{ color: '#ffffff', fontWeight: '700', fontSize: '1rem', letterSpacing: '0.5px', direction: 'ltr', unicodeBidi: 'isolate' }}>
      Lazord<span style={{ color: '#4a90d9' }}>RealEstate</span>
    </div>
    <div dir="ltr" style={{ color: '#8aafd4', fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase', direction: 'ltr', unicodeBidi: 'embed', textAlign: 'left' }}>
      لازورد للعقارات
    </div>
  </div>
</div>

          {/* Divider */}
          <div style={{ width: '40px', height: '2px', backgroundColor: '#2d5fc4', margin: '0 auto 16px', borderRadius: '2px' }} />

          <h2 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '700', marginBottom: '6px' }}>
            Register Your Interest
          </h2>
          <p style={{ color: '#8aafd4', fontSize: '0.83rem', margin: 0, lineHeight: '1.5' }}>
            Fill in your details and our team will be in touch with you shortly.
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: '28px 32px 32px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '70px', height: '70px', borderRadius: '50%',
                backgroundColor: 'rgba(39,174,96,0.15)',
                border: '2px solid rgba(39,174,96,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', margin: '0 auto 18px'
              }}>✅</div>
              <h3 style={{ color: '#ffffff', fontWeight: '700', marginBottom: '8px', fontSize: '1.1rem' }}>Thank You!</h3>
              <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
                One of our agents will reach out to you very soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              {/* Title + First Name */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <div style={{ flex: '0 0 110px' }}>
                  <label style={{ color: '#8aafd4', fontSize: '0.72rem', letterSpacing: '0.5px', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Title *</label>
                  <select name="title" required value={form.title} onChange={handleChange}
                    onFocus={() => setFocused('title')} onBlur={() => setFocused('')}
                    style={fieldStyle('title')}>
                    <option value="">--</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ color: '#8aafd4', fontSize: '0.72rem', letterSpacing: '0.5px', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>First Name *</label>
                  <input type="text" name="firstName" required placeholder="First name"
                    value={form.firstName} onChange={handleChange}
                    onFocus={() => setFocused('firstName')} onBlur={() => setFocused('')}
                    style={fieldStyle('firstName')} />
                </div>
              </div>

              {/* Last Name */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ color: '#8aafd4', fontSize: '0.72rem', letterSpacing: '0.5px', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Last Name *</label>
                <input type="text" name="lastName" required placeholder="Last name"
                  value={form.lastName} onChange={handleChange}
                  onFocus={() => setFocused('lastName')} onBlur={() => setFocused('')}
                  style={fieldStyle('lastName')} />
              </div>

              {/* Email */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ color: '#8aafd4', fontSize: '0.72rem', letterSpacing: '0.5px', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Email Address *</label>
                <input type="email" name="email" required placeholder="your@email.com"
                  value={form.email} onChange={handleChange}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                  style={fieldStyle('email')} />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ color: '#8aafd4', fontSize: '0.72rem', letterSpacing: '0.5px', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Phone Number *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    backgroundColor: '#060f26',
                    border: '1px solid rgba(45,95,196,0.3)',
                    borderRadius: '10px', padding: '13px 12px',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '1rem' }}>🇦🇪</span>
                    <span style={{ color: '#8aafd4', fontSize: '0.85rem', fontWeight: '600' }}>+971</span>
                  </div>
                  <input type="tel" name="phone" required placeholder="50 000 0000"
                    value={form.phone} onChange={handleChange}
                    onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
                    style={{ ...fieldStyle('phone'), flex: 1 }} />
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} style={{
                width: '100%',
                background: loading ? '#1a3a7c' : 'linear-gradient(135deg, #2d5fc4 0%, #4a90d9 100%)',
                color: '#ffffff', border: 'none', borderRadius: '10px',
                padding: '15px', fontSize: '0.92rem', fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 4px 20px rgba(45,95,196,0.35)',
                transition: 'all 0.2s ease'
              }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(45,95,196,0.5)' } }}
                onMouseLeave={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(45,95,196,0.35)' } }}
              >
                {loading
                  ? <><span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span> Submitting...</>
                  : '📩 Submit'
                }
              </button>

              <p style={{ color: '#555f7a', fontSize: '0.72rem', textAlign: 'center', marginTop: '12px', marginBottom: 0 }}>
                🔒 Your information is secure and will never be shared
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, -44%); } to { opacity: 1; transform: translate(-50%, -50%); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: #4a5a7a; }
        select option { background-color: #0d1f4e; color: #ffffff; }
      `}</style>
    </>
  )
}

export default LeadPopup