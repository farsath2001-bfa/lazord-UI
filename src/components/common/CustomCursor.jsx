import { useState, useEffect } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [follower, setFollower] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let animFrame

    const onMouseMove = (e) => {
      setIsVisible(true)
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)
    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    // Hover detection on interactive elements
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

    // Smooth follower animation
    let fx = 0, fy = 0
    const animate = () => {
      setFollower(prev => {
        fx += (position.x - fx) * 0.12
        fy += (position.y - fy) * 0.12
        return { x: fx, y: fy }
      })
      animFrame = requestAnimationFrame(animate)
    }
    animFrame = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onHoverStart)
      document.removeEventListener('mouseout', onHoverEnd)
      cancelAnimationFrame(animFrame)
    }
  }, [position.x, position.y])

  if (!isVisible) return null

  return (
    <>
      {/* Main dot cursor */}
      <div style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: isClicking ? '6px' : '8px',
        height: isClicking ? '6px' : '8px',
        backgroundColor: '#4a90d9',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 999999,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.15s ease, height 0.15s ease, background-color 0.2s ease',
        boxShadow: '0 0 10px rgba(74,144,217,0.8), 0 0 20px rgba(74,144,217,0.4)',
      }} />

      {/* Follower ring */}
      <div style={{
        position: 'fixed',
        left: follower.x,
        top: follower.y,
        width: isHovering ? '48px' : isClicking ? '28px' : '36px',
        height: isHovering ? '48px' : isClicking ? '28px' : '36px',
        border: `1.5px solid ${isHovering ? 'rgba(74,144,217,0.8)' : 'rgba(74,144,217,0.4)'}`,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 999998,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
        backgroundColor: isHovering ? 'rgba(74,144,217,0.06)' : 'transparent',
        boxShadow: isHovering ? '0 0 20px rgba(74,144,217,0.2)' : 'none',
      }} />

      <style>{`
        * { cursor: none !important; }
      `}</style>
    </>
  )
}

export default CustomCursor