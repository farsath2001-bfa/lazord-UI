import { useRef } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLocalize } from '../../utils/useLocalize'

const IMAGE = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1800&q=80'

const ParallaxBanner = () => {
  const { t } = useLocalize()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={ref} style={{ position: 'relative', overflow: 'hidden', minHeight: 'clamp(340px, 48vw, 460px)', display: 'flex', alignItems: 'center' }}>
      <motion.div
        aria-hidden="true"
        style={{ position: 'absolute', top: '-14%', bottom: '-14%', left: 0, right: 0, backgroundImage: `url(${IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center', y, willChange: 'transform' }}
      />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,15,38,0.85) 0%, rgba(6,15,38,0.6) 50%, rgba(6,15,38,0.88) 100%)' }} />
      <Container style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '60px 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ color: '#e0bf6a', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '14px' }}>✦ {t('banner.eyebrow')}</div>
          <h2 className="font-display" style={{ color: '#ffffff', fontSize: 'clamp(1.9rem, 4.6vw, 3.4rem)', fontWeight: 600, lineHeight: 1.2, marginBottom: '14px' }}>{t('banner.quote')}</h2>
          <p style={{ color: '#c0d4f0', fontSize: '1.02rem', maxWidth: '520px', margin: '0 auto 28px', lineHeight: 1.7 }}>{t('banner.sub')}</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('openLeadPopup'))}
              className="banner-btn-primary"
              style={{ border: 'none', cursor: 'pointer', backgroundColor: '#2d5fc4', color: '#fff', padding: '13px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '0.92rem' }}
            >
              📅 {t('nav.bookValuation')}
            </button>
            <Link to="/properties" style={{ color: '#ffffff', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.4)', padding: '12px 28px', borderRadius: '10px', fontWeight: 600, fontSize: '0.92rem' }}>
              {t('about.cta.browse')}
            </Link>
          </div>
        </motion.div>
      </Container>
      <style>{`
        .banner-btn-primary { transition: background-color 0.2s ease, color 0.2s ease; }
        .banner-btn-primary:hover { background-color: #c9a24b !important; color: #0a1630 !important; }
      `}</style>
    </section>
  )
}

export default ParallaxBanner
