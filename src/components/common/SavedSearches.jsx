import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalize } from '../../utils/useLocalize'
import { useToast } from './useToast'
import { criteriaSummary, hasCriteria } from '../../utils/leadService'
import PropertyAlert from './PropertyAlert'

const KEY = 'lazord_saved_searches'

const read = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(v) ? v : []
  } catch { return [] }
}

// Save the current filters in this browser, re-run them with one click, or ask for alerts.
const SavedSearches = ({ filters }) => {
  const { t, tv } = useLocalize()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [list, setList] = useState(read)

  const persist = useCallback((next) => {
    setList(next)
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* storage blocked */ }
  }, [])

  const active = hasCriteria(filters)
  const sig = JSON.stringify(filters)

  const save = () => {
    if (list.some(s => JSON.stringify(s.f) === sig)) { showToast(t('saved.exists'), 'info', 2000); return }
    persist([{ id: Date.now(), f: filters }, ...list].slice(0, 8))
    showToast(t('saved.done'), 'success', 2000)
  }

  const apply = (f) => {
    const p = new URLSearchParams()
    if (f.search) p.set('search', f.search)
    if (f.type && f.type !== 'All') p.set('type', f.type)
    if (f.category && f.category !== 'All') p.set('category', f.category)
    if (f.beds && f.beds !== 'All') p.set('beds', f.beds)
    if (f.maxPrice) p.set('maxPrice', f.maxPrice)
    navigate(`/properties?${p.toString()}`)
  }

  // readable label in the visitor's language
  const label = (f) => {
    const parts = []
    if (f.type && f.type !== 'All') parts.push(tv(f.type))
    if (f.category && f.category !== 'All') parts.push(tv(f.category))
    if (f.search) parts.push(f.search)
    if (f.beds && f.beds !== 'All') parts.push(t('properties.bedChip', { n: f.beds }))
    if (f.maxPrice) parts.push(t('properties.maxChip', { n: Number(f.maxPrice).toLocaleString('en-US') }))
    return parts.join(' · ') || criteriaSummary(f)
  }

  if (!active && list.length === 0) return null

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', margin: '-12px 0 24px' }}>
      {active && (
        <>
          <button type="button" onClick={save} style={{ background: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.4)', color: '#c0d4f0', borderRadius: '10px', padding: '9px 16px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>{t('saved.save')}</button>
          <PropertyAlert criteria={filters} short />
        </>
      )}
      {list.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginInlineStart: active ? '10px' : 0 }}>
          <span style={{ color: '#8aafd4', fontSize: '0.78rem' }}>{t('saved.title')}:</span>
          {list.map(s => (
            <span key={s.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(201,162,75,0.1)', border: '1px solid rgba(201,162,75,0.35)', borderRadius: '20px', padding: '4px 6px 4px 12px' }}>
              <button type="button" onClick={() => apply(s.f)} style={{ background: 'none', border: 'none', color: '#e9d6a3', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}>{label(s.f)}</button>
              <button type="button" aria-label={t('saved.remove')} onClick={() => persist(list.filter(x => x.id !== s.id))} style={{ background: 'none', border: 'none', color: '#8aafd4', cursor: 'pointer', fontSize: '0.95rem', lineHeight: 1, padding: '0 4px' }}>×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedSearches
