import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import SEO from '../components/SEO'
import MortgageCalculator from '../components/common/MortgageCalculator'
import { useTranslation } from 'react-i18next'

const MortgageCalculatorPage = () => {
  const { t } = useTranslation()
  return (
  <>
    <SEO
      title={t('mortgage.seoTitle')}
      description={t('mortgage.seoDesc')}
      path="/mortgage-calculator"
    />
    <div style={{ backgroundColor: '#060f26', minHeight: '80vh', paddingBottom: '80px' }}>
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '32px 0 24px' }}>
        <Container>
          <div style={{ display: 'inline-flex', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '10px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{t('mortgage.badge')}</span>
          </div>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: '4px' }}>{t('mortgage.title')}</h1>
          <p style={{ color: '#8aafd4', fontSize: '0.9rem', margin: 0 }}>{t('mortgage.subtitle')}</p>
        </Container>
      </div>

      <Container style={{ paddingTop: '32px' }}>
        <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: 'clamp(18px, 4vw, 32px)' }}>
          <MortgageCalculator />
        </div>
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <Link to="/contact" style={{ backgroundColor: '#2d5fc4', color: '#fff', padding: '13px 32px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.92rem' }}>
            {t('mortgage.cta')}
          </Link>
        </div>
      </Container>
    </div>
  </>
  )
}

export default MortgageCalculatorPage
