import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Fire-and-forget ping so a sleeping free-tier server starts waking
// as soon as the site opens, while the visitor is still on the loader/hero.
export const warmUpApi = () => {
  try { fetch(API_URL, { mode: 'no-cors' }).catch(() => {}) } catch { /* ignore */ }
}

let cache = null

const wait = (ms) => new Promise(r => setTimeout(r, ms))

// One shared request for the whole site, with automatic retries.
// A cold server can take 30s+, so we retry a few times before giving up.
export const fetchProperties = ({ force = false } = {}) => {
  if (cache && !force) return cache
  cache = (async () => {
    let lastErr
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const res = await axios.get(`${API_URL}/api/properties`, { timeout: 25000 })
        return res.data.data || []
      } catch (err) {
        lastErr = err
        await wait(1500 * (attempt + 1))
      }
    }
    cache = null // allow a manual retry later
    throw lastErr
  })()
  return cache
}
