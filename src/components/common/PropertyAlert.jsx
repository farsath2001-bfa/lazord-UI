import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { submitLead, digitsOnly } from '../../utils/leadsApi'
import { serviceForType, criteriaSummary } from '../../utils/leadService'

// "Notify me about listings like this" — creates a lead (shows up in Admin → Leads).
const PropertyAlert = ({ criteria, short = false, block = false }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [via, setVia] = useState('email')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const summary = criteriaSummary(criteria)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const isEmail = via === 'email'
    try {
      await submitLead({
        name: name.trim(),
        email: isEmail ? contact.trim() : 'n/a',
        phone: isEmail ? 'n/a' : '+' + digitsOnly(contact),
        service: serviceForType(criteria?.type),
        source: 'Website Popup',
        message: `Property alert (${isEmail ? 'email' : 'WhatsApp'}): ${summary || 'all new listings'}`,
      })
      setStatus('done')
      setTimeout(() => { setOpen(false); setStatus('') }, 3200)
    } catch {
      setStatus('error')
    }
  }

  const field = { width: '100%', backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.35)', borderRadius: '10px', color: '#ffffff', padding: '12px 14px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }
  const tab = (active) => ({ flex: 1, padding: '9px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.82rem', backgroundColor: active ? '#2d5fc4' : 'transparent', color: active ? '#fff' : '#8aafd4' })

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}
        style={{ width: block ? '100%' : 'auto', background: 'rgba(201,162,75,0.1)', border: '1px solid rgba(201,162,75,0.45)', color: '#e9d6a3', borderRadius: '10px', padding: '10px 18px', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer' }}>
        {short ? t('alert.btnShort') : t('alert.btn')}
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(5,15,40,0.85)', zIndex: 99996, backdropFilter: 'blur(3px)' }} />
          <div role="dialog" aria-modal="true" aria-label={t('alert.title')} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 99997, width: '92%', maxWidth: '430px', maxHeight: '92vh', overflowY: 'auto', backgroundColor: '#0d1f4e', border: '1px solid rgba(201,162,75,0.45)', borderRadius: '20px', padding: '30px 26px 26px', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" style={{ position: 'absolute', top: '10px', insetInlineEnd: '14px', background: 'none', border: 'none', color: '#8aafd4', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
            <h3 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>🔔 {t('alert.title')}</h3>
            <p style={{ color: '#8aafd4', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '10px' }}>{t('alert.sub')}</p>
            <div style={{ backgroundColor: 'rgba(45,95,196,0.12)', border: '1px solid rgba(74,144,217,0.25)', borderRadius: '10px', padding: '9px 12px', color: '#c0d4f0', fontSize: '0.82rem', marginBottom: '16px' }}>
              <span style={{ color: '#8aafd4' }}>{t('alert.looking')} </span>{summary || t('alert.any')}
            </div>

            {status === 'done' ? (
              <p style={{ color: '#27ae60', fontWeight: 700, textAlign: 'center', padding: '10px 0' }}>✅ {t('alert.done')}</p>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '4px', backgroundColor: '#060f26', borderRadius: '10px', padding: '4px' }}>
                  <button type="button" style={tab(via === 'email')} onClick={() => { setVia('email'); setContact('') }}>{t('alert.viaEmail')}</button>
                  <button type="button" style={tab(via === 'whatsapp')} onClick={() => { setVia('whatsapp'); setContact('') }}>{t('alert.viaWhatsapp')}</button>
                </div>
                <input required name="name" autoComplete="name" aria-label={t('alert.name')} placeholder={t('alert.name')} value={name} onChange={e => setName(e.target.value)} style={field} />
                {via === 'email' ? (
                  <input required type="email" name="email" autoComplete="email" aria-label={t('alert.email')} placeholder={t('alert.email')} value={contact} onChange={e => setContact(e.target.value)} style={field} />
                ) : (
                  <input required type="tel" inputMode="tel" autoComplete="tel" aria-label={t('alert.phone')} placeholder="+971 50 123 4567" dir="ltr" value={contact} onChange={e => setContact(e.target.value)} pattern="[+0-9 ]{8,18}" style={field} />
                )}
                <button type="submit" disabled={status === 'sending'} style={{ backgroundColor: '#c9a24b', color: '#0a1630', border: 'none', borderRadius: '10px', padding: '13px', fontWeight: 800, fontSize: '0.92rem', cursor: 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}>
                  {status === 'sending' ? t('alert.sending') : t('alert.cta')}
                </button>
                {status === 'error' && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: 0 }}>{t('alert.error')}</p>}
              </form>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default PropertyAlert
