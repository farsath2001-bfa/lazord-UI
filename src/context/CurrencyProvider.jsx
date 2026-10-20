import { useState, useEffect, useMemo } from 'react'
import { CurrencyContext } from './CurrencyContext'
import { CURRENCIES, FALLBACK_RATES, FALLBACK_DATE, RATES_URL, RATES_TTL } from '../utils/currency'

const CODE_KEY = 'lazord_currency'
const RATES_KEY = 'lazord_rates'

const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

const readCode = () => {
  try {
    const v = localStorage.getItem(CODE_KEY)
    return CURRENCIES.some(c => c.code === v) ? v : 'AED'
  } catch { return 'AED' }
}

const readRates = () => {
  try {
    const v = JSON.parse(localStorage.getItem(RATES_KEY))
    if (v && v.rates && v.date) return v
  } catch { /* ignore */ }
  return null
}

// Picks the display currency (remembered between visits) and keeps approximate rates fresh.
export const CurrencyProvider = ({ children }) => {
  const [code, setCodeState] = useState(readCode)
  const [snap, setSnap] = useState(() => readRates() || { rates: FALLBACK_RATES, date: FALLBACK_DATE, ts: 0 })

  useEffect(() => {
    if (Date.now() - (snap.ts || 0) < RATES_TTL) return undefined
    let cancelled = false
    fetch(RATES_URL)
      .then(r => r.json())
      .then(j => {
        if (cancelled || j.result !== 'success') return
        const rates = { AED: 1 }
        CURRENCIES.forEach(c => { if (j.rates?.[c.code]) rates[c.code] = j.rates[c.code] })
        const next = { rates, date: fmtDate(j.time_last_update_utc), ts: Date.now() }
        setSnap(next)
        try { localStorage.setItem(RATES_KEY, JSON.stringify(next)) } catch { /* storage blocked */ }
      })
      .catch(() => { /* keep fallback rates */ })
    return () => { cancelled = true }
    // run once on load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setCode = (c) => {
    setCodeState(c)
    try { localStorage.setItem(CODE_KEY, c) } catch { /* storage blocked */ }
  }

  const value = useMemo(
    () => ({ code, setCode, rates: snap.rates, rate: snap.rates[code] || 1, rateDate: snap.date }),
    [code, snap]
  )
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}
