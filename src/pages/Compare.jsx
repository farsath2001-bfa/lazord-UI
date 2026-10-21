import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { useLocalize } from '../utils/useLocalize'
import { useCompare } from '../hooks/useCompare'
import { fetchProperties } from '../utils/propertiesApi'
import { optimizeImg } from '../utils/img'

const Compare = () => {
  const { t, tv, num, formatPrice } = useLocalize()
  const { ids, remove, clear } = useCompare()
  const [all, setAll] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchProperties()
      .then(list => { if (!cancelled) setAll(list) })
      .catch(() => { if (!cancelled) setAll([]) })
    return () => { cancelled = true }
  }, [])

  const items = all ? ids.map(id => all.find(p => p._id === id)).filter(Boolean) : []
  const ppsf = (p) => (p.area > 0 && p.price > 0 ? Math.round(p.price / p.area) : null)
  const sameType = items.length > 1 && items.every(p => p.type === items[0].type)
  const best = sameType
    ? Math.min(...items.map(ppsf).filter(v => v !== null), Infinity)
    : null
  const allRent = items.length > 0 && items.every(p => p.type === 'Rent')
  const aed = t('common.aed')
  const money = (v) => (v === null ? t('compare.na') : `${aed} ${num(v)}`)

  const rows = [
    { label: t('compare.row.price'), render: p => <strong style={{ color: '#4a90d9' }}>{formatPrice(p.price, p.type)}</strong> },
    { label: t('compare.row.type'), render: p => tv(p.type) },
    { label: t('compare.row.category'), render: p => tv(p.category) || t('compare.na') },
    { label: t('compare.row.location'), render: p => p.location || t('compare.na') },
    { label: t('compare.row.community'), render: p => p.community || t('compare.na') },
    { label: t('compare.row.bedrooms'), render: p => (p.bedrooms === 0 ? t('card.studio') : p.bedrooms ?? t('compare.na')) },
    { label: t('compare.row.bathrooms'), render: p => p.bathrooms ?? t('compare.na') },
    { label: t('compare.row.size'), render: p => (p.area ? t('card.sqft', { n: num(p.area) }) : t('compare.na')) },
    {
      label: allRent ? t('compare.row.ppsfRent') : t('compare.row.ppsf'),
      render: p => {
        const v = ppsf(p)
        const isBest = sameType && v !== null && v === best
        return (
          <span>
            {money(v)}
            {isBest && <span style={{ marginInlineStart: '8px', backgroundColor: 'rgba(201,162,75,0.18)', border: '1px solid rgba(201,162,75,0.5)', color: '#e0bf6a', borderRadius: '20px', padding: '2px 9px', fontSize: '0.68rem', fontWeight: 700 }}>{t('compare.bestValue')}</span>}
          </span>
        )
      }
    },
    { label: t('compare.row.status'), render: p => tv(p.status) },
  ]

  const cell = { padding: '14px 16px', borderTop: '1px solid rgba(45,95,196,0.2)', color: '#c0d4f0', fontSize: '0.9rem', verticalAlign: 'top', minWidth: '200px' }
  const labelCell = { ...cell, color: '#8aafd4', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px', minWidth: '130px', position: 'sticky', insetInlineStart: 0, backgroundColor: '#0d1f4e', zIndex: 1 }

  return (
    <>
      <SEO title={t('compare.seoTitle')} description={t('compare.seoDesc')} path="/compare" noindex />
      <div style={{ backgroundColor: '#060f26', minHeight: '100vh', padding: '50px 0 80px' }}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <div>
              <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 700, marginBottom: '6px' }}>{t('compare.title')}</h1>
              <p style={{ color: '#8aafd4', margin: 0 }}>{t('compare.subtitle')}</p>
            </div>
            {ids.length > 0 && (
              <button type="button" onClick={clear} style={{ background: 'none', border: '1px solid rgba(231,76,60,0.5)', color: '#e74c3c', borderRadius: '10px', padding: '8px 16px', fontSize: '0.82rem', cursor: 'pointer' }}>{t('compare.clear')}</button>
            )}
          </div>

          {ids.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '70px 20px', backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>⇄</div>
              <h2 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '8px' }}>{t('compare.emptyTitle')}</h2>
              <p style={{ color: '#8aafd4', marginBottom: '22px' }}>{t('compare.emptyDesc')}</p>
              <Link to="/properties" style={{ backgroundColor: '#2d5fc4', color: '#fff', textDecoration: 'none', borderRadius: '10px', padding: '12px 26px', fontWeight: 700 }}>{t('compare.browse')}</Link>
            </div>
          ) : all === null ? (
            <p style={{ color: '#8aafd4' }}>{t('compare.loading')}</p>
          ) : (
            <>
              <div style={{ overflowX: 'auto', backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ ...labelCell, borderTop: 'none' }} />
                      {items.map(p => (
                        <th key={p._id} style={{ ...cell, borderTop: 'none', fontWeight: 400 }}>
                          <Link to={`/properties/${p._id}`} style={{ textDecoration: 'none' }}>
                            {p.image && <img src={optimizeImg(p.image, 500)} alt={p.title} loading="lazy" style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />}
                            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.35 }}>{p.title}</div>
                          </Link>
                          <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
                            <Link to={`/properties/${p._id}`} style={{ color: '#4a90d9', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none' }}>{t('compare.view')}</Link>
                            <button type="button" onClick={() => remove(p._id)} style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: '0.78rem', cursor: 'pointer', padding: 0 }}>{t('compare.remove')}</button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(r => (
                      <tr key={r.label}>
                        <th scope="row" style={{ ...labelCell, fontWeight: 600 }}>{r.label}</th>
                        {items.map(p => <td key={p._id} style={cell}>{r.render(p)}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {items.length === 1 && <p style={{ color: '#8aafd4', marginTop: '16px' }}>{t('compare.addMore')}</p>}
            </>
          )}
        </Container>
      </div>
    </>
  )
}

export default Compare
