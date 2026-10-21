import { useState } from 'react'

const field = {
  width: '100%', backgroundColor: '#060f26', border: '1px solid rgba(45,95,196,0.3)', borderRadius: '8px',
  color: '#ffffff', padding: '10px 14px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box',
}
const label = { color: '#8aafd4', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }

// Agent assignment, follow-up date and private notes for one lead.
// Render with key={lead._id} so the notes box resets when another lead is opened.
const LeadExtras = ({ lead, agents, onPatch }) => {
  const [notes, setNotes] = useState(lead.notes || '')
  const agentId = lead.assignedAgent?._id || lead.assignedAgent || ''
  const follow = lead.followUpAt ? String(lead.followUpAt).slice(0, 10) : ''
  const today = new Date().toISOString().slice(0, 10)
  const overdue = follow && follow < today && !['Closed', 'Lost'].includes(lead.status)

  return (
    <div className="no-print" style={{ marginBottom: '20px', display: 'grid', gap: '14px' }}>
      <div>
        <label style={label} htmlFor="lead-agent">👤 Assigned agent</label>
        <select id="lead-agent" name="assignedAgent" style={{ ...field, cursor: 'pointer' }} value={agentId}
          onChange={e => onPatch(lead._id, { assignedAgent: e.target.value || null }, 'Agent updated')}>
          <option value="">Unassigned</option>
          {agents.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
        </select>
      </div>
      <div>
        <label style={label} htmlFor="lead-follow">
          📅 Follow-up date {overdue && <span style={{ color: '#e74c3c', fontWeight: 700 }}>· overdue</span>}
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input id="lead-follow" type="date" name="followUpAt" style={field} value={follow}
            onChange={e => onPatch(lead._id, { followUpAt: e.target.value || null }, 'Follow-up saved')} />
          {follow && <button type="button" className="adm-btn adm-btn-red" onClick={() => onPatch(lead._id, { followUpAt: null }, 'Follow-up cleared')}>✕</button>}
        </div>
      </div>
      <div>
        <label style={label} htmlFor="lead-notes">📝 Private notes</label>
        <textarea id="lead-notes" name="notes" rows={4} style={{ ...field, resize: 'vertical', lineHeight: 1.6 }} value={notes}
          onChange={e => setNotes(e.target.value)} placeholder="Called twice, wants 2BR in Marina under 1.5M…" />
        {notes !== (lead.notes || '') && (
          <button type="button" className="adm-btn adm-btn-gold" style={{ marginTop: '8px' }} onClick={() => onPatch(lead._id, { notes }, 'Notes saved')}>Save notes</button>
        )}
      </div>
    </div>
  )
}

export default LeadExtras
