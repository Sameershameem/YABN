import { PageHero } from '../components/Hero'
import { Assessment } from '../components/Interactive'
import { Connect, ProgramsCarousel, ServiceGrid, Strengths } from '../components/sections'
import { networkBenefits, programPhotos, programs, services } from '../data/content'

export default function Services() {
  return (
    <>
      <PageHero
        photo="yabn-workshop"
        alt="YABN practical business accelerator workshop"
        kicker="Our Frameworks & Services"
        title="Everything You Need to Scale"
        text="Executive learning, hands-on growth advisory, and a trusted founder network built around your exact revenue stage."
      />
      <ProgramsCarousel
        title="YABN Academy: Six Tactical Programs"
        text="Outcome-driven modules covering unit economics, SOPs, sales funnels, and live mentor audits."
        cta={{ to: '/contact', label: 'Ask About Enrollment' }}
        programs={programs.map((p, i) => ({ ...p, n: i + 1 }))}
        photos={programPhotos}
      />
      <ServiceGrid
        id="growth"
        title="Business Growth & Scaling Advisory"
        text="Distinct growth services with verified scopes, measurable milestone delivery, and direct founder accountability."
        items={services}
      />
      <Assessment />
      <Strengths
        id="network"
        kicker="Sovereign Founder Network"
        title="A High-Trust Community of Operators"
        items={networkBenefits.slice(0, 3).map((b) => `${b.title}: ${b.text}`)}
      />
      <Connect />
    </>
  )
}
