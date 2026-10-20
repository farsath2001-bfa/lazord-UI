import { Link, useSearchParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import YieldCalculator from '../components/tools/YieldCalculator'
import PaymentPlan from '../components/tools/PaymentPlan'
import MortgageCalculator from '../components/common/MortgageCalculator'

const TABS = ['yield', 'plan', 'mortgage']

const InvestmentTools = () => {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()
  const raw = params.get('tool')
  const tool = TABS.includes(raw) ? raw : 'yield'
  const labels = { yield: t('tools.tabYield'), plan: t('tools.tabPlan'), mortgage: t('tools.tabMortgage') }

  return (
    <>
      <SEO title={t('tools.seoTitle')} description={t('tools.seoDesc')} path="/investment-tools" />
      <div style={{ backgroundColor: '#060f26', minHeight: '80vh', paddingBottom: '80px' }}>
        <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '32px 0 24px' }}>
          <Container>
            <div style={{ display: 'inline-flex', backgroundColor: 'rgba(201,162,75,0.12)', border: '1px solid rgba(201,162,75,0.4)', borderRadius: '30px', padding: '5px 14px', marginBottom: '10px' }}>
              <span style={{ color: '#e0bf6a', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{t('tools.badge')}</span>
            </div>
            <h1 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: '4px' }}>{t('tools.title')}</h1>
            <p style={{ color: '#8aafd4', fontSize: '0.9rem', margin: 0 }}>{t('tools.subtitle')}</p>
          </Container>
        </div>
        <Container style={{ paddingTop: '28px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {TABS.map(k => (
              <button
                key={k} type="button" onClick={() => setParams({ tool: k }, { replace: true })}
                style={{
                  background: tool === k ? '#2d5fc4' : 'rgba(45,95,196,0.12)',
                  border: `1px solid ${tool === k ? '#4a90d9' : 'rgba(45,95,196,0.3)'}`,
                  color: '#fff', borderRadius: '10px', padding: '9px 20px', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer',
                }}
              >
                {labels[k]}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: 'clamp(18px, 4vw, 32px)' }}>
            {tool === 'yield' && <YieldCalculator />}
            {tool === 'plan' && <PaymentPlan />}
            {tool === 'mortgage' && <MortgageCalculator />}
          </div>
          <p style={{ color: '#6f8db3', fontSize: '0.78rem', marginTop: '14px' }}>{t('tools.disclaimer')}</p>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/contact" style={{ backgroundColor: '#2d5fc4', color: '#fff', padding: '13px 32px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.92rem' }}>
              {t('tools.cta')}
            </Link>
          </div>
        </Container>
      </div>
    </>
  )
}

export default InvestmentTools
