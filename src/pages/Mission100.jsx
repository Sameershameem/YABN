import { useState } from 'react'
import { Check } from 'lucide-react'
import { PageHero } from '../components/Hero'
import { ApplyModal } from '../components/Interactive'
import { Approach, Connect } from '../components/sections'
import { Container, Heading, Pill, Reveal } from '../components/ui'
import { useCountUp, useInView } from '../components/hooks'
import { missionFeatures, missionRoadmap } from '../data/content'

function Big({ to, label }) {
  const [ref, inView] = useInView()
  const val = useCountUp(to, inView)
  return (
    <div ref={ref}>
      <p className="text-[clamp(2.6rem,6vw,4rem)] leading-none tracking-[-0.03em] text-cocoa tabular-nums">{val}</p>
      <p className="mt-3 text-[13px] text-ink-soft">{label}</p>
    </div>
  )
}

export default function Mission100() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <PageHero
        photo="work"
        alt="An entrepreneur working on a laptop"
        kicker="Mission 100"
        title="100 Entrepreneurs in 90 Days"
        text="A focused program to inspire, train and guide the next generation of founders, from idea to launch."
      />

      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <Heading>One Shared <em>Mission.</em></Heading>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
                Students, aspiring founders and early-stage entrepreneurs ready to commit time each week and take consistent action.
              </p>
              <Pill type="button" onClick={() => setOpen(true)} variant="ink" className="mt-8">Apply to Mission 100</Pill>
            </Reveal>
            <Reveal delay={100} className="grid grid-cols-3 gap-4 self-end">
              <Big to={100} label="Entrepreneurs (target)" />
              <Big to={90} label="Days" />
              <Big to={3} label="Stages" />
            </Reveal>
          </div>
          <Reveal delay={150} as="ul" className="mt-16 grid gap-3 sm:grid-cols-2">
            {missionFeatures.map((f) => (
              <li key={f} className="flex gap-3 rounded-2xl bg-cream p-5 text-[15px]">
                <Check className="mt-0.5 size-4 shrink-0 text-bronze-500" /> {f}
              </li>
            ))}
          </Reveal>
          <p className="mt-6 text-[13px] text-ink-soft">Mission 100 is a target, not a completed achievement. Participation is not a promise of income or funding.</p>
        </Container>
      </section>

      <Approach
        title={<>Ninety Days.<br /><em>Three Stages.</em></>}
        text="A clear roadmap with events and mentorship check-ins along the way."
        items={missionRoadmap.map((r) => ({ title: `${r.title} · ${r.phase}`, text: r.text }))}
      />

      <Connect title="Ready to Apply?" />
      {open && <ApplyModal onClose={() => setOpen(false)} />}
    </>
  )
}
