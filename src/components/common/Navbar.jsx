import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container, Nav, Navbar as BsNavbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/image/lazordlogoo.png'

const Navbar = () => {
  const [expanded, setExpanded] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [propOpen, setPropOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const langRef = useRef(null)
  const propRef = useRef(null)
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const currentLang = i18n.language === 'ar' ? 'AR' : 'EN'
  const isRTL = i18n.language === 'ar'

  const switchLanguage = (code) => {
    i18n.changeLanguage(code)
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = code
    setLangOpen(false)
  }

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
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

  const propertyLinks = [
    { path: '/properties?type=Buy',        label: '🏠 Buy Property',    desc: 'Find your dream home' },
    { path: '/properties?type=Rent',       label: '🔑 Rent Property',   desc: 'Short & long term rentals' },
    { path: '/properties?type=Off Plan',   label: '🏗️ Off Plan',        desc: 'New development projects' },
    { path: '/properties?type=Commercial', label: '🏢 Commercial',      desc: 'Offices & retail spaces' },
  ]

  const isPropertyActive = location.pathname === '/properties'

  return (
    <>
      <BsNavbar expanded={expanded} expand="lg" sticky="top"
        style={{ backgroundColor: scrolled ? 'rgba(13,31,78,0.98)' : '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.4)', minHeight: '70px', padding: '0', zIndex: 1000, backdropFilter: scrolled ? 'blur(12px)' : 'none', transition: 'all 0.3s ease', boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.3)' : 'none' }}
      >
        <Container fluid style={{ padding: '0 20px' }}>

          {/* Logo */}
          <BsNavbar.Brand as={Link} to="/" dir="ltr" onClick={() => setExpanded(false)}
  style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
  <img
    src={logo}
    alt="Lazord Real Estate"
    style={{ height: '70px', width: 'auto', filter: 'brightness(0) invert(1)', objectFit: 'contain' }}
  />
  <div dir="ltr" style={{ lineHeight: '1.2' }}>
    <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.1rem', letterSpacing: '1px' }}>LAZORD</div>
     <div style={{ color: '#4a90d9', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Real Estate</div>
  </div>
</BsNavbar.Brand>
          {/* Mobile right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="d-lg-none">
            <div style={{ position: 'relative' }} ref={langRef}>
              <div onClick={() => setLangOpen(!langOpen)} style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1.5px solid #4a90d9', backgroundColor: 'rgba(45,95,196,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.1rem' }}>🌐</div>
              {langOpen && (
                <div style={{ position: 'absolute', top: '42px', right: '0', backgroundColor: '#0d1f4e', border: '1px solid #2d5fc4', borderRadius: '8px', overflow: 'hidden', zIndex: 9999, minWidth: '150px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                  {[{ code: 'en', label: 'English', flag: '🇬🇧', display: 'EN' }, { code: 'ar', label: 'العربية', flag: '🇦🇪', display: 'AR' }].map(lang => (
                    <div key={lang.code} onClick={() => switchLanguage(lang.code)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', cursor: 'pointer', color: currentLang === lang.display ? '#4a90d9' : '#ffffff', backgroundColor: currentLang === lang.display ? 'rgba(45,95,196,0.2)' : 'transparent', fontSize: '0.88rem', borderBottom: '1px solid rgba(45,95,196,0.2)' }}>
                      <span>{lang.flag}</span><span style={{ flex: 1 }}>{lang.label}</span>
                      {currentLang === lang.display && <span style={{ color: '#4a90d9' }}>✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <BsNavbar.Toggle aria-controls="main-navbar" onClick={() => setExpanded(!expanded)} style={{ borderColor: '#2d5fc4', padding: '5px 10px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid #2d5fc4', borderRadius: '6px' }}>
              <span style={{ color: '#4a90d9', fontSize: '1.2rem', display: 'block', lineHeight: 1 }}>{expanded ? '✕' : '☰'}</span>
            </BsNavbar.Toggle>
          </div>

          <BsNavbar.Collapse id="main-navbar">
            <Nav className="mx-auto align-items-center">


              {/* Home link */}
<Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}
  style={{ color: location.pathname === '/' ? '#4a90d9' : '#ffffff', fontWeight: location.pathname === '/' ? '600' : '400', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '10px 12px', borderBottom: location.pathname === '/' ? '2px solid #4a90d9' : '2px solid transparent', transition: 'all 0.2s ease' }}>
  {t('nav.home')}
</Nav.Link>

              {/* Properties Dropdown */}
              <div style={{ position: 'relative' }} ref={propRef} className="d-none d-lg-block">
                <div onClick={() => setPropOpen(!propOpen)}
                  style={{ color: isPropertyActive ? '#4a90d9' : '#ffffff', fontWeight: '500', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '10px 12px', borderBottom: isPropertyActive ? '2px solid #4a90d9' : '2px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s ease', userSelect: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#4a90d9' }}
                  onMouseLeave={e => { if (!propOpen) e.currentTarget.style.color = isPropertyActive ? '#4a90d9' : '#ffffff' }}
                >
                  Properties
                  <span style={{ fontSize: '0.6rem', transition: 'transform 0.2s', display: 'inline-block', transform: propOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </div>

                {/* Mega Dropdown */}
                {propOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.4)', borderRadius: '14px', padding: '16px', zIndex: 9999, minWidth: '340px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', marginTop: '8px' }}>
                    <div style={{ color: '#8aafd4', fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(45,95,196,0.2)' }}>Browse Properties</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {propertyLinks.map(link => (
                        <Link key={link.path} to={link.path} onClick={() => setPropOpen(false)}
                          style={{ display: 'block', backgroundColor: 'rgba(45,95,196,0.1)', border: '1px solid rgba(45,95,196,0.2)', borderRadius: '10px', padding: '12px 14px', textDecoration: 'none', transition: 'all 0.2s ease' }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.25)'; e.currentTarget.style.borderColor = '#4a90d9' }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.1)'; e.currentTarget.style.borderColor = 'rgba(45,95,196,0.2)' }}
                        >
                          <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.85rem', marginBottom: '3px' }}>{link.label}</div>
                          <div style={{ color: '#8aafd4', fontSize: '0.72rem' }}>{link.desc}</div>
                        </Link>
                      ))}
                    </div>
                    <Link to="/properties" onClick={() => setPropOpen(false)}
                      style={{ display: 'block', textAlign: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(45,95,196,0.2)', color: '#4a90d9', textDecoration: 'none', fontSize: '0.82rem', fontWeight: '600' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={e => e.currentTarget.style.color = '#4a90d9'}>
                      View All Properties →
                    </Link>
                  </div>
                )}
              </div>

              {/* Other links */}
              {[{ path: '/about', label: t('nav.about') }, { path: '/contact', label: t('footer.links.contact') }].map(link => (
                <Nav.Link key={link.path} as={Link} to={link.path} onClick={() => setExpanded(false)}
                  style={{ color: location.pathname === link.path ? '#4a90d9' : '#ffffff', fontWeight: location.pathname === link.path ? '600' : '400', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '10px 12px', borderBottom: location.pathname === link.path ? '2px solid #4a90d9' : '2px solid transparent', transition: 'all 0.2s ease' }}>
                  {link.label}
                </Nav.Link>
              ))}

              {/* Mobile property links */}
              <div className="d-lg-none" style={{ width: '100%' }}>
                <div style={{ color: '#8aafd4', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', padding: '8px 12px 4px' }}>Properties</div>
                {propertyLinks.map(link => (
                  <Nav.Link key={link.path} as={Link} to={link.path} onClick={() => setExpanded(false)}
                    style={{ color: '#ffffff', fontSize: '0.85rem', padding: '8px 20px' }}>
                    {link.label}
                  </Nav.Link>
                ))}
              </div>
            </Nav>

            {/* Desktop right */}
            <div className="d-none d-lg-flex align-items-center" style={{ gap: '12px', flexShrink: 0 }}>
              <a href="tel:+97142999088" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', textDecoration: 'none', fontSize: '0.82rem', transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = '#4a90d9'}
                onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>📞</div>
                <div style={{ lineHeight: '1.2' }}>
                  <div style={{ color: '#8aafd4', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Call Us</div>
                  <div style={{ fontWeight: '700', fontSize: '0.82rem' }}>+971 42 999 088</div>
                </div>
              </a>
              <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(45,95,196,0.4)' }} />
              <Link to="/contact"
                style={{ backgroundColor: '#2d5fc4', color: '#ffffff', border: '2px solid #2d5fc4', borderRadius: '8px', padding: '9px 20px', fontSize: '0.82rem', fontWeight: '700', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1a3a7c'; e.currentTarget.style.borderColor = '#1a3a7c' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#2d5fc4'; e.currentTarget.style.borderColor = '#2d5fc4' }}>
                📅 {t('nav.bookValuation')}
              </Link>
              <div style={{ position: 'relative' }} ref={langRef}>
                <div onClick={() => setLangOpen(!langOpen)} style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1.5px solid #4a90d9', backgroundColor: 'rgba(45,95,196,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.3rem' }}>🌐</div>
                {langOpen && (
                  <div style={{ position: 'absolute', top: '46px', right: '0', backgroundColor: '#0d1f4e', border: '1px solid #2d5fc4', borderRadius: '8px', overflow: 'hidden', zIndex: 9999, minWidth: '160px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                    {[{ code: 'en', label: 'English', flag: '🇬🇧', display: 'EN' }, { code: 'ar', label: 'العربية', flag: '🇦🇪', display: 'AR' }].map(lang => (
                      <div key={lang.code} onClick={() => switchLanguage(lang.code)}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', cursor: 'pointer', color: currentLang === lang.display ? '#4a90d9' : '#ffffff', backgroundColor: currentLang === lang.display ? 'rgba(45,95,196,0.2)' : 'transparent', fontSize: '0.88rem', borderBottom: '1px solid rgba(45,95,196,0.2)' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.25)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = currentLang === lang.display ? 'rgba(45,95,196,0.2)' : 'transparent'}>
                        <span style={{ fontSize: '1.2rem' }}>{lang.flag}</span>
                        <span style={{ flex: 1 }}>{lang.label}</span>
                        <span style={{ fontSize: '0.75rem', color: '#8aafd4' }}>{lang.display}</span>
                        {currentLang === lang.display && <span style={{ color: '#4a90d9' }}>✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile bottom */}
            <div className="d-lg-none" style={{ padding: '16px 0 8px', borderTop: '1px solid rgba(45,95,196,0.2)', marginTop: '8px' }}>
              <a href="tel:+97142999088" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff', textDecoration: 'none', padding: '10px 4px', marginBottom: '8px', fontSize: '0.9rem' }}>
                📞 <span style={{ fontWeight: '700' }}>+971 42 999 088</span>
              </a>
              <Link to="/contact" onClick={() => setExpanded(false)}
                style={{ display: 'block', backgroundColor: '#2d5fc4', color: '#ffffff', borderRadius: '8px', padding: '12px 16px', fontSize: '0.88rem', fontWeight: '700', textDecoration: 'none', textAlign: 'center' }}>
                📅 {t('nav.bookValuation')}
              </Link>
            </div>
          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>
      {expanded && <div onClick={() => setExpanded(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999, top: '70px' }} />}
    </>
  )
}

export default Navbar