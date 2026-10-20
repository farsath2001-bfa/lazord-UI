import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { submitLead, digitsOnly } from '../../utils/leadsApi'
import { serviceForType } from '../../utils/leadService'

const pad = (n) => String(n).padStart(2, '0')
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

// Office hours: Mon–Thu 9–6:30, Sat–Sun 9:30–3, Fri closed. Viewings are offered inside those hours.
const slotsFor = (day) => {
  if (day === 5) return []
  const [start, end] = day === 6 || day === 0 ? [10, 14] : [10, 17]
  const out = []
  for (let h = start; h <= end; h++) out.push(`${pad(h)}:00`)
  return out
}

const ViewingScheduler = ({ property }) => {
  const { t } = useTranslation()
  const tomorrow = useMemo(() => { const d = new Date(); d.setDate(d.getDate() + 1); return d }, [])
  const maxDate = useMemo(() => { const d = new Date(); d.setDate(d.getDate() + 60); return d }, [])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('')
  const [when, setWhen] = useState('')

  const day = date ? new Date(`${date}T12:00:00`).getDay() : null
  const slots = day === null ? [] : slotsFor(day)
  const closed = day === 5

  const field = { width: '100%', backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '10px', color: '#ffffff', padding: '11px 14px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box', colorScheme: 'dark' }
  const label = { color: '#8aafd4', fontSize: '0.72rem', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }

  const submit = async (e) => {
    e.preventDefault()
    if (!date || !time || closed) return
    setStatus('sending')
    const pretty = new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    try {
      await submitLead({
        name: name.trim(),
        phone: '+971' + digitsOnly(phone),
        service: serviceForType(property.type),
        source: 'Property Inquiry',
        property: property._id,
        message: `Viewing request for "${property.title}": ${pretty} at ${time}`,
      })
      setWhen(`${pretty} · ${time}`)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(201,162,75,0.3)', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
      <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>📅 {t('viewing.title')}</h3>
      <p style={{ color: '#8aafd4', fontSize: '0.78rem', marginBottom: '16px' }}>{t('viewing.sub')}</p>

      {status === 'done' ? (
        <div style={{ textAlign: 'center', padding: '14px 0' }}>
          <div style={{ fontSize: '2rem', marginBottom: '6px' }}>✅</div>
          <div style={{ color: '#27ae60', fontWeight: 700, marginBottom: '4px' }}>{t('viewing.done')}</div>
          <div style={{ color: '#8aafd4', fontSize: '0.82rem' }}>{t('viewing.doneDesc', { when })}</div>
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="vw-date" style={label}>{t('viewing.date')}</label>
              <input id="vw-date" type="date" required min={toISO(tomorrow)} max={toISO(maxDate)} value={date}
                onChange={e => { setDate(e.target.value); setTime('') }} style={field} />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="vw-time" style={label}>{t('viewing.time')}</label>
              <select id="vw-time" required disabled={!slots.length} value={time} onChange={e => setTime(e.target.value)} style={field}>
                <option value="">{t('viewing.pickTime')}</option>
                {slots.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {closed && <div style={{ color: '#e67e22', fontSize: '0.8rem' }}>{t('viewing.closed')}</div>}
          <input required name="name" autoComplete="name" aria-label={t('viewing.name')} placeholder={t('viewing.name')} value={name} onChange={e => setName(e.target.value)} style={field} />
          <div style={{ display: 'flex', gap: '8px' }} dir="ltr">
            <span style={{ ...field, width: 'auto', color: '#8aafd4', display: 'flex', alignItems: 'center' }}>+971</span>
            <input required type="tel" inputMode="tel" autoComplete="tel-national" aria-label={t('viewing.phone')} placeholder="50 123 4567" value={phone} onChange={e => setPhone(e.target.value)} pattern="[0-9 ]{7,12}" style={field} />
          </div>
          <button type="submit" disabled={status === 'sending' || closed || !time}
            style={{ backgroundColor: '#c9a24b', color: '#0a1630', border: 'none', borderRadius: '10px', padding: '13px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', opacity: status === 'sending' || closed || !time ? 0.6 : 1 }}>
            {status === 'sending' ? t('viewing.sending') : t('viewing.cta')}
          </button>
          {status === 'error' && <div style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{t('viewing.error')}</div>}
        </form>
      )}
    </div>
  )
}

export default ViewingScheduler
