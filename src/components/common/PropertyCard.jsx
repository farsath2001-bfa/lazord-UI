import { Link } from 'react-router-dom'

const tagColors = {
  'Featured':  { bg: '#2d5fc4', color: '#fff' },
  'Hot Deal':  { bg: '#e74c3c', color: '#fff' },
  'New':       { bg: '#27ae60', color: '#fff' },
  'Off Plan':  { bg: '#8e44ad', color: '#fff' },
  'Rent':      { bg: '#e67e22', color: '#fff' },
  'Family':    { bg: '#16a085', color: '#fff' },
}

const formatPrice = (price, type) => {
  if (type === 'Rent') {
    return `AED ${price.toLocaleString()} / yr`
  }
  if (price >= 1000000) {
    return `AED ${(price / 1000000).toFixed(2)}M`
  }
  return `AED ${price.toLocaleString()}`
}

const PropertyCard = ({ property }) => {
  const {
  _id, title, type, category, price, location,
  bedrooms, bathrooms, area, image, tag, roi, status
} = property

  const tagStyle = tagColors[tag] || { bg: '#2d5fc4', color: '#fff' }

  return (
    <div style={{
      backgroundColor: '#0d1f4e',
      borderRadius: '14px',
      overflow: 'hidden',
      border: '1px solid rgba(45,95,196,0.3)',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      cursor: 'pointer',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 20px 50px rgba(45,95,196,0.25)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />

        {/* Tag Badge */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          backgroundColor: tagStyle.bg,
          color: tagStyle.color,
          fontSize: '0.72rem',
          fontWeight: '700',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          padding: '4px 10px',
          borderRadius: '20px',
        }}>
          {tag}
        </div>

        {/* Type badge */}
        <div style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          backgroundColor: 'rgba(13,31,78,0.85)',
          backdropFilter: 'blur(6px)',
          color: '#8aafd4',
          fontSize: '0.72rem',
          fontWeight: '600',
          letterSpacing: '0.5px',
          padding: '4px 10px',
          borderRadius: '20px',
          border: '1px solid rgba(74,144,217,0.3)',
        }}>
          {category}
        </div>

        {/* ROI Badge */}
        {/* {roi && (
          <div style={{
            position: 'absolute',
            bottom: '14px',
            right: '14px',
            backgroundColor: 'rgba(39,174,96,0.9)',
            color: '#fff',
            fontSize: '0.72rem',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '20px',
          }}>
            ROI {roi}
          </div>
        )} */}
      </div>

      {/* Content */}
      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Location */}
        <div style={{
          color: '#4a90d9',
          fontSize: '0.78rem',
          letterSpacing: '0.5px',
          marginBottom: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          📍 {location}
        </div>

        {/* Title */}
        <h3 style={{
          color: '#ffffff',
          fontSize: '1rem',
          fontWeight: '600',
          lineHeight: '1.4',
          marginBottom: '14px',
          flex: 1
        }}>
          {title}
        </h3>

        {/* Stats Row */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '16px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(45,95,196,0.2)'
        }}>
          {[
            { icon: '🛏', value: bedrooms === 0 ? 'Studio' : `${bedrooms} Bed` },
            { icon: '🚿', value: `${bathrooms} Bath` },
            { icon: '📐', value: `${area.toLocaleString()} sqft` },
          ].map(stat => (
            <div key={stat.value} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#8aafd4',
              fontSize: '0.8rem'
            }}>
              <span style={{ fontSize: '0.85rem' }}>{stat.icon}</span>
              {stat.value}
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.1rem' }}>
              {formatPrice(price, type)}
            </div>
            {status === 'Off Plan' && (
              <div style={{ color: '#8e44ad', fontSize: '0.72rem', marginTop: '2px' }}>
                Payment plan available
              </div>
            )}
          </div>

          <Link
            to={`/property/${_id}`}
            style={{
              backgroundColor: '#2d5fc4',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  )
}

export default PropertyCard