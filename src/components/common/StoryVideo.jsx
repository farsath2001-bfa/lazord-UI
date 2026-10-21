import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const DEFAULT_VIDEO = '/lazord-story.mp4'
const DEFAULT_POSTER = '/lazord-story-poster.jpg'

// Click-to-play video card. The file is only downloaded once the visitor presses play.
const StoryVideo = ({ children, alt, video = DEFAULT_VIDEO, poster = DEFAULT_POSTER, label }) => {
  const { t } = useTranslation()
  const [playing, setPlaying] = useState(false)

  return (
    <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(45,95,196,0.25)', backgroundColor: '#060f26' }}>
      {playing ? (
        <video
          src={video} poster={poster} controls autoPlay playsInline preload="auto"
          onEnded={() => setPlaying(false)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <>
          <img src={poster} alt={alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,15,38,0.15) 40%, rgba(6,15,38,0.7) 100%)' }} />
          <button
            type="button" onClick={() => setPlaying(true)} aria-label={t('about.story.play')}
            className="story-play"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '76px', height: '76px', borderRadius: '50%', border: '2px solid #e0bf6a', background: 'rgba(6,15,38,0.65)', backdropFilter: 'blur(6px)', color: '#e0bf6a', fontSize: '1.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingInlineStart: '5px' }}
          >
            ▶
          </button>
          <div style={{ position: 'absolute', bottom: '16px', insetInlineStart: '18px', color: '#fff', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.5px' }}>{label || t('about.story.watch')}</div>
          {children}
        </>
      )}
      <style>{`.story-play { transition: transform .2s ease, background-color .2s ease; } .story-play:hover { background: #c9a24b !important; color: #0a1630 !important; transform: translate(-50%, -50%) scale(1.08) !important; }`}</style>
    </div>
  )
}

export default StoryVideo
