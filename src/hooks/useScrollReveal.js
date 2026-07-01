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
      direction = 'up',   // 'up' | 'down' | 'left' | 'right'
      opacity = true,
    } = options

    // Set initial styles
    const transforms = {
      up:    `translateY(${distance})`,
      down:  `translateY(-${distance})`,
      left:  `translateX(${distance})`,
      right: `translateX(-${distance})`,
    }

    el.style.transition = `transform ${duration}ms ease ${delay}ms, opacity ${duration}ms ease ${delay}ms`
    el.style.transform = transforms[direction]
    el.style.opacity = opacity ? '0' : '1'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transform = 'translate(0)'
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