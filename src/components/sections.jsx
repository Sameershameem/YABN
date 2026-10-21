import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Handshake,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { founder } from '../data/content'
import { useCountUp, useInView } from './hooks'
import { Container, Heading, Kicker, Photo, Pill, Reveal, UnderLink } from './ui'

/* ---------- Story: photo with frosted stats card, copy, big numbers ---------- */
function Stat({ to, suffix = '', label }) {
  const [ref, inView] = useInView()
  const val = useCountUp(to, inView)
  return (
    <div ref={ref}>
      <p className="text-[clamp(2.4rem,4.5vw,3.25rem)] font-extrabold leading-none tracking-tight text-[#021329] tabular-nums">
        {val}
        {suffix}
      </p>
      <p className="mt-2.5 text-xs sm:text-[13px] font-medium text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  )
}

export function Story({ id = 'story', title, text, link }) {
  return (
    <section id={id} className="relative overflow-hidden bg-[#ffffff] py-20 sm:py-28 border-t border-slate-100">
      {/* Subtle Architectural Grid Lines */}
      <div className="absolute inset-0 max-w-[1320px] mx-auto pointer-events-none -z-10 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8">
        <div className="border-r border-slate-100 h-full" />
        <div className="border-r border-slate-100 h-full" />
        <div className="border-r border-slate-100 h-full" />
        <div className="border-r border-slate-100 h-full" />
        <div className="border-r border-slate-100 h-full hidden sm:block" />
        <div className="border-r border-slate-100 h-full hidden sm:block" />
        <div className="border-r border-slate-100 h-full hidden lg:block" />
        <div className="border-r border-slate-100 h-full hidden lg:block" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1.1fr] lg:gap-16 items-center">
          <Reveal className="relative aspect-[4/3.2] overflow-hidden rounded-3xl border border-slate-200/90 shadow-xl sm:aspect-[4/3]">
            <Photo name="yabn-boardroom" alt="YABN founders collaborating in modern executive boardroom" />
            
            {/* Mission 100 Floating Glass Badge */}
            <div className="absolute bottom-5 left-5 rounded-2xl bg-[#021329]/90 p-5 text-white ring-1 ring-white/20 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#dcc17b]">
                <Target className="size-3.5" />
                <span>Mission 100 Accelerator</span>
              </div>
              <div className="mt-3 flex gap-8">
                <div>
                  <p className="text-2xl font-black text-white">100</p>
                  <p className="mt-0.5 text-[11px] font-medium text-white/70 uppercase">Entrepreneurs</p>
                </div>
                <div className="border-l border-white/15 pl-6">
                  <p className="text-2xl font-black text-[#dcc17b]">90</p>
                  <p className="mt-0.5 text-[11px] font-medium text-white/70 uppercase">Days Sprint</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col justify-between gap-10">
            <Reveal delay={100}>
              <Kicker>The YABN Philosophy</Kicker>
              <Heading className="mt-4">{title}</Heading>
              <p className="mt-4 max-w-lg text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                {text}
              </p>
              {link && (
                <div className="mt-6">
                  <UnderLink to={link.to}>{link.label}</UnderLink>
                </div>
              )}
            </Reveal>

            <Reveal delay={200} className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
              <Stat to={6} label="Academy Programs" />
              <Stat to={6} label="Growth Services" />
              <Stat to={3} label="Scale Engines" />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ---------- Marquee of YABN pillars ---------- */
const pillars = [
  [GraduationCap, 'YABN Academy'],
  [TrendingUp, 'Business Growth'],
  [Handshake, 'Business Network'],
  [Target, 'Mission 100'],
  [BookOpen, 'Growth Book'],
  [Sparkles, 'Har Ghar Se Ek Entrepreneur'],
]

export function Marquee() {
  return (
    <div
      className="overflow-hidden border-y border-slate-200/80 bg-[#ffffff] py-6 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-14 pr-14">
        {[...pillars, ...pillars].map(([Icon, label], i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-base sm:text-lg font-bold tracking-tight whitespace-nowrap text-[#021329]/80 transition-colors hover:text-[#021329]"
          >
            <Icon className="size-5 text-[#96711e]" strokeWidth={1.8} />
            <span>{label}</span>
            <span className="text-slate-300 ml-4 font-light">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- Approach: numbered rows, the active one fills deep luxury navy ---------- */
export function Approach({ title, text, items, cta }) {
  const [active, setActive] = useState(0)
  return (
    <section className="bg-[#fafafa] py-20 sm:py-28 border-t border-slate-100">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <Kicker>Framework & Methodology</Kicker>
            <Heading className="mt-3">{title}</Heading>
          </Reveal>
          <Reveal delay={100} className="max-w-md">
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-normal">{text}</p>
            {cta && (
              <Pill to={cta.to} variant="gold" size="sm" className="mt-5">
                {cta.label}
              </Pill>
            )}
          </Reveal>
        </div>

        <ol className="mt-12 sm:mt-16 space-y-3">
          {items.map((it, i) => {
            const on = active === i
            return (
              <Reveal as="li" key={it.title} delay={i * 60}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={on}
                  className={`w-full rounded-2xl p-5 sm:p-6 text-left transition-all duration-300 border ${
                    on
                      ? 'bg-[#021329] text-white border-[#021329] shadow-lg shadow-[#021329]/15'
                      : 'bg-white text-[#021329] border-slate-200 hover:border-[#B98F32]/50'
                  }`}
                >
                  <span className="flex items-baseline gap-6 sm:gap-10">
                    <span
                      className={`text-sm sm:text-base font-mono font-bold tabular-nums ${
                        on ? 'text-[#dcc17b]' : 'text-slate-400'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span className="block text-lg sm:text-xl font-bold tracking-tight">{it.title}</span>
                      <span
                        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                          on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-2xl pt-2 text-sm sm:text-[15px] leading-relaxed text-white/80 font-normal">
                            {it.text}
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              </Reveal>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}

/* ---------- Programs Carousel with luxury navy & white styling ---------- */
function Rings() {
  return (
    <svg viewBox="0 0 200 120" className="absolute -top-6 right-0 w-[78%] opacity-20 pointer-events-none" aria-hidden="true">
      {[18, 30, 42, 54, 66, 78].map((r) => (
        <circle key={r} cx="140" cy="40" r={r} fill="none" stroke="currentColor" strokeWidth="0.7" />
      ))}
      {[18, 30, 42, 54].map((r) => (
        <circle key={`b${r}`} cx="70" cy="34" r={r} fill="none" stroke="currentColor" strokeWidth="0.7" />
      ))}
    </svg>
  )
}

export function ProgramsCarousel({ title, text, cta, programs }) {
  const track = useRef(null)
  const bar = useRef(null)
  const raf = useRef(0)

  const sync = useCallback(() => {
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const el = track.current
      if (!el || !bar.current) return
      const max = el.scrollWidth - el.clientWidth
      const p = max > 0 ? el.scrollLeft / max : 0
      bar.current.style.transform = `scaleX(${0.18 + p * 0.82})`
    })
  }, [])

  useEffect(() => {
    sync()
    window.addEventListener('resize', sync)
    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  const go = (dir) => {
    const el = track.current
    const card = el.querySelector('[data-card]')
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // Visual card styles
  const cardStyles = [
    'bg-[#021329] text-white border border-white/10 shadow-lg',
    'bg-white text-[#021329] border border-slate-200/90 shadow-md',
    'bg-[#0a1c33] text-white border border-white/10 shadow-lg',
  ]

  // Photo cards interspersed
  const items = []
  programs.forEach((p, i) => {
    items.push({ type: 'card', ...p, styleCls: cardStyles[i % cardStyles.length] })
    if (i === 1) items.push({ type: 'photo', name: 'yabn-workshop', alt: 'YABN practical business workshop' })
    if (i === 3) items.push({ type: 'photo', name: 'yabn-summit', alt: 'YABN founder network summit' })
  })

  return (
    <section id="academy" className="bg-[#ffffff] py-20 sm:py-28 border-t border-slate-100">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
          <Reveal>
            <Kicker>Structured Pedagogy</Kicker>
            <Heading className="mt-3 max-w-lg">{title}</Heading>
          </Reveal>
          <Reveal delay={100} className="max-w-md">
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-normal">{text}</p>
            {cta && (
              <Pill to={cta.to} variant="gold" size="sm" className="mt-5">
                {cta.label}
              </Pill>
            )}
          </Reveal>
        </div>
      </Container>

      <Reveal delay={150}>
        <div
          ref={track}
          onScroll={sync}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth scroll-px-5 px-5 sm:scroll-px-8 sm:px-8 lg:px-[max(2rem,calc((100vw-1320px)/2+2rem))]"
        >
          {items.map((it, i) =>
            it.type === 'card' ? (
              <article
                key={i}
                data-card
                className={`relative flex h-[350px] w-[80vw] max-w-[340px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 ${it.styleCls}`}
              >
                <Rings />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-black/10 ring-1 ring-current/20">
                    PROGRAM {String(it.n).padStart(2, '0')}
                  </span>
                  <span className="size-2 rounded-full bg-[#B98F32]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-snug tracking-tight">{it.title}</h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed opacity-85 font-normal">{it.text}</p>
                </div>
              </article>
            ) : (
              <div
                key={i}
                className="h-[350px] w-[86vw] max-w-[480px] shrink-0 snap-start overflow-hidden rounded-3xl border border-slate-200/90 shadow-md bg-slate-100"
              >
                <Photo name={it.name} alt={it.alt} />
              </div>
            ),
          )}
          <span className="w-px shrink-0" aria-hidden="true" />
        </div>
      </Reveal>

      <Container className="mt-10 flex items-center gap-6">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            ref={bar}
            className="h-full origin-left bg-[#B98F32] transition-transform duration-150 ease-out"
            style={{ transform: 'scaleX(0.18)' }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="grid size-11 place-items-center rounded-full bg-[#021329] text-white transition-all hover:bg-[#B98F32] active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="grid size-11 place-items-center rounded-full bg-[#021329] text-white transition-all hover:bg-[#B98F32] active:scale-95 shadow-sm"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </Container>
    </section>
  )
}

/* ---------- Strengths: deep navy card with staggered frosted cards ---------- */
export function Strengths({ id, kicker = 'Why YABN', title, items }) {
  const offsets = ['lg:mt-0', 'lg:mt-12', 'lg:mt-24']
  return (
    <section id={id} className="px-3 py-6 sm:px-5">
      <div className="relative isolate overflow-hidden rounded-[32px] bg-[#021329] text-white border border-white/10 shadow-2xl">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(185,143,50,0.15),transparent)] pointer-events-none" />

        <Container className="py-20 sm:py-28">
          <Reveal className="text-center max-w-2xl mx-auto">
            <div className="flex justify-center">
              <Kicker light>{kicker}</Kicker>
            </div>
            <Heading light className="mt-4">
              {title}
            </Heading>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3 lg:gap-6">
            {items.map((t, i) => (
              <Reveal key={t} delay={i * 120} className={offsets[i % 3]}>
                <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-md transition-all duration-300 hover:border-[#B98F32]/50 hover:bg-white/[0.1] shadow-lg">
                  <div className="size-9 rounded-xl bg-white/10 text-[#dcc17b] flex items-center justify-center font-bold text-xs ring-1 ring-white/15 mb-4">
                    0{i + 1}
                  </div>
                  <p className="text-base sm:text-lg leading-snug font-semibold text-white/95">{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}

/* ---------- Founder card ---------- */
export function Founder() {
  return (
    <section className="bg-[#fafafa] py-20 sm:py-28 border-t border-slate-100">
      <Container>
        <Reveal className="text-center max-w-xl mx-auto">
          <Kicker>Executive Leadership</Kicker>
          <Heading className="mt-3">Mentorship from Real Operators</Heading>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {/* Yasir Ali Card */}
          <Reveal className="h-full">
            <article className="h-full rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-5">
                  <img
                    src="/img/founder-800.webp"
                    alt="Yasir Ali, founder of YABN"
                    width="88"
                    height="88"
                    loading="lazy"
                    decoding="async"
                    className="size-22 shrink-0 rounded-2xl bg-slate-100 object-cover object-top border border-slate-200"
                  />
                  <div>
                    <h3 className="text-2xl font-extrabold text-[#021329]">{founder.name}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#96711e]">
                      Founder, YABN &amp; Yasir Ali Classes
                    </p>
                    <p className="mt-2.5 border-l-2 border-[#B98F32] pl-3 text-xs sm:text-[13px] font-medium text-slate-700 italic font-serif">
                      &ldquo;{founder.motto}&rdquo;
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {founder.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-[#96711e] mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to="/about#founder"
                  className="text-xs font-bold uppercase tracking-wider text-[#021329] hover:text-[#96711e] transition-colors"
                >
                  Read His Full Journey →
                </Link>
                <span className="text-xs font-mono text-slate-400">80K+ Mentored</span>
              </div>
            </article>
          </Reveal>

          {/* Become a Mentor / Partner Card */}
          <Reveal delay={120} className="h-full">
            <article className="h-full flex flex-col justify-between rounded-3xl border border-white/10 bg-[#021329] p-7 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 size-48 rounded-full bg-[#B98F32]/15 blur-2xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#dcc17b] ring-1 ring-white/15">
                  <Sparkles className="size-3" />
                  <span>Join the Mentor Council</span>
                </div>

                <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Share Your Expertise with Ambitious Founders
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-white/80 font-normal">
                  Give back to the entrepreneurial ecosystem. Advise curated startups, conduct masterclasses, and build
                  strategic ventures alongside Yasir Ali.
                </p>

                <div className="mt-6 space-y-2 text-xs text-white/70">
                  <p>• Lead exclusive business masterclasses</p>
                  <p>• Mentor selected Mission 100 founders</p>
                  <p>• Co-venture and expansion partnership access</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Pill to="/contact?topic=Mentor+%2F+partner#form" variant="gold" className="self-start">
                  Apply as a Mentor
                </Pill>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/* ---------- Let's Connect banner ---------- */
export function Connect({ title = "Let's Connect" }) {
  return (
    <section className="bg-[#ffffff] px-4 pb-16 sm:px-8 sm:pb-24">
      <Reveal className="relative isolate mx-auto flex h-[320px] max-w-[1320px] flex-col items-center justify-center overflow-hidden rounded-3xl text-center text-white sm:h-[400px] border border-slate-200/90 shadow-2xl">
        <Photo name="yabn-summit" alt="YABN founders networking on executive terrace" className="absolute inset-0 -z-10 brightness-[0.7]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#021329] via-[#021329]/70 to-[#021329]/40" />

        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#dcc17b] ring-1 ring-white/20 backdrop-blur-md mb-4">
          Direct Access
        </div>

        <h2 className="text-[clamp(2.4rem,5vw,3.8rem)] font-extrabold leading-none tracking-tight text-white">
          {title}
        </h2>

        <p className="mt-4 max-w-lg text-sm sm:text-base text-white/85 font-normal px-4">
          Every inquiry is reviewed directly by Yasir Ali and senior business advisors.
        </p>

        <Pill to="/contact" variant="gold" className="mt-7 shadow-lg shadow-[#B98F32]/30">
          Get in Touch Today
        </Pill>
      </Reveal>
    </section>
  )
}

/* ---------- Simple Service Grid ---------- */
export function ServiceGrid({ id, title, text, items }) {
  return (
    <section id={id} className="bg-[#fafafa] py-20 sm:py-28 border-t border-slate-100">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <Kicker>Executive Solutions</Kicker>
            <Heading className="mt-3 max-w-lg">{title}</Heading>
          </Reveal>
          {text && (
            <Reveal delay={100} className="max-w-md">
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-normal">{text}</p>
            </Reveal>
          )}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title: t, text: x }, i) => (
            <Reveal key={t} delay={(i % 3) * 80} className="h-full">
              <div className="h-full rounded-3xl border border-slate-200/90 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#B98F32]/50 hover:shadow-xl">
                {Icon && (
                  <div className="size-12 rounded-2xl bg-[#021329] text-[#dcc17b] flex items-center justify-center shadow-xs">
                    <Icon className="size-6 text-[#dcc17b]" strokeWidth={1.75} />
                  </div>
                )}
                <h3 className="mt-6 text-xl font-bold text-[#021329] tracking-tight">{t}</h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">{x}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
