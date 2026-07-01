import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const NotFound = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div style={{
      backgroundColor: '#060f26', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', overflow: 'hidden'
    }}>

      {/* Animated background blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: '500px', height: '500px',
          borderRadius: '50%', top: '-100px', left: '-100px',
          background: 'radial-gradient(circle, rgba(45,95,196,0.08) 0%, transparent 70%)',
          animation: 'float1 8s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          borderRadius: '50%', bottom: '-80px', right: '-80px',
          background: 'radial-gradient(circle, rgba(74,144,217,0.06) 0%, transparent 70%)',
          animation: 'float2 10s ease-in-out infinite'
        }} />
      </div>

      <div style={{
        textAlign: 'center', position: 'relative', zIndex: 1,
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.7s ease'
      }}>

        {/* 404 number */}
        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <div style={{
            fontSize: 'clamp(8rem, 20vw, 14rem)', fontWeight: '900',
            lineHeight: 1, color: 'transparent',
            backgroundImage: 'linear-gradient(135deg, #0d1f4e 0%, #2d5fc4 50%, #4a90d9 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            userSelect: 'none', letterSpacing: '-4px'
          }}>
            404
          </div>
          {/* Glow behind number */}
          <div style={{
            position: 'absolute', inset: 0,
            fontSize: 'clamp(8rem, 20vw, 14rem)', fontWeight: '900',
            lineHeight: 1, color: 'transparent',
            backgroundImage: 'linear-gradient(135deg, #0d1f4e 0%, #2d5fc4 50%, #4a90d9 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            filter: 'blur(40px)', opacity: 0.3, userSelect: 'none', letterSpacing: '-4px'
          }}>
            404
          </div>
        </div>

        {/* Building icon */}
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏙️</div>

        {/* Title */}
        <h1 style={{
          color: '#ffffff', fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          fontWeight: '700', marginBottom: '12px'
        }}>
          Property Not Found
        </h1>

        {/* Subtitle */}
        <p style={{
          color: '#8aafd4', fontSize: '1rem', lineHeight: '1.7',
          maxWidth: '420px', margin: '0 auto 36px'
        }}>
          The page you're looking for has moved, been sold, or doesn't exist.
          Let's find you something better.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/"
            style={{
              backgroundColor: '#2d5fc4', color: '#fff',
              padding: '13px 28px', borderRadius: '10px',
              textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem',
              transition: 'background 0.2s ease', display: 'inline-flex',
              alignItems: 'center', gap: '8px'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}
          >
            🏠 Go Home
          </Link>
          <Link to="/properties"
            style={{
              backgroundColor: 'transparent', color: '#4a90d9',
              padding: '13px 28px', borderRadius: '10px',
              textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem',
              border: '1.5px solid rgba(74,144,217,0.4)',
              transition: 'all 0.2s ease', display: 'inline-flex',
              alignItems: 'center', gap: '8px'
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(74,144,217,0.1)'; e.currentTarget.style.borderColor = '#4a90d9' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(74,144,217,0.4)' }}
          >
            🔍 Browse Properties
          </Link>
        </div>

      </div>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 20px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -30px); }
        }
      `}</style>
    </div>
  )
}

export default NotFound