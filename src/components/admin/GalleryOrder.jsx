// Thumbnail strip for the gallery URLs field: reorder, remove, or promote a photo to main image.
const btn = {
  background: 'rgba(6,15,38,0.85)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)',
  borderRadius: '6px', width: '24px', height: '24px', fontSize: '0.7rem', cursor: 'pointer', padding: 0, lineHeight: 1,
}

const GalleryOrder = ({ main, gallery, onChange }) => {
  const urls = gallery.split(',').map(s => s.trim()).filter(Boolean)
  if (urls.length === 0) return null

  const commit = (next, image = main) => onChange({ image, gallery: next.join(', ') })
  const move = (i, d) => {
    const j = i + d
    if (j < 0 || j >= urls.length) return
    const next = [...urls]
    ;[next[i], next[j]] = [next[j], next[i]]
    commit(next)
  }
  const remove = (i) => commit(urls.filter((_, k) => k !== i))
  const makeMain = (i) => {
    const next = [...urls]
    next[i] = main || next[i]
    commit(main ? next : urls.filter((_, k) => k !== i), urls[i])
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px' }}>
      {urls.map((u, i) => (
        <div key={`${u}-${i}`} style={{ position: 'relative', width: '96px' }}>
          <img src={u} alt={`Gallery ${i + 1}`} loading="lazy" style={{ width: '96px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(45,95,196,0.3)', display: 'block' }} />
          <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', marginTop: '4px' }}>
            <button type="button" style={btn} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move earlier">◀</button>
            <button type="button" style={btn} onClick={() => move(i, 1)} disabled={i === urls.length - 1} aria-label="Move later">▶</button>
            <button type="button" style={btn} onClick={() => makeMain(i)} title="Make main photo" aria-label="Make main photo">★</button>
            <button type="button" style={{ ...btn, color: '#ff8a80' }} onClick={() => remove(i)} aria-label="Remove photo">✕</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GalleryOrder
