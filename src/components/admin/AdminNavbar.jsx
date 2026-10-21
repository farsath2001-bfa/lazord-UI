import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/adminContextValue'
import logo from '../../assets/image/lazordlogoo.png'

const Icon = ({ name }) => {
  const p = {
    dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>,
    properties: <><path d="M3 21V8l8-5 8 5v13" /><path d="M9 21v-6h4v6" /><path d="M7 11h.01M11 11h.01M15 11h.01" /></>,
    leads: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16 4.5a3.5 3.5 0 010 7M18 14.5c2 .7 3.5 2.4 3.5 5.5" /></>,
    activity: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    agents: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></>,
    blog: <><path d="M5 4h11l3 3v13H5z" /><path d="M8 10h8M8 14h8M8 18h5" /></>,
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
  { path: '/admin/agents', label: 'Agents', icon: 'agents' },
  { path: '/admin/blog', label: 'Blog', icon: 'blog' },
  { path: '/admin/activity', label: 'Activity', icon: 'activity' },
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

        /* ---------- Shared admin components (Leads, Properties) ---------- */
        .adm-eyebrow { color: #e0bf6a; font-size: 0.72rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 700; margin-bottom: 4px; }
        .adm-title { color: #fff; font-size: clamp(1.4rem, 4vw, 2rem); font-weight: 800; margin: 0; }
        .adm-sub { color: #8aafd4; margin: 4px 0 0; font-size: 0.84rem; }
        .adm-card { background: linear-gradient(160deg, #0f2456, #0a1840); border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; overflow: hidden; box-shadow: 0 14px 34px -22px rgba(0,0,0,0.8); }
        .adm-card-head { padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.07); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
        .adm-card-head h2 { color: #fff; font-size: 0.98rem; font-weight: 700; margin: 0; }
        .adm-btn { display: inline-flex; align-items: center; gap: 7px; border-radius: 10px; padding: 9px 15px; font-size: 0.82rem; font-weight: 700; cursor: pointer; border: 1px solid transparent; white-space: nowrap; text-decoration: none; }
        .adm-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .adm-btn-gold { background: linear-gradient(135deg, #e9d6a3, #c9a24b); color: #0a1630; box-shadow: 0 8px 20px -8px rgba(201,162,75,0.7); }
        .adm-btn-gold:hover:not(:disabled) { transform: translateY(-2px); }
        .adm-btn-green { background: rgba(39,174,96,0.14); color: #4cd48a; border-color: rgba(39,174,96,0.32); }
        .adm-btn-green:hover:not(:disabled) { background: rgba(39,174,96,0.26); }
        .adm-btn-blue { background: rgba(74,144,217,0.14); color: #7db6ee; border-color: rgba(74,144,217,0.32); }
        .adm-btn-blue:hover:not(:disabled) { background: rgba(74,144,217,0.26); }
        .adm-btn-red { background: rgba(231,76,60,0.12); color: #ff8e82; border-color: rgba(231,76,60,0.3); }
        .adm-btn-red:hover:not(:disabled) { background: rgba(231,76,60,0.24); }
        .adm-stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; }
        .adm-stat { position: relative; overflow: hidden; background: linear-gradient(160deg, #0f2456, #0a1840); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 16px 18px; transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
        .adm-stat::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--accent); }
        .adm-stat:hover { transform: translateY(-3px); border-color: var(--accent); box-shadow: 0 14px 30px -14px var(--accent); }
        .adm-stat-val { color: #fff; font-size: clamp(1.4rem, 4vw, 1.9rem); font-weight: 800; line-height: 1; }
        .adm-stat-label { color: #8aafd4; font-size: 0.76rem; margin-top: 6px; }
        .adm-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
        .adm-chip { padding: 6px 14px; border-radius: 999px; border: 1px solid rgba(74,144,217,0.28); background: transparent; color: #8aafd4; font-size: 0.76rem; font-weight: 600; cursor: pointer; white-space: nowrap; }
        .adm-chip:hover { border-color: #c9a24b; color: #e9d6a3; }
        .adm-chip.is-on { background: rgba(201,162,75,0.16); border-color: #c9a24b; color: #f0dca0; }
        .adm-seg { display: inline-flex; gap: 4px; padding: 5px; border-radius: 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); margin-bottom: 20px; }
        .adm-seg button { border: 0; background: transparent; color: #8aafd4; padding: 9px 18px; border-radius: 10px; font-size: 0.85rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .adm-seg button.is-on { background: linear-gradient(135deg, #2d5fc4, #1f4aa3); color: #fff; box-shadow: 0 6px 16px -6px rgba(45,95,196,0.9); }
        .adm-badge { background: #e74c3c; color: #fff; border-radius: 999px; padding: 1px 8px; font-size: 0.7rem; font-weight: 800; }
        .adm-search { position: relative; }
        .adm-search span { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #6f8db3; font-size: 0.85rem; pointer-events: none; }
        .adm-search input { background: #060f26; border: 1px solid rgba(74,144,217,0.28); border-radius: 10px; color: #fff; padding: 8px 12px 8px 32px; font-size: 0.84rem; width: 170px; outline: none; }
        .adm-th { padding: 12px 16px; color: #6f8db3; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; text-align: left; font-weight: 700; white-space: nowrap; background: rgba(255,255,255,0.03); }
        .adm-row { border-top: 1px solid rgba(255,255,255,0.06); transition: background .15s ease; }
        .adm-row:hover { background: rgba(74,144,217,0.08); }
        .adm-row.is-sel { background: rgba(201,162,75,0.1); box-shadow: inset 3px 0 0 #c9a24b; }
        .adm-row.is-click { cursor: pointer; }
        .adm-av { width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem; color: #0a1630; background: linear-gradient(135deg, #e9d6a3, #c9a24b); }
        .adm-av.lg { width: 56px; height: 56px; font-size: 1.3rem; margin-bottom: 14px; }
        .adm-empty { padding: 56px 20px; text-align: center; color: #8aafd4; }
        .adm-empty .ico { font-size: 2.2rem; margin-bottom: 10px; }
        .adm-panel { background: linear-gradient(160deg, #0f2456, #0a1840); border: 1px solid rgba(201,162,75,0.25); border-radius: 18px; padding: 22px; box-shadow: 0 20px 44px -24px rgba(0,0,0,0.9); }
        .adm-danger { margin-bottom: 16px; border-color: rgba(231,76,60,0.2); }
        .adm-danger summary { cursor: pointer; padding: 14px 18px; color: #ff9b90; font-weight: 700; font-size: 0.86rem; list-style: none; display: flex; justify-content: space-between; align-items: center; }
        .adm-danger summary::-webkit-details-marker { display: none; }
        .adm-danger summary::after { content: '▾'; transition: transform .2s ease; }
        .adm-danger[open] summary::after { transform: rotate(180deg); }
        .adm-danger-body { padding: 0 18px 18px; }
        .adm-form-section { color: #e0bf6a; font-size: 0.72rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; grid-column: 1 / -1; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.07); margin-top: 6px; }
        .adm-form-section:first-child { border-top: 0; margin-top: 0; padding-top: 0; }
        @media (min-width: 640px) { .adm-stat-grid { grid-template-columns: repeat(5, 1fr); } }

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
