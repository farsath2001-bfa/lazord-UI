import { useState, useCallback } from 'react'
import { ToastContext } from './toastContextValue'
import { AnimatePresence, motion } from 'framer-motion'

// Wrap your app once with <ToastProvider> in App.jsx, e.g.:
//
//   import { ToastProvider } from './components/common/ToastContext'
//
//   <ToastProvider>
//     <App content... />
//   </ToastProvider>
//
// Then anywhere deeper in the tree:
//   import { useToast } from '../components/common/useToast'
//   const { showToast } = useToast()
//   showToast('Lead deleted successfully', 'success')   // 'success' | 'error' | 'info'
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const dismissToast = (id) => setToasts(prev => prev.filter(t => t.id !== id))

  const typeStyles = {
    success: { bg: 'rgba(39,174,96,0.15)', border: 'rgba(39,174,96,0.4)', color: '#27ae60', icon: '✅' },
    error:   { bg: 'rgba(231,76,60,0.15)', border: 'rgba(231,76,60,0.4)', color: '#e74c3c', icon: '❌' },
    info:    { bg: 'rgba(45,95,196,0.15)', border: 'rgba(45,95,196,0.4)', color: '#4a90d9', icon: 'ℹ️' },
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div style={{
        position: 'fixed', top: '20px', right: '20px', zIndex: 2000,
        display: 'flex', flexDirection: 'column', gap: '10px',
        maxWidth: 'calc(100vw - 40px)', width: '340px'
      }}>
        <AnimatePresence>
          {toasts.map(toast => {
            const s = typeStyles[toast.type] || typeStyles.info
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  backgroundColor: '#0d1f4e',
                  border: `1px solid ${s.border}`,
                  borderRadius: '12px',
                  padding: '14px 16px',
                  display: 'flex', alignItems: 'flex-start', gap: '10px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                }}
              >
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{s.icon}</span>
                <span style={{ color: '#ffffff', fontSize: '0.86rem', lineHeight: '1.5', flex: 1 }}>{toast.message}</span>
                <button
                  onClick={() => dismissToast(toast.id)}
                  aria-label="Dismiss"
                  style={{ background: 'none', border: 'none', color: '#8aafd4', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, flexShrink: 0, padding: 0 }}
                >×</button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}