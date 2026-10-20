import { useFavorites } from '../../hooks/useFavorites'
import { useToast } from './useToast'
import { useTranslation } from 'react-i18next'

// Round heart button. Used on property cards and the detail page.
const FavoriteButton = ({ id, title = 'property', size = 38, style }) => {
  const { isFav, toggle } = useFavorites()
  const { showToast } = useToast()
  const { t } = useTranslation()
  const active = isFav(id)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(id)
    showToast(active ? t('fav.removed') : t('fav.saved'), active ? 'info' : 'success', 2200)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? t('fav.remove', { title }) : t('fav.save', { title })}
      className={`fav-btn ${active ? 'is-active' : ''}`}
      style={{ width: size, height: size, ...style }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" aria-hidden="true"
        fill={active ? '#ff4d6d' : 'none'} stroke={active ? '#ff4d6d' : '#ffffff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <style>{`
        .fav-btn {
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%; padding: 0; cursor: pointer;
          background: rgba(6,15,38,0.65);
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.25);
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .fav-btn:hover { transform: scale(1.1); background: rgba(6,15,38,0.85); border-color: rgba(255,77,109,0.6); }
        .fav-btn.is-active { border-color: rgba(255,77,109,0.7); animation: favPop 0.35s ease; }
        @keyframes favPop { 0% { transform: scale(1); } 45% { transform: scale(1.3); } 100% { transform: scale(1); } }
      `}</style>
    </button>
  )
}

export default FavoriteButton
