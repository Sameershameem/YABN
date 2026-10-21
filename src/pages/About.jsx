import { ArrowUpRight, Award, MapPin } from 'lucide-react'
import { PageHero } from '../components/Hero'
import { useCountUp, useInView } from '../components/hooks'
import { Approach, Connect, Story, Strengths } from '../components/sections'
import { Container, Heading, Kicker, Pill, Reveal } from '../components/ui'
import { approach, founder, howItWorks } from '../data/content'

function FounderStat({ value, suffix, label, decimals = 0 }) {
  const [ref, inView] = useInView()
  const val = useCountUp(value, inView, 1800, decimals)
  return (
    <div ref={ref}>
      <p className="text-[clamp(2.2rem,4.4vw,3.2rem)] font-extrabold leading-none tracking-tight text-[#021329] tabular-nums">
        {decimals ? val.toFixed(decimals) : val.toLocaleString('en-IN')}
        {suffix}
      </p>
      <p className="mt-2 text-xs sm:text-[13px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
    </div>
  )
}

function FounderStory() {
  return (
    <section id="founder" className="bg-[#ffffff] py-20 sm:py-28 border-t border-slate-100">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.1fr] lg:gap-16 items-center">
          <Reveal className="relative">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200/90 shadow-xl bg-gradient-to-br from-slate-100 to-slate-200">
              <img
                src="/img/founder-800.webp"
                srcSet="/img/founder-800.webp 480w, /img/founder-1600.webp 960w"
                sizes="(min-width: 1024px) 480px, 100vw"
                alt="Portrait of Yasir Ali"
                width="960"
                height="960"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-start gap-3 rounded-2xl bg-[#021329]/90 p-4 text-white ring-1 ring-white/15 backdrop-blur-md shadow-2xl">
                <Award className="mt-0.5 size-5 shrink-0 text-[#dcc17b]" strokeWidth={1.75} />
                <p className="text-xs sm:text-[13px] leading-snug font-medium text-white/90">{founder.award}</p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col justify-between gap-10">
            <Reveal delay={100}>
              <Kicker>Chief Mentor & Founder</Kicker>
              <Heading className="mt-3">{founder.name}</Heading>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#96711e]">{founder.role}</p>

              <div className="mt-6 space-y-3.5 text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
                {founder.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <blockquote className="mt-6 border-l-2 border-[#B98F32] pl-4 text-base sm:text-lg font-serif italic text-slate-800">
                &ldquo;{founder.motto}&rdquo;
              </blockquote>
            </Reveal>

            <Reveal delay={180} className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              {founder.stats.map((s) => (
                <FounderStat key={s.label} {...s} />
              ))}
            </Reveal>
          </div>
        </div>

        <Reveal
          delay={100}
          className="mt-14 grid gap-5 rounded-3xl border border-slate-200/90 bg-[#fafafa] p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr] lg:items-center shadow-md"
        >
          <div className="flex items-start gap-3.5">
            <div className="size-10 rounded-xl bg-[#021329] text-[#dcc17b] flex items-center justify-center shrink-0">
              <MapPin className="size-5" />
            </div>
            <div>
              <p className="text-base font-bold text-[#021329]">{founder.campus}</p>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Live online consultation for founders in {founder.online.join(', ')} and globally.
              </p>
            </div>
          </div>
          <ul className="flex flex-wrap gap-2.5 lg:justify-end">
            {founder.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white px-4 text-xs font-bold text-[#021329] border border-slate-300 shadow-2xs transition-all hover:border-[#B98F32] hover:text-[#96711e]"
                >
                  <span>{l.label}</span>
                  <ArrowUpRight className="size-3.5 text-[#96711e]" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}

export default function About() {
  return (
    <>
      <PageHero
        photo="yabn-boardroom"
        alt="YABN founders and mentors in modern boardroom"
        kicker="About YABN"
        title="Har Ghar Se Ek Entrepreneur"
        text="We believe entrepreneurship should not be a privilege. With practical learning, honest guidance and the right network, anyone can build something of their own."
      />
      <FounderStory />
      <Story
        title="One Brand. Three Growth Engines. One Journey."
        text="YABN Academy teaches, Business Growth supports and the Business Network connects, so ideas turn into action and action turns into lasting businesses."
        link={{ to: '/services', label: 'See Our Services' }}
      />
      <Strengths
        kicker="How We Work"
        title="Learn. Build. Grow."
        items={howItWorks.map((s) => `${s.title}: ${s.text}`)}
      />
      <Approach
        title={
          <>
            Real Stories Only.
            <br />
            <em>Built on Trust.</em>
          </>
        }
        text="We never invent testimonials, results or partner logos. Every story we share is verified and published with permission."
        items={approach}
      />
      <section className="bg-[#fafafa] py-10 text-center border-t border-slate-100">
        <Pill to="/contact?topic=Mentor+%2F+partner#form" variant="gold">
          Apply to the Mentor Council
        </Pill>
      </section>
      <Connect />
    </>
  )
}
