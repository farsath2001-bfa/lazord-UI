import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const WhyChooseUs = () => {
  const { t } = useTranslation()

  const reasons = [
    { icon: '🏆', key: 'exclusive', color: '#2d5fc4' },
    { icon: '📊', key: 'expertise', color: '#27ae60' },
    { icon: '✅', key: 'trusted',   color: '#e67e22' },
    { icon: '🌍', key: 'global',    color: '#8e44ad' },
    { icon: '🤝', key: 'support',   color: '#4a90d9' },
    { icon: '⚡', key: 'fast',      color: '#f1c40f' },
  ]

  const stats = [
    { number: '18+',    label: 'Years in Dubai Market' },
    { number: '1,500+', label: 'Properties Listed' },
    { number: '40+',    label: 'Nationalities Served' },
    { number: '100%',   label: 'RERA Compliant' },
  ]

  return (
    <section style={{ backgroundColor: '#060f26', padding: '40px 0', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.04, filter: 'blur(120px)', pointerEvents: 'none' }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '50px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('why.badge')}</span>
          </div>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', marginBottom: '6px' }}>{t('why.title1')}</h2>
          <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '16px' }}>{t('why.title2')}</h2>
          <p style={{ color: '#8aafd4', fontSize: '1rem', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>{t('why.subtitle')}</p>
        </motion.div>

        {/* Reasons Grid */}
        <Row className="g-4" style={{ marginBottom: '20px' }}>
          {reasons.map((r, i) => (
            <Col key={i} lg={4} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: `0 16px 40px ${r.color}15` }}
                style={{ backgroundColor: '#0d1f4e', border: `1px solid ${r.color}25`, borderRadius: '16px', padding: '28px 24px', height: '100%', cursor: 'default' }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{ width: '52px', height: '52px', borderRadius: '14px', backgroundColor: `${r.color}20`, border: `1px solid ${r.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '18px' }}
                >
                  {r.icon}
                </motion.div>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '10px' }}>
                  {t(`why.reasons.${r.key}.title`)}
                </h3>
                <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: '1.75', margin: 0 }}>
                  {t(`why.reasons.${r.key}.desc`)}
                </p>
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
          style={{ background: 'linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 100%)', border: '1px solid rgba(74,144,217,0.25)', borderRadius: '16px', padding: '32px 40px', position: 'relative', overflow: 'hidden' }}
        >
          {/* Grid pattern */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(45,95,196,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(45,95,196,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

          <Row className="g-4 align-items-center" style={{ position: 'relative', zIndex: 1 }}>
            <Col lg={6}>
              <h3 style={{ color: '#ffffff', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: '700', marginBottom: '8px' }}>
                Trusted by investors from <span style={{ color: '#4a90d9' }}>40+ countries</span>
              </h3>
              <p style={{ color: '#8aafd4', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '20px' }}>
                From first-time buyers to seasoned investors, Lazord Real Estate has helped thousands find their perfect Dubai property since 2007.
              </p>
              <motion.div whileHover={{ scale: 1.03 }}>
                <Link to="/contact"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#2d5fc4', color: '#fff', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}>
                  Start Your Journey →
                </Link>
              </motion.div>
            </Col>
            <Col lg={6}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    style={{ backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.2)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}
                  >
                    <div style={{ color: '#4a90d9', fontSize: '1.8rem', fontWeight: '800', lineHeight: '1' }}>{s.number}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.75rem', marginTop: '6px', lineHeight: '1.4' }}>{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </Col>
          </Row>
        </motion.div>

      </Container>
    </section>
  )
}

export default WhyChooseUs