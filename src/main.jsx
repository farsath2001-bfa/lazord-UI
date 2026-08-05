import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './i18n'
import App from './App.jsx'
import './rtl-fix.css'
import { HelmetProvider } from 'react-helmet-async'

// ✅ Apply saved language
const savedLang = localStorage.getItem('i18nextLng') || 'en'
document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr'
document.documentElement.lang = savedLang

// ✅ Clear bad/broken tokens on every app start
const token = localStorage.getItem('adminToken')
if (!token || token === 'undefined' || token === 'null') {
  localStorage.removeItem('adminToken')
  localStorage.removeItem('adminData')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
     <App />
    </HelmetProvider> 
  </StrictMode>
)