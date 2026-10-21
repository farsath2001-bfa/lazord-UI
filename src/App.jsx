import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
const Properties = lazy(() => import('./pages/Properties'))
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProperties = lazy(() => import('./pages/admin/AdminProperties'))
const AdminLeads = lazy(() => import('./pages/admin/AdminLeads'))
import AdminRoute from './components/admin/AdminRoute'
import { AdminProvider } from './context/AdminContext'
const Agents = lazy(() => import('./pages/Agent'))
import WhatsAppButton from './components/common/WhatsAppButton'
const FAQPage = lazy(() => import('./pages/FaqPage'))
const NewsletterPage = lazy(() => import('./pages/NewsletterPage'))
import LeadPopup from './components/common/LeadPopup'
import CustomCursor from './components/common/CustomCursor'
import BackToTop from './components/common/BackToTop'
import NotFound from './pages/NotFound'
import PageLoader from './components/common/PageLoader'
const LegalPage = lazy(() => import('./pages/LegalPage'))
const Favorites = lazy(() => import('./pages/Favorites'))
const MortgageCalculatorPage = lazy(() => import('./pages/MortgageCalculatorPage'))
import { FavoritesProvider } from './context/FavoritesProvider'
import { CompareProvider } from './context/CompareProvider'
import { CurrencyProvider } from './context/CurrencyProvider'
import CompareBar from './components/common/CompareBar'
import MobileActionBar from './components/common/MobileActionBar'
import ExitIntentOffer from './components/common/ExitIntentOffer'
const Compare = lazy(() => import('./pages/Compare'))
const InvestmentTools = lazy(() => import('./pages/InvestmentTools'))
const Areas = lazy(() => import('./pages/Areas'))
const AreaGuide = lazy(() => import('./pages/AreaGuide'))
import CookieConsent from './components/CookieConsent'
import { warmUpApi } from './utils/propertiesApi'
import { ToastProvider } from './components/common/ToastContext'
import ScrollProgressBar from './components/common/ScrollProgressBar'
import GlobalPolishStyles from './components/common/GlobalPolishStyles'
import PageTransition from './components/common/PageTransition'

// Public-site overlays (chat button, lead popup, cookie banner...) must not appear in the admin panel.
const PublicOverlays = () => {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) return null
  return (
    <>
      <ScrollProgressBar />
      <CustomCursor />
      <WhatsAppButton />
      <CookieConsent />
      <LeadPopup />
      <BackToTop />
    </>
  )
}

// ✅ Moved OUTSIDE App — defined once, uses useLocation safely inside BrowserRouter
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.classList.toggle('is-admin', pathname.startsWith('/admin'))
  }, [pathname])
  return null
}

function App() {
  useEffect(() => { warmUpApi() }, [])

  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('lazord_loaded')
  })

  const handleLoaderComplete = () => {
    sessionStorage.setItem('lazord_loaded', 'true')
    setLoading(false)
  }

  return (
    <ToastProvider>
    <FavoritesProvider>
    <CompareProvider>
    <CurrencyProvider>
      <GlobalPolishStyles />

      {loading && <PageLoader onComplete={handleLoaderComplete} />}

      <BrowserRouter>
        <AdminProvider>
          <ScrollToTop />      {/* ✅ Now safely inside BrowserRouter */}
          <PublicOverlays />
          <CompareBar />
          <MobileActionBar />
          <ExitIntentOffer />

          <PageTransition>
            <Suspense fallback={<div style={{ minHeight: '70vh', background: '#060f26' }} />}>
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
              <Route path="/favorites"   element={<><Navbar /><Favorites /><Footer /></>} />
              <Route path="/mortgage-calculator" element={<><Navbar /><MortgageCalculatorPage /><Footer /></>} />
              <Route path="/compare"   element={<><Navbar /><Compare /><Footer /></>} />
              <Route path="/investment-tools" element={<><Navbar /><InvestmentTools /><Footer /></>} />
              <Route path="/areas"        element={<><Navbar /><Areas /><Footer /></>} />
              <Route path="/areas/:slug"  element={<><Navbar /><AreaGuide /><Footer /></>} />

              {/* Admin routes — no Navbar/Footer */}
              <Route path="/admin/login"       element={<AdminLogin />} />
              <Route path="/admin/dashboard"   element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/properties"  element={<AdminRoute><AdminProperties /></AdminRoute>} />
              <Route path="/admin/leads"       element={<AdminRoute><AdminLeads /></AdminRoute>} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </PageTransition>

        </AdminProvider>
      </BrowserRouter>
    </CurrencyProvider>
    </CompareProvider>
    </FavoritesProvider>
    </ToastProvider>
  )
}

export default App