import { useRef } from 'react'

// Subtle 3D tilt toward the cursor. No-op on touch devices.
const Tilt = ({ children, max = 6, style, className }) => {
  const ref = useRef(null)
  const fine = typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches

  const move = (e) => {
    if (!fine || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`
  }
  const leave = () => { if (ref.current) ref.current.style.transform = '' }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ height: '100%', transition: 'transform 0.25s ease', willChange: 'transform', ...style }}
    >
      {children}
    </div>
  )
}

export default Tilt
