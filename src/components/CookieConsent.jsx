import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const MOUNT_DELAY_MS = 500

const CookieConsent = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), MOUNT_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="cookie-consent" role="dialog" aria-label="Cookie consent" aria-live="polite">
      <div className="cookie-consent-inner">
        <p className="cookie-consent-text">
          We use cookies to improve your browsing experience on our website. By continuing to use this site, you agree to our use of cookies as described in our{' '}
          <Link to="/legal" className="cookie-consent-link">Privacy Policy</Link>.
        </p>
        <div className="cookie-consent-actions">
          <button type="button" onClick={() => setVisible(false)} className="cookie-btn cookie-btn-decline">
            Decline
          </button>
          <button type="button" onClick={() => setVisible(false)} className="cookie-btn cookie-btn-accept">
            Accept
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

        @media (max-width: 767.98px) {
          .cookie-consent { padding: 16px 18px; }
          .cookie-consent-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
          .cookie-consent-actions { width: 100%; }
          .cookie-btn { flex: 1; text-align: center; padding: 12px 16px; }
        }
      `}</style>
    </div>
  )
}

export default CookieConsent