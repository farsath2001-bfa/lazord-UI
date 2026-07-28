import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../../components/admin/AdminNavbar'
import { useAdmin } from '../../context/AdminContext'

const statusColor = {
  'New':         { bg: 'rgba(74,144,217,0.2)',  color: '#4a90d9' },
  'Contacted':   { bg: 'rgba(241,196,15,0.2)',  color: '#f1c40f' },
  'In Progress': { bg: 'rgba(230,126,34,0.2)',  color: '#e67e22' },
  'Closed':      { bg: 'rgba(39,174,96,0.2)',   color: '#27ae60' },
  'Lost':        { bg: 'rgba(231,76,60,0.2)',   color: '#e74c3c' },
}

const sourceColor = {
  'Website Popup':    { bg: 'rgba(142,68,173,0.2)',  color: '#8e44ad', icon: '🔔' },
  'Contact Form':     { bg: 'rgba(45,95,196,0.2)',   color: '#4a90d9', icon: '📋' },
  'Property Inquiry': { bg: 'rgba(39,174,96,0.2)',   color: '#27ae60', icon: '🏠' },
  'WhatsApp':         { bg: 'rgba(37,211,102,0.2)',  color: '#25d366', icon: '💬' },
  'Phone':            { bg: 'rgba(241,196,15,0.2)',  color: '#f1c40f', icon: '📞' },
  'Walk In':          { bg: 'rgba(230,126,34,0.2)',  color: '#e67e22', icon: '🚶' },
}

const AdminLeads = () => {
  const { token } = useAdmin()
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [sourceFilter, setSourceFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [deletingSource, setDeletingSource] = useState(null)
  const [selectedLead, setSelectedLead] = useState(null)

  const config = { headers: { Authorization: `Bearer ${token}` } }

  const fetchLeads = async () => {
    if (!token) { setLoading(false); return }
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/leads`, config)
      setLeads(res.data.data)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchLeads() }, [token])

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/leads/${id}`, { status }, config)
      setLeads(prev => prev.map(l => l._id === id ? { ...l, status } : l))
      if (selectedLead?._id === id) setSelectedLead(prev => ({ ...prev, status }))
      setMessage('✅ Status updated!')
    } catch { setMessage('❌ Update failed') }
    setTimeout(() => setMessage(''), 2000)
  }

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/leads/${id}`, config)
      setLeads(prev => prev.filter(l => l._id !== id))
      if (selectedLead?._id === id) setSelectedLead(null)
      setMessage('✅ Lead deleted!')
    } catch { setMessage('❌ Delete failed') }
    setTimeout(() => setMessage(''), 2000)
  }

  const deleteAllBySource = async (source) => {
    const count = leads.filter(l => l.source === source).length
    if (count === 0) return
    if (!window.confirm(`Delete ALL ${count} ${source} leads?`)) return
    setDeletingSource(source)
    try {
      await Promise.all(leads.filter(l => l.source === source).map(l =>
        axios.delete(`${import.meta.env.VITE_API_URL}/api/leads/${l._id}`, config)
      ))
      setLeads(prev => prev.filter(l => l.source !== source))
      setMessage(`✅ Deleted all ${count} ${source} leads!`)
    } catch { setMessage('❌ Delete failed') }
    finally { setDeletingSource(null); setTimeout(() => setMessage(''), 3000) }
  }

  const deleteAllFiltered = async () => {
    if (filtered.length === 0) return
    if (!window.confirm(`Delete ALL ${filtered.length} shown leads?`)) return
    setDeletingSource('all')
    try {
      await Promise.all(filtered.map(l =>
        axios.delete(`${import.meta.env.VITE_API_URL}/api/leads/${l._id}`, config)
      ))
      const ids = new Set(filtered.map(l => l._id))
      setLeads(prev => prev.filter(l => !ids.has(l._id)))
      setMessage(`✅ Deleted ${filtered.length} leads!`)
    } catch { setMessage('❌ Delete failed') }
    finally { setDeletingSource(null); setTimeout(() => setMessage(''), 3000) }
  }

  const exportToCSV = (leadsToExport, filename = 'lazord-leads') => {
    if (leadsToExport.length === 0) { setMessage('❌ No leads to export'); setTimeout(() => setMessage(''), 2000); return }
    const headers = ['Name', 'Email', 'Phone', 'Source', 'Service', 'Message', 'Status', 'Property', 'Date']
    const rows = leadsToExport.map(l => [
      l.name || '', l.email || '', l.phone || '', l.source || '', l.service || '',
      (l.message || '').replace(/,/g, ' ').replace(/\n/g, ' '),
      l.status || '', l.property?.title || '',
      new Date(l.createdAt).toLocaleDateString('en-GB'),
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url; link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
    link.click(); URL.revokeObjectURL(url)
    setMessage(`✅ Exported ${leadsToExport.length} leads!`)
    setTimeout(() => setMessage(''), 3000)
  }

  const statuses = ['All', 'New', 'Contacted', 'In Progress', 'Closed', 'Lost']
  const sources  = ['All', 'Website Popup', 'Contact Form', 'Property Inquiry', 'WhatsApp', 'Phone', 'Walk In']

  const filtered = leads
    .filter(l => filter === 'All' || l.status === filter)
    .filter(l => sourceFilter === 'All' || l.source === sourceFilter)
    .filter(l => !search || l.name?.toLowerCase().includes(search.toLowerCase()) || l.email?.toLowerCase().includes(search.toLowerCase()) || l.phone?.includes(search))

  const stats = [
    { label: 'Total Leads',  value: leads.length,                                          color: '#4a90d9' },
    { label: 'New',          value: leads.filter(l => l.status === 'New').length,           color: '#4a90d9' },
    { label: 'In Progress',  value: leads.filter(l => l.status === 'In Progress').length,   color: '#e67e22' },
    { label: 'Popup Leads',  value: leads.filter(l => l.source === 'Website Popup').length, color: '#8e44ad' },
    { label: 'Closed',       value: leads.filter(l => l.status === 'Closed').length,        color: '#27ae60' },
  ]

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh' }}>
      <AdminNavbar />
      <div className="leads-container">

        {/* Header */}
        <div className="leads-header">
          <div>
            <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', fontWeight: '700', margin: 0 }}>Leads</h1>
            <p style={{ color: '#8aafd4', marginBottom: 0, marginTop: '4px', fontSize: '0.82rem' }}>Manage customer inquiries</p>
          </div>
          <div className="leads-export-btns">
            <button onClick={() => exportToCSV(filtered, 'lazord-leads-filtered')} disabled={filtered.length === 0}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(39,174,96,0.15)', color: '#27ae60', border: '1px solid rgba(39,174,96,0.3)', borderRadius: '10px', padding: '9px 14px', fontSize: '0.82rem', fontWeight: '700', cursor: filtered.length === 0 ? 'not-allowed' : 'pointer', opacity: filtered.length === 0 ? 0.5 : 1, whiteSpace: 'nowrap' }}>
              📥 Export Shown ({filtered.length})
            </button>
            <button onClick={() => exportToCSV(leads, 'lazord-leads-all')} disabled={leads.length === 0}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(45,95,196,0.15)', color: '#4a90d9', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '10px', padding: '9px 14px', fontSize: '0.82rem', fontWeight: '700', cursor: leads.length === 0 ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}>
              📥 Export All ({leads.length})
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="leads-stats-grid">
          {stats.map((stat, i) => (
            <div key={i} style={{ backgroundColor: '#0d1f4e', border: `1px solid ${stat.color}30`, borderRadius: '12px', padding: '14px 16px', textAlign: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = stat.color; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${stat.color}30`; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{ color: stat.color, fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: '800', lineHeight: '1' }}>{stat.value}</div>
              <div style={{ color: '#8aafd4', fontSize: '0.72rem', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bulk Delete */}
        <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(231,76,60,0.2)', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: '700', margin: 0 }}>🗑️ Bulk Delete by Source</h3>
            <p style={{ color: '#8aafd4', fontSize: '0.75rem', margin: '4px 0 0' }}>Monthly cleanup — export first as backup!</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['WhatsApp', 'Phone', 'Website Popup', 'Contact Form', 'Property Inquiry', 'Walk In'].map(src => {
              const count = leads.filter(l => l.source === src).length
              const sc = sourceColor[src]
              const isDeleting = deletingSource === src
              return (
                <button key={src} onClick={() => deleteAllBySource(src)} disabled={count === 0 || isDeleting}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: count === 0 ? 'rgba(45,95,196,0.05)' : 'rgba(231,76,60,0.1)', color: count === 0 ? '#4a4a6a' : '#e74c3c', border: `1px solid ${count === 0 ? 'rgba(45,95,196,0.15)' : 'rgba(231,76,60,0.3)'}`, borderRadius: '8px', padding: '6px 12px', fontSize: '0.75rem', fontWeight: '600', cursor: count === 0 ? 'not-allowed' : 'pointer', opacity: count === 0 ? 0.5 : 1 }}>
                  <span>{sc?.icon}</span><span>{src}</span>
                  <span style={{ backgroundColor: 'rgba(231,76,60,0.2)', borderRadius: '10px', padding: '1px 6px', fontSize: '0.7rem', fontWeight: '800' }}>
                    {isDeleting ? '...' : count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div style={{ backgroundColor: message.includes('✅') ? 'rgba(39,174,96,0.15)' : 'rgba(231,76,60,0.15)', border: `1px solid ${message.includes('✅') ? 'rgba(39,174,96,0.3)' : 'rgba(231,76,60,0.3)'}`, borderRadius: '10px', padding: '10px 16px', color: message.includes('✅') ? '#27ae60' : '#e74c3c', marginBottom: '16px', fontWeight: '600', fontSize: '0.88rem' }}>
            {message}
          </div>
        )}

        {/* Status Filters */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ padding: '5px 12px', borderRadius: '20px', border: filter === s ? '1.5px solid #4a90d9' : '1.5px solid rgba(45,95,196,0.3)', backgroundColor: filter === s ? '#2d5fc4' : 'transparent', color: filter === s ? '#fff' : '#8aafd4', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              {s} {s !== 'All' && `(${leads.filter(l => l.status === s).length})`}
            </button>
          ))}
        </div>

        {/* Source Filters */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {sources.map(s => {
            const src = sourceColor[s]
            return (
              <button key={s} onClick={() => setSourceFilter(s)} style={{ padding: '4px 10px', borderRadius: '20px', border: sourceFilter === s ? `1.5px solid ${src?.color || '#4a90d9'}` : '1.5px solid rgba(45,95,196,0.2)', backgroundColor: sourceFilter === s ? (src?.bg || 'rgba(45,95,196,0.2)') : 'transparent', color: sourceFilter === s ? (src?.color || '#4a90d9') : '#8aafd4', fontSize: '0.72rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                {src?.icon} {s} {s !== 'All' && `(${leads.filter(l => l.source === s).length})`}
              </button>
            )
          })}
        </div>

        {/* Main Content */}
        <div className={`leads-grid ${selectedLead ? 'leads-grid-open' : ''}`}>

          {/* Table / Cards */}
          <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(45,95,196,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <h2 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: '700', margin: 0 }}>
                {filter === 'All' && sourceFilter === 'All' ? 'All Leads' : 'Filtered'} ({filtered.length})
              </h2>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#8aafd4', fontSize: '0.82rem' }}>🔍</span>
                  <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                    style={{ backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px', color: '#ffffff', padding: '7px 12px 7px 30px', fontSize: '0.82rem', outline: 'none', width: '140px' }} />
                </div>
                {filtered.length > 0 && (
                  <button onClick={deleteAllFiltered} disabled={deletingSource === 'all'}
                    style={{ backgroundColor: 'rgba(231,76,60,0.15)', color: '#e74c3c', border: '1px solid rgba(231,76,60,0.3)', borderRadius: '8px', padding: '7px 12px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    {deletingSource === 'all' ? 'Deleting...' : `🗑️ Delete (${filtered.length})`}
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>Loading...</div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</div>No leads found
              </div>
            ) : (
              <>
                {/* Mobile Cards */}
                <div className="leads-cards-mobile">
                  {filtered.map((lead) => (
                    <div key={lead._id}
                      onClick={() => setSelectedLead(selectedLead?._id === lead._id ? null : lead)}
                      style={{ padding: '14px 16px', borderBottom: '1px solid rgba(45,95,196,0.1)', cursor: 'pointer', backgroundColor: selectedLead?._id === lead._id ? 'rgba(45,95,196,0.15)' : 'transparent' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(45,95,196,0.3)', border: '1px solid rgba(74,144,217,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a90d9', fontWeight: '800', fontSize: '0.9rem', flexShrink: 0 }}>
                            {lead.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.88rem' }}>{lead.name}</div>
                            <div style={{ color: '#8aafd4', fontSize: '0.75rem' }}>{lead.phone}</div>
                          </div>
                        </div>
                        <select value={lead.status} onChange={e => { e.stopPropagation(); updateStatus(lead._id, e.target.value) }}
                          onClick={e => e.stopPropagation()}
                          style={{ backgroundColor: statusColor[lead.status]?.bg, color: statusColor[lead.status]?.color, border: `1px solid ${statusColor[lead.status]?.color}40`, borderRadius: '20px', padding: '3px 8px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer', outline: 'none' }}>
                          {['New', 'Contacted', 'In Progress', 'Closed', 'Lost'].map(s => (
                            <option key={s} value={s} style={{ backgroundColor: '#0d1f4e', color: '#fff' }}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {lead.source && (
                            <span style={{ backgroundColor: sourceColor[lead.source]?.bg, color: sourceColor[lead.source]?.color, padding: '2px 8px', borderRadius: '20px', fontSize: '0.68rem', fontWeight: '600' }}>
                              {sourceColor[lead.source]?.icon} {lead.source}
                            </span>
                          )}
                          <span style={{ color: '#4a4a6a', fontSize: '0.7rem', alignSelf: 'center' }}>
                            {new Date(lead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                          </span>
                        </div>
                        <button onClick={e => { e.stopPropagation(); deleteLead(lead._id) }}
                          style={{ backgroundColor: 'rgba(231,76,60,0.15)', color: '#e74c3c', border: '1px solid rgba(231,76,60,0.3)', borderRadius: '6px', padding: '4px 8px', fontSize: '0.75rem', cursor: 'pointer' }}>
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table */}
                <div className="leads-table-desktop" style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'rgba(45,95,196,0.1)' }}>
                        {['Lead', 'Contact', 'Source', 'Service', 'Status', 'Date', ''].map(h => (
                          <th key={h} style={{ padding: '11px 16px', color: '#8aafd4', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', fontWeight: '600', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((lead, i) => (
                        <tr key={lead._id} onClick={() => setSelectedLead(selectedLead?._id === lead._id ? null : lead)}
                          style={{ borderTop: '1px solid rgba(45,95,196,0.15)', backgroundColor: selectedLead?._id === lead._id ? 'rgba(45,95,196,0.15)' : i % 2 === 0 ? 'transparent' : 'rgba(45,95,196,0.04)', cursor: 'pointer', transition: 'background 0.15s' }}
                          onMouseEnter={e => { if (selectedLead?._id !== lead._id) e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.1)' }}
                          onMouseLeave={e => { if (selectedLead?._id !== lead._id) e.currentTarget.style.backgroundColor = i % 2 === 0 ? 'transparent' : 'rgba(45,95,196,0.04)' }}>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(45,95,196,0.3)', border: '1px solid rgba(74,144,217,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a90d9', fontWeight: '800', fontSize: '0.82rem', flexShrink: 0 }}>
                                {lead.name?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.85rem' }}>{lead.name}</div>
                                {lead.status === 'New' && <div style={{ color: '#e74c3c', fontSize: '0.65rem', fontWeight: '700' }}>● NEW</div>}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ color: '#8aafd4', fontSize: '0.8rem' }}>{lead.email}</div>
                            <div style={{ color: '#8aafd4', fontSize: '0.8rem' }}>{lead.phone}</div>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            {lead.source ? (
                              <span style={{ backgroundColor: sourceColor[lead.source]?.bg, color: sourceColor[lead.source]?.color, border: `1px solid ${sourceColor[lead.source]?.color}40`, borderRadius: '20px', padding: '3px 10px', fontSize: '0.72rem', fontWeight: '700', whiteSpace: 'nowrap' }}>
                                {sourceColor[lead.source]?.icon} {lead.source}
                              </span>
                            ) : '—'}
                          </td>
                          <td style={{ padding: '12px 16px', color: '#8aafd4', fontSize: '0.8rem' }}>{lead.service}</td>
                          <td style={{ padding: '12px 16px' }} onClick={e => e.stopPropagation()}>
                            <select value={lead.status} onChange={e => updateStatus(lead._id, e.target.value)}
                              style={{ backgroundColor: statusColor[lead.status]?.bg, color: statusColor[lead.status]?.color, border: `1px solid ${statusColor[lead.status]?.color}40`, borderRadius: '20px', padding: '3px 10px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', outline: 'none' }}>
                              {['New', 'Contacted', 'In Progress', 'Closed', 'Lost'].map(s => (
                                <option key={s} value={s} style={{ backgroundColor: '#0d1f4e', color: '#ffffff' }}>{s}</option>
                              ))}
                            </select>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#8aafd4', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                            {new Date(lead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td style={{ padding: '12px 16px' }} onClick={e => e.stopPropagation()}>
                            <button onClick={() => deleteLead(lead._id)} style={{ backgroundColor: 'rgba(231,76,60,0.15)', color: '#e74c3c', border: '1px solid rgba(231,76,60,0.3)', borderRadius: '6px', padding: '5px 10px', fontSize: '0.78rem', cursor: 'pointer' }}>🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          {/* Lead Detail Panel */}
          {selectedLead && (
            <div className="lead-detail-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', margin: 0 }}>📋 Lead Detail</h3>
                <button onClick={() => setSelectedLead(null)} style={{ background: 'transparent', border: 'none', color: '#8aafd4', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'rgba(45,95,196,0.3)', border: '2px solid rgba(74,144,217,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: '800', color: '#4a90d9', marginBottom: '14px' }}>
                {selectedLead.name?.charAt(0).toUpperCase()}
              </div>
              <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.05rem', marginBottom: '4px' }}>{selectedLead.name}</div>
              <div style={{ color: '#8aafd4', fontSize: '0.82rem', marginBottom: '20px' }}>
                {new Date(selectedLead.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
              {[
                { icon: '📧', label: 'Email',    value: selectedLead.email },
                { icon: '📞', label: 'Phone',    value: selectedLead.phone },
                { icon: '🏷️', label: 'Source',   value: selectedLead.source },
                { icon: '🏠', label: 'Property', value: selectedLead.property?.title || 'General Inquiry' },
              ].map(row => (
                <div key={row.label} style={{ marginBottom: '14px' }}>
                  <div style={{ color: '#8aafd4', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{row.icon} {row.label}</div>
                  <div style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: '600', wordBreak: 'break-all' }}>{row.value}</div>
                </div>
              ))}
              {selectedLead.message && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ color: '#8aafd4', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>💬 Message</div>
                  <div style={{ backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '10px', padding: '12px', color: '#c0d4f0', fontSize: '0.86rem', lineHeight: '1.6' }}>
                    {selectedLead.message}
                  </div>
                </div>
              )}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#8aafd4', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>📊 Update Status</div>
                <select value={selectedLead.status} onChange={e => updateStatus(selectedLead._id, e.target.value)}
                  style={{ width: '100%', backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px', color: '#ffffff', padding: '10px 14px', fontSize: '0.88rem', outline: 'none', cursor: 'pointer' }}>
                  {['New', 'Contacted', 'In Progress', 'Closed', 'Lost'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href={`mailto:${selectedLead.email}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.2)', color: '#4a90d9', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px', padding: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem' }}>📧 Send Email</a>
                <a href={`https://wa.me/${selectedLead.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'rgba(37,211,102,0.15)', color: '#25d366', border: '1px solid rgba(37,211,102,0.3)', borderRadius: '8px', padding: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem' }}>💬 WhatsApp</a>
                <a href={`tel:${selectedLead.phone}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'rgba(39,174,96,0.15)', color: '#27ae60', border: '1px solid rgba(39,174,96,0.3)', borderRadius: '8px', padding: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem' }}>📞 Call Now</a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .leads-container { padding: 16px 14px; }
        .leads-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 10px; }
        .leads-export-btns { display: flex; gap: 8px; flex-wrap: wrap; }
        .leads-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
        .leads-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        .leads-grid-open { grid-template-columns: 1fr; }
        .leads-cards-mobile { display: block; }
        .leads-table-desktop { display: none; }
        .lead-detail-panel { background-color: #0d1f4e; border: 1px solid rgba(45,95,196,0.3); border-radius: 16px; padding: 20px; }

        @media (min-width: 640px) {
          .leads-container { padding: 20px 18px; }
          .leads-stats-grid { grid-template-columns: repeat(5, 1fr); gap: 12px; }
        }

        @media (min-width: 1024px) {
          .leads-container { padding: 32px 30px; }
          .leads-grid-open { grid-template-columns: 1fr 360px; }
          .leads-cards-mobile { display: none; }
          .leads-table-desktop { display: block; }
          .lead-detail-panel { position: sticky; top: 80px; }
        }
      `}</style>
    </div>
  )
}

export default AdminLeads