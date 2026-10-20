const labelStyle = { color: '#8aafd4', fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: '6px' }
const inputStyle = {
  width: '100%', backgroundColor: '#060f26', color: '#fff', border: '1px solid rgba(45,95,196,0.4)',
  borderRadius: '10px', padding: '10px 12px', fontSize: '0.95rem', outline: 'none',
}

export const NumField = ({ label, value, onChange, step = 1, min = 0, max }) => (
  <div style={{ marginBottom: '14px' }}>
    <label style={labelStyle}>{label}</label>
    <input
      type="number" inputMode="decimal" value={value} step={step} min={min} max={max}
      onChange={e => onChange(e.target.value === '' ? 0 : Math.max(min, Number(e.target.value)))}
      style={inputStyle}
    />
  </div>
)

export const Stat = ({ label, value, accent }) => (
  <div style={{ backgroundColor: '#060f26', border: `1px solid ${accent ? 'rgba(201,162,75,0.6)' : 'rgba(45,95,196,0.25)'}`, borderRadius: '12px', padding: '14px' }}>
    <div style={{ color: '#8aafd4', fontSize: '0.75rem', marginBottom: '4px' }}>{label}</div>
    <div style={{ color: accent ? '#e0bf6a' : '#fff', fontSize: '1.25rem', fontWeight: 700 }}>{value}</div>
  </div>
)
