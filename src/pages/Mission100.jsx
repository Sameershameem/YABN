import { useState } from 'react'
import { Check } from 'lucide-react'
import { PageHero } from '../components/Hero'
import { ApplyModal } from '../components/Interactive'
import { Approach, Connect } from '../components/sections'
import { Container, Heading, Kicker, Pill, Reveal } from '../components/ui'
import { useCountUp, useInView } from '../components/hooks'
import { missionFeatures, missionRoadmap } from '../data/content'

function Big({ to, label }) {
  const [ref, inView] = useInView()
  const val = useCountUp(to, inView)
  return (
    <div ref={ref}>
      <p className="text-[clamp(2.8rem,6vw,4rem)] font-extrabold leading-none tracking-tight text-[#021329] tabular-nums">
        {val}
      </p>
      <p className="mt-2.5 text-xs sm:text-[13px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
    </div>
  )
}

export default function Mission100() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <PageHero
        photo="yabn-summit"
        alt="YABN founders celebrating business milestones"
        kicker="Mission 100 Accelerator"
        title="100 Entrepreneurs in 90 Days"
        text="An intensive, execution-first deployment program to inspire, train, and guide the next generation of founders from first validation to market scale."
      />

      <section className="bg-[#ffffff] py-20 sm:py-28 border-t border-slate-100">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <Reveal>
              <Kicker>Cohort Sprint</Kicker>
              <Heading className="mt-3">
                One Shared <em>Mission.</em>
              </Heading>
              <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
                Students, aspiring founders, and early-stage entrepreneurs ready to commit dedicated hours each week to
                deploy validated revenue architecture.
              </p>
              <Pill type="button" onClick={() => setOpen(true)} variant="gold" className="mt-8">
                Apply to Mission 100 Cohort
              </Pill>
            </Reveal>

            <Reveal delay={100} className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 lg:border-t-0">
              <Big to={100} label="Entrepreneurs Target" />
              <Big to={90} label="Days Deployment" />
              <Big to={3} label="Structured Stages" />
            </Reveal>
          </div>

          <Reveal delay={150} as="ul" className="mt-16 grid gap-4 sm:grid-cols-2">
            {missionFeatures.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 rounded-2xl border border-slate-200/90 bg-[#fafafa] p-5 text-sm sm:text-[15px] text-[#021329] shadow-2xs font-medium"
              >
                <div className="size-5 rounded-full bg-[#fcf8ee] border border-[#B98F32]/40 text-[#96711e] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="size-3" strokeWidth={2.5} />
                </div>
                <span>{f}</span>
              </li>
            ))}
          </Reveal>

          <p className="mt-8 text-xs text-slate-400">
            * Mission 100 is an accelerator target and performance framework. Selection is based on grit, founder clarity,
            and commitment to execution.
          </p>
        </Container>
      </section>

      <Approach
        title={
          <>
            Ninety Days.
            <br />
            <em>Three Execution Stages.</em>
          </>
        }
        text="A transparent milestone roadmap with scheduled diagnostic reviews and weekly mentorship check-ins."
        items={missionRoadmap.map((r) => ({ title: `${r.title} · ${r.phase}`, text: r.text }))}
      />

      <Connect title="Ready to Scale Your Venture?" />
      {open && <ApplyModal onClose={() => setOpen(false)} />}
    </>
  )
}
