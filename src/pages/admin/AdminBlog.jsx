import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import AdminNavbar from '../../components/admin/AdminNavbar'
import { useAdmin } from '../../context/adminContextValue'
import { useToast } from '../../components/common/useToast'

const API = import.meta.env.VITE_API_URL

const emptyForm = {
  title: '', titleAr: '', slug: '', category: 'Market Insights', tags: '', coverImage: '',
  excerpt: '', excerptAr: '', content: '', contentAr: '', published: false,
}

const inputStyle = {
  width: '100%', backgroundColor: '#060f26', border: '1px solid rgba(74,144,217,0.28)', borderRadius: '10px',
  color: '#ffffff', padding: '11px 14px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box',
}
const labelStyle = { color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '5px', display: 'block', textTransform: 'uppercase' }

const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

const AdminBlog = () => {
  const { token } = useAdmin()
  const { showToast } = useToast()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [showAr, setShowAr] = useState(false)

  const config = { headers: { Authorization: `Bearer ${token}` } }

  const load = useCallback(async () => {
    if (!token) { setLoading(false); return }
    try {
      const res = await axios.get(`${API}/api/posts/admin/all`, { headers: { Authorization: `Bearer ${token}` } })
      setPosts(res.data.data || [])
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }, [token])

  useEffect(() => {
    let cancelled = false
    if (!token) return undefined
    axios.get(`${API}/api/posts/admin/all`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { if (!cancelled) setPosts(res.data.data || []) })
      .catch(err => console.error(err))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [token])

  const startNew = () => { setForm(emptyForm); setEditId(null); setShowAr(false); setEditing(true) }

  const startEdit = async (id) => {
    try {
      const res = await axios.get(`${API}/api/posts/admin/${id}`, config)
      const p = res.data.data
      setForm({
        title: p.title || '', titleAr: p.titleAr || '', slug: p.slug || '', category: p.category || '',
        tags: (p.tags || []).join(', '), coverImage: p.coverImage || '', excerpt: p.excerpt || '',
        excerptAr: p.excerptAr || '', content: p.content || '', contentAr: p.contentAr || '', published: !!p.published,
      })
      setEditId(id)
      setShowAr(!!(p.titleAr || p.contentAr))
      setEditing(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch { showToast('Could not load the post', 'error') }
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = { ...form, tags: form.tags.split(',').map(s => s.trim()).filter(Boolean) }
    try {
      if (editId) await axios.put(`${API}/api/posts/${editId}`, payload, config)
      else await axios.post(`${API}/api/posts`, payload, config)
      showToast(form.published ? 'Post saved and published' : 'Draft saved', 'success')
      setEditing(false)
      setEditId(null)
      await load()
    } catch (err) {
      showToast(err.response?.data?.message || 'Save failed', 'error')
    } finally { setSaving(false) }
  }

  const togglePublish = async (p) => {
    try {
      await axios.put(`${API}/api/posts/${p._id}`, { published: !p.published }, config)
      showToast(p.published ? 'Moved back to draft' : 'Published', 'success')
      await load()
    } catch { showToast('Update failed', 'error') }
  }

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.title}"?`)) return
    try {
      await axios.delete(`${API}/api/posts/${p._id}`, config)
      setPosts(prev => prev.filter(x => x._id !== p._id))
      showToast('Post deleted', 'success')
    } catch { showToast('Delete failed', 'error') }
  }

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh' }}>
      <AdminNavbar />
      <div style={{ padding: '24px 18px 60px', maxWidth: '1100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          <div>
            <div className="adm-eyebrow">✦ Content</div>
            <h1 className="adm-title">Blog</h1>
            <p className="adm-sub">{posts.length} posts · {posts.filter(p => p.published).length} published</p>
          </div>
          <button className={`adm-btn ${editing ? 'adm-btn-red' : 'adm-btn-gold'}`} onClick={() => (editing ? setEditing(false) : startNew())}>
            {editing ? '✕ Cancel' : '+ New post'}
          </button>
        </div>

        {editing && (
          <form onSubmit={save} className="adm-card" style={{ padding: '24px', marginBottom: '22px' }}>
            <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>{editId ? '✏️ Edit post' : '➕ New post'}</h2>
            <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Title *</label>
                <input required style={inputStyle} value={form.title} onChange={set('title')} placeholder="Post title" />
              </div>
              <div>
                <label style={labelStyle}>URL slug (optional)</label>
                <input style={inputStyle} value={form.slug} onChange={set('slug')} placeholder="auto-generated from the title" />
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <input style={inputStyle} value={form.category} onChange={set('category')} placeholder="Market Insights" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Tags (comma separated)</label>
                <input style={inputStyle} value={form.tags} onChange={set('tags')} placeholder="buying, off-plan, investment" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Cover image URL</label>
                <input style={inputStyle} value={form.coverImage} onChange={set('coverImage')} placeholder="https://…" />
                {form.coverImage && <img src={form.coverImage} alt="cover preview" style={{ width: '140px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginTop: '10px' }} />}
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Short summary (shown in the list and on Google)</label>
                <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={form.excerpt} onChange={set('excerpt')} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Content *</label>
                <textarea required rows={16} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Consolas, monospace', lineHeight: 1.6 }} value={form.content} onChange={set('content')}
                  placeholder={'## Heading\nA paragraph of text.\n\n- bullet one\n- bullet two\n\n> A highlighted tip\n\nUse **bold** and [links](/areas)'} />
                <div style={{ color: '#6f8db3', fontSize: '0.74rem', marginTop: '6px' }}>
                  Formatting: <code>## Heading</code> · <code>### Sub-heading</code> · <code>- bullet</code> · <code>&gt; highlight</code> · <code>**bold**</code> · <code>[text](/page or https://…)</code>
                </div>
              </div>
            </div>

            <button type="button" className="adm-btn adm-btn-blue" style={{ marginTop: '16px' }} onClick={() => setShowAr(s => !s)}>
              🌐 {showAr ? 'Hide' : 'Add'} Arabic version
            </button>
            {showAr && (
              <div style={{ display: 'grid', gap: '14px', marginTop: '14px' }} dir="rtl">
                <div>
                  <label style={labelStyle}>العنوان</label>
                  <input style={inputStyle} value={form.titleAr} onChange={set('titleAr')} />
                </div>
                <div>
                  <label style={labelStyle}>الملخص</label>
                  <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={form.excerptAr} onChange={set('excerptAr')} />
                </div>
                <div>
                  <label style={labelStyle}>المحتوى</label>
                  <textarea rows={12} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }} value={form.contentAr} onChange={set('contentAr')} />
                </div>
              </div>
            )}

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cfe0f7', fontSize: '0.9rem', margin: '20px 0 4px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.published} onChange={e => setForm(p => ({ ...p, published: e.target.checked }))} style={{ width: '18px', height: '18px', accentColor: '#c9a24b' }} />
              Published (visible on the website)
            </label>

            <button type="submit" disabled={saving} className="adm-btn adm-btn-gold" style={{ marginTop: '16px', width: '100%', justifyContent: 'center', padding: '14px' }}>
              {saving ? 'Saving…' : editId ? '✅ Save changes' : '✅ Create post'}
            </button>
          </form>
        )}

        <div className="adm-card">
          <div className="adm-card-head"><h2>All posts ({posts.length})</h2></div>
          {loading ? (
            <div className="adm-empty">Loading…</div>
          ) : posts.length === 0 ? (
            <div className="adm-empty"><div className="ico">📝</div>No posts yet. Click “New post”, or run the seed script to add three drafts.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>{['Title', 'Category', 'Status', 'Updated', ''].map(h => <th key={h} className="adm-th">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {posts.map(p => (
                    <tr key={p._id} className="adm-row">
                      <td style={{ padding: '12px 16px', maxWidth: '340px' }}>
                        <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.88rem' }}>{p.title}</div>
                        <div style={{ color: '#6f8db3', fontSize: '0.72rem' }}>/blog/{p.slug}</div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#8aafd4', fontSize: '0.82rem' }}>{p.category}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: p.published ? 'rgba(39,174,96,0.18)' : 'rgba(241,196,15,0.15)', color: p.published ? '#4cd48a' : '#f1c40f', borderRadius: '999px', padding: '3px 10px', fontSize: '0.72rem', fontWeight: 700 }}>
                          {p.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#8aafd4', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{fmt(p.updatedAt)}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          <button className="adm-btn adm-btn-blue" onClick={() => startEdit(p._id)}>✏️ Edit</button>
                          <button className="adm-btn adm-btn-green" onClick={() => togglePublish(p)}>{p.published ? 'Unpublish' : 'Publish'}</button>
                          {p.published && <a className="adm-btn adm-btn-blue" href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer">View ↗</a>}
                          <button className="adm-btn adm-btn-red" onClick={() => remove(p)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminBlog
