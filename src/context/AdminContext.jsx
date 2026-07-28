import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
  // ✅ Initialize directly from localStorage
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null)
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('adminData')
    try {
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