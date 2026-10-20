import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCompare } from '../../hooks/useCompare'

// Floating pill shown while properties are selected for comparison.
const CompareBar = () => {
  const { count, clear } = useCompare()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  if (!count || pathname.startsWith('/admin') || pathname === '/compare') return null

  return (
    <div style={{ position: 'fixed', bottom: 'var(--fab-bottom, 24px)', left: '50%', transform: 'translateX(-50%)', zIndex: 9990, display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#0d1f4e', border: '1px solid #c9a24b', borderRadius: '40px', padding: '8px 10px 8px 18px', boxShadow: '0 10px 34px rgba(0,0,0,0.5)', whiteSpace: 'nowrap' }}>
      <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.85rem' }}>{t('compare.bar', { n: count })}</span>
      <Link to="/compare" style={{ backgroundColor: '#c9a24b', color: '#0a1630', textDecoration: 'none', borderRadius: '30px', padding: '7px 16px', fontWeight: 800, fontSize: '0.8rem' }}>{t('compare.viewBtn')}</Link>
      <button type="button" onClick={clear} style={{ background: 'none', border: 'none', color: '#8aafd4', fontSize: '0.78rem', cursor: 'pointer', padding: '4px 6px' }}>{t('compare.clear')}</button>
    </div>
  )
}

export default CompareBar
