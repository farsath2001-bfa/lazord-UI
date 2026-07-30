import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const CTABanner = () => {
  const { t } = useTranslation()

  const badges = [
    { icon: '🏅', key: 'rera' },
    { icon: '🔒', key: 'secure' },
    { icon: '🌍', key: 'nationalities' },
    { icon: '⭐', key: 'rating' },
  ]

  const buttons = [
    {
      href: 'https://wa.me/971561119233',
      external: true,
      bg: '#25d366', hoverBg: '#1ebe5d',
      label: '💬 ' + t('cta.whatsapp'),
      shadow: 'rgba(37,211,102,0.3)'
    },
    {
      popup: true,
      bg: '#2d5fc4', hoverBg: '#1a3a7c',
      label: '📅 ' + t('cta.book'),
      shadow: 'rgba(45,95,196,0.3)'
    },
    {
      href: 'tel:+97142999088',
      external: true,
      bg: 'transparent', hoverBg: 'rgba(74,144,217,0.1)',
      border: '1.5px solid rgba(255,255,255,0.25)',
      hoverBorder: '#4a90d9',
      label: '📞 ' + t('cta.call'),
      shadow: 'none'
    },
  ]

  return (
    <section style={{ backgroundColor: '#0a1630', padding: '40px 0', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '300px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.04, filter: 'blur(100px)', pointerEvents: 'none' }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 50%, #0d1f4e 100%)',
            border: '1px solid rgba(74,144,217,0.3)',
            borderRadius: '24px',
            padding: 'clamp(36px, 5vw, 70px) clamp(24px, 5vw, 60px)',
            position: 'relative', overflow: 'hidden'
          }}
        >
          {/* Grid pattern */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(45,95,196,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(45,95,196,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

          {/* Glow blobs */}
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.1, filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', backgroundColor: '#4a90d9', opacity: 0.08, filter: 'blur(60px)' }} />

          {/* Floating particles */}
          {[
            { left: '15%', top: '20%', delay: '0s',   size: '4px' },
            { left: '75%', top: '15%', delay: '1s',   size: '3px' },
            { left: '85%', top: '60%', delay: '0.5s', size: '4px' },
            { left: '25%', top: '75%', delay: '1.5s', size: '3px' },
            { left: '60%', top: '80%', delay: '0.8s', size: '4px' },
          ].map((p, i) => (
            <div key={i} style={{
              position: 'absolute', left: p.left, top: p.top,
              width: p.size, height: p.size,
              borderRadius: '50%', backgroundColor: '#4a90d9', opacity: 0.4,
              animation: 'ctaParticle 4s ease-in-out infinite',
              animationDelay: p.delay, pointerEvents: 'none'
            }} />
          ))}

          <Row className="align-items-center g-4" style={{ position: 'relative', zIndex: 1 }}>

            {/* Left — Text */}
            <Col lg={7}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.4)', borderRadius: '30px', padding: '5px 14px', marginBottom: '20px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4a90d9', animation: 'pulse 2s infinite' }} />
                  <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('cta.badge')}</span>
                </div>
                <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', marginBottom: '6px', lineHeight: 1.2 }}>
                  {t('cta.title1')}
                </h2>
                <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '20px', lineHeight: 1.2 }}>
                  {t('cta.title2')}
                </h2>
                <p style={{ color: '#8aafd4', fontSize: '1rem', lineHeight: '1.7', maxWidth: '480px', margin: 0 }}>
                  {t('cta.subtitle')}
                </p>
              </motion.div>
            </Col>

            {/* Right — Buttons */}
            <Col lg={5}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                {buttons.map((btn, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* ✅ Popup button */}
                    {btn.popup ? (
                      <button
                        onClick={() => window.dispatchEvent(new Event('openLeadPopup'))}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                          backgroundColor: btn.bg, color: '#fff',
                          padding: '15px 28px', borderRadius: '12px',
                          fontSize: '0.95rem', fontWeight: '700',
                          border: 'none', cursor: 'pointer', width: '100%',
                          boxShadow: `0 8px 24px ${btn.shadow}`,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = btn.hoverBg; e.currentTarget.style.transform = 'translateY(-2px)' }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = btn.bg; e.currentTarget.style.transform = 'translateY(0)' }}
                      >
                        {btn.label}
                      </button>

                    ) : btn.external ? (
                      /* ✅ External link */
                      
                       <a href={btn.href}
                        target={btn.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                          backgroundColor: btn.bg, color: '#fff',
                          padding: '15px 28px', borderRadius: '12px',
                          fontSize: '0.95rem', fontWeight: '700',
                          textDecoration: 'none',
                          border: btn.border || 'none',
                          boxShadow: btn.shadow !== 'none' ? `0 8px 24px ${btn.shadow}` : 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor = btn.hoverBg
                          if (btn.hoverBorder) { e.currentTarget.style.borderColor = btn.hoverBorder; e.currentTarget.style.color = '#4a90d9' }
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = btn.bg
                          if (btn.border) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff' }
                        }}
                      >
                        {btn.label}
                      </a>

                    ) : (
                      /* ✅ Internal link */
                      <Link
                        to={btn.to}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                          backgroundColor: btn.bg, color: '#fff',
                          padding: '15px 28px', borderRadius: '12px',
                          fontSize: '0.95rem', fontWeight: '700',
                          textDecoration: 'none',
                          boxShadow: `0 8px 24px ${btn.shadow}`,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = btn.hoverBg}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = btn.bg}
                      >
                        {btn.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </Col>
          </Row>

          {/* Badges strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginTop: '36px', paddingTop: '28px', borderTop: '1px solid rgba(45,95,196,0.2)', position: 'relative', zIndex: 1 }}
          >
            {badges.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.08 }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span style={{ fontSize: '1.1rem' }}>{badge.icon}</span>
                <span style={{ color: '#8aafd4', fontSize: '0.82rem', fontWeight: '500' }}>
                  {t(`cta.badges.${badge.key}`)}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </Container>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
        @keyframes ctaParticle { 0%,100%{transform:translateY(0);opacity:0.4} 50%{transform:translateY(-12px);opacity:0.8} }
      `}</style>
    </section>
  )
}

export default CTABanner