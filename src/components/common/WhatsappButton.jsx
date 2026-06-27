import { useState } from 'react'

const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)

  const phoneNumber = '971561119233'
  const message = 'Hello! I am interested in a property from Lazord Real Estate.'

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>

      {/* Tooltip */}
      {showTooltip && (
        <div style={{
          backgroundColor: '#ffffff',
          color: '#1a1a2e',
          padding: '10px 16px',
          borderRadius: '12px',
          fontSize: '0.82rem',
          fontWeight: '600',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          whiteSpace: 'nowrap',
          position: 'relative',
          animation: 'fadeIn 0.3s ease'
        }}>
          💬 Chat with us on WhatsApp!
          {/* Close tooltip */}
          <span
            onClick={() => setShowTooltip(false)}
            style={{ marginLeft: '10px', cursor: 'pointer', color: '#999', fontWeight: '700', fontSize: '0.9rem' }}
          >×</span>
          {/* Arrow */}
          <div style={{ position: 'absolute', bottom: '-6px', right: '24px', width: '12px', height: '12px', backgroundColor: '#ffffff', transform: 'rotate(45deg)', boxShadow: '2px 2px 4px rgba(0,0,0,0.05)' }} />
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25d366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hovered
            ? '0 8px 30px rgba(37,211,102,0.6)'
            : '0 4px 20px rgba(37,211,102,0.4)',
          transition: 'all 0.3s ease',
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          textDecoration: 'none',
          position: 'relative'
        }}
      >
        {/* Pulse ring */}
        <div style={{
          position: 'absolute',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25d366',
          opacity: 0.4,
          animation: 'pulse-ring 2s ease-out infinite'
        }} />

        {/* WhatsApp SVG Icon */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          80%, 100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default WhatsAppButton