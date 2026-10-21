import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container, Nav, Navbar as BsNavbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../../assets/image/lazordlogoo.png'
import LangSwitcher from './LangSwitcher'
import FavoritesNavLink from './FavoritesNavLink'
import CurrencySwitcher from './CurrencySwitcher'

// Small dot under the active nav item, in addition to the pill background
const ActiveDot = ({ active }) => active ? (
  <span style={{
    position: 'absolute', bottom: '-2px', left: '50%', transform: 'translateX(-50%)',
    width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#2d5fc4'
  }} />
) : null

const Navbar = () => {
  const [expanded, setExpanded] = useState(false)
  const [propOpen, setPropOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const propRef = useRef(null)
  const [contactOpen, setContactOpen] = useState(false)
  const contactRef = useRef(null)
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const isRTL = i18n.language === 'ar'

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language, isRTL])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (propRef.current && !propRef.current.contains(e.target)) setPropOpen(false)
      if (contactRef.current && !contactRef.current.contains(e.target)) setContactOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExpanded(prev => (prev ? false : prev))
    setPropOpen(prev => (prev ? false : prev))
  }, [location.pathname])

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
    { path: '/areas',             label: `📍 ${t('nav.areaGuides')}`, desc: t('nav.areaGuidesDesc') },
    { path: '/investment-tools',  label: `📈 ${t('nav.tools')}`,      desc: t('nav.toolsDesc') },
    { path: '/blog',              label: `📰 ${t('nav.insights')}`,   desc: t('nav.insightsDesc') },
  ]

  // Pill-style active/hover state instead of a plain underline
  const linkStyle = (path) => ({
    color: location.pathname === path ? '#2d5fc4' : '#1a1a2e',
    fontWeight: location.pathname === path ? '700' : '600',
    fontSize: '0.85rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    padding: '9px 18px',
    borderRadius: '30px',
    backgroundColor: location.pathname === path ? 'rgba(45,95,196,0.1)' : 'transparent',
    transition: 'all 0.2s ease',
    position: 'relative',
  })

  return (
    <>
      <BsNavbar
        expanded={expanded}
        expand="lg"
        sticky="top"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : '#ffffff',
          borderBottom: scrolled ? '1px solid rgba(45,95,196,0.14)' : '1px solid rgba(0,0,0,0.08)',
          minHeight: scrolled ? '60px' : '75px',
          padding: '0',
          zIndex: 1000,
          backdropFilter: scrolled ? 'blur(16px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(160%)' : 'none',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 8px 30px rgba(20,40,90,0.12)' : '0 2px 12px rgba(20,40,90,0.06)'
        }}
      >
        {/* Thin gradient accent line along the very top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #2d5fc4 0%, #4a90d9 50%, #2d5fc4 100%)', opacity: scrolled ? 1 : 0.7, transition: 'opacity 0.3s ease' }} />

        <Container fluid style={{ padding: '0 20px' }} dir="ltr">

          {/* Logo — shrinks on scroll */}
          <BsNavbar.Brand
            as={Link} to="/" dir="ltr"
            onClick={() => setExpanded(false)}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <img
              src={logo}
              alt="Lazord Real Estate"
              style={{ height: scrolled ? '54px' : '75px', width: 'auto', objectFit: 'contain', transition: 'height 0.3s ease' }}
            />
            <div dir="ltr" style={{ lineHeight: '1.2' }}>
              <div style={{ color: '#1a1a2e', fontWeight: '800', fontSize: scrolled ? '0.92rem' : '1.05rem', letterSpacing: '1.5px', transition: 'font-size 0.3s ease' }}>LAZORD</div>
              <div style={{
                background: 'linear-gradient(90deg, #2d5fc4, #4a90d9)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                fontSize: '0.65rem', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: '700'
              }}>REAL ESTATE</div>
            </div>
          </BsNavbar.Brand>

          {/* Mobile right — LangSwitcher + Hamburger */}
          <div className="d-lg-none" style={{ display: 'flex', alignItems: 'center', gap: '10px' }} dir="ltr">
            <FavoritesNavLink size={38} />
            <div className="lang-switcher-wrap">
              <LangSwitcher isMobile={true} />
            </div>
            <BsNavbar.Toggle
              aria-controls="main-navbar"
              onClick={() => setExpanded(!expanded)}
              className="navbar-hamburger-btn"
              style={{
                width: '38px', height: '38px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderColor: '#2d5fc4', padding: 0,
                backgroundColor: 'rgba(45,95,196,0.08)',
                border: '1px solid rgba(45,95,196,0.3)', borderRadius: '50%'
              }}
            >
              <span className="navbar-hamburger-icon" aria-hidden="true">
                <span className={`hb-bar hb-bar-1 ${expanded ? 'is-open' : ''}`} />
                <span className={`hb-bar hb-bar-2 ${expanded ? 'is-open' : ''}`} />
                <span className={`hb-bar hb-bar-3 ${expanded ? 'is-open' : ''}`} />
              </span>
            </BsNavbar.Toggle>
          </div>

          <BsNavbar.Collapse id="main-navbar">
            <Nav className="mx-auto align-items-center" style={{ gap: '4px' }}>

              {/* Home */}
              <Nav.Link
                as={Link} to="/"
                onClick={() => setExpanded(false)}
                style={linkStyle('/')}
                onMouseEnter={e => { if (location.pathname !== '/') { e.currentTarget.style.color = '#2d5fc4'; e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.06)' } }}
                onMouseLeave={e => { if (location.pathname !== '/') { e.currentTarget.style.color = '#1a1a2e'; e.currentTarget.style.backgroundColor = 'transparent' } }}
              >
                {t('nav.home')}
                <ActiveDot active={location.pathname === '/'} />
              </Nav.Link>

              {/* Properties Dropdown — desktop */}
              <div style={{ position: 'relative' }} ref={propRef} className="d-none d-lg-block">
                <div
                  onClick={() => setPropOpen(!propOpen)}
                  style={{
                    color: (isPropertyActive || propOpen) ? '#2d5fc4' : '#1a1a2e',
                    fontWeight: '600', fontSize: '0.85rem',
                    letterSpacing: '1px', textTransform: 'uppercase',
                    padding: '9px 18px', borderRadius: '30px',
                    backgroundColor: (isPropertyActive || propOpen) ? 'rgba(45,95,196,0.1)' : 'transparent',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    transition: 'all 0.2s ease', userSelect: 'none', position: 'relative'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#2d5fc4'; e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.1)' }}
                  onMouseLeave={e => { if (!propOpen) { e.currentTarget.style.color = isPropertyActive ? '#2d5fc4' : '#1a1a2e'; e.currentTarget.style.backgroundColor = isPropertyActive ? 'rgba(45,95,196,0.1)' : 'transparent' } }}
                >
                  {t('nav.properties')}
                  <span style={{ fontSize: '0.6rem', transition: 'transform 0.25s ease', display: 'inline-block', transform: propOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                  <ActiveDot active={isPropertyActive} />
                </div>

                <AnimatePresence>
                  {propOpen && (
                    <motion.div
                      dir="ltr"
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      style={{
                        position: 'absolute', top: '100%', left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#0d1f4e',
                        border: '1px solid rgba(45,95,196,0.4)',
                        borderRadius: '14px', padding: '16px',
                        zIndex: 9999, minWidth: '340px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        marginTop: '8px'
                      }}
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About + Contact */}
              {[{ path: '/about', label: t('nav.about') }, { path: '/contact', label: t('nav.contact') }].map(link => (
                <Nav.Link
                  key={link.path} as={Link} to={link.path}
                  onClick={() => setExpanded(false)}
                  style={linkStyle(link.path)}
                  onMouseEnter={e => { if (location.pathname !== link.path) { e.currentTarget.style.color = '#2d5fc4'; e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.06)' } }}
                  onMouseLeave={e => { if (location.pathname !== link.path) { e.currentTarget.style.color = '#1a1a2e'; e.currentTarget.style.backgroundColor = 'transparent' } }}
                >
                  {link.label}
                  <ActiveDot active={location.pathname === link.path} />
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
            <div className="d-none d-lg-flex align-items-center" dir="ltr" style={{ gap: '10px', flexShrink: 0 }}>

              {/* Call / WhatsApp — one button, opens a small menu */}
              <div ref={contactRef} style={{ position: 'relative' }}>
                <button type="button" onClick={() => setContactOpen(o => !o)}
                  aria-haspopup="menu" aria-expanded={contactOpen}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#1a1a2e' }}
                >
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(45,95,196,0.1)', border: '1px solid rgba(45,95,196,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>📞</div>
                  <div dir="ltr" style={{ lineHeight: '1.2', textAlign: 'left' }}>
                    <div style={{ color: '#888', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('nav.callUs')}</div>
                    <div style={{ fontWeight: '700', fontSize: '0.82rem' }}>+971 42 999 088 <span style={{ fontSize: '0.6rem', color: '#2d5fc4' }}>▾</span></div>
                  </div>
                </button>
                {contactOpen && (
                  <div role="menu" style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, minWidth: '210px', backgroundColor: '#ffffff', border: '1px solid rgba(45,95,196,0.2)', borderRadius: '12px', boxShadow: '0 12px 32px rgba(0,0,0,0.18)', padding: '6px', zIndex: 1100 }}>
                    <a role="menuitem" href="tel:+97142999088" onClick={() => setContactOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', color: '#1a1a2e', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.08)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      📞 <span>{t('nav.callNow')}</span>
                    </a>
                    <a role="menuitem" href="https://wa.me/971561119233?text=Hello, I'm interested in a property from Lazord Real Estate."
                      target="_blank" rel="noopener noreferrer" onClick={() => setContactOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', color: '#1a1a2e', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.12)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      💬 <span>{t('nav.whatsappUs')}</span>
                    </a>
                  </div>
                )}
              </div>

              <FavoritesNavLink />

              <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(0,0,0,0.1)' }} />

              <Link to="/contact" dir="ltr" className="navbar-cta-btn" style={{
                background: 'linear-gradient(135deg, #2d5fc4, #1a3a7c)',
                color: '#ffffff', border: 'none', borderRadius: '10px',
                padding: '10px 22px', fontSize: '0.85rem', fontWeight: '700',
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'all 0.25s ease', boxShadow: '0 4px 15px rgba(45,95,196,0.3)',
                display: 'flex', alignItems: 'center', gap: '6px',
                position: 'relative', overflow: 'visible'
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
                <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  📅 {t('nav.bookValuation')}
                </span>
              </Link>

              <CurrencySwitcher />

              <div className="lang-switcher-wrap">
                <LangSwitcher />
              </div>
            </div>

            {/* Mobile bottom */}
            <div className="d-lg-none" style={{ padding: '16px 0 8px', borderTop: '1px solid rgba(0,0,0,0.08)', marginTop: '8px' }}>

              <div style={{ marginBottom: '8px' }}><CurrencySwitcher isMobile /></div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                <a href="tel:+97142999088" dir="ltr"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', color: '#1a1a2e', textDecoration: 'none', padding: '10px 4px', fontSize: '0.9rem' }}
                >
                  📞 <span style={{ fontWeight: '700' }}>+971 42 999 088</span>
                </a>
                <a href="https://wa.me/971561119233?text=Hello, I'm interested in a property from Lazord Real Estate."
                  target="_blank" rel="noopener noreferrer"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}
                >
                  💬
                </a>
              </div>
              <Link
                to="/contact"
                onClick={() => setExpanded(false)}
                style={{ display: 'block', background: 'linear-gradient(135deg, #2d5fc4, #1a3a7c)', color: '#ffffff', borderRadius: '10px', padding: '12px 16px', fontSize: '0.88rem', fontWeight: '700', textDecoration: 'none', textAlign: 'center', boxShadow: '0 4px 15px rgba(45,95,196,0.3)' }}
              >
                📅 {t('nav.bookValuation')}
              </Link>
            </div>

          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>

      {/* Mobile overlay — soft blur instead of flat tint */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setExpanded(false)}
            style={{
              position: 'fixed', inset: 0,
              backgroundColor: 'rgba(6,15,38,0.28)',
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)',
              zIndex: 998, top: '70px'
            }}
          />
        )}
      </AnimatePresence>

      <style>{`
        /* Shine sweep across the Book Valuation button on hover */
        .navbar-cta-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
          pointer-events: none;
          z-index: 2;
        }
        .navbar-cta-btn:hover::before {
          left: 125%;
        }

        /* Subtle idle pulse ring on Book Valuation — breathes every few seconds, pauses on hover */
        .navbar-cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 10px;
          border: 2px solid rgba(45,95,196,0.5);
          opacity: 0;
          pointer-events: none;
          animation: navCtaPulse 3.2s ease-out infinite;
        }
        .navbar-cta-btn:hover::after {
          animation-play-state: paused;
          opacity: 0;
        }
        @keyframes navCtaPulse {
          0%   { transform: scale(1);    opacity: 0.55; }
          70%  { transform: scale(1.14); opacity: 0; }
          100% { transform: scale(1.14); opacity: 0; }
        }

        /* WhatsApp icon hover */
        .navbar-whatsapp-btn:hover {
          background-color: rgba(37,211,102,0.22) !important;
          border-color: #25d366 !important;
          transform: translateY(-1px);
        }

        /* Language switcher — consistent bordered-circle treatment + hover glow,
           regardless of whatever LangSwitcher renders internally */
        .lang-switcher-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border-radius: 50%;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .lang-switcher-wrap:hover {
          box-shadow: 0 0 0 4px rgba(45,95,196,0.12);
          transform: translateY(-1px);
        }

        /* Hamburger button — circular, matches lang switcher; icon morphs ☰ → ✕ */
        .navbar-hamburger-btn {
          transition: box-shadow 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
        }
        .navbar-hamburger-btn:hover {
          box-shadow: 0 0 0 4px rgba(45,95,196,0.12);
          transform: translateY(-1px);
          background-color: rgba(45,95,196,0.14) !important;
        }
        .navbar-hamburger-icon {
          position: relative;
          width: 18px; height: 14px;
          display: inline-block;
        }
        .hb-bar {
          position: absolute;
          left: 0; width: 18px; height: 2px;
          background-color: #2d5fc4;
          border-radius: 2px;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease, top 0.3s ease;
        }
        .hb-bar-1 { top: 0; }
        .hb-bar-2 { top: 6px; }
        .hb-bar-3 { top: 12px; }
        .hb-bar-1.is-open { top: 6px; transform: rotate(45deg); }
        .hb-bar-2.is-open { opacity: 0; }
        .hb-bar-3.is-open { top: 6px; transform: rotate(-45deg); }

        /* Mobile menu panel — smoother slide/fade than Bootstrap's default plain height collapse.
           Scoped to mobile only — Bootstrap shows this content via display:flex on desktop
           without ever adding a .show class, so this must not apply above the lg breakpoint. */
        @media (max-width: 991.98px) {
          .navbar-collapse {
            transition: height 0.35s ease, opacity 0.3s ease !important;
          }
          .navbar-collapse:not(.show) {
            opacity: 0;
          }
          .navbar-collapse.show,
          .navbar-collapse.collapsing {
            opacity: 1;
          }
        }

        /* Stagger each mobile nav link's entrance when the menu opens */
        @media (max-width: 991.98px) {
          .navbar-collapse.show .nav-link,
          .navbar-collapse.show .d-lg-none .nav-link {
            animation: navLinkIn 0.35s ease both;
          }
          .navbar-collapse.show .nav-link:nth-child(1) { animation-delay: 0.03s; }
          .navbar-collapse.show .nav-link:nth-child(2) { animation-delay: 0.07s; }
          .navbar-collapse.show .nav-link:nth-child(3) { animation-delay: 0.11s; }
          .navbar-collapse.show .nav-link:nth-child(4) { animation-delay: 0.15s; }
        }
        @keyframes navLinkIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}

export default Navbar