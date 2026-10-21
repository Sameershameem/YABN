import { PageHero } from '../components/Hero'
import { ContactSection, Faqs } from '../components/blocks'
import { faqs } from '../data/content'

export default function Contact() {
  return (
    <>
      <PageHero
        photo="yabn-summit"
        alt="YABN executive summit and founder networking"
        kicker="Direct Contact & Consultation"
        title="Let's Connect"
        text="Enquiries, advisory bookings, and accelerator applications. Every consultation is answered directly by the leadership team."
      />
      <ContactSection />
      <Faqs items={faqs} />
    </>
  )
}
