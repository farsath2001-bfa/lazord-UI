import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../../components/admin/AdminNavbar'
import { useAdmin } from '../../context/adminContextValue'

const ICON = { property: '🏠', lead: '👥' }
const VERB = {
  created: 'added', updated: 'updated', deleted: 'deleted', received: 'received',
  'bulk-updated': 'bulk-updated', 'bulk-deleted': 'bulk-deleted',
}
const COLOR = { created: '#4cd48a', received: '#4a90d9', updated: '#e0bf6a', 'bulk-updated': '#e0bf6a', deleted: '#ff8a80', 'bulk-deleted': '#ff8a80' }

const ago = (d) => {
  const s = Math.max(1, Math.round((Date.now() - new Date(d).getTime()) / 1000))
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.round(s / 60)} min ago`
  if (s < 86400) return `${Math.round(s / 3600)} h ago`
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

const AdminActivity = () => {
  const { token } = useAdmin()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    if (!token) return undefined
    axios.get(`${import.meta.env.VITE_API_URL}/api/activity`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { if (!cancelled) setItems(res.data.data || []) })
      .catch(err => console.error(err))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [token])

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh' }}>
      <AdminNavbar />
      <div style={{ padding: '24px 18px 60px', maxWidth: '900px' }}>
        <div className="adm-eyebrow">✦ Audit</div>
        <h1 className="adm-title">Activity</h1>
        <p className="adm-sub" style={{ marginBottom: '20px' }}>Who changed what in the last 90 days.</p>

        <div className="adm-card">
          {loading ? (
            <div className="adm-empty">Loading…</div>
          ) : items.length === 0 ? (
            <div className="adm-empty"><div className="ico">🕑</div>Nothing recorded yet. Changes to listings and leads will show up here.</div>
          ) : items.map(it => (
            <div key={it._id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '13px 18px', borderBottom: '1px solid rgba(45,95,196,0.12)' }}>
              <span style={{ fontSize: '1.1rem' }}>{ICON[it.entity] || '•'}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#fff', fontSize: '0.88rem', wordBreak: 'break-word' }}>
                  <strong style={{ color: COLOR[it.action] || '#fff' }}>{it.entity} {VERB[it.action] || it.action}</strong>
                  {it.label ? ` · ${it.label}` : ''}
                </div>
                <div style={{ color: '#6f8db3', fontSize: '0.74rem', marginTop: '2px' }}>{it.user} · {ago(it.createdAt)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminActivity
