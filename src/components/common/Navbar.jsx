import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container, Nav, Navbar as BsNavbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/image/lazordlogoo.png'

const Navbar = () => {
  const [expanded, setExpanded] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)
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
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname + location.search === path || location.pathname === path.split('?')[0]
  }

  const linkStyle = (path) => ({
    color: isActive(path) ? '#4a90d9' : '#ffffff',
    fontWeight: isActive(path) ? '600' : '400',
    fontSize: '0.88rem',
    letterSpacing: '1.8px',
    textTransform: 'uppercase',
    padding: '8px 13px',
    borderBottom: isActive(path) ? '2px solid #4a90d9' : '2px solid transparent',
    transition: 'all 0.2s ease'
  })

  const navLinks = [
    { path: '/',                          label: t('nav.home') },
    { path: '/properties?type=Buy',       label: t('nav.buy') },
    { path: '/properties?type=Rent',      label: t('nav.rent') },
    { path: '/properties?type=Sell',      label: t('nav.sell') },
    { path: '/properties?type=Off Plan',  label: t('nav.offplan') },
    { path: '/properties?type=Commercial',label: t('nav.commercial') },
    { path: '/about',                     label: t('nav.about') },
    { path: '/agents',                    label: t('nav.agents') },
  ]

  return (
    <BsNavbar
      expanded={expanded}
      expand="lg"
      sticky="top"
      style={{
        backgroundColor: '#0d1f4e',
        borderBottom: '2px solid #2d5fc4',
        minHeight: '80px',
        padding: '0'
      }}
    >
      <Container fluid style={{ padding: '0 30px' }}>

        {/* Logo */}
        <BsNavbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginRight: '30px', textDecoration: 'none' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={logo} alt="Lazord Real Estate" style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block' }} />
          </div>
          <div style={{ lineHeight: '1.2' }}>
            <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.1rem', letterSpacing: '0.5px' }}>
              Lazord<span style={{ color: '#4a90d9' }}>RealEstate</span>
            </div>
            <div style={{ color: '#8aafd4', fontSize: '0.65rem', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
              لازورد للعقارات
            </div>
          </div>
        </BsNavbar.Brand>

        {/* Mobile Toggle */}
        <BsNavbar.Toggle
          aria-controls="main-navbar"
          onClick={() => setExpanded(!expanded)}
          style={{ borderColor: '#2d5fc4', padding: '6px 12px', backgroundColor: 'rgba(45,95,196,0.15)' }}
        >
          <span style={{ color: '#4a90d9', fontSize: '1.3rem' }}>☰</span>
        </BsNavbar.Toggle>

        {/* Nav Links */}
        <BsNavbar.Collapse id="main-navbar">
          <Nav className="mx-auto align-items-center" onClick={() => setExpanded(false)}>
            {navLinks.map(link => (
              <Nav.Link key={link.path} as={Link} to={link.path} style={linkStyle(link.path)}>
                {link.label}
              </Nav.Link>
            ))}
          </Nav>

          {/* Right Side */}
          <div className="d-flex align-items-center" style={{ gap: '14px', flexShrink: 0 }}>

            {/* Book a Valuation */}
            <Link
              to="/contact"
              style={{
                color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.85)',
                borderRadius: '5px',
                padding: '9px 18px',
                fontSize: '0.82rem',
                letterSpacing: '0.5px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.25s ease',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2d5fc4'; e.currentTarget.style.borderColor = '#2d5fc4' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.85)' }}
            >
              {t('nav.bookValuation')}
            </Link>

            {/* Language Switcher */}
            <div style={{ position: 'relative' }} ref={langRef}>
              <div
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  border: '1.5px solid #4a90d9',
                  backgroundColor: 'rgba(45,95,196,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', flexShrink: 0, fontSize: '1.3rem',
                  transition: 'all 0.2s ease'
                }}
              >
                🌐
              </div>

              {langOpen && (
                <div style={{
                  position: 'absolute',
                  top: '46px',
                  [isRTL ? 'left' : 'right']: '0',
                  backgroundColor: '#0d1f4e',
                  border: '1px solid #2d5fc4',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  zIndex: 9999,
                  minWidth: '160px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
                }}>
                  {[
                    { code: 'en', label: 'English', flag: '🇬🇧', display: 'EN' },
                    { code: 'ar', label: 'العربية', flag: '🇦🇪', display: 'AR' },
                  ].map((lang) => (
                    <div
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '12px 16px', cursor: 'pointer',
                        color: currentLang === lang.display ? '#4a90d9' : '#ffffff',
                        backgroundColor: currentLang === lang.display ? 'rgba(45,95,196,0.2)' : 'transparent',
                        fontSize: '0.88rem',
                        borderBottom: '1px solid rgba(45,95,196,0.2)',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.25)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = currentLang === lang.display ? 'rgba(45,95,196,0.2)' : 'transparent'}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{lang.flag}</span>
                      <span style={{ flex: 1 }}>{lang.label}</span>
                      <span style={{ fontSize: '0.75rem', color: '#8aafd4' }}>{lang.display}</span>
                      {currentLang === lang.display && <span style={{ color: '#4a90d9', fontSize: '0.8rem' }}>✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}

export default Navbar