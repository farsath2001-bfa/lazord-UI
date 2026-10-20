// Display currencies. Rates are approximate and fetched live (with a saved fallback).
export const CURRENCIES = [
  { code: 'AED', flag: '🇦🇪' },
  { code: 'USD', flag: '🇺🇸' },
  { code: 'EUR', flag: '🇪🇺' },
  { code: 'GBP', flag: '🇬🇧' },
  { code: 'INR', flag: '🇮🇳' },
  { code: 'SAR', flag: '🇸🇦' },
]

// 1 AED in each currency (snapshot, 20 Oct 2026) — used until live rates load.
export const FALLBACK_RATES = { AED: 1, USD: 0.2723, EUR: 0.2427, GBP: 0.2045, INR: 25.88, SAR: 1.0211 }
export const FALLBACK_DATE = '20 Oct 2026'
export const RATES_URL = 'https://open.er-api.com/v6/latest/AED'
export const RATES_TTL = 12 * 60 * 60 * 1000
