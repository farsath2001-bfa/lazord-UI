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

const AdminLeads = () => {
  const { token } = useAdmin()
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [message, setMessage] = useState('')

  const config = { headers: { Authorization: `Bearer ${token}` } }

  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/leads`, config)
      setLeads(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLeads() }, [])

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/leads/${id}`, { status }, config)
      setMessage('✅ Status updated!')
      fetchLeads()
    } catch (err) {
      setMessage('❌ Update failed')
    }
    setTimeout(() => setMessage(''), 2000)
  }

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/leads/${id}`, config)
      setMessage('✅ Lead deleted!')
      fetchLeads()
    } catch (err) {
      setMessage('❌ Delete failed')
    }
    setTimeout(() => setMessage(''), 2000)
  }

  const statuses = ['All', 'New', 'Contacted', 'In Progress', 'Closed', 'Lost']
  const filtered = filter === 'All' ? leads : leads.filter(l => l.status === filter)

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh' }}>
      <AdminNavbar />
      <div style={{ padding: '40px 30px' }}>

        <h1 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: '700', marginBottom: '8px' }}>Leads</h1>
        <p style={{ color: '#8aafd4', marginBottom: '28px' }}>Manage customer inquiries</p>

        {/* Message */}
        {message && (
          <div style={{ backgroundColor: message.includes('✅') ? 'rgba(39,174,96,0.15)' : 'rgba(231,76,60,0.15)', border: `1px solid ${message.includes('✅') ? 'rgba(39,174,96,0.3)' : 'rgba(231,76,60,0.3)'}`, borderRadius: '10px', padding: '12px 20px', color: message.includes('✅') ? '#27ae60' : '#e74c3c', marginBottom: '20px', fontWeight: '600' }}>
            {message}
          </div>
        )}

        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: '8px 18px', borderRadius: '20px', border: filter === s ? '1.5px solid #4a90d9' : '1.5px solid rgba(45,95,196,0.3)',
              backgroundColor: filter === s ? '#2d5fc4' : 'transparent',
              color: filter === s ? '#fff' : '#8aafd4',
              fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              {s} {s !== 'All' && `(${leads.filter(l => l.status === s).length})`}
            </button>
          ))}
        </div>

        {/* Leads Table */}
        <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(45,95,196,0.2)' }}>
            <h2 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>
              {filter === 'All' ? 'All Leads' : `${filter} Leads`} ({filtered.length})
            </h2>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>Loading...</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>No leads found</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(45,95,196,0.1)' }}>
                    {['Name', 'Email', 'Phone', 'Service', 'Message', 'Status', 'Date', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', color: '#8aafd4', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', fontWeight: '600', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead, i) => (
                    <tr key={lead._id} style={{ borderTop: '1px solid rgba(45,95,196,0.15)', backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(45,95,196,0.04)' }}>
                      <td style={{ padding: '14px 16px', color: '#ffffff', fontSize: '0.88rem', fontWeight: '600', whiteSpace: 'nowrap' }}>{lead.name}</td>
                      <td style={{ padding: '14px 16px', color: '#8aafd4', fontSize: '0.82rem' }}>{lead.email}</td>
                      <td style={{ padding: '14px 16px', color: '#8aafd4', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{lead.phone}</td>
                      <td style={{ padding: '14px 16px', color: '#8aafd4', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{lead.service}</td>
                      <td style={{ padding: '14px 16px', color: '#8aafd4', fontSize: '0.82rem', maxWidth: '200px' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.message || '—'}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <select
                          value={lead.status}
                          onChange={e => updateStatus(lead._id, e.target.value)}
                          style={{
                            backgroundColor: statusColor[lead.status]?.bg,
                            color: statusColor[lead.status]?.color,
                            border: `1px solid ${statusColor[lead.status]?.color}40`,
                            borderRadius: '20px', padding: '4px 10px',
                            fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', outline: 'none'
                          }}
                        >
                          {['New', 'Contacted', 'In Progress', 'Closed', 'Lost'].map(s => (
                            <option key={s} value={s} style={{ backgroundColor: '#0d1f4e', color: '#ffffff' }}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#8aafd4', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <button onClick={() => deleteLead(lead._id)} style={{ backgroundColor: 'rgba(231,76,60,0.15)', color: '#e74c3c', border: '1px solid rgba(231,76,60,0.3)', borderRadius: '6px', padding: '6px 12px', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}>
                          🗑️ Delete
                        </button>
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

export default AdminLeads