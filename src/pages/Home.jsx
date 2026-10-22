import Apply from '../components/Apply'
import Hero from '../components/Hero'
import InternshipPortal from '../components/InternshipSection'
import { Mentor, Mission, Offer, Paths, WhyUs } from '../components/landing'

export default function Home() {
  return (
    <>
      {/* One promise, proof and a single clear action */}
      <Hero />

      {/* Navy panel: Academy, Growth and Network as cards that rise in turn */}
      <Offer />

      {/* Five paths; each one pre-selects the role in the apply form */}
      <Paths />

      {/* Navy panel: the numbers, sliding in */}
      <WhyUs />

      {/* The 90-day founder program */}
      <Mission />

      {/* Yasir Ali */}
      <Mentor />

      {/* The one short form everything points to */}
      <Apply />

      {/* Detailed fellowship form, opened from the navbar, footer and apply form */}
      <InternshipPortal />
    </>
  )
}
