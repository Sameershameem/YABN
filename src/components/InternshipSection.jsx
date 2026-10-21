import { useEffect, useRef, useState } from 'react'
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Coins,
  Cpu,
  Loader2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { Container } from './ui'
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

const FELLOWSHIP_TRACKS = [
  {
    id: 'track-bd',
    domainKey: 'business',
    number: '01',
    title: 'Business Development & Revenue Architecture',
    badge: 'Business & Sales',
    duration: '3 - 6 Months',
    stipend: 'Stipend + Performance Incentives',
    focus:
      'Learn the art of consultative B2B selling, enterprise outbound pipeline generation, proposal drafting, and client relationship management.',
    deliverables: [
      'Master high-ticket B2B sales pipelines and cold outreach architectures',
      'Conduct diagnostic calls with restaurant owners and MSME founders',
      'Draft high-conversion proposals and calculate lifetime customer value (LTV)',
    ],
  },
  {
    id: 'track-ops',
    domainKey: 'business',
    number: '02',
    title: 'Operations & Multi-Outlet SOP Engineering',
    badge: 'Operations & Systems',
    duration: '3 - 6 Months',
    stipend: 'Stipend + Performance Incentives',
    focus:
      'Shadow on-ground business audits, build standard operating procedures for multi-unit restaurants, and automate inventory monitoring.',
    deliverables: [
      'Map daily kitchen and store workflows into repeatable checklists',
      'Identify food wastage leakages and audit supplier procurement invoices',
      'Implement digital manager checklists that liberate the founder',
    ],
  },
  {
    id: 'track-growth',
    domainKey: 'marketing',
    number: '03',
    title: 'Growth Marketing & Performance Media',
    badge: 'Marketing & Scale',
    duration: '3 - 6 Months',
    stipend: 'Stipend + Performance Incentives',
    focus:
      'Engineer real ad campaigns with real budget. Optimize ROAS across Meta, Google, and short-form video funnels that drive real footfall and leads.',
    deliverables: [
      'Build localized Meta ad campaigns for dining and service businesses',
      'Script and produce high-converting short-form founder video assets',
      'Track lead velocity, cost-per-acquisition (CPA), and conversion funnels',
    ],
  },
  {
    id: 'track-finance',
    domainKey: 'finance',
    number: '04',
    title: 'Financial Modeling & Unit Economics',
    badge: 'Finance & P&L',
    duration: '3 - 6 Months',
    stipend: 'Stipend + Performance Incentives',
    focus:
      'Dive deep into profit & loss statements, cash flow forecasting, working capital cycles, and debt-free expansion strategies.',
    deliverables: [
      'Re-engineer restaurant contribution margins and raw food cost percentages',
      'Build 90-day rolling cash flow forecasting models in Excel',
      'Prepare franchise investment decks and unit economic scorecards',
    ],
  },
  {
    id: 'track-tech',
    domainKey: 'tech',
    number: '05',
    title: 'B.E. Systems, Automation & Tech Infrastructure',
    badge: 'B.E. & Tech',
    duration: '3 - 6 Months',
    stipend: 'Stipend + Performance Incentives',
    focus:
      'Engineer business automations, CRM pipelines, executive KPI dashboards, and web systems for growing businesses and startup ventures.',
    deliverables: [
      'Build webhook & no-code pipelines connecting Meta leads directly into CRM systems',
      'Deploy real-time business intelligence scorecards and margin tracking dashboards',
      'Develop high-converting landing pages and automated client WhatsApp notifications',
    ],
  },
]

const PERKS = [
  {
    icon: Users,
    title: 'Direct 1-on-1 Mentorship',
    text: 'Weekly review sessions directly with Yasir Ali and senior business leaders. No middle managers or busywork.',
  },
  {
    icon: Zap,
    title: 'Live Enterprise Work',
    text: 'Work on actual businesses with real balance sheets, customer transactions, and measurable growth targets.',
  },
  {
    icon: Award,
    title: 'Competitive Stipend + Certificate',
    text: 'Monthly performance-linked stipend, official experience certification, and letters of recommendation.',
  },
  {
    icon: Target,
    title: 'Fast-Track PPO Opportunities',
    text: 'Top 15% fellows receive direct Pre-Placement Offers (PPOs) into YABN portfolio startups and core team.',
  },
]

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
      'Resume / Portfolio': rawData.resumeUrl,
      'Motivation & Objectives': rawData.motivation,
      'Selected Track': defaultTrackTitle || rawData.specialization,
      'Routing Recipient': INBOX,
    }

    try {
      await sendForm(subject, payload)
      setApplicantName(rawData.name?.split(' ')[0] || 'Applicant')
      setStatus('sent')
      form.reset()
    } catch (err) {
      setError(err.message || 'Unable to transmit application. Please check your connection and try again.')
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
                type="url"
                name="resumeUrl"
                data-label="Resume / Portfolio Link"
                placeholder="https://drive.google.com/... or https://linkedin.com/in/..."
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

            {/* Error Message */}
            {error && (
              <div className="rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">{error}</div>
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

export default function InternshipSection() {
  const [selectedTrack, setSelectedTrack] = useState('track-bd')
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

  const activeTrack = FELLOWSHIP_TRACKS.find((t) => t.id === selectedTrack) || FELLOWSHIP_TRACKS[0]

  const handleOpenForm = (track) => {
    setModalDomain(track?.domainKey || 'business')
    setModalTrackTitle(track?.title || '')
    setIsModalOpen(true)
  }

  // Support open-internship-modal event from Navbar or Footer
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
    <section id="internships" className="relative bg-[#ffffff] py-20 sm:py-28 border-t border-slate-100 scroll-mt-24">
      {/* Subtle Architectural Grid Lines */}
      <div className="absolute inset-0 max-w-[1320px] mx-auto pointer-events-none -z-10 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8">
        <div className="border-r border-slate-100 h-full" />
        <div className="border-r border-slate-100 h-full" />
        <div className="border-r border-slate-100 h-full" />
        <div className="border-r border-slate-100 h-full" />
        <div className="border-r border-slate-100 h-full hidden sm:block" />
        <div className="border-r border-slate-100 h-full hidden sm:block" />
        <div className="border-r border-slate-100 h-full hidden lg:block" />
        <div className="border-r border-slate-100 h-full hidden lg:block" />
      </div>

      <Container className="max-w-[1320px]">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <button
            type="button"
            onClick={() => handleOpenForm(activeTrack)}
            className="inline-flex items-center gap-2 rounded-full border border-[#B98F32]/40 bg-[#fcf8ee] px-4 py-1 text-[11px] font-bold tracking-[0.16em] uppercase text-[#96711e] shadow-xs hover:bg-[#B98F32] hover:text-[#021329] transition-all cursor-pointer"
          >
            <span className="size-1.5 rounded-full bg-[#96711e]" />
            <span>YABN VENTURE FELLOWSHIP · CLICK TO APPLY DIRECTLY</span>
          </button>

          <h2 className="mt-5 text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold tracking-tight text-[#021329] leading-[1.15]">
            Step Out of the Classroom.{' '}
            <span className="font-serif italic font-normal text-[#96711e]">Build Real Businesses</span>{' '}
            with Yasir Ali
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl mx-auto font-normal">
            No mundane coffee runs or theoretical case studies. Work directly alongside seasoned founders on live P&L
            turnarounds, growth engineering, and enterprise systems.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => handleOpenForm(activeTrack)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B98F32] via-[#cca244] to-[#B98F32] px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#021329] shadow-lg shadow-[#B98F32]/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="size-4" />
              <span>Apply for Internship (Open Direct Form)</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars of the Fellowship */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((perk, i) => {
            const Icon = perk.icon
            return (
              <div
                key={i}
                className="group rounded-2xl border border-slate-200/90 bg-[#fafafa] p-6 transition-all duration-300 hover:border-[#B98F32]/50 hover:bg-white hover:shadow-lg"
              >
                <div className="size-11 rounded-xl bg-[#021329] text-[#dcc17b] flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-[#021329]">{perk.title}</h3>
                <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600">{perk.text}</p>
              </div>
            )
          })}
        </div>

        {/* Fellowship Tracks Console */}
        <div className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#96711e]">
                MARKET-ALIGNED DOMAINS & TRACKS
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#021329] tracking-tight">
                Choose Your High-Growth Specialization
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cohorts Enrolling Now (Onsite & Hybrid)</span>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.6fr] items-start">
            {/* Track Selector Buttons */}
            <div className="space-y-3">
              {FELLOWSHIP_TRACKS.map((track) => {
                const isSelected = selectedTrack === track.id
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => {
                      setSelectedTrack(track.id)
                    }}
                    className={`w-full text-left rounded-2xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between border cursor-pointer ${
                      isSelected
                        ? 'bg-[#021329] text-white border-[#021329] shadow-md shadow-[#021329]/15'
                        : 'bg-[#fafafa] text-[#021329] border-slate-200 hover:border-[#B98F32]/50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-mono font-bold ${
                              isSelected ? 'text-[#dcc17b]' : 'text-slate-400'
                            }`}
                          >
                            {track.number}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              isSelected ? 'bg-white/15 text-[#dcc17b]' : 'bg-slate-200/70 text-slate-600'
                            }`}
                          >
                            {track.badge}
                          </span>
                        </div>
                        <h4 className="mt-2 text-sm sm:text-base font-bold leading-snug">{track.title}</h4>
                      </div>
                      <ChevronRight
                        className={`size-5 mt-1 shrink-0 transition-transform ${
                          isSelected ? 'text-[#dcc17b] translate-x-1' : 'text-slate-400'
                        }`}
                      />
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-200/40 flex items-center justify-between text-[11px] w-full">
                      <span className={isSelected ? 'text-slate-300' : 'text-slate-500'}>
                        {track.duration} · {track.badge}
                      </span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenForm(track)
                        }}
                        className={`font-bold hover:underline inline-flex items-center gap-1 ${
                          isSelected ? 'text-[#dcc17b]' : 'text-[#96711e]'
                        }`}
                      >
                        Apply Directly →
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Track Detail Showcase */}
            <div className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono font-bold text-[#96711e]">
                    TRACK {activeTrack.number} OVERVIEW
                  </span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-white px-3 py-1 font-semibold text-[#021329] border border-slate-200 shadow-2xs">
                      ⏳ {activeTrack.duration}
                    </span>
                    <span className="rounded-full bg-[#fcf8ee] px-3 py-1 font-bold text-[#96711e] border border-[#B98F32]/30 shadow-2xs">
                      💰 {activeTrack.stipend}
                    </span>
                  </div>
                </div>

                <h4 className="mt-4 text-xl sm:text-2xl font-extrabold text-[#021329]">
                  {activeTrack.title}
                </h4>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                  {activeTrack.focus}
                </p>

                <div className="mt-6 pt-6 border-t border-slate-200/80">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#021329]">
                    What You Will Execute & Master:
                  </p>
                  <ul className="mt-3.5 space-y-2.5">
                    {activeTrack.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="size-4 shrink-0 text-[#96711e] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons: Opens Form Directly */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenForm(activeTrack)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#021329] px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#B98F32] active:scale-95 cursor-pointer"
                >
                  <span>Apply for this Track (Direct Form)</span>
                  <ChevronRight className="size-4 text-[#dcc17b]" />
                </button>

                <a
                  href={`https://wa.me/919045417079?text=${encodeURIComponent(
                    `Hi Yasir Ali & YABN Team, I want to apply for the ${activeTrack.title} Internship Track.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-300 px-5 py-3.5 text-xs sm:text-sm font-semibold text-slate-700 transition-colors hover:border-[#021329] hover:text-[#021329]"
                >
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Direct Banner at the bottom of track section */}
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#021329] to-[#052249] p-6 sm:p-7 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg border border-white/10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#dcc17b]">
                DIRECT FELLOWSHIP APPLICATION
              </span>
              <h4 className="text-base sm:text-lg font-bold mt-1 text-white">
                Ready to accelerate in Marketing, Business, Finance, or B.E.?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Click to open the direct application form. All submissions route directly to <strong>{INBOX}</strong>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenForm(activeTrack)}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#B98F32] via-[#cca244] to-[#B98F32] px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#021329] shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="size-4" />
              <span>Fill Form Directly</span>
            </button>
          </div>
        </div>
      </Container>

      {/* Render the Direct Interactive Internship Modal */}
      <InternshipModal
        key={`${modalDomain}_${isModalOpen ? 'open' : 'closed'}`}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultDomain={modalDomain}
        defaultTrackTitle={modalTrackTitle}
      />
    </section>
  )
}
