import { useRef, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useLocalize } from '../../utils/useLocalize'
import Tilt from '../common/Tilt'

const CountTo = ({ from, to, suffix = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(from)
  const text = useTransform(mv, v => `${Math.round(v)}${suffix}`)
  useEffect(() => {
    if (!inView) return undefined
    const controls = animate(mv, to, { duration: 1.6, ease: 'easeOut' })
    return () => controls.stop()
  }, [inView, mv, to])
  return <motion.span ref={ref}>{text}</motion.span>
}

const DrawIcon = ({ paths }) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#c9a24b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths.map((d, i) => (
      <motion.path
        key={i} d={d}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: 'easeInOut' }}
      />
    ))}
  </svg>
)

const tiles = [
  { key: 'tax',    hash: 'tax',       from: 10, to: 0,   suffix: '%', paths: ['M3 11l9-8 9 8', 'M5 10v10h14V10', 'M10 20v-6h4v6'] },
  { key: 'income', hash: 'tax',       from: 20, to: 0,   suffix: '%', paths: ['M12 3a9 9 0 100 18 9 9 0 000-18z', 'M9 9.5c0-1 1-1.8 3-1.8s3 .8 3 1.8-1 1.6-3 2-3 1-3 2 1 1.8 3 1.8 3-.8 3-1.8', 'M12 6v1.7M12 16.3V18'] },
  { key: 'visa',   hash: 'visa',      from: 0,  to: 10,  suffix: '',  unit: true, paths: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z', 'M8.5 12l2.5 2.5L16 9.5'] },
  { key: 'own',    hash: 'ownership', from: 0,  to: 100, suffix: '%', paths: ['M12 3a9 9 0 100 18 9 9 0 000-18z', 'M3 12h18', 'M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18'] },
]

const WhyDubai = () => {
  const { t } = useLocalize()
  return (
    <section style={{ background: 'linear-gradient(180deg, #060f26 0%, #0a1630 100%)', padding: '70px 0' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(201,162,75,0.12)', border: '1px solid rgba(201,162,75,0.4)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: '#e9d6a3', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ {t('whyDubai.badge')}</span>
          </div>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', marginBottom: '6px' }}>{t('whyDubai.title1')}</h2>
          <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '16px' }}>{t('whyDubai.title2')}</h2>
          <p style={{ color: '#8aafd4', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7' }}>{t('whyDubai.subtitle')}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{ height: '100%' }}
            >
              <Tilt max={7}>
                <Link
                  to={`/faq#${tile.hash}`}
                  className="why-dubai-tile"
                  style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', backgroundColor: '#0d1f4e', border: '1px solid rgba(201,162,75,0.25)', borderRadius: '16px', padding: '26px 22px', position: 'relative', overflow: 'hidden' }}
                >
                  <div style={{ position: 'absolute', top: '-40px', insetInlineEnd: '-40px', width: '130px', height: '130px', borderRadius: '50%', backgroundColor: '#c9a24b', opacity: 0.07, filter: 'blur(36px)' }} />
                  <div style={{ width: '54px', height: '54px', borderRadius: '14px', backgroundColor: 'rgba(201,162,75,0.1)', border: '1px solid rgba(201,162,75,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                    <DrawIcon paths={tile.paths} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }} dir="ltr">
                    <span style={{ color: '#e0bf6a', fontSize: '2.6rem', fontWeight: 800, lineHeight: 1 }}>
                      <CountTo from={tile.from} to={tile.to} suffix={tile.suffix} />
                    </span>
                    {tile.unit && <span style={{ color: '#e9d6a3', fontSize: '1rem', fontWeight: 600 }}>{t('whyDubai.visa.unit')}</span>}
                  </div>
                  <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.05rem', marginBottom: '8px' }}>{t(`whyDubai.${tile.key}.title`)}</div>
                  <p style={{ color: '#8aafd4', fontSize: '0.86rem', lineHeight: 1.6, flex: 1, marginBottom: '14px' }}>{t(`whyDubai.${tile.key}.desc`)}</p>
                  <span style={{ color: '#4a90d9', fontSize: '0.8rem', fontWeight: 700 }}>{t('whyDubai.more')}</span>
                </Link>
              </Tilt>
            </motion.div>
          ))}
        </div>

        <p style={{ color: '#6f8fb8', fontSize: '0.74rem', textAlign: 'center', marginTop: '24px' }}>{t('whyDubai.note')}</p>
      </Container>
      <style>{`
        .why-dubai-tile { transition: border-color 0.25s ease, box-shadow 0.25s ease; }
        .why-dubai-tile:hover { border-color: rgba(201,162,75,0.7) !important; box-shadow: 0 18px 44px rgba(201,162,75,0.12); }
      `}</style>
    </section>
  )
}

export default WhyDubai
