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

      {/* Story: Philosophy, Boardroom Photo & Growth Engines */}
      <Story
        title="A Business Network Built on Learning and Action"
        text="We help students, new founders, and established MSME owners turn ideas into profitable businesses with practical systems, unit economics audits, and direct 1-on-1 mentorship."
        link={{ to: '/about', label: 'More About YABN' }}
      />

      {/* Marquee Pillars */}
      <Marquee />

      {/* Venture Fellowship & Internship Section */}
      <InternshipSection />

      {/* 6-Category Diagnostic Consultation Hub */}
      <SegmentedQueryHub defaultTab="freelancer" />

      {/* Execution Methodology */}
      <Approach
        title={
          <>
            Practical. Personal.
            <br />
            <em>Built for Founders.</em>
          </>
        }
        text="Our methodology turns business theory into disciplined action, one measurable milestone at a time."
        cta={{ to: '/about', label: 'Discover our approach' }}
        items={approach}
      />

      {/* Programs Carousel */}
      <ProgramsCarousel
        title="YABN Academy: Six Tactical Programs"
        text="Structured courses and sprint modules taking you from raw concept to predictable cash flow systems."
        cta={{ to: '/services', label: 'Explore All Programs' }}
        programs={programs.map((p, i) => ({ ...p, n: i + 1 }))}
        photos={programPhotos}
      />

      {/* Executive Strengths */}
      <Strengths title="Key Strengths and Principles" items={strengths} />

      {/* Leadership & Mentor Council */}
      <Founder />

      {/* Connect Banner */}
      <Connect />
    </>
  )
}
