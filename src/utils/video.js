// Turn a pasted video / virtual-tour link into something we can safely show.
// Only known hosts are embedded; direct video files play natively; anything else becomes a plain link.
export const parseVideo = (raw) => {
  if (!raw || typeof raw !== 'string') return null
  let u
  try { u = new URL(raw.trim()) } catch { return null }
  if (u.protocol !== 'https:') return null
  const host = u.hostname.replace(/^www\./, '')

  if (host === 'youtu.be') {
    const id = u.pathname.slice(1)
    return id ? { kind: 'embed', src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` } : null
  }
  if (host === 'youtube.com' || host === 'm.youtube.com') {
    const id = u.searchParams.get('v') || (u.pathname.startsWith('/embed/') || u.pathname.startsWith('/shorts/') ? u.pathname.split('/')[2] : '')
    return id ? { kind: 'embed', src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` } : null
  }
  if (host === 'vimeo.com') {
    const id = u.pathname.split('/').filter(Boolean)[0]
    return /^\d+$/.test(id || '') ? { kind: 'embed', src: `https://player.vimeo.com/video/${id}` } : null
  }
  if (host === 'my.matterport.com' && u.pathname.startsWith('/show')) {
    return { kind: 'embed', src: u.toString() }
  }
  if (/\.(mp4|webm)$/i.test(u.pathname)) return { kind: 'file', src: u.toString() }
  return { kind: 'link', src: u.toString() }
}
