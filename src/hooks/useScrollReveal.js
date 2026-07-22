import { useEffect, useRef } from 'react'

const useScrollReveal = (options = {}) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      delay = 0,
      duration = 600,
      distance = '30px',
      direction = 'up',
      opacity = true,
    } = options

    const transforms = {
      up:    `translateY(${distance})`,
      down:  `translateY(-${distance})`,
      left:  `translateX(${distance})`,
      right: `translateX(-${distance})`,
    }

    // ── Set initial hidden state immediately ──
    el.style.transform = transforms[direction]
    el.style.opacity = opacity ? '0' : '1'
    el.style.visibility = 'visible'

    // ── Add transition after a frame so initial state doesn't animate in ──
    requestAnimationFrame(() => {
      el.style.transition = `transform ${duration}ms ease ${delay}ms, opacity ${duration}ms ease ${delay}ms`
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transform = 'none'
          el.style.opacity = '1'
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

export default useScrollReveal