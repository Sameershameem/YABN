import { PageHero } from '../components/Hero'
import { ContactSection, Faqs } from '../components/blocks'
import { faqs } from '../data/content'

export default function Contact() {
  return (
    <>
      <PageHero
        photo="connect"
        alt="A person overlooking a city at sunset"
        kicker="Contact"
        title="Let's Connect"
        text="Enquiries, bookings and support. Every message is answered by the right person."
      />
      <ContactSection />
      <Faqs items={faqs} />
    </>
  )
}
