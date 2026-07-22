import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslation from './locales/en/translation.json'
import arTranslation from './locales/ar/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    // ── Fix language detection ──
    detection: {
      // Look for saved language in localStorage first
      order: ['localStorage', 'navigator'],
      // Save selected language to localStorage
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    // Only use exact language codes
    load: 'languageOnly',
    supportedLngs: ['en', 'ar'],
    nonExplicitSupportedLngs: false,
  })

export default i18n