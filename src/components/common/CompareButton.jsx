import { useCompare } from '../../hooks/useCompare'
import { useToast } from './useToast'
import { useTranslation } from 'react-i18next'

// Round "compare" button, sits next to the heart on property cards.
const CompareButton = ({ id, title = 'property', size = 36, style }) => {
  const { has, toggle } = useCompare()
  const { showToast } = useToast()
  const { t } = useTranslation()
  const active = has(id)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const res = toggle(id)
    if (res === 'full') showToast(t('compare.full'), 'info', 2600)
    else showToast(t(res === 'added' ? 'compare.added' : 'compare.removed'), res === 'added' ? 'success' : 'info', 2000)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={t(active ? 'compare.removeAria' : 'compare.addAria', { title })}
      title={t('compare.add')}
      className={`cmp-btn ${active ? 'is-active' : ''}`}
      style={{ width: size, height: size, ...style }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke={active ? '#c9a24b' : '#ffffff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 7h13M16 3l4 4-4 4" />
        <path d="M17 17H4M8 13l-4 4 4 4" />
      </svg>
      <style>{`
        .cmp-btn {
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%; padding: 0; cursor: pointer;
          background: rgba(6,15,38,0.65);
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.25);
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .cmp-btn:hover { transform: scale(1.1); background: rgba(6,15,38,0.85); border-color: rgba(201,162,75,0.7); }
        .cmp-btn.is-active { border-color: #c9a24b; background: rgba(201,162,75,0.2); }
      `}</style>
    </button>
  )
}

export default CompareButton
