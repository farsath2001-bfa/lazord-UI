import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../../components/admin/AdminNavbar'
import { useAdmin } from '../../context/AdminContext'
import PropertyPDFButton from '../../components/common/PropertyPDFButton'

const emptyForm = {
  title: '', type: 'Buy', category: 'Apartment', price: '',
  location: '', community: '', bedrooms: 0, bathrooms: 1,
  area: '', image: '', gallery: '', featured: false,
  status: 'Available', completionYear: '', developer: '',
  description: '', amenities: '', tag: 'New', roi: ''
}

const AdminProperties = () => {
  const { token } = useAdmin()
  const [activeTab, setActiveTab] = useState('properties')
  const [properties, setProperties] = useState([])
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [enquiriesLoading, setEnquiriesLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedEnquiry, setSelectedEnquiry] = useState(null)
  const [search, setSearch] = useState('')

  const config = { headers: { Authorization: `Bearer ${token}` } }

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties`)
      setProperties(res.data.data)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  const fetchEnquiries = async () => {
    setEnquiriesLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/leads`, config)
      setEnquiries(res.data.data || res.data)
    } catch (err) { console.error(err) }
    finally { setEnquiriesLoading(false) }
  }

  useEffect(() => { fetchProperties() }, [])
  useEffect(() => { if (activeTab === 'enquiries') fetchEnquiries() }, [activeTab])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        price: Number(form.price), area: Number(form.area),
        bedrooms: Number(form.bedrooms), bathrooms: Number(form.bathrooms),
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
      setShowForm(false); setForm(emptyForm); setEditId(null)
      fetchProperties()
    } catch (err) {
      setMessage('❌ Error: ' + (err.response?.data?.message || err.message))
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleEdit = (property) => {
    setForm({ ...property, gallery: property.gallery?.join(', ') || '', amenities: property.amenities?.join(', ') || '' })
    setEditId(property._id); setShowForm(true); window.scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this property?')) return
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/properties/${id}`, config)
      setMessage('✅ Property deleted!')
      fetchProperties()
    } catch { setMessage('❌ Delete failed') }
    setTimeout(() => setMessage(''), 3000)
  }

  const handleEnquiryStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/leads/${id}`, { status: newStatus }, config)
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: newStatus } : e))
      if (selectedEnquiry?._id === id) setSelectedEnquiry(prev => ({ ...prev, status: newStatus }))
    } catch (err) { console.error(err) }
  }

  const handleEnquiryDelete = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/leads/${id}`, config)
      setEnquiries(prev => prev.filter(e => e._id !== id))
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null)
    } catch (err) { console.error(err) }
  }

  const statusColor = (status) => {
    const map = {
      'New':         { bg: 'rgba(74,144,217,0.2)',   color: '#4a90d9' },
      'Contacted':   { bg: 'rgba(241,196,15,0.2)',   color: '#f1c40f' },
      'In Progress': { bg: 'rgba(230,126,34,0.2)',   color: '#e67e22' },
      'Closed':      { bg: 'rgba(39,174,96,0.2)',    color: '#27ae60' },
      'Lost':        { bg: 'rgba(231,76,60,0.2)',    color: '#e74c3c' },
    }
    return map[status] || map['New']
  }

  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length

  // Filter properties by search
  const filteredProperties = properties.filter(p =>
    !search || p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.location?.toLowerCase().includes(search.toLowerCase())
  )

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
      <div style={{ padding: '32px 30px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: '700', margin: 0 }}>Admin Panel</h1>
            <p style={{ color: '#8aafd4', margin: '4px 0 0', fontSize: '0.85rem' }}>
              {properties.length} properties · {enquiries.length} enquiries
            </p>
          </div>
          {activeTab === 'properties' && (
            <button onClick={() => { setShowForm(!showForm); setForm(emptyForm); setEditId(null) }}
              style={{ backgroundColor: showForm ? 'rgba(231,76,60,0.2)' : '#2d5fc4', color: showForm ? '#e74c3c' : '#fff', border: showForm ? '1px solid rgba(231,76,60,0.4)' : 'none', borderRadius: '10px', padding: '11px 22px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}>
              {showForm ? '✕ Cancel' : '+ Add Property'}
            </button>
          )}
          {activeTab === 'enquiries' && (
            <button onClick={fetchEnquiries}
              style={{ backgroundColor: 'rgba(45,95,196,0.2)', color: '#4a90d9', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '10px', padding: '11px 22px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer' }}>
              🔄 Refresh
            </button>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', backgroundColor: '#0d1f4e', borderRadius: '12px', padding: '6px', width: 'fit-content', border: '1px solid rgba(45,95,196,0.25)' }}>
          {[
            { key: 'properties', label: '🏠 Properties', count: properties.length, badge: false },
            { key: 'enquiries',  label: '📩 Enquiries',  count: newEnquiriesCount, badge: true  },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{ backgroundColor: activeTab === tab.key ? '#2d5fc4' : 'transparent', color: activeTab === tab.key ? '#ffffff' : '#8aafd4', border: 'none', borderRadius: '8px', padding: '9px 20px', fontSize: '0.88rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {tab.label}
              {tab.count > 0 && (
                <span style={{ backgroundColor: tab.badge && activeTab !== tab.key ? '#e74c3c' : 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '20px', padding: '1px 8px', fontSize: '0.72rem', fontWeight: '800' }}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Message */}
        {message && (
          <div style={{ backgroundColor: message.includes('✅') ? 'rgba(39,174,96,0.15)' : 'rgba(231,76,60,0.15)', border: `1px solid ${message.includes('✅') ? 'rgba(39,174,96,0.3)' : 'rgba(231,76,60,0.3)'}`, borderRadius: '10px', padding: '14px 20px', color: message.includes('✅') ? '#27ae60' : '#e74c3c', marginBottom: '20px', fontWeight: '600' }}>
            {message}
          </div>
        )}

        {/* ── PROPERTIES TAB ── */}
        {activeTab === 'properties' && (
          <>
            {/* Add/Edit Form */}
            {showForm && (
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '16px', padding: '32px', marginBottom: '28px' }}>
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
                      <input type="number" style={inputStyle} placeholder="e.g. 2025" value={form.completionYear} onChange={e => setForm(p => ({ ...p, completionYear: e.target.value }))} />
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
                      <input required style={inputStyle} placeholder="https://i.postimg.cc/..." value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} />
                      {form.image && <img src={form.image} alt="preview" style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: '8px', marginTop: '10px' }} />}
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
                  <button type="submit" disabled={saving}
                    style={{ marginTop: '24px', backgroundColor: saving ? '#1a3a7c' : '#2d5fc4', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px 32px', fontSize: '0.92rem', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer' }}>
                    {saving ? 'Saving...' : editId ? '✅ Update Property' : '✅ Add Property'}
                  </button>
                </form>
              </div>
            )}

            {/* Properties Table */}
            <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(45,95,196,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', margin: 0 }}>
                  All Properties ({filteredProperties.length}{search ? ` of ${properties.length}` : ''})
                </h2>
                {/* Search */}
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#8aafd4', fontSize: '0.9rem' }}>🔍</span>
                  <input
                    type="text" placeholder="Search properties..."
                    value={search} onChange={e => setSearch(e.target.value)}
                    style={{ backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px', color: '#ffffff', padding: '8px 12px 8px 32px', fontSize: '0.85rem', outline: 'none', width: '220px' }}
                  />
                </div>
              </div>
              {loading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>Loading...</div>
              ) : filteredProperties.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>
                  {search ? `No properties matching "${search}"` : 'No properties yet. Add your first one!'}
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'rgba(45,95,196,0.1)' }}>
                        {['Image', 'Title', 'Type', 'Price', 'Location', 'Status', 'Actions'].map(h => (
                          <th key={h} style={{ padding: '12px 16px', color: '#8aafd4', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', fontWeight: '600', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProperties.map((p, i) => (
                        <tr key={p._id} style={{ borderTop: '1px solid rgba(45,95,196,0.15)', backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(45,95,196,0.04)', transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.1)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = i % 2 === 0 ? 'transparent' : 'rgba(45,95,196,0.04)'}>
                          <td style={{ padding: '12px 16px' }}>
                            <img src={p.image} alt={p.title} style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(45,95,196,0.2)' }} />
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: '700', maxWidth: '200px' }}>{p.title}</div>
                            <div style={{ color: '#8aafd4', fontSize: '0.72rem', marginTop: '2px' }}>{p.category} · {p.bedrooms === 0 ? 'Studio' : `${p.bedrooms} BR`}</div>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ backgroundColor: p.type === 'Buy' ? 'rgba(45,95,196,0.2)' : p.type === 'Rent' ? 'rgba(39,174,96,0.2)' : 'rgba(142,68,173,0.2)', color: p.type === 'Buy' ? '#4a90d9' : p.type === 'Rent' ? '#27ae60' : '#8e44ad', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>{p.type}</span>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#ffffff', fontSize: '0.88rem', fontWeight: '700', whiteSpace: 'nowrap' }}>
                            AED {p.price?.toLocaleString()}
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ color: '#8aafd4', fontSize: '0.82rem' }}>{p.location}</div>
                            {p.community && <div style={{ color: '#4a4a6a', fontSize: '0.72rem' }}>{p.community}</div>}
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ backgroundColor: p.status === 'Available' ? 'rgba(39,174,96,0.2)' : p.status === 'Off Plan' ? 'rgba(142,68,173,0.2)' : 'rgba(231,76,60,0.2)', color: p.status === 'Available' ? '#27ae60' : p.status === 'Off Plan' ? '#8e44ad' : '#e74c3c', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>
                              {p.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button onClick={() => handleEdit(p)} style={{ backgroundColor: 'rgba(74,144,217,0.15)', color: '#4a90d9', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '6px', padding: '6px 14px', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(74,144,217,0.3)'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(74,144,217,0.15)'}>
                                ✏️ Edit
                              </button>
                              <PropertyPDFButton property={p} />
                              <button onClick={() => handleDelete(p._id)} style={{ backgroundColor: 'rgba(231,76,60,0.15)', color: '#e74c3c', border: '1px solid rgba(231,76,60,0.3)', borderRadius: '6px', padding: '6px 14px', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(231,76,60,0.3)'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(231,76,60,0.15)'}>
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── ENQUIRIES TAB ── */}
        {activeTab === 'enquiries' && (
          <div style={{ display: 'grid', gridTemplateColumns: selectedEnquiry ? '1fr 380px' : '1fr', gap: '20px', alignItems: 'start' }}>
            <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(45,95,196,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', margin: 0 }}>All Enquiries ({enquiries.length})</h2>
                {newEnquiriesCount > 0 && (
                  <span style={{ backgroundColor: 'rgba(231,76,60,0.2)', color: '#e74c3c', border: '1px solid rgba(231,76,60,0.3)', borderRadius: '20px', padding: '3px 12px', fontSize: '0.78rem', fontWeight: '700' }}>
                    {newEnquiriesCount} New
                  </span>
                )}
              </div>
              {enquiriesLoading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>Loading...</div>
              ) : enquiries.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center', color: '#8aafd4' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📭</div>No enquiries yet.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'rgba(45,95,196,0.1)' }}>
                        {['Name', 'Contact', 'Source', 'Property', 'Status', 'Date', 'Actions'].map(h => (
                          <th key={h} style={{ padding: '12px 16px', color: '#8aafd4', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', fontWeight: '600', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.map((e, i) => (
                        <tr key={e._id} onClick={() => setSelectedEnquiry(selectedEnquiry?._id === e._id ? null : e)}
                          style={{ borderTop: '1px solid rgba(45,95,196,0.15)', backgroundColor: selectedEnquiry?._id === e._id ? 'rgba(45,95,196,0.15)' : i % 2 === 0 ? 'transparent' : 'rgba(45,95,196,0.04)', cursor: 'pointer', transition: 'background 0.15s' }}
                          onMouseEnter={el => { if (selectedEnquiry?._id !== e._id) el.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.1)' }}
                          onMouseLeave={el => { if (selectedEnquiry?._id !== e._id) el.currentTarget.style.backgroundColor = i % 2 === 0 ? 'transparent' : 'rgba(45,95,196,0.04)' }}>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(45,95,196,0.3)', border: '1px solid rgba(74,144,217,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a90d9', fontWeight: '800', fontSize: '0.82rem', flexShrink: 0 }}>
                                {e.name?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.85rem' }}>{e.name}</div>
                                {e.status === 'New' && <div style={{ color: '#e74c3c', fontSize: '0.65rem', fontWeight: '700' }}>● NEW</div>}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ color: '#8aafd4', fontSize: '0.8rem' }}>{e.email}</div>
                            <div style={{ color: '#8aafd4', fontSize: '0.8rem' }}>{e.phone}</div>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ backgroundColor: 'rgba(45,95,196,0.15)', color: '#4a90d9', padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '600' }}>{e.source}</span>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#8aafd4', fontSize: '0.8rem', maxWidth: '140px' }}>
                            {e.property?.title || <span style={{ color: '#4a4a6a' }}>—</span>}
                          </td>
                          <td style={{ padding: '12px 16px' }} onClick={ev => ev.stopPropagation()}>
                            <select value={e.status} onChange={ev => handleEnquiryStatusChange(e._id, ev.target.value)}
                              style={{ backgroundColor: statusColor(e.status).bg, color: statusColor(e.status).color, border: `1px solid ${statusColor(e.status).color}40`, borderRadius: '20px', padding: '3px 10px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', outline: 'none' }}>
                              {['New', 'Contacted', 'In Progress', 'Closed', 'Lost'].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#8aafd4', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                            {new Date(e.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td style={{ padding: '12px 16px' }} onClick={ev => ev.stopPropagation()}>
                            <button onClick={() => handleEnquiryDelete(e._id)}
                              style={{ backgroundColor: 'rgba(231,76,60,0.15)', color: '#e74c3c', border: '1px solid rgba(231,76,60,0.3)', borderRadius: '6px', padding: '6px 10px', fontSize: '0.78rem', cursor: 'pointer' }}>🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Enquiry Detail Panel */}
            {selectedEnquiry && (
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '16px', padding: '24px', position: 'sticky', top: '80px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', margin: 0 }}>📋 Enquiry Detail</h3>
                  <button onClick={() => setSelectedEnquiry(null)} style={{ background: 'transparent', border: 'none', color: '#8aafd4', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
                </div>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'rgba(45,95,196,0.3)', border: '2px solid rgba(74,144,217,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: '800', color: '#4a90d9', marginBottom: '14px' }}>
                  {selectedEnquiry.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.05rem', marginBottom: '4px' }}>{selectedEnquiry.name}</div>
                <div style={{ color: '#8aafd4', fontSize: '0.82rem', marginBottom: '20px' }}>
                  {new Date(selectedEnquiry.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>
                {[
                  { icon: '📧', label: 'Email',    value: selectedEnquiry.email },
                  { icon: '📞', label: 'Phone',    value: selectedEnquiry.phone },
                  { icon: '🏷️', label: 'Source',   value: selectedEnquiry.source },
                  { icon: '🏠', label: 'Property', value: selectedEnquiry.property?.title || 'General Inquiry' },
                ].map(row => (
                  <div key={row.label} style={{ marginBottom: '14px' }}>
                    <div style={{ color: '#8aafd4', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{row.icon} {row.label}</div>
                    <div style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: '600' }}>{row.value}</div>
                  </div>
                ))}
                {selectedEnquiry.message && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ color: '#8aafd4', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>💬 Message</div>
                    <div style={{ backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '10px', padding: '12px', color: '#c0d4f0', fontSize: '0.86rem', lineHeight: '1.6' }}>
                      {selectedEnquiry.message}
                    </div>
                  </div>
                )}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ color: '#8aafd4', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>📊 Update Status</div>
                  <select value={selectedEnquiry.status} onChange={e => handleEnquiryStatusChange(selectedEnquiry._id, e.target.value)}
                    style={{ width: '100%', backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px', color: '#ffffff', padding: '10px 14px', fontSize: '0.88rem', outline: 'none', cursor: 'pointer' }}>
                    {['New', 'Contacted', 'In Progress', 'Closed', 'Lost'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a href={`mailto:${selectedEnquiry.email}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.2)', color: '#4a90d9', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px', padding: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem' }}>📧 Send Email</a>
                  <a href={`https://wa.me/${selectedEnquiry.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'rgba(37,211,102,0.15)', color: '#25d366', border: '1px solid rgba(37,211,102,0.3)', borderRadius: '8px', padding: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem' }}>💬 WhatsApp</a>
                  <a href={`tel:${selectedEnquiry.phone}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'rgba(39,174,96,0.15)', color: '#27ae60', border: '1px solid rgba(39,174,96,0.3)', borderRadius: '8px', padding: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem' }}>📞 Call Now</a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProperties