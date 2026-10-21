import axios from 'axios'

const API = import.meta.env.VITE_API_URL

let cache = null

// Active agents for the public site (cached for the session).
export const fetchAgents = async () => {
  if (cache) return cache
  const res = await axios.get(`${API}/api/agents`)
  cache = res.data.data || []
  return cache
}
