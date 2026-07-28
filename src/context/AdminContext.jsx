import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedAdmin = localStorage.getItem('adminData')
    const savedToken = localStorage.getItem('adminToken')
    if (savedAdmin && savedToken) {
      try {
        setAdmin(JSON.parse(savedAdmin))
        setToken(savedToken)  // ✅ sync state with localStorage
      } catch {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminData')
        setToken(null)
      }
    }
  }, [])

  const login = (adminData, adminToken) => {
    localStorage.setItem('adminToken', adminToken)
    localStorage.setItem('adminData', JSON.stringify(adminData))
    setToken(adminToken)   // ✅ update state immediately
    setAdmin(adminData)    // ✅ update state immediately
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