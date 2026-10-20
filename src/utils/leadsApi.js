import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Set once a visitor has sent us any lead, so we stop showing offers.
export const LEAD_FLAG = 'lazord_lead_sent'

// All website leads go to the existing /api/leads endpoint (shown in Admin → Leads).
// Allowed sources: Contact Form, Property Inquiry, WhatsApp, Phone, Walk In, Website Popup.
export const submitLead = async (payload) => {
  const res = await axios.post(`${API_URL}/api/leads`, { email: 'n/a', ...payload }, { timeout: 20000 })
  try { localStorage.setItem(LEAD_FLAG, '1') } catch { /* storage blocked */ }
  return res.data
}

export const digitsOnly = (v) => String(v || '').replace(/\D/g, '')
