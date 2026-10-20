import { Link } from 'react-router-dom'
import { useFavorites } from '../../hooks/useFavorites'
import { useTranslation } from 'react-i18next'

// Heart icon with a count badge, linking to the saved-properties page.
const FavoritesNavLink = ({ size = 34 }) => {
  const { count } = useFavorites()
  const { t } = useTranslation()
  return (
    <Link
      to="/favorites"
      aria-label={t('fav.navLabel', { count })}
      title={t('fav.navTitle')}
      className="navbar-fav-link"
      style={{
        position: 'relative', width: size, height: size, borderRadius: '50%',
        backgroundColor: 'rgba(255,77,109,0.08)', border: '1px solid rgba(255,77,109,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        textDecoration: 'none', transition: 'all 0.2s ease'
      }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" aria-hidden="true"
        fill={count > 0 ? '#ff4d6d' : 'none'} stroke="#ff4d6d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {count > 0 && (
        <span style={{
          position: 'absolute', top: '-4px', right: '-4px', minWidth: '17px', height: '17px',
          borderRadius: '9px', padding: '0 4px', backgroundColor: '#ff4d6d', color: '#fff',
          fontSize: '0.65rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>{count}</span>
      )}
      <style>{`.navbar-fav-link:hover { background-color: rgba(255,77,109,0.2) !important; transform: translateY(-1px); }`}</style>
    </Link>
  )
}

export default FavoritesNavLink
