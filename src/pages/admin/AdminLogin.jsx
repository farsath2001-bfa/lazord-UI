import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import logo from '../../assets/image/lazordlogoo.png'

const REMEMBER_KEY = 'lazord_admin_email'

const readRemembered = () => {
  try { return localStorage.getItem(REMEMBER_KEY) || '' } catch { return '' }
}

const Svg = ({ children, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const MailIcon = () => <Svg><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></Svg>
const LockIcon = () => <Svg><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" /><path d="M8 10.5V8a4 4 0 118 0v2.5" /></Svg>
const EyeIcon = ({ off }) => (
  <Svg>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M4 4l16 16" />}
  </Svg>
)

// Dubai skyline with softly glowing windows.
const Skyline = () => {
  const towers = [
    { x: 10, w: 34, h: 70 }, { x: 50, w: 26, h: 105 }, { x: 82, w: 30, h: 85 },
    { x: 118, w: 22, h: 150, spire: true }, { x: 146, w: 34, h: 95 }, { x: 186, w: 28, h: 120 },
    { x: 220, w: 36, h: 75 }, { x: 262, w: 26, h: 100 }, { x: 294, w: 30, h: 60 },
  ]
  const base = 200
  return (
    <svg viewBox="0 0 334 200" preserveAspectRatio="xMidYMax slice" style={{ width: '100%', display: 'block' }} aria-hidden="true">
      <defs>
        <linearGradient id="lg-tower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#13306e" /><stop offset="1" stopColor="#081330" />
        </linearGradient>
      </defs>
      {towers.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={base - b.h} width={b.w} height={b.h} fill="url(#lg-tower)" />
          {b.spire && <path d={`M${b.x + b.w / 2} ${base - b.h - 34} L${b.x + b.w / 2 + 3} ${base - b.h} L${b.x + b.w / 2 - 3} ${base - b.h} Z`} fill="#13306e" />}
          {Array.from({ length: Math.floor(b.h / 14) }).map((_, r) =>
            Array.from({ length: Math.floor(b.w / 9) }).map((__, c) => (
              ((r * 7 + c * 3 + i) % 4 !== 0) && (
                <rect key={`${r}-${c}`} x={b.x + 5 + c * 9} y={base - b.h + 8 + r * 14} width="4" height="6" rx="1"
                  fill={(r + c + i) % 5 === 0 ? '#e0bf6a' : '#4a90d9'} opacity={(r + c + i) % 5 === 0 ? 0.9 : 0.35}>
                  <animate attributeName="opacity" values={(r + c + i) % 5 === 0 ? '0.9;0.4;0.9' : '0.35;0.15;0.35'} dur={`${3 + ((r + c + i) % 4)}s`} repeatCount="indefinite" />
                </rect>
              )
            ))
          )}
        </g>
      ))}
      <rect x="0" y={base - 3} width="334" height="3" fill="#c9a24b" opacity="0.5" />
    </svg>
  )
}

const FEATURES = [
  ['Manage every listing', 'Add, edit and feature properties in seconds.'],
  ['Track every lead', 'Follow enquiries from first message to closed deal.'],
  ['Live market snapshot', 'See your pipeline and sources at a glance.'],
]

const AdminLogin = () => {
  const [email, setEmail] = useState(readRemembered)
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(() => !!readRemembered())
  const [showPassword, setShowPassword] = useState(false)
  const [capsOn, setCapsOn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(0)
  const navigate = useNavigate()
  const { login } = useAdmin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Invalid email or password')

      // token is inside data.data.token
      const adminData = data.data
      const adminToken = data.data.token

      try {
        if (remember) localStorage.setItem(REMEMBER_KEY, email)
        else localStorage.removeItem(REMEMBER_KEY)
      } catch { /* storage unavailable */ }

      login(adminData, adminToken)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Invalid email or password')
      setShake(n => n + 1)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="al-page">
      <div className="al-glow al-glow-a" />
      <div className="al-glow al-glow-b" />
      <div className="al-grid" />

      <div className="al-shell">
        {/* Brand panel */}
        <aside className="al-brand">
          <div className="al-brand-top">
            <div className="al-logo-tile"><img src={logo} alt="Lazord Real Estate" /></div>
            <div>
              <div className="al-brand-name">Lazord <span>Admin</span></div>
              <div className="al-brand-sub">Real Estate · Dubai</div>
            </div>
          </div>

          <h2 className="al-tag">Your property business,<br /><em>beautifully organised.</em></h2>

          <ul className="al-features">
            {FEATURES.map(([t, d]) => (
              <li key={t}><span className="al-dot" /><div><strong>{t}</strong><small>{d}</small></div></li>
            ))}
          </ul>

          <div className="al-skyline"><Skyline /></div>
        </aside>

        {/* Form panel */}
        <main className="al-form">
          <div className="al-form-inner">
            <div className="al-eyebrow">✦ Admin access</div>
            <h1 className="al-title">Welcome back</h1>
            <p className="al-sub">Sign in to manage listings and leads.</p>

            {error && (
              <div key={shake} role="alert" className="al-error">
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="admin-email" className="al-label">Email address</label>
              <div className="al-field">
                <span className="al-ico"><MailIcon /></span>
                <input
                  id="admin-email" name="email" type="email" required autoComplete="email"
                  placeholder="you@lazord.ae" value={email} onChange={e => setEmail(e.target.value)}
                />
              </div>

              <label htmlFor="admin-password" className="al-label">Password</label>
              <div className="al-field">
                <span className="al-ico"><LockIcon /></span>
                <input
                  id="admin-password" name="password" required autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'} placeholder="Enter your password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  onKeyUp={e => setCapsOn(e.getModifierState && e.getModifierState('CapsLock'))}
                  onBlur={() => setCapsOn(false)}
                />
                <button type="button" className="al-eye" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  <EyeIcon off={showPassword} />
                </button>
              </div>
              {capsOn && <div className="al-caps">⇪ Caps Lock is on</div>}

              <label className="al-remember">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                <span>Remember my email on this device</span>
              </label>

              <button type="submit" disabled={loading} className="al-submit">
                {loading ? <><span className="al-spin" /> Signing in…</> : <>Sign in to dashboard <span aria-hidden="true">→</span></>}
              </button>
            </form>

            <div className="al-foot">
              <span>🔐 Secure admin access</span>
              <a href="/">← Back to website</a>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .al-page { min-height: 100vh; background: #060f26; display: flex; align-items: center; justify-content: center; padding: 20px; position: relative; overflow: hidden; font-family: 'Segoe UI', system-ui, sans-serif; }
        .al-glow { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(10px); }
        .al-glow-a { top: -160px; left: -140px; width: 560px; height: 560px; background: radial-gradient(circle, rgba(45,95,196,0.28), transparent 70%); animation: al-float 14s ease-in-out infinite; }
        .al-glow-b { bottom: -180px; right: -120px; width: 520px; height: 520px; background: radial-gradient(circle, rgba(201,162,75,0.16), transparent 70%); animation: al-float 17s ease-in-out infinite reverse; }
        .al-grid { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(45,95,196,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(45,95,196,0.05) 1px, transparent 1px); background-size: 52px 52px; mask-image: radial-gradient(circle at center, #000 30%, transparent 75%); -webkit-mask-image: radial-gradient(circle at center, #000 30%, transparent 75%); }
        @keyframes al-float { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px, 24px); } }

        .al-shell { position: relative; z-index: 1; width: 100%; max-width: 980px; display: grid; grid-template-columns: 1.05fr 1fr; border-radius: 26px; overflow: hidden; background: #0b1b45; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 40px 120px -20px rgba(0,0,0,0.7); animation: al-in .7s ease both; }
        @keyframes al-in { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }

        .al-brand { position: relative; padding: 40px 38px 0; display: flex; flex-direction: column; background: linear-gradient(160deg, #0f2a66 0%, #081330 100%); border-right: 1px solid rgba(255,255,255,0.06); overflow: hidden; min-height: 560px; }
        .al-brand::after { content: ''; position: absolute; top: -80px; right: -80px; width: 260px; height: 260px; border-radius: 50%; background: radial-gradient(circle, rgba(201,162,75,0.2), transparent 70%); }
        .al-brand-top { display: flex; align-items: center; gap: 14px; position: relative; z-index: 1; }
        .al-logo-tile { background: #fff; border-radius: 14px; padding: 7px 11px; box-shadow: 0 10px 30px -12px rgba(0,0,0,0.6); }
        .al-logo-tile img { height: 44px; width: auto; display: block; }
        .al-brand-name { color: #fff; font-weight: 800; font-size: 1.25rem; line-height: 1.1; }
        .al-brand-name span { color: #e0bf6a; }
        .al-brand-sub { color: #8aafd4; font-size: 0.68rem; letter-spacing: 2.5px; text-transform: uppercase; margin-top: 4px; }
        .al-tag { color: #fff; font-weight: 300; font-size: clamp(1.4rem, 2.6vw, 1.9rem); line-height: 1.3; margin: 34px 0 22px; position: relative; z-index: 1; }
        .al-tag em { font-style: normal; font-weight: 800; background: linear-gradient(90deg, #e9d6a3, #c9a24b); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .al-features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; position: relative; z-index: 1; }
        .al-features li { display: flex; gap: 12px; align-items: flex-start; }
        .al-dot { width: 9px; height: 9px; margin-top: 6px; border-radius: 50%; background: #c9a24b; box-shadow: 0 0 0 4px rgba(201,162,75,0.18); flex-shrink: 0; }
        .al-features strong { color: #fff; font-size: 0.9rem; display: block; }
        .al-features small { color: #8aafd4; font-size: 0.78rem; }
        .al-skyline { margin: auto -38px 0; padding-top: 24px; }

        .al-form { background: #0b1b45; display: flex; align-items: center; justify-content: center; padding: 40px 44px; }
        .al-form-inner { width: 100%; max-width: 360px; }
        .al-eyebrow { color: #e0bf6a; font-size: 0.72rem; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 700; margin-bottom: 8px; }
        .al-title { color: #fff; font-size: 2rem; font-weight: 800; margin: 0 0 6px; }
        .al-sub { color: #8aafd4; font-size: 0.9rem; margin: 0 0 26px; }
        .al-error { background: rgba(231,76,60,0.12); border: 1px solid rgba(231,76,60,0.35); color: #ff9b90; border-radius: 12px; padding: 12px 14px; font-size: 0.86rem; margin-bottom: 18px; display: flex; gap: 8px; align-items: center; animation: al-shake .4s ease; }
        @keyframes al-shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-7px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(3px); } }
        .al-label { display: block; color: #8aafd4; font-size: 0.72rem; letter-spacing: 1.2px; text-transform: uppercase; font-weight: 700; margin: 0 0 8px; }
        .al-field { position: relative; margin-bottom: 18px; }
        .al-ico { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #5f7fae; display: flex; pointer-events: none; transition: color .2s ease; }
        .al-field input { width: 100%; box-sizing: border-box; background: #060f26; color: #fff; border: 1px solid rgba(74,144,217,0.28); border-radius: 12px; padding: 14px 46px 14px 44px; font-size: 0.95rem; outline: none; transition: border-color .2s ease, box-shadow .2s ease; }
        .al-field input::placeholder { color: #44587d; }
        .al-field:focus-within .al-ico { color: #e0bf6a; }
        .al-field input:focus { border-color: #c9a24b; box-shadow: 0 0 0 4px rgba(201,162,75,0.15); }
        .al-eye { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: 0; color: #5f7fae; cursor: pointer; padding: 8px; border-radius: 8px; display: flex; }
        .al-eye:hover { color: #e0bf6a; background: rgba(255,255,255,0.05); }
        .al-caps { color: #e0bf6a; font-size: 0.78rem; margin: -8px 0 12px; }
        .al-remember { display: flex; align-items: center; gap: 9px; color: #8aafd4; font-size: 0.82rem; cursor: pointer; margin: 4px 0 22px; }
        .al-remember input { accent-color: #c9a24b; width: 16px; height: 16px; }
        .al-submit { width: 100%; border: 0; border-radius: 12px; padding: 15px; font-size: 0.96rem; font-weight: 800; letter-spacing: 0.3px; color: #0a1630; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; background: linear-gradient(135deg, #e9d6a3, #c9a24b); box-shadow: 0 14px 30px -12px rgba(201,162,75,0.75); transition: transform .2s ease, box-shadow .2s ease, filter .2s ease; }
        .al-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 18px 36px -12px rgba(201,162,75,0.9); }
        .al-submit:disabled { cursor: not-allowed; filter: grayscale(0.4) brightness(0.8); }
        .al-spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(10,22,48,0.3); border-top-color: #0a1630; animation: al-rot .8s linear infinite; }
        @keyframes al-rot { to { transform: rotate(360deg); } }
        .al-foot { margin-top: 26px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; color: #6f8db3; font-size: 0.78rem; }
        .al-foot a { color: #8aafd4; text-decoration: none; }
        .al-foot a:hover { color: #e0bf6a; }

        @media (max-width: 820px) {
          .al-shell { grid-template-columns: 1fr; max-width: 460px; }
          .al-brand { min-height: 0; padding: 26px 24px 0; }
          .al-tag, .al-features { display: none; }
          .al-skyline { margin: 18px -24px 0; max-height: 90px; overflow: hidden; }
          .al-form { padding: 30px 24px 34px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .al-shell, .al-glow, .al-error { animation: none; }
        }
      `}</style>
    </div>
  )
}

export default AdminLogin
