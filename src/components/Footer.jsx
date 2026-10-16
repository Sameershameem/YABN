import { Link, NavLink } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { Pill } from './ui'
import { navLinks } from '../data/content'

const YEAR = new Date().getFullYear()
const more = [
  ['Growth assessment', '/services#assessment'],
  ['Business Network', '/services#network'],
  ['FAQs', '/contact#faqs'],
]

export default function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-[1400px] rounded-[28px] bg-black px-6 pt-12 pb-8 text-white sm:px-12 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="max-w-xs text-[15px] leading-relaxed text-white/85">YABN builds exceptional entrepreneurs through learning, growth and a trusted network.</p>
            <Pill to="/contact" variant="white" size="sm" className="mt-6">Get In Touch</Pill>
          </div>
          <nav aria-label="Footer">
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end className={({ isActive }) => `flex items-center gap-2.5 text-sm ${isActive ? 'text-bronze-300' : 'text-white/85 hover:text-white'}`}>
                    {({ isActive }) => (
                      <>
                        <span className={`size-1.5 rounded-full ${isActive ? 'bg-bronze-300' : 'bg-transparent'}`} />
                        {l.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="space-y-3">
            {more.map(([label, to]) => (
              <li key={label}><Link to={to} className="text-sm text-white/85 hover:text-white">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col gap-8 sm:mt-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="leading-none">
            <p className="text-[clamp(3rem,9vw,5.5rem)] font-normal tracking-[0.18em]">YABN</p>
            <p className="mt-2 text-[10px] tracking-[0.5em] text-white/60">YASIR ALI BUSINESS NETWORK</p>
          </div>
          <div className="flex flex-col gap-3 text-[13px] text-white/60 sm:flex-row sm:items-center sm:gap-10">
            <p>© {YEAR} All Rights Reserved.</p>
            <p>
              Built by{' '}
              <a
                href="https://portfolio-psi-inky-18.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bronze-300 underline decoration-bronze-300/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                Sameer Shameem
              </a>
            </p>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-1.5 self-start text-white/85 hover:text-white">
              Back to top <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
