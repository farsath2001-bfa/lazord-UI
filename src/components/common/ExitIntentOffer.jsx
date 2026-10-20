import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { submitLead, digitsOnly, LEAD_FLAG } from '../../utils/leadsApi'

// Desktop only: when the cursor leaves through the top of the window (after 20s on site),
// offer a free valuation — once per session, never after a lead was already sent.
const ExitIntentOffer = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('') // '' | sending | done | error

  useEffect(() => {
    if (!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return undefined
    let armed = false
    const armTimer = setTimeout(() => { armed = true }, 20000)
    const onLeave = (e) => {
      if (!armed || e.clientY > 0 || window.location.pathname.startsWith('/admin')) return
      try {
        if (sessionStorage.getItem('lazord_exit_shown') || localStorage.getItem(LEAD_FLAG)) return
        sessionStorage.setItem('lazord_exit_shown', '1')
      } catch { /* storage blocked */ }
      setOpen(true)
    }
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      clearTimeout(armTimer)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitLead({
        name: name.trim(),
        phone: '+971' + digitsOnly(phone),
        service: 'Free Valuation',
        source: 'Website Popup',
        message: 'Exit-intent offer: free property valuation',
      })
      setStatus('done')
      setTimeout(() => setOpen(false), 3500)
    } catch {
      setStatus('error')
    }
  }

  const field = { width: '100%', backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.35)', borderRadius: '10px', color: '#ffffff', padding: '13px 16px', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }

  return (
    <>
      <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(5,15,40,0.85)', zIndex: 99996, backdropFilter: 'blur(3px)' }} />
      <div role="dialog" aria-modal="true" aria-label={t('exit.title')} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 99997, width: '92%', maxWidth: '430px', backgroundColor: '#0d1f4e', border: '1px solid rgba(201,162,75,0.5)', borderRadius: '20px', padding: '34px 28px 28px', boxShadow: '0 30px 80px rgba(0,0,0,0.6)', textAlign: 'center' }}>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close" style={{ position: 'absolute', top: '12px', insetInlineEnd: '14px', background: 'none', border: 'none', color: '#8aafd4', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
        <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>🎁</div>
        <h3 className="font-display" style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>{t('exit.title')}</h3>
        <p style={{ color: '#8aafd4', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>{t('exit.sub')}</p>

        {status === 'done' ? (
          <p style={{ color: '#27ae60', fontWeight: 700, padding: '10px 0' }}>✅ {t('exit.thanks')}</p>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input required name="name" autoComplete="name" aria-label={t('exit.namePh')} placeholder={t('exit.namePh')} value={name} onChange={e => setName(e.target.value)} style={field} />
            <div style={{ display: 'flex', gap: '8px' }} dir="ltr">
              <span style={{ ...field, width: 'auto', color: '#8aafd4', display: 'flex', alignItems: 'center' }}>+971</span>
              <input required name="phone" type="tel" inputMode="tel" autoComplete="tel-national" aria-label={t('exit.phonePh')} placeholder={t('exit.phonePh')} value={phone} onChange={e => setPhone(e.target.value)} style={field} pattern="[0-9 ]{7,12}" />
            </div>
            <button type="submit" disabled={status === 'sending'} style={{ backgroundColor: '#c9a24b', color: '#0a1630', border: 'none', borderRadius: '10px', padding: '14px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}>
              {status === 'sending' ? t('exit.sending') : t('exit.cta')}
            </button>
            {status === 'error' && <p style={{ color: '#e74c3c', fontSize: '0.82rem', margin: 0 }}>{t('exit.error')}</p>}
            <button type="button" onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#6f8fb8', fontSize: '0.8rem', cursor: 'pointer' }}>{t('exit.no')}</button>
          </form>
        )}
      </div>
    </>
  )
}

export default ExitIntentOffer
