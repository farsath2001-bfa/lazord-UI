import { useState, useEffect, useCallback, useMemo } from 'react'
import { FavoritesContext } from './FavoritesContext'

const KEY = 'lazord_favorites'

const readSaved = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(v) ? v : []
  } catch { return [] }
}

// Saved properties live in the visitor's browser (no login needed).
export const FavoritesProvider = ({ children }) => {
  const [ids, setIds] = useState(readSaved)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(ids)) } catch { /* storage blocked */ }
  }, [ids])

  const toggle = useCallback((id) => {
    setIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }, [])

  const clear = useCallback(() => setIds([]), [])

  const value = useMemo(
    () => ({ ids, count: ids.length, toggle, clear, isFav: (id) => ids.includes(id) }),
    [ids, toggle, clear]
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
