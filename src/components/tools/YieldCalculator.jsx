import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { NumField, Stat } from './ToolField'

const fmt = (n) => Math.round(n).toLocaleString('en-US')

const YieldCalculator = () => {
  const { t } = useTranslation()
  const [price, setPrice] = useState(1500000)
  const [rent, setRent] = useState(100000)
  const [service, setService] = useState(12000)
  const [mgmt, setMgmt] = useState(5)
  const [vacancy, setVacancy] = useState(5)
  const [costs, setCosts] = useState(true)

  const invested = price * (costs ? 1.06 : 1)
  const effectiveRent = rent * (1 - vacancy / 100)
  const netIncome = effectiveRent - effectiveRent * (mgmt / 100) - service
  const gross = price > 0 ? (rent / price) * 100 : 0
  const net = invested > 0 ? (netIncome / invested) * 100 : 0
  const payback = netIncome > 0 ? invested / netIncome : null

  return (
    <Row className="g-4">
      <Col md={6}>
        <NumField label={t('yield.price')} value={price} onChange={setPrice} step={50000} />
        <NumField label={t('yield.rent')} value={rent} onChange={setRent} step={5000} />
        <NumField label={t('yield.service')} value={service} onChange={setService} step={500} />
        <Row>
          <Col xs={6}><NumField label={t('yield.mgmt')} value={mgmt} onChange={setMgmt} max={100} /></Col>
          <Col xs={6}><NumField label={t('yield.vacancy')} value={vacancy} onChange={setVacancy} max={100} /></Col>
        </Row>
        <label style={{ color: '#c8d8ee', fontSize: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer' }}>
          <input type="checkbox" checked={costs} onChange={e => setCosts(e.target.checked)} />
          {t('yield.costs')}
        </label>
      </Col>
      <Col md={6}>
        <Row className="g-3">
          <Col xs={6}><Stat label={t('yield.gross')} value={`${gross.toFixed(2)}%`} /></Col>
          <Col xs={6}><Stat label={t('yield.net')} value={`${net.toFixed(2)}%`} accent /></Col>
          <Col xs={6}><Stat label={t('yield.netIncome')} value={`AED ${fmt(netIncome)}`} /></Col>
          <Col xs={6}><Stat label={t('yield.monthly')} value={`AED ${fmt(netIncome / 12)}`} /></Col>
          <Col xs={6}><Stat label={t('yield.invested')} value={`AED ${fmt(invested)}`} /></Col>
          <Col xs={6}><Stat label={t('yield.payback')} value={payback ? t('yield.years', { n: payback.toFixed(1) }) : t('yield.na')} /></Col>
        </Row>
      </Col>
    </Row>
  )
}

export default YieldCalculator
