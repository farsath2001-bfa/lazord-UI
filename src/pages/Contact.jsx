import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import useScrollReveal from '../hooks/useScrollReveal'

const services = ['Buy a Property', 'Rent a Property', 'Sell My Property', 'Off Plan Investment', 'Commercial Property', 'Free Valuation', 'General Inquiry']

const socialMedia = [
  { name: 'Facebook', color: '#1877F2', url: 'https://www.facebook.com/share/1E8S4YPqL7/', svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { name: 'Instagram', color: '#E4405F', url: 'https://www.instagram.com/lazord_real.estate?igsh=MXd0NHp5c2hjYW1kbg==', svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { name: 'WhatsApp', color: '#25D366', url: 'https://wa.me/97142981077', svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  { name: 'LinkedIn', color: '#0A66C2', url: 'https://linkedin.com', svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { name: 'Twitter/X', color: '#000000', url: 'https://twitter.com', svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { name: 'YouTube', color: '#FF0000', url: 'https://youtube.com', svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
  { name: 'TikTok', color: '#010101', url: 'https://tiktok.com', svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
  { name: 'Snapchat', color: '#FFFC00', url: 'https://snapchat.com', svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.065.001c.328 0 3.655-.005 5.549 3.271l.07.127.002.003c.307.567.489 1.254.493 2.14.011 1.851 0 3.362 0 3.362s.468.26 1.078.26c.67 0 1.416-.312 1.9-1.126.057-.097.167-.126.257-.066.252.168.337.657.128 1.235-.35.967-1.15 1.525-1.15 1.525l.006.016c.052.145.416 1.003 1.742 1.527.169.067.28.234.257.415-.015.112-.082.299-.349.479-.71.481-2.097.843-2.152.857-.065.017-.122.054-.163.107-.051.067-.083.162-.071.288.05.52.543 1.093.543 1.741 0 .491-.217.896-.567 1.191-.4.336-1.005.553-1.775.658-.312.043-.509.326-.67.616-.177.32-.334.687-.516.98-.289.467-.62.71-1.019.71-.183 0-.379-.046-.594-.126-.437-.162-.903-.426-1.48-.426-.06 0-.12.003-.181.009-.468.044-.886.247-1.219.44-.504.291-.931.532-1.409.532-.372 0-.715-.174-.993-.643-.181-.293-.338-.66-.516-.98-.161-.29-.358-.573-.67-.616-.77-.105-1.375-.322-1.775-.658-.35-.295-.567-.7-.567-1.191 0-.648.493-1.221.543-1.741.012-.126-.02-.221-.071-.288-.041-.053-.098-.09-.163-.107-.055-.014-1.442-.376-2.152-.857-.267-.18-.334-.367-.349-.479-.023-.181.088-.348.257-.415 1.326-.524 1.69-1.382 1.742-1.527l.006-.016s-.8-.558-1.15-1.525c-.209-.578-.124-1.067.128-1.235.09-.06.2-.031.257.066.484.814 1.23 1.126 1.9 1.126.61 0 1.078-.26 1.078-.26s-.011-1.511 0-3.362c.004-.886.186-1.573.493-2.14l.002-.003.07-.127C8.41-.004 11.737.001 12.065.001z"/></svg> },
]

const contactInfo = [
  { icon: '📍', title: 'Office Address', lines: ['Office 803,', 'AlSalemiya Tower,', 'Rigga Al Butteen,', 'Dubai, UAE'], color: '#2d5fc4' },
  { icon: '📞', title: 'Phone & WhatsApp', lines: ['+971 42 981 077', '+971 50 000 0000'], color: '#25d366' },
  { icon: '✉️', title: 'Email Us', lines: ['info@lazordrealestate.com', 'sales@lazordrealestate.com'], color: '#e67e22' },
  { icon: '🕐', title: 'Working Hours', lines: ['Mon – Sat: 9:00 AM – 7:00 PM', 'Sunday: 10:00 AM – 4:00 PM'], color: '#8e44ad' },
]

const Contact = () => {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const infoRef    = useScrollReveal({ direction: 'up',   delay: 0,   duration: 700 })
  const socialRef  = useScrollReveal({ direction: 'up',   delay: 0,   duration: 700 })
  const formRef    = useScrollReveal({ direction: 'left', delay: 0,   duration: 700 })
  const sideRef    = useScrollReveal({ direction: 'right',delay: 0,   duration: 700 })

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/leads`, {
        name: form.name, email: form.email, phone: form.phone,
        service: form.service || 'General Inquiry',
        message: form.message, source: 'Contact Form'
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  const inputStyle = {
    width: '100%', backgroundColor: '#060f26',
    border: '1px solid rgba(45,95,196,0.3)', borderRadius: '10px',
    color: '#ffffff', padding: '13px 16px', fontSize: '0.92rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s ease'
  }

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Header — no reveal */}
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '70px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.06, filter: 'blur(100px)' }} />
        <Container>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('contact.badge')}</span>
          </div>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '300', marginBottom: '8px' }}>{t('contact.title1')}</h1>
          <h1 style={{ color: '#4a90d9', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '20px' }}>{t('contact.title2')}</h1>
          <p style={{ color: '#8aafd4', fontSize: '1rem', lineHeight: '1.8', maxWidth: '540px' }}>{t('contact.subtitle')}</p>
        </Container>
      </div>

      <Container style={{ paddingTop: '60px' }}>

        {/* Info Cards */}
        <div ref={infoRef}>
          <Row className="g-4" style={{ marginBottom: '48px' }}>
            {contactInfo.map((info, i) => (
              <Col key={i} lg={3} md={6}>
                <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '14px', padding: '24px 20px', height: '100%', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = info.color; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: `${info.color}20`, border: `1px solid ${info.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '14px' }}>{info.icon}</div>
                  <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: '700', marginBottom: '10px' }}>{info.title}</h4>
                  {info.lines.map((line, j) => <p key={j} style={{ color: '#8aafd4', fontSize: '0.85rem', margin: '0 0 4px', lineHeight: '1.5' }}>{line}</p>)}
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Social Media */}
        <div ref={socialRef} style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: '32px', marginBottom: '40px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px' }}>Follow Us on Social Media</h2>
            <p style={{ color: '#8aafd4', fontSize: '0.88rem', margin: 0 }}>Stay updated with our latest properties and news</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {socialMedia.map((social, i) => (
              <a key={i} href={social.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '10px', padding: '10px 18px', textDecoration: 'none', transition: 'all 0.25s ease', color: '#ffffff' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${social.color}25`; e.currentTarget.style.borderColor = social.color; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 20px ${social.color}40`; e.currentTarget.querySelector('.social-icon').style.color = social.color }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.querySelector('.social-icon').style.color = '#8aafd4' }}
              >
                <span className="social-icon" style={{ color: '#8aafd4', transition: 'color 0.25s ease', display: 'flex' }}>{social.svg}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        <Row className="g-4">
          {/* Form */}
          <Col lg={7} ref={formRef}>
            <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '20px', padding: '40px 36px' }}>
              <h2 style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: '700', marginBottom: '6px' }}>{t('contact.form.title')}</h2>
              <p style={{ color: '#8aafd4', fontSize: '0.88rem', marginBottom: '28px' }}>{t('contact.form.subtitle')}</p>
              {submitted ? (
                <div style={{ backgroundColor: 'rgba(39,174,96,0.12)', border: '1px solid rgba(39,174,96,0.3)', borderRadius: '14px', padding: '48px 32px', textAlign: 'center' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>✅</div>
                  <h3 style={{ color: '#27ae60', fontWeight: '700', marginBottom: '10px' }}>{t('contact.form.successTitle')}</h3>
                  <p style={{ color: '#8aafd4', fontSize: '0.92rem', marginBottom: '24px' }}>{t('contact.form.successDesc')}</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }) }}
                    style={{ backgroundColor: '#2d5fc4', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 28px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer' }}>
                    {t('contact.form.sendAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>{t('contact.form.name')} *</label>
                      <input type="text" name="name" required placeholder="Your full name" value={form.name} onChange={handleChange} style={inputStyle} onFocus={e => e.target.style.borderColor = '#4a90d9'} onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                    </Col>
                    <Col md={6}>
                      <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>{t('contact.form.email')} *</label>
                      <input type="email" name="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} style={inputStyle} onFocus={e => e.target.style.borderColor = '#4a90d9'} onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                    </Col>
                    <Col md={6}>
                      <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>{t('contact.form.phone')} *</label>
                      <input type="tel" name="phone" required placeholder="+971 50 000 0000" value={form.phone} onChange={handleChange} style={inputStyle} onFocus={e => e.target.style.borderColor = '#4a90d9'} onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                    </Col>
                    <Col md={6}>
                      <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>{t('contact.form.service')}</label>
                      <select name="service" value={form.service} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }} onFocus={e => e.target.style.borderColor = '#4a90d9'} onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'}>
                        <option value="">Select a service...</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Col>
                    <Col md={12}>
                      <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>{t('contact.form.message')}</label>
                      <textarea name="message" rows={5} placeholder="Tell us about your property requirements..." value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = '#4a90d9'} onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                    </Col>
                    <Col md={12}>
                      <button type="submit" disabled={loading}
                        style={{ width: '100%', backgroundColor: loading ? '#1a3a7c' : '#2d5fc4', color: '#fff', border: 'none', borderRadius: '10px', padding: '15px', fontSize: '0.95rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#1a3a7c' }}
                        onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#2d5fc4' }}
                      >
                        {loading ? <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span> {t('contact.form.sending')}</> : `📨 ${t('contact.form.send')}`}
                      </button>
                    </Col>
                  </Row>
                </form>
              )}
            </div>
          </Col>

          {/* Right side */}
          <Col lg={5} ref={sideRef}>
            <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(37,211,102,0.3)', borderRadius: '16px', padding: '28px 24px', marginBottom: '16px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>💬</div>
              <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>{t('contact.whatsapp.title')}</h3>
              <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '18px' }}>{t('contact.whatsapp.desc')}</p>
              <a href="https://wa.me/971561119233?text=Hello, I'm interested in a property from Lazord Real Estate." target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25d366', color: '#fff', padding: '13px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', transition: 'background 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1ebe5d'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#25d366'}
              >{t('contact.whatsapp.btn')}</a>
            </div>
            <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', overflow: 'hidden' }}>
              <iframe title="Lazord Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3684066212977!2d55.31978247538382!3d25.2581895776718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cd10170bd0f%3A0x33c038729b931804!2sAl%20Salemiyah%20Tower%20(SBK)!5e0!3m2!1sen!2sae!4v1782630978993!5m2!1sen!2sae"
                width="100%" height="260" style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }} allowFullScreen="" loading="lazy" />
              <div style={{ padding: '16px 20px' }}>
                <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '0.9rem', marginBottom: '4px' }}>📍 Lazord Real Estate HQ</div>
                <div style={{ color: '#8aafd4', fontSize: '0.82rem' }}>Office 803, Al Salemiyah Tower, Rigga Al Butteen, Dubai, UAE</div>
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