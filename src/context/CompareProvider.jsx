import { useState, useEffect, useCallback, useMemo } from 'react'
import { CompareContext, MAX_COMPARE } from './CompareContext'

const KEY = 'lazord_compare'

const readSaved = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(v) ? v.slice(0, MAX_COMPARE) : []
  } catch { return [] }
}

// Up to 3 properties picked for side-by-side comparison; kept in the visitor's browser.
export const CompareProvider = ({ children }) => {
  const [ids, setIds] = useState(readSaved)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(ids)) } catch { /* storage blocked */ }
  }, [ids])

  // returns 'added' | 'removed' | 'full'
  const toggle = useCallback((id) => {
    if (ids.includes(id)) { setIds(prev => prev.filter(x => x !== id)); return 'removed' }
    if (ids.length >= MAX_COMPARE) return 'full'
    setIds(prev => [...prev, id])
    return 'added'
  }, [ids])

  const remove = useCallback((id) => setIds(prev => prev.filter(x => x !== id)), [])
  const clear = useCallback(() => setIds([]), [])

  const value = useMemo(
    () => ({ ids, count: ids.length, toggle, remove, clear, has: (id) => ids.includes(id) }),
    [ids, toggle, remove, clear]
  )
  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}
