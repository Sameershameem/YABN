import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { navLinks } from '../data/content'
import { useScrollLock } from './hooks'

export function Wordmark({ className = '' }) {
  return (
    <Link to="/" aria-label="YABN home" className={`inline-flex flex-col items-center leading-none text-white ${className}`}>
      <span className="text-[21px] font-normal tracking-[0.32em]">YABN</span>
      <span className="mt-1 text-[7px] tracking-[0.42em] text-white/70">BUSINESS NETWORK</span>
    </Link>
  )
}

const tabs = navLinks.filter((l) => l.to !== '/contact')

// Floats over every page's photo hero, like the reference
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useScrollLock(open)

  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav aria-label="Main" className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-5 sm:h-24 sm:px-8">
        <Wordmark />

        <ul className="glass hidden items-center gap-1 rounded-full p-1 md:flex">
          {tabs.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end
                className={({ isActive }) =>
                  `block rounded-full px-4 py-1.5 text-[13px] transition-colors ${isActive ? 'bg-white text-ink' : 'text-white/80 hover:text-white'}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="group hidden min-h-10 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-medium text-ink transition-colors hover:bg-cream md:inline-flex"
        >
          Get in Touch <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="glass inline-flex min-h-9 items-center gap-2 rounded-full px-3.5 text-[12px] text-white md:hidden"
        >
          <span className="relative block h-2 w-3.5">
            <span className={`absolute left-0 h-px w-3.5 bg-white transition-transform duration-300 ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 h-px w-3.5 bg-white transition-transform duration-300 ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
          </span>
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {/* Phone menu: a transparent frosted sheet over the hero photo. The header scrolls away with
          the page, so the menu only ever opens over the dark hero, and the blur only runs while open */}
      <div
        id="mobile-menu"
        className={`fixed top-[72px] right-3 left-3 rounded-3xl bg-black/25 p-2 ring-1 ring-white/15 backdrop-blur-xl backdrop-saturate-150 transition-[opacity,transform] duration-300 md:hidden ${
          open ? 'visible opacity-100' : 'pointer-events-none invisible -translate-y-2 opacity-0'
        }`}
      >
        <ul>
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end
                className={({ isActive }) => `flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] transition-colors ${isActive ? 'bg-white/20 text-white' : 'text-white/85 active:bg-white/10'}`}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
