import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const CookieConsent = () => {
  const [visible, setVisible] = useState(true)
  const { t } = useTranslation()

  if (!visible) return null

  return (
    <div className="cookie-consent" role="dialog" aria-label={t('cookie.label')} aria-live="polite">
      <div className="cookie-consent-inner">
        <p className="cookie-consent-text">
          {t('cookie.text')}{' '}
          <Link to="/legal" className="cookie-consent-link">{t('cookie.link')}</Link>.
        </p>
        <div className="cookie-consent-actions">
          <button type="button" onClick={() => setVisible(false)} className="cookie-btn cookie-btn-decline">
            {t('cookie.decline')}
          </button>
          <button type="button" onClick={() => setVisible(false)} className="cookie-btn cookie-btn-accept">
            {t('cookie.accept')}
          </button>
        </div>
      </div>

      <style>{`
        .cookie-consent {
          position: fixed;
          left: 0; right: 0; bottom: 0;
          z-index: 1200;
          background: #0a1630;
          border-top: 1px solid rgba(74,144,217,0.25);
          box-shadow: 0 -8px 30px rgba(0,0,0,0.4);
          padding: 22px 40px;
          animation: cookieSlideUp 0.4s ease-out;
        }
        @keyframes cookieSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        [dir="rtl"] .cookie-consent-actions { margin-right: 0 !important; }
        @media (min-width: 768px) { [dir="rtl"] .cookie-consent-text { padding-right: 90px; } }
        .cookie-consent-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .cookie-consent-text {
          flex: 1;
          min-width: 280px;
          margin: 0;
          color: #c9dcf5;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .cookie-consent-link {
          color: #4a90d9;
          font-weight: 600;
          text-decoration: underline;
        }
        .cookie-consent-actions {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }
        .cookie-btn {
          padding: 12px 28px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          white-space: nowrap;
          transition: opacity 0.2s ease, transform 0.15s ease;
        }
        .cookie-btn:hover { transform: translateY(-1px); }
        .cookie-btn-decline {
          background: transparent;
          color: #ffffff;
          border: 1.5px solid rgba(255,255,255,0.35);
        }
        .cookie-btn-decline:hover { border-color: rgba(255,255,255,0.6); }
        .cookie-btn-accept {
          background: #2d5fc4;
          color: #ffffff;
          box-shadow: 0 6px 18px rgba(45,95,196,0.35);
        }
        .cookie-btn-accept:hover { background: #1a3a7c; }

        /* Desktop: shift the button group left so it clears the floating
           WhatsApp button sitting fixed at bottom-right (~30px + ~60px diameter). */
        @media (min-width: 768px) {
          .cookie-consent-actions {
            margin-right: 90px;
          }
        }

        @media (max-width: 767.98px) {
          .cookie-consent { padding: 12px 14px; }
          .cookie-consent-text { font-size: 0.8rem !important; line-height: 1.5 !important; }
          .cookie-consent-inner { flex-direction: column; align-items: flex-start; gap: 10px; }
          .cookie-consent-actions { width: 100%; margin-right: 0; }
          .cookie-btn { flex: 1; text-align: center; padding: 9px 14px; font-size: 0.85rem; }
        }
      `}</style>
    </div>
  )
}

export default CookieConsent