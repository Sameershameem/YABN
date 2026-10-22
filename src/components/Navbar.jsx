import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
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
    <Link to="/" aria-label="YABN home" className={`flex shrink-0 items-center ${className}`}>
      <img src="/img/yabn-logo-160.webp" alt="YABN, Yasir Ali Business Network" width="70" height="40" className="h-9 w-auto sm:h-10" />
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const { pathname, hash } = useLocation()
  useScrollLock(open)

  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  // tuck the bar away while reading down the page, bring it back on any scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 160)
        lastY.current = y
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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

  const linkCls = (active) =>
    `relative block rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-200 ${
      active ? 'text-[#021329]' : 'text-slate-600 hover:text-[#021329]'
    }`
  const dot = (active) => (
    <span
      className={`absolute bottom-0 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#B98F32] transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`}
    />
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5 sm:pt-4 ${
        hidden && !open ? '-translate-y-[130%]' : 'translate-y-0'
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[1320px] items-center justify-between rounded-full bg-white/90 py-2 pr-2 pl-4 shadow-[0_10px_30px_-18px_rgba(2,19,41,0.35)] ring-1 ring-slate-200/80 sm:pl-5 md:backdrop-blur-md"
      >
        <Wordmark />

        <ul className="hidden items-center md:flex">
          {navItems.map((item) => {
            if (item.to === '/#internships') {
              const active = pathname === '/' && hash === '#internships'
              return (
                <li key={item.to}>
                  <Link to={item.to} onClick={() => handleNavClick(item.to)} className={linkCls(active)}>
                    {item.label}
                    <sup className="ml-0.5 font-mono text-[9px] text-[#B98F32]">new</sup>
                    {dot(active)}
                  </Link>
                </li>
              )
            }
            return (
              <li key={item.to}>
                <NavLink to={item.to} end className={({ isActive }) => linkCls(isActive && !hash)}>
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {dot(isActive && !hash)}
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/services#assessment"
            className="rounded-full px-3 py-2 text-[14px] text-slate-600 transition-colors hover:text-[#96711e]"
          >
            Growth test
          </Link>
          <Link
            to="/#apply"
            className="group inline-flex items-center gap-2 rounded-full bg-[#021329] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#0b2a52]"
          >
            Apply now
            <ArrowRight className="size-3.5 text-[#dcc17b] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex size-10 items-center justify-center rounded-full bg-[#021329] text-white transition-colors md:hidden"
        >
          {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-3 top-[76px] rounded-[24px] bg-white p-3 shadow-[0_30px_60px_-20px_rgba(2,19,41,0.35)] ring-1 ring-slate-200 transition-[opacity,translate] duration-300 md:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible -translate-y-3 opacity-0'
        }`}
      >
        <ul>
          {navItems.map((item, i) => {
            const isInternship = item.to === '/#internships'
            const row = (active) =>
              `flex items-center gap-4 border-b border-slate-100 px-3 py-4 text-[17px] tracking-tight transition-colors ${
                active ? 'text-[#021329]' : 'text-slate-600'
              }`
            const inner = (
              <>
                <span className="label-mono w-5 text-slate-400">0{i + 1}</span>
                <span className="flex-1">{item.label}</span>
                <ArrowUpRight className="size-4 text-slate-300" />
              </>
            )
            return (
              <li key={item.to}>
                {isInternship ? (
                  <Link to={item.to} onClick={() => handleNavClick(item.to)} className={row(false)}>
                    {inner}
                  </Link>
                ) : (
                  <NavLink to={item.to} end onClick={() => setOpen(false)} className={({ isActive }) => row(isActive)}>
                    {inner}
                  </NavLink>
                )}
              </li>
            )
          })}
        </ul>
        <div className="grid grid-cols-2 gap-2 p-2 pt-4">
          <Link
            to="/services#assessment"
            onClick={() => setOpen(false)}
            className="rounded-xl bg-[#f5ecd7] py-3 text-center text-[14px] font-medium text-[#7a5a14]"
          >
            Growth test
          </Link>
          <Link
            to="/#apply"
            onClick={() => setOpen(false)}
            className="rounded-xl bg-[#021329] py-3 text-center text-[14px] font-medium text-white"
          >
            Apply now
          </Link>
        </div>
      </div>
    </header>
  )
}
