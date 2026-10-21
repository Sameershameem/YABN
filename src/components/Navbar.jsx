import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, ChevronRight, Menu, Sparkles, User, X } from 'lucide-react'
import { useScrollLock } from './hooks'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Mission 100', to: '/mission-100' },
  { label: 'Internship', to: '/#internships' },
]

export function Wordmark({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="YABN home"
      className={`group flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02] ${className}`}
    >
      <img
        src="/img/yabn-logo-white.png"
        alt="YABN Logo"
        className="h-9 sm:h-10 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = '/img/yabn-logo-trans.png'
        }}
      />
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className="text-[17px] font-black tracking-[0.22em] text-white">YABN</span>
          <span className="text-[10px] text-[#B98F32]">•</span>
          <span className="text-[11px] font-semibold tracking-wider text-slate-300">YASIR ALI</span>
        </div>
        <span className="mt-1 text-[7.5px] font-bold tracking-[0.32em] text-[#dcc17b] uppercase">
          Business Network
        </span>
      </div>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash } = useLocation()
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

  const handleNavClick = (to) => {
    setOpen(false)
    if (to.startsWith('/#')) {
      const id = to.replace('/#', '')
      if (pathname === '/') {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
        if (id === 'internships') {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('open-internship-modal', { detail: { domain: 'business' } }))
          }, 150)
        }
      } else {
        if (id === 'internships') {
          sessionStorage.setItem('open_internship_modal', 'true')
        }
      }
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#021329]/95 py-3 shadow-xl shadow-[#021329]/25 border-b border-white/10 backdrop-blur-md'
          : 'bg-[#021329] py-3.5 sm:py-4 border-b border-white/10 backdrop-blur-sm'
      }`}
    >
      {/* Top subtle gold accent hairline */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#B98F32]/80 to-transparent pointer-events-none" />

      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[1320px] items-center justify-between px-5 sm:px-8"
      >
        {/* Brand / Logo */}
        <Wordmark />

        {/* Center Nav Links - Navy Capsule */}
        <ul className="hidden items-center gap-1 rounded-full bg-white/5 p-1.5 ring-1 ring-white/10 backdrop-blur-sm md:flex">
          {navItems.map((item) => {
            const isInternship = item.to === '/#internships'
            const isInternshipActive = isInternship && pathname === '/' && hash === '#internships'

            return (
              <li key={item.to}>
                {isInternship ? (
                  <Link
                    to={item.to}
                    onClick={() => handleNavClick(item.to)}
                    className={`block rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                      isInternshipActive
                        ? 'bg-gradient-to-r from-[#B98F32] to-[#cca244] text-[#021329] font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{item.label}</span>
                      <span className="inline-block size-1.5 rounded-full bg-[#B98F32] animate-pulse" />
                    </span>
                  </Link>
                ) : (
                  <NavLink
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      `block rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                        isActive && (!hash || hash === '')
                          ? 'bg-gradient-to-r from-[#B98F32] to-[#cca244] text-[#021329] font-bold shadow-xs'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            )
          })}
        </ul>

        {/* Right CTA Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Assessment Link */}
          <Link
            to="/services#assessment"
            className="text-[12px] font-bold tracking-wider uppercase text-slate-300 transition-colors hover:text-[#dcc17b]"
          >
            Growth Test
          </Link>

          {/* Primary Action Button (Gold Luxury Pill) */}
          <Link
            to="/contact"
            className="group inline-flex min-h-10 items-center gap-2 rounded-full bg-gradient-to-r from-[#B98F32] via-[#cca244] to-[#B98F32] px-5 py-2 text-[12px] font-bold tracking-wider uppercase text-[#021329] shadow-md shadow-[#B98F32]/25 transition-all duration-200 hover:brightness-110 active:scale-95"
          >
            <span>Get in Touch</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          {/* Profile / Account Icon */}
          <Link
            to="/contact?topic=Discovery+call#form"
            aria-label="User portal & consultation"
            className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-all hover:bg-white/20 active:scale-95"
          >
            <User className="size-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/20 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-4 top-[72px] rounded-3xl bg-[#021329]/98 p-6 shadow-2xl ring-1 ring-white/15 backdrop-blur-2xl transition-all duration-300 md:hidden ${
          open
            ? 'visible translate-y-0 opacity-100 pointer-events-auto'
            : 'invisible -translate-y-3 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#dcc17b]">
            Navigation Menu
          </span>
          <span className="text-[11px] text-slate-400">YABN Executive Portal</span>
        </div>

        <ul className="mt-3 space-y-1">
          {navItems.map((item) => {
            const isInternship = item.to === '/#internships'
            return (
              <li key={item.to}>
                {isInternship ? (
                  <Link
                    to={item.to}
                    onClick={() => handleNavClick(item.to)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium text-white/90 transition-colors hover:bg-white/10"
                  >
                    <span className="flex items-center gap-2">
                      <span>{item.label}</span>
                      <span className="rounded-full bg-[#B98F32]/20 px-2 py-0.5 text-[10px] font-bold text-[#dcc17b]">
                        New
                      </span>
                    </span>
                    <ChevronRight className="size-4 text-[#dcc17b]" />
                  </Link>
                ) : (
                  <NavLink
                    to={item.to}
                    end
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium transition-colors ${
                        isActive
                          ? 'bg-[#B98F32] text-[#021329] font-bold'
                          : 'text-white/90 hover:bg-white/10'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="size-4 opacity-70" />
                  </NavLink>
                )}
              </li>
            )
          })}
        </ul>

        {/* Mobile Quick Action Buttons */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-2.5">
          <Link
            to="/#internships"
            onClick={() => handleNavClick('/#internships')}
            className="flex items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#dcc17b] ring-1 ring-white/15 hover:bg-white/15"
          >
            <Sparkles className="size-3.5 text-[#B98F32]" />
            <span>Apply for Venture Fellowship</span>
          </Link>

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B98F32] to-[#cca244] py-3 text-center text-xs font-bold uppercase tracking-wider text-[#021329] shadow-md hover:brightness-110"
          >
            <span>Get in Touch</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
