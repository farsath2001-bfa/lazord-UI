import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import logo from '../../assets/image/lazordlogoo.png'

const Icon = ({ name }) => {
  const p = {
    dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>,
    properties: <><path d="M3 21V8l8-5 8 5v13" /><path d="M9 21v-6h4v6" /><path d="M7 11h.01M11 11h.01M15 11h.01" /></>,
    leads: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16 4.5a3.5 3.5 0 010 7M18 14.5c2 .7 3.5 2.4 3.5 5.5" /></>,
    site: <><path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" /></>,
    logout: <><path d="M9 4H5a1 1 0 00-1 1v14a1 1 0 001 1h4" /><path d="M16 8l4 4-4 4M20 12H9" /></>,
  }
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {p[name]}
    </svg>
  )
}

const NAV = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/admin/properties', label: 'Properties', icon: 'properties' },
  { path: '/admin/leads', label: 'Leads', icon: 'leads' },
]

const AdminNavbar = () => {
  const { admin, logout } = useAdmin()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  // Tells the global CSS to leave room for the sidebar on admin pages.
  useEffect(() => {
    document.body.classList.add('has-admin-sidebar')
    return () => document.body.classList.remove('has-admin-sidebar')
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const isActive = (path) => location.pathname === path
  const name = admin?.name || 'Admin'
  const initial = name.charAt(0).toUpperCase()

  const links = (onClick) => NAV.map(item => (
    <Link key={item.path} to={item.path} onClick={onClick} className={`adm-link${isActive(item.path) ? ' is-active' : ''}`}>
      <Icon name={item.icon} />
      <span>{item.label}</span>
    </Link>
  ))

  const profile = (
    <div className="adm-profile">
      <div className="adm-avatar">{initial}</div>
      <div style={{ minWidth: 0 }}>
        <div className="adm-pname">{name}</div>
        <div className="adm-prole">Administrator</div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="adm-sidebar">
        <Link to="/admin/dashboard" className="adm-brand">
          <img src={logo} alt="Lazord" />
          <div>
            <div className="adm-brand-name">Lazord</div>
            <div className="adm-brand-sub">Admin Panel</div>
          </div>
        </Link>

        <div className="adm-section">Menu</div>
        <nav className="adm-nav">{links()}</nav>

        <div className="adm-spacer" />

        <a href="/" target="_blank" rel="noopener noreferrer" className="adm-link adm-site">
          <Icon name="site" />
          <span>View website</span>
        </a>
        {profile}
        <button type="button" onClick={handleLogout} className="adm-logout">
          <Icon name="logout" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Mobile / tablet top bar */}
      <header className="adm-topbar">
        <Link to="/admin/dashboard" className="adm-brand" style={{ padding: 0 }}>
          <img src={logo} alt="Lazord" style={{ height: '34px' }} />
          <div className="adm-brand-name" style={{ fontSize: '1rem' }}>Lazord <span style={{ color: '#e0bf6a' }}>Admin</span></div>
        </Link>
        <button type="button" className="adm-burger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu" aria-expanded={menuOpen}>
          {menuOpen ? '✕' : '☰'}
        </button>
        {menuOpen && (
          <div className="adm-drop">
            {links(() => setMenuOpen(false))}
            <a href="/" target="_blank" rel="noopener noreferrer" className="adm-link adm-site"><Icon name="site" /><span>View website</span></a>
            <div className="adm-drop-foot">
              {profile}
              <button type="button" onClick={handleLogout} className="adm-logout" style={{ width: 'auto', padding: '8px 14px' }}>
                <Icon name="logout" /><span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <style>{`
        /* ---------- Admin theme ---------- */
        body.is-admin { background: #060f26; }
        body.is-admin ::selection { background: #c9a24b; color: #0a1630; }
        body.is-admin ::-webkit-scrollbar { width: 10px; height: 10px; }
        body.is-admin ::-webkit-scrollbar-track { background: #060f26; }
        body.is-admin ::-webkit-scrollbar-thumb { background: #1d3a7a; border-radius: 10px; border: 2px solid #060f26; }
        body.is-admin ::-webkit-scrollbar-thumb:hover { background: #2d5fc4; }
        body.is-admin input:focus, body.is-admin select:focus, body.is-admin textarea:focus {
          outline: none !important; border-color: #c9a24b !important; box-shadow: 0 0 0 3px rgba(201,162,75,0.18) !important;
        }
        body.is-admin button, body.is-admin a { transition: background-color .2s ease, color .2s ease, border-color .2s ease, transform .2s ease, box-shadow .2s ease; }
        body.is-admin button:not(:disabled):active { transform: scale(0.98); }

        /* ---------- Sidebar ---------- */
        .adm-sidebar {
          position: fixed; top: 0; bottom: 0; left: 0; width: 248px; z-index: 1000;
          display: none; flex-direction: column; padding: 20px 14px;
          background: linear-gradient(180deg, #0b1b45 0%, #081330 100%);
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .adm-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; padding: 4px 8px 18px; border-bottom: 1px solid rgba(255,255,255,0.07); margin-bottom: 18px; }
        .adm-brand img { height: 46px; width: auto; display: block; }
        .adm-brand-name { color: #fff; font-weight: 800; font-size: 1.12rem; letter-spacing: 0.4px; line-height: 1.1; }
        .adm-brand-sub { color: #e0bf6a; font-size: 0.68rem; letter-spacing: 2.5px; text-transform: uppercase; margin-top: 3px; font-weight: 600; }
        .adm-section { color: #5f7fae; font-size: 0.66rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; padding: 0 12px 8px; }
        .adm-nav { display: flex; flex-direction: column; gap: 4px; }
        .adm-spacer { flex: 1; }
        .adm-link {
          position: relative; display: flex; align-items: center; gap: 12px; padding: 11px 14px;
          color: #8aafd4; text-decoration: none; border-radius: 11px; font-size: 0.88rem; font-weight: 600;
        }
        .adm-link:hover { background: rgba(74,144,217,0.1); color: #fff; }
        .adm-link.is-active { background: linear-gradient(90deg, rgba(45,95,196,0.55), rgba(45,95,196,0.18)); color: #fff; }
        .adm-link.is-active::before { content: ''; position: absolute; left: -14px; top: 9px; bottom: 9px; width: 4px; border-radius: 0 4px 4px 0; background: #c9a24b; }
        .adm-link.is-active svg { color: #e0bf6a; }
        .adm-site { margin-bottom: 10px; border: 1px dashed rgba(138,175,212,0.25); }
        .adm-profile { display: flex; align-items: center; gap: 11px; padding: 12px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); margin-bottom: 10px; }
        .adm-avatar { width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #0a1630; background: linear-gradient(135deg, #e9d6a3, #c9a24b); }
        .adm-pname { color: #fff; font-weight: 700; font-size: 0.86rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px; }
        .adm-prole { color: #6f8db3; font-size: 0.72rem; }
        .adm-logout { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 10px; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 0.84rem; color: #ff8e82; background: rgba(231,76,60,0.1); border: 1px solid rgba(231,76,60,0.25); }
        .adm-logout:hover { background: rgba(231,76,60,0.22); color: #fff; }

        /* ---------- Top bar (mobile / tablet) ---------- */
        .adm-topbar {
          position: sticky; top: 0; z-index: 1000; display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; padding: 10px 16px; background: rgba(8,19,48,0.92); backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .adm-topbar .adm-brand { border: 0; margin: 0; }
        .adm-burger { background: rgba(45,95,196,0.15); border: 1px solid rgba(74,144,217,0.35); color: #8aafd4; border-radius: 10px; font-size: 1.25rem; padding: 4px 12px; cursor: pointer; }
        .adm-drop { width: 100%; display: flex; flex-direction: column; gap: 6px; padding: 14px 0 6px; }
        .adm-drop-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.07); }
        .adm-drop-foot .adm-profile { margin: 0; flex: 1; }
        .adm-drop .adm-link.is-active::before { left: 0; }

        @media (min-width: 1025px) {
          .adm-sidebar { display: flex; }
          .adm-topbar { display: none; }
          body.is-admin.has-admin-sidebar #root { padding-left: 248px; }
        }
      `}</style>
    </>
  )
}

export default AdminNavbar
