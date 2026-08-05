import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import logo from '../../assets/image/lazordlogoo.png'

const socialMedia = [
  { name: 'Facebook',  color: '#1877F2', url: 'https://www.facebook.com/share/1E8S4YPqL7/',                             svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { name: 'Instagram', color: '#E4405F', url: 'https://www.instagram.com/lazord_real.estate?igsh=MXd0NHp5c2hjYW1kbg==', svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { name: 'WhatsApp',  color: '#25D366', url: 'https://wa.me/971561119233',                                             svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  { name: 'LinkedIn',  color: '#0A66C2', url: 'https://linkedin.com',                                                   svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { name: 'YouTube',   color: '#FF0000', url: 'https://youtube.com',                                                    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
  { name: 'TikTok',    color: '#69C9D0', url: 'https://tiktok.com',                                                     svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
]

const contactRows = [
  {
    label: 'address',
    href: 'https://maps.google.com/?q=AlSalemiya+Tower+Rigga+Al+Butteen+Deira+Dubai',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    text: 'Office 803, AlSalemiya Tower, Rigga Al Butteen, Dubai, UAE',
  },
  {
    label: 'phone',
    href: 'tel:+97142999088',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    text: '+971 42 999 088',
    dir: 'ltr',
  },
  {
    label: 'email',
    href: 'mailto:info@lazordrealestate.ae',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>,
    text: 'info@lazordrealestate.ae',
  },
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
    { label: t('footer.legal') || 'Privacy & Terms', path: '/legal' },
  ]

  const propertyLinks = [
    { label: t('nav.buy'),        path: '/properties?type=Buy' },
    { label: t('nav.rent'),       path: '/properties?type=Rent' },
    { label: t('nav.offplan'),    path: '/properties?type=Off Plan' },
    { label: t('nav.commercial'), path: '/properties?type=Commercial' },
  ]

  return (
    <footer style={{ backgroundColor: '#050b1f', color: '#ffffff', position: 'relative', overflow: 'hidden' }}>

      {/* ambient glow, purely decorative */}
      <div style={{ position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)', width: '640px', height: '320px', background: 'radial-gradient(ellipse at center, rgba(45,95,196,0.16) 0%, rgba(45,95,196,0) 70%)', pointerEvents: 'none' }} />

      {/* Newsletter Bar */}
      <div style={{ position: 'relative', borderBottom: '1px solid rgba(74,144,217,0.14)', padding: '30px 0' }}>
        <Container>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px',
            background: 'linear-gradient(135deg, rgba(45,95,196,0.10) 0%, rgba(26,58,124,0.10) 100%)',
            border: '1px solid rgba(74,144,217,0.18)', borderRadius: '16px', padding: '22px 28px',
          }}>
            <div>
              <h3 style={{ color: '#ffffff', fontSize: '1.02rem', fontWeight: '700', margin: 0, letterSpacing: '-0.01em' }}>
                Stay ahead of Dubai's property market
              </h3>
              <p style={{ color: '#7d9fce', fontSize: '0.83rem', margin: '5px 0 0', fontWeight: '400' }}>
                New listings, price movement and off-plan launches — in your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input type="email" required placeholder="Enter your email"
                value={email} onChange={e => setEmail(e.target.value)}
                style={{ backgroundColor: 'rgba(5,11,31,0.6)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '10px', color: '#ffffff', padding: '11px 16px', fontSize: '0.87rem', outline: 'none', minWidth: '230px', transition: 'border-color 0.2s' }}
                onFocus={e => e.currentTarget.style.borderColor = '#4a90d9'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(74,144,217,0.3)'} />
              <button type="submit" disabled={subStatus === 'loading'}
                style={{ background: 'linear-gradient(135deg, #2d5fc4 0%, #1a3a7c 100%)', color: '#fff', border: 'none', borderRadius: '10px', padding: '11px 22px', fontSize: '0.87rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'opacity 0.2s, transform 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                {subStatus === 'loading' ? 'Sending…' : subStatus === 'done' ? 'Subscribed ✓' : subStatus === 'error' ? 'Try again' : 'Subscribe'}
              </button>
            </form>
          </div>
        </Container>
      </div>

      {/* Main Footer */}
      <Container style={{ position: 'relative', padding: '52px 15px 32px' }}>
        <Row className="g-5">

          {/* Brand */}
          <Col lg={4} md={12}>
            <Link to="/" dir="ltr" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: '4px' }}>
              <img src={logo} alt="Lazord Real Estate" style={{ height: '125px', width: 'auto', objectFit: 'contain' }} />
            </Link>
            <p style={{ color: '#7d9fce', fontSize: '0.87rem', lineHeight: '1.75', marginBottom: '18px', maxWidth: '280px' }}>
              {t('footer.tagline')}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '22px' }}>
              {['RERA Licensed', 'DED Certified', 'Est. 2007'].map(tag => (
                <span key={tag} style={{ backgroundColor: 'rgba(74,144,217,0.08)', border: '1px solid rgba(74,144,217,0.22)', borderRadius: '20px', padding: '5px 13px', color: '#9db8dd', fontSize: '0.71rem', fontWeight: '600', letterSpacing: '0.01em' }}>
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {socialMedia.map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" title={social.name}
                  style={{ width: '32px', height: '32px', borderRadius: '9px', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(74,144,217,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7d9fce', textDecoration: 'none', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${social.color}20`; e.currentTarget.style.borderColor = social.color; e.currentTarget.style.color = social.color; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(74,144,217,0.18)'; e.currentTarget.style.color = '#7d9fce'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  {social.svg}
                </a>
              ))}
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={4} xs={6}>
            <h6 style={{ color: '#5b8fd6', marginBottom: '18px', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: '700' }}>
              {t('footer.quickLinks')}
            </h6>
            <ul className="list-unstyled" style={{ margin: 0 }}>
              {quickLinks.map(item => (
                <li key={item.path} style={{ marginBottom: '11px' }}>
                  <Link to={item.path} style={{ color: '#8fa9cf', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s ease, padding-left 0.2s ease', display: 'inline-block' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.paddingLeft = '4px' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#8fa9cf'; e.currentTarget.style.paddingLeft = '0' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Property Types */}
          <Col lg={2} md={4} xs={6}>
            <h6 style={{ color: '#5b8fd6', marginBottom: '18px', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: '700' }}>
              {t('nav.properties')}
            </h6>
            <ul className="list-unstyled" style={{ margin: 0 }}>
              {propertyLinks.map(item => (
                <li key={item.path} style={{ marginBottom: '11px' }}>
                  <Link to={item.path} style={{ color: '#8fa9cf', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s ease, padding-left 0.2s ease', display: 'inline-block' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.paddingLeft = '4px' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#8fa9cf'; e.currentTarget.style.paddingLeft = '0' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact */}
          <Col lg={4} md={4} xs={12}>
            <h6 style={{ color: '#5b8fd6', marginBottom: '18px', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: '700' }}>
              {t('footer.contactUs')}
            </h6>
            <ul className="list-unstyled" style={{ marginBottom: '20px' }}>
              {contactRows.map(row => (
                <li key={row.label} style={{ marginBottom: '12px' }}>
                  <a href={row.href} target={row.label === 'address' ? '_blank' : undefined} rel={row.label === 'address' ? 'noopener noreferrer' : undefined}
                    dir={row.dir}
                    style={{ color: '#8fa9cf', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', lineHeight: '1.5', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#8fa9cf'}>
                    <span style={{ width: '26px', height: '26px', flexShrink: 0, borderRadius: '8px', backgroundColor: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5b8fd6' }}>
                      {row.icon}
                    </span>
                    <span style={{ paddingTop: '4px' }}>{row.text}</span>
                  </a>
                </li>
              ))}
            </ul>
            {/* Map */}
            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(74,144,217,0.2)' }}>
              <iframe title="Lazord Real Estate Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7216.7368119157045!2d55.3223574!3d25.258189599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cd10170bd0f%3A0x33c038729b931804!2sAl%20Salemiyah%20Tower%20(SBK)!5e0!3m2!1sen!2sae!4v1782656168293!5m2!1sen!2sae"
                width="100%" height="140" style={{ border: 0, display: 'block', filter: 'grayscale(0.3) contrast(1.1)' }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </Col>
        </Row>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(74,144,217,0.14)', marginTop: '44px', paddingTop: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: '#556b95', fontSize: '0.8rem', margin: 0 }}>
            {t('footer.rights')}
          </p>
          <div style={{ display: 'flex', gap: '22px' }}>
            <Link to="/legal" style={{ color: '#556b95', fontSize: '0.78rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#5b8fd6'}
              onMouseLeave={e => e.currentTarget.style.color = '#556b95'}>
              Privacy Policy
            </Link>
            <Link to="/legal" style={{ color: '#556b95', fontSize: '0.78rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#5b8fd6'}
              onMouseLeave={e => e.currentTarget.style.color = '#556b95'}>
              Terms of Use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer