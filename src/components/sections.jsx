import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Handshake, GraduationCap, Sparkles, Target, TrendingUp } from 'lucide-react'
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
      <p className="text-[clamp(2.4rem,5vw,3.25rem)] leading-none tracking-[-0.03em] text-cocoa tabular-nums">{val}{suffix}</p>
      <p className="mt-3 text-[13px] text-ink-soft">{label}</p>
    </div>
  )
}

export function Story({ id = 'story', title, text, link }) {
  return (
    <section id={id} className="relative overflow-hidden bg-paper py-20 sm:py-28">
      {/* soft cream swells, painted once, never animated */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_50%_at_20%_80%,var(--color-cream),transparent),radial-gradient(50%_45%_at_85%_70%,var(--color-cream),transparent)]" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal className="relative aspect-[4/4.3] overflow-hidden rounded-2xl sm:aspect-[4/3.6]">
            <Photo name="story" alt="A team collaborating around a conference table" />
            <div className="absolute bottom-5 left-5 rounded-2xl bg-black/35 p-5 text-white ring-1 ring-white/20 md:backdrop-blur-md">
              <p className="text-[15px]">Mission 100</p>
              <div className="mt-3 flex gap-8">
                <div><p className="text-2xl">100</p><p className="mt-1 text-xs text-white/80">Target</p></div>
                <div><p className="text-2xl">90</p><p className="mt-1 text-xs text-white/80">Days</p></div>
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col justify-between gap-14">
            <Reveal delay={100}>
              <Heading>{title}</Heading>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">{text}</p>
              {link && <div className="mt-8"><UnderLink to={link.to}>{link.label}</UnderLink></div>}
            </Reveal>
            <Reveal delay={200} className="grid grid-cols-3 gap-4">
              <Stat to={6} label="Academy programs" />
              <Stat to={6} label="Growth services" />
              <Stat to={3} label="Growth engines" />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ---------- Marquee of YABN pillars (in place of partner logos we do not have) ---------- */
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
    <div className="overflow-hidden border-y border-line bg-paper py-7 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-14 pr-14">
        {[...pillars, ...pillars].map(([Icon, label], i) => (
          <span key={i} className="flex items-center gap-2.5 text-lg font-semibold tracking-[-0.01em] whitespace-nowrap text-ink/55">
            <Icon className="size-5" strokeWidth={1.6} /> {label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- Approach: numbered rows, the active one fills slate blue ---------- */
export function Approach({ title, text, items, cta }) {
  const [active, setActive] = useState(0)
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal><Heading>{title}</Heading></Reveal>
          <Reveal delay={100} className="max-w-xs">
            <p className="text-[15px] leading-relaxed text-ink-soft">{text}</p>
            {cta && <Pill to={cta.to} variant="cocoa" size="sm" className="mt-5">{cta.label}</Pill>}
          </Reveal>
        </div>
        <ol className="mt-12 sm:mt-16">
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
                  className={`w-full rounded-2xl px-5 text-left transition-colors duration-300 sm:px-6 ${on ? 'bg-mist text-white' : 'text-ink'}`}
                >
                  <span className={`flex items-baseline gap-6 border-b py-5 transition-colors sm:gap-14 ${on ? 'border-transparent' : 'border-line'}`}>
                    <span className={`text-sm tabular-nums ${on ? 'text-white/80' : 'text-mist'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1">
                      <span className="block text-lg sm:text-xl">{it.title}</span>
                      <span className={`grid transition-[grid-template-rows] duration-500 ease-out ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <span className="overflow-hidden">
                          <span className="block max-w-xl pt-2 text-[15px] text-white/85">{it.text}</span>
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

/* ---------- Programs carousel: native scroll-snap (smooth momentum on phones) ---------- */
const tones = [
  'bg-cocoa text-white',
  'bg-mist text-white',
  'bg-[#b08d63] text-white',
]

function Rings() {
  return (
    <svg viewBox="0 0 200 120" className="absolute -top-6 right-0 w-[78%] opacity-30" aria-hidden="true">
      {[18, 30, 42, 54, 66, 78].map((r) => <circle key={r} cx="140" cy="40" r={r} fill="none" stroke="currentColor" strokeWidth="0.7" />)}
      {[18, 30, 42, 54].map((r) => <circle key={`b${r}`} cx="70" cy="34" r={r} fill="none" stroke="currentColor" strokeWidth="0.7" />)}
    </svg>
  )
}

export function ProgramsCarousel({ title, text, cta, programs, photos }) {
  const track = useRef(null)
  const bar = useRef(null)
  const raf = useRef(0)

  // Progress bar is updated directly on the element, so scrolling never re-renders React
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
    const step = card ? card.getBoundingClientRect().width + 12 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // Interleave colour cards with photo cards, like the reference
  const items = []
  programs.forEach((p, i) => {
    items.push({ type: 'card', ...p, tone: tones[i % tones.length] })
    if (i % 2 === 0 && photos[i / 2]) items.push({ type: 'photo', ...photos[i / 2] })
  })

  return (
    <section id="academy" className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
          <Reveal><Heading className="max-w-md">{title}</Heading></Reveal>
          <Reveal delay={100} className="max-w-xs">
            <p className="text-[15px] leading-relaxed text-ink-soft">{text}</p>
            {cta && <Pill to={cta.to} variant="cocoa" size="sm" className="mt-5">{cta.label}</Pill>}
          </Reveal>
        </div>
      </Container>

      <Reveal delay={150}>
        <div
          ref={track}
          onScroll={sync}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth scroll-px-5 px-5 sm:scroll-px-8 sm:px-8 lg:px-[max(2rem,calc((100vw-1200px)/2+2rem))]"
        >
          {items.map((it, i) =>
            it.type === 'card' ? (
              <article key={i} data-card className={`relative flex h-[340px] w-[78vw] max-w-[330px] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl p-6 ${it.tone}`}>
                <Rings />
                <p className="absolute top-6 left-6 text-sm text-white/70 tabular-nums">{String(it.n).padStart(2, '0')}</p>
                <h3 className="relative text-xl leading-snug">{it.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/80">{it.text}</p>
              </article>
            ) : (
              <div key={i} className="h-[340px] w-[86vw] max-w-[480px] shrink-0 snap-start overflow-hidden rounded-2xl bg-sand">
                <Photo name={it.name} alt={it.alt} />
              </div>
            ),
          )}
          <span className="w-px shrink-0" aria-hidden="true" />
        </div>
      </Reveal>

      <Container className="mt-10 flex items-center gap-6">
        <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-line">
          <div ref={bar} className="h-full origin-left bg-cocoa transition-transform duration-150 ease-out" style={{ transform: 'scaleX(0.18)' }} />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous" className="grid size-11 place-items-center rounded-full bg-cocoa text-white transition-colors hover:bg-cocoa-soft">
            <ArrowLeft className="size-4" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next" className="grid size-11 place-items-center rounded-full bg-cocoa text-white transition-colors hover:bg-cocoa-soft">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </Container>
    </section>
  )
}

/* ---------- Strengths: deep blue wave with staggered frosted cards ---------- */
export function Strengths({ id, kicker = 'Why YABN', title, items }) {
  const offsets = ['lg:mt-0', 'lg:mt-16', 'lg:mt-32']
  return (
    <section id={id} className="px-3 py-3 sm:px-5">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-navy text-white">
        <Photo name="wave" alt="" className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/30 via-transparent to-navy/50" />
        <Container className="py-20 sm:py-28">
          <Reveal className="text-center">
            <div className="flex justify-center"><Kicker light>{kicker}</Kicker></div>
            <Heading light className="mt-4">{title}</Heading>
          </Reveal>
          <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3 lg:gap-6">
            {items.map((t, i) => (
              <Reveal key={t} delay={i * 120} className={offsets[i % 3]}>
                <div className="glass flex min-h-36 items-center rounded-2xl p-6 sm:p-7">
                  <p className="text-[17px] leading-snug">{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}

/* ---------- Founder card (only real people; no invented team) ---------- */
export function Founder() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <Reveal className="text-center"><Heading>Our Leadership</Heading></Reveal>
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
          <Reveal className="h-full">
            <article className="h-full rounded-2xl bg-cream p-6 sm:p-7">
              <div className="flex gap-5">
                <img
                  src="/img/founder-800.webp"
                  alt="Yasir Ali, founder of YABN"
                  width="96"
                  height="96"
                  loading="lazy"
                  decoding="async"
                  className="size-24 shrink-0 rounded-xl bg-white object-cover object-top"
                />
                <div>
                  <h3 className="text-xl">{founder.name}</h3>
                  <p className="mt-1 text-xs text-ink-soft">Founder, YABN &amp; Yasir Ali Classes</p>
                  <p className="mt-3 border-l-2 border-bronze-400 pl-3 text-[13px] font-medium">&ldquo;{founder.motto}&rdquo;</p>
                </div>
              </div>
              <ul className="mt-6 space-y-2 text-[13px] leading-relaxed text-ink-soft">
                {founder.highlights.map((h) => <li key={h}>• {h}</li>)}
              </ul>
              <Link to="/about#founder" className="mt-6 inline-block text-[13px] font-medium text-bronze-600 hover:text-ink">Read his story →</Link>
            </article>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <article className="flex h-full flex-col justify-between rounded-2xl bg-cocoa p-6 text-white sm:p-7">
              <div>
                <h3 className="text-xl">Become a mentor</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/75">
                  Share your experience with the next generation of founders. We are building our mentor and partner network.
                </p>
              </div>
              <Pill to="/contact?topic=Mentor+%2F+partner#form" variant="white" className="mt-8 self-start">Apply as a mentor</Pill>
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
    <section className="bg-paper px-5 pb-16 sm:px-8 sm:pb-24">
      <Reveal className="relative isolate mx-auto flex h-[300px] max-w-[1200px] flex-col items-center justify-center overflow-hidden rounded-2xl text-center text-white sm:h-[380px]">
        <Photo name="connect" alt="A person overlooking a city at sunset" className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-black/40" />
        <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] leading-none tracking-[-0.03em]">{title}</h2>
        <Pill to="/contact" variant="white" className="mt-6">Get in Touch</Pill>
      </Reveal>
    </section>
  )
}

/* ---------- Simple service cards ---------- */
export function ServiceGrid({ id, title, text, items }) {
  return (
    <section id={id} className="bg-cream py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal><Heading className="max-w-lg">{title}</Heading></Reveal>
          {text && <Reveal delay={100} className="max-w-xs"><p className="text-[15px] leading-relaxed text-ink-soft">{text}</p></Reveal>}
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title: t, text: x }, i) => (
            <Reveal key={t} delay={(i % 3) * 80} className="h-full">
              <div className="h-full rounded-2xl bg-paper p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                {Icon && <Icon className="size-6 text-bronze-500" strokeWidth={1.5} />}
                <h3 className="mt-6 text-lg">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{x}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
