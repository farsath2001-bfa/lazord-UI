import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAdmin } from '../../context/AdminContext'

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAdmin()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, form)
      if (res.data.success) {
        login(res.data.data, res.data.data.token)
        navigate('/admin/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    backgroundColor: '#060f26',
    border: '1px solid rgba(45,95,196,0.3)',
    borderRadius: '10px',
    color: '#ffffff',
    padding: '13px 16px',
    fontSize: '0.92rem',
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: '16px'
  }

  return (
    <div style={{
      backgroundColor: '#060f26',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: '#0d1f4e',
        border: '1px solid rgba(45,95,196,0.3)',
        borderRadius: '20px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '420px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.6rem', marginBottom: '8px' }}>
            Lazord <span style={{ color: '#4a90d9' }}>Admin</span>
          </div>
          <p style={{ color: '#8aafd4', fontSize: '0.88rem' }}>
            Sign in to manage your properties
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(231,76,60,0.15)',
            border: '1px solid rgba(231,76,60,0.3)',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#e74c3c',
            fontSize: '0.85rem',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
            EMAIL ADDRESS
          </label>
          <input
            type="email" required
            placeholder="Admingmail.com"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#4a90d9'}
            onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'}
          />

          <label style={{ color: '#8aafd4', fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
            PASSWORD
          </label>
          <input
            type="password" required
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#4a90d9'}
            onBlur={e => e.target.style.borderColor = 'rgba(45,95,196,0.3)'}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#1a3a7c' : '#2d5fc4',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '14px',
              fontSize: '0.95rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '8px',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#1a3a7c' }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#2d5fc4' }}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin