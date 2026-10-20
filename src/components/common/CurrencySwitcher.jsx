import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useCurrency } from '../../hooks/useCurrency'
import { CURRENCIES } from '../../utils/currency'

// Small currency picker. Prices stay stored in AED; this only changes how they're shown.
const CurrencySwitcher = ({ isMobile = false }) => {
  const { t } = useTranslation()
  const { code, setCode, rateDate } = useCurrency()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const current = CURRENCIES.find(c => c.code === code) || CURRENCIES[0]

  return (
    <div ref={ref} style={{ position: 'relative' }} dir="ltr">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('currency.label')}
        title={t('currency.note', { date: rateDate })}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', background: isMobile ? 'rgba(45,95,196,0.08)' : 'transparent', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '10px', padding: isMobile ? '10px 14px' : '7px 10px', color: '#1a1a2e', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-start' }}
      >
        <span>{current.flag} {current.code}</span>
        <span style={{ fontSize: '0.6rem', color: '#2d5fc4' }}>▾</span>
      </button>
      {open && (
        <div role="listbox" style={{ position: isMobile ? 'static' : 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: '230px', marginTop: isMobile ? '6px' : 0, backgroundColor: '#ffffff', border: '1px solid rgba(45,95,196,0.2)', borderRadius: '12px', boxShadow: isMobile ? 'none' : '0 12px 32px rgba(0,0,0,0.18)', padding: '6px', zIndex: 1100 }}>
          {CURRENCIES.map(c => (
            <button
              key={c.code}
              type="button"
              role="option"
              aria-selected={c.code === code}
              onClick={() => { setCode(c.code); setOpen(false) }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', border: 'none', borderRadius: '8px', background: c.code === code ? 'rgba(45,95,196,0.1)' : 'transparent', color: '#1a1a2e', fontSize: '0.84rem', fontWeight: c.code === code ? 700 : 500, cursor: 'pointer', textAlign: 'left' }}
            >
              <span>{c.flag}</span>
              <span style={{ fontWeight: 700 }}>{c.code}</span>
              <span style={{ color: '#666', fontSize: '0.78rem' }}>{t(`currency.names.${c.code}`)}</span>
            </button>
          ))}
          <div style={{ color: '#888', fontSize: '0.7rem', padding: '8px 12px 4px', borderTop: '1px solid rgba(0,0,0,0.08)', marginTop: '4px' }}>
            {t('currency.note', { date: rateDate })}
          </div>
        </div>
      )}
    </div>
  )
}

export default CurrencySwitcher
