import { Link } from 'react-router-dom'

// Tiny, safe renderer for the light markdown used in blog posts.
// Supports: ## heading, ### sub-heading, - bullets, > quote, **bold**, [text](/path or https://url).
// Nothing is injected as raw HTML.

const safeHref = (href) => {
  if (/^\/(?!\/)/.test(href)) return { href, internal: true }
  if (/^https:\/\//i.test(href)) return { href, internal: false }
  return null
}

const inline = (text, key) => {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean)
  return parts.map((part, i) => {
    const k = `${key}-${i}`
    const bold = part.match(/^\*\*([^*]+)\*\*$/)
    if (bold) return <strong key={k} style={{ color: '#fff' }}>{bold[1]}</strong>
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const target = safeHref(link[2].trim())
      if (!target) return <span key={k}>{link[1]}</span>
      const style = { color: '#e0bf6a', textDecoration: 'underline', textUnderlineOffset: '3px' }
      return target.internal
        ? <Link key={k} to={target.href} style={style}>{link[1]}</Link>
        : <a key={k} href={target.href} target="_blank" rel="noopener noreferrer" style={style}>{link[1]}</a>
    }
    return <span key={k}>{part}</span>
  })
}

const RichText = ({ text = '' }) => {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const out = []
  let para = []
  let list = []

  const flushPara = () => {
    if (para.length) {
      out.push(<p key={`p${out.length}`} className="rt-p">{inline(para.join(' '), `p${out.length}`)}</p>)
      para = []
    }
  }
  const flushList = () => {
    if (list.length) {
      out.push(<ul key={`u${out.length}`} className="rt-ul">{list.map((li, i) => <li key={i}>{inline(li, `l${out.length}-${i}`)}</li>)}</ul>)
      list = []
    }
  }

  lines.forEach(raw => {
    const line = raw.trim()
    if (!line) { flushPara(); flushList(); return }
    if (line.startsWith('### ')) { flushPara(); flushList(); out.push(<h3 key={`h${out.length}`} className="rt-h3">{inline(line.slice(4), `h${out.length}`)}</h3>); return }
    if (line.startsWith('## ')) { flushPara(); flushList(); out.push(<h2 key={`h${out.length}`} className="rt-h2">{inline(line.slice(3), `h${out.length}`)}</h2>); return }
    if (line.startsWith('> ')) { flushPara(); flushList(); out.push(<blockquote key={`q${out.length}`} className="rt-q">{inline(line.slice(2), `q${out.length}`)}</blockquote>); return }
    if (line.startsWith('- ')) { flushPara(); list.push(line.slice(2)); return }
    flushList(); para.push(line)
  })
  flushPara(); flushList()

  return (
    <div className="rt">
      {out}
      <style>{`
        .rt { color: #c0d4f0; font-size: 1.02rem; line-height: 1.9; }
        .rt-h2 { color: #fff; font-size: 1.45rem; font-weight: 700; margin: 34px 0 12px; }
        .rt-h3 { color: #fff; font-size: 1.15rem; font-weight: 700; margin: 24px 0 8px; }
        .rt-p { margin: 0 0 16px; }
        .rt-ul { margin: 0 0 18px; padding-inline-start: 22px; }
        .rt-ul li { margin-bottom: 8px; }
        .rt-q { margin: 24px 0; padding: 16px 20px; border-inline-start: 3px solid #c9a24b; background: rgba(201,162,75,0.08); border-radius: 0 12px 12px 0; color: #f0dca0; font-weight: 600; }
        [dir="rtl"] .rt-q { border-radius: 12px 0 0 12px; }
      `}</style>
    </div>
  )
}

export default RichText
