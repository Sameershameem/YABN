import { Link, NavLink } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { GoldMark } from './landing'
import { navLinks } from '../data/content'
import { INBOX } from '../lib/submit'

const YEAR = new Date().getFullYear()
const more = [
  ['Apply now', '/#apply'],
  ['Internship & Fellowship', '/#internships'],
  ['Growth assessment', '/services#assessment'],
  ['FAQs', '/contact#faqs'],
]

export default function Footer() {
  return (
    <footer className="bg-white px-3 pt-6 pb-3 sm:px-5 sm:pb-5">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-[#021329] px-7 pt-14 pb-8 text-white sm:rounded-[40px] sm:px-12 lg:px-16 lg:pt-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_100%_100%,rgba(185,143,50,0.2),transparent)]" />
        <GoldMark className="absolute -right-10 -bottom-12 hidden w-60 opacity-90 sm:block lg:-right-6 lg:w-72" />

        <div className="relative">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-[#e6cf94] uppercase">Har ghar se ek entrepreneur</p>
          <p className="mt-3 text-[clamp(3rem,9vw,6.5rem)] leading-none font-medium tracking-[-0.05em]">YABN</p>
          <p className="mt-2 text-[16px] text-white/75">Yasir Ali Business Network</p>

          <div className="mt-12 grid gap-10 sm:grid-cols-3 lg:max-w-3xl">
            <nav aria-label="Footer">
              <p className="text-[13px] font-medium text-white/60">Pages</p>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end
                      className={({ isActive }) =>
                        `text-[15px] transition-colors ${isActive ? 'text-[#e6cf94]' : 'text-white hover:text-[#e6cf94]'}`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-[13px] font-medium text-white/60">Get started</p>
              <ul className="mt-4 space-y-2.5">
                {more.map(([label, to]) => (
                  <li key={label}>
                    <Link
                      to={to}
                      onClick={() => {
                        if (to === '/#internships') {
                          setTimeout(() => {
                            window.dispatchEvent(new CustomEvent('open-internship-modal', { detail: { domain: 'business' } }))
                          }, 150)
                        }
                      }}
                      className="text-[15px] text-white transition-colors hover:text-[#e6cf94]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[13px] font-medium text-white/60">Contact</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                <li>
                  <a href={`mailto:${INBOX}`} className="break-all text-white transition-colors hover:text-[#e6cf94]">
                    {INBOX}
                  </a>
                </li>
                <li>
                  <a href="tel:+918439417079" className="text-white transition-colors hover:text-[#e6cf94]">
                    +91 84394 17079
                  </a>
                </li>
                <li className="text-white/75">Lal Diggi Road, Aligarh</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-6 text-[13px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© {YEAR} YABN · Yasir Ali Business Network</p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 self-start text-white/80 transition-colors hover:text-white sm:mr-40 lg:mr-64"
            >
              Back to top
              <ArrowUp className="size-3.5 text-[#e6cf94]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
