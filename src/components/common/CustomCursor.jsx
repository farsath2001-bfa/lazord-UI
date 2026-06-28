import { useEffect, useRef, useState } from 'react'

const SECTION_COLORS = {
  default:    '#4a90d9',  // blue
  hero:       '#4a90d9',  // blue
  properties: '#27ae60',  // green
  services:   '#e67e22',  // orange
  whychoose:  '#8e44ad',  // purple
  areas:      '#16a085',  // teal
  testimonials:'#f1c40f', // yellow
  contact:    '#e74c3c',  // red
  footer:     '#ffffff',  // white
}

const CustomCursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const colorRef = useRef('#4a90d9')
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [color, setColor] = useState('#4a90d9')

  const pos = useRef({ x: 0, y: 0 })
  const follower = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onMouseMove = (e) => {
      setIsVisible(true)
      pos.current = { x: e.clientX, y: e.clientY }

      // Dot moves instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }

      // Detect section color by data-cursor attribute
      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (el) {
        const section = el.closest('[data-cursor]')
        const newColor = section
          ? (SECTION_COLORS[section.getAttribute('data-cursor')] || SECTION_COLORS.default)
          : SECTION_COLORS.default

        if (newColor !== colorRef.current) {
          colorRef.current = newColor
          setColor(newColor)
        }
      }
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)
    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    const onHoverStart = (e) => {
      if (e.target.closest('a, button, [role="button"], input, select, textarea, label')) {
        setIsHovering(true)
      }
    }
    const onHoverEnd = () => setIsHovering(false)

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', onHoverStart)
    document.addEventListener('mouseout', onHoverEnd)

    // Smooth follower ring using RAF directly on DOM
    const animate = () => {
      follower.current.x += (pos.current.x - follower.current.x) * 0.18
      follower.current.y += (pos.current.y - follower.current.y) * 0.18

      if (ringRef.current) {
        ringRef.current.style.left = `${follower.current.x}px`
        ringRef.current.style.top = `${follower.current.y}px`
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onHoverStart)
      document.removeEventListener('mouseout', onHoverEnd)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Dot — instant */}
      <div ref={dotRef} style={{
        position: 'fixed',
        width: isClicking ? '6px' : '8px',
        height: isClicking ? '6px' : '8px',
        backgroundColor: color,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 999999,
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0,
        transition: 'width 0.1s, height 0.1s, opacity 0.3s, background-color 0.4s ease',
        boxShadow: `0 0 8px ${color}cc, 0 0 16px ${color}66`,
      }} />

      {/* Ring — smooth lag */}
      <div ref={ringRef} style={{
        position: 'fixed',
        width: isHovering ? '48px' : isClicking ? '24px' : '34px',
        height: isHovering ? '48px' : isClicking ? '24px' : '34px',
        border: `1.5px solid ${color}`,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 999998,
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? (isHovering ? 0.9 : 0.5) : 0,
        transition: 'width 0.25s ease, height 0.25s ease, border-color 0.4s ease, opacity 0.3s',
        backgroundColor: isHovering ? `${color}15` : 'transparent',
        boxShadow: isHovering ? `0 0 18px ${color}44` : 'none',
      }} />

      <style>{`* { cursor: none !important; }`}</style>
    </>
  )
}

export default CustomCursor