import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import Footer from './components/Footer'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import Contact from './pages/Contact'
import Faqs from './pages/Faqs'

const scrollKey = (key: string) => `np-scroll:${key}`

/**
 * Link clicks start at the top (or at a #section); Back/Forward put you where you were
 * on that page, instead of dumping you at the top of Home.
 */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const navType = useNavigationType()

  // remember how far each history entry was scrolled
  useEffect(() => {
    const save = () => {
      try {
        sessionStorage.setItem(scrollKey(key), String(window.scrollY))
      } catch {
        /* storage unavailable: back falls back to the top of the page */
      }
    }
    window.addEventListener('scroll', save, { passive: true })
    return () => window.removeEventListener('scroll', save)
  }, [key])

  useEffect(() => {
    if (navType === 'POP') {
      let saved: number | null = null
      try {
        const raw = sessionStorage.getItem(scrollKey(key))
        saved = raw === null ? null : Number(raw)
      } catch {
        saved = null
      }
      if (saved !== null && !Number.isNaN(saved)) {
        // wait for the page transition to finish mounting the previous page
        const t = setTimeout(() => window.scrollTo({ top: saved as number, behavior: 'instant' }), 600)
        return () => clearTimeout(t)
      }
    }
    if (hash) {
      const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key, navType])
  return null
}

// The intro plays on every full page load (including refresh), except for reduced-motion visitors.
const skipIntro = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const location = useLocation()
  const [intro, setIntro] = useState(() => !skipIntro())

  // lock scrolling while the curtain is up
  useEffect(() => {
    document.body.style.overflow = intro ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [intro])

  const reveal = useCallback(() => setIntro(false), [])

  return (
    <>
      <AnimatePresence>{intro && <Preloader onReveal={reveal} />}</AnimatePresence>
      <ScrollProgress />
      <ScrollManager />
      <Nav />
      {/* page content mounts as the curtain lifts, so the hero animation plays on reveal */}
      {!intro && (
        <>
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/work/:slug" element={<CaseStudy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </motion.main>
          </AnimatePresence>
          <Footer />
        </>
      )}
    </>
  )
}
