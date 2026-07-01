import { useState, useEffect } from 'react'

const BackToTop = () => {
  const [visible, setVisible] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollPercent(percent)
      setVisible(scrollTop > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // SVG circle progress
  const size = 48
  const strokeWidth = 3
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference

  return (
    <button
      onClick={scrollToTop}
      title="Back to top"
      style={{
        position: 'fixed', bottom: '32px', left: '32px', zIndex: 999,
        width: `${size}px`, height: `${size}px`,
        backgroundColor: '#0d1f4e',
        border: 'none', borderRadius: '50%', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: visible ? 'all' : 'none',
        padding: 0
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)'}
      onMouseLeave={e => e.currentTarget.style.transform = visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)'}
    >
      {/* Circular progress ring */}
      <svg
        width={size} height={size}
        style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(74,144,217,0.2)" strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#4a90d9" strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.1s ease' }}
        />
      </svg>

      {/* Arrow icon */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: 'relative', zIndex: 1 }}>
        <path d="M8 12V4M4 8l4-4 4 4" stroke="#4a90d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default BackToTop