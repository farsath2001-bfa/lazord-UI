import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container, Nav, Navbar as BsNavbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/image/lazordlogoo.png'
import LangSwitcher from './LangSwitcher'

const Navbar = () => {
  const [expanded, setExpanded] = useState(false)
  const [propOpen, setPropOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const propRef = useRef(null)
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const isRTL = i18n.language === 'ar'

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (propRef.current && !propRef.current.contains(e.target)) setPropOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => { setExpanded(false); setPropOpen(false) }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isPropertyActive = location.pathname === '/properties'

  const propertyLinks = [
    { path: '/properties?type=Buy',        label: `🏠 ${t('nav.buy')}`,        desc: t('services.items.buy.desc') },
    { path: '/properties?type=Rent',       label: `🔑 ${t('nav.rent')}`,       desc: t('services.items.rent.desc') },
    { path: '/properties?type=Off Plan',   label: `🏗️ ${t('nav.offplan')}`,    desc: t('services.items.offplan.desc') },
    { path: '/properties?type=Commercial', label: `🏢 ${t('nav.commercial')}`, desc: t('services.items.invest.desc') },
  ]

 const linkStyle = (path) => ({
  color: location.pathname === path ? '#2d5fc4' : '#1a1a2e',
  fontWeight: location.pathname === path ? '700' : '500',
  fontSize: '0.9rem',           // ← bigger
  letterSpacing: '1.2px',
  textTransform: 'uppercase',
  padding: '10px 16px',         // ← more spacing
  borderBottom: location.pathname === path ? '2px solid #2d5fc4' : '2px solid transparent',
  transition: 'all 0.2s ease'
})

  return (
    <>
      <BsNavbar
        expanded={expanded}
        expand="lg"
        sticky="top"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.98)' : '#ffffff',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          minHeight: '75px',
          padding: '0',
          zIndex: 1000,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 4px 20px rgba(250, 247, 247, 0.83)' : 'none'
        }}
      >
        <Container fluid style={{ padding: '0 20px' }} dir="ltr">

          {/* Logo */}
         <BsNavbar.Brand
  as={Link} to="/" dir="ltr"
  onClick={() => setExpanded(false)}
  style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
>
  <img
    src={logo}
    alt="Lazord Real Estate"
    style={{ height: '75px', width: 'auto', objectFit: 'contain' }}
  />
  <div dir="ltr" style={{ lineHeight: '1.2' }}>
    <div style={{ color: '#1a1a2e', fontWeight: '800', fontSize: '1rem', letterSpacing: '1px' }}>LAZORD</div>
    <div style={{ color: '#2d5fc4', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' }}>REAL ESTATE</div>
  </div>
</BsNavbar.Brand>

          {/* Mobile right — LangSwitcher + Hamburger */}
          <div className="d-lg-none" style={{ display: 'flex', alignItems: 'center', gap: '10px' }} dir="ltr">
            <LangSwitcher isMobile={true} />
            <BsNavbar.Toggle
              aria-controls="main-navbar"
              onClick={() => setExpanded(!expanded)}
              style={{
                borderColor: '#2d5fc4', padding: '5px 10px',
                backgroundColor: 'rgba(45,95,196,0.08)',
                border: '1px solid #2d5fc4', borderRadius: '6px'
              }}
            >
              <span style={{ color: '#2d5fc4', fontSize: '1.2rem', display: 'block', lineHeight: 1 }}>
                {expanded ? '✕' : '☰'}
              </span>
            </BsNavbar.Toggle>
          </div>

          <BsNavbar.Collapse id="main-navbar">
            <Nav className="mx-auto align-items-center">

              {/* Home */}
              <Nav.Link
                as={Link} to="/"
                onClick={() => setExpanded(false)}
                style={linkStyle('/')}
                onMouseEnter={e => { if (location.pathname !== '/') e.currentTarget.style.color = '#2d5fc4' }}
                onMouseLeave={e => { if (location.pathname !== '/') e.currentTarget.style.color = '#1a1a2e' }}
              >
                {t('nav.home')}
              </Nav.Link>

              {/* Properties Dropdown — desktop */}
              <div style={{ position: 'relative' }} ref={propRef} className="d-none d-lg-block">
                <div
                  onClick={() => setPropOpen(!propOpen)}
                  style={{
                    color: isPropertyActive ? '#2d5fc4' : '#1a1a2e',
                    fontWeight: '500', fontSize: '0.85rem',
                    letterSpacing: '1px', textTransform: 'uppercase',
                    padding: '10px 12px',
                    borderBottom: isPropertyActive ? '2px solid #2d5fc4' : '2px solid transparent',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    transition: 'all 0.2s ease', userSelect: 'none'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2d5fc4'}
                  onMouseLeave={e => { if (!propOpen) e.currentTarget.style.color = isPropertyActive ? '#2d5fc4' : '#1a1a2e' }}
                >
                  {t('nav.properties')}
                  <span style={{ fontSize: '0.6rem', transition: 'transform 0.2s', display: 'inline-block', transform: propOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </div>

                {propOpen && (
                  <div dir="ltr" style={{
                    position: 'absolute', top: '100%', left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#0d1f4e',
                    border: '1px solid rgba(45,95,196,0.4)',
                    borderRadius: '14px', padding: '16px',
                    zIndex: 9999, minWidth: '340px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    marginTop: '8px'
                  }}>
                    <div style={{ color: '#8aafd4', fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(45,95,196,0.2)' }}>
                      {t('featured.badge')}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {propertyLinks.map(link => (
                        <Link
                          key={link.path} to={link.path}
                          onClick={() => { setPropOpen(false); setExpanded(false) }}
                          style={{ display: 'block', backgroundColor: 'rgba(45,95,196,0.1)', border: '1px solid rgba(45,95,196,0.2)', borderRadius: '10px', padding: '12px 14px', textDecoration: 'none', transition: 'all 0.2s ease' }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.borderColor = '#4a90d9' }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.1)'; e.currentTarget.style.borderColor = 'rgba(45,95,196,0.2)' }}
                        >
                          <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.85rem', marginBottom: '3px' }}>{link.label}</div>
                          <div style={{ color: '#8aafd4', fontSize: '0.72rem' }}>{link.desc}</div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      to="/properties"
                      onClick={() => { setPropOpen(false); setExpanded(false) }}
                      style={{ display: 'block', textAlign: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(45,95,196,0.2)', color: '#4a90d9', textDecoration: 'none', fontSize: '0.82rem', fontWeight: '600' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={e => e.currentTarget.style.color = '#4a90d9'}
                    >
                      {t('featured.viewAll')} →
                    </Link>
                  </div>
                )}
              </div>

              {/* About + Contact */}
              {[{ path: '/about', label: t('nav.about') }, { path: '/contact', label: t('nav.contact') }].map(link => (
                <Nav.Link
                  key={link.path} as={Link} to={link.path}
                  onClick={() => setExpanded(false)}
                  style={linkStyle(link.path)}
                  onMouseEnter={e => { if (location.pathname !== link.path) e.currentTarget.style.color = '#2d5fc4' }}
                  onMouseLeave={e => { if (location.pathname !== link.path) e.currentTarget.style.color = '#1a1a2e' }}
                >
                  {link.label}
                </Nav.Link>
              ))}

              {/* Mobile property links */}
              <div className="d-lg-none" style={{ width: '100%' }}>
                <div style={{ color: '#888', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', padding: '8px 12px 4px' }}>
                  {t('nav.properties')}
                </div>
                {propertyLinks.map(link => (
                  <Nav.Link
                    key={link.path} as={Link} to={link.path}
                    onClick={() => setExpanded(false)}
                    style={{ color: '#1a1a2e', fontSize: '0.85rem', padding: '8px 20px' }}
                  >
                    {link.label}
                  </Nav.Link>
                ))}
              </div>

            </Nav>

            {/* Desktop right side */}
            <div className="d-none d-lg-flex align-items-center" dir="ltr" style={{ gap: '12px', flexShrink: 0 }}>
              
               <a href="tel:+97142999088" dir="ltr"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1a1a2e', textDecoration: 'none', fontSize: '0.82rem', transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = '#2d5fc4'}
                onMouseLeave={e => e.currentTarget.style.color = '#1a1a2e'}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(45,95,196,0.1)', border: '1px solid rgba(45,95,196,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>📞</div>
                <div dir="ltr" style={{ lineHeight: '1.2' }}>
                  <div style={{ color: '#888', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('nav.callUs') || 'Call Us'}</div>
                  <div style={{ fontWeight: '700', fontSize: '0.82rem' }}>+971 42 999 088</div>
                </div>
              </a>

              <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(0,0,0,0.1)' }} />

              <Link to="/contact" dir="ltr" style={{ background: 'linear-gradient(135deg, #2d5fc4, #1a3a7c)',
              color: '#ffffff', border: 'none',  borderRadius: '10px',  padding: '10px 22px',  fontSize: '0.85rem',  fontWeight: '700',  textDecoration: 'none',
              whiteSpace: 'nowrap', transition: 'all 0.25s ease',  boxShadow: '0 4px 15px rgba(45,95,196,0.3)', display: 'flex',  alignItems: 'center', gap: '6px'
               }}
        onMouseEnter={e => {
             e.currentTarget.style.background = 'linear-gradient(135deg, #1a3a7c, #0d1f4e)'
             e.currentTarget.style.transform = 'translateY(-1px)'
             e.currentTarget.style.boxShadow = '0 6px 20px rgba(45,95,196,0.4)'
               }}
         onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #2d5fc4, #1a3a7c)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(45,95,196,0.3)'
               }}>
            📅 {t('nav.bookValuation')}
            </Link>

              <LangSwitcher />
            </div>

            {/* Mobile bottom */}
            <div className="d-lg-none" style={{ padding: '16px 0 8px', borderTop: '1px solid rgba(0,0,0,0.08)', marginTop: '8px' }}>
              
                <a href="tel:+97142999088" dir="ltr"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1a1a2e', textDecoration: 'none', padding: '10px 4px', marginBottom: '8px', fontSize: '0.9rem' }}
              >
                📞 <span style={{ fontWeight: '700' }}>+971 42 999 088</span>
              </a>
              <Link
                to="/contact"
                onClick={() => setExpanded(false)}
                style={{ display: 'block', backgroundColor: '#2d5fc4', color: '#ffffff', borderRadius: '8px', padding: '12px 16px', fontSize: '0.88rem', fontWeight: '700', textDecoration: 'none', textAlign: 'center' }}
              >
                📅 {t('nav.bookValuation')}
              </Link>
            </div>

          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>

      {/* Mobile overlay */}
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 998, top: '70px' }}
        />
      )}
    </>
  )
}

export default Navbar