import { useState, useMemo, useId } from 'react'
import { useLocalize } from '../../utils/useLocalize'

// Standard amortisation: M = P·r(1+r)^n / ((1+r)^n − 1)
const monthlyPayment = (loan, annualRate, years) => {
  const n = years * 12
  const r = annualRate / 100 / 12
  if (loan <= 0 || n <= 0) return 0
  if (r === 0) return loan / n
  const f = Math.pow(1 + r, n)
  return (loan * r * f) / (f - 1)
}

const MortgageCalculator = ({ initialPrice = 1500000, compact = false }) => {
  const uid = useId()
  const { t, isAr } = useLocalize()
  const fmt = (n) => {
    const v = Math.round(n).toLocaleString('en-US')
    return isAr ? `${v} ${t('common.aed')}` : `${t('common.aed')} ${v}`
  }
  const [price, setPrice] = useState(initialPrice)
  const [downPct, setDownPct] = useState(20)
  const [rate, setRate] = useState(4.5)
  const [years, setYears] = useState(25)

  const result = useMemo(() => {
    const safePrice = Math.max(0, Number(price) || 0)
    const down = (safePrice * downPct) / 100
    const loan = safePrice - down
    const monthly = monthlyPayment(loan, Number(rate) || 0, years)
    const total = monthly * years * 12
    // Typical UAE purchase costs (estimates): DLD 4%, agency 2%, mortgage registration 0.25% of loan
    const dld = safePrice * 0.04
    const agency = safePrice * 0.02
    const registration = loan * 0.0025
    return { down, loan, monthly, interest: total - loan, total, upfront: down + dld + agency + registration, dld, agency, registration }
  }, [price, downPct, rate, years])

  const principalShare = result.total > 0 ? Math.round((result.loan / result.total) * 100) : 100

  const label = { color: '#8aafd4', fontSize: '0.74rem', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }
  const input = { width: '100%', backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '10px', color: '#ffffff', padding: '11px 14px', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }

  return (
    <div className="mortgage-calc" style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

      {/* Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label htmlFor={`${uid}-price`} style={label}><span>{t('mortgage.price')}</span><span style={{ color: '#4a90d9', fontWeight: 700 }}>{fmt(price || 0)}</span></label>
          <input id={`${uid}-price`} name="price" type="number" inputMode="numeric" min="0" step="10000"
            value={price} onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))} style={input} />
        </div>

        <div>
          <label htmlFor={`${uid}-down`} style={label}><span>{t('mortgage.down')}</span><span style={{ color: '#4a90d9', fontWeight: 700 }}>{downPct}% · {fmt(result.down)}</span></label>
          <input id={`${uid}-down`} name="downPayment" type="range" min="20" max="80" step="1"
            value={downPct} onChange={e => setDownPct(Number(e.target.value))} className="mortgage-range" />
          <div style={{ color: '#6f8fb8', fontSize: '0.72rem', marginTop: '4px' }}>{t('mortgage.downHint')}</div>
        </div>

        <div>
          <label htmlFor={`${uid}-rate`} style={label}><span>{t('mortgage.rate')}</span><span style={{ color: '#4a90d9', fontWeight: 700 }}>{Number(rate).toFixed(2)}%</span></label>
          <input id={`${uid}-rate`} name="rate" type="range" min="2" max="9" step="0.05"
            value={rate} onChange={e => setRate(Number(e.target.value))} className="mortgage-range" />
        </div>

        <div>
          <label htmlFor={`${uid}-years`} style={label}><span>{t('mortgage.term')}</span><span style={{ color: '#4a90d9', fontWeight: 700 }}>{t('mortgage.years', { n: years })}</span></label>
          <input id={`${uid}-years`} name="years" type="range" min="5" max="25" step="1"
            value={years} onChange={e => setYears(Number(e.target.value))} className="mortgage-range" />
        </div>
      </div>

      {/* Results */}
      <div style={{ backgroundColor: 'rgba(45,95,196,0.1)', border: '1px solid rgba(74,144,217,0.25)', borderRadius: '16px', padding: '22px' }} aria-live="polite">
        <div style={{ color: '#8aafd4', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('mortgage.monthly')}</div>
        <div style={{ color: '#ffffff', fontSize: 'clamp(1.7rem, 4vw, 2.2rem)', fontWeight: 800, margin: '4px 0 16px' }}>{fmt(result.monthly)}</div>

        {/* Principal vs interest bar */}
        <div style={{ display: 'flex', height: '10px', borderRadius: '6px', overflow: 'hidden', marginBottom: '8px' }}>
          <div style={{ width: `${principalShare}%`, backgroundColor: '#2d5fc4' }} />
          <div style={{ flex: 1, backgroundColor: '#e67e22' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#8aafd4', marginBottom: '18px' }}>
          <span><span style={{ color: '#4a90d9' }}>●</span> {t('mortgage.loan')} {fmt(result.loan)}</span>
          <span><span style={{ color: '#e67e22' }}>●</span> {t('mortgage.interest')} {fmt(result.interest)}</span>
        </div>

        {[
          [t('mortgage.down'), result.down],
          [t('mortgage.dld'), result.dld],
          [t('mortgage.agency'), result.agency],
          [t('mortgage.registration'), result.registration],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', padding: '7px 0', borderTop: '1px solid rgba(45,95,196,0.2)' }}>
            <span style={{ color: '#8aafd4' }}>{k}</span><span style={{ color: '#ffffff', fontWeight: 600 }}>{fmt(v)}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0', borderTop: '1px solid rgba(74,144,217,0.4)', marginTop: '4px' }}>
          <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem' }}>{t('mortgage.upfront')}</span>
          <span style={{ color: '#4a90d9', fontWeight: 800 }}>{fmt(result.upfront)}</span>
        </div>
      </div>

      <p style={{ gridColumn: '1 / -1', color: '#6f8fb8', fontSize: '0.74rem', lineHeight: 1.6, margin: 0 }}>
        {t('mortgage.disclaimer')}
      </p>

      <style>{`
        .mortgage-calc input[type="number"]:focus { border-color: #4a90d9 !important; }
        .mortgage-range { width: 100%; accent-color: #4a90d9; cursor: pointer; }
        @media (max-width: 575.98px) { .mortgage-range { height: 28px; } }
      `}</style>
    </div>
  )
}

export default MortgageCalculator
