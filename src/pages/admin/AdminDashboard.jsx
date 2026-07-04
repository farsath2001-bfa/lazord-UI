import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import AdminNavbar from '../../components/admin/AdminNavbar'
import { useAdmin } from '../../context/AdminContext'

// Fix leaflet marker icons in Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Dubai community coordinates
const DUBAI_LOCATIONS = {
  'downtown dubai':      [25.1972, 55.2744],
  'dubai marina':        [25.0805, 55.1403],
  'palm jumeirah':       [25.1124, 55.1390],
  'business bay':        [25.1850, 55.2650],
  'jumeirah':            [25.2048, 55.2408],
  'deira':               [25.2697, 55.3094],
  'jbr':                 [25.0772, 55.1328],
  'dubai creek harbour': [25.2078, 55.3314],
  'dubai hills':         [25.1089, 55.2342],
  'arabian ranches':     [25.0494, 55.2694],
  'jumeirah village':    [25.0583, 55.2103],
  'jvc':                 [25.0583, 55.2103],
  'mirdif':              [25.2269, 55.4148],
  'al barsha':           [25.1109, 55.1986],
  'silicon oasis':       [25.1178, 55.3817],
  'sport city':          [25.0481, 55.2296],
  'motor city':          [25.0432, 55.2206],
  'discovery gardens':   [25.0344, 55.1483],
  'al quoz':             [25.1384, 55.2228],
  'bur dubai':           [25.2532, 55.2972],
  'karama':              [25.2358, 55.3050],
}

const getCoords = (location = '', community = '') => {
  const search = `${location} ${community}`.toLowerCase()
  for (const [key, coords] of Object.entries(DUBAI_LOCATIONS)) {
    if (search.includes(key)) return coords
  }
  return [25.2048, 55.2708]
}

const formatPrice = (price, type) => {
  if (type === 'Rent') return `AED ${price?.toLocaleString()} /yr`
  if (price >= 1000000) return `AED ${(price / 1000000).toFixed(1)}M`
  return `AED ${price?.toLocaleString()}`
}

const StatCard = ({ icon, title, value, color, link }) => (
  <Link to={link} style={{ textDecoration: 'none' }}>
    <div style={{ backgroundColor: '#0d1f4e', border: `1px solid ${color}40`, borderRadius: '16px', padding: '28px 24px', transition: 'all 0.25s ease', cursor: 'pointer' }}
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
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [mapFilter, setMapFilter] = useState('All')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const [propsRes, leadsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/properties`, config),
          axios.get(`${import.meta.env.VITE_API_URL}/api/leads`, config)
        ])
        const leads = leadsRes.data.data
        const props = propsRes.data.data || []
        setStats({
          properties: propsRes.data.count,
          leads: leads.length,
          newLeads: leads.filter(l => l.status === 'New').length
        })
        setRecentLeads(leads.slice(0, 5))
        setProperties(props)
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

  const typeColor = {
    'Buy':      '#2d5fc4',
    'Rent':     '#27ae60',
    'Off Plan': '#8e44ad',
  }

  const filteredProperties = mapFilter === 'All'
    ? properties
    : properties.filter(p => p.type === mapFilter)

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh' }}>
      <AdminNavbar />
      <div style={{ padding: '40px 30px' }}>

        <h1 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: '700', marginBottom: '8px' }}>Dashboard</h1>
        <p style={{ color: '#8aafd4', marginBottom: '36px' }}>Welcome back! Here's your overview.</p>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <StatCard icon="🏠" title="Total Properties" value={loading ? '...' : stats.properties} color="#2d5fc4" link="/admin/properties" />
          <StatCard icon="👥" title="Total Leads"      value={loading ? '...' : stats.leads}      color="#27ae60" link="/admin/leads" />
          <StatCard icon="🔔" title="New Leads"        value={loading ? '...' : stats.newLeads}   color="#e67e22" link="/admin/leads" />
        </div>

        {/* ── PROPERTIES MAP ── */}
        <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', overflow: 'hidden', marginBottom: '40px' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(45,95,196,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>🗺️ Properties Map</h2>
              <p style={{ color: '#8aafd4', fontSize: '0.82rem', margin: '4px 0 0' }}>{filteredProperties.length} properties shown</p>
            </div>
            {/* Filter buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'Buy', 'Rent', 'Off Plan'].map(f => (
                <button key={f} onClick={() => setMapFilter(f)}
                  style={{
                    backgroundColor: mapFilter === f ? '#2d5fc4' : 'rgba(45,95,196,0.15)',
                    color: mapFilter === f ? '#fff' : '#8aafd4',
                    border: `1px solid ${mapFilter === f ? '#2d5fc4' : 'rgba(45,95,196,0.3)'}`,
                    borderRadius: '20px', padding: '5px 14px',
                    fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >{f}</button>
              ))}
            </div>
          </div>

          {/* Map */}
          <div style={{ height: '480px', position: 'relative' }}>
            {loading ? (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8aafd4' }}>Loading map...</div>
            ) : (
              <MapContainer
                center={[25.1972, 55.2744]}
                zoom={11}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredProperties.map((p) => {
                  const coords = getCoords(p.location, p.community)
                  return (
                    <Marker key={p._id} position={coords}>
                      <Popup>
                        <div style={{ minWidth: '180px' }}>
                          {p.image && (
                            <img src={p.image} alt={p.title} style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' }} />
                          )}
                          <strong style={{ display: 'block', fontSize: '0.88rem', marginBottom: '4px' }}>{p.title}</strong>
                          <span style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>📍 {p.location}</span>
                          <span style={{ color: typeColor[p.type] || '#2d5fc4', fontWeight: '700', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
                            {formatPrice(p.price, p.type)}
                          </span>
                          <span style={{ backgroundColor: p.status === 'Available' ? '#e8f8f0' : '#fdecea', color: p.status === 'Available' ? '#27ae60' : '#e74c3c', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: '700' }}>
                            {p.status}
                          </span>
                        </div>
                      </Popup>
                    </Marker>
                  )
                })}
              </MapContainer>
            )}
          </div>

          {/* Map legend */}
          <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(45,95,196,0.2)', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {[['Buy', '#2d5fc4'], ['Rent', '#27ae60'], ['Off Plan', '#8e44ad']].map(([label, color]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: color }} />
                <span style={{ color: '#8aafd4', fontSize: '0.78rem' }}>{label}</span>
              </div>
            ))}
            <span style={{ color: '#4a4a6a', fontSize: '0.78rem', marginLeft: 'auto' }}>Click a marker to see property details</span>
          </div>
        </div>

        {/* Recent Leads */}
        <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', overflow: 'hidden' }}>
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

      <style>{`
        .leaflet-container { background: #0d1f4e; }
        .leaflet-popup-content-wrapper { border-radius: 10px; }
        .leaflet-popup-content { margin: 12px 14px; }
      `}</style>
    </div>
  )
}

export default AdminDashboard