import { useState, useEffect } from 'react'
import logo from '../../assets/image/lazordlogoo.png'

const PageLoader = ({ onComplete }) => {
  const [phase, setPhase] = useState('enter')
  const [lineWidth, setLineWidth] = useState(0)

  useEffect(() => {
    setTimeout(() => setPhase('visible'), 50)
    const lineTimer = setTimeout(() => setLineWidth(100), 100)
    const holdTimer = setTimeout(() => setPhase('exit'), 3500)
    const doneTimer = setTimeout(() => onComplete(), 4100)
    return () => {
      clearTimeout(lineTimer)
      clearTimeout(holdTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      backgroundColor: '#060f26',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'exit' ? 0 : 1,
      transition: 'opacity 0.6s ease',
      pointerEvents: phase === 'exit' ? 'none' : 'all'
    }}>

      {/* Logo */}
      <div style={{
        opacity: phase === 'enter' ? 0 : 1,
        transform: phase === 'enter' ? 'scale(0.85)' : 'scale(1)',
        transition: 'opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.2s',
        textAlign: 'center', marginBottom: '0px'
      }}>
        <img src={logo} alt="Lazord Real Estate"
          style={{ width: '150px', height: 'auto', marginBottom: '0px' }} />
      </div>

      {/* Brand name */}
      <div style={{
        opacity: phase === 'enter' ? 0 : 1,
        transform: phase === 'enter' ? 'translateY(10px)' : 'translateY(0)',
        transition: 'opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s',
        textAlign: 'center'
      }}>
        {/* Animated line */}
        <div style={{ width: '120px', height: '1px', backgroundColor: 'rgba(74,144,217,0.2)', margin: '0 auto 20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${lineWidth}%`, backgroundColor: '#4a90d9', boxShadow: '0 0 8px rgba(74,144,217,0.8)', transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }} />
        </div>

        {/* Tagline */}
        <div style={{ color: '#8aafd4', fontSize: '0.75rem', fontStyle: 'italic', letterSpacing: '2px', opacity: lineWidth === 100 ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}>
          Your Gateway to Dubai's Finest Properties
        </div>
      </div>

    </div>
  )
}

export default PageLoader