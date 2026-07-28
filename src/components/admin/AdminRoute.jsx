import { Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const AdminRoute = ({ children }) => {
  const { token } = useAdmin()

  // ✅ Check BOTH context AND localStorage
  const localToken = localStorage.getItem('adminToken')

  // ✅ If no token anywhere → redirect to login
  if (!token && !localToken) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default AdminRoute