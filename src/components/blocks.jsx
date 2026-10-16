import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, Loader2, Plus } from 'lucide-react'
import { readForm, sendForm, INBOX } from '../lib/submit'
import { Container, Heading, Pill, Reveal } from './ui'

export const inputCls =
  'w-full rounded-xl border border-line bg-paper px-4 py-3.5 text-base text-ink placeholder:text-ink-soft/50 transition-[border-color,box-shadow] focus:border-bronze-400 focus:outline-none focus:ring-4 focus:ring-bronze-300/25'

export function Field({ label, children, className = '' }) {
  return (
    <label className={`block text-left ${className}`}>
      <span className="mb-2 block text-[13px] font-medium text-ink">{label}</span>
      {children}
    </label>
  )
}

/* Hidden bot trap: people never see or fill it */
export function Honeypot() {
  return (
    <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
  )
}

export function FormError({ message }) {
  if (!message) return null
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[13px] leading-relaxed text-red-800">
      {message} You can also email <a className="underline" href={`mailto:${INBOX}`}>{INBOX}</a> or call{' '}
      <a className="underline" href="tel:+919045417079">+91 90454 17079</a>.
    </p>
  )
}

/* Submit button that shows a spinner while sending */
export function SubmitPill({ sending, children, className = '' }) {
  return (
    <Pill type="submit" variant="ink" arrow={!sending} disabled={sending} className={`disabled:opacity-70 ${className}`}>
      {sending && <Loader2 className="size-4 animate-spin" />}
      {sending ? 'Sending…' : children}
    </Pill>
  )
}

const enquiryTypes = ['YABN Academy', 'Business growth consultation', 'Business Network membership', 'Mission 100', 'Mentor / partner', 'Discovery call', 'General enquiry']

export function ContactSection({ id = 'form', title = <>Tell us where <em>you are.</em></>, text = 'Share your goals and the right person from YABN will get back to you.' }) {
  // links elsewhere on the site can preselect a topic and prefill the message (?topic=…&note=…)
  const [params] = useSearchParams()
  const topic = enquiryTypes.includes(params.get('topic')) ? params.get('topic') : ''
  const note = params.get('note') || ''

  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [error, setError] = useState('')
  const [name, setName] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = readForm(form)
    setError('')
    setStatus('sending')
    try {
      await sendForm(`New YABN enquiry: ${data['Interested in']} from ${data.Name}`, data)
      setName(data.Name.split(' ')[0])
      setStatus('sent')
      form.reset()
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  return (
    <section id={id} className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <Heading>{title}</Heading>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-soft">{text}</p>
            <ul className="mt-10 space-y-3 text-[15px]">
              <li><a href={`mailto:${INBOX}`} className="hover:text-bronze-600">{INBOX}</a></li>
              <li><a href="tel:+919045417079" className="hover:text-bronze-600">+91 90454 17079</a> · <a href="tel:+919412617279" className="hover:text-bronze-600">+91 94126 17279</a></li>
              <li className="text-ink-soft">Grand Bazaar, 1st Floor, Lal Diggi Road, Aligarh, Uttar Pradesh 202001</li>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            {status === 'sent' ? (
              <div className="animate-rise rounded-2xl bg-cream px-8 py-14 text-center" role="status">
                <CheckCircle2 className="mx-auto size-10 text-bronze-500" strokeWidth={1.5} />
                <p className="mt-5 text-2xl">Thank you{name ? `, ${name}` : ''}.</p>
                <p className="mt-2 text-ink-soft">Your message has reached the YABN team. We will be in touch soon.</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-sm font-medium text-bronze-600 hover:text-ink">Send another message</button>
              </div>
            ) : (
              <form className="relative space-y-5 rounded-2xl bg-cream p-5 sm:p-8" onSubmit={onSubmit}>
                <Honeypot />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name"><input required name="name" data-label="Name" className={inputCls} autoComplete="name" /></Field>
                  <Field label="Mobile">
                    <input required type="tel" name="mobile" data-label="Mobile" inputMode="tel" pattern="[0-9+\s\-]{8,16}" title="Please enter a valid phone number" className={inputCls} placeholder="+91" autoComplete="tel" />
                  </Field>
                </div>
                <Field label="Email"><input required type="email" name="email" data-label="Email" inputMode="email" className={inputCls} autoComplete="email" /></Field>
                <Field label="Interested in">
                  <select key={topic} required name="type" data-label="Interested in" defaultValue={topic} className={inputCls}>
                    <option value="" disabled>Choose one</option>
                    {enquiryTypes.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Message"><textarea key={note} required name="message" data-label="Message" rows={4} defaultValue={note} className={inputCls} /></Field>
                <label className="flex gap-3 text-[13px] text-ink-soft">
                  <input required type="checkbox" name="consent" data-label="Consent to be contacted" className="mt-0.5 size-4 shrink-0 accent-bronze-500" />
                  I agree to be contacted by YABN about this enquiry.
                </label>
                <FormError message={error} />
                <SubmitPill sending={status === 'sending'} className="w-full sm:w-auto">Send message</SubmitPill>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

// Height animates with the grid-rows trick: no measuring, no JS animation
function Faq({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="border-b border-line">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between gap-6 py-6 text-left">
        <span className="text-lg">{q}</span>
        <span className={`grid size-9 shrink-0 place-items-center rounded-full bg-cream text-cocoa transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <Plus className="size-4" />
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden"><p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-ink-soft">{a}</p></div>
      </div>
    </li>
  )
}

export function Faqs({ items }) {
  return (
    <section id="faqs" className="bg-paper pb-20 sm:pb-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal><Heading>Common <em>questions.</em></Heading></Reveal>
          <Reveal delay={100}>
            <ul className="border-t border-line">{items.map((f) => <Faq key={f.q} {...f} />)}</ul>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
