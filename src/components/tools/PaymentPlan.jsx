import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { NumField, Stat } from './ToolField'

const fmt = (n) => Math.round(n).toLocaleString('en-US')

// [booking, construction, post]; handover is whatever remains
const PRESETS = [
  ['p2080', 20, 0, 0],
  ['p4060', 40, 0, 0],
  ['p6040', 60, 0, 0],
  ['p5050', 50, 0, 0],
  ['pPost', 20, 30, 30],
]

const PaymentPlan = () => {
  const { t } = useTranslation()
  const [price, setPrice] = useState(1800000)
  const [booking, setBooking] = useState(20)
  const [build, setBuild] = useState(30)
  const [post, setPost] = useState(0)
  const [months, setMonths] = useState(24)
  const [monthsPost, setMonthsPost] = useState(24)

  const handover = 100 - booking - build - post
  const over = handover < 0
  const amt = (p) => (price * p) / 100
  const segments = [
    { k: 'booking', p: booking, c: '#c9a24b' },
    { k: 'construction', p: build, c: '#2d5fc4' },
    { k: 'handover', p: Math.max(handover, 0), c: '#4a90d9' },
    { k: 'post', p: post, c: '#8aafd4' },
  ]

  return (
    <Row className="g-4">
      <Col md={6}>
        <NumField label={t('plan.price')} value={price} onChange={setPrice} step={50000} />
        <div style={{ color: '#8aafd4', fontSize: '0.78rem', fontWeight: 600, marginBottom: '8px' }}>{t('plan.presets')}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {PRESETS.map(([key, b, c, p]) => (
            <button
              key={key} type="button"
              onClick={() => { setBooking(b); setBuild(key === 'pPost' ? c : 100 - b - p); setPost(p); if (key === 'pPost') setBuild(30) }}
              style={{ background: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.4)', color: '#fff', borderRadius: '20px', padding: '5px 14px', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              {t(`plan.${key}`)}
            </button>
          ))}
        </div>
        <Row>
          <Col xs={6}><NumField label={t('plan.booking')} value={booking} onChange={setBooking} max={100} /></Col>
          <Col xs={6}><NumField label={t('plan.construction')} value={build} onChange={setBuild} max={100} /></Col>
          <Col xs={6}><NumField label={t('plan.post')} value={post} onChange={setPost} max={100} /></Col>
          <Col xs={6}><NumField label={t('plan.months')} value={months} onChange={setMonths} min={1} /></Col>
          <Col xs={12}><NumField label={t('plan.monthsPost')} value={monthsPost} onChange={setMonthsPost} min={1} /></Col>
        </Row>
        {over && <div style={{ color: '#ff8a8a', fontSize: '0.85rem' }}>{t('plan.over')}</div>}
      </Col>
      <Col md={6}>
        <div style={{ color: '#8aafd4', fontSize: '0.78rem', fontWeight: 600, marginBottom: '8px' }}>{t('plan.timeline')}</div>
        <div style={{ display: 'flex', height: '26px', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px', direction: 'ltr' }}>
          {segments.map(s => s.p > 0 && <div key={s.k} style={{ width: `${s.p}%`, background: s.c }} title={`${s.p}%`} />)}
        </div>
        <Row className="g-3">
          <Col xs={6}><Stat label={`${t('plan.booking')} · ${booking}%`} value={`AED ${fmt(amt(booking))}`} accent /></Col>
          <Col xs={6}><Stat label={`${t('plan.construction')} · ${build}%`} value={`AED ${fmt(amt(build))}`} /></Col>
          <Col xs={6}><Stat label={`${t('plan.handover')} · ${Math.max(handover, 0)}%`} value={`AED ${fmt(amt(Math.max(handover, 0)))}`} /></Col>
          <Col xs={6}><Stat label={`${t('plan.post')} · ${post}%`} value={`AED ${fmt(amt(post))}`} /></Col>
          <Col xs={6}><Stat label={t('plan.monthlyBuild')} value={`AED ${fmt(amt(build) / months)}`} /></Col>
          <Col xs={6}><Stat label={t('plan.monthlyPost')} value={post > 0 ? `AED ${fmt(amt(post) / monthsPost)}` : '—'} /></Col>
        </Row>
        <div style={{ color: '#8aafd4', fontSize: '0.8rem', marginTop: '14px' }}>
          {t('plan.fees')}: AED {fmt(price * 0.06)}
        </div>
      </Col>
    </Row>
  )
}

export default PaymentPlan
