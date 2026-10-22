import { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react'
import { founder } from '../data/content'
import { clamp01, useCountUp, useInView, useScrollFrame } from './hooks'
import { Reveal, TypeReveal } from './ui'

/* Pre-select a role in the apply form and scroll to it, from anywhere on the page */
export function applyAs(role) {
  window.dispatchEvent(new CustomEvent('yabn-apply', { detail: { role } }))
  document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Shell({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>
}

/* ---------- Motion primitives ---------- */

/* Gold YABN growth emblem: the one object that recurs through the page, like the reference's 3D hand */
export function GoldMark({ className = '', spin = true }) {
  const id = useId().replace(/:/g, '')
  const wrap = useRef(null)
  const turn = useRef(null)
  useScrollFrame(wrap, (rect, vh) => {
    if (!spin) return
    const p = (vh - rect.top) / (vh + rect.height)
    turn.current.style.transform = `translate3d(0, ${(0.5 - p) * 60}px, 0) rotate(${(p - 0.5) * 50}deg)`
  })
  return (
    <div ref={wrap} className={`pointer-events-none ${className}`} aria-hidden="true">
      <div ref={turn} className="will-change-transform">
        <div className="animate-float">
          <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_30px_40px_rgba(2,19,41,0.35)]">
            <defs>
              <linearGradient id={`${id}rim`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fff2c4" />
                <stop offset="0.45" stopColor="#c99b3b" />
                <stop offset="1" stopColor="#5e450f" />
              </linearGradient>
              <radialGradient id={`${id}face`} cx="0.34" cy="0.28" r="0.85">
                <stop offset="0" stopColor="#fff6d8" />
                <stop offset="0.3" stopColor="#ecc96f" />
                <stop offset="0.68" stopColor="#b98f32" />
                <stop offset="1" stopColor="#7a5a14" />
              </radialGradient>
              <linearGradient id={`${id}ink`} x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#021329" />
                <stop offset="1" stopColor="#123a6b" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="94" fill={`url(#${id}rim)`} />
            <circle cx="100" cy="100" r="82" fill={`url(#${id}face)`} />
            <circle cx="100" cy="100" r="82" fill="none" stroke="#fff3cf" strokeOpacity="0.55" strokeWidth="1.2" />
            {[
              [58, 112, 28],
              [80, 96, 44],
              [102, 80, 60],
            ].map(([x, y, h]) => (
              <rect key={x} x={x} y={y} width="16" height={h} rx="3" fill={`url(#${id}ink)`} />
            ))}
            <path
              d="M52 120 C 82 110, 108 86, 136 60"
              fill="none"
              stroke={`url(#${id}ink)`}
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path d="M118 54 L144 50 L140 76 Z" fill={`url(#${id}ink)`} strokeLinejoin="round" />
            <ellipse cx="74" cy="56" rx="38" ry="18" fill="#fff" opacity="0.28" transform="rotate(-28 74 56)" />
          </svg>
        </div>
      </div>
    </div>
  )
}

/* The reference's divider: a hairline with a small step in it, drawn in when it scrolls into view */
export function NotchLine({ light = false }) {
  const [ref, inView] = useInView()
  return (
    <svg
      ref={ref}
      viewBox="0 0 1000 14"
      preserveAspectRatio="none"
      className={`notch-line mt-6 block h-3.5 w-full ${inView ? 'is-in' : ''}`}
      aria-hidden="true"
    >
      <path
        d="M0 13 H420 L432 1 H1000"
        pathLength="1"
        fill="none"
        stroke={light ? 'rgba(255,255,255,0.28)' : 'rgba(2,19,41,0.18)'}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/* Eyebrow, typed title, drawn divider and an optional note on the right */
export function SectionTitle({ eyebrow, title, note, light = false }) {
  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
        <div className="max-w-3xl">
          <p className={`text-[13px] font-semibold tracking-[0.14em] uppercase ${light ? 'text-[#e6cf94]' : 'text-[#96711e]'}`}>
            {eyebrow}
          </p>
          <TypeReveal
            as="h2"
            light={light}
            text={title}
            className={`mt-3 block text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] font-medium tracking-[-0.035em] ${
              light ? 'text-white' : 'text-[#021329]'
            }`}
          />
        </div>
        {note && (
          <Reveal delay={200} className="md:max-w-xs">
            <p className={`text-[15px] leading-relaxed ${light ? 'text-white/80' : 'text-slate-600'}`}>{note}</p>
          </Reveal>
        )}
      </div>
      <NotchLine light={light} />
    </div>
  )
}

const ease = (t) => t * t * (3 - 2 * t)

/* A navy rounded panel set into the white page; it grows into place as it scrolls in */
function NavyPanel({ id, children }) {
  const outer = useRef(null)
  const inner = useRef(null)
  useScrollFrame(outer, (rect, vh) => {
    const e = ease(clamp01((vh - rect.top) / (vh * 0.75)))
    inner.current.style.transform = `translate3d(0, ${(1 - e) * 60}px, 0) scale(${0.92 + e * 0.08})`
  })
  return (
    <section id={id} ref={outer} className="scroll-mt-20 px-3 py-6 sm:px-5">
      <div
        ref={inner}
        className="relative mx-auto max-w-[1400px] origin-top overflow-hidden rounded-[28px] bg-[#021329] text-white will-change-transform sm:rounded-[40px]"
        style={{ transform: 'translate3d(0, 60px, 0) scale(0.92)' }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_0%,rgba(185,143,50,0.16),transparent)]" />
        {children}
      </div>
    </section>
  )
}

/* Small tab above a card, like the reference's "/ 01 •" folder tabs */
function Tab({ n, light = false }) {
  return (
    <span
      className={`absolute -top-7 left-0 flex h-7 items-center gap-2 rounded-t-lg px-3 text-[12px] font-medium ${
        light ? 'bg-white/15 text-white' : 'bg-[#efe3c4] text-[#7a5a14]'
      }`}
    >
      / {String(n).padStart(2, '0')}
      <span className="size-1 rounded-full bg-current" />
    </span>
  )
}

/* ---------- 1 · What you get (navy panel, cards rise one after another) ---------- */
const offers = [
  {
    photo: 'class',
    title: 'YABN Academy',
    text: 'Practical courses that take you from an idea to your first paying customer.',
    cta: 'Join the Academy',
    role: 'Student',
  },
  {
    photo: 'story',
    title: 'Business Growth',
    text: '1-on-1 consultation to fix sales, pricing, marketing and the systems behind them.',
    cta: 'Book a consultation',
    role: 'Business owner',
  },
  {
    photo: 'yabn-summit',
    title: 'Founder Network',
    text: 'Mentors, partners and founders who open doors for each other.',
    cta: 'Join the network',
    role: 'Partner / Mentor',
  },
]

export function Offer() {
  return (
    <NavyPanel id="offer">
      <GoldMark className="absolute -top-10 -right-10 hidden w-56 opacity-95 lg:block xl:w-64" />
      <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
        <div className="lg:pr-56">
          <SectionTitle light eyebrow="What YABN gives you" title="Learn it. [Build] it. Grow it." />
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-5">
          {offers.map((o, i) => (
            <Reveal key={o.title} delay={i * 160} className="from-low relative">
              <Tab n={i + 1} />
              <article className="flex h-full flex-col rounded-2xl rounded-tl-none bg-white p-4 text-[#021329] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
                <div className="overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={`/img/${o.photo}-800.webp`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 px-1 text-xl font-medium tracking-tight">{o.title}</h3>
                <p className="mt-2 px-1 text-[15px] leading-relaxed text-slate-600">{o.text}</p>
                <div className="mt-auto flex items-center justify-between gap-3 px-1 pt-6">
                  <button
                    type="button"
                    onClick={() => applyAs(o.role)}
                    className="rounded-full bg-slate-100 px-4 py-2 text-[13px] font-medium transition-colors hover:bg-[#021329] hover:text-white"
                  >
                    {o.cta}
                  </button>
                  <span className="grid size-9 place-items-center rounded-full bg-[#f5ecd7] text-[#7a5a14]">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </NavyPanel>
  )
}

/* ---------- 2 · Pick your path (light; the photo swaps with the open row) ---------- */
const paths = [
  {
    who: 'Student',
    line: 'Learn the business basics before you spend a single rupee.',
    photo: 'class',
    cta: 'Apply as a student',
  },
  {
    who: 'New founder',
    line: 'Validate, price and launch your first offer in 90 days with Mission 100.',
    photo: 'work',
    cta: 'Apply as a founder',
  },
  {
    who: 'Business owner',
    line: 'Fix sales, margins and systems so growth stops depending on you alone.',
    photo: 'shop',
    cta: 'Apply as an owner',
  },
  {
    who: 'Partner / Mentor',
    line: 'Mentor ambitious founders and build ventures with the YABN network.',
    photo: 'connect',
    cta: 'Apply as a partner',
  },
  {
    who: 'Internship',
    line: 'Work on live businesses with a stipend and weekly reviews by Yasir Ali.',
    photo: 'yabn-workshop',
    cta: 'Apply for internship',
  },
]

export function Paths() {
  const [open, setOpen] = useState(0)
  return (
    <section id="paths" className="scroll-mt-20 bg-[radial-gradient(60%_50%_at_100%_0%,#f8f1e1,transparent),radial-gradient(50%_40%_at_0%_100%,#eef2f8,transparent)] py-24 sm:py-32">
      <Shell>
        <SectionTitle
          eyebrow="Find your path"
          title="Where are you [today]?"
          note="Choose the one that fits. Each path starts with a short application and a call."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal className="relative hidden lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[28px] bg-slate-100">
              {paths.map((p, i) => (
                <img
                  key={p.who}
                  src={`/img/${p.photo}-800.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition duration-700 ease-out ${
                    i === open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#021329]/80 to-transparent p-7 pt-24">
                <p className="text-[13px] font-semibold tracking-[0.14em] text-[#e6cf94] uppercase">Path {open + 1} of 5</p>
                <p className="mt-1 text-2xl font-medium tracking-tight text-white">{paths[open].who}</p>
              </div>
            </div>
          </Reveal>

          <ul className="border-t border-slate-200">
            {paths.map((p, i) => {
              const on = i === open
              return (
                <Reveal as="li" key={p.who} delay={i * 90} className="border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-expanded={on}
                    className="group flex w-full items-center gap-5 py-6 text-left"
                  >
                    <span className={`text-[13px] font-medium tabular-nums ${on ? 'text-[#96711e]' : 'text-slate-500'}`}>
                      / {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`flex-1 text-[clamp(1.4rem,2.4vw,1.9rem)] tracking-tight transition-colors ${
                        on ? 'text-[#021329]' : 'text-slate-500 group-hover:text-[#021329]'
                      }`}
                    >
                      {p.who}
                    </span>
                    <Plus className={`size-5 text-[#021329] transition duration-300 ${on ? 'rotate-45' : ''}`} strokeWidth={1.6} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-5 pb-7 pl-12 sm:flex-row sm:items-center sm:justify-between">
                        <p className="max-w-md text-[16px] leading-relaxed text-slate-700">{p.line}</p>
                        <button
                          type="button"
                          onClick={() => applyAs(p.who)}
                          className="group/b inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#021329] px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#0b2a52] sm:self-auto"
                        >
                          {p.cta}
                          <ArrowRight className="size-4 text-[#dcc17b] transition-transform group-hover/b:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </Shell>
    </section>
  )
}

/* ---------- 3 · Why YABN (navy panel, stat tiles slide in from the right) ---------- */
function StatTile({ to, decimals = 0, suffix = '', label, text, delay }) {
  const [ref, inView] = useInView()
  const val = useCountUp(to, inView, 1800, decimals)
  return (
    <Reveal delay={delay} className="from-right">
      <div ref={ref} className="h-full rounded-2xl bg-white/[0.07] p-6 ring-1 ring-white/10">
        <p className="text-[clamp(2rem,3.4vw,2.8rem)] leading-none font-medium tracking-tight tabular-nums">
          {decimals ? val.toFixed(decimals) : val.toLocaleString('en-IN')}
          <span className="text-[#e6cf94]">{suffix}</span>
        </p>
        <p className="mt-4 text-[15px] font-medium text-white">{label}</p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-white/70">{text}</p>
      </div>
    </Reveal>
  )
}

export function WhyUs() {
  return (
    <NavyPanel id="why">
      <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
        <SectionTitle
          light
          eyebrow="Proof, not promises"
          title="Why founders choose [YABN]"
          note="A decade of disciplined, practical teaching, now pointed at building businesses."
        />
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile delay={0} to={80000} suffix="+" label="Students mentored" text="At Yasir Ali Classes, Aligarh." />
          <StatTile delay={120} to={10} suffix="+" label="Years of teaching" text="Concepts first, then practice." />
          <StatTile delay={240} to={4.9} decimals={1} suffix="★" label="Google rating" text="Trusted by learners and parents." />
          <StatTile delay={360} to={90} label="Days to launch" text="The Mission 100 founder program." />
        </div>
        <Reveal delay={300}>
          <button
            type="button"
            onClick={() => applyAs('New founder')}
            className="group mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#B98F32] via-[#d6b25c] to-[#B98F32] py-4 text-[15px] font-semibold text-[#021329] transition hover:brightness-105"
          >
            Apply now. It takes 60 seconds
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </NavyPanel>
  )
}

/* ---------- 4 · Mission 100 (light, phase cards rise in sequence) ---------- */
const phases = [
  { days: 'Days 1–30', title: 'Foundation', text: 'Mindset, idea selection and talking to real customers.' },
  { days: 'Days 31–60', title: 'Build', text: 'Offer, pricing, branding and your first sales conversations.' },
  { days: 'Days 61–90', title: 'Launch', text: 'Go to market, track results and plan your next stage.' },
]

export function Mission() {
  return (
    <section id="mission" className="scroll-mt-20 bg-[radial-gradient(55%_45%_at_0%_0%,#eef2f8,transparent),radial-gradient(50%_50%_at_100%_100%,#f8f1e1,transparent)] py-24 sm:py-32">
      <Shell>
        <SectionTitle
          eyebrow="Mission 100 · Har ghar se ek entrepreneur"
          title="100 founders. 90 days. [One launch]."
          note="A guided program with mentor check-ins at every step, from idea to market."
        />
        <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {phases.map((p, i) => (
            <Reveal key={p.title} delay={i * 150} className="from-low relative">
              <Tab n={i + 1} />
              <div className="h-full rounded-2xl rounded-tl-none bg-white p-6 shadow-[0_20px_50px_-30px_rgba(2,19,41,0.35)] ring-1 ring-slate-200/70">
                <p className="text-[13px] font-semibold tracking-wide text-[#96711e]">{p.days}</p>
                <h3 className="mt-6 text-2xl font-medium tracking-tight text-[#021329]">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{p.text}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={450} className="from-low relative">
            <Tab n={4} />
            <div className="flex h-full flex-col rounded-2xl rounded-tl-none bg-[#021329] p-6 text-white">
              <p className="text-[13px] font-semibold tracking-wide text-[#e6cf94]">Seats are limited</p>
              <h3 className="mt-6 text-2xl font-medium tracking-tight">Be one of the 100.</h3>
              <button
                type="button"
                onClick={() => applyAs('New founder')}
                className="group mt-auto inline-flex items-center justify-between gap-2 rounded-full bg-white py-2.5 pr-2.5 pl-5 text-[14px] font-medium text-[#021329] transition-colors hover:bg-[#f5ecd7]"
              >
                Apply to Mission 100
                <span className="grid size-8 place-items-center rounded-full bg-[#021329] text-white">
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            </div>
          </Reveal>
        </div>
        <p className="mt-6 text-[13px] text-slate-500">
          Mission 100 is a training and guidance program. It does not promise income or funding.
        </p>
      </Shell>
    </section>
  )
}

/* ---------- 5 · Mentor (light, one card) ---------- */
export function Mentor() {
  const [card, shown] = useInView()

  return (
    <section className="bg-white pb-24 sm:pb-32">
      <Shell>
        <SectionTitle eyebrow="Your mentor" title="Learn from a [teacher]." />
        <div
          ref={card}
          className="relative mt-14 grid overflow-hidden rounded-[28px] bg-gradient-to-br from-[#f6f1e4] via-[#faf8f2] to-[#eef2f8] md:grid-cols-[1fr_1.1fr] sm:rounded-[36px]"
        >
          <div className="relative min-h-[340px] md:min-h-[460px]">
            <img
              src="/img/founder-cutout-640.webp"
              alt="Yasir Ali, founder of YABN"
              loading="lazy"
              decoding="async"
              className={`absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom transition duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] [mask-image:linear-gradient(to_bottom,black_75%,transparent)] ${
                shown ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            />
          </div>
          <div className="relative flex flex-col justify-center px-7 pt-4 pb-10 sm:px-10 md:py-14 md:pr-14">
            <p className="text-[13px] font-semibold tracking-[0.14em] text-[#96711e] uppercase">Founder, YABN</p>
            <h3 className="mt-3 text-[clamp(2rem,3.5vw,2.8rem)] leading-none font-medium tracking-tight text-[#021329]">
              {founder.name}
            </h3>
            <p className="mt-5 font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug text-[#96711e] italic">
              &ldquo;{founder.motto}&rdquo;
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {['Educator of the Year 2023', 'Founder, Yasir Ali Classes', '80,000+ students mentored'].map((t, i) => (
                <li
                  key={t}
                  className={`rounded-full bg-white px-4 py-2 text-[14px] text-[#021329] ring-1 ring-slate-200 transition duration-700 ${
                    shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${400 + i * 120}ms` }}
                >
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-1.5 self-start text-[15px] font-medium text-[#021329] underline decoration-[#dcc17b] decoration-2 underline-offset-[6px] hover:text-[#96711e]"
            >
              Read his story
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </Shell>
    </section>
  )
}
