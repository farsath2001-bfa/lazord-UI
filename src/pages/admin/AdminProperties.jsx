import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../../components/admin/AdminNavbar'
import { useAdmin } from '../../context/AdminContext'

const emptyForm = {
  title: '', type: 'Buy', category: 'Apartment', price: '',
  location: '', community: '', bedrooms: 0, bathrooms: 1,
  area: '', image: '', gallery: '', featured: false,
  status: 'Available', completionYear: '', developer: '',
  description: '', amenities: '', tag: 'New', roi: ''
}

const AdminProperties = () => {
  const { token } = useAdmin()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const config = { headers: { Authorization: `Bearer ${token}` } }

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties`)
      setProperties(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProperties() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        area: Number(form.area),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        completionYear: Number(form.completionYear),
        gallery: form.gallery ? form.gallery.split(',').map(s => s.trim()) : [],
        amenities: form.amenities ? form.amenities.split(',').map(s => s.trim()) : [],
      }

      if (editId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/properties/${editId}`, payload, config)
        setMessage('✅ Property updated successfully!')
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/properties`, payload, config)
        setMessage('✅ Property added successfully!')
      }
      setShowForm(false)
      setForm(emptyForm)
      setEditId(null)
      fetchProperties()
    } catch (err) {
      setMessage('❌ Error: ' + (err.response?.data?.message || err.message))
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleEdit = (property) => {
    setForm({
      ...property,
      gallery: property.gallery?.join(', ') || '',
      amenities: property.amenities?.join(', ') || '',
    })
    setEditId(property._id)
    setShowForm(true)
    window.scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/properties/${id}`, config)
      setMessage('✅ Property deleted!')
      fetchProperties()
    } catch (err) {
      setMessage('❌ Delete failed')
    }
    setTimeout(() => setMessage(''), 3000)
  }

  const inputStyle = {
    width: '100%', backgroundColor: '#060f26',
    border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px',
    color: '#ffffff', padding: '10px 14px', fontSize: '0.88rem',
    outline: 'none', boxSizing: 'border-box'
  }

  const labelStyle = {
    color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px',
    marginBottom: '5px', display: 'block', textTransform: 'uppercase'
  }

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh' }}>
      <AdminNavbar />
      <div style={{ padding: '40px 30px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h1 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: '700', margin: 0 }}>Properties</h1>
          <button onClick={() => { setShowForm(!showForm); setForm(emptyForm); setEditId(null) }}
            style={{ backgroundColor: '#2d5fc4', color: '#fff', border: 'none', borderRadius: '10px', padding: '11px 22px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer' }}>
            {showForm ? '✕ Cancel' : '+ Add Property'}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div style={{ backgroundColor: message.includes('✅') ? 'rgba(39,174,96,0.15)' : 'rgba(231,76,60,0.15)', border: `1px solid ${message.includes('✅') ? 'rgba(39,174,96,0.3)' : 'rgba(231,76,60,0.3)'}`, borderRadius: '10px', padding: '14px 20px', color: message.includes('✅') ? '#27ae60' : '#e74c3c', marginBottom: '20px', fontWeight: '600' }}>
            {message}
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
            <h2 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '700', marginBottom: '24px' }}>
              {editId ? '✏️ Edit Property' : '➕ Add New Property'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Title *</label>
                  <input required style={inputStyle} placeholder="Property title" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
                </div>

                <div>
                  <label style={labelStyle}>Type *</label>
                  <select required style={inputStyle} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                    {['Buy', 'Rent', 'Off Plan'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Category *</label>
                  <select required style={inputStyle} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                    {['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Studio', 'Commercial'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Price (AED) *</label>
                  <input required type="number" style={inputStyle} placeholder="e.g. 1500000" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
                </div>

                <div>
                  <label style={labelStyle}>Status</label>
                  <select style={inputStyle} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                    {['Available', 'Sold', 'Rented', 'Off Plan'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Location *</label>
                  <input required style={inputStyle} placeholder="e.g. Downtown Dubai" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
                </div>

                <div>
                  <label style={labelStyle}>Community</label>
                  <input style={inputStyle} placeholder="e.g. Burj Khalifa District" value={form.community} onChange={e => setForm(p => ({ ...p, community: e.target.value }))} />
                </div>

                <div>
                  <label style={labelStyle}>Bedrooms</label>
                  <input type="number" style={inputStyle} value={form.bedrooms} onChange={e => setForm(p => ({ ...p, bedrooms: e.target.value }))} />
                </div>

                <div>
                  <label style={labelStyle}>Bathrooms</label>
                  <input type="number" style={inputStyle} value={form.bathrooms} onChange={e => setForm(p => ({ ...p, bathrooms: e.target.value }))} />
                </div>

                <div>
                  <label style={labelStyle}>Area (sqft) *</label>
                  <input required type="number" style={inputStyle} placeholder="e.g. 1200" value={form.area} onChange={e => setForm(p => ({ ...p, area: e.target.value }))} />
                </div>

                <div>
                  <label style={labelStyle}>Completion Year</label>
                  <input type="number" style={inputStyle} placeholder="e.g. 2024" value={form.completionYear} onChange={e => setForm(p => ({ ...p, completionYear: e.target.value }))} />
                </div>

                <div>
                  <label style={labelStyle}>Developer</label>
                  <input style={inputStyle} placeholder="e.g. Emaar" value={form.developer} onChange={e => setForm(p => ({ ...p, developer: e.target.value }))} />
                </div>

                <div>
                  <label style={labelStyle}>Tag</label>
                  <select style={inputStyle} value={form.tag} onChange={e => setForm(p => ({ ...p, tag: e.target.value }))}>
                    {['New', 'Featured', 'Hot Deal', 'Off Plan', 'Rent', 'Family'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>ROI</label>
                  <input style={inputStyle} placeholder="e.g. 7.2%" value={form.roi} onChange={e => setForm(p => ({ ...p, roi: e.target.value }))} />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Main Image URL *</label>
                  <input required style={inputStyle} placeholder="https://images.unsplash.com/..." value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Gallery URLs (comma separated)</label>
                  <input style={inputStyle} placeholder="url1, url2, url3" value={form.gallery} onChange={e => setForm(p => ({ ...p, gallery: e.target.value }))} />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Amenities (comma separated)</label>
                  <input style={inputStyle} placeholder="Pool, Gym, Parking, Security" value={form.amenities} onChange={e => setForm(p => ({ ...p, amenities: e.target.value }))} />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Property description..." value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                  <label htmlFor="featured" style={{ color: '#8aafd4', fontSize: '0.88rem', cursor: 'pointer' }}>Mark as Featured</label>
                </div>

              </div>

              <button type="submit" disabled={saving} style={{ marginTop: '24px', backgroundColor: saving ? '#1a3a7c' : '#2d5fc4', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px 32px', fontSize: '0.92rem', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? 'Saving...' : editId ? '✅ Update Property' : '✅ Add Property'}
              </button>
            </form>
          </div>
        )}

        {/* Properties Table */}
        <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(45,95,196,0.2)' }}>
            <h2 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>
              All Properties ({properties.length})
            </h2>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>Loading...</div>
          ) : properties.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>No properties yet. Add your first one!</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(45,95,196,0.1)' }}>
                    {['Image', 'Title', 'Type', 'Price', 'Location', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', color: '#8aafd4', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', fontWeight: '600', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p, i) => (
                    <tr key={p._id} style={{ borderTop: '1px solid rgba(45,95,196,0.15)', backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(45,95,196,0.04)' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <img src={p.image} alt={p.title} style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} />
                      </td>
                      <td style={{ padding: '12px 16px', color: '#ffffff', fontSize: '0.85rem', fontWeight: '600', maxWidth: '200px' }}>{p.title}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ backgroundColor: 'rgba(45,95,196,0.2)', color: '#4a90d9', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>{p.type}</span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#ffffff', fontSize: '0.85rem', fontWeight: '700', whiteSpace: 'nowrap' }}>
                        AED {p.price?.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#8aafd4', fontSize: '0.82rem' }}>{p.location}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ backgroundColor: p.status === 'Available' ? 'rgba(39,174,96,0.2)' : 'rgba(231,76,60,0.2)', color: p.status === 'Available' ? '#27ae60' : '#e74c3c', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleEdit(p)} style={{ backgroundColor: 'rgba(74,144,217,0.15)', color: '#4a90d9', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '6px', padding: '6px 12px', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}>✏️ Edit</button>
                          <button onClick={() => handleDelete(p._id)} style={{ backgroundColor: 'rgba(231,76,60,0.15)', color: '#e74c3c', border: '1px solid rgba(231,76,60,0.3)', borderRadius: '6px', padding: '6px 12px', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}>🗑️ Delete</button>
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

export default AdminProperties