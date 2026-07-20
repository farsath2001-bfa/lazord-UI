import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import axios from 'axios'
import logo from '../../assets/image/lazordlogoo.png'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAdmin()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError('')
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      email, password
    })
    login(res.data.data, res.data.token)
    navigate('/admin/dashboard')
  } catch (err) {
    setError(err.response?.data?.message || 'Invalid email or password')
  } finally {
    setLoading(false)
  }
}

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#060f26',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', position: 'relative', overflow: 'hidden'
    }}>

      {/* Background blobs */}
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(45,95,196,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,144,217,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(45,95,196,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>

        {/* Card */}
        <div style={{
          backgroundColor: '#0d1f4e',
          border: '1px solid rgba(74,144,217,0.25)',
          borderRadius: '20px',
          padding: '48px 40px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(74,144,217,0.1)',
        }}>

          {/* Logo + Title */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <img src={logo} alt="Lazord" style={{ height: '64px', width: 'auto', filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />
            </div>
            <h1 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '700', margin: '0 0 6px' }}>
              Lazord <span style={{ color: '#4a90d9' }}>Admin</span>
            </h1>
            <p style={{ color: '#8aafd4', fontSize: '0.88rem', margin: 0 }}>Sign in to manage your properties</p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ backgroundColor: 'rgba(231,76,60,0.15)', border: '1px solid rgba(231,76,60,0.3)', borderRadius: '10px', padding: '12px 16px', color: '#e74c3c', fontSize: '0.88rem', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: '#4a90d9' }}>📧</span>
                <input
                  type="email" required
                  placeholder="admin@lazordrealestate.ae"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%', backgroundColor: '#060f26',
                    border: '1px solid rgba(45,95,196,0.35)', borderRadius: '10px',
                    color: '#ffffff', padding: '13px 14px 13px 40px',
                    fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={e => e.target.style.borderColor = '#4a90d9'}
                  onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.35)'}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ color: '#8aafd4', fontSize: '0.75rem', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: '#4a90d9' }}>🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'} required
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    width: '100%', backgroundColor: '#060f26',
                    border: '1px solid rgba(45,95,196,0.35)', borderRadius: '10px',
                    color: '#ffffff', padding: '13px 44px 13px 40px',
                    fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={e => e.target.style.borderColor = '#4a90d9'}
                  onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.35)'}
                />
                {/* Show/Hide password */}
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#8aafd4', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{
                width: '100%', backgroundColor: loading ? '#1a3a7c' : '#2d5fc4',
                color: '#ffffff', border: 'none', borderRadius: '10px',
                padding: '14px', fontSize: '0.95rem', fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: loading ? 'none' : '0 8px 24px rgba(45,95,196,0.4)'
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.backgroundColor = '#1a3a7c'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
              onMouseLeave={e => { if (!loading) { e.currentTarget.style.backgroundColor = '#2d5fc4'; e.currentTarget.style.transform = 'translateY(0)' } }}
            >
              {loading ? (
                <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span> Signing In...</>
              ) : (
                <>Sign In →</>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(45,95,196,0.2)' }}>
            <p style={{ color: '#4a4a6a', fontSize: '0.78rem', margin: 0 }}>
              🔐 Secure admin access · Lazord Real Estate LLC
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/" style={{ color: '#8aafd4', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#4a90d9'}
            onMouseLeave={e => e.currentTarget.style.color = '#8aafd4'}>
            ← Back to Website
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: #4a5a7a; }
      `}</style>
    </div>
  )
}

export default AdminLogin