import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Services from '../components/home/Services'
import Testimonials from '../components/home/Testimonials'
import SEO from '../components/SEO'
import StoryVideo from '../components/common/StoryVideo'
import { useLocalize } from '../utils/useLocalize'

const IMAGE_HERO  = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=80'
const IMAGE_WHY   = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80'

const team = [
  { id: 'nimer',    exp: 15, avatar: 'M', color: '#2d5fc4',   langs: ['ar', 'en'] },
  { id: 'khairy',   exp: 14, avatar: 'K', color: '#27ae60',   langs: ['en', 'ar'] },
  { id: 'fethi',    exp: 10, avatar: 'F', color: '#0bee31cc', langs: ['en', 'ar'] },
  { id: 'abdullah', exp: 14, avatar: 'A', color: '#8e44ad',   langs: ['ar', 'en'] },
  { id: 'ahmed',    exp: 5,  avatar: 'A', color: '#8e44ad',   langs: ['ar', 'en'] },
  { id: 'jardali',  exp: 11, avatar: 'J', color: '#c0e90c',   langs: ['en', 'pt', 'ar'] },
  { id: 'obada',    exp: 4,  avatar: 'O', color: '#c0392b',   langs: ['ar', 'en'] },
  { id: 'fadi',     exp: 4,  avatar: 'F', color: '#c02b82',   langs: ['ar', 'en'] },
]

const milestones = [
  { year: '2007', key: 'founded',   icon: '🏗️' },
  { year: '2010', key: 'expansion', icon: '📈' },
  { year: '2015', key: 'partners',  icon: '🤝' },
  { year: '2019', key: 'rera',      icon: '📋' },
  { year: '2024', key: 'digital',   icon: '💻' },
  { year: '2026', key: 'today',     icon: '🚀' },
]

// Section dots for desktop scroll-spy navigation
const sectionDotItems = [
  { id: 'section-hero',         key: 'hero' },
  { id: 'section-story',        key: 'story' },
  { id: 'section-journey',      key: 'journey' },
  { id: 'section-services',     key: 'services' },
  { id: 'section-whychoose',    key: 'why' },
  { id: 'section-testimonials', key: 'testimonials' },
  { id: 'section-team',         key: 'team' },
]

const SectionDots = () => {
  const { t } = useLocalize()
  const [active, setActive] = useState('section-hero')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id)
      })
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 })

    sectionDotItems.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="d-none d-lg-flex section-dots">
      {sectionDotItems.map(item => (
        <button key={item.id} onClick={() => scrollTo(item.id)} className="section-dot-btn" aria-label={t('about.dots.' + item.key)} type="button">
          <span className={`section-dot ${active === item.id ? 'active' : ''}`} />
          <span className="section-dot-label">{t('about.dots.' + item.key)}</span>
        </button>
      ))}
    </div>
  )
}

// Animated count-up number, triggers once when scrolled into view
const AnimatedStatNumber = ({ target, suffix = '', duration = 1.6 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const spring = useSpring(count, { duration: duration * 1000, bounce: 0 })
  const display = useTransform(spring, v => Math.round(v).toLocaleString('en-US') + suffix)

  useEffect(() => {
    if (inView) count.set(target)
  }, [inView, target, count])

  return <motion.span ref={ref}>{display}</motion.span>
}

// Reusable fade-up animation wrapper
const FadeUp = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const FadeLeft = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

const FadeRight = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

const badgeStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '8px',
  backgroundColor: 'rgba(45,95,196,0.15)',
  border: '1px solid rgba(74,144,217,0.3)',
  borderRadius: '30px', padding: '5px 14px', marginBottom: '14px'
}
const badgeTextStyle = {
  color: '#4a90d9', fontSize: '0.78rem',
  letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600'
}
const sectionGap = { marginBottom: '80px' }
const cardStyle = {
  backgroundColor: '#0d1f4e',
  border: '1px solid rgba(45,95,196,0.25)',
  borderRadius: '14px', padding: '28px 22px',
  height: '100%', transition: 'all 0.25s ease'
}

const About = () => {
  const { t, isAr } = useLocalize()
  const mt = (m, f) => t(`about.team.${m.id}.${f}`)
  const expText = (m) => t(m.exp <= 10 ? 'about.exp.few' : 'about.exp.many', { n: m.exp })
  const langText = (m) => m.langs.map(l => t('about.lang.' + l)).join(isAr ? '، ' : ', ')
  return (
    <>
      <SEO
        title={t('about.seoTitle')}
        description={t('about.seoDesc')}
        path="/about"
      />
      <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Desktop scroll-spy dots */}
      <SectionDots />

      {/* ── HERO with Dubai BG Image ── */}
      <div id="section-hero" style={{ position: 'relative', minHeight: '520px', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: '1px solid rgba(45,95,196,0.3)' }}>

        {/* BG Image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${IMAGE_HERO})`,
          backgroundSize: 'cover', backgroundPosition: 'center top',
          filter: 'brightness(0.25)'
        }} />

        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(45,95,196,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(45,95,196,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        {/* Gradient fade bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to bottom, transparent, #060f26)' }} />

        {/* Floating particles */}
        {[
          { left: '70%', bottom: '30%', delay: '0s' },
          { left: '80%', bottom: '50%', delay: '1.2s' },
          { left: '65%', bottom: '20%', delay: '0.6s' },
          { left: '85%', bottom: '40%', delay: '1.8s' },
        ].map((p, i) => (
          <div key={i} style={{
            position: 'absolute', left: p.left, bottom: p.bottom,
            width: '4px', height: '4px', borderRadius: '50%',
            backgroundColor: '#4a90d9', opacity: 0.6,
            animation: `particleFloat 4s ease-out infinite`,
            animationDelay: p.delay
          }} />
        ))}

        {/* Orbit ring */}
        <div style={{
          position: 'absolute', width: '500px', height: '500px',
          border: '1px solid rgba(45,95,196,0.1)', borderRadius: '50%',
          right: '-100px', top: '50%', transform: 'translateY(-50%)',
          animation: 'spinSlow 25s linear infinite'
        }}>
          <div style={{ position: 'absolute', width: '8px', height: '8px', background: '#2d5fc4', borderRadius: '50%', top: '-4px', left: '50%', transform: 'translateX(-50%)' }} />
        </div>
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          border: '1px solid rgba(45,95,196,0.07)', borderRadius: '50%',
          right: '50px', top: '50%', transform: 'translateY(-50%)',
          animation: 'spinSlow 15s linear infinite reverse'
        }} />

        <Container style={{ position: 'relative', zIndex: 2, padding: '80px 20px' }}>
          <Row className="align-items-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <div style={badgeStyle}><span style={badgeTextStyle}>✦ {t('about.badge')}</span></div>
                <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: '300', marginBottom: '6px', lineHeight: 1.2 }}>
                  {t('about.title1')}
                </h1>
                <h1 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: '800', marginBottom: '20px', lineHeight: 1.2 }}>
                  {t('about.title2')}
                </h1>
                <p style={{ color: '#8aafd4', fontSize: '1rem', lineHeight: '1.8', maxWidth: '580px', marginBottom: '28px' }}>
                  {t('about.heroDesc')}
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[t('about.hb1'), t('about.hb2'), t('about.hb3'), t('about.hb4')].map((badge, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      style={{
                        backgroundColor: 'rgba(45,95,196,0.2)',
                        border: '1px solid rgba(74,144,217,0.3)',
                        borderRadius: '20px', padding: '6px 14px',
                        color: '#c0d4f0', fontSize: '0.8rem', fontWeight: '600'
                      }}
                    >{badge}</motion.span>
                  ))}
                </div>
              </motion.div>
            </Col>
            <Col lg={4} className="d-none d-lg-flex justify-content-end align-items-center">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                {[['18+', t('about.side.years'), '🏆'], ['1,500+', t('about.side.properties'), '🏠'], ['40+', t('about.side.nationalities'), '🌍']].map(([num, label, icon], i) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.05, borderColor: '#4a90d9' }}
                    style={{
                      backgroundColor: 'rgba(45,95,196,0.15)',
                      border: '1px solid rgba(74,144,217,0.25)',
                      borderRadius: '12px', padding: '16px 24px',
                      textAlign: 'center', minWidth: '150px'
                    }}
                  >
                    <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{icon}</div>
                    <div style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: '800' }}>{num}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.75rem', marginTop: '2px' }}>{label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </Col>
          </Row>
        </Container>

        {/* Floating "Meet the Team" quick-jump */}
        <motion.button
          type="button"
          onClick={() => document.getElementById('section-team')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.6 },
            y: { delay: 1.6, duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
          }}
          whileHover={{ scale: 1.05 }}
          className="hero-team-jump"
          style={{
            position: 'absolute', bottom: '24px', right: '24px', zIndex: 3,
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(45,95,196,0.25)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(74,144,217,0.4)', borderRadius: '30px',
            padding: '10px 18px', color: '#ffffff', fontSize: '0.82rem', fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          👥 {t('about.meetTeam')} ↓
        </motion.button>
      </div>

      {/* Mission & Vision — folded into a compact strip right under the hero */}
      <div style={{ backgroundColor: '#0a1630', borderBottom: '1px solid rgba(45,95,196,0.15)', padding: '28px 0' }}>
        <Container>
          <Row className="g-3">
            {[
              { icon: '🎯', title: t('about.mission.title'),     color: '#4a90d9', desc: t('about.mission.desc') },
              { icon: '💎', title: t('about.values.title'), color: '#f1c40f', desc: t('about.values.desc') },
              { icon: '🔭', title: t('about.vision.title'),      color: '#4a90d9', desc: t('about.vision.desc') },
            ].map((item, i) => (
              <Col key={i} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', backgroundColor: 'rgba(45,95,196,0.06)', border: '1px solid rgba(45,95,196,0.2)', borderRadius: '12px', padding: '14px 16px', height: '100%' }}
                >
                  <div style={{ fontSize: '1.3rem', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ color: item.color, fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ color: '#a3c0e8', fontSize: '0.8rem', lineHeight: '1.5' }}>{item.desc}</div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <Container style={{ paddingTop: '64px' }}>

        {/* Mobile Stats — animated count-up + shimmer sweep */}
        <div className="d-lg-none" style={sectionGap}>
          <Row className="g-3">
            {[
              { number: 18,   suffix: '+', label: t('about.stats.years'),   icon: '🏆', color: '#f1c40f' },
              { number: 1500, suffix: '+', label: t('about.stats.properties'),     icon: '🏙️', color: '#4a90d9' },
              { number: 1200, suffix: '+', label: t('about.stats.clients'),         icon: '👥', color: '#27ae60' },
              { text: 'RERA',              label: t('about.stats.rera'), icon: '📋', color: '#8e44ad' },
              { number: 40,   suffix: '+', label: t('about.stats.nationalities'),  icon: '🌍', color: '#e67e22' },
              { number: 2007, suffix: '',  label: t('about.stats.established'),           icon: '🏗️', color: '#16a085' },
            ].map((stat, i) => (
              <Col key={i} xs={6} sm={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ y: -4, borderColor: stat.color }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    backgroundColor: '#0d1f4e',
                    border: '1px solid rgba(45,95,196,0.25)',
                    borderRadius: '14px', padding: '18px 14px',
                    textAlign: 'center', height: '100%',
                    position: 'relative', overflow: 'hidden'
                  }}
                >
                  {/* Corner glow */}
                  <div style={{ position: 'absolute', top: '-24px', right: '-24px', width: '70px', height: '70px', borderRadius: '50%', backgroundColor: stat.color, opacity: 0.1, filter: 'blur(22px)' }} />

                  {/* Shimmer sweep — plays once on first appearance */}
                  <span className="stat-shimmer" style={{ animationDelay: `${0.5 + i * 0.15}s` }} />

                  {/* Icon badge */}
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    backgroundColor: `${stat.color}20`, border: `1px solid ${stat.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem', margin: '0 auto 10px', position: 'relative', zIndex: 1
                  }}>
                    {stat.icon}
                  </div>

                  <div style={{ color: '#ffffff', fontSize: '1.35rem', fontWeight: '800', position: 'relative', zIndex: 1 }}>
                    {stat.text ? stat.text : <AnimatedStatNumber target={stat.number} suffix={stat.suffix} />}
                  </div>
                  <div style={{ color: '#a3c0e8', fontSize: '0.72rem', marginTop: '4px', lineHeight: '1.3', position: 'relative', zIndex: 1 }}>{stat.label}</div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Our Story */}
        <Row id="section-story" className="align-items-center g-5" style={sectionGap}>
          <Col lg={6}>
            <FadeLeft>
              <div style={badgeStyle}><span style={badgeTextStyle}>✦ {t('about.story.badge')}</span></div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '300', marginBottom: '6px' }}>{t('about.story.h1')}</h2>
              <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '800', marginBottom: '20px' }}>{t('about.story.h2')}</h2>
              <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.9', marginBottom: '14px' }}>
                {t('about.story.p1')}
              </p>
              <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.9', marginBottom: '14px' }}>
                {t('about.story.p2')}
              </p>
              <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.9', marginBottom: '24px' }}>
                {t('about.story.p3')}
              </p>
              <Link to="/contact"
                style={{ display: 'inline-block', backgroundColor: '#2d5fc4', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}>
                {t('about.story.cta')}
              </Link>
            </FadeLeft>
          </Col>
          <Col lg={6}>
            <FadeRight>
              <StoryVideo alt={t('about.story.alt')}>
                <div style={{ position: 'absolute', top: '16px', insetInlineEnd: '16px', backgroundColor: 'rgba(6,15,38,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '12px', padding: '10px 14px' }}>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.85rem' }}>{t('about.story.place')}</div>
                  <div style={{ color: '#4a90d9', fontSize: '0.74rem', marginTop: '2px' }}>{t('about.story.serving')}</div>
                </div>
              </StoryVideo>
            </FadeRight>
          </Col>
        </Row>

        {/* Meet Lazord video */}
        <div id="section-meet" style={sectionGap}>
          <FadeLeft>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={badgeStyle}><span style={badgeTextStyle}>✦ {t('about.meet.badge')}</span></div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: '300', marginBottom: '8px' }}>{t('about.meet.title')}</h2>
              <p style={{ color: '#8aafd4', fontSize: '0.95rem', maxWidth: '560px', margin: '0 auto' }}>{t('about.meet.sub')}</p>
            </div>
            <div style={{ maxWidth: '860px', margin: '0 auto' }}>
              <StoryVideo video="/lazord-meet.mp4" poster="/lazord-meet-poster.jpg" alt={t('about.meet.title')} label={t('about.meet.watch')} />
            </div>
          </FadeLeft>
        </div>

        {/* ── TIMELINE — Alternating Cards on desktop, slider on mobile ── */}
        <div id="section-journey" style={sectionGap}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={badgeStyle}><span style={badgeTextStyle}>✦ {t('about.journey.badge')}</span></div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '4px' }}>{t('about.journey.h1')}</h2>
              <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800' }}>{t('about.journey.h2')}</h2>
              {/* Mobile swipe hint */}
              <div className="d-md-none" style={{ color: '#4a90d9', fontSize: '0.78rem', fontWeight: '600', marginTop: '10px', opacity: 0.8 }}>
                {t('common.swipe')}
              </div>
            </div>
          </FadeUp>

          {/* Desktop alternating cards — untouched */}
          <div className="d-none d-md-block" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>

            {/* Center vertical line */}
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: '2px', transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, rgba(45,95,196,0), #2d5fc4 20%, #2d5fc4 80%, rgba(45,95,196,0))'
            }} />

            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0
              const isLast = i === milestones.length - 1
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    marginBottom: '24px',
                    position: 'relative'
                  }}
                >
                  {/* Center dot */}
                  <div style={{
                    position: 'absolute', left: '50%', top: '28px',
                    transform: 'translate(-50%, -50%)',
                    width: isLast ? '16px' : '12px',
                    height: isLast ? '16px' : '12px',
                    borderRadius: '50%',
                    backgroundColor: isLast ? '#4a90d9' : '#2d5fc4',
                    border: `3px solid ${isLast ? '#ffffff' : '#0d1f4e'}`,
                    boxShadow: isLast ? '0 0 20px rgba(74,144,217,0.6)' : '0 0 10px rgba(45,95,196,0.3)',
                    zIndex: 2
                  }} />

                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    style={{
                      width: 'calc(50% - 32px)',
                      backgroundColor: isLast ? 'rgba(45,95,196,0.12)' : '#0d1f4e',
                      border: `1px solid ${isLast ? 'rgba(74,144,217,0.5)' : 'rgba(45,95,196,0.25)'}`,
                      borderRadius: '16px',
                      padding: '20px 24px',
                      boxShadow: isLast ? '0 8px 32px rgba(45,95,196,0.2)' : 'none',
                      cursor: 'default',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Shimmer on hover */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(105deg, transparent 40%, rgba(74,144,217,0.06) 50%, transparent 60%)',
                      opacity: 0, transition: 'opacity 0.3s'
                    }} />

                    {/* Year pill */}
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      backgroundColor: isLast ? '#2d5fc4' : 'rgba(45,95,196,0.2)',
                      border: `1px solid ${isLast ? '#4a90d9' : 'rgba(74,144,217,0.3)'}`,
                      borderRadius: '20px', padding: '3px 12px',
                      marginBottom: '10px'
                    }}>
                      <span style={{ fontSize: '0.85rem' }}>{m.icon}</span>
                      <span style={{ color: isLast ? '#ffffff' : '#4a90d9', fontWeight: '800', fontSize: '0.82rem' }}>{m.year}</span>
                    </div>

                    <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.95rem', marginBottom: '6px' }}>{t(`about.ms.${m.key}.title`)}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.82rem', lineHeight: '1.6' }}>{t(`about.ms.${m.key}.desc`)}</div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile — horizontal swipeable slider */}
          <div className="d-md-none">
            <div className="timeline-slider-track">
              {milestones.map((m, i) => {
                const isLast = i === milestones.length - 1
                return (
                  <div key={i} className="timeline-slide">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      style={{
                        backgroundColor: isLast ? 'rgba(45,95,196,0.12)' : '#0d1f4e',
                        border: `1px solid ${isLast ? 'rgba(74,144,217,0.5)' : 'rgba(45,95,196,0.25)'}`,
                        borderRadius: '16px',
                        padding: '20px',
                        height: '100%',
                        boxShadow: isLast ? '0 8px 32px rgba(45,95,196,0.2)' : 'none',
                      }}
                    >
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        backgroundColor: isLast ? '#2d5fc4' : 'rgba(45,95,196,0.2)',
                        border: `1px solid ${isLast ? '#4a90d9' : 'rgba(74,144,217,0.3)'}`,
                        borderRadius: '20px', padding: '3px 12px',
                        marginBottom: '10px'
                      }}>
                        <span style={{ fontSize: '0.85rem' }}>{m.icon}</span>
                        <span style={{ color: isLast ? '#ffffff' : '#4a90d9', fontWeight: '800', fontSize: '0.82rem' }}>{m.year}</span>
                      </div>
                      <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.92rem', marginBottom: '6px' }}>{t(`about.ms.${m.key}.title`)}</div>
                      <div style={{ color: '#8aafd4', fontSize: '0.8rem', lineHeight: '1.6' }}>{t(`about.ms.${m.key}.desc`)}</div>
                    </motion.div>
                  </div>
                )
              })}
            </div>
            <div className="timeline-slider-dots">
              {milestones.map((m, i) => (
                <span key={i} style={{ backgroundColor: i === milestones.length - 1 ? '#4a90d9' : '#2d5fc4' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Services (What We Offer) */}
        <div id="section-services" style={sectionGap}>
          <Services />
        </div>

        {/* Why Choose Us */}
        <Row id="section-whychoose" className="align-items-center g-5" style={sectionGap}>
          <Col lg={7}>
            <FadeLeft>
              <div style={badgeStyle}><span style={badgeTextStyle}>✦ {t('about.why.badge')}</span></div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '4px' }}>{t('about.why.h1')}</h2>
              <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800', marginBottom: '18px' }}>{t('about.why.h2')}</h2>
              <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '20px' }}>
                {t('about.why.desc')}
              </p>
              <Row className="g-3">
                {[
                  { icon: '📅', title: t('about.why.longevity.title'),  desc: t('about.why.longevity.desc') },
                  { icon: '✅', title: t('about.why.compliance.title'), desc: t('about.why.compliance.desc') },
                  { icon: '🤝', title: t('about.why.access.title'),     desc: t('about.why.access.desc') },
                  { icon: '💡', title: t('about.why.insight.title'),    desc: t('about.why.insight.desc') },
                ].map((v, i) => (
                  <Col key={i} md={6}>
                    <motion.div
                      whileHover={{ y: -3, borderColor: '#4a90d9' }}
                      style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}
                    >
                      <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>{v.icon}</div>
                      <div>
                        <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.88rem', marginBottom: '3px' }}>{v.title}</div>
                        <div style={{ color: '#8aafd4', fontSize: '0.8rem', lineHeight: '1.6' }}>{v.desc}</div>
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </FadeLeft>
          </Col>
          <Col lg={5}>
            <FadeRight>
              <div style={{ position: 'relative', height: 'clamp(260px, 40vw, 400px)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(45,95,196,0.25)' }}>
                <img src={IMAGE_WHY} alt={t('about.why.alt')} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,15,38,0.65) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1rem', marginBottom: '8px' }}>{t('about.why.trusted')}</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {[t('about.why.tag1'), t('about.why.tag2'), t('about.why.tag3')].map((tag, i) => (
                      <span key={i} style={{ backgroundColor: 'rgba(45,95,196,0.6)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '600' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeRight>
          </Col>
        </Row>

        {/* Testimonials (Our Clients Say) */}
        <div id="section-testimonials" style={sectionGap}>
          <Testimonials />
        </div>

        {/* ── TEAM — Glassmorphism grid on desktop, slider on mobile ── */}
        <FadeUp>
          <div id="section-team" style={sectionGap}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={badgeStyle}><span style={badgeTextStyle}>✦ {t('about.team.badge')}</span></div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '4px' }}>{t('about.team.h1')}</h2>
              <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800' }}>{t('about.team.h2')}</h2>
              <div className="d-md-none" style={{ color: '#4a90d9', fontSize: '0.78rem', fontWeight: '600', marginTop: '10px', opacity: 0.8 }}>
                {t('common.swipe')}
              </div>
            </div>
            <Row className="g-4 team-row">
              {team.map((member, i) => (
                <Col key={i} lg={4} md={6} className="team-col">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(45,95,196,0.25)' }}
                    className="team-member-card"
                    style={{
                      backgroundColor: 'rgba(13,31,78,0.7)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(45,95,196,0.3)',
                      borderRadius: '16px', padding: '28px 22px',
                      height: '100%', cursor: 'default',
                      position: 'relative', overflow: 'hidden'
                    }}
                  >
                    {/* Gradient glow bg */}
                    <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: member.color, opacity: 0.06, filter: 'blur(40px)' }} />

                    {/* Contact icons */}
                    <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '6px', zIndex: 2 }}>
                      <a href={`https://wa.me/971561119233?text=${encodeURIComponent(t('about.team.waMsg', { name: mt(member, 'name') }))}`}
                        target="_blank" rel="noopener noreferrer"
                        title={t('about.team.waTitle', { name: mt(member, 'name') })}
                        style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25d366', textDecoration: 'none', fontSize: '0.8rem' }}
                      >💬</a>
                      <a href="tel:+97142999088"
                        title={t('about.team.callTitle', { name: mt(member, 'name') })}
                        style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a90d9', textDecoration: 'none', fontSize: '0.8rem' }}
                      >📞</a>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                      {/* Avatar with ring */}
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '1.3rem' }}>
                          {member.avatar}
                        </div>
                        <div style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${member.color}`, opacity: 0.4, animation: 'pulseRing 3s ease-in-out infinite' }} />
                      </div>
                      <div>
                        <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          {mt(member, 'name')}
                          {/* Verified checkmark badge */}
                          <span title={t('about.team.verified')} style={{ display: 'inline-flex', width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#4a90d9', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </span>
                        </div>
                        <div style={{ color: member.color, fontSize: '0.8rem', marginTop: '2px', fontWeight: '600' }}>{mt(member, 'role')}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[{ icon: '🏆', text: expText(member) }, { icon: '🌍', text: langText(member) }, { icon: '🏠', text: mt(member, 'spec') }].map((item, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.08)', borderRadius: '8px', padding: '6px 10px' }}>
                          <span style={{ fontSize: '0.85rem' }}>{item.icon}</span>
                          <span style={{ color: '#8aafd4', fontSize: '0.8rem' }}>{item.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hover-reveal quote (always visible on mobile via CSS) */}
                    <div className="team-quote-overlay">
                      <div style={{ fontSize: '0.8rem', color: '#c9dcf5', fontStyle: 'italic', lineHeight: '1.5' }}>
                        "{mt(member, 'quote')}"
                      </div>
                    </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        </FadeUp>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 50%, #0d1f4e 100%)',
            border: '1px solid rgba(74,144,217,0.3)',
            borderRadius: '20px',
            padding: 'clamp(28px, 5vw, 52px) clamp(20px, 4vw, 48px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(45,95,196,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(45,95,196,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', marginBottom: '6px' }}>{t('about.cta.h1')}</h2>
            <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800', marginBottom: '14px' }}>{t('about.cta.h2')}</h2>
            <p style={{ color: '#8aafd4', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 10px' }}>{t('about.cta.desc')}</p>
            <p style={{ color: '#4a90d9', fontSize: '0.88rem', marginBottom: '28px' }}>📞 +971 42 999 088 &nbsp;|&nbsp; ✉️ info@lazordrealestate.ae</p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.04 }}>
                <Link to="/properties" style={{ backgroundColor: '#2d5fc4', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', display: 'block' }}>
                  {t('about.cta.browse')}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }}>
                <Link to="/contact" style={{ backgroundColor: 'transparent', color: '#ffffff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.92rem', border: '1.5px solid rgba(255,255,255,0.25)', display: 'block' }}>
                  {t('about.cta.contact')}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </Container>

      <style>{`
        @keyframes spinSlow { from{transform:translateY(-50%) rotate(0deg)} to{transform:translateY(-50%) rotate(360deg)} }
        @keyframes particleFloat { 0%{transform:translateY(0);opacity:0.6} 100%{transform:translateY(-80px);opacity:0} }
        @keyframes pulseRing { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.1)} }

        /* ── Stat card shimmer sweep (plays once) ── */
        .stat-shimmer {
          position: absolute; top: 0; left: 0; width: 45%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: translateX(-140%) skewX(-20deg);
          opacity: 0;
          animation: statShimmer 1.3s ease-out forwards;
          pointer-events: none;
          z-index: 1;
        }
        @keyframes statShimmer {
          0% { transform: translateX(-140%) skewX(-20deg); opacity: 0; }
          15% { opacity: 0.6; }
          100% { transform: translateX(260%) skewX(-20deg); opacity: 0; }
        }

        /* ── Timeline mobile slider ── */
        .timeline-slider-track {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 4px 4px 8px;
          margin: 0 -4px;
        }
        .timeline-slider-track::-webkit-scrollbar { display: none; }
        .timeline-slide { flex: 0 0 78%; scroll-snap-align: center; }
        .timeline-slider-dots { display: flex; justify-content: center; gap: 6px; margin-top: 14px; }
        .timeline-slider-dots span { width: 6px; height: 6px; border-radius: 50%; opacity: 0.35; }

        /* ── Team mobile slider (Bootstrap Row untouched at md+) ── */
        @media (max-width: 767.98px) {
          .team-row {
            flex-wrap: nowrap;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 8px;
          }
          .team-row::-webkit-scrollbar { display: none; }
          .team-row > .team-col { flex: 0 0 84%; max-width: 84%; scroll-snap-align: center; }
        }

        /* ── Team card hover-reveal quote (desktop) / always-visible (mobile) ── */
        .team-quote-overlay {
          position: absolute; left: 0; right: 0; bottom: 0;
          padding: 14px 22px 18px;
          background: linear-gradient(to top, rgba(6,15,38,0.95) 60%, transparent);
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
          z-index: 2;
        }
        .team-member-card:hover .team-quote-overlay {
          transform: translateY(0);
          opacity: 1;
        }
        @media (max-width: 767.98px) {
          .team-quote-overlay {
            position: static;
            transform: none;
            opacity: 1;
            background: none;
            padding: 14px 0 0;
            margin-top: 4px;
            border-top: 1px solid rgba(45,95,196,0.15);
          }
        }

        /* ── Desktop scroll-spy section dots ── */
        .section-dots {
          position: fixed; right: 22px; top: 50%; transform: translateY(-50%);
          z-index: 500; flex-direction: column; gap: 14px;
        }
        .section-dot-btn {
          display: flex; align-items: center; gap: 8px;
          background: none; border: none; cursor: pointer; padding: 0;
        }
        .section-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(74,144,217,0.3);
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .section-dot.active {
          background: #4a90d9; width: 10px; height: 10px;
          box-shadow: 0 0 10px rgba(74,144,217,0.6);
        }
        .section-dot-label {
          color: #a3c0e8; font-size: 0.72rem; font-weight: 600;
          opacity: 0; transform: translateX(6px);
          transition: all 0.2s ease; white-space: nowrap;
        }
        .section-dot-btn:hover .section-dot-label { opacity: 1; transform: translateX(0); }
        .section-dot-btn:hover .section-dot { background: #4a90d9; }
      `}</style>
      </div>
    </>
  )
}

export default About