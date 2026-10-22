import { useEffect, useState } from 'react'
import { ArrowRight, Check, Loader2, MessageCircle, Phone } from 'lucide-react'
import { readForm, sendForm } from '../lib/submit'
import { SectionTitle, Shell } from './landing'

const PHONE = '+918439417079'
const ROLES = ['Student', 'New founder', 'Business owner', 'Partner / Mentor', 'Internship']

const steps = [
  ['Apply here', 'Four short fields. No fees, no documents.'],
  ['We call you', 'A YABN advisor reaches out on WhatsApp or phone, usually within 24 hours.'],
  ['Get your plan', 'A clear first step for your stage, from a course to 1-on-1 consultation.'],
]

const field =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-[15px] text-[#021329] placeholder:text-slate-400 transition focus:border-[#B98F32] focus:ring-4 focus:ring-[#B98F32]/15 focus:outline-none'

/* The one place to apply: role chips, four fields, done. Any "Apply" button on the page pre-selects a role. */
export default function Apply() {
  const [role, setRole] = useState('New founder')
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [error, setError] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    const onApply = (e) => {
      if (ROLES.includes(e.detail?.role)) setRole(e.detail.role)
      setStatus('idle')
      setError('')
    }
    window.addEventListener('yabn-apply', onApply)
    return () => window.removeEventListener('yabn-apply', onApply)
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = readForm(form)
    setError('')
    setStatus('sending')
    try {
      await sendForm(`[YABN Application: ${role}] ${data.Name} (${data['Phone / WhatsApp']})`, data)
      setName(data.Name.split(' ')[0])
      setStatus('sent')
      form.reset()
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  const whatsapp = `https://wa.me/${PHONE.slice(1)}?text=${encodeURIComponent(`Hi YABN, I'd like to apply as: ${role}.`)}`

  return (
    <section id="apply" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <span id="internships" className="block scroll-mt-20" aria-hidden="true" />
      <Shell>
        <SectionTitle
          eyebrow="Apply"
          title="Start in [60 seconds]."
          note="Pick who you are, leave your number, and we take it from there."
        />

        <div className="mt-14 grid overflow-hidden rounded-[28px] ring-1 ring-slate-200 sm:rounded-[36px] lg:grid-cols-[0.85fr_1.15fr]">
          {/* how it works + instant contact */}
          <div className="relative order-last flex flex-col bg-[#021329] p-7 text-white sm:p-10 lg:order-none">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_0%_0%,rgba(185,143,50,0.18),transparent)]" />
            <ol className="relative space-y-7">
              {steps.map(([title, text], i) => (
                <li key={title} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#B98F32] text-[14px] font-semibold text-[#021329]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[17px] font-medium">{title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-white/75">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="relative mt-10 border-t border-white/15 pt-7 lg:mt-auto">
              <p className="text-[14px] text-white/75">Rather talk right now?</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-[14px] font-medium text-white transition hover:brightness-105"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-[14px] font-medium text-white ring-1 ring-white/20 transition hover:bg-white/15"
                >
                  <Phone className="size-4 text-[#e6cf94]" /> +91 84394 17079
                </a>
              </div>
            </div>
          </div>

          {/* the form */}
          <div className="bg-white p-7 sm:p-10">
            {status === 'sent' ? (
              <div className="flex h-full animate-rise flex-col items-start justify-center py-10">
                <span className="grid size-14 place-items-center rounded-full bg-[#f5ecd7] text-[#96711e]">
                  <Check className="size-7" strokeWidth={2.2} />
                </span>
                <h3 className="mt-6 text-3xl font-medium tracking-tight text-[#021329]">Thank you, {name}.</h3>
                <p className="mt-3 max-w-md text-[16px] leading-relaxed text-slate-600">
                  Your application as <strong className="font-medium text-[#021329]">{role}</strong> is in. A YABN advisor
                  will contact you shortly on WhatsApp or phone.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-[15px] font-medium text-[#021329] underline decoration-[#dcc17b] decoration-2 underline-offset-[6px]"
                >
                  Send another application
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <fieldset>
                  <legend className="text-[15px] font-medium text-[#021329]">I am a…</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ROLES.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        aria-pressed={role === r}
                        className={`rounded-full px-4 py-2.5 text-[14px] font-medium transition-colors ${
                          role === r
                            ? 'bg-[#021329] text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-[#021329]'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="Applying as" value={role} />
                  {role === 'Internship' && (
                    <p className="mt-3 text-[14px] text-slate-600">
                      Want to pick a specific track?{' '}
                      <button
                        type="button"
                        onClick={() =>
                          window.dispatchEvent(new CustomEvent('open-internship-modal', { detail: { domain: 'business' } }))
                        }
                        className="font-medium text-[#96711e] underline underline-offset-4"
                      >
                        Open the full fellowship form
                      </button>
                    </p>
                  )}
                </fieldset>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[14px] font-medium text-slate-700">Full name</span>
                    <input name="Name" required autoComplete="name" placeholder="Your name" className={`${field} mt-1.5`} />
                  </label>
                  <label className="block">
                    <span className="text-[14px] font-medium text-slate-700">Phone / WhatsApp</span>
                    <input
                      name="Phone / WhatsApp"
                      required
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      pattern="[0-9+ ()-]{8,}"
                      title="Please enter a valid phone number"
                      placeholder="+91 98765 43210"
                      className={`${field} mt-1.5`}
                    />
                  </label>
                  <label className="block">
                    <span className="text-[14px] font-medium text-slate-700">City</span>
                    <input name="City" autoComplete="address-level2" placeholder="e.g. Aligarh" className={`${field} mt-1.5`} />
                  </label>
                  <label className="block">
                    <span className="text-[14px] font-medium text-slate-700">
                      Email <span className="font-normal text-slate-500">(optional)</span>
                    </span>
                    <input name="Email" type="email" autoComplete="email" placeholder="you@example.com" className={`${field} mt-1.5`} />
                  </label>
                </div>
                <label className="block">
                  <span className="text-[14px] font-medium text-slate-700">
                    What do you need help with? <span className="font-normal text-slate-500">(optional)</span>
                  </span>
                  <textarea name="Message" rows={3} placeholder="One or two lines is enough" className={`${field} mt-1.5 resize-none`} />
                </label>
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                {error && (
                  <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14px] leading-relaxed text-red-700">
                    {error}{' '}
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-medium underline">
                      Apply on WhatsApp instead
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#021329] py-4 text-[16px] font-medium text-white transition-colors hover:bg-[#0b2a52] disabled:opacity-70"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send my application
                      <ArrowRight className="size-4 text-[#dcc17b] transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                <p className="text-center text-[13px] text-slate-500">
                  We only use your details to reply to you. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </Shell>
    </section>
  )
}
