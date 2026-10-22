import { useEffect, useRef, useState } from 'react'
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Coins,
  Cpu,
  Loader2,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react'
import { useScrollLock } from './hooks'
import { INBOX, readForm, sendForm } from '../lib/submit'

export const DOMAINS = {
  marketing: {
    label: 'Marketing & Digital Growth',
    icon: TrendingUp,
    badge: 'Marketing',
    color: 'from-amber-500/20 to-orange-500/20 text-amber-700',
    specializations: [
      'Performance Marketing & Paid Ads (Meta, Google, YouTube)',
      'Social Media Strategy & Short-Form Video Creation (Reels, Shorts)',
      'Brand Positioning, Corporate PR & Influencer Growth',
      'Growth Hacking, Inbound Funnels & High-Conversion Copy',
      'Market Research, Competitor Audits & Customer Discovery',
      'Email Marketing, Retention & WhatsApp Lead Automation',
    ],
  },
  business: {
    label: 'Business Development & Operations',
    icon: Briefcase,
    badge: 'Business',
    color: 'from-blue-500/20 to-indigo-500/20 text-blue-800',
    specializations: [
      'B2B Business Development & High-Ticket Enterprise Sales',
      'Operations Engineering, Store Checklists & Kitchen SOPs',
      'Franchise Network Scaling & Territorial Distribution',
      'Restaurant & MSME Unit Economics & Margin Optimization',
      'Strategic Partnerships, Channel Alliances & Deal Structuring',
      'Client Consulting, Pitch Presentations & Business Advisory',
    ],
  },
  finance: {
    label: 'Finance, P&L & Cash Flow Systems',
    icon: Coins,
    badge: 'Finance',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-800',
    specializations: [
      'Financial Modeling, 90-Day Forecasting & Valuation',
      'Profit & Loss (P&L) Architecture & Cash Flow Management',
      'Cost Accounting & Unit-Level Food/Raw Material Leakage Auditing',
      'Working Capital Optimization & Receivables Funnel Architecture',
      'Venture Capital Pitch Decks, Cap Tables & Financial Due Diligence',
      'Commercial Taxation, GST Filing Systems & Banking Audits',
    ],
  },
  tech: {
    label: 'B.E. / Tech, Automation & Analytics',
    icon: Cpu,
    badge: 'B.E. / Tech',
    color: 'from-purple-500/20 to-indigo-500/20 text-purple-800',
    specializations: [
      'Business Automation, CRM Workflows & No-Code Systems (Zapier, Airtable)',
      'Full-Stack Web & Landing Page Engineering (React, Vite, Next.js)',
      'Data Analytics, BI Dashboards & Executive KPI Scorecards',
      'AI-Powered Business Tools, Chatbots & Operations Automation',
    ],
  },
}

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-[#021329] placeholder:text-slate-400 transition-all focus:border-[#B98F32] focus:outline-none focus:ring-4 focus:ring-[#B98F32]/15'

const selectCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-[#021329] transition-all focus:border-[#B98F32] focus:outline-none focus:ring-4 focus:ring-[#B98F32]/15'

/* Direct Interactive Internship Modal */
export function InternshipModal({ open, onClose, defaultDomain = 'business', defaultTrackTitle = '' }) {
  const [selectedDomainKey, setSelectedDomainKey] = useState(defaultDomain)
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [error, setError] = useState('')
  const [applicantName, setApplicantName] = useState('')
  const [lastSubmission, setLastSubmission] = useState(null)
  const formRef = useRef(null)

  useScrollLock(open)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!open) return null

  const domainConfig = DOMAINS[selectedDomainKey] || DOMAINS.business

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const rawData = readForm(form)
    setError('')
    setStatus('sending')

    let cleanResume = (rawData.resumeUrl || rawData['Resume / Portfolio Link'] || '').trim()
    if (cleanResume && !cleanResume.startsWith('http://') && !cleanResume.startsWith('https://')) {
      cleanResume = `https://${cleanResume}`
    }

    const subject = `[YABN Internship Application] ${rawData.name || 'Applicant'} - ${rawData.domainGroup || domainConfig.label} (${rawData.mobile || rawData.email || ''})`

    const payload = {
      'Program Type': 'YABN Venture Fellowship & Internship',
      'Target Domain': domainConfig.label,
      'Specific Specialization': rawData.specialization,
      'Applicant Name': rawData.name,
      'Phone / WhatsApp': rawData.mobile,
      'Email Address': rawData.email,
      'City & State': rawData.city,
      'Degree & Background': rawData.degreeBackground,
      'Academic Status': rawData.academicStatus,
      'Respective Working Days': rawData.weeklyDays,
      'Specific Preferred Days': rawData.specificDays || 'As per commitment tier',
      'Earliest Joining Day': rawData.joiningDay,
      'Resume / Portfolio': cleanResume,
      'Motivation & Objectives': rawData.motivation,
      'Selected Track': defaultTrackTitle || rawData.specialization,
      'Routing Recipient': INBOX,
    }

    setLastSubmission(payload)

    try {
      await sendForm(subject, payload)
      setApplicantName(rawData.name?.split(' ')[0] || 'Applicant')
      setStatus('sent')
      form.reset()
    } catch (err) {
      setError(err.message || 'Unable to transmit application. Please check your connection or send directly below.')
      setStatus('idle')
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4">
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-[#021329]/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="YABN Internship Application Form"
        className="relative max-h-[94svh] w-full max-w-2xl animate-rise overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-[#021329] hover:text-white transition-colors"
        >
          <X className="size-5" />
        </button>

        {status === 'sent' ? (
          <div className="py-8 text-center animate-rise">
            <div className="size-16 rounded-full bg-[#fcf8ee] border border-[#B98F32]/40 text-[#96711e] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="size-9" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#021329]">
              Application Transmitted, {applicantName}!
            </h3>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 max-w-md mx-auto">
              Your profile has been delivered directly to <strong>{INBOX}</strong>. Yasir Ali and the fellowship admissions
              committee will review your application and reach out on WhatsApp/Phone within 24 hours.
            </p>

            <div className="mt-6 rounded-2xl bg-[#fafafa] border border-slate-200 p-4 max-w-sm mx-auto text-xs text-left space-y-2">
              <div className="flex justify-between text-slate-500">
                <span>Selected Domain:</span>
                <strong className="text-[#021329]">{domainConfig.label}</strong>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Evaluation Review:</span>
                <strong className="text-[#96711e] flex items-center gap-1">
                  <Clock className="size-3" /> Within 24 Hours
                </strong>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Next Step:</span>
                <strong className="text-[#021329]">1-on-1 Diagnostic Call</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#021329] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#B98F32] transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B98F32]/40 bg-[#fcf8ee] px-3 py-0.5 text-[10px] font-bold tracking-wider uppercase text-[#96711e]">
                <Sparkles className="size-3" />
                <span>YABN VENTURE FELLOWSHIP FORM</span>
              </div>

              <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-[#021329] tracking-tight">
                Apply for Internship & Fellowship
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Work directly with Yasir Ali on live business execution, marketing funnels, and cash flow systems.
              </p>

              {defaultTrackTitle && (
                <div className="mt-2.5 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-[#021329] border border-slate-200">
                  <span className="text-[#96711e] font-bold uppercase text-[10px] tracking-wider">Target Track:</span>
                  <span>{defaultTrackTitle}</span>
                </div>
              )}
            </div>

            {/* DOMAIN SELECTOR TABS (Marketing, Business, Finance, B.E./Tech) */}
            <div>
              <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[#021329]">
                1. Select Core Domain of Internship <span className="text-[#B98F32]">*</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(DOMAINS).map(([key, domain]) => {
                  const Icon = domain.icon
                  const isSelected = selectedDomainKey === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedDomainKey(key)}
                      className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between gap-2 ${
                        isSelected
                          ? 'bg-[#021329] text-white border-[#021329] shadow-md ring-2 ring-[#B98F32]'
                          : 'bg-[#fafafa] text-[#021329] border-slate-200 hover:border-[#B98F32]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <Icon className={`size-4 ${isSelected ? 'text-[#dcc17b]' : 'text-[#96711e]'}`} />
                        {isSelected && <span className="size-1.5 rounded-full bg-[#dcc17b]" />}
                      </div>
                      <span className="font-bold leading-tight">{domain.label}</span>
                    </button>
                  )
                })}
              </div>

              <input type="hidden" name="domainGroup" value={domainConfig.label} />
            </div>

            {/* DOMAIN SPECIFIC SPECIALIZATION */}
            <div>
              <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-[#021329]">
                2. Market-Related Specialization <span className="text-[#B98F32]">*</span>
              </label>
              <select required name="specialization" data-label="Specialization" className={selectCls}>
                <option value="">Select Specialization under {domainConfig.label}</option>
                {domainConfig.specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* APPLICANT BASICS */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-[#021329]">
                  Full Name <span className="text-[#B98F32]">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  data-label="Full Name"
                  placeholder="e.g. John Doe"
                  className={inputCls}
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-[#021329]">
                  Phone / WhatsApp <span className="text-[#B98F32]">*</span>
                </label>
                <input
                  required
                  type="tel"
                  name="mobile"
                  data-label="Phone / WhatsApp"
                  placeholder="+91 98765 43210"
                  className={inputCls}
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-[#021329]">
                  Email Address <span className="text-[#B98F32]">*</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  data-label="Email"
                  placeholder="you@domain.com"
                  className={inputCls}
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-[#021329]">
                  Current City & State <span className="text-[#B98F32]">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="city"
                  data-label="City & State"
                  placeholder="e.g. Aligarh, UP / Delhi"
                  className={inputCls}
                />
              </div>
            </div>

            {/* EDUCATION & DEGREE (B.E., B.Com, BBA, MBA, etc.) */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-[#021329]">
                  Degree & Background <span className="text-[#B98F32]">*</span>
                </label>
                <select required name="degreeBackground" data-label="Degree Background" className={selectCls}>
                  <option value="">Select Degree / Educational Stream</option>
                  <option value="B.E. / B.Tech (Engineering & Tech)">B.E. / B.Tech (Engineering & Tech)</option>
                  <option value="BBA / MBA (Business & Management)">BBA / MBA (Business & Management)</option>
                  <option value="B.Com / M.Com (Commerce & Accounts)">B.Com / M.Com (Commerce & Accounts)</option>
                  <option value="CA / CMA / CS / CFA Aspirant">CA / CMA / CS / CFA Aspirant</option>
                  <option value="BA / MA Economics / Finance">BA / MA Economics / Finance</option>
                  <option value="BCA / MCA / Computer Science">BCA / MCA / Computer Science</option>
                  <option value="Other Degree / Self-Taught Operator">Other Degree / Self-Taught Operator</option>
                </select>
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-[#021329]">
                  Current Academic Status <span className="text-[#B98F32]">*</span>
                </label>
                <select required name="academicStatus" data-label="Academic Status" className={selectCls}>
                  <option value="">Select Status</option>
                  <option value="1st / 2nd Year Student">1st / 2nd Year Student</option>
                  <option value="3rd / Final Year Student">3rd / Final Year Student</option>
                  <option value="Recent Graduate (0-1 Yrs Exp)">Recent Graduate (0-1 Yrs Exp)</option>
                  <option value="Postgraduate Student">Postgraduate Student</option>
                  <option value="Working Professional / Career Switch">Working Professional / Career Switch</option>
                </select>
              </div>
            </div>

            {/* RESPECTIVE DAYS & JOINING TIMELINE */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="flex items-center gap-1.5 mb-1.5 text-xs font-bold uppercase tracking-wider text-[#021329]">
                  <Calendar className="size-3.5 text-[#96711e]" />
                  <span>Respective Days / Schedule</span> <span className="text-[#B98F32]">*</span>
                </label>
                <select required name="weeklyDays" data-label="Respective Days & Schedule" className={selectCls}>
                  <option value="">Select Commitment Days</option>
                  <option value="6 Days / Week (Full-Time Onsite - Aligarh HQ)">
                    6 Days / Week (Full-Time Onsite - Aligarh HQ)
                  </option>
                  <option value="5 Days / Week (Full-Time Hybrid - Mon to Fri)">
                    5 Days / Week (Full-Time Hybrid - Mon to Fri)
                  </option>
                  <option value="4 Days / Week (Flexible Hybrid Schedule)">
                    4 Days / Week (Flexible Hybrid Schedule)
                  </option>
                  <option value="3–4 Days / Week (Part-Time / Student Schedule)">
                    3–4 Days / Week (Part-Time / Student Schedule)
                  </option>
                  <option value="Flexible Evening & Weekend Fellowship">
                    Flexible Evening & Weekend Fellowship
                  </option>
                </select>
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-[#021329]">
                  Earliest Joining Day <span className="text-[#B98F32]">*</span>
                </label>
                <select required name="joiningDay" data-label="Earliest Joining Day" className={selectCls}>
                  <option value="">Select Starting Day</option>
                  <option value="Immediate (Within 48 Hours)">Immediate (Within 48 Hours)</option>
                  <option value="Starting Next Monday">Starting Next Monday</option>
                  <option value="Within Next 15 Days">Within Next 15 Days</option>
                  <option value="1st of Next Month">1st of Next Month</option>
                  <option value="Flexible / After Semester Exams">Flexible / After Semester Exams</option>
                </select>
              </div>
            </div>

            {/* Specific Preferred Days input for user convenience */}
            <div>
              <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-[#021329]">
                Specific Preferred Days <span className="text-slate-400 font-normal lowercase">(optional note)</span>
              </label>
              <input
                type="text"
                name="specificDays"
                data-label="Specific Preferred Days"
                placeholder="e.g. Monday to Friday, Mon-Wed-Fri, Weekends only, or All 6 Days"
                className={inputCls}
              />
            </div>

            {/* RESUME & MOTIVATION */}
            <div>
              <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-[#021329]">
                Resume / LinkedIn / Portfolio URL <span className="text-[#B98F32]">*</span>
              </label>
              <input
                required
                type="text"
                name="resumeUrl"
                data-label="Resume / Portfolio Link"
                placeholder="drive.google.com/... or linkedin.com/in/... or portfolio URL"
                className={inputCls}
              />
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-[#021329]">
                Why do you want to intern at YABN? <span className="text-[#B98F32]">*</span>
              </label>
              <textarea
                required
                name="motivation"
                data-label="Motivation"
                rows={2}
                placeholder="Share your goals and what you want to learn under Yasir Ali's mentorship..."
                className={inputCls}
              />
            </div>

            {/* Error Message & Instant Failover Options */}
            {error && (
              <div className="rounded-2xl bg-amber-50/90 border border-amber-300 p-4 text-xs text-[#021329] space-y-3">
                <div className="flex items-start gap-2 text-amber-950 font-medium">
                  <span className="text-base leading-none">⚠️</span>
                  <span className="leading-relaxed">{error}</span>
                </div>

                {lastSubmission && (
                  <div className="pt-2.5 border-t border-amber-200/80 space-y-2">
                    <p className="text-[11px] font-bold text-[#021329] uppercase tracking-wider">
                      Instant Direct Backup Options (1-Click Send):
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      <a
                        href={`https://wa.me/918439417079?text=${encodeURIComponent(
                          `*YABN Venture Fellowship Application*\n\n` +
                          `• Name: ${lastSubmission['Applicant Name'] || ''}\n` +
                          `• Domain: ${lastSubmission['Target Domain'] || ''}\n` +
                          `• Track: ${lastSubmission['Specific Specialization'] || ''}\n` +
                          `• WhatsApp: ${lastSubmission['Phone / WhatsApp'] || ''}\n` +
                          `• Email: ${lastSubmission['Email Address'] || ''}\n` +
                          `• City: ${lastSubmission['City & State'] || ''}\n` +
                          `• Degree: ${lastSubmission['Degree & Background'] || ''}\n` +
                          `• Academic Status: ${lastSubmission['Academic Status'] || ''}\n` +
                          `• Respective Days: ${lastSubmission['Respective Working Days'] || ''}\n` +
                          `• Preferred Days: ${lastSubmission['Specific Preferred Days'] || ''}\n` +
                          `• Earliest Joining: ${lastSubmission['Earliest Joining Day'] || ''}\n` +
                          `• Resume: ${lastSubmission['Resume / Portfolio'] || ''}\n\n` +
                          `• Motivation:\n${lastSubmission['Motivation & Objectives'] || ''}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
                      >
                        <span>Send via WhatsApp (+91 84394 17079)</span>
                      </a>

                      <a
                        href={`mailto:${INBOX}?subject=${encodeURIComponent(
                          `[YABN Internship Application] ${lastSubmission['Applicant Name'] || 'Applicant'}`
                        )}&body=${encodeURIComponent(
                          `YABN Internship Application Details:\n\n` +
                          `Name: ${lastSubmission['Applicant Name'] || ''}\n` +
                          `Domain: ${lastSubmission['Target Domain'] || ''}\n` +
                          `Specialization: ${lastSubmission['Specific Specialization'] || ''}\n` +
                          `Phone / WhatsApp: ${lastSubmission['Phone / WhatsApp'] || ''}\n` +
                          `Email: ${lastSubmission['Email Address'] || ''}\n` +
                          `City & State: ${lastSubmission['City & State'] || ''}\n` +
                          `Degree & Background: ${lastSubmission['Degree & Background'] || ''}\n` +
                          `Academic Status: ${lastSubmission['Academic Status'] || ''}\n` +
                          `Respective Working Days: ${lastSubmission['Respective Working Days'] || ''}\n` +
                          `Specific Preferred Days: ${lastSubmission['Specific Preferred Days'] || ''}\n` +
                          `Earliest Joining Day: ${lastSubmission['Earliest Joining Day'] || ''}\n` +
                          `Resume / Portfolio: ${lastSubmission['Resume / Portfolio'] || ''}\n\n` +
                          `Motivation & Objectives:\n${lastSubmission['Motivation & Objectives'] || ''}`
                        )}`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#021329] px-3.5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#B98F32] transition-colors"
                      >
                        <span>Send via Email ({INBOX})</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B98F32] via-[#cca244] to-[#B98F32] px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#021329] shadow-lg shadow-[#B98F32]/25 transition-all hover:brightness-110 active:scale-95 disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-[#021329]" />
                    <span>Transmitting to {INBOX}...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Internship Application</span>
                    <ChevronRight className="size-4 text-[#021329]" />
                  </>
                )}
              </button>
              <p className="mt-2 text-center text-[11px] text-slate-400">
                Application is securely transmitted to <strong>{INBOX}</strong>.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

/* Mounts the detailed fellowship application modal once for the whole home page.
   The navbar, footer and the apply form open it with an 'open-internship-modal' event;
   arriving from another page (sessionStorage flag) or via #apply-internship opens it straight away. */
export default function InternshipPortal() {
  const [isModalOpen, setIsModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('open_internship_modal') === 'true') {
        sessionStorage.removeItem('open_internship_modal')
        return true
      }
      if (window.location.hash === '#apply-internship') {
        return true
      }
    }
    return false
  })
  const [modalDomain, setModalDomain] = useState('business')
  const [modalTrackTitle, setModalTrackTitle] = useState('')

  useEffect(() => {
    const handleOpen = (e) => {
      if (e?.detail?.domain && DOMAINS[e.detail.domain]) {
        setModalDomain(e.detail.domain)
      }
      if (e?.detail?.trackTitle) {
        setModalTrackTitle(e.detail.trackTitle)
      }
      setIsModalOpen(true)
    }
    window.addEventListener('open-internship-modal', handleOpen)
    return () => window.removeEventListener('open-internship-modal', handleOpen)
  }, [])

  return (
    <InternshipModal
      key={`${modalDomain}_${isModalOpen ? 'open' : 'closed'}`}
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      defaultDomain={modalDomain}
      defaultTrackTitle={modalTrackTitle}
    />
  )
}
