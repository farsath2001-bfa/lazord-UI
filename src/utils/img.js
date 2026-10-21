// Ask the image host for a smaller, modern-format copy. Unknown hosts are returned unchanged.
export const optimizeImg = (url, width = 800) => {
  if (!url || typeof url !== 'string') return url
  try {
    if (url.includes('res.cloudinary.com') && url.includes('/upload/') && !/\/upload\/[^/]*(f_auto|q_auto)/.test(url)) {
      return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`)
    }
    if (url.includes('images.unsplash.com')) {
      const u = new URL(url)
      u.searchParams.set('w', String(width))
      u.searchParams.set('q', '75')
      u.searchParams.set('auto', 'format')
      return u.toString()
    }
  } catch { /* fall through */ }
  return url
}
