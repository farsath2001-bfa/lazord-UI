// Standalone mobile language switcher component
// Place this file at src/components/common/LangSwitcher.jsx

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LangSwitcher = ({ isMobile = false }) => {
  const [open, setOpen] = useState(false)
  const { i18n } = useTranslation()
  const currentLang = i18n.language === 'ar' ? 'AR' : 'EN'

  const switchLanguage = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('i18nextLng', code)
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = code
    setOpen(false)
  }

  const langs = [
    { code: 'en', label: 'English',  flag: '🇬🇧', display: 'EN' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪', display: 'AR' },
  ]

  return (
    <div style={{ position: 'relative', zIndex: 9999 }} dir="ltr">
      {/* Globe button */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '38px', height: '38px',
          borderRadius: '50%',
          border: '1.5px solid #4a90d9',
          backgroundColor: 'rgba(45,95,196,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: '1.3rem',
          padding: 0, outline: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}>
        🌐
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Backdrop to close */}
          <div
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
          />
          <div dir="ltr" style={{
            position: 'absolute',
            top: '46px',
            right: '0',
            backgroundColor: '#0d1f4e',
            border: '1px solid #2d5fc4',
            borderRadius: '10px',
            overflow: 'hidden',
            zIndex: 9999,
            minWidth: '160px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          }}>
            {langs.map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => switchLanguage(lang.code)}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '14px 16px',
                  cursor: 'pointer',
                  color: currentLang === lang.display ? '#4a90d9' : '#ffffff',
                  backgroundColor: currentLang === lang.display ? 'rgba(45,95,196,0.25)' : 'transparent',
                  fontSize: '0.92rem',
                  border: 'none',
                  borderBottom: '1px solid rgba(45,95,196,0.2)',
                  textAlign: 'left',
                  outline: 'none',
                  WebkitTapHighlightColor: 'transparent',
                }}>
                <span style={{ fontSize: '1.3rem' }}>{lang.flag}</span>
                <span style={{ flex: 1 }}>{lang.label}</span>
                {currentLang === lang.display && (
                  <span style={{ color: '#4a90d9', fontWeight: '800' }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default LangSwitcher