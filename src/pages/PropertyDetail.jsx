import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import PropertyCard from '../components/common/PropertyCard'
import FavoriteButton from '../components/common/FavoriteButton'
import MortgageCalculator from '../components/common/MortgageCalculator'
import { useToast } from '../components/common/useToast'
import { fetchProperties } from '../utils/propertiesApi'
import { useLocalize } from '../utils/useLocalize'
import ViewingScheduler from '../components/common/ViewingScheduler'
import PropertyAlert from '../components/common/PropertyAlert'
import { optimizeImg } from '../utils/img'
import { parseVideo } from '../utils/video'

const PropertyMap = lazy(() => import('../components/common/PropertyMap'))

const DUBAI_LOCATIONS = {
  'downtown':            [25.1972, 55.2744],
  'burj khalifa':        [25.1972, 55.2744],
  'dubai marina':        [25.0805, 55.1403],
  'marina':              [25.0805, 55.1403],
  'palm jumeirah':       [25.1124, 55.1390],
  'business bay':        [25.1850, 55.2650],
  'jumeirah beach':      [25.0772, 55.1328],
  'jbr':                 [25.0772, 55.1328],
  'jumeirah village':    [25.0583, 55.2103],
  'jvc':                 [25.0583, 55.2103],
  'jumeirah':            [25.2048, 55.2408],
  'deira':               [25.2697, 55.3094],
  'dubai hills':         [25.1089, 55.2342],
  'difc':                [25.2116, 55.2796],
  'creek harbour':       [25.2000, 55.3500],
  'creek':               [25.2000, 55.3500],
  'arabian ranches':     [25.0540, 55.2650],
  'al barsha':           [25.1109, 55.1986],
  'mirdif':              [25.2269, 55.4148],
  'dubai land':          [25.0850, 55.3700],
  'dubai south':         [24.8960, 55.1580],
  'dubai silicon oasis': [25.1200, 55.3800],
  'sports city':         [25.0400, 55.2150],
  'meydan':              [25.1650, 55.3000],
  'al furjan':           [25.0270, 55.1450],
  'jlt':                 [25.0690, 55.1450],
  'jumeirah lake':       [25.0690, 55.1450],
}

// Longest key first so "Jumeirah Village Circle" matches before plain "Jumeirah".
const LOCATION_KEYS = Object.keys(DUBAI_LOCATIONS).sort((a, b) => b.length - a.length)

const getCoords = (...parts) => {
  const loc = parts.filter(Boolean).join(' ').toLowerCase()
  for (const key of LOCATION_KEYS) {
    if (loc.includes(key)) return DUBAI_LOCATIONS[key]
  }
  return [25.2048, 55.2708]
}

// Formats digits into +971 5X XXX XXXX as the user types (same pattern as Contact.jsx)
const formatUAEPhone = (raw) => {
  let digits = raw.replace(/\D/g, '')
  if (digits.startsWith('971')) digits = digits.slice(3)
  else if (digits.startsWith('0')) digits = digits.slice(1)
  digits = digits.slice(0, 9)
  let out = '+971'
  if (digits.length > 0) out += ' ' + digits.slice(0, 2)
  if (digits.length > 2) out += ' ' + digits.slice(2, 5)
  if (digits.length > 5) out += ' ' + digits.slice(5, 9)
  return out
}

const PropertyDetail = () => {
  const { id } = useParams()
  const { t, tv, num, formatPrice: fmtPrice } = useLocalize()
  const formatPrice = (price, type) => fmtPrice(price, type, { long: true })
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [formStatus, setFormStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [leadTracked, setLeadTracked] = useState({ whatsapp: false, phone: false })
  const [lightbox, setLightbox] = useState(false)
  const [similar, setSimilar] = useState([])
  const { showToast } = useToast()

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

  // Similar properties: same type or same area, excluding this one
  useEffect(() => {
    if (!property) return
    let cancelled = false
    fetchProperties().then(list => {
      if (cancelled) return
      const area = (property.location || '').toLowerCase()
      const scored = list
        .filter(p => p._id !== property._id)
        .map(p => ({
          p,
          score: (p.type === property.type ? 2 : 0)
            + (p.category === property.category ? 1 : 0)
            + (area && (p.location || '').toLowerCase() === area ? 2 : 0)
        }))
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(x => x.p)
      setSimilar(scored)
    }).catch(() => {})
    return () => { cancelled = true }
  }, [property])

  const imageCount = property ? [property.image, ...(property.gallery || [])].filter(Boolean).length : 0

  const stepImage = useCallback((dir) => {
    if (imageCount > 0) setActiveImg(i => (i + dir + imageCount) % imageCount)
  }, [imageCount])

  // Lightbox keyboard controls + scroll lock
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowLeft') stepImage(-1)
      if (e.key === 'ArrowRight') stepImage(1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [lightbox, stepImage])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      showToast(t('detail.linkCopied'), 'success', 2200)
    } catch { showToast(t('detail.copyFail'), 'error') }
  }

  const nativeShare = async () => {
    try {
      await navigator.share({ title: property?.title, text: `Check out this property: ${property?.title}`, url: shareUrl })
    } catch { /* cancelled */ }
  }

  const trackLead = async (source) => {
    if (leadTracked[source.toLowerCase()]) return
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/leads`, {
        name: 'Property Visitor',
        email: 'visitor@lazord.ae',
        phone: 'N/A',
        service: 'General Inquiry',
        source,
        property: id,
        message: `Clicked ${source} on property: ${property?.title}`
      })
      setLeadTracked(prev => ({ ...prev, [source.toLowerCase()]: true }))
    } catch (err) { console.error(err) }
  }

  const handlePhoneChange = e => {
    setForm(p => ({ ...p, phone: formatUAEPhone(e.target.value) }))
  }

  const handleEnquiry = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/leads`, {
        ...form,
        source: 'Property Inquiry',
        service: 'General Inquiry',
        property: id,
        message: form.message || `Enquiry about: ${property?.title}`
      })
      try { localStorage.setItem('lazord_lead_sent', '1') } catch { /* storage blocked */ }
      setFormStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      console.error('Enquiry submit failed:', err.response?.data || err.message)
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
        <p style={{ color: '#8aafd4', marginTop: '16px' }}>{t('detail.loading')}</p>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  if (!property) return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏠</div>
        <h2 style={{ color: '#ffffff', marginBottom: '10px' }}>{t('detail.notFound')}</h2>
        <Link to="/properties" style={{ color: '#4a90d9', textDecoration: 'none', fontWeight: '600' }}>{t('detail.back')}</Link>
      </div>
    </div>
  )

  const allImages = [property.image, ...(property.gallery || [])].filter(Boolean)
  const video = parseVideo(property.videoUrl)
  const coords = getCoords(property.location, property.community)
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
              onMouseLeave={e => e.currentTarget.style.color = '#8aafd4'}>{t('nav.home')}</Link>
            <span>›</span>
            <Link to="/properties" style={{ color: '#8aafd4', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#4a90d9'}
              onMouseLeave={e => e.currentTarget.style.color = '#8aafd4'}>{t('nav.properties')}</Link>
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
              <img src={optimizeImg(allImages[activeImg], 1200)} alt={property.title}
                onClick={() => setLightbox(true)}
                style={{ width: '100%', height: 'clamp(260px, 45vw, 500px)', objectFit: 'cover', display: 'block', cursor: 'zoom-in' }} />
              <button type="button" onClick={() => setLightbox(true)} aria-label={t('detail.viewFullscreen')}
                style={{ position: 'absolute', bottom: '16px', left: '16px', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '20px', padding: '5px 12px', fontSize: '0.78rem', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
                {t('detail.fullscreen')}
              </button>

              {/* Badges overlay */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {property.tag && (
                  <span style={{ backgroundColor: '#2d5fc4', color: '#fff', padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', backdropFilter: 'blur(8px)' }}>
                    {tv(property.tag)}
                  </span>
                )}
                {property.featured && (
                  <span style={{ backgroundColor: '#f1c40f', color: '#000', padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>
                    {t('detail.featuredBadge')}
                  </span>
                )}
              </div>

              <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                <span style={{ backgroundColor: property.status === 'Available' ? '#27ae60' : '#e74c3c', color: '#fff', padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>
                  {tv(property.status)}
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
                  <img key={i} src={optimizeImg(img, 240)} alt={`view ${i + 1}`} onClick={() => setActiveImg(i)}
                    style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', flexShrink: 0, border: activeImg === i ? '2px solid #4a90d9' : '2px solid transparent', opacity: activeImg === i ? 1 : 0.6, transition: 'all 0.2s' }} />
                ))}
              </div>
            )}

            {/* Title + Price */}
            <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: '24px 28px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', fontWeight: '700', marginBottom: '6px' }}>{property.title}</h1>
                  <p style={{ color: '#8aafd4', fontSize: '0.9rem', margin: 0 }}>📍 {t('detail.locationDubai', { loc: `${property.location}${property.community ? ` — ${property.community}` : ''}` })}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#4a90d9', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800' }}>{formatPrice(property.price, property.type)}</div>
                  {property.roi && <div style={{ color: '#27ae60', fontSize: '0.82rem', fontWeight: '600', marginTop: '2px' }}>📈 ROI: {property.roi}</div>}
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap', borderTop: '1px solid rgba(45,95,196,0.2)', paddingTop: '16px' }}>
                {[
                  { icon: '🛏', label: t('detail.bedrooms'),  value: property.bedrooms === 0 ? t('card.studio') : property.bedrooms },
                  { icon: '🚿', label: t('detail.bathrooms'), value: property.bathrooms },
                  { icon: '📐', label: t('detail.area'),      value: property.area ? t('card.sqft', { n: num(property.area) }) : 'N/A' },
                  { icon: '🏗️', label: t('detail.type'),      value: tv(property.category || property.type) },
                  ...(property.completionYear ? [{ icon: '📅', label: t('detail.completion'), value: property.completionYear }] : []),
                  ...(property.developer ? [{ icon: '🏢', label: t('detail.developer'), value: property.developer }] : []),
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

            {/* Share + Save */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <FavoriteButton id={property._id} title={property.title} size={42} />
              <span style={{ color: '#8aafd4', fontSize: '0.8rem', marginRight: '4px' }}>{t('detail.share')}</span>
              <a href={`https://wa.me/?text=${encodeURIComponent(`${property.title} - ${shareUrl}`)}`} target="_blank" rel="noopener noreferrer"
                style={{ backgroundColor: 'rgba(37,211,102,0.12)', color: '#25d366', border: '1px solid rgba(37,211,102,0.35)', borderRadius: '20px', padding: '8px 16px', fontSize: '0.8rem', fontWeight: '700', textDecoration: 'none' }}>
                {t('detail.shareWhatsapp')}
              </a>
              <button type="button" onClick={copyLink}
                style={{ backgroundColor: 'rgba(45,95,196,0.15)', color: '#4a90d9', border: '1px solid rgba(45,95,196,0.35)', borderRadius: '20px', padding: '8px 16px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>
                {t('detail.copyLink')}
              </button>
              {typeof navigator !== 'undefined' && navigator.share && (
                <button type="button" onClick={nativeShare}
                  style={{ backgroundColor: 'rgba(45,95,196,0.15)', color: '#4a90d9', border: '1px solid rgba(45,95,196,0.35)', borderRadius: '20px', padding: '8px 16px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>
                  {t('detail.more')}
                </button>
              )}
            </div>

            {/* Video / virtual tour */}
            {video && (
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: '24px 28px', marginBottom: '20px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid rgba(45,95,196,0.2)' }}>{t('detail.video')}</h3>
                {video.kind === 'embed' && (
                  <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#060f26' }}>
                    <iframe
                      src={video.src} title={property.title} loading="lazy" allowFullScreen
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
                      referrerPolicy="strict-origin-when-cross-origin"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                    />
                  </div>
                )}
                {video.kind === 'file' && (
                  <video src={video.src} controls playsInline preload="metadata" style={{ width: '100%', borderRadius: '12px', backgroundColor: '#060f26' }} />
                )}
                {video.kind === 'link' && (
                  <a href={video.src} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#2d5fc4', color: '#fff', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>{t('detail.openTour')} ↗</a>
                )}
              </div>
            )}

            {/* Description */}
            {property.description && (
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: '24px 28px', marginBottom: '20px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid rgba(45,95,196,0.2)' }}>{t('detail.about')}</h3>
                <p style={{ color: '#8aafd4', fontSize: '0.92rem', lineHeight: '1.8', margin: 0 }}>{property.description}</p>
              </div>
            )}

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: '24px 28px', marginBottom: '20px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(45,95,196,0.2)' }}>{t('detail.amenities')}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {property.amenities.map((a, i) => (
                    <span key={i} style={{ backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.25)', borderRadius: '8px', color: '#c0d4f0', padding: '7px 14px', fontSize: '0.82rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#27ae60', fontSize: '0.8rem' }}>✓</span> {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Map — Leaflet lazy-loaded so it doesn't block initial page interactivity */}
            <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(45,95,196,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', margin: 0 }}>{t('detail.location')}</h3>
                <span style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <span style={{ color: '#8aafd4', fontSize: '0.82rem' }}>{t('detail.locationDubai', { loc: property.location })}</span>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.community || ''} ${property.location} Dubai`.trim())}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ color: '#4a90d9', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                    {t('detail.openMaps')}
                  </a>
                </span>
              </div>
              <div style={{ height: '300px' }}>
                <Suspense fallback={
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8aafd4', fontSize: '0.85rem' }}>
                    {t('detail.loadingMap')}
                  </div>
                }>
                  <PropertyMap
                    coords={coords}
                    title={property.title}
                    location={property.location}
                    priceLabel={formatPrice(property.price, property.type)}
                  />
                </Suspense>
              </div>
            </div>

            {/* Mortgage calculator — only for properties for sale */}
            {property.type !== 'Rent' && property.price > 0 && (
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: '24px 28px', marginBottom: '20px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(45,95,196,0.2)' }}>{t('mortgage.detailTitle')}</h3>
                <MortgageCalculator key={property._id} initialPrice={property.price} compact />
              </div>
            )}

          </Col>

          {/* RIGHT — Sticky Sidebar */}
          <Col lg={4}>
            <div style={{ position: 'sticky', top: '80px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Price + Actions */}
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(45,95,196,0.2)' }}>
                  <div style={{ color: '#8aafd4', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{t('detail.price')}</div>
                  <div style={{ color: '#4a90d9', fontSize: '1.6rem', fontWeight: '800' }}>{formatPrice(property.price, property.type)}</div>
                  {property.roi && <div style={{ color: '#27ae60', fontSize: '0.82rem', fontWeight: '600', marginTop: '4px' }}>📈 {t('detail.roi', { roi: property.roi })}</div>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href={`https://wa.me/971561119233?text=${encodeURIComponent(`${t('detail.waText', { title: property.title })} - ${window.location.href}`)}`}
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => trackLead('WhatsApp')}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25d366', color: '#fff', padding: '13px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem', transition: 'all 0.2s', boxShadow: '0 6px 20px rgba(37,211,102,0.25)' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1da851'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#25d366'; e.currentTarget.style.transform = 'translateY(0)' }}>
                    {t('detail.whatsappBtn')}
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
                    { icon: '🛏', label: t('detail.beds'),  value: property.bedrooms === 0 ? t('card.studio') : property.bedrooms },
                    { icon: '🚿', label: t('detail.baths'), value: property.bathrooms },
                    { icon: '📐', label: t('detail.sqft'),  value: property.area ? num(property.area) : 'N/A' },
                    { icon: '🏗️', label: t('detail.type'),  value: tv(property.type) },
                  ].map((s, i) => (
                    <div key={i} style={{ backgroundColor: 'rgba(45,95,196,0.1)', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.1rem', marginBottom: '3px' }}>{s.icon}</div>
                      <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.9rem' }}>{s.value}</div>
                      <div style={{ color: '#8aafd4', fontSize: '0.68rem', marginTop: '1px' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <ViewingScheduler property={property} />

              <div style={{ marginBottom: '20px' }}>
                <PropertyAlert block criteria={{ type: property.type, category: property.category, search: property.location }} />
              </div>

              {/* Enquiry Form */}
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '4px' }}>{t('detail.enquiryTitle')}</h3>
                <p style={{ color: '#8aafd4', fontSize: '0.78rem', marginBottom: '16px' }}>{t('detail.enquirySub')}</p>

                {formStatus === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✅</div>
                    <div style={{ color: '#27ae60', fontWeight: '700', marginBottom: '4px' }}>{t('detail.enquirySent')}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.82rem' }}>{t('detail.enquirySentDesc')}</div>
                  </div>
                ) : (
                  <form onSubmit={handleEnquiry} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input required type="text" name="name" autoComplete="name" placeholder={t('detail.yourName')} aria-label={t('detail.yourName')} value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#4a90d9'}
                      onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                    <input required type="email" name="email" autoComplete="email" placeholder={t('detail.emailPh')} aria-label={t('detail.emailPh')} value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#4a90d9'}
                      onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                    <input required type="tel" name="phone" autoComplete="tel" placeholder="+971 5X XXX XXXX" value={form.phone}
                      onChange={handlePhoneChange}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#4a90d9'}
                      onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                    <textarea rows={3} name="message" placeholder={t('detail.messagePh', { title: property.title })} aria-label={t('detail.messagePh', { title: property.title })}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={e => e.target.style.borderColor = '#4a90d9'}
                      onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'} />
                    <button type="submit" disabled={submitting}
                      style={{ backgroundColor: submitting ? '#1a3a7c' : '#2d5fc4', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '0.9rem', fontWeight: '700', cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: '0 6px 20px rgba(45,95,196,0.3)' }}
                      onMouseEnter={e => { if (!submitting) e.currentTarget.style.backgroundColor = '#1a3a7c' }}
                      onMouseLeave={e => { if (!submitting) e.currentTarget.style.backgroundColor = '#2d5fc4' }}>
                      {submitting ? t('detail.sending') : t('detail.sendBtn')}
                    </button>
                    {formStatus === 'error' && (
                      <div style={{ color: '#e74c3c', fontSize: '0.82rem', textAlign: 'center' }}>{t('detail.error')}</div>
                    )}
                  </form>
                )}
              </div>

              {/* Need help card */}
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.2)', borderRadius: '16px', padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(45,95,196,0.2)', border: '1px solid rgba(74,144,217,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>👨‍💼</div>
                  <div>
                    <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.9rem' }}>{t('detail.needHelp')}</div>
                    <div style={{ color: '#8aafd4', fontSize: '0.75rem' }}>{t('detail.talkExperts')}</div>
                  </div>
                </div>
                <p style={{ color: '#8aafd4', fontSize: '0.82rem', lineHeight: '1.6', marginBottom: '12px' }}>
                  {t('detail.helpText')}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href="mailto:info@lazordrealestate.ae"
                    style={{ flex: 1, textAlign: 'center', backgroundColor: 'rgba(45,95,196,0.15)', color: '#4a90d9', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px', padding: '8px', textDecoration: 'none', fontSize: '0.78rem', fontWeight: '600' }}>
                    {t('detail.emailBtn')}
                  </a>
                  <Link to="/contact"
                    style={{ flex: 1, textAlign: 'center', backgroundColor: 'rgba(45,95,196,0.15)', color: '#4a90d9', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px', padding: '8px', textDecoration: 'none', fontSize: '0.78rem', fontWeight: '600' }}>
                    {t('detail.contactBtn')}
                  </Link>
                </div>
              </div>

            </div>
          </Col>
        </Row>

        {/* Similar properties */}
        {similar.length > 0 && (
          <div style={{ marginTop: '56px' }}>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: '700', marginBottom: '20px' }}>
              {t('detail.alsoLike')}
            </h2>
            <Row className="g-4">
              {similar.map(p => (
                <Col key={p._id} lg={4} md={6}><PropertyCard property={p} /></Col>
              ))}
            </Row>
          </div>
        )}
      </Container>

      {/* Fullscreen image lightbox */}
      {lightbox && (
        <div role="dialog" aria-modal="true" aria-label={t('detail.photos')}
          onClick={() => setLightbox(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 10000, backgroundColor: 'rgba(3,8,22,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button type="button" aria-label={t('common.close')} onClick={() => setLightbox(false)}
            style={{ position: 'absolute', top: '18px', right: '18px', width: '42px', height: '42px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
          {allImages.length > 1 && (
            <button type="button" aria-label={t('detail.prev')} onClick={e => { e.stopPropagation(); stepImage(-1) }}
              style={{ position: 'absolute', left: '16px', width: '46px', height: '46px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '1.4rem', cursor: 'pointer' }}>‹</button>
          )}
          <img src={allImages[activeImg]} alt={property.title} onClick={e => e.stopPropagation()}
            style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '10px' }} />
          {allImages.length > 1 && (
            <button type="button" aria-label={t('detail.next')} onClick={e => { e.stopPropagation(); stepImage(1) }}
              style={{ position: 'absolute', right: '16px', width: '46px', height: '46px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '1.4rem', cursor: 'pointer' }}>›</button>
          )}
          <div style={{ position: 'absolute', bottom: '18px', color: '#c0d4f0', fontSize: '0.85rem' }}>
            {activeImg + 1} / {allImages.length}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .leaflet-container { background: #060f26 !important; }
        .osm-dark-tiles { filter: invert(1) hue-rotate(200deg) brightness(0.85) contrast(0.9) saturate(0.7); }
        input::placeholder, textarea::placeholder { color: #4a5a7a; }
      `}</style>
    </div>
  )
}

export default PropertyDetail