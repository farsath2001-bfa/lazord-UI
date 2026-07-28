import { createContext, useContext, useState } from 'react'

const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const t = localStorage.getItem('adminToken')
    // ✅ reject bad values
    if (!t || t === 'undefined' || t === 'null') return null
    return t
  })

  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('adminData')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [loading, setLoading] = useState(false)

  const login = (adminData, adminToken) => {
    localStorage.setItem('adminToken', adminToken)
    localStorage.setItem('adminData', JSON.stringify(adminData))
    setToken(adminToken)
    setAdmin(adminData)
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    setToken(null)
    setAdmin(null)
  }

  return (
    <AdminContext.Provider value={{ admin, token, loading, setLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)