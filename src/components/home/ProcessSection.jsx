import { useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const ParticleCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', resize)

    // Create particles
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -(Math.random() * 0.5 + 0.2),
      opacity: Math.random() * 0.6 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }))

    // Create stars
    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2,
      opacity: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Draw stars (twinkling)
      stars.forEach(s => {
        s.pulse += s.speed
        const alpha = s.opacity * (0.5 + 0.5 * Math.sin(s.pulse))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180,210,255,${alpha})`
        ctx.fill()
      })

      // Draw floating particles
      particles.forEach(p => {
        p.pulse += 0.02
        p.x += p.speedX
        p.y += p.speedY

        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W }
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10

        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3)
        gradient.addColorStop(0, `rgba(74,144,217,${alpha})`)
        gradient.addColorStop(1, `rgba(74,144,217,0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 80) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(45,95,196,${0.15 * (1 - dist / 80)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  )
}

const ProcessSection = () => {
  const { t } = useTranslation()

  const steps = [
    { number: '01', icon: '🤝', color: '#2d5fc4', glow: 'rgba(45,95,196,0.4)',  titleKey: 'process.steps.consultation.title', descKey: 'process.steps.consultation.desc' },
    { number: '02', icon: '🔍', color: '#27ae60', glow: 'rgba(39,174,96,0.4)',  titleKey: 'process.steps.search.title',       descKey: 'process.steps.search.desc' },
    { number: '03', icon: '🏠', color: '#e67e22', glow: 'rgba(230,126,34,0.4)', titleKey: 'process.steps.viewing.title',      descKey: 'process.steps.viewing.desc' },
    { number: '04', icon: '🔑', color: '#8e44ad', glow: 'rgba(142,68,173,0.4)', titleKey: 'process.steps.close.title',        descKey: 'process.steps.close.desc' },
  ]

  const guarantees = [
    t('process.guarantee.items.rera'),
    t('process.guarantee.items.valuation'),
    t('process.guarantee.items.fees'),
    t('process.guarantee.items.docs'),
    t('process.guarantee.items.team'),
    t('process.guarantee.items.support'),
  ]

  return (
    <section style={{
      position: 'relative',
      padding: '80px 0',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, #040d1e 0%, #071535 40%, #0a1f4a 70%, #040d1e 100%)'
    }}>

      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* Radial glow overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 30%, rgba(74,144,217,0.1) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(45,95,196,0.08) 0%, transparent 50%)', zIndex: 0, pointerEvents: 'none' }} />

      {/* Top + bottom fade */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to bottom, #060f26, transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, #060f26, transparent)', zIndex: 1, pointerEvents: 'none' }} />

      <Container style={{ position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.4)', borderRadius: '30px', padding: '5px 16px', marginBottom: '20px', backdropFilter: 'blur(10px)' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4a90d9', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('process.badge')}</span>
          </div>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', marginBottom: '6px', textShadow: '0 0 40px rgba(74,144,217,0.3)' }}>{t('process.title1')}</h2>
          <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '16px', textShadow: '0 0 40px rgba(74,144,217,0.4)' }}>{t('process.title2')}</h2>
          <p style={{ color: '#8aafd4', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7' }}>{t('process.subtitle')}</p>
        </motion.div>

        {/* Steps */}
        <div style={{ position: 'relative', marginBottom: '80px' }}>

          {/* Connecting line desktop */}
          <div className="d-none d-lg-block" style={{
            position: 'absolute', top: '47px', left: '12.5%', right: '12.5%',
            height: '2px',
            background: 'linear-gradient(to right, #2d5fc4, #27ae60, #e67e22, #8e44ad)',
            opacity: 0.4, zIndex: 0
          }} />

          {/* Animated dots on line */}
          <div className="d-none d-lg-block" style={{
            position: 'absolute', top: '43px', left: '12.5%',
            width: '10px', height: '10px', borderRadius: '50%',
            backgroundColor: '#4a90d9',
            boxShadow: '0 0 10px #4a90d9',
            animation: 'slideAlong 4s linear infinite',
            zIndex: 1
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
            position: 'relative', zIndex: 1
          }}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ textAlign: 'center' }}
              >
                {/* Icon circle */}
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    animate={{ boxShadow: [`0 0 20px ${step.glow}`, `0 0 50px ${step.glow}`, `0 0 20px ${step.glow}`] }}
                    transition={{ boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 } }}
                    style={{
                      width: '96px', height: '96px', borderRadius: '50%',
                      backgroundColor: 'rgba(13,31,78,0.8)',
                      backdropFilter: 'blur(10px)',
                      border: `2px solid ${step.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '2.2rem', margin: '0 auto', cursor: 'default'
                    }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Step number badge */}
                  <div style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    width: '28px', height: '28px', borderRadius: '50%',
                    backgroundColor: step.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#ffffff', fontSize: '0.7rem', fontWeight: '800',
                    boxShadow: `0 0 12px ${step.glow}`
                  }}>
                    {step.number}
                  </div>

                  {/* Pulse ring */}
                  <div style={{
                    position: 'absolute', inset: '-8px', borderRadius: '50%',
                    border: `1px solid ${step.color}`,
                    opacity: 0.3,
                    animation: `pulseRing 2.5s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`
                  }} />
                </div>

                {/* Mobile arrow */}
                {i < steps.length - 1 && (
                  <div className="d-lg-none" style={{ color: '#4a4a6a', fontSize: '1.5rem', marginBottom: '8px' }}>↓</div>
                )}

                <h3 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: '700', marginBottom: '10px', textShadow: '0 0 20px rgba(74,144,217,0.2)' }}>
                  {t(step.titleKey)}
                </h3>
                <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.7', margin: '0 auto', maxWidth: '220px' }}>
                  {t(step.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Service Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: 'rgba(13,31,78,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(74,144,217,0.3)',
            borderRadius: '20px',
            padding: 'clamp(28px, 4vw, 48px)',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 0 60px rgba(45,95,196,0.1)'
          }}
        >
          {/* Corner glow */}
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.05, filter: 'blur(60px)' }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '48px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '240px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
                <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('process.guarantee.badge')}</span>
              </div>
              <h3 style={{ color: '#ffffff', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: '300', marginBottom: '6px' }}>{t('process.guarantee.title1')}</h3>
              <h3 style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: '800', marginBottom: '16px' }}>{t('process.guarantee.title2')}</h3>
              <p style={{ color: '#8aafd4', fontSize: '0.92rem', lineHeight: '1.8', marginBottom: '24px' }}>{t('process.guarantee.desc')}</p>
              <motion.div whileHover={{ scale: 1.03 }}>
                <Link to="/contact"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#2d5fc4', color: '#fff', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem', boxShadow: '0 6px 20px rgba(45,95,196,0.3)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}>
                  {t('process.guarantee.cta')} →
                </Link>
              </motion.div>
            </div>

            <div style={{ flex: '1', minWidth: '240px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {guarantees.map((g, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={{ x: 4, borderColor: 'rgba(74,144,217,0.5)' }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      backgroundColor: 'rgba(45,95,196,0.08)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(74,144,217,0.2)',
                      borderRadius: '10px', padding: '12px 16px'
                    }}
                  >
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(39,174,96,0.2)', border: '1px solid rgba(39,174,96,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', color: '#27ae60', fontWeight: '800' }}>✓</div>
                    <span style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: '600' }}>{g}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </Container>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
        @keyframes pulseRing { 0%,100%{transform:scale(1);opacity:0.3} 50%{transform:scale(1.15);opacity:0.1} }
        @keyframes slideAlong {
          0%{left:12.5%;opacity:0}
          5%{opacity:1}
          95%{opacity:1}
          100%{left:87.5%;opacity:0}
        }
      `}</style>
    </section>
  )
}

export default ProcessSection