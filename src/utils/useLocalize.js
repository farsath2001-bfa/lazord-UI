import { useTranslation } from 'react-i18next'
import { useCurrency } from '../hooks/useCurrency'

// Shared helpers for translating values that come from the database
// (types, categories, tags) and for formatting prices in English / Arabic.
export const useLocalize = () => {
  const { t, i18n } = useTranslation()
  const { code, rate } = useCurrency()
  const isAr = i18n.language === 'ar'

  // Translate a DB value like "Apartment" or "Off Plan"; falls back to the raw value.
  const tv = (v) => (v ? t(`values.${v}`, { defaultValue: v }) : v)

  // Keep Western digits (common in UAE real estate) in both languages.
  const num = (n) => Number(n).toLocaleString('en-US')

  const formatPrice = (price, type, { long = false } = {}) => {
    if (!price) return t('common.priceOnRequest')
    const converted = code !== 'AED'
    const label = converted ? code : t('common.aed')
    const value = converted ? price * rate : price
    let body
    if (type !== 'Rent' && value >= 1000000) {
      const m = (value / 1000000).toFixed(2)
      body = isAr ? `${m} ${t('common.million')} ${label}` : `${label} ${m}${t('common.million')}`
    } else {
      const n = converted ? Math.round(value) : value
      body = isAr ? `${num(n)} ${label}` : `${label} ${num(n)}`
    }
    if (converted) body = `≈ ${body}`
    if (type !== 'Rent') return body
    return `${body} ${long ? t('common.perYearLong') : t('common.perYear')}`
  }

  return { t, i18n, isAr, tv, num, formatPrice }
}
