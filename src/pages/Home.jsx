import Hero from '../components/Hero'
import InternshipSection from '../components/InternshipSection'
import SegmentedQueryHub from '../components/SegmentedQueryHub'
import {
  Approach,
  Connect,
  Founder,
  Marquee,
  ProgramsCarousel,
  Story,
  Strengths,
} from '../components/sections'
import { approach, programPhotos, programs, strengths } from '../data/content'

export default function Home() {
  return (
    <>
      <Hero />
      <InternshipSection />
      <SegmentedQueryHub defaultTab="freelancer" />
      <Story
        title="A Business Network Built on Learning and Action"
        text="We help students, new founders and business owners turn ideas into businesses with practical programs, growth consultation and a community that has their back."
        link={{ to: '/about', label: 'More About YABN' }}
      />
      <Marquee />
      <Approach
        title={
          <>
            Practical. Personal.
            <br />
            <em>Built for Founders.</em>
          </>
        }
        text="Our approach turns learning into action, one clear step at a time."
        cta={{ to: '/about', label: 'Discover more' }}
        items={approach}
      />
      <ProgramsCarousel
        title="A Growing Academy of Practical Programs"
        text="Structured courses that take you from first idea to scalable systems."
        cta={{ to: '/services', label: 'Explore Programs' }}
        programs={programs.map((p, i) => ({ ...p, n: i + 1 }))}
        photos={programPhotos}
      />
      <Strengths title="Key Strengths and Principles" items={strengths} />
      <Founder />
      <Connect />
    </>
  )
}
