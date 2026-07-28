import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const AdminNavbar = () => {
  const { admin, logout } = useAdmin()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/admin/dashboard',  label: 'Dashboard', icon: '📊' },
    { path: '/admin/properties', label: 'Properties', icon: '🏠' },
    { path: '/admin/leads',      label: 'Leads',      icon: '👥' },
  ]

  return (
    <>
      <div style={{
        backgroundColor: '#0d1f4e',
        borderBottom: '2px solid #2d5fc4',
        position: 'sticky',
        top: 0,
        zIndex: 999
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          height: '65px'
        }}>

          {/* Logo */}
          <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.1rem', flexShrink: 0 }}>
            Lazord <span style={{ color: '#4a90d9' }}>Admin</span>
          </div>

          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', gap: '6px' }} className="admin-nav-desktop">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  color: isActive(item.path) ? '#ffffff' : '#8aafd4',
                  backgroundColor: isActive(item.path) ? '#2d5fc4' : 'transparent',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="admin-nav-desktop">
            <div style={{ color: '#8aafd4', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
              👤 {admin?.name || 'Admin'}
            </div>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'rgba(231,76,60,0.15)',
                color: '#e74c3c',
                border: '1px solid rgba(231,76,60,0.3)',
                borderRadius: '8px',
                padding: '7px 14px',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Logout
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="admin-nav-mobile"
            style={{
              background: 'none',
              border: '1px solid rgba(45,95,196,0.4)',
              borderRadius: '8px',
              color: '#4a90d9',
              fontSize: '1.4rem',
              cursor: 'pointer',
              padding: '4px 10px',
              lineHeight: 1
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="admin-nav-mobile"
            style={{
              backgroundColor: '#0a1840',
              borderTop: '1px solid rgba(45,95,196,0.2)',
              padding: '12px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: isActive(item.path) ? '#ffffff' : '#8aafd4',
                  backgroundColor: isActive(item.path) ? '#2d5fc4' : 'rgba(45,95,196,0.1)',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Mobile Admin + Logout */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '8px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(45,95,196,0.2)'
            }}>
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
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CSS for show/hide desktop vs mobile */}
      <style>{`
        .admin-nav-desktop { display: flex !important; }
        .admin-nav-mobile  { display: none !important; }

        @media (max-width: 768px) {
          .admin-nav-desktop { display: none !important; }
          .admin-nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  )
}

export default AdminNavbar