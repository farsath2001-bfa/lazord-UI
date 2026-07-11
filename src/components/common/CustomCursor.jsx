import { useEffect, useRef, useState } from 'react'

const CustomCursor = () => {
  const cursorRef  = useRef(null)
  const trailerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // ── Disable on touch/mobile devices ──
    const isTouchDevice = () =>
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches

    if (isTouchDevice()) return // exit early — no cursor on mobile

    const cursor  = cursorRef.current
    const trailer = trailerRef.current
    if (!cursor || !trailer) return

    let mouseX = 0, mouseY = 0
    let trailerX = 0, trailerY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setVisible(true)
      cursor.style.left  = `${mouseX}px`
      cursor.style.top   = `${mouseY}px`
    }

    const onMouseLeave = () => setVisible(false)
    const onMouseEnter = () => setVisible(true)

    const animate = () => {
      trailerX += (mouseX - trailerX) * 0.12
      trailerY += (mouseY - trailerY) * 0.12
      trailer.style.left = `${trailerX}px`
      trailer.style.top  = `${trailerY}px`
      requestAnimationFrame(animate)
    }

    const handleHover = () => {
      cursor.style.transform  = 'translate(-50%, -50%) scale(1.8)'
      trailer.style.transform = 'translate(-50%, -50%) scale(1.5)'
      cursor.style.backgroundColor  = 'rgba(74,144,217,0.8)'
      trailer.style.borderColor = '#4a90d9'
    }

    const handleUnhover = () => {
      cursor.style.transform  = 'translate(-50%, -50%) scale(1)'
      trailer.style.transform = 'translate(-50%, -50%) scale(1)'
      cursor.style.backgroundColor  = '#4a90d9'
      trailer.style.borderColor = 'rgba(74,144,217,0.5)'
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleUnhover)
    })

    const raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleHover)
        el.removeEventListener('mouseleave', handleUnhover)
      })
      cancelAnimationFrame(raf)
    }
  }, [])

  // Don't render anything on touch devices
  if (typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0 ||
     window.matchMedia('(pointer: coarse)').matches)) {
    return null
  }

  return (
    <>
      {/* Main dot */}
      <div ref={cursorRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 99999,
        width: '10px', height: '10px', borderRadius: '50%',
        backgroundColor: '#4a90d9',
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.15s ease, background-color 0.15s ease',
        opacity: visible ? 1 : 0,
        mixBlendMode: 'difference',
      }} />
      {/* Trailing ring */}
      <div ref={trailerRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 99998,
        width: '36px', height: '36px', borderRadius: '50%',
        border: '1.5px solid rgba(74,144,217,0.5)',
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        opacity: visible ? 1 : 0,
      }} />
    </>
  )
}

export default CustomCursor