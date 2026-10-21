import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../../components/admin/AdminNavbar'
import { useAdmin } from '../../context/adminContextValue'
import { useToast } from '../../components/common/useToast'

const API = import.meta.env.VITE_API_URL

const emptyForm = {
  name: '', title: '', experience: '', phone: '', whatsapp: '', email: '', photo: '',
  languages: '', speciality: '', areas: '', order: 0, active: true,
}

const inputStyle = {
  width: '100%', backgroundColor: '#060f26', border: '1px solid rgba(74,144,217,0.28)', borderRadius: '10px',
  color: '#ffffff', padding: '11px 14px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box',
}
const labelStyle = { color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '5px', display: 'block', textTransform: 'uppercase' }

const AdminAgents = () => {
  const { token } = useAdmin()
  const { showToast } = useToast()
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [tick, setTick] = useState(0)

  const config = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    let cancelled = false
    if (!token) return undefined
    axios.get(`${API}/api/agents/admin/all`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { if (!cancelled) setAgents(res.data.data || []) })
      .catch(err => console.error(err))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [token, tick])

  const reload = () => setTick(n => n + 1)

  const startNew = () => { setForm(emptyForm); setEditId(null); setEditing(true) }

  const startEdit = (a) => {
    setForm({
      name: a.name || '', title: a.title || '', experience: a.experience || '', phone: a.phone || '',
      whatsapp: a.whatsapp || '', email: a.email || '', photo: a.photo || '', languages: a.languages || '',
      speciality: a.speciality || '', areas: (a.areas || []).join(', '), order: a.order || 0, active: a.active !== false,
    })
    setEditId(a._id)
    setEditing(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = { ...form, order: Number(form.order) || 0, areas: form.areas.split(',').map(s => s.trim()).filter(Boolean) }
    try {
      if (editId) await axios.put(`${API}/api/agents/${editId}`, payload, config)
      else await axios.post(`${API}/api/agents`, payload, config)
      showToast('Agent saved', 'success')
      setEditing(false)
      setEditId(null)
      reload()
    } catch (err) {
      showToast(err.response?.data?.message || 'Save failed', 'error')
    } finally { setSaving(false) }
  }

  const toggleActive = async (a) => {
    try {
      await axios.put(`${API}/api/agents/${a._id}`, { active: !a.active }, config)
      reload()
    } catch { showToast('Update failed', 'error') }
  }

  const remove = async (a) => {
    if (!window.confirm(`Remove ${a.name}? Listings and leads assigned to them will show no agent.`)) return
    try {
      await axios.delete(`${API}/api/agents/${a._id}`, config)
      setAgents(prev => prev.filter(x => x._id !== a._id))
      showToast('Agent removed', 'success')
    } catch { showToast('Delete failed', 'error') }
  }

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh' }}>
      <AdminNavbar />
      <div style={{ padding: '24px 18px 60px', maxWidth: '1100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          <div>
            <div className="adm-eyebrow">✦ Team</div>
            <h1 className="adm-title">Agents</h1>
            <p className="adm-sub">Assign agents to listings and leads. Active agents appear on the public Agents page.</p>
          </div>
          <button className={`adm-btn ${editing ? 'adm-btn-red' : 'adm-btn-gold'}`} onClick={() => (editing ? setEditing(false) : startNew())}>
            {editing ? '✕ Cancel' : '+ Add agent'}
          </button>
        </div>

        {editing && (
          <form onSubmit={save} className="adm-card" style={{ padding: '24px', marginBottom: '22px' }}>
            <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>{editId ? '✏️ Edit agent' : '➕ New agent'}</h2>
            <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              <div><label style={labelStyle}>Full name *</label><input required style={inputStyle} value={form.name} onChange={set('name')} /></div>
              <div><label style={labelStyle}>Job title</label><input style={inputStyle} value={form.title} onChange={set('title')} placeholder="Property Consultant" /></div>
              <div><label style={labelStyle}>Phone *</label><input required style={inputStyle} value={form.phone} onChange={set('phone')} placeholder="+971 5x xxx xxxx" /></div>
              <div><label style={labelStyle}>WhatsApp (blank = same as phone)</label><input style={inputStyle} value={form.whatsapp} onChange={set('whatsapp')} placeholder="9715xxxxxxxx" /></div>
              <div><label style={labelStyle}>Email</label><input type="email" style={inputStyle} value={form.email} onChange={set('email')} /></div>
              <div><label style={labelStyle}>Experience</label><input style={inputStyle} value={form.experience} onChange={set('experience')} placeholder="8 Years Experience" /></div>
              <div><label style={labelStyle}>Languages</label><input style={inputStyle} value={form.languages} onChange={set('languages')} placeholder="English, Arabic, Hindi" /></div>
              <div><label style={labelStyle}>Speciality</label><input style={inputStyle} value={form.speciality} onChange={set('speciality')} placeholder="Off Plan & Investments" /></div>
              <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>Areas covered (comma separated)</label><input style={inputStyle} value={form.areas} onChange={set('areas')} placeholder="Downtown Dubai, Business Bay" /></div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Photo URL</label>
                <input style={inputStyle} value={form.photo} onChange={set('photo')} placeholder="https://…" />
                {form.photo && <img src={form.photo} alt="preview" style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '50%', marginTop: '10px' }} />}
              </div>
              <div><label style={labelStyle}>Display order (lowest first)</label><input type="number" style={inputStyle} value={form.order} onChange={set('order')} /></div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cfe0f7', fontSize: '0.9rem', margin: '18px 0 4px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.active} onChange={e => setForm(p => ({ ...p, active: e.target.checked }))} style={{ width: '18px', height: '18px', accentColor: '#c9a24b' }} />
              Active (visible on the website and selectable for listings)
            </label>
            <button type="submit" disabled={saving} className="adm-btn adm-btn-gold" style={{ marginTop: '16px', width: '100%', justifyContent: 'center', padding: '14px' }}>
              {saving ? 'Saving…' : editId ? '✅ Save changes' : '✅ Add agent'}
            </button>
          </form>
        )}

        {loading ? (
          <div className="adm-card"><div className="adm-empty">Loading…</div></div>
        ) : agents.length === 0 ? (
          <div className="adm-card"><div className="adm-empty"><div className="ico">👤</div>No agents yet. Add your first agent, then assign them to listings and leads.</div></div>
        ) : (
          <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
            {agents.map(a => (
              <div key={a._id} className="adm-card" style={{ padding: '18px', opacity: a.active ? 1 : 0.6 }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                  {a.photo
                    ? <img src={a.photo} alt={a.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                    : <div className="adm-av lg" style={{ margin: 0 }}>{a.name.charAt(0).toUpperCase()}</div>}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ color: '#fff', fontWeight: 800 }}>{a.name}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.8rem' }}>{a.title || 'Agent'}</div>
                    {!a.active && <span style={{ color: '#f1c40f', fontSize: '0.7rem', fontWeight: 700 }}>HIDDEN</span>}
                  </div>
                </div>
                <div style={{ color: '#8aafd4', fontSize: '0.8rem', lineHeight: 1.7, marginBottom: '14px', wordBreak: 'break-word' }}>
                  📞 {a.phone}<br />
                  {a.email && <>📧 {a.email}<br /></>}
                  {a.languages && <>🌍 {a.languages}</>}
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <button className="adm-btn adm-btn-blue" onClick={() => startEdit(a)}>✏️ Edit</button>
                  <button className="adm-btn adm-btn-green" onClick={() => toggleActive(a)}>{a.active ? 'Hide' : 'Show'}</button>
                  <button className="adm-btn adm-btn-red" onClick={() => remove(a)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminAgents
