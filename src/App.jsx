import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProperties from './pages/admin/AdminProperties'
import AdminLeads from './pages/admin/AdminLeads'
import AdminRoute from './components/admin/AdminRoute'
import { AdminProvider } from './context/AdminContext'
import Agents from './pages/Agent'
import WhatsAppButton from './components/common/WhatsAppButton'
import FAQPage from './pages/FaqPage'
import NewsletterPage from './pages/NewsletterPage'
import LeadPopup from './components/common/LeadPopup'
import CustomCursor from './components/common/CustomCursor'
import BackToTop from './components/common/BackToTop'
import NotFound from './pages/NotFound'
import PageLoader from './components/common/PageLoader'
import LegalPage from './pages/LegalPage'

// ✅ Moved OUTSIDE App — defined once, uses useLocation safely inside BrowserRouter
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('lazord_loaded')
  })

  const handleLoaderComplete = () => {
    sessionStorage.setItem('lazord_loaded', 'true')
    setLoading(false)
  }

  return (
    <>
      {loading && <PageLoader onComplete={handleLoaderComplete} />}

      <BrowserRouter>
        <AdminProvider>
          <ScrollToTop />      {/* ✅ Now safely inside BrowserRouter */}
          <CustomCursor />
          <WhatsAppButton />
          <LeadPopup />
          <BackToTop />

          <Routes>
            {/* Public routes */}
            <Route path="/"            element={<><Navbar /><Home /><Footer /></>} />
            <Route path="/properties"  element={<><Navbar /><Properties /><Footer /></>} />
            <Route path="/buy"         element={<><Navbar /><Properties /><Footer /></>} />
            <Route path="/rent"        element={<><Navbar /><Properties /><Footer /></>} />
            <Route path="/sell"        element={<><Navbar /><Properties /><Footer /></>} />
            <Route path="/commercial"  element={<><Navbar /><Properties /><Footer /></>} />
            <Route path="/properties/:id" element={<><Navbar /><PropertyDetail /><Footer /></>} />
            <Route path="/property/:id"   element={<><Navbar /><PropertyDetail /><Footer /></>} />
            <Route path="/about"       element={<><Navbar /><About /><Footer /></>} />
            <Route path="/contact"     element={<><Navbar /><Contact /><Footer /></>} />
            <Route path="/agents"      element={<><Navbar /><Agents /><Footer /></>} />
            <Route path="/faq"         element={<><Navbar /><FAQPage /><Footer /></>} />
            <Route path="/newsletter"  element={<><Navbar /><NewsletterPage /><Footer /></>} />
            <Route path="/legal"       element={<><Navbar /><LegalPage /><Footer /></>} />

            {/* Admin routes — no Navbar/Footer */}
            <Route path="/admin/login"       element={<AdminLogin />} />
            <Route path="/admin/dashboard"   element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/properties"  element={<AdminRoute><AdminProperties /></AdminRoute>} />
            <Route path="/admin/leads"       element={<AdminRoute><AdminLeads /></AdminRoute>} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

        </AdminProvider>
      </BrowserRouter>
    </>
  )
}

export default App