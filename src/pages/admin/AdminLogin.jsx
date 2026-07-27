import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/image/lazordlogoo.png'

// Animated SVG illustration
const LoginIllustration = ({ watching }) => (
  <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '320px' }}>
    {/* Sky background */}
    <rect width="320" height="260" fill="#060f26" rx="16" />

    {/* Stars */}
    {[[30,20],[80,15],[140,25],[200,12],[260,20],[290,40],[15,50],[100,45],[170,35],[240,50],[300,30]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="1.2" fill="#ffffff" opacity={0.4 + (i%3)*0.2}>
        <animate attributeName="opacity" values={`${0.4+(i%3)*0.2};0.1;${0.4+(i%3)*0.2}`} dur={`${2+i*0.3}s`} repeatCount="indefinite" />
      </circle>
    ))}

    {/* Moon */}
    <circle cx="270" cy="35" r="18" fill="#1a3a7c" opacity="0.6" />
    <circle cx="278" cy="30" r="14" fill="#060f26" />

    {/* Tall building center */}
    <rect x="120" y="60" width="80" height="180" fill="#0d1f4e" rx="3" />
    <rect x="122" y="62" width="76" height="178" fill="#0a1840" rx="2" />

    {/* Building windows - animated */}
    {[80,100,120,140,160,180,200].map((y, row) =>
      [130, 150, 170].map((x, col) => (
        <rect key={`${row}-${col}`} x={x} y={y} width="12" height="10" rx="1"
          fill={watching && row > 3 ? '#4a90d9' : (Math.random() > 0.4 ? '#4a90d9' : '#1a3a7c')}
          opacity={watching && row > 3 ? '0.9' : '0.7'}>
          {row % 2 === col % 2 && (
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur={`${3+row+col}s`} repeatCount="indefinite" />
          )}
        </rect>
      ))
    )}

    {/* Left building */}
    <rect x="40" y="110" width="55" height="130" fill="#0b1838" rx="2" />
    {[120,140,160,180,200].map((y, row) =>
      [48, 62, 76].map((x, col) => (
        <rect key={`l${row}-${col}`} x={x} y={y} width="9" height="8" rx="1"
          fill={Math.random() > 0.5 ? '#2d5fc4' : '#0d1f4e'} opacity="0.8" />
      ))
    )}

    {/* Right building */}
    <rect x="225" y="120" width="55" height="120" fill="#0b1838" rx="2" />
    {[130,150,170,190,210].map((y, row) =>
      [233, 247, 261].map((x, col) => (
        <rect key={`r${row}-${col}`} x={x} y={y} width="9" height="8" rx="1"
          fill={Math.random() > 0.5 ? '#2d5fc4' : '#0d1f4e'} opacity="0.8" />
      ))
    )}

    {/* Ground */}
    <rect x="0" y="235" width="320" height="25" fill="#08122e" />
    <rect x="0" y="233" width="320" height="4" fill="#1a3a7c" opacity="0.5" />

    {/* Road reflection */}
    <rect x="60" y="238" width="200" height="2" fill="#2d5fc4" opacity="0.15" rx="1" />

    {/* Animated car lights */}
    <g>
      <rect x="-20" y="240" width="30" height="6" rx="3" fill="#4a90d9" opacity="0.6">
        <animateTransform attributeName="transform" type="translate" from="-30 0" to="350 0" dur="4s" repeatCount="indefinite" />
      </rect>
    </g>
    <g>
      <rect x="350" y="245" width="30" height="6" rx="3" fill="#e74c3c" opacity="0.5">
        <animateTransform attributeName="transform" type="translate" from="0 0" to="-380 0" dur="5s" repeatCount="indefinite" />
      </rect>
    </g>

    {/* Eye / person watching from building */}
    <g transform="translate(152, 88)">
      {/* Head */}
      <circle cx="8" cy="0" r="7" fill="#f0c080" />
      {/* Eyes */}
      <ellipse cx="5" cy="-1" rx="2" ry={watching ? 1 : 2} fill="#1a1a2e">
        <animate attributeName="ry" values={watching ? "1;1.5;1" : "2;0.3;2"} dur={watching ? "0.5s" : "3s"} repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="11" cy="-1" rx="2" ry={watching ? 1 : 2} fill="#1a1a2e">
        <animate attributeName="ry" values={watching ? "1;1.5;1" : "2;0.3;2"} dur={watching ? "0.5s" : "3s"} repeatCount="indefinite" />
      </ellipse>
      {/* Pupils move when watching */}
      {watching && <>
        <circle cx="5" cy="-0.5" r="1" fill="#4a90d9" />
        <circle cx="11" cy="-0.5" r="1" fill="#4a90d9" />
      </>}
      {/* Smile changes */}
      <path d={watching ? "M4 3 Q8 5 12 3" : "M4 3 Q8 6 12 3"} stroke="#c0844a" strokeWidth="1" fill="none" />
      {/* Body */}
      <rect x="3" y="7" width="10" height="12" rx="2" fill="#0d1f4e" />
    </g>

    {/* Lazord sign on building */}
    <rect x="130" y="65" width="60" height="14" rx="2" fill="#1a3a7c" />
    <text x="160" y="75" textAnchor="middle" fill="#4a90d9" fontSize="7" fontWeight="bold" fontFamily="sans-serif">LAZORD</text>

    {/* Floating dots */}
    {[40,80,140,200,260,300].map((x,i)=>(
      <circle key={`d${i}`} cx={x} cy={180+(i%3)*20} r="1.5" fill="#4a90d9" opacity="0.3">
        <animate attributeName="cy" values={`${180+(i%3)*20};${170+(i%3)*20};${180+(i%3)*20}`} dur={`${3+i}s`} repeatCount="indefinite"/>
      </circle>
    ))}
  </svg>
)

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [eyeBlinking, setEyeBlinking] = useState(false)
  const navigate = useNavigate()

  // Eye animation when typing password
  useEffect(() => {
    setEyeBlinking(password.length > 0 && !showPassword)
  }, [password, showPassword])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { default: axios } = await import('axios')
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password })
      // login(res.data.data, res.data.data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    backgroundColor: '#060f26',
    border: '1px solid rgba(45,95,196,0.35)',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '0.92rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#060f26',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Segoe UI', sans-serif"
    }}>

      {/* Background blobs */}
      <div style={{ position:'absolute', top:'-120px', left:'-120px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(45,95,196,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-100px', right:'-100px', width:'450px', height:'450px', borderRadius:'50%', background:'radial-gradient(circle, rgba(74,144,217,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />

      {/* Grid lines decoration */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(45,95,196,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,95,196,0.04) 1px, transparent 1px)', backgroundSize:'50px 50px', pointerEvents:'none' }} />

      <div style={{ width:'100%', maxWidth:'880px', position:'relative', zIndex:1 }}>

        {/* Hello heading */}
        <div style={{ textAlign:'center', marginBottom:'28px' }}>
          <h1 style={{ color:'#ffffff', fontSize:'2.2rem', fontWeight:'800', margin:'0 0 6px', letterSpacing:'-0.5px' }}>
            Hello, <span style={{ color:'#4a90d9' }}>Welcome Back</span> 👋
          </h1>
          <p style={{ color:'#8aafd4', fontSize:'0.92rem', margin:0 }}>Sign in to your admin account to continue</p>
        </div>

        {/* Two column layout */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:'0',
          backgroundColor:'#0d1f4e',
          border:'1px solid rgba(74,144,217,0.2)',
          borderRadius:'24px',
          overflow:'hidden',
          boxShadow:'0 32px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(74,144,217,0.08)'
        }}>

          {/* Left — Illustration */}
          <div style={{
            background:'linear-gradient(135deg, #060f26 0%, #0a1840 100%)',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            padding:'40px 30px',
            borderRight:'1px solid rgba(45,95,196,0.15)',
            position:'relative',
            overflow:'hidden'
          }}>
            <div style={{ position:'absolute', top:'20px', left:'20px', right:'20px', bottom:'20px', border:'1px solid rgba(45,95,196,0.08)', borderRadius:'16px', pointerEvents:'none' }} />

            {/* Logo */}
            <div style={{ marginBottom:'24px', display:'flex', alignItems:'center', gap:'10px' }}>
              <div style={{ backgroundColor:'#ffffff', borderRadius:'10px', padding:'6px 10px' }}>
                <img src={logo} alt="Lazord" style={{ height:'36px', width:'auto', objectFit:'contain', display:'block' }} />
              </div>
              <div>
                <div style={{ color:'#ffffff', fontWeight:'700', fontSize:'1rem' }}>
                  Lazord<span style={{ color:'#4a90d9' }}>Admin</span>
                </div>
                <div style={{ color:'#8aafd4', fontSize:'0.6rem', letterSpacing:'2px' }}>REAL ESTATE</div>
              </div>
            </div>

            {/* SVG Illustration */}
            <LoginIllustration watching={eyeBlinking} />

            {/* Caption */}
            <p style={{ color:'#4a5a7a', fontSize:'0.78rem', textAlign:'center', marginTop:'16px', lineHeight:'1.6' }}>
              {eyeBlinking
                ? '🔐 Keeping your data secure...'
                : '🏙️ Manage Dubai\'s finest properties'}
            </p>
          </div>

          {/* Right — Form */}
          <div style={{ padding:'48px 44px', display:'flex', flexDirection:'column', justifyContent:'center' }}>

            <div style={{ marginBottom:'32px' }}>
              <h2 style={{ color:'#ffffff', fontSize:'1.6rem', fontWeight:'700', margin:'0 0 8px' }}>
                Sign In
              </h2>
              <p style={{ color:'#8aafd4', fontSize:'0.88rem', margin:0 }}>
                Enter your credentials to access the dashboard
              </p>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                backgroundColor:'rgba(231,76,60,0.12)',
                border:'1px solid rgba(231,76,60,0.3)',
                borderRadius:'10px',
                padding:'12px 16px',
                color:'#e74c3c',
                fontSize:'0.88rem',
                marginBottom:'20px',
                display:'flex',
                alignItems:'center',
                gap:'8px'
              }}>
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div style={{ marginBottom:'18px' }}>
                <label style={{ color:'#8aafd4', fontSize:'0.73rem', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'8px', display:'block', fontWeight:'600' }}>
                  Email Address
                </label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', fontSize:'1rem' }}>📧</span>
                  <input
                    type="email"
                    required
                    placeholder="admin@lazordrealestate.ae"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ ...inputStyle, padding:'13px 14px 13px 42px' }}
                    onFocus={e => { e.target.style.borderColor='#4a90d9'; e.target.style.boxShadow='0 0 0 3px rgba(74,144,217,0.1)' }}
                    onBlur={e => { e.target.style.borderColor='rgba(45,95,196,0.35)'; e.target.style.boxShadow='none' }}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom:'28px' }}>
                <label style={{ color:'#8aafd4', fontSize:'0.73rem', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'8px', display:'block', fontWeight:'600' }}>
                  Password
                </label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', fontSize:'1rem' }}>🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ ...inputStyle, padding:'13px 48px 13px 42px' }}
                    onFocus={e => { e.target.style.borderColor='#4a90d9'; e.target.style.boxShadow='0 0 0 3px rgba(74,144,217,0.1)' }}
                    onBlur={e => { e.target.style.borderColor='rgba(45,95,196,0.35)'; e.target.style.boxShadow='none' }}
                  />
                  {/* Eye toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position:'absolute', right:'14px', top:'50%', transform:'translateY(-50%)',
                      background:'none', border:'none', cursor:'pointer', padding:'4px',
                      fontSize:'1.1rem', lineHeight:1,
                      transition:'transform 0.2s ease'
                    }}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <span style={{
                      display:'inline-block',
                      transition:'all 0.3s ease',
                      transform: showPassword ? 'scale(1.2)' : 'scale(1)',
                      filter: password.length > 0 ? 'none' : 'grayscale(1)',
                    }}>
                      {showPassword ? '🙈' : '👁️'}
                    </span>
                  </button>
                </div>

                {/* Password strength hint */}
                {password.length > 0 && (
                  <div style={{ marginTop:'8px', display:'flex', gap:'4px', alignItems:'center' }}>
                    {[1,2,3,4].map(i => (
                      <div key={i} style={{
                        height:'3px', flex:1, borderRadius:'2px',
                        backgroundColor: password.length >= i*3
                          ? (password.length >= 10 ? '#27ae60' : '#4a90d9')
                          : 'rgba(45,95,196,0.2)',
                        transition:'background-color 0.3s ease'
                      }} />
                    ))}
                    <span style={{ color:'#8aafd4', fontSize:'0.7rem', marginLeft:'6px', whiteSpace:'nowrap' }}>
                      {password.length < 4 ? 'Weak' : password.length < 8 ? 'Fair' : password.length < 10 ? 'Good' : 'Strong'}
                    </span>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width:'100%',
                  backgroundColor: loading ? '#1a3a7c' : '#2d5fc4',
                  color:'#ffffff',
                  border:'none',
                  borderRadius:'10px',
                  padding:'14px',
                  fontSize:'0.95rem',
                  fontWeight:'700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition:'all 0.2s ease',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  gap:'8px',
                  boxShadow: loading ? 'none' : '0 8px 24px rgba(45,95,196,0.35)',
                  letterSpacing:'0.3px'
                }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.backgroundColor='#1a3a7c'; e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(45,95,196,0.5)' } }}
                onMouseLeave={e => { if (!loading) { e.currentTarget.style.backgroundColor='#2d5fc4'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(45,95,196,0.35)' } }}
              >
                {loading ? (
                  <><span style={{ display:'inline-block', animation:'spin 1s linear infinite' }}>⟳</span> Signing In...</>
                ) : (
                  <>Sign In to Dashboard →</>
                )}
              </button>

            </form>

            {/* Footer */}
            <div style={{ marginTop:'28px', paddingTop:'20px', borderTop:'1px solid rgba(45,95,196,0.15)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <p style={{ color:'#4a4a6a', fontSize:'0.75rem', margin:0 }}>
                🔐 Secure admin access
              </p>
              <a href="/" style={{ color:'#8aafd4', fontSize:'0.78rem', textDecoration:'none', transition:'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color='#4a90d9'}
                onMouseLeave={e => e.currentTarget.style.color='#8aafd4'}>
                ← Back to Website
              </a>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: #4a5a7a; }
        @media (max-width: 640px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default AdminLogin