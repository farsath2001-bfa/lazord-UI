import { createContext } from 'react'
import { FALLBACK_RATES, FALLBACK_DATE } from '../utils/currency'

export const CurrencyContext = createContext({
  code: 'AED',
  rate: 1,
  rates: FALLBACK_RATES,
  rateDate: FALLBACK_DATE,
  setCode: () => {},
})
