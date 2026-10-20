import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { navLinks } from '../data/content'
import { useScrollLock } from './hooks'

export function Wordmark({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="YABN - Yasir Ali Business Network"
      className={`group inline-flex items-center gap-3 transition-transform hover:scale-[1.02] ${className}`}
    >
      <img
        src="/img/yabn-logo-trans.png"
        alt="YABN - Yasir Ali Business Network"
        className="h-10 w-auto object-contain sm:h-11 md:h-12"
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = '/img/yabn-logo.png'
        }}
      />
    </Link>
  )
}

const tabs = navLinks.filter((l) => l.to !== '/contact')

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  useScrollLock(open)

  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 py-2.5 shadow-md border-b border-slate-200/80 backdrop-blur-md'
          : 'bg-[#fafafa]/90 py-3.5 border-b border-slate-200/60 backdrop-blur-sm'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex max-w-[1320px] items-center justify-between px-6 sm:px-10">
        <Wordmark />

        {/* Center Nav Links */}
        <ul className="hidden items-center gap-1 rounded-full bg-slate-100/80 p-1.5 ring-1 ring-slate-200/80 md:flex">
          {tabs.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end
                className={({ isActive }) =>
                  `block rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#021329] shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-[#021329] hover:bg-white/60'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right CTA Area: Growth Test + Get in Touch */}
        <div className="hidden items-center gap-5 md:flex">
          <Link
            to="/services#assessment"
            className="text-[13px] font-semibold text-slate-700 transition-colors hover:text-[#B98F32]"
          >
            Growth Test
          </Link>
          <Link
            to="/contact"
            className="group inline-flex min-h-10 items-center gap-2 rounded-full bg-[#021329] px-6 text-[12px] font-bold tracking-wider uppercase text-white shadow-sm transition-all duration-200 hover:bg-[#B98F32] active:scale-95"
          >
            <span>Get in Touch</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex size-10 items-center justify-center rounded-full bg-slate-100 text-[#021329] ring-1 ring-slate-200 transition-colors hover:bg-slate-200 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-4 top-[72px] rounded-3xl bg-[#021329]/95 p-5 shadow-2xl ring-1 ring-white/15 backdrop-blur-2xl transition-all duration-300 md:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible -translate-y-3 opacity-0'
        }`}
      >
        <ul className="space-y-1">
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                    isActive ? 'bg-[#B98F32] text-white font-semibold' : 'text-white/85 hover:bg-white/10'
                  }`
                }
              >
                <span>{l.label}</span>
                <ArrowRight className="size-4 opacity-70" />
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
          <Link
            to="/services#assessment"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center rounded-xl bg-white/10 py-2.5 text-center text-sm font-medium text-white hover:bg-white/15"
          >
            Take 60-Sec Growth Assessment
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#B98F32] py-2.5 text-center text-sm font-semibold text-white shadow-md hover:bg-[#9f7924]"
          >
            <span>Get in Touch</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
