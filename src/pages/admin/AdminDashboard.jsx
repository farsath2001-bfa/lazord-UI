import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AdminNavbar from '../../components/admin/AdminNavbar'
import { useAdmin } from '../../context/AdminContext'

const StatCard = ({ icon, title, value, color, link }) => (
  <Link to={link} style={{ textDecoration: 'none' }}>
    <div style={{
      backgroundColor: '#0d1f4e',
      border: `1px solid ${color}40`,
      borderRadius: '16px',
      padding: '28px 24px',
      transition: 'all 0.25s ease',
      cursor: 'pointer'
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{icon}</div>
      <div style={{ color: '#8aafd4', fontSize: '0.82rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</div>
      <div style={{ color: '#ffffff', fontSize: '2.2rem', fontWeight: '800' }}>{value}</div>
    </div>
  </Link>
)

const AdminDashboard = () => {
  const { token } = useAdmin()
  const [stats, setStats] = useState({ properties: 0, leads: 0, newLeads: 0 })
  const [recentLeads, setRecentLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const [propsRes, leadsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/properties`, config),
          axios.get(`${import.meta.env.VITE_API_URL}/api/leads`, config)
        ])
        const leads = leadsRes.data.data
        setStats({
          properties: propsRes.data.count,
          leads: leads.length,
          newLeads: leads.filter(l => l.status === 'New').length
        })
        setRecentLeads(leads.slice(0, 5))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [token])

  const statusColor = {
    'New':         '#4a90d9',
    'Contacted':   '#f1c40f',
    'In Progress': '#e67e22',
    'Closed':      '#27ae60',
    'Lost':        '#e74c3c'
  }

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh' }}>
      <AdminNavbar />
      <div style={{ padding: '40px 30px' }}>

        <h1 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: '700', marginBottom: '8px' }}>
          Dashboard
        </h1>
        <p style={{ color: '#8aafd4', marginBottom: '36px' }}>
          Welcome back! Here's your overview.
        </p>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <StatCard icon="🏠" title="Total Properties" value={loading ? '...' : stats.properties} color="#2d5fc4" link="/admin/properties" />
          <StatCard icon="👥" title="Total Leads"      value={loading ? '...' : stats.leads}      color="#27ae60" link="/admin/leads" />
          <StatCard icon="🔔" title="New Leads"        value={loading ? '...' : stats.newLeads}   color="#e67e22" link="/admin/leads" />
        </div>

        {/* Recent Leads */}
        <div style={{
          backgroundColor: '#0d1f4e',
          border: '1px solid rgba(45,95,196,0.25)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(45,95,196,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>Recent Leads</h2>
            <Link to="/admin/leads" style={{ color: '#4a90d9', fontSize: '0.85rem', textDecoration: 'none' }}>View All →</Link>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>Loading...</div>
          ) : recentLeads.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>No leads yet</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(45,95,196,0.1)' }}>
                  {['Name', 'Email', 'Phone', 'Service', 'Status', 'Date'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', color: '#8aafd4', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', fontWeight: '600' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead, i) => (
                  <tr key={lead._id} style={{ borderTop: '1px solid rgba(45,95,196,0.15)', backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(45,95,196,0.04)' }}>
                    <td style={{ padding: '14px 20px', color: '#ffffff', fontSize: '0.88rem', fontWeight: '600' }}>{lead.name}</td>
                    <td style={{ padding: '14px 20px', color: '#8aafd4', fontSize: '0.85rem' }}>{lead.email}</td>
                    <td style={{ padding: '14px 20px', color: '#8aafd4', fontSize: '0.85rem' }}>{lead.phone}</td>
                    <td style={{ padding: '14px 20px', color: '#8aafd4', fontSize: '0.85rem' }}>{lead.service}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ backgroundColor: `${statusColor[lead.status]}20`, color: statusColor[lead.status], padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', color: '#8aafd4', fontSize: '0.82rem' }}>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard