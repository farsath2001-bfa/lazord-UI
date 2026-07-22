import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import logo from '../../assets/image/lazordlogoo.png'

const socialMedia = [
  { name: 'Facebook',  color: '#1877F2', url: 'https://www.facebook.com/share/1E8S4YPqL7/',                             svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { name: 'Instagram', color: '#E4405F', url: 'https://www.instagram.com/lazord_real.estate?igsh=MXd0NHp5c2hjYW1kbg==', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { name: 'WhatsApp',  color: '#25D366', url: 'https://wa.me/971561119233',                                             svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  { name: 'LinkedIn',  color: '#0A66C2', url: 'https://linkedin.com',                                                   svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { name: 'YouTube',   color: '#FF0000', url: 'https://youtube.com',                                                    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
  { name: 'TikTok',    color: '#69C9D0', url: 'https://tiktok.com',                                                     svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
]

const Footer = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setSubStatus('loading')
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/leads`, {
        name: 'Newsletter Subscriber',
        email, phone: 'N/A',
        service: 'General Inquiry',
        source: 'Website Popup',
        message: `Newsletter subscription: ${email}`
      })
      setSubStatus('done')
      setEmail('')
    } catch {
      setSubStatus('error')
    }
    setTimeout(() => setSubStatus(''), 4000)
  }

  const quickLinks = [
    { label: t('nav.home'),       path: '/' },
    { label: t('nav.properties'), path: '/properties' },
    { label: t('nav.about'),      path: '/about' },
    { label: t('nav.contact'),    path: '/contact' },
    { label: 'FAQ',               path: '/faq' },
    { label: t('nav.agents') || 'Agents', path: '/agents' },
    { label: t('footer.legal') || 'Privacy & Terms', path: '/legal' },
  ]

  const propertyLinks = [
    { label: t('nav.buy'),        path: '/properties?type=Buy' },
    { label: t('nav.rent'),       path: '/properties?type=Rent' },
    { label: t('nav.offplan'),    path: '/properties?type=Off Plan' },
    { label: t('nav.commercial'), path: '/properties?type=Commercial' },
  ]

  return (
    <footer style={{ backgroundColor: '#060f26', borderTop: '1px solid rgba(45,95,196,0.3)', color: '#ffffff' }}>

      {/* Newsletter Bar */}
      <div style={{ background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 100%)', borderBottom: '1px solid rgba(45,95,196,0.2)', padding: '28px 0' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', margin: 0 }}>
                📬 {t('footer.newsletter.title') || 'Stay Updated on Dubai Property Market'}
              </h3>
              <p style={{ color: '#8aafd4', fontSize: '0.82rem', margin: '4px 0 0' }}>
                {t('footer.newsletter.desc') || 'Get the latest listings, market insights and investment tips.'}
              </p>
            </div>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input type="email" required placeholder={t('footer.newsletter.placeholder') || 'Enter your email'}
                value={email} onChange={e => setEmail(e.target.value)}
                style={{ backgroundColor: 'rgba(6,15,38,0.5)', border: '1px solid rgba(74,144,217,0.4)', borderRadius: '8px', color: '#ffffff', padding: '10px 16px', fontSize: '0.88rem', outline: 'none', minWidth: '220px' }} />
              <button type="submit" disabled={subStatus === 'loading'}
                style={{ backgroundColor: '#2d5fc4', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '0.88rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}>
                {subStatus === 'loading' ? '...' : subStatus === 'done' ? '✅ Done!' : subStatus === 'error' ? '❌ Try again' : t('footer.newsletter.btn') || 'Subscribe'}
              </button>
            </form>
          </div>
        </Container>
      </div>

      {/* Main Footer */}
      <Container style={{ padding: '48px 15px 32px' }}>
        <Row className="g-5">

          {/* Brand */}
          <Col lg={4} md={12}>
            <Link to="/" dir="ltr" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '16px' }}>
              <img src={logo} alt="Lazord Real Estate"
                style={{ height: '60px', width: 'auto', filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />
              <div dir="ltr" style={{ lineHeight: '1.2' }}>
                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.1rem', letterSpacing: '1px' }}>LAZORD</div>
                <div style={{ color: '#4a90d9', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Real Estate</div>
              </div>
            </Link>
            <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '20px', maxWidth: '280px' }}>
              {t('footer.tagline')}
            </p>
            {/* Certifications */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['RERA Licensed', 'DED Certified', 'Est. 2007'].map(tag => (
                <span key={tag} style={{ backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.25)', borderRadius: '20px', padding: '4px 12px', color: '#8aafd4', fontSize: '0.72rem', fontWeight: '600' }}>
                  {tag}
                </span>
              ))}
            </div>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {socialMedia.map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" title={social.name}
                  style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(45,95,196,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8aafd4', textDecoration: 'none', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${social.color}25`; e.currentTarget.style.borderColor = social.color; e.currentTarget.style.color = social.color; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.color = '#8aafd4'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  {social.svg}
                </a>
              ))}
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={4} xs={6}>
            <h6 style={{ color: '#4a90d9', marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '700' }}>
              {t('footer.quickLinks')}
            </h6>
            <ul className="list-unstyled" style={{ margin: 0 }}>
              {quickLinks.map(item => (
                <li key={item.path} style={{ marginBottom: '10px' }}>
                  <Link to={item.path} style={{ color: '#8aafd4', textDecoration: 'none', fontSize: '0.86rem', transition: 'color 0.2s ease', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#4a90d9'}
                    onMouseLeave={e => e.currentTarget.style.color = '#8aafd4'}>
                    <span style={{ color: '#2d5fc4', fontSize: '0.7rem' }}>›</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Property Types */}
          <Col lg={2} md={4} xs={6}>
            <h6 style={{ color: '#4a90d9', marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '700' }}>
              Properties
            </h6>
            <ul className="list-unstyled" style={{ margin: 0 }}>
              {propertyLinks.map(item => (
                <li key={item.path} style={{ marginBottom: '10px' }}>
                  <Link to={item.path} style={{ color: '#8aafd4', textDecoration: 'none', fontSize: '0.86rem', transition: 'color 0.2s ease', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#4a90d9'}
                    onMouseLeave={e => e.currentTarget.style.color = '#8aafd4'}>
                    <span style={{ color: '#2d5fc4', fontSize: '0.7rem' }}>›</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact */}
          <Col lg={4} md={4} xs={12}>
            <h6 style={{ color: '#4a90d9', marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '700' }}>
              {t('footer.contactUs')}
            </h6>
            <ul className="list-unstyled" style={{ color: '#8aafd4', fontSize: '0.86rem', marginBottom: '20px' }}>
              <li style={{ marginBottom: '10px', display: 'flex', gap: '8px' }}>
                <span>📍</span>
                <span>Office 803, AlSalemiya Tower, Rigga Al Butteen, Dubai, UAE</span>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="tel:+97142999088" style={{ color: '#8aafd4', textDecoration: 'none', display: 'flex', gap: '8px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#4a90d9'}
                  onMouseLeave={e => e.currentTarget.style.color = '#8aafd4'}>
                  <span>📞</span><span>+971 42 999 088</span>
                </a>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <a href="mailto:info@lazordrealestate.ae" style={{ color: '#8aafd4', textDecoration: 'none', display: 'flex', gap: '8px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#4a90d9'}
                  onMouseLeave={e => e.currentTarget.style.color = '#8aafd4'}>
                  <span>✉️</span><span>info@lazordrealestate.ae</span>
                </a>
              </li>
            </ul>
            {/* Map */}
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(45,95,196,0.3)' }}>
              <iframe title="Lazord Real Estate Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7216.7368119157045!2d55.3223574!3d25.258189599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cd10170bd0f%3A0x33c038729b931804!2sAl%20Salemiyah%20Tower%20(SBK)!5e0!3m2!1sen!2sae!4v1782656168293!5m2!1sen!2sae"
                width="100%" height="150" style={{ border: 0, display: 'block' }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <a href="https://maps.google.com/?q=AlSalemiya+Tower+Rigga+Al+Butteen+Deira+Dubai"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: '8px', color: '#4a90d9', fontSize: '0.78rem', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = '#4a90d9'}>
              📍 Open in Google Maps →
            </a>
          </Col>
        </Row>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(45,95,196,0.2)', marginTop: '40px', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: '#4a4a6a', fontSize: '0.82rem', margin: 0 }}>
            {t('footer.rights')}
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/legal" style={{ color: '#4a4a6a', fontSize: '0.78rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#4a90d9'}
              onMouseLeave={e => e.currentTarget.style.color = '#4a4a6a'}>
              Privacy Policy
            </Link>
            <Link to="/legal" style={{ color: '#4a4a6a', fontSize: '0.78rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#4a90d9'}
              onMouseLeave={e => e.currentTarget.style.color = '#4a4a6a'}>
              Terms of Use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer