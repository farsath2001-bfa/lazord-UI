import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const AdminRoute = ({ children }) => {
  const { token } = useAdmin()
  const [checked, setChecked] = useState(false)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const localToken = localStorage.getItem('adminToken')
    if (token || localToken) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
    setChecked(true)
  }, [token])

  // Wait until check is done
  if (!checked) return null

  // Not authenticated → redirect to login
  if (!isAuth) return <Navigate to="/admin/login" replace />

  // Authenticated → show page
  return children
}

export default AdminRoute