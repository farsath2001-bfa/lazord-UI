import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedAdmin = localStorage.getItem('adminData')
    if (savedAdmin && token) {
      setAdmin(JSON.parse(savedAdmin))
    }
  }, [])

  const login = (adminData, adminToken) => {
    setAdmin(adminData)
    setToken(adminToken)
    localStorage.setItem('adminToken', adminToken)
    localStorage.setItem('adminData', JSON.stringify(adminData))
  }

  const logout = () => {
    setAdmin(null)
    setToken(null)
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
  }

  return (
    <AdminContext.Provider value={{ admin, token, loading, setLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)