import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

// Wrap your <Routes> with this in App.jsx, like:
//
//   import PageTransition from './components/common/PageTransition'
//
//   <PageTransition>
//     <Routes location={location} key={location.pathname}>
//       <Route path="/" element={<Home />} />
//       ...
//     </Routes>
//   </PageTransition>
//
// Note: AnimatePresence needs a single child that changes on route change,
// so the <Routes> element itself must have `key={location.pathname}` (see above)
// for the exit/enter animation to trigger correctly.
const PageTransition = ({ children }) => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition