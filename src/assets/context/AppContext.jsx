import { createContext, useContext, useState } from 'react'

const AdminContext = createContext(null)

export const AdminProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('lazord_admin_token') || null)
  const [admin, setAdmin] = useState(null)

  const login = (token) => {
    localStorage.setItem('lazord_admin_token', token)
    setToken(token)
  }

  const logout = () => {
    localStorage.removeItem('lazord_admin_token')
    setToken(null)
    setAdmin(null)
  }

  return (
    <AdminContext.Provider value={{ token, admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)