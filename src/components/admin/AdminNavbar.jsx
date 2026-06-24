import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const AdminNavbar = () => {
  const { admin, logout } = useAdmin()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/admin/dashboard',   label: '📊 Dashboard' },
    { path: '/admin/properties',  label: '🏠 Properties' },
    { path: '/admin/leads',       label: '👥 Leads' },
  ]

  return (
    <div style={{
      backgroundColor: '#0d1f4e',
      borderBottom: '2px solid #2d5fc4',
      padding: '0',
      position: 'sticky',
      top: 0,
      zIndex: 999
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 30px',
        height: '65px'
      }}>
        {/* Logo */}
        <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.1rem' }}>
          Lazord <span style={{ color: '#4a90d9' }}>Admin</span>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: isActive(item.path) ? '#ffffff' : '#8aafd4',
                backgroundColor: isActive(item.path) ? '#2d5fc4' : 'transparent',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Admin Info + Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ color: '#8aafd4', fontSize: '0.85rem' }}>
            👤 {admin?.name || 'Admin'}
          </div>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: 'rgba(231,76,60,0.15)',
              color: '#e74c3c',
              border: '1px solid rgba(231,76,60,0.3)',
              borderRadius: '8px',
              padding: '7px 16px',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(231,76,60,0.3)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(231,76,60,0.15)'}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar