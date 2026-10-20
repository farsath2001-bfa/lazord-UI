import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLocalize } from '../../utils/useLocalize'
import MortgageCalculator from '../common/MortgageCalculator'

const MortgageTeaser = () => {
  const { t } = useLocalize()
  const points = ['mortgage.teaser1', 'mortgage.teaser2', 'mortgage.teaser3']
  return (
    <section style={{ backgroundColor: '#0a1630', padding: '70px 0' }}>
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={5}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(201,162,75,0.12)', border: '1px solid rgba(201,162,75,0.4)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
                <span style={{ color: '#e9d6a3', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{t('mortgage.badge')}</span>
              </div>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.7rem, 3.2vw, 2.5rem)', fontWeight: 700, marginBottom: '12px' }}>{t('mortgage.title')}</h2>
              <p style={{ color: '#8aafd4', fontSize: '1rem', lineHeight: 1.7, marginBottom: '20px' }}>{t('mortgage.subtitle')}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {points.map(k => (
                  <li key={k} style={{ display: 'flex', gap: '10px', color: '#c0d4f0', fontSize: '0.92rem' }}>
                    <span style={{ color: '#c9a24b', fontWeight: 800 }}>✓</span>{t(k)}
                  </li>
                ))}
              </ul>
              <Link to="/mortgage-calculator" className="mortgage-teaser-btn" style={{ display: 'inline-block', textDecoration: 'none', border: '1.5px solid #c9a24b', color: '#e0bf6a', padding: '12px 26px', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem' }}>
                {t('mortgage.teaserFull')}
              </Link>
            </motion.div>
          </Col>
          <Col lg={7}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(201,162,75,0.25)', borderRadius: '18px', padding: 'clamp(20px, 3vw, 30px)', boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}
            >
              <MortgageCalculator compact />
            </motion.div>
          </Col>
        </Row>
      </Container>
      <style>{`
        .mortgage-teaser-btn { transition: background-color 0.2s ease, color 0.2s ease; }
        .mortgage-teaser-btn:hover { background-color: #c9a24b; color: #0a1630 !important; }
      `}</style>
    </section>
  )
}

export default MortgageTeaser
