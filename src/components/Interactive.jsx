import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, RotateCcw, X } from 'lucide-react'
import { assessment, recommendations } from '../data/content'
import { Field, FormError, Honeypot, SubmitPill, inputCls } from './blocks'
import { readForm, sendForm } from '../lib/submit'
import { useScrollLock } from './hooks'
import { Container, Heading, Kicker, Pill, Reveal } from './ui'

function Progress({ total, done, light = false }) {
  return (
    <div className="flex gap-2" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 overflow-hidden rounded-full ${light ? 'bg-white/20' : 'bg-slate-200'}`}
        >
          <div
            className={`h-full origin-left transition-transform duration-500 ${
              light ? 'bg-[#dcc17b]' : 'bg-[#B98F32]'
            } ${i < done ? 'scale-x-100' : 'scale-x-0'}`}
          />
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
    <section id="assessment" className="bg-[#ffffff] py-20 sm:py-28 border-t border-slate-100">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16 items-center">
          <Reveal>
            <Kicker>Interactive Diagnostic</Kicker>
            <Heading className="mt-3">
              Find Your <em>Next Step.</em>
            </Heading>
            <p className="mt-4 max-w-sm text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
              Three quick questions about your business stage, operational bottlenecks, and 90-day targets to generate a
              personalized roadmap.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-white/10 bg-[#021329] p-7 text-white shadow-2xl sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 size-48 rounded-full bg-[#B98F32]/15 blur-2xl pointer-events-none" />

              <Progress total={assessment.length} done={step} light />

              {!done ? (
                <div key={step} className="mt-7 animate-rise">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#dcc17b] uppercase tracking-wider">
                      Question {step + 1} of {assessment.length}
                    </span>
                    <span className="size-2 rounded-full bg-[#B98F32]" />
                  </div>
                  <h3 className="mt-3 text-xl sm:text-2xl font-bold leading-snug tracking-tight text-white">
                    {assessment[step].q}
                  </h3>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {assessment[step].options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => choose(opt)}
                        className="min-h-12 rounded-2xl bg-white/[0.08] px-5 py-3.5 text-left text-xs sm:text-sm font-semibold text-white/95 ring-1 ring-white/15 transition-all duration-200 hover:bg-[#B98F32] hover:text-[#021329] active:scale-95 hover:shadow-lg"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-7 animate-rise">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#dcc17b]">
                    Suggested Diagnostic Track
                  </span>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    {rec.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/80 font-normal">{rec.text}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Pill
                      to={`/contact?${new URLSearchParams({
                        topic: 'Discovery call',
                        note: `Growth assessment results:\n• Stage: ${answers[0]}\n• Biggest challenge: ${answers[1]}\n• 90-day goal: ${answers[2]}\n• Suggested: ${rec.title}\n\nI'd like to book a discovery call.`,
                      })}#form`}
                      variant="gold"
                    >
                      Book a Discovery Call
                    </Pill>
                    <Pill
                      variant="white"
                      arrow={false}
                      type="button"
                      onClick={() => {
                        setStep(0)
                        setAnswers([])
                      }}
                    >
                      <RotateCcw className="size-4 mr-1 text-[#021329]" /> Retake Test
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
  const steps = ['About You', 'Your Business Concept', 'Commitment & Track']
  useScrollLock(true)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const next = async (e) => {
    e.preventDefault()
    if (sending) return
    for (const f of formRef.current.querySelectorAll(`[data-step="${step}"] [required]`)) {
      if (!f.checkValidity()) {
        f.reportValidity()
        return
      }
    }
    if (step < steps.length - 1) return setStep(step + 1)

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
      <div className="absolute inset-0 animate-fade bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mission 100 application"
        className="relative max-h-[92svh] w-full max-w-xl animate-rise overflow-y-auto overscroll-contain rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-9 border border-slate-200"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-[#021329] transition-colors"
        >
          <X className="size-5" />
        </button>

        {sent ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto size-12 text-[#96711e]" strokeWidth={1.5} />
            <h3 className="mt-4 text-2xl font-extrabold text-[#021329]">Application Transmitted</h3>
            <p className="mt-2 text-sm text-slate-600">
              Thank you for applying to Mission 100. The YABN admissions committee will contact you within 24 hours.
            </p>
            <Pill onClick={onClose} variant="gold" arrow={false} className="mt-6">
              Close Window
            </Pill>
          </div>
        ) : (
          <form ref={formRef} onSubmit={next} noValidate className="relative">
            <Honeypot />
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#96711e]">
                Mission 100 · Step {step + 1} of {steps.length}
              </span>
              <span className="text-xs text-slate-400">YABN Accelerator</span>
            </div>

            <h3 className="mt-3 text-2xl font-extrabold text-[#021329]">{steps[step]}</h3>

            <div className="mt-4">
              <Progress total={steps.length} done={step + 1} />
            </div>

            <div className="mt-6">
              {[0, 1, 2].map((s) => (
                <div key={s} data-step={s} hidden={s !== step} className="space-y-4">
                  {s === 0 && (
                    <>
                      <Field label="Full Name">
                        <input
                          required
                          name="name"
                          data-label="Full name"
                          placeholder="e.g. John Doe"
                          className={inputCls}
                          autoComplete="name"
                        />
                      </Field>
                      <div className="grid gap-4 sm:grid-cols-2">
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
                        <Field label="Phone / WhatsApp">
                          <input
                            required
                            type="tel"
                            name="mobile"
                            data-label="Mobile"
                            inputMode="tel"
                            placeholder="+91 98765 43210"
                            pattern="[0-9+\s-]{8,15}"
                            className={inputCls}
                            autoComplete="tel"
                          />
                        </Field>
                      </div>
                      <Field label="City & State">
                        <input
                          required
                          name="city"
                          data-label="City"
                          placeholder="e.g. Aligarh, UP"
                          className={inputCls}
                          autoComplete="address-level2"
                        />
                      </Field>
                    </>
                  )}
                  {s === 1 && (
                    <>
                      <Field label="Your Business or Startup Idea">
                        <textarea
                          required
                          name="idea"
                          data-label="Business idea"
                          placeholder="What problem are you solving and for whom?"
                          rows={3}
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Why do you want to join Mission 100?">
                        <textarea
                          required
                          name="motivation"
                          data-label="Why Mission 100"
                          placeholder="What specific support or mentorship do you need?"
                          rows={3}
                          className={inputCls}
                        />
                      </Field>
                    </>
                  )}
                  {s === 2 && (
                    <>
                      <Field label="Weekly Hours You Can Dedicate">
                        <select
                          required
                          name="hours"
                          data-label="Weekly hours"
                          className={inputCls}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select Weekly Commitment
                          </option>
                          <option>Under 5 hours</option>
                          <option>5–10 hours</option>
                          <option>10–20 hours</option>
                          <option>20+ hours (Full Time)</option>
                        </select>
                      </Field>
                      <label className="flex items-start gap-3 rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-600">
                        <input
                          required
                          type="checkbox"
                          name="consent"
                          data-label="Consent"
                          className="mt-0.5 size-4 shrink-0 accent-[#B98F32]"
                        />
                        <span>
                          I agree to be contacted via WhatsApp/Phone regarding my application and understand that selection is
                          based on grit and execution potential.
                        </span>
                      </label>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5">
              <FormError message={error} />
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(Math.max(0, step - 1))}
                className={`min-h-11 px-3 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#021329] ${
                  step === 0 ? 'invisible' : ''
                }`}
              >
                Back
              </button>
              <SubmitPill sending={sending}>
                {step === steps.length - 1 ? 'Submit Application' : 'Continue'}
              </SubmitPill>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
