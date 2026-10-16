import { PageHero } from '../components/Hero'
import { Assessment } from '../components/Interactive'
import { Connect, ProgramsCarousel, ServiceGrid, Strengths } from '../components/sections'
import { networkBenefits, programPhotos, programs, services } from '../data/content'

export default function Services() {
  return (
    <>
      <PageHero
        photo="class"
        alt="A trainer presenting to a group of learners"
        kicker="Our Services"
        title="Everything You Need to Grow"
        text="Learning, hands-on growth support and a trusted network, built around where you are today."
      />
      <ProgramsCarousel
        title="YABN Academy: Six Practical Programs"
        text="Each program covers outcomes, curriculum, mentor, duration and format. Fees and dates are published once confirmed."
        cta={{ to: '/contact', label: 'Ask about enrollment' }}
        programs={programs.map((p, i) => ({ ...p, n: i + 1 }))}
        photos={programPhotos}
      />
      <ServiceGrid
        id="growth"
        title="Business Growth Services"
        text="Distinct services with a clear scope and a trackable next step."
        items={services}
      />
      <Assessment />
      <Strengths id="network" kicker="Business Network" title="A Trusted Community You Control" items={networkBenefits.slice(0, 3).map((b) => `${b.title}: ${b.text}`)} />
      <Connect />
    </>
  )
}
