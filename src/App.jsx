import { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactFab from './components/ContactFab'
import Home from './pages/Home'
import { lazyPage, prefetch, prefetchAllWhenIdle } from './routes'

// Home loads eagerly for the fastest first paint; other pages are split out and prefetched
const About = lazyPage('/about')
const Services = lazyPage('/services')
const Mission100 = lazyPage('/mission-100')
const Contact = lazyPage('/contact')

const routes = [
  { path: '/', el: Home, title: 'YABN | Yasir Ali Business Network' },
  { path: '/about', el: About, title: 'About | YABN' },
  { path: '/services', el: Services, title: 'Services | YABN' },
  { path: '/mission-100', el: Mission100, title: 'Mission 100 | YABN' },
  { path: '/contact', el: Contact, title: 'Contact | YABN' },
]

function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center bg-ink px-5 text-center text-white">
      <p className="text-[13px] text-white/60">404</p>
      <h1 className="mt-3 text-4xl tracking-[-0.03em]">Page Not Found</h1>
    </section>
  )
}

// Scroll to top on page change, or to the #section when the link has one
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const r = routes.find((x) => x.path === pathname)
    document.title = r ? r.title : 'Page not found | YABN'
    if (hash) {
      // the target may be on a page that is still loading, so look for it for up to 2s
      let tries = 0
      let t = 0
      const seek = () => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else if (tries++ < 20) t = setTimeout(seek, 100)
      }
      t = setTimeout(seek, 80)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

// Any link the visitor hovers, focuses or touches starts loading that page immediately
function useIntentPrefetch() {
  useEffect(() => {
    const onIntent = (e) => {
      const a = e.target.closest?.('a[href^="/"]')
      if (a) prefetch(a.getAttribute('href'))
    }
    document.addEventListener('pointerover', onIntent, { passive: true })
    document.addEventListener('touchstart', onIntent, { passive: true })
    document.addEventListener('focusin', onIntent)
    prefetchAllWhenIdle()
    return () => {
      document.removeEventListener('pointerover', onIntent)
      document.removeEventListener('touchstart', onIntent)
      document.removeEventListener('focusin', onIntent)
    }
  }, [])
}

export default function App() {
  const { pathname } = useLocation()
  useIntentPrefetch()
  return (
    <>
      <a href="#main" className="sr-only z-[70] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      {/* The Suspense boundary stays mounted, so React Router's transitions keep the current
          page on screen until the next one is ready: no blank flash between tabs */}
      <main id="main">
        <Suspense fallback={<div className="min-h-[100svh] bg-ink" />}>
          <div key={pathname} className="animate-fade">
            <Routes>
              {routes.map(({ path, el: El }) => <Route key={path} path={path} element={<El />} />)}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
      </main>
      <Footer />
      <ContactFab />
    </>
  )
}
