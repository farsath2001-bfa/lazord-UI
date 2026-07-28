
import { Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const AdminRoute = ({ children }) => {
  const { token } = useAdmin()

  // ✅ Check both context token AND localStorage
  const savedToken = localStorage.getItem('adminToken')

  if (!token && !savedToken) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default AdminRoute