import { useEffect, useState } from 'react'

// Drop <ScrollProgressBar /> once near the top of your layout (e.g. in App.jsx,
// right above <Navbar />). It renders a thin fixed line at the very top of the
// viewport that fills left-to-right as the user scrolls the page.
const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(pct)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: `${progress}%`,
        height: '3px',
        background: 'linear-gradient(90deg, #2d5fc4, #4a90d9)',
        zIndex: 1100,
        transition: 'width 0.1s linear',
        boxShadow: progress > 0 ? '0 0 8px rgba(74,144,217,0.5)' : 'none',
      }}
    />
  )
}

export default ScrollProgressBar