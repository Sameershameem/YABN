import { ArrowUpRight, Award, MapPin } from 'lucide-react'
import { PageHero } from '../components/Hero'
import { useCountUp, useInView } from '../components/hooks'
import { Approach, Connect, Story, Strengths } from '../components/sections'
import { Container, Heading, Pill, Reveal } from '../components/ui'
import { approach, founder, howItWorks } from '../data/content'

function FounderStat({ value, suffix, label, decimals = 0 }) {
  const [ref, inView] = useInView()
  const val = useCountUp(value, inView, 1800, decimals)
  return (
    <div ref={ref}>
      <p className="text-[clamp(2rem,4.4vw,3rem)] leading-none tracking-[-0.03em] text-cocoa tabular-nums">
        {decimals ? val.toFixed(decimals) : val.toLocaleString('en-IN')}{suffix}
      </p>
      <p className="mt-2.5 text-[13px] text-ink-soft">{label}</p>
    </div>
  )
}

function FounderStory() {
  return (
    <section id="founder" className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[linear-gradient(160deg,var(--color-cream),var(--color-sand))]">
              <img
                src="/img/founder-800.webp"
                srcSet="/img/founder-800.webp 480w, /img/founder-1600.webp 960w"
                sizes="(min-width: 1024px) 480px, 100vw"
                alt="Portrait of Yasir Ali"
                width="960"
                height="960"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover mix-blend-multiply"
              />
              <div className="absolute bottom-5 left-5 flex max-w-[80%] items-start gap-3 rounded-2xl bg-ink/80 p-4 text-white">
                <Award className="mt-0.5 size-5 shrink-0 text-bronze-300" strokeWidth={1.5} />
                <p className="text-[13px] leading-snug">{founder.award}</p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col justify-between gap-12">
            <Reveal delay={100}>
              <p className="text-[13px] text-ink-soft">Founder</p>
              <Heading className="mt-3">{founder.name}</Heading>
              <p className="mt-2 text-[15px] text-bronze-600">{founder.role}</p>
              <div className="mt-6 max-w-lg space-y-4 text-[15px] leading-relaxed text-ink-soft">
                {founder.bio.map((p) => <p key={p}>{p}</p>)}
              </div>
              <blockquote className="mt-7 border-l-2 border-bronze-400 pl-4 text-lg">&ldquo;{founder.motto}&rdquo;</blockquote>
            </Reveal>
            <Reveal delay={180} className="grid grid-cols-3 gap-4">
              {founder.stats.map((s) => <FounderStat key={s.label} {...s} />)}
            </Reveal>
          </div>
        </div>

        <Reveal delay={100} className="mt-14 grid gap-4 rounded-2xl bg-cream p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-bronze-500" strokeWidth={1.5} />
            <div>
              <p className="text-[15px]">{founder.campus}</p>
              <p className="mt-1 text-[13px] text-ink-soft">Live online for students in {founder.online.join(', ')} and beyond.</p>
            </div>
          </div>
          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {founder.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-paper px-4 text-[13px] ring-1 ring-line transition-colors hover:ring-bronze-400"
                >
                  {l.label} <ArrowUpRight className="size-3.5" />
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
        photo="story"
        alt="A team collaborating around a conference table"
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
      <Strengths kicker="How we work" title="Learn. Build. Grow." items={howItWorks.map((s) => `${s.title}: ${s.text}`)} />
      <Approach
        title={<>Real Stories Only.<br /><em>Built on Trust.</em></>}
        text="We never invent testimonials, results or partner logos. Every story we share is verified and published with permission."
        items={approach}
      />
      <section className="bg-paper pb-4 text-center">
        <Pill to="/contact?topic=Mentor+%2F+partner#form" variant="cocoa">Become a mentor</Pill>
      </section>
      <Connect />
    </>
  )
}
