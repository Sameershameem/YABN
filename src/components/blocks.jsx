import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Plus } from 'lucide-react'
import { readForm, sendForm, INBOX } from '../lib/submit'
import { Container, Heading, Kicker, Pill, Reveal } from './ui'

export const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#021329] placeholder:text-slate-400 transition-all focus:border-[#B98F32] focus:outline-none focus:ring-4 focus:ring-[#B98F32]/15'

export function Field({ label, children, className = '' }) {
  return (
    <label className={`block text-left ${className}`}>
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#021329]">{label}</span>
      {children}
    </label>
  )
}

/* Hidden bot trap: people never see or fill it */
export function Honeypot() {
  return (
    <input
      type="text"
      name="_honey"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute -left-[9999px] h-0 w-0 opacity-0"
    />
  )
}

export function FormError({ message }) {
  if (!message) return null
  return (
    <p role="alert" className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs leading-relaxed text-red-800">
      {message} You can also email{' '}
      <a className="underline font-bold" href={`mailto:${INBOX}`}>
        {INBOX}
      </a>{' '}
      or call{' '}
      <a className="underline font-bold" href="tel:+919045417079">
        +91 90454 17079
      </a>
      .
    </p>
  )
}

/* Submit button that shows a spinner while sending */
export function SubmitPill({ sending, children, className = '' }) {
  return (
    <Pill
      type="submit"
      variant="gold"
      arrow={!sending}
      disabled={sending}
      className={`disabled:opacity-70 shadow-md ${className}`}
    >
      {sending && <Loader2 className="size-4 animate-spin" />}
      {sending ? 'Transmitting…' : children}
    </Pill>
  )
}

const enquiryTypes = [
  'YABN Academy',
  'Business growth consultation',
  'Business Network membership',
  'Mission 100',
  'Internship / Fellowship',
  'Mentor / partner',
  'Discovery call',
  'General enquiry',
]

export function ContactSection({
  id = 'form',
  title = (
    <>
      Direct Access to <em>YABN Leadership.</em>
    </>
  ),
  text = 'Share your business goals and current revenue stage. Every consultation request is reviewed directly by Yasir Ali and senior advisors.',
}) {
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
    <section id={id} className="bg-[#ffffff] py-20 sm:py-28 border-t border-slate-100">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 items-start">
          <Reveal>
            <Kicker>Connect Directly</Kicker>
            <Heading className="mt-3">{title}</Heading>
            <p className="mt-4 max-w-sm text-sm sm:text-base leading-relaxed text-slate-600 font-normal">{text}</p>

            <div className="mt-10 space-y-4 text-xs sm:text-sm">
              <a
                href={`mailto:${INBOX}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-[#fafafa] hover:border-[#B98F32] transition-colors"
              >
                <div className="size-9 rounded-xl bg-[#021329] text-[#dcc17b] flex items-center justify-center shrink-0">
                  <Mail className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Inbox</p>
                  <p className="font-bold text-[#021329]">{INBOX}</p>
                </div>
              </a>

              <a
                href="tel:+919045417079"
                className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-[#fafafa] hover:border-[#B98F32] transition-colors"
              >
                <div className="size-9 rounded-xl bg-[#021329] text-[#dcc17b] flex items-center justify-center shrink-0">
                  <Phone className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Advisory Lines</p>
                  <p className="font-bold text-[#021329]">+91 90454 17079 · +91 94126 17279</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-[#fafafa]">
                <div className="size-9 rounded-xl bg-[#021329] text-[#dcc17b] flex items-center justify-center shrink-0">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Headquarters</p>
                  <p className="text-slate-600">Grand Bazaar, 1st Floor, Lal Diggi Road, Aligarh, UP 202001</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            {status === 'sent' ? (
              <div
                className="animate-rise rounded-3xl border border-[#B98F32]/40 bg-[#fcf8ee] p-8 py-14 text-center shadow-lg"
                role="status"
              >
                <CheckCircle2 className="mx-auto size-12 text-[#96711e]" strokeWidth={1.5} />
                <h3 className="mt-4 text-2xl font-extrabold text-[#021329]">Thank You{name ? `, ${name}` : ''}.</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Your message has reached Yasir Ali and the YABN leadership. We will be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-xs font-bold uppercase tracking-wider text-[#021329] hover:text-[#96711e]"
                >
                  Send another inquiry →
                </button>
              </div>
            ) : (
              <form
                className="relative space-y-4 rounded-3xl border border-slate-200/90 bg-[#fafafa] p-6 sm:p-9 shadow-xl"
                onSubmit={onSubmit}
              >
                <Honeypot />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name">
                    <input
                      required
                      name="name"
                      data-label="Name"
                      placeholder="e.g. John Doe"
                      className={inputCls}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Mobile / WhatsApp">
                    <input
                      required
                      type="tel"
                      name="mobile"
                      data-label="Mobile"
                      inputMode="tel"
                      pattern="[0-9+\s\-]{8,16}"
                      title="Please enter a valid phone number"
                      className={inputCls}
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                    />
                  </Field>
                </div>
                <Field label="Email Address">
                  <input
                    required
                    type="email"
                    name="email"
                    data-label="Email"
                    placeholder="you@domain.com"
                    inputMode="email"
                    className={inputCls}
                    autoComplete="email"
                  />
                </Field>
                <Field label="Interested In">
                  <select
                    key={topic}
                    required
                    name="type"
                    data-label="Interested in"
                    defaultValue={topic}
                    className={inputCls}
                  >
                    <option value="" disabled>
                      Select Program or Track
                    </option>
                    {enquiryTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Detailed Message">
                  <textarea
                    key={note}
                    required
                    name="message"
                    data-label="Message"
                    rows={4}
                    placeholder="Tell us about your business, current bottlenecks, and goals..."
                    defaultValue={note}
                    className={inputCls}
                  />
                </Field>
                <label className="flex items-start gap-3 text-xs text-slate-600 pt-1">
                  <input
                    required
                    type="checkbox"
                    name="consent"
                    data-label="Consent to be contacted"
                    className="mt-0.5 size-4 shrink-0 accent-[#B98F32]"
                  />
                  <span>I authorize YABN to contact me via WhatsApp, phone, or email regarding this inquiry.</span>
                </label>
                <FormError message={error} />
                <div className="pt-2">
                  <SubmitPill sending={status === 'sending'} className="w-full sm:w-auto">
                    Transmit Consultation Request
                  </SubmitPill>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="border-b border-slate-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-[#96711e]"
      >
        <span className="text-base sm:text-lg font-bold text-[#021329]">{q}</span>
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-[#021329] transition-transform duration-300 ${
            open ? 'rotate-45 bg-[#021329] text-[#dcc17b]' : ''
          }`}
        >
          <Plus className="size-4" />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 text-sm sm:text-[15px] leading-relaxed text-slate-600 font-normal">{a}</p>
        </div>
      </div>
    </li>
  )
}

export function Faqs({ items }) {
  return (
    <section id="faqs" className="bg-[#ffffff] pb-20 sm:pb-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal>
            <Kicker>Clarity & Transparency</Kicker>
            <Heading className="mt-3">
              Common <em>Questions.</em>
            </Heading>
          </Reveal>
          <Reveal delay={100}>
            <ul className="border-t border-slate-200">
              {items.map((f) => (
                <Faq key={f.q} {...f} />
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
