import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

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
        // Fetch similar
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
      name: inquiryForm.name,
      email: inquiryForm.email,
      phone: inquiryForm.phone,
      message: inquiryForm.message || `Interested in: ${property?.title}`,
      service: 'General Inquiry',    // ✅ matches enum
      source: 'Property Inquiry',    // ✅ exactly matches enum — shows in filter
      property: id,                  // ✅ links to the property
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
      name: 'WhatsApp Visitor',
      email: 'N/A',
      phone: 'N/A',
      message: `Contacted via ${source} for: ${property?.title}`,
      service: 'General Inquiry',
      source: source,   // 'WhatsApp' or 'Phone'
      property: id,
    })
  } catch (err) {
    console.error(err)  // silent — don't bother the user
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
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🏠</div>
        <h2 style={{ color: '#ffffff', marginBottom: '12px' }}>Property Not Found</h2>
        <Link to="/properties" style={{ backgroundColor: '#2d5fc4', color: '#fff', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>Browse Properties</Link>
      </div>
    </div>
  )

  const infoBoxStyle = { backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '12px', padding: '16px 20px' }

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.2)', padding: '14px 0' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#8aafd4' }}>
            <Link to="/" style={{ color: '#4a90d9', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link to="/properties" style={{ color: '#4a90d9', textDecoration: 'none' }}>Properties</Link>
            <span>›</span>
            <span style={{ color: '#ffffff' }}>{property.title}</span>
          </div>
        </Container>
      </div>

      <Container style={{ paddingTop: '36px' }}>
        <Row className="g-4">

          {/* LEFT */}
          <Col lg={8}>
            {/* Main Image */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', position: 'relative' }}>
              <img src={property.gallery?.[activeImg] || property.image} alt={property.title} style={{ width: '100%', height: '480px', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: '#2d5fc4', color: '#fff', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '20px' }}>{property.tag}</div>
              {property.roi && <div style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: 'rgba(39,174,96,0.9)', color: '#fff', fontSize: '0.75rem', fontWeight: '700', padding: '5px 14px', borderRadius: '20px' }}>ROI {property.roi}</div>}
            </div>

            {/* Thumbnails */}
            {property.gallery?.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
                {property.gallery.map((img, i) => (
                  <div key={i} onClick={() => setActiveImg(i)} style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', border: i === activeImg ? '2px solid #4a90d9' : '2px solid transparent', opacity: i === activeImg ? 1 : 0.6, transition: 'all 0.2s ease' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Title */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ color: '#4a90d9', fontSize: '0.85rem', marginBottom: '8px' }}>📍 {property.location} — {property.community}</div>
              <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '700', marginBottom: '12px' }}>{property.title}</h1>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: 'rgba(45,95,196,0.2)', color: '#4a90d9', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>{property.category}</span>
                <span style={{ backgroundColor: property.status === 'Off Plan' ? 'rgba(142,68,173,0.2)' : 'rgba(39,174,96,0.2)', color: property.status === 'Off Plan' ? '#8e44ad' : '#27ae60', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>{property.status}</span>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '28px' }}>
              {[
                { icon: '🛏', label: 'Bedrooms',   value: property.bedrooms === 0 ? 'Studio' : property.bedrooms },
                { icon: '🚿', label: 'Bathrooms',  value: property.bathrooms },
                { icon: '📐', label: 'Area',        value: `${property.area?.toLocaleString()} sqft` },
                { icon: '🏗️', label: 'Completion', value: property.completionYear },
              ].map((stat, i) => (
                <div key={i} style={{ ...infoBoxStyle, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{stat.icon}</div>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1rem' }}>{stat.value}</div>
                  <div style={{ color: '#8aafd4', fontSize: '0.75rem', marginTop: '3px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ ...infoBoxStyle, marginBottom: '24px' }}>
              <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '14px' }}>About This Property</h3>
              <p style={{ color: '#8aafd4', fontSize: '0.92rem', lineHeight: '1.8', margin: 0 }}>{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div style={{ ...infoBoxStyle, marginBottom: '24px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px' }}>Amenities & Features</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {property.amenities.map((a, i) => (
                    <div key={i} style={{ backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.25)', borderRadius: '8px', padding: '8px 16px', color: '#8aafd4', fontSize: '0.85rem' }}>✓ {a}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Developer */}
            {property.developer && (
              <div style={infoBoxStyle}>
                <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '14px' }}>Developer</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🏗️</div>
                  <div>
                    <div style={{ color: '#ffffff', fontWeight: '700' }}>{property.developer}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.82rem', marginTop: '2px' }}>Licensed Developer · Dubai, UAE</div>
                  </div>
                </div>
              </div>
            )}
          </Col>

          {/* RIGHT */}
          <Col lg={4}>
            <div style={{ position: 'sticky', top: '100px' }}>
              {/* Price Card */}
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '16px', padding: '28px 24px', marginBottom: '16px' }}>
                <div style={{ color: '#8aafd4', fontSize: '0.82rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{property.type === 'Rent' ? 'Annual Rent' : 'Asking Price'}</div>
                <div style={{ color: '#ffffff', fontSize: '2rem', fontWeight: '800', marginBottom: '4px' }}>{formatPrice(property.price, property.type)}</div>
                {property.roi && <div style={{ color: '#27ae60', fontSize: '0.85rem', fontWeight: '600', marginBottom: '20px' }}>Expected ROI: {property.roi}</div>}
                {property.status === 'Off Plan' && (
                  <div style={{ backgroundColor: 'rgba(142,68,173,0.15)', border: '1px solid rgba(142,68,173,0.3)', borderRadius: '8px', padding: '10px 14px', marginBottom: '20px', color: '#8e44ad', fontSize: '0.82rem' }}>
                    💳 Flexible payment plans available
                  </div>
                )}
                <a href={`https://wa.me/97156119233?text=Hi, I'm interested in: ${property.title}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25d366', color: '#fff', padding: '13px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px', transition: 'background 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1ebe5d'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#25d366'}
                >
                  💬 WhatsApp Agent
                </a>
                <a 
  href={`https://wa.me/97156119233?text=Hi, I'm interested in: ${property.title}`}
  target="_blank" rel="noopener noreferrer"
  onClick={() => trackLead('WhatsApp')}   // ✅ add this
  style={{...}}
>
  💬 WhatsApp Agent
</a>

<a 
  href="tel:+97142981077"
  onClick={() => trackLead('Phone')}   // ✅ add this
  style={{...}}
>
  📞 +971 42 981 077
</a>
              </div>

              {/* Inquiry Form */}
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
                    {[
                      { key: 'name',  placeholder: 'Your Name',    type: 'text' },
                      { key: 'email', placeholder: 'Email Address', type: 'email' },
                      { key: 'phone', placeholder: 'Phone Number',  type: 'tel' },
                    ].map(field => (
                      <input key={field.key} type={field.type} placeholder={field.placeholder} required
                        value={inquiryForm[field.key]}
                        onChange={e => setInquiryForm(p => ({ ...p, [field.key]: e.target.value }))}
                        style={{ width: '100%', backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px', color: '#ffffff', padding: '11px 14px', fontSize: '0.88rem', outline: 'none', marginBottom: '10px', boxSizing: 'border-box' }}
                      />
                    ))}
                    <textarea placeholder={`I'm interested in: ${property.title}`} rows={3}
                      value={inquiryForm.message}
                      onChange={e => setInquiryForm(p => ({ ...p, message: e.target.value }))}
                      style={{ width: '100%', backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px', color: '#ffffff', padding: '11px 14px', fontSize: '0.88rem', outline: 'none', marginBottom: '12px', resize: 'vertical', boxSizing: 'border-box' }}
                    />
                    <button type="submit" style={{ width: '100%', backgroundColor: '#2d5fc4', color: '#fff', border: 'none', borderRadius: '8px', padding: '13px', fontSize: '0.92rem', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s ease' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}
                    >
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
          <div style={{ marginTop: '60px' }}>
            <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px' }}>Similar Properties</h2>
            <Row className="g-4">
              {similar.map(p => (
                <Col key={p._id} lg={4} md={6}>
                  <Link to={`/property/${p._id}`} style={{ textDecoration: 'none' }} onClick={() => window.scrollTo(0, 0)}>
                    <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '14px', overflow: 'hidden', transition: 'transform 0.25s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                      <div style={{ padding: '16px' }}>
                        <div style={{ color: '#4a90d9', fontSize: '0.78rem', marginBottom: '6px' }}>📍 {p.location}</div>
                        <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.95rem', marginBottom: '10px' }}>{p.title}</div>
                        <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.1rem' }}>{formatPrice(p.price, p.type)}</div>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default PropertyDetail