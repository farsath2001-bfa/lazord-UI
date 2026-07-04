import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

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
  'international city':  [25.1653, 55.4127],
  'sport city':          [25.0481, 55.2296],
  'motor city':          [25.0432, 55.2206],
  'discovery gardens':   [25.0344, 55.1483],
  'al quoz':             [25.1384, 55.2228],
}

const getCoordinates = (location = '', community = '') => {
  const search = `${location} ${community}`.toLowerCase()
  for (const [key, coords] of Object.entries(DUBAI_LOCATIONS)) {
    if (search.includes(key)) return coords
  }
  return [25.2048, 55.2708]
}

const formatPrice = (price, type) => {
  if (type === 'Rent') return `AED ${price?.toLocaleString()} / year`
  if (price >= 1000000) return `AED ${(price / 1000000).toFixed(2)}M`
  return `AED ${price?.toLocaleString()}`
}

const PropertyDetail = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [similar, setSimilar] = useState([])

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${API_URL}/api/properties/${id}`)
        setProperty(res.data.data)
        const simRes = await axios.get(`${API_URL}/api/properties`, { params: { type: res.data.data.type } })
        setSimilar((simRes.data.data || []).filter(p => p._id !== id).slice(0, 3))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/api/leads`, {
        name: inquiryForm.name, email: inquiryForm.email, phone: inquiryForm.phone,
        message: inquiryForm.message || `Interested in: ${property?.title}`,
        service: 'General Inquiry', source: 'Property Inquiry', property: id,
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Enquiry error:', err.response?.data)
      setSubmitted(true)
    }
  }

  const trackLead = async (source) => {
    try {
      await axios.post(`${API_URL}/api/leads`, {
        name: source === 'WhatsApp' ? 'WhatsApp Visitor' : 'Phone Visitor',
        email: 'visitor@lazord.ae', phone: 'N/A',
        message: `Contacted via ${source} for: ${property?.title}`,
        service: 'General Inquiry', source, property: id,
      })
    } catch (err) { console.error('trackLead error:', err.response?.data) }
  }

  if (loading) return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#4a90d9', fontSize: '3rem', animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</div>
        <p style={{ color: '#8aafd4', marginTop: '16px' }}>Loading property...</p>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  if (!property) return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🏠</div>
        <h2 style={{ color: '#ffffff', marginBottom: '12px' }}>Property Not Found</h2>
        <Link to="/properties" style={{ backgroundColor: '#2d5fc4', color: '#fff', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>Browse Properties</Link>
      </div>
    </div>
  )

  const infoBoxStyle = { backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '12px', padding: '16px 20px' }
  const coords = getCoordinates(property.location, property.community)
  const inputStyle = { width: '100%', backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px', color: '#ffffff', padding: '11px 14px', fontSize: '0.88rem', outline: 'none', marginBottom: '10px', boxSizing: 'border-box' }

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.2)', padding: '14px 0' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#8aafd4', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: '#4a90d9', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link to="/properties" style={{ color: '#4a90d9', textDecoration: 'none' }}>Properties</Link>
            <span>›</span>
            <span style={{ color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>{property.title}</span>
          </div>
        </Container>
      </div>

      <Container style={{ paddingTop: '28px' }}>
        <Row className="g-4">

          {/* LEFT */}
          <Col lg={8}>
            {/* Main Image */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', position: 'relative' }}>
              <img src={property.gallery?.[activeImg] || property.image} alt={property.title}
                style={{ width: '100%', height: 'clamp(220px, 40vw, 480px)', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#2d5fc4', color: '#fff', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '20px' }}>{property.tag}</div>
              {property.roi && <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(39,174,96,0.9)', color: '#fff', fontSize: '0.7rem', fontWeight: '700', padding: '4px 12px', borderRadius: '20px' }}>ROI {property.roi}</div>}
            </div>

            {/* Thumbnails */}
            {property.gallery?.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
                {property.gallery.map((img, i) => (
                  <div key={i} onClick={() => setActiveImg(i)}
                    style={{ minWidth: '70px', width: '70px', height: '52px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', border: i === activeImg ? '2px solid #4a90d9' : '2px solid transparent', opacity: i === activeImg ? 1 : 0.6, flexShrink: 0, transition: 'all 0.2s ease' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Title */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#4a90d9', fontSize: '0.82rem', marginBottom: '8px' }}>📍 {property.location}{property.community ? ` — ${property.community}` : ''}</div>
              <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.3rem, 3vw, 2.2rem)', fontWeight: '700', marginBottom: '12px' }}>{property.title}</h1>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: 'rgba(45,95,196,0.2)', color: '#4a90d9', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '600' }}>{property.category}</span>
                <span style={{ backgroundColor: property.status === 'Off Plan' ? 'rgba(142,68,173,0.2)' : 'rgba(39,174,96,0.2)', color: property.status === 'Off Plan' ? '#8e44ad' : '#27ae60', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '600' }}>{property.status}</span>
              </div>
            </div>

            {/* ── MOBILE: Price + Contact (shows on mobile only, above stats) ── */}
            <div className="d-lg-none" style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
              <div style={{ color: '#8aafd4', fontSize: '0.78rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{property.type === 'Rent' ? 'Annual Rent' : 'Asking Price'}</div>
              <div style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: '800', marginBottom: '16px' }}>{formatPrice(property.price, property.type)}</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href={`https://wa.me/971561119233?text=Hi, I'm interested in: ${encodeURIComponent(property.title)}`}
                  target="_blank" rel="noopener noreferrer" onClick={() => trackLead('WhatsApp')}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25d366', color: '#fff', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem' }}>
                  💬 WhatsApp
                </a>
                <a href="tel:+97142999088" onClick={() => trackLead('Phone')}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: 'transparent', color: '#ffffff', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                  📞 Call
                </a>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '24px' }} className="property-stats">
              {[
                { icon: '🛏', label: 'Bedrooms',   value: property.bedrooms === 0 ? 'Studio' : property.bedrooms },
                { icon: '🚿', label: 'Bathrooms',  value: property.bathrooms },
                { icon: '📐', label: 'Area',        value: `${property.area?.toLocaleString()} sqft` },
                { icon: '🏗️', label: 'Completion', value: property.completionYear || 'N/A' },
              ].map((stat, i) => (
                <div key={i} style={{ ...infoBoxStyle, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.3rem', marginBottom: '6px' }}>{stat.icon}</div>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.95rem' }}>{stat.value}</div>
                  <div style={{ color: '#8aafd4', fontSize: '0.72rem', marginTop: '3px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ ...infoBoxStyle, marginBottom: '20px' }}>
              <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '12px' }}>About This Property</h3>
              <p style={{ color: '#8aafd4', fontSize: '0.9rem', lineHeight: '1.8', margin: 0 }}>{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div style={{ ...infoBoxStyle, marginBottom: '20px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '14px' }}>Amenities & Features</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {property.amenities.map((a, i) => (
                    <div key={i} style={{ backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.25)', borderRadius: '8px', padding: '6px 14px', color: '#8aafd4', fontSize: '0.82rem' }}>✓ {a}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Developer */}
            {property.developer && (
              <div style={{ ...infoBoxStyle, marginBottom: '20px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '12px' }}>Developer</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>🏗️</div>
                  <div>
                    <div style={{ color: '#ffffff', fontWeight: '700' }}>{property.developer}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.8rem', marginTop: '2px' }}>Licensed Developer · Dubai, UAE</div>
                  </div>
                </div>
              </div>
            )}

            {/* Map */}
            <div style={{ ...infoBoxStyle, marginBottom: '20px', padding: '20px' }}>
              <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '6px' }}>📍 Property Location</h3>
              <p style={{ color: '#8aafd4', fontSize: '0.8rem', marginBottom: '14px' }}>
                {property.location}{property.community ? ` — ${property.community}` : ''}, Dubai, UAE
              </p>
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(45,95,196,0.3)', height: 'clamp(240px, 40vw, 360px)' }}>
                <MapContainer center={coords} zoom={14} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
                  <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={coords}>
                    <Popup>
                      <div style={{ textAlign: 'center', minWidth: '140px' }}>
                        <strong style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>{property.title}</strong>
                        <span style={{ color: '#666', fontSize: '0.8rem' }}>📍 {property.location}</span><br />
                        <strong style={{ color: '#2d5fc4', fontSize: '0.88rem' }}>{formatPrice(property.price, property.type)}</strong>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
              <a href={`https://www.google.com/maps/search/${encodeURIComponent(`${property.location} ${property.community || ''} Dubai UAE`)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '10px', color: '#4a90d9', fontSize: '0.8rem', fontWeight: '600', textDecoration: 'none' }}>
                🗺️ Open in Google Maps →
              </a>
            </div>

            {/* Mobile Enquiry Form */}
            <div className="d-lg-none" style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
              <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '16px' }}>Send an Enquiry</h3>
              {submitted ? (
                <div style={{ backgroundColor: 'rgba(39,174,96,0.15)', border: '1px solid rgba(39,174,96,0.3)', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✅</div>
                  <div style={{ color: '#27ae60', fontWeight: '700', marginBottom: '4px' }}>Message Sent!</div>
                  <div style={{ color: '#8aafd4', fontSize: '0.85rem' }}>Our agent will contact you shortly.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {[{ key: 'name', placeholder: 'Your Name', type: 'text' }, { key: 'email', placeholder: 'Email Address', type: 'email' }, { key: 'phone', placeholder: 'Phone Number', type: 'tel' }].map(field => (
                    <input key={field.key} type={field.type} placeholder={field.placeholder} required
                      value={inquiryForm[field.key]} onChange={e => setInquiryForm(p => ({ ...p, [field.key]: e.target.value }))}
                      style={inputStyle} />
                  ))}
                  <textarea placeholder={`I'm interested in: ${property.title}`} rows={3}
                    value={inquiryForm.message} onChange={e => setInquiryForm(p => ({ ...p, message: e.target.value }))}
                    style={{ ...inputStyle, resize: 'vertical' }} />
                  <button type="submit" style={{ width: '100%', backgroundColor: '#2d5fc4', color: '#fff', border: 'none', borderRadius: '8px', padding: '13px', fontSize: '0.92rem', fontWeight: '700', cursor: 'pointer' }}>
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>
          </Col>

          {/* RIGHT — Desktop only */}
          <Col lg={4} className="d-none d-lg-block">
            <div style={{ position: 'sticky', top: '100px' }}>
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '16px', padding: '28px 24px', marginBottom: '16px' }}>
                <div style={{ color: '#8aafd4', fontSize: '0.82rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{property.type === 'Rent' ? 'Annual Rent' : 'Asking Price'}</div>
                <div style={{ color: '#ffffff', fontSize: '2rem', fontWeight: '800', marginBottom: '4px' }}>{formatPrice(property.price, property.type)}</div>
                {property.roi && <div style={{ color: '#27ae60', fontSize: '0.85rem', fontWeight: '600', marginBottom: '20px' }}>Expected ROI: {property.roi}</div>}
                {property.status === 'Off Plan' && (
                  <div style={{ backgroundColor: 'rgba(142,68,173,0.15)', border: '1px solid rgba(142,68,173,0.3)', borderRadius: '8px', padding: '10px 14px', marginBottom: '20px', color: '#8e44ad', fontSize: '0.82rem' }}>
                    💳 Flexible payment plans available
                  </div>
                )}
                <a href={`https://wa.me/971561119233?text=Hi, I'm interested in: ${encodeURIComponent(property.title)}`}
                  target="_blank" rel="noopener noreferrer" onClick={() => trackLead('WhatsApp')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25d366', color: '#fff', padding: '13px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px', transition: 'background 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1ebe5d'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#25d366'}>
                  💬 WhatsApp Agent
                </a>
                <a href="tel:+97142999088" onClick={() => trackLead('Phone')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'transparent', color: '#ffffff', padding: '13px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', border: '1.5px solid rgba(255,255,255,0.2)', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#4a90d9'; e.currentTarget.style.color = '#4a90d9' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#ffffff' }}>
                  📞 +971 42 999 088
                </a>
              </div>

              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '18px' }}>Send an Enquiry</h3>
                {submitted ? (
                  <div style={{ backgroundColor: 'rgba(39,174,96,0.15)', border: '1px solid rgba(39,174,96,0.3)', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✅</div>
                    <div style={{ color: '#27ae60', fontWeight: '700', marginBottom: '4px' }}>Message Sent!</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.85rem' }}>Our agent will contact you shortly.</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {[{ key: 'name', placeholder: 'Your Name', type: 'text' }, { key: 'email', placeholder: 'Email Address', type: 'email' }, { key: 'phone', placeholder: 'Phone Number', type: 'tel' }].map(field => (
                      <input key={field.key} type={field.type} placeholder={field.placeholder} required
                        value={inquiryForm[field.key]} onChange={e => setInquiryForm(p => ({ ...p, [field.key]: e.target.value }))}
                        style={inputStyle} />
                    ))}
                    <textarea placeholder={`I'm interested in: ${property.title}`} rows={3}
                      value={inquiryForm.message} onChange={e => setInquiryForm(p => ({ ...p, message: e.target.value }))}
                      style={{ ...inputStyle, resize: 'vertical' }} />
                    <button type="submit"
                      style={{ width: '100%', backgroundColor: '#2d5fc4', color: '#fff', border: 'none', borderRadius: '8px', padding: '13px', fontSize: '0.92rem', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s ease' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}>
                      Send Enquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </Col>
        </Row>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div style={{ marginTop: '48px' }}>
            <h2 style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: '700', marginBottom: '20px' }}>Similar Properties</h2>
            <Row className="g-4">
              {similar.map(p => (
                <Col key={p._id} lg={4} md={6} xs={12}>
                  <Link to={`/property/${p._id}`} style={{ textDecoration: 'none' }} onClick={() => window.scrollTo(0, 0)}>
                    <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '14px', overflow: 'hidden', transition: 'transform 0.25s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '170px', objectFit: 'cover' }} />
                      <div style={{ padding: '14px' }}>
                        <div style={{ color: '#4a90d9', fontSize: '0.75rem', marginBottom: '6px' }}>📍 {p.location}</div>
                        <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.92rem', marginBottom: '8px' }}>{p.title}</div>
                        <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '1rem' }}>{formatPrice(p.price, p.type)}</div>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .leaflet-container { background: #0d1f4e; }
        .leaflet-popup-content-wrapper { border-radius: 10px; padding: 4px; }
        .leaflet-popup-content { margin: 12px 16px; }
        @media (min-width: 768px) {
          .property-stats { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}

export default PropertyDetail