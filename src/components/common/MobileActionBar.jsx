import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Sticky Call / WhatsApp / Enquire bar for phones.
const MobileActionBar = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  if (pathname.startsWith('/admin')) return null

  const item = { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', padding: '9px 4px', color: '#ffffff', textDecoration: 'none', fontSize: '0.72rem', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }

  return (
    <div className="mobile-action-bar" role="navigation" aria-label="Quick contact">
      <a href="tel:+97142999088" style={item}><span style={{ fontSize: '1.15rem' }}>📞</span>{t('mobileBar.call')}</a>
      <a href={`https://wa.me/971561119233?text=${encodeURIComponent(t('whatsapp.message'))}`} target="_blank" rel="noopener noreferrer" style={{ ...item, color: '#4be08a' }}><span style={{ fontSize: '1.15rem' }}>💬</span>{t('mobileBar.whatsapp')}</a>
      <button type="button" onClick={() => window.dispatchEvent(new Event('openLeadPopup'))} style={{ ...item, color: '#e0bf6a' }}><span style={{ fontSize: '1.15rem' }}>✉️</span>{t('mobileBar.enquire')}</button>
      <style>{`
        .mobile-action-bar {
          display: none;
          position: fixed; left: 0; right: 0; bottom: 0; z-index: 9990;
          background: rgba(10,22,48,0.96);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          border-top: 1px solid rgba(201,162,75,0.4);
          padding-bottom: env(safe-area-inset-bottom);
        }
        @media (max-width: 767.98px) { .mobile-action-bar { display: flex; } }
      `}</style>
    </div>
  )
}

export default MobileActionBar
