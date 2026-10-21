import { Link, NavLink } from 'react-router-dom'
import { ArrowUp, Mail, Phone } from 'lucide-react'
import { Pill } from './ui'
import { navLinks } from '../data/content'
import { INBOX } from '../lib/submit'

const YEAR = new Date().getFullYear()
const more = [
  ['Internship & Fellowship', '/#internships'],
  ['Growth assessment', '/services#assessment'],
  ['Business Network', '/services#network'],
  ['FAQs', '/contact#faqs'],
]

export default function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden mx-auto max-w-[1400px] rounded-[28px] bg-[#021329] border border-white/10 px-6 pt-12 pb-8 text-white sm:px-12 sm:pt-16 shadow-2xl">
        {/* Large YABN Background Watermark Text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 sm:-bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-center font-black tracking-[0.14em] text-white/[0.04] text-[clamp(6rem,22vw,17rem)] leading-none -z-10"
        >
          YABN
        </div>

        {/* Top Grid: Logo, Description, Navigation Links */}
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            {/* Logo Display */}
            <Link to="/" className="inline-flex items-center gap-3.5 mb-4 group">
              <img
                src="/img/yabn-logo-white.png"
                alt="YABN Logo"
                className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = '/img/yabn-logo-trans.png'
                }}
              />
              <div className="flex flex-col leading-none">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-[0.22em] text-white">YABN</span>
                  <span className="text-[#B98F32]">•</span>
                  <span className="text-[11px] font-semibold tracking-wider text-slate-300">YASIR ALI</span>
                </div>
                <span className="mt-1 text-[8px] font-bold tracking-[0.35em] text-[#dcc17b] uppercase">
                  Business Network
                </span>
              </div>
            </Link>

            <p className="max-w-xs text-[15px] leading-relaxed text-white/80">
              YABN builds exceptional entrepreneurs through learning, growth and a trusted sovereign network.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Pill to="/contact" variant="white" size="sm">
                Get In Touch
              </Pill>
              <a
                href={`mailto:${INBOX}`}
                className="inline-flex items-center gap-2 text-xs text-white/70 hover:text-[#dcc17b] transition-colors"
              >
                <Mail className="size-3.5 text-[#B98F32]" />
                <span>{INBOX}</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav aria-label="Footer">
            <p className="text-xs font-bold uppercase tracking-widest text-[#dcc17b] mb-4">
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 text-sm transition-colors ${
                        isActive ? 'text-[#dcc17b] font-medium' : 'text-white/80 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`size-1.5 rounded-full ${
                            isActive ? 'bg-[#B98F32]' : 'bg-transparent'
                          }`}
                        />
                        {l.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources & More Links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#dcc17b] mb-4">
              Portals & Programs
            </p>
            <ul className="space-y-3">
              {more.map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    onClick={() => {
                      if (to === '/#internships') {
                        setTimeout(() => {
                          window.dispatchEvent(
                            new CustomEvent('open-internship-modal', { detail: { domain: 'business' } })
                          )
                        }, 150)
                      }
                    }}
                    className="text-sm text-white/80 hover:text-[#dcc17b] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Back to Top (with "Built by" removed) */}
        <div className="relative z-10 mt-16 pt-8 border-t border-white/10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between text-[13px] text-white/60">
          <p>© {YEAR} YABN (Yasir Ali Business Network). All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <a
              href="tel:+919045417079"
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
            >
              <Phone className="size-3 text-[#B98F32]" />
              <span>+91 90454 17079</span>
            </a>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 text-white/85 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="size-3.5 text-[#dcc17b]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
