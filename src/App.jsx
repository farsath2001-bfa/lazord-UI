// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Navbar from './components/common/Navbar'
// import Footer from './components/common/Footer'
// import Home from './pages/Home'
// import Properties from './pages/Properties'
// import PropertyDetail from './pages/PropertyDetail'
// import About from './pages/About'
// import Contact from './pages/Contact'

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/properties" element={<Properties />} />
//           <Route path="/buy" element={<Properties />} />
//           <Route path="/rent" element={<Properties />} />
//           <Route path="/sell" element={<Properties />} />
//           <Route path="/commercial" element={<Properties />} />
//           <Route path="/properties/:id" element={<PropertyDetail />} />
//           <Route path="/property/:id" element={<PropertyDetail />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>
//       </main>
//       <Footer />
//     </BrowserRouter>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import WhatsAppButton from './components/common/WhatsappButton'

function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <WhatsAppButton/>
        <Routes>
          {/* Public routes with Navbar + Footer */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/properties" element={<><Navbar /><Properties /><Footer /></>} />
          <Route path="/buy" element={<><Navbar /><Properties /><Footer /></>} />
          <Route path="/rent" element={<><Navbar /><Properties /><Footer /></>} />
          <Route path="/sell" element={<><Navbar /><Properties /><Footer /></>} />
          <Route path="/commercial" element={<><Navbar /><Properties /><Footer /></>} />
          <Route path="/properties/:id" element={<><Navbar /><PropertyDetail /><Footer /></>} />
          <Route path="/property/:id" element={<><Navbar /><PropertyDetail /><Footer /></>} />
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/properties" element={<AdminRoute><AdminProperties /></AdminRoute>} />
          <Route path="/admin/leads" element={<AdminRoute><AdminLeads /></AdminRoute>} />
          <Route path="/agents" element={<><Navbar /><Agents /><Footer /></>} />
          
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  )
}

export default App