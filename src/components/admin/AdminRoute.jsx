import { Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const AdminRoute = ({ children }) => {
  const { token } = useAdmin()
  return token ? children : <Navigate to="/admin/login" replace />
}

export default AdminRoute