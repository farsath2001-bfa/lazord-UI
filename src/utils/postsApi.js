import axios from 'axios'

const API = import.meta.env.VITE_API_URL

let listCache = null

export const fetchPosts = async ({ force = false } = {}) => {
  if (listCache && !force) return listCache
  const res = await axios.get(`${API}/api/posts`)
  listCache = res.data.data || []
  return listCache
}

export const fetchPostBySlug = async (slug) => {
  const res = await axios.get(`${API}/api/posts/slug/${encodeURIComponent(slug)}`)
  return res.data.data
}

// Pick the Arabic field when the site is in Arabic and it exists, otherwise fall back to English.
export const localized = (post, field, isAr) => (isAr && post[`${field}Ar`]) || post[field] || ''

export const readingMinutes = (text = '') => Math.max(1, Math.round(text.trim().split(/\s+/).length / 200))
