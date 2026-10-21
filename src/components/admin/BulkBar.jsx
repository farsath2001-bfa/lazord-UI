import { useState } from 'react'

const sel = {
  backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.35)', borderRadius: '8px',
  color: '#fff', padding: '8px 10px', fontSize: '0.8rem', outline: 'none', cursor: 'pointer',
}

// Appears above the listings table while rows are ticked.
const BulkBar = ({ count, agents, onApply, onDelete, onClear }) => {
  const [status, setStatus] = useState('')
  const [agent, setAgent] = useState('')

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', padding: '12px 16px', background: 'rgba(201,162,75,0.1)', borderBottom: '1px solid rgba(201,162,75,0.35)' }}>
      <strong style={{ color: '#f0dca0', fontSize: '0.85rem' }}>{count} selected</strong>

      <select aria-label="Bulk status" style={sel} value={status} onChange={e => { const v = e.target.value; setStatus(''); if (v) onApply({ status: v }, `Status set to ${v}`) }}>
        <option value="">Set status…</option>
        {['Available', 'Sold', 'Rented', 'Off Plan'].map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <select aria-label="Bulk agent" style={sel} value={agent} onChange={e => {
        const v = e.target.value; setAgent('')
        if (v) onApply({ agent: v === 'none' ? null : v }, v === 'none' ? 'Agent cleared' : 'Agent assigned')
      }}>
        <option value="">Assign agent…</option>
        <option value="none">No agent (company default)</option>
        {agents.filter(a => a.active).map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
      </select>

      <button type="button" className="adm-btn adm-btn-gold" onClick={() => onApply({ featured: true }, 'Marked as featured')}>★ Feature</button>
      <button type="button" className="adm-btn adm-btn-blue" onClick={() => onApply({ featured: false }, 'Removed from featured')}>☆ Unfeature</button>
      <button type="button" className="adm-btn adm-btn-red" onClick={onDelete}>🗑️ Delete</button>
      <button type="button" className="adm-btn" onClick={onClear} style={{ marginLeft: 'auto' }}>Clear</button>
    </div>
  )
}

export default BulkBar
