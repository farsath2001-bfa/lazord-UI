import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const DUBAI_LOCATIONS = {
  'downtown dubai':      [25.1972, 55.2744],
  'dubai marina':        [25.0805, 55.1403],
  'palm jumeirah':       [25.1124, 55.1390],
  'business bay':        [25.1850, 55.2650],
  'jumeirah':            [25.2048, 55.2408],
  'deira':               [25.2697, 55.3094],
  'jbr':                 [25.0772, 55.1328],
  'dubai hills':         [25.1089, 55.2342],
  'difc':                [25.2116, 55.2796],
  'jumeirah village':    [25.0583, 55.2103],
  'jvc':                 [25.0583, 55.2103],
  'al barsha':           [25.1109, 55.1986],
  'mirdif':              [25.2269, 55.4148],
}

const getCoords = (location = '') => {
  const loc = location.toLowerCase()
  for (const [key, coords] of Object.entries(DUBAI_LOCATIONS)) {
    if (loc.includes(key)) return coords
  }
  return [25.2048, 55.2708]
}

const formatPrice = (price, type) => {
  if (!price) return 'Price on Request'
  if (type === 'Rent') return `AED ${price.toLocaleString()} / year`
  if (price >= 1000000) return `AED ${(price / 1000000).toFixed(2)}M`
  return `AED ${price.toLocaleString()}`
}

const PropertyDetail = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [formStatus, setFormStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [leadTracked, setLeadTracked] = useState({ whatsapp: false, phone: false })

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties/${id}`)
        setProperty(res.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  const trackLead = async (source) => {
    if (leadTracked[source.toLowerCase()]) return
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/leads`, {
        name: 'Property Visitor',
        email: 'visitor@lazord.ae',
        phone: 'N/A',
        service: 'Property Inquiry',
        source,
        property: id,
        message: `Clicked ${source} on property: ${property?.title}`
      })
      setLeadTracked(prev => ({ ...prev, [source.toLowerCase()]: true }))
    } catch (err) { console.error(err) }
  }

  const handleEnquiry = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/leads`, {
        ...form,
        source: 'Property Inquiry',
        service: 'Property Inquiry',
        property: id,
        message: form.message || `Enquiry about: ${property?.title}`
      })
      setFormStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setFormStatus('error')
    } finally {
      setSubmitting(false)
      setTimeout(() => setFormStatus(''), 4000)
    }
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
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏠</div>
        <h2 style={{ color: '#ffffff', marginBottom: '10px' }}>Property Not Found</h2>
        <Link to="/properties" style={{ color: '#4a90d9', textDecoration: 'none', fontWeight: '600' }}>← Back to Properties</Link>
      </div>
    </div>
  )

  const allImages = [property.image, ...(property.gallery || [])].filter(Boolean)
  const coords = getCoords(property.location)
  const inputStyle = {
    width: '100%', backgroundColor: '#060f26',
    border: '1px solid rgba(45,95,196,0.3)', borderRadius: '10px',
    color: '#ffffff', padding: '12px 14px', fontSize: '0.88rem',
    outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
  }

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.2)', padding: '12px 0' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#8aafd4', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: '#8aafd4', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#4a90d9'}
              onMouseLeave={e => e.currentTarget.style.color = '#8aafd4'}>Home</Link>
            <span>›</span>
            <Link to="/properties" style={{ color: '#8aafd4', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#4a90d9'}
              onMouseLeave={e => e.currentTarget.style.color = '#8aafd4'}>Properties</Link>
            <span>›</span>
            <span style={{ color: '#ffffff', fontWeight: '600' }}>{property.title}</span>
          </div>
        </Container>
      </div>

      <Container style={{ paddingTop: '32px' }}>
        <Row className="g-4">

          {/* LEFT — Images + Details */}
          <Col lg={8}>

            {/* Main Image */}
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', border: '1px solid rgba(45,95,196,0.2)' }}>
              <img src={allImages[activeImg]} alt={property.title}
                style={{ width: '100%', height: 'clamp(260px, 45vw, 500px)', objectFit: 'cover', display: 'block' }} />

              {/* Badges overlay */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {property.tag && (
                  <span style={{ backgroundColor: '#2d5fc4', color: '#fff', padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', backdropFilter: 'blur(8px)' }}>
                    {property.tag}
                  </span>
                )}
                {property.featured && (
                  <span style={{ backgroundColor: '#f1c40f', color: '#000', padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>
                    ⭐ Featured
                  </span>
                )}
              </div>

              <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                <span style={{ backgroundColor: property.status === 'Available' ? '#27ae60' : '#e74c3c', color: '#fff', padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>
                  {property.status}
                </span>
              </div>

              {/* Image counter */}
              {allImages.length > 1 && (
                <div style={{ position: 'absolute', bottom: '16px', right: '16px', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', backdropFilter: 'blur(8px)' }}>
                  {activeImg + 1} / {allImages.length}
                </div>
              )}

              {/* Prev/Next arrows */}
              {allImages.length > 1 && (<>
                <button onClick={() => setActiveImg(i => (i - 1 + allImages.length) % allImages.length)}
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1rem', backdropFilter: 'blur(8px)' }}>‹</button>
                <button onClick={() => setActiveImg(i => (i + 1) % allImages.length)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1rem', backdropFilter: 'blur(8px)' }}>›</button>
              </>)}
            </div>

            {/* Gallery thumbnails */}
            {allImages.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '24px', paddingBottom: '4px' }}>
                {allImages.map((img, i) => (
                  <img key={i} src={img} alt={`view ${i + 1}`} onClick={() => setActiveImg(i)}
                    style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', flexShrink: 0, border: activeImg === i ? '2px solid #4a90d9' : '2px solid transparent', opacity: activeImg === i ? 1 : 0.6, transition: 'all 0.2s' }} />
                ))}
              </div>
            )}

            {/* Title + Price */}
            <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: '24px 28px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', fontWeight: '700', marginBottom: '6px' }}>{property.title}</h1>
                  <p style={{ color: '#8aafd4', fontSize: '0.9rem', margin: 0 }}>📍 {property.location}{property.community ? ` — ${property.community}` : ''}, Dubai</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800' }}>{formatPrice(property.price, property.type)}</div>
                  {property.roi && <div style={{ color: '#27ae60', fontSize: '0.82rem', fontWeight: '600', marginTop: '2px' }}>📈 ROI: {property.roi}</div>}
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap', borderTop: '1px solid rgba(45,95,196,0.2)', paddingTop: '16px' }}>
                {[
                  { icon: '🛏', label: 'Bedrooms',  value: property.bedrooms === 0 ? 'Studio' : property.bedrooms },
                  { icon: '🚿', label: 'Bathrooms', value: property.bathrooms },
                  { icon: '📐', label: 'Area',      value: property.area ? `${property.area.toLocaleString()} sqft` : 'N/A' },
                  { icon: '🏗️', label: 'Type',      value: property.category || property.type },
                  ...(property.completionYear ? [{ icon: '📅', label: 'Completion', value: property.completionYear }] : []),
                  ...(property.developer ? [{ icon: '🏢', label: 'Developer', value: property.developer }] : []),
                ].map((stat, i, arr) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', paddingRight: '20px', marginRight: '20px', borderRight: i < arr.length - 1 ? '1px solid rgba(45,95,196,0.2)' : 'none', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.1rem', marginRight: '8px' }}>{stat.icon}</span>
                    <div>
                      <div style={{ color: '#8aafd4', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
                      <div style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: '600' }}>{stat.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: '24px 28px', marginBottom: '20px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid rgba(45,95,196,0.2)' }}>About This Property</h3>
                <p style={{ color: '#8aafd4', fontSize: '0.92rem', lineHeight: '1.8', margin: 0 }}>{property.description}</p>
              </div>
            )}

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: '24px 28px', marginBottom: '20px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(45,95,196,0.2)' }}>Amenities & Features</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {property.amenities.map((a, i) => (
                    <span key={i} style={{ backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.25)', borderRadius: '8px', color: '#c0d4f0', padding: '7px 14px', fontSize: '0.82rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#27ae60', fontSize: '0.8rem' }}>✓</span> {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(45,95,196,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', margin: 0 }}>📍 Location</h3>
                <span style={{ color: '#8aafd4', fontSize: '0.82rem' }}>{property.location}, Dubai</span>
              </div>
              <div style={{ height: '300px' }}>
                <MapContainer center={coords} zoom={14} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />
                  <Marker position={coords}>
                    <Popup>
                      <strong>{property.title}</strong><br />
                      📍 {property.location}<br />
                      <span style={{ color: '#2d5fc4', fontWeight: '700' }}>{formatPrice(property.price, property.type)}</span>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

          </Col>

          {/* RIGHT — Sticky Sidebar */}
          <Col lg={4}>
            <div style={{ position: 'sticky', top: '80px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Price + Actions */}
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(45,95,196,0.2)' }}>
                  <div style={{ color: '#8aafd4', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Price</div>
                  <div style={{ color: '#4a90d9', fontSize: '1.6rem', fontWeight: '800' }}>{formatPrice(property.price, property.type)}</div>
                  {property.roi && <div style={{ color: '#27ae60', fontSize: '0.82rem', fontWeight: '600', marginTop: '4px' }}>📈 Expected ROI: {property.roi}</div>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href={`https://wa.me/971561119233?text=Hi, I'm interested in: ${encodeURIComponent(property.title)} - ${encodeURIComponent(window.location.href)}`}
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => trackLead('WhatsApp')}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25d366', color: '#fff', padding: '13px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', transition: 'all 0.2s', boxShadow: '0 6px 20px rgba(37,211,102,0.25)' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1da851'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#25d366'; e.currentTarget.style.transform = 'translateY(0)' }}>
                    💬 WhatsApp Enquiry
                  </a>

                  <a href="tel:+97142999088" onClick={() => trackLead('Phone')}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.2)', color: '#4a90d9', border: '1px solid rgba(45,95,196,0.4)', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.35)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.2)'}>
                    📞 +971 42 999 088
                  </a>
                </div>

                {/* Key stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(45,95,196,0.2)' }}>
                  {[
                    { icon: '🛏', label: 'Beds',  value: property.bedrooms === 0 ? 'Studio' : property.bedrooms },
                    { icon: '🚿', label: 'Baths', value: property.bathrooms },
                    { icon: '📐', label: 'sqft',  value: property.area?.toLocaleString() || 'N/A' },
                    { icon: '🏗️', label: 'Type',  value: property.type },
                  ].map((s, i) => (
                    <div key={i} style={{ backgroundColor: 'rgba(45,95,196,0.1)', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.1rem', marginBottom: '3px' }}>{s.icon}</div>
                      <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.9rem' }}>{s.value}</div>
                      <div style={{ color: '#8aafd4', fontSize: '0.68rem', marginTop: '1px' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enquiry Form */}
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '4px' }}>Send Enquiry</h3>
                <p style={{ color: '#8aafd4', fontSize: '0.78rem', marginBottom: '16px' }}>Our agent will respond within 24 hours</p>

                {formStatus === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✅</div>
                    <div style={{ color: '#27ae60', fontWeight: '700', marginBottom: '4px' }}>Enquiry Sent!</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.82rem' }}>We'll be in touch soon.</div>
                  </div>
                ) : (
                  <form onSubmit={handleEnquiry} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input required type="text" placeholder="Your Name" value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#4a90d9'}
                      onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                    <input required type="email" placeholder="Email Address" value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#4a90d9'}
                      onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                    <input required type="tel" placeholder="Phone Number" value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#4a90d9'}
                      onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                    <textarea rows={3} placeholder={`I'm interested in ${property.title}...`}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={e => e.target.style.borderColor = '#4a90d9'}
                      onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                    <button type="submit" disabled={submitting}
                      style={{ backgroundColor: submitting ? '#1a3a7c' : '#2d5fc4', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '0.9rem', fontWeight: '700', cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: '0 6px 20px rgba(45,95,196,0.3)' }}
                      onMouseEnter={e => { if (!submitting) e.currentTarget.style.backgroundColor = '#1a3a7c' }}
                      onMouseLeave={e => { if (!submitting) e.currentTarget.style.backgroundColor = '#2d5fc4' }}>
                      {submitting ? '⟳ Sending...' : '📤 Send Enquiry'}
                    </button>
                    {formStatus === 'error' && (
                      <div style={{ color: '#e74c3c', fontSize: '0.82rem', textAlign: 'center' }}>❌ Something went wrong. Please try again.</div>
                    )}
                  </form>
                )}
              </div>

              {/* Need help card */}
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.2)', borderRadius: '16px', padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>👨‍💼</div>
                  <div>
                    <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.9rem' }}>Need Help?</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.75rem' }}>Talk to our experts</div>
                  </div>
                </div>
                <p style={{ color: '#8aafd4', fontSize: '0.82rem', lineHeight: '1.6', marginBottom: '12px' }}>
                  Our RERA-licensed agents are available Mon–Sat 9AM–7PM to answer all your questions.
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href="mailto:info@lazordrealestate.ae"
                    style={{ flex: 1, textAlign: 'center', backgroundColor: 'rgba(45,95,196,0.15)', color: '#4a90d9', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px', padding: '8px', textDecoration: 'none', fontSize: '0.78rem', fontWeight: '600' }}>
                    📧 Email
                  </a>
                  <Link to="/contact"
                    style={{ flex: 1, textAlign: 'center', backgroundColor: 'rgba(45,95,196,0.15)', color: '#4a90d9', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px', padding: '8px', textDecoration: 'none', fontSize: '0.78rem', fontWeight: '600' }}>
                    📋 Contact
                  </Link>
                </div>
              </div>

            </div>
          </Col>
        </Row>
      </Container>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .leaflet-container { background: #060f26 !important; }
        input::placeholder, textarea::placeholder { color: #4a5a7a; }
      `}</style>
    </div>
  )
}

export default PropertyDetail