import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, RotateCcw, X } from 'lucide-react'
import { assessment, recommendations } from '../data/content'
import { Field, FormError, Honeypot, SubmitPill, inputCls } from './blocks'
import { readForm, sendForm } from '../lib/submit'
import { useScrollLock } from './hooks'
import { Container, Heading, Pill, Reveal } from './ui'

function Progress({ total, done, light = false }) {
  return (
    <div className="flex gap-2" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`h-0.5 flex-1 overflow-hidden rounded-full ${light ? 'bg-white/20' : 'bg-line'}`}>
          <div className={`h-full origin-left transition-transform duration-500 ${light ? 'bg-white' : 'bg-cocoa'} ${i < done ? 'scale-x-100' : 'scale-x-0'}`} />
        </div>
      ))}
    </div>
  )
}

/* ---------- Growth assessment ---------- */
export function Assessment() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const done = step >= assessment.length
  const rec = done ? recommendations[answers[0]] : null

  const choose = (opt) => {
    setAnswers((a) => [...a.slice(0, step), opt])
    setStep((s) => s + 1)
  }

  return (
    <section id="assessment" className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <Heading>Find your <em>next step.</em></Heading>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-soft">Three quick questions about your stage, challenge and goals, then a personalised recommendation.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-2xl bg-cocoa p-6 text-white sm:p-9">
              <Progress total={assessment.length} done={step} light />
              {!done ? (
                <div key={step} className="mt-7 animate-rise">
                  <p className="text-[13px] text-white/60">{step + 1} / {assessment.length}</p>
                  <p className="mt-2 text-2xl leading-snug">{assessment[step].q}</p>
                  <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
                    {assessment[step].options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => choose(opt)}
                        className="min-h-12 rounded-xl bg-white/[0.08] px-5 py-3.5 text-left text-[15px] ring-1 ring-white/10 transition-colors hover:bg-white hover:text-ink active:bg-white active:text-ink"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-7 animate-rise">
                  <p className="text-[13px] text-white/60">Suggested for you</p>
                  <p className="mt-2 text-[1.75rem] leading-tight">{rec.title}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/75">{rec.text}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Pill
                      to={`/contact?${new URLSearchParams({
                        topic: 'Discovery call',
                        note: `Growth assessment results:\n• Stage: ${answers[0]}\n• Biggest challenge: ${answers[1]}\n• 90-day goal: ${answers[2]}\n• Suggested: ${rec.title}\n\nI'd like to book a discovery call.`,
                      })}#form`}
                      variant="white"
                    >
                      Book a discovery call
                    </Pill>
                    <Pill variant="dark" arrow={false} type="button" onClick={() => { setStep(0); setAnswers([]) }}>
                      <RotateCcw className="size-4" /> Retake
                    </Pill>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/* ---------- Mission 100 multi-step application ---------- */
export function ApplyModal({ onClose }) {
  const [step, setStep] = useState(0)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef(null)
  const steps = ['About you', 'Your idea', 'Commitment']
  useScrollLock(true)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const next = async (e) => {
    e.preventDefault()
    if (sending) return
    // validate only the visible step's fields before moving on
    for (const f of formRef.current.querySelectorAll(`[data-step="${step}"] [required]`)) {
      if (!f.checkValidity()) {
        f.reportValidity()
        return
      }
    }
    if (step < steps.length - 1) return setStep(step + 1)

    // hidden steps stay in the DOM, so one read collects every answer
    const data = readForm(formRef.current)
    setError('')
    setSending(true)
    try {
      await sendForm(`Mission 100 application: ${data['Full name']} (${data.City})`, data)
      setSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 animate-fade bg-black/60" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label="Mission 100 application" className="relative max-h-[92svh] w-full max-w-xl animate-rise overflow-y-auto overscroll-contain rounded-t-3xl bg-paper p-6 sm:rounded-3xl sm:p-9">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 grid size-11 place-items-center rounded-full hover:bg-cream">
          <X className="size-5" strokeWidth={1.5} />
        </button>

        {sent ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto size-12 text-bronze-500" strokeWidth={1.5} />
            <p className="mt-5 text-2xl">Application received.</p>
            <p className="mt-3 text-ink-soft">Thank you for applying. We will be in touch about the next stage.</p>
            <Pill onClick={onClose} variant="ink" arrow={false} className="mt-8">Close</Pill>
          </div>
        ) : (
          <form ref={formRef} onSubmit={next} noValidate className="relative">
            <Honeypot />
            <p className="text-[13px] text-ink-soft">Mission 100 · {step + 1} / {steps.length}</p>
            <p className="mt-1 text-2xl">{steps[step]}</p>
            <div className="mt-5"><Progress total={steps.length} done={step + 1} /></div>
            <div className="mt-7">
              {[0, 1, 2].map((s) => (
                <div key={s} data-step={s} hidden={s !== step} className="space-y-5">
                  {s === 0 && (
                    <>
                      <Field label="Full name"><input required name="name" data-label="Full name" className={inputCls} autoComplete="name" /></Field>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Email"><input required type="email" name="email" data-label="Email" inputMode="email" className={inputCls} autoComplete="email" /></Field>
                        <Field label="Mobile"><input required type="tel" name="mobile" data-label="Mobile" inputMode="tel" pattern="[0-9+\s-]{8,15}" className={inputCls} placeholder="+91" autoComplete="tel" /></Field>
                      </div>
                      <Field label="City"><input required name="city" data-label="City" className={inputCls} autoComplete="address-level2" /></Field>
                    </>
                  )}
                  {s === 1 && (
                    <>
                      <Field label="Your business idea"><textarea required name="idea" data-label="Business idea" rows={3} className={inputCls} /></Field>
                      <Field label="Why Mission 100?"><textarea required name="motivation" data-label="Why Mission 100" rows={3} className={inputCls} /></Field>
                    </>
                  )}
                  {s === 2 && (
                    <>
                      <Field label="Hours you can commit each week">
                        <select required name="hours" data-label="Weekly hours" className={inputCls} defaultValue="">
                          <option value="" disabled>Select</option>
                          <option>Under 5 hours</option>
                          <option>5–10 hours</option>
                          <option>10–20 hours</option>
                          <option>20+ hours</option>
                        </select>
                      </Field>
                      <label className="flex gap-3 rounded-xl bg-cream p-4 text-[13px] text-ink-soft">
                        <input required type="checkbox" name="consent" data-label="Consent" className="mt-0.5 size-4 shrink-0 accent-bronze-500" />
                        <span>I agree to be contacted about my application and understand that participation is not a promise of income or funding.</span>
                      </label>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6"><FormError message={error} /></div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <button type="button" onClick={() => setStep(Math.max(0, step - 1))} className={`min-h-11 px-2 text-sm text-ink-soft hover:text-ink ${step === 0 ? 'invisible' : ''}`}>
                Back
              </button>
              <SubmitPill sending={sending}>{step === steps.length - 1 ? 'Submit application' : 'Continue'}</SubmitPill>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
