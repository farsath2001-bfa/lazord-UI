import { useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  RiVipCrownLine,
  RiBarChart2Line,
  RiFileShield2Line,
  RiEarthLine,
  RiCustomerService2Line,
  RiSpeedLine,
  RiTrophyLine,
  RiBuilding2Line,
  RiGlobalLine,
  RiVerifiedBadgeLine
} from 'react-icons/ri'

const AnimatedNumber = ({ target, suffix = '', duration = 2 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const spring = useSpring(count, { duration: duration * 1000, bounce: 0 })
  const display = useTransform(spring, v => Math.round(v).toLocaleString() + suffix)

  useEffect(() => {
    if (inView) count.set(target)
  }, [inView, target, count])

  return <motion.span ref={ref}>{display}</motion.span>
}

const OrbBackground = () => (
  <>
    {[
      { w: 400, h: 400, top: '-100px',  left: '-100px', color: '#2d5fc4', opacity: 0.06, blur: 120, anim: 'orbFloat0' },
      { w: 300, h: 300, top: '40%',     right: '-80px', color: '#4a90d9', opacity: 0.05, blur: 100, anim: 'orbFloat1' },
      { w: 250, h: 250, bottom: '10%',  left: '30%',    color: '#1a3a7c', opacity: 0.08, blur: 80,  anim: 'orbFloat2' },
      { w: 200, h: 200, top: '20%',     left: '50%',    color: '#2d5fc4', opacity: 0.04, blur: 60,  anim: 'orbFloat3' },
    ].map((orb, i) => (
      <div key={i} style={{
        position: 'absolute',
        width: `${orb.w}px`, height: `${orb.h}px`,
        borderRadius: '50%',
        backgroundColor: orb.color,
        opacity: orb.opacity,
        filter: `blur(${orb.blur}px)`,
        top: orb.top, left: orb.left,
        right: orb.right, bottom: orb.bottom,
        pointerEvents: 'none',
        animation: `${orb.anim} ${6 + i * 2}s ease-in-out infinite`,
      }} />
    ))}
  </>
)

const WhyChooseUs = () => {
  const { t } = useTranslation()

  const reasons = [
  { Icon: RiVipCrownLine,        key: 'exclusive', color: '#f1c40f', bg: 'rgba(241,196,15,0.12)',  border: 'rgba(241,196,15,0.3)',  glow: 'rgba(241,196,15,0.15)'  },
  { Icon: RiBarChart2Line,       key: 'expertise', color: '#4a90d9', bg: 'rgba(74,144,217,0.12)', border: 'rgba(74,144,217,0.3)', glow: 'rgba(74,144,217,0.15)' },
  { Icon: RiFileShield2Line,     key: 'trusted',   color: '#27ae60', bg: 'rgba(39,174,96,0.12)',  border: 'rgba(39,174,96,0.3)',  glow: 'rgba(39,174,96,0.15)'  },
  { Icon: RiEarthLine,           key: 'global',    color: '#2d5fc4', bg: 'rgba(45,95,196,0.12)',  border: 'rgba(45,95,196,0.3)',  glow: 'rgba(45,95,196,0.15)'  },
 ]

 const stats = [
  { target: 18,   suffix: '+', label: 'Years in Dubai Market', Icon: RiTrophyLine,        color: '#f1c40f' },
  { target: 1500, suffix: '+', label: 'Properties Listed',     Icon: RiBuilding2Line,     color: '#4a90d9' },
  { target: 40,   suffix: '+', label: 'Nationalities Served',  Icon: RiGlobalLine,        color: '#27ae60' },
  { target: 100,  suffix: '%', label: 'RERA Compliant',        Icon: RiVerifiedBadgeLine, color: '#e67e22' },
]

  return (
    <section style={{
      position: 'relative',
      padding: '80px 0',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #060f26 0%, #0a1535 50%, #060f26 100%)'
    }}>
      <OrbBackground />

      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(45,95,196,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,95,196,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none', zIndex: 0
      }} />

      {/* Top + bottom fade */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to bottom, #060f26, transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to top, #060f26, transparent)', zIndex: 1, pointerEvents: 'none' }} />

      <Container style={{ position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 16px', marginBottom: '18px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4a90d9', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('why.badge')}</span>
          </div>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', marginBottom: '6px' }}>{t('why.title1')}</h2>
          <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '16px' }}>{t('why.title2')}</h2>
          <p style={{ color: '#8aafd4', fontSize: '1rem', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>{t('why.subtitle')}</p>
        </motion.div>

        {/* Reason Cards */}
        <Row className="g-4" style={{ marginBottom: '56px' }}>
          {reasons.map((r, i) => (
            <Col key={i} lg={3} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                style={{
                  position: 'relative', overflow: 'hidden',
                  backgroundColor: 'rgba(13,31,78,0.7)',
                  backdropFilter: 'blur(12px)',
                  border: `1px solid ${r.border}`,
                  borderRadius: '18px',
                  padding: '28px 24px',
                  height: '100%', cursor: 'default',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 20px 50px ${r.glow}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                {/* Corner glow */}
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: r.color, opacity: 0.07, filter: 'blur(30px)' }} />

                {/* Icon box */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 5 }}
                  style={{
                    width: '58px', height: '58px',
                    borderRadius: '14px',
                    backgroundColor: r.bg,
                    border: `1px solid ${r.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '18px',
                    boxShadow: `0 0 20px ${r.bg}`
                  }}
                >
                  <r.Icon size={28} color={r.color} />
                </motion.div>

                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '10px' }}>
                  {t(`why.reasons.${r.key}.title`)}
                </h3>
                <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.75', margin: 0 }}>
                  {t(`why.reasons.${r.key}.desc`)}
                </p>

                {/* Bottom accent line */}
                <div style={{ position: 'absolute', bottom: 0, left: '24px', right: '24px', height: '2px', background: `linear-gradient(to right, ${r.color}, transparent)`, opacity: 0.5, borderRadius: '1px' }} />
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: 'rgba(13,31,78,0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(74,144,217,0.25)',
            borderRadius: '20px',
            padding: 'clamp(24px, 4vw, 44px)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(45,95,196,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,95,196,0.04) 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.06, filter: 'blur(60px)' }} />

          <Row className="g-4 align-items-center" style={{ position: 'relative', zIndex: 1 }}>
            <Col lg={5}>
              <h3 style={{ color: '#ffffff', fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', fontWeight: '700', marginBottom: '10px', lineHeight: '1.3' }}>
                Trusted by investors from{' '}
                <span style={{ color: '#4a90d9' }}>40+ countries</span>
              </h3>
              <p style={{ color: '#8aafd4', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '24px' }}>
                From first-time buyers to seasoned investors, Lazord Real Estate has helped thousands find their perfect Dubai property since 2007.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Link to="/contact"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#2d5fc4', color: '#fff', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem', boxShadow: '0 6px 20px rgba(45,95,196,0.3)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}>
                    Start Your Journey →
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Link to="/properties"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'transparent', color: '#8aafd4', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', border: '1px solid rgba(74,144,217,0.3)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.color = '#4a90d9' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(74,144,217,0.3)'; e.currentTarget.style.color = '#8aafd4' }}>
                    View Properties
                  </Link>
                </motion.div>
              </div>
            </Col>

            <Col lg={7}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    whileHover={{ scale: 1.04 }}
                    style={{
                      backgroundColor: 'rgba(45,95,196,0.1)',
                      border: '1px solid rgba(74,144,217,0.2)',
                      borderRadius: '14px', padding: '20px',
                      textAlign: 'center',
                      position: 'relative', overflow: 'hidden'
                    }}
                  >
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: s.color, opacity: 0.08, filter: 'blur(20px)' }} />

                    {/* Icon */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: `${s.color}20`, border: `1px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <s.Icon size={20} color={s.color} />
                      </div>
                    </div>

                    <div style={{ color: s.color, fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: '800', lineHeight: '1', marginBottom: '6px' }}>
                      <AnimatedNumber target={s.target} suffix={s.suffix} />
                    </div>
                    <div style={{ color: '#8aafd4', fontSize: '0.78rem', lineHeight: '1.4' }}>{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </Col>
          </Row>
        </motion.div>

      </Container>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
        @keyframes orbFloat0 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-20px)} }
        @keyframes orbFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-15px,25px)} }
        @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(25px,-15px)} }
        @keyframes orbFloat3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,20px)} }
      `}</style>
    </section>
  )
}

export default WhyChooseUs