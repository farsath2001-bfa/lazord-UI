import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useLocalize } from '../../utils/useLocalize'

// Vertical timeline: a gold line fills as the visitor scrolls, numbered dots pop in.
// Zigzag on desktop, single column on mobile.
const ProcessTimeline = ({ steps }) => {
  const { t } = useLocalize()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 })

  return (
    <div ref={ref} className="ptl">
      <div className="ptl-line" aria-hidden="true">
        <motion.div className="ptl-fill" style={{ scaleY: fill }} />
      </div>

      {steps.map((step, i) => (
        <div key={step.number} className={`ptl-row ${i % 2 ? 'ptl-odd' : ''}`}>
          <motion.div
            className="ptl-dot"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
          >
            {step.number}
          </motion.div>

          <motion.div
            className="ptl-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            <div className="ptl-icon" style={{ borderColor: step.color, boxShadow: `0 0 22px ${step.glow}` }}>{step.icon}</div>
            <h3 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 8px' }}>{t(step.titleKey)}</h3>
            <p style={{ color: '#8aafd4', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{t(step.descKey)}</p>
          </motion.div>

          <div className="ptl-spacer" />
        </div>
      ))}

      <style>{`
        .ptl { position: relative; max-width: 920px; margin: 0 auto; padding: 8px 0; }
        .ptl-line { position: absolute; top: 0; bottom: 0; inset-inline-start: 25px; width: 3px; background: rgba(74,144,217,0.18); border-radius: 3px; z-index: 0; }
        .ptl-fill { width: 100%; height: 100%; transform-origin: top; background: linear-gradient(180deg, #e0bf6a, #c9a24b); border-radius: 3px; box-shadow: 0 0 14px rgba(201,162,75,0.6); }
        .ptl-row { position: relative; display: flex; align-items: flex-start; gap: 18px; margin-bottom: 34px; z-index: 1; }
        .ptl-dot { flex: 0 0 53px; width: 53px; height: 53px; border-radius: 50%; background: #0a1630; border: 2px solid #c9a24b; color: #e0bf6a; font-weight: 800; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 18px rgba(201,162,75,0.35); }
        .ptl-card { flex: 1; background: rgba(13,31,78,0.75); backdrop-filter: blur(10px); border: 1px solid rgba(74,144,217,0.25); border-radius: 16px; padding: 20px 22px; }
        .ptl-icon { width: 46px; height: 46px; border-radius: 50%; border: 2px solid; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; background: rgba(13,31,78,0.9); margin-bottom: 12px; }
        .ptl-spacer { display: none; }
        @media (min-width: 768px) {
          .ptl-line { left: 50%; inset-inline-start: auto; transform: translateX(-50%); }
          .ptl-row { justify-content: center; gap: 0; margin-bottom: 40px; }
          .ptl-card { flex: 0 0 calc(50% - 46px); text-align: end; }
          .ptl-card .ptl-icon { margin-inline-start: auto; }
          .ptl-dot { margin: 0 20px; }
          .ptl-spacer { display: block; flex: 0 0 calc(50% - 46px); }
          .ptl-odd { flex-direction: row-reverse; }
          .ptl-odd .ptl-card { text-align: start; }
          .ptl-odd .ptl-card .ptl-icon { margin-inline-start: 0; }
        }
      `}</style>
    </div>
  )
}

export default ProcessTimeline
