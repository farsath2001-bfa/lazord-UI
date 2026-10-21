import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { animate } from 'framer-motion'
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

const createColoredIcon = (color) => L.divIcon({
  className: '',
  html: `<div style="
    width: 28px; height: 28px; border-radius: 50% 50% 50% 0;
    background: ${color}; border: 3px solid #fff;
    transform: rotate(-45deg);
    box-shadow: 0 4px 12px ${color}80;
  "></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -30],
})

const markerColors = {
  'Buy':      '#2d5fc4',
  'Rent':     '#27ae60',
  'Off Plan': '#8e44ad',
}

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
  'difc':                [25.2116, 55.2796],
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

const PIPELINE = ['New', 'Contacted', 'In Progress', 'Closed', 'Lost']

// Counts up from 0 without re-rendering the whole page.
const Count = ({ value }) => {
  const ref = useRef(null)
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.1,
      ease: 'easeOut',
      onUpdate: v => { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString('en-US') },
    })
    return () => controls.stop()
  }, [value])
  return <span ref={ref}>0</span>
}

const greeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

const AdminDashboard = () => {
  const { token, admin } = useAdmin()
  const [allLeads, setAllLeads] = useState([])
  const [stats, setStats] = useState({ properties: 0, leads: 0, newLeads: 0, available: 0, closed: 0, whatsapp: 0 })
  const [recentLeads, setRecentLeads] = useState([])
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [mapFilter, setMapFilter] = useState('All')

  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  useEffect(() => {
    const fetchData = async () => {
      if (!token) { setLoading(false); return }
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const [propsRes, leadsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/properties`, config),
          axios.get(`${import.meta.env.VITE_API_URL}/api/leads`, config)
        ])
        const leads = leadsRes.data.data || []
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
        setAllLeads(leads)
        setProperties(props)
      } catch (err) {
        console.error('Dashboard error:', err)
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
      <div className="dash-container">

        {/* Header */}
        <div className="dash-header">
          <div>
            <div className="dash-eyebrow">✦ {greeting()}</div>
            <h1 className="dash-title">{admin?.name || 'Admin'}</h1>
            <p style={{ color: '#8aafd4', margin: '4px 0 0', fontSize: '0.82rem' }}>📅 {today}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link to="/admin/leads" className="dash-ghost-btn">View leads</Link>
            <Link to="/admin/properties" className="dash-add-btn">+ Add Property</Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="dash-stats-grid">
          {statCards.map((card, i) => (
            <Link key={i} to={card.link} style={{ textDecoration: 'none' }}>
              <div className="dash-stat-card" style={{ '--accent': card.color }}>
                <div className="dash-stat-top">
                  <div className="dash-stat-icon">{card.icon}</div>
                  <span className="dash-stat-view">View →</span>
                </div>
                <div className="dash-stat-value">{loading ? '—' : <Count value={card.value} />}</div>
                <div className="dash-stat-label">{card.label}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pipeline + sources */}
        <div className="dash-two">
          <div className="dash-card dash-pad">
            <h2 className="dash-h2">Lead pipeline</h2>
            {allLeads.length === 0 ? (
              <p style={{ color: '#8aafd4', fontSize: '0.85rem', margin: 0 }}>{loading ? 'Loading…' : 'No leads yet'}</p>
            ) : (
              <>
                <div className="dash-bar">
                  {PIPELINE.map(s => {
                    const n = allLeads.filter(l => l.status === s).length
                    return n > 0 ? <div key={s} title={`${s}: ${n}`} style={{ flex: n, background: statusColor[s] }} /> : null
                  })}
                </div>
                <div className="dash-legend">
                  {PIPELINE.map(s => (
                    <div key={s} className="dash-legend-item">
                      <span style={{ width: 9, height: 9, borderRadius: '50%', background: statusColor[s], display: 'inline-block' }} />
                      <span>{s}</span>
                      <strong>{allLeads.filter(l => l.status === s).length}</strong>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="dash-card dash-pad">
            <h2 className="dash-h2">Where leads come from</h2>
            {allLeads.length === 0 ? (
              <p style={{ color: '#8aafd4', fontSize: '0.85rem', margin: 0 }}>{loading ? 'Loading…' : 'No leads yet'}</p>
            ) : (
              Object.entries(allLeads.reduce((acc, l) => { const k = l.source || 'Other'; acc[k] = (acc[k] || 0) + 1; return acc }, {}))
                .sort((x, y) => y[1] - x[1])
                .slice(0, 5)
                .map(([src, n]) => (
                  <div key={src} className="dash-src">
                    <div className="dash-src-row">
                      <span>{sourceIcon[src] || '📌'} {src}</span>
                      <strong>{n}</strong>
                    </div>
                    <div className="dash-src-track"><div style={{ width: `${(n / allLeads.length) * 100}%` }} /></div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Map */}
        <div className="dash-card" style={{ marginBottom: '20px' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(45,95,196,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>🗺️ Properties Map</h2>
              <p style={{ color: '#8aafd4', fontSize: '0.75rem', margin: '2px 0 0' }}>{filteredProperties.length} properties across Dubai</p>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['All', 'Buy', 'Rent', 'Off Plan'].map(f => (
                <button key={f} onClick={() => setMapFilter(f)}
                  style={{ backgroundColor: mapFilter === f ? (markerColors[f] || '#2d5fc4') : 'rgba(45,95,196,0.15)', color: '#fff', border: 'none', borderRadius: '20px', padding: '4px 12px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', opacity: mapFilter === f ? 1 : 0.6 }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: '300px', position: 'relative' }}>
            {loading ? (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8aafd4', backgroundColor: '#060f26' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</div>
                  <p style={{ marginTop: '8px', fontSize: '0.85rem' }}>Loading map...</p>
                </div>
              </div>
            ) : (
              <MapContainer center={[25.1972, 55.2744]} zoom={10} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                  className="osm-dark-tiles"
                  maxZoom={19}
                />
                {filteredProperties.map(p => {
                  const coords = getCoords(p.location, p.community)
                  const color = markerColors[p.type] || '#4a90d9'
                  return (
                    <Marker key={p._id} position={coords} icon={createColoredIcon(color)}>
                      <Popup>
                        <div style={{ minWidth: '160px' }}>
                          {p.image && <img src={p.image} alt={p.title} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' }} />}
                          <strong style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>{p.title}</strong>
                          <span style={{ color: '#666', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>📍 {p.location}</span>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color, fontWeight: '700', fontSize: '0.85rem' }}>{formatPrice(p.price, p.type)}</span>
                            <span style={{ backgroundColor: color + '20', color, padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '700' }}>{p.type}</span>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  )
                })}
              </MapContainer>
            )}
          </div>

          <div style={{ padding: '10px 20px', borderTop: '1px solid rgba(45,95,196,0.2)', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            {Object.entries(markerColors).map(([type, color]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
                <span style={{ color: '#8aafd4', fontSize: '0.72rem' }}>{type} ({properties.filter(p => p.type === type).length})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="dash-card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(45,95,196,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Recent Leads</h2>
            <Link to="/admin/leads" style={{ color: '#4a90d9', fontSize: '0.82rem', textDecoration: 'none', fontWeight: '600' }}>View All →</Link>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>Loading...</div>
          ) : recentLeads.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#8aafd4' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📭</div>No leads yet
            </div>
          ) : (
            <>
              {/* Mobile Cards */}
              <div className="leads-mobile">
                {recentLeads.map((lead) => (
                  <div key={lead._id} style={{ padding: '14px 16px', borderBottom: '1px solid rgba(45,95,196,0.1)' }}>
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
                      <span style={{ backgroundColor: `${statusColor[lead.status]}20`, color: statusColor[lead.status], padding: '3px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '700', whiteSpace: 'nowrap' }}>
                        {lead.status}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ backgroundColor: 'rgba(45,95,196,0.15)', color: '#4a90d9', padding: '2px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '600' }}>
                        {sourceIcon[lead.source] || '📌'} {lead.source || '—'}
                      </span>
                      <span style={{ color: '#8aafd4', fontSize: '0.72rem', alignSelf: 'center' }}>
                        {new Date(lead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="leads-desktop" style={{ overflowX: 'auto' }}>
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
                      <tr key={lead._id}
                        style={{ borderTop: '1px solid rgba(45,95,196,0.15)', backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(45,95,196,0.04)', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = i % 2 === 0 ? 'transparent' : 'rgba(45,95,196,0.04)'}>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
            </>
          )}
        </div>

      </div>

      <style>{`
        .dash-container { padding: 20px 16px; }
        .dash-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px; }
        .dash-eyebrow { color: #e0bf6a; font-size: 0.72rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 700; margin-bottom: 4px; }
        .dash-title { color: #fff; font-size: clamp(1.4rem, 4vw, 2rem); font-weight: 800; margin: 0; }
        .dash-add-btn { background: linear-gradient(135deg, #e9d6a3, #c9a24b); color: #0a1630; text-decoration: none; border-radius: 10px; padding: 10px 18px; font-size: 0.85rem; font-weight: 800; white-space: nowrap; box-shadow: 0 8px 20px -8px rgba(201,162,75,0.7); }
        .dash-add-btn:hover { transform: translateY(-2px); color: #0a1630; }
        .dash-ghost-btn { color: #cfe0f7; text-decoration: none; border-radius: 10px; padding: 10px 18px; font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(138,175,212,0.35); white-space: nowrap; }
        .dash-ghost-btn:hover { background: rgba(74,144,217,0.12); color: #fff; }
        .dash-card { background: linear-gradient(160deg, #0f2456, #0a1840); border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; overflow: hidden; box-shadow: 0 14px 34px -22px rgba(0,0,0,0.8); }
        .dash-pad { padding: 20px; }
        .dash-h2 { color: #fff; font-size: 0.95rem; font-weight: 700; margin: 0 0 16px; }
        .dash-two { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 20px; }
        .dash-bar { display: flex; gap: 3px; height: 14px; border-radius: 10px; overflow: hidden; margin-bottom: 16px; background: rgba(255,255,255,0.05); }
        .dash-bar > div { min-width: 6px; }
        .dash-legend { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px 14px; }
        .dash-legend-item { display: flex; align-items: center; gap: 8px; color: #8aafd4; font-size: 0.8rem; }
        .dash-legend-item strong { color: #fff; margin-inline-start: auto; }
        .dash-src { margin-bottom: 12px; }
        .dash-src-row { display: flex; justify-content: space-between; color: #cfe0f7; font-size: 0.82rem; margin-bottom: 5px; }
        .dash-src-row strong { color: #fff; }
        .dash-src-track { height: 6px; border-radius: 6px; background: rgba(255,255,255,0.06); overflow: hidden; }
        .dash-src-track > div { height: 100%; border-radius: 6px; background: linear-gradient(90deg, #2d5fc4, #e0bf6a); }
        .dash-stat-card { position: relative; overflow: hidden; background: linear-gradient(160deg, #0f2456, #0a1840); border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; padding: 18px; transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; height: 100%; }
        .dash-stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--accent); opacity: 0.9; }
        .dash-stat-card::after { content: ''; position: absolute; width: 120px; height: 120px; right: -40px; top: -40px; border-radius: 50%; background: var(--accent); opacity: 0.08; filter: blur(6px); }
        .dash-stat-card:hover { transform: translateY(-4px); border-color: var(--accent); box-shadow: 0 16px 34px -14px var(--accent); }
        .dash-stat-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
        .dash-stat-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; background: color-mix(in srgb, var(--accent) 18%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent); }
        .dash-stat-view { color: var(--accent); font-size: 0.65rem; font-weight: 700; text-transform: uppercase; opacity: 0; transition: opacity .2s ease; }
        .dash-stat-card:hover .dash-stat-view { opacity: 1; }
        .dash-stat-value { color: #fff; font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 800; line-height: 1; margin-bottom: 6px; }
        .dash-stat-label { color: #8aafd4; font-size: 0.78rem; }
        .dash-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; }
        .leads-mobile { display: block; }
        .leads-desktop { display: none; }

        @media (min-width: 640px) {
          .dash-container { padding: 24px 20px; }
          .dash-stats-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; }
        }

        @media (min-width: 1024px) {
          .dash-container { padding: 32px 30px; }
          .dash-stats-grid { grid-template-columns: repeat(6, 1fr); gap: 16px; }
          .dash-stat-card { padding: 20px; }
          .dash-two { grid-template-columns: 1.2fr 1fr; }
          .leads-mobile { display: none; }
          .leads-desktop { display: block; }
        }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .leaflet-container { background: #060f26 !important; }
        .osm-dark-tiles { filter: invert(1) hue-rotate(200deg) brightness(0.85) contrast(0.9) saturate(0.7); }
        .leaflet-popup-content-wrapper { border-radius: 10px; }
        .leaflet-popup-content { margin: 12px 14px; }
        .leaflet-tile-pane { filter: brightness(0.85); }
      `}</style>
    </div>
  )
}

export default AdminDashboard