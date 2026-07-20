import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import AdminNavbar from '../../components/admin/AdminNavbar'
import { useAdmin } from '../../context/AdminContext'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

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

const statusColor = {
  'New':         '#4a90d9',
  'Contacted':   '#f1c40f',
  'In Progress': '#e67e22',
  'Closed':      '#27ae60',
  'Lost':        '#e74c3c'
}

const sourceIcon = {
  'Property Inquiry': '🏠',
  'Contact Form':     '📋',
  'WhatsApp':         '💬',
  'Phone':            '📞',
  'Website Popup':    '🔔',
  'Walk In':          '🚶',
}

const AdminDashboard = () => {
  const { token } = useAdmin()
  const [stats, setStats] = useState({ properties: 0, leads: 0, newLeads: 0, available: 0, closed: 0, whatsapp: 0 })
  const [recentLeads, setRecentLeads] = useState([])
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [mapFilter, setMapFilter] = useState('All')

  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const [propsRes, leadsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/properties`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/leads`, config)
        ])
        const leads = leadsRes.data.data
        const props = propsRes.data.data || []
        setStats({
          properties: props.length,
          leads:      leads.length,
          newLeads:   leads.filter(l => l.status === 'New').length,
          available:  props.filter(p => p.status === 'Available').length,
          closed:     leads.filter(l => l.status === 'Closed').length,
          whatsapp:   leads.filter(l => l.source === 'WhatsApp').length,
        })
        setRecentLeads(leads.slice(0, 6))
        setProperties(props)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [token])

  const filteredProperties = mapFilter === 'All'
    ? properties
    : properties.filter(p => p.type === mapFilter)

  const statCards = [
    { icon: '🏠', label: 'Total Properties', value: stats.properties, color: '#2d5fc4', link: '/admin/properties' },
    { icon: '✅', label: 'Available',         value: stats.available,  color: '#27ae60', link: '/admin/properties' },
    { icon: '👥', label: 'Total Leads',       value: stats.leads,      color: '#8e44ad', link: '/admin/leads' },
    { icon: '🔔', label: 'New Leads',         value: stats.newLeads,   color: '#e67e22', link: '/admin/leads' },
    { icon: '💬', label: 'WhatsApp Leads',    value: stats.whatsapp,   color: '#25d366', link: '/admin/leads' },
    { icon: '🏆', label: 'Closed Deals',      value: stats.closed,     color: '#f1c40f', link: '/admin/leads' },
  ]

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh' }}>
      <AdminNavbar />
      <div style={{ padding: '32px 30px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h1 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: '700', margin: 0 }}>Dashboard</h1>
            <p style={{ color: '#8aafd4', margin: '4px 0 0', fontSize: '0.88rem' }}>📅 {today}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/admin/properties"
              style={{ backgroundColor: '#2d5fc4', color: '#fff', textDecoration: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '0.85rem', fontWeight: '700' }}>
              + Add Property
            </Link>
          </div>
        </div>

        {/* Stat Cards — 6 compact cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {statCards.map((card, i) => (
            <Link key={i} to={card.link} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: '#0d1f4e', border: `1px solid ${card.color}30`, borderRadius: '14px', padding: '20px 20px', transition: 'all 0.25s ease', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = card.color; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${card.color}20` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${card.color}30`; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: `${card.color}20`, border: `1px solid ${card.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    {card.icon}
                  </div>
                  <div style={{ color: card.color, fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>
                    View →
                  </div>
                </div>
                <div style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: '800', lineHeight: '1', marginBottom: '4px' }}>
                  {loading ? '—' : stats[Object.keys(stats)[i]] !== undefined ? card.value : '—'}
                </div>
                <div style={{ color: '#8aafd4', fontSize: '0.78rem' }}>{card.label}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Properties Map */}
        <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', overflow: 'hidden', marginBottom: '28px' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(45,95,196,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', margin: 0 }}>🗺️ Properties Map</h2>
              <p style={{ color: '#8aafd4', fontSize: '0.78rem', margin: '2px 0 0' }}>{filteredProperties.length} properties shown</p>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['All', 'Buy', 'Rent', 'Off Plan'].map(f => (
                <button key={f} onClick={() => setMapFilter(f)}
                  style={{ backgroundColor: mapFilter === f ? '#2d5fc4' : 'rgba(45,95,196,0.15)', color: mapFilter === f ? '#fff' : '#8aafd4', border: `1px solid ${mapFilter === f ? '#2d5fc4' : 'rgba(45,95,196,0.3)'}`, borderRadius: '20px', padding: '5px 14px', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div style={{ height: '400px' }}>
            {loading ? (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8aafd4' }}>Loading map...</div>
            ) : (
              <MapContainer center={[25.1972, 55.2744]} zoom={11} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
                <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filteredProperties.map(p => (
                  <Marker key={p._id} position={getCoords(p.location, p.community)}>
                    <Popup>
                      <div style={{ minWidth: '160px' }}>
                        {p.image && <img src={p.image} alt={p.title} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' }} />}
                        <strong style={{ display: 'block', fontSize: '0.85rem', marginBottom: '3px' }}>{p.title}</strong>
                        <span style={{ color: '#666', fontSize: '0.78rem', display: 'block', marginBottom: '3px' }}>📍 {p.location}</span>
                        <span style={{ color: '#2d5fc4', fontWeight: '700', fontSize: '0.85rem' }}>{formatPrice(p.price, p.type)}</span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
          <div style={{ padding: '12px 24px', borderTop: '1px solid rgba(45,95,196,0.2)', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {[['Buy', '#2d5fc4'], ['Rent', '#27ae60'], ['Off Plan', '#8e44ad']].map(([label, color]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
                <span style={{ color: '#8aafd4', fontSize: '0.75rem' }}>{label}</span>
              </div>
            ))}
            <span style={{ color: '#4a4a6a', fontSize: '0.75rem', marginLeft: 'auto' }}>Click a marker to see details</span>
          </div>
        </div>

        {/* Recent Leads */}
        <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(45,95,196,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', margin: 0 }}>Recent Leads</h2>
            <Link to="/admin/leads" style={{ color: '#4a90d9', fontSize: '0.85rem', textDecoration: 'none', fontWeight: '600' }}>View All →</Link>
          </div>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>Loading...</div>
          ) : recentLeads.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📭</div>
              No leads yet
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(45,95,196,0.1)' }}>
                    {['Lead', 'Contact', 'Source', 'Service', 'Status', 'Date'].map(h => (
                      <th key={h} style={{ padding: '11px 16px', color: '#8aafd4', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', fontWeight: '600', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead, i) => (
                    <tr key={lead._id} style={{ borderTop: '1px solid rgba(45,95,196,0.15)', backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(45,95,196,0.04)', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = i % 2 === 0 ? 'transparent' : 'rgba(45,95,196,0.04)'}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {/* Avatar initial */}
                          <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(45,95,196,0.3)', border: '1px solid rgba(74,144,217,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a90d9', fontWeight: '800', fontSize: '0.85rem', flexShrink: 0 }}>
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
                        <span style={{ backgroundColor: 'rgba(45,95,196,0.15)', color: '#4a90d9', padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
                          {sourceIcon[lead.source] || '📌'} {lead.source || '—'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#8aafd4', fontSize: '0.8rem' }}>{lead.service}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ backgroundColor: `${statusColor[lead.status]}20`, color: statusColor[lead.status], padding: '4px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '700' }}>
                          {lead.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#8aafd4', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                        {new Date(lead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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