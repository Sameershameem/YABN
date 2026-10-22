import { useState, useEffect } from 'react'
import {
  Briefcase,
  UtensilsCrossed,
  GraduationCap,
  Building2,
  Users,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Award,
} from 'lucide-react'
import { sendForm, readForm, INBOX } from '../lib/submit'
import { Container, SectionHead } from './ui'

export const CATEGORIES = [
  {
    id: 'freelancer',
    label: 'Freelancer',
    icon: Briefcase,
    badge: 'Solo to Scale',
    title: 'Business Frameworks for Freelancers',
    tagline: 'Transition from unpredictable project gigs to high-value retainers and agency systems.',
    benefits: [
      'Stop underpricing: Value-based pricing and retainer models',
      'Zero-Dollar client acquisition & personal branding',
      'High-conversion client proposals & contract security',
      'Blueprint to hire subcontractors and scale into an agency',
    ],
  },
  {
    id: 'restaurant',
    label: 'Restaurant & Food',
    icon: UtensilsCrossed,
    badge: 'F&B Operations',
    title: 'Growth & Margin Systems for Food Businesses',
    tagline: 'Fix food costing, boost weekday footfalls, and build standard operating procedures (SOPs).',
    benefits: [
      'Food costing control & inventory wastage reduction',
      'Weekday footfall multipliers & hyper-local digital marketing',
      'Kitchen SOPs, recipe standardization & staff retention',
      'Direct order systems to reduce delivery aggregator fees',
    ],
  },
  {
    id: 'academy',
    label: 'YABN Academy',
    icon: GraduationCap,
    badge: 'Students & Founders',
    title: 'Practical Business Education & 0-to-1 Launch',
    tagline: 'Real-world entrepreneurship training that bridges textbook theory with market execution.',
    benefits: [
      'Customer discovery, problem validation & MVP launch',
      'Sales mastery: Pitching, objection handling & closing',
      'Finance for Non-Finance: Cash flow, margins & pricing',
      'Direct mentorship access under Yasir Ali and guest founders',
    ],
  },
  {
    id: 'partner',
    label: 'Business Partner',
    icon: Building2,
    badge: 'Expansion & Co-venture',
    title: 'Strategic Expansion, Franchising & Investment',
    tagline: 'Collaborate on territorial expansions, franchise networks, and high-impact business ventures.',
    benefits: [
      'Franchise network expansion and territory exclusivity',
      'Co-investment and growth scaling opportunities',
      'Corporate governance, scaling systems & IPO readiness guidance',
      'Synergistic distribution and enterprise business partnerships',
    ],
  },
  {
    id: 'collaborator',
    label: 'Collaborator & Mentor',
    icon: Users,
    badge: 'Ecosystem Mentors',
    title: 'Industry Mentorship, Masterclasses & Synergies',
    tagline: 'Join the YABN mentor council to train, inspire, and advise the next generation of founders.',
    benefits: [
      'Host featured masterclasses and guest workshops',
      'Advise curated startups in the Mission 100 cohort',
      'Joint events, panels, and digital thought leadership',
      'Network with elite founders, educators, and enterprise leaders',
    ],
  },
  {
    id: 'internship',
    label: 'Internship & Fellows',
    icon: Award,
    badge: 'Youth & Venture Fellowship',
    title: 'YABN Venture Fellowship & Internship Program',
    tagline: 'Practical hands-on incubation, real market operations, and direct mentorship under Yasir Ali.',
    benefits: [
      'Hands-on experience in business operations, sales & cash flow systems',
      'Direct 1-on-1 mentorship sessions with Yasir Ali & industry leaders',
      'Performance-linked monthly stipend and formal completion credential',
      'Fast-track Pre-Placement Offers (PPOs) for top-performing fellows',
    ],
  },
]

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#021329] placeholder:text-slate-400 transition-all focus:border-[#B98F32] focus:outline-none focus:ring-4 focus:ring-[#B98F32]/15'

const selectCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#021329] transition-all focus:border-[#B98F32] focus:outline-none focus:ring-4 focus:ring-[#B98F32]/15'

function FormField({ label, required = false, children, className = '' }) {
  return (
    <label className={`block text-left ${className}`}>
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
        {label} {required && <span className="text-[#B98F32]">*</span>}
      </span>
      {children}
    </label>
  )
}

export default function SegmentedQueryHub({ defaultTab = 'freelancer' }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [error, setError] = useState('')
  const [submittedData, setSubmittedData] = useState(null)

  useEffect(() => {
    const checkHashAndParams = () => {
      const hash = window.location.hash
      const params = new URLSearchParams(window.location.search)
      const catParam = params.get('category') || params.get('tab')
      if (catParam && CATEGORIES.some((c) => c.id === catParam)) {
        setActiveTab(catParam)
        return
      }
      if (hash.includes('internship')) {
        setActiveTab('internship')
      } else if (hash.includes('freelancer')) {
        setActiveTab('freelancer')
      } else if (hash.includes('restaurant')) {
        setActiveTab('restaurant')
      } else if (hash.includes('academy')) {
        setActiveTab('academy')
      } else if (hash.includes('partner')) {
        setActiveTab('partner')
      } else if (hash.includes('collaborator')) {
        setActiveTab('collaborator')
      }
    }
    checkHashAndParams()
    window.addEventListener('hashchange', checkHashAndParams)
    return () => window.removeEventListener('hashchange', checkHashAndParams)
  }, [])

  const [lastSubmission, setLastSubmission] = useState(null)

  const currentCategory = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const rawData = readForm(form)
    setError('')
    setStatus('sending')

    const subject = `[YABN Query: ${currentCategory.label}] ${rawData.Name || 'Visitor'} (${rawData['Phone / WhatsApp'] || rawData.Email || ''})`

    const payload = {
      'Query Category': currentCategory.label,
      'Target Track': currentCategory.title,
      ...rawData,
    }

    if (payload.linkedin && !payload.linkedin.startsWith('http')) {
      payload.linkedin = `https://${payload.linkedin}`
    }
    if (payload.resumeLink && !payload.resumeLink.startsWith('http')) {
      payload.resumeLink = `https://${payload.resumeLink}`
    }

    setLastSubmission(payload)

    try {
      await sendForm(subject, payload)
      setSubmittedData({
        category: currentCategory.label,
        name: rawData.Name || 'Valued Partner',
        email: rawData.Email,
        phone: rawData['Phone / WhatsApp'],
      })
      setStatus('sent')
      form.reset()
    } catch (err) {
      setError(err.message || 'Unable to submit your query. Please check your connection or send directly below.')
      setStatus('idle')
    }
  }

  return (
    <section id="inquiry-hub" className="scroll-mt-24 bg-white pb-20 sm:pb-28">
      <Container>
        <SectionHead
          n={6}
          title="Tell us where you [are]"
          aside="Choose your category for a focused diagnostic form. Every inquiry is read by Yasir Ali and the YABN team."
        />

        {/* Category switcher */}
        <div className="no-scrollbar mt-12 -mx-5 flex gap-1 overflow-x-auto border-y border-slate-200 px-5 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const isSelected = activeTab === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveTab(cat.id)
                  setError('')
                  if (status === 'sent') setStatus('idle')
                }}
                aria-pressed={isSelected}
                className={`relative inline-flex shrink-0 items-center gap-2 px-4 py-4 text-[13px] font-medium whitespace-nowrap transition-colors ${
                  isSelected ? 'text-[#021329]' : 'text-slate-400 hover:text-[#021329]'
                }`}
              >
                <Icon className={`size-4 ${isSelected ? 'text-[#B98F32]' : 'text-slate-300'}`} strokeWidth={1.75} />
                <span>{cat.label}</span>
                <span
                  className={`absolute inset-x-3 -bottom-px h-0.5 origin-left bg-[#021329] transition-transform duration-300 ${
                    isSelected ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            )
          })}
        </div>

        {/* Main Form & Context Grid */}
        <div className="mt-8 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
          <div className="grid lg:grid-cols-[1.1fr_1.4fr]">
            
            {/* Left Context Column: What YABN Provides for This Specific Audience */}
            <div className="bg-[#021329] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 size-60 rounded-full bg-[#B98F32]/10 blur-3xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#dcc17b] ring-1 ring-white/15">
                  <Sparkles className="size-3" />
                  <span>{currentCategory.badge}</span>
                </div>

                <h3 className="mt-5 text-2xl sm:text-3xl font-medium tracking-tight text-white leading-tight">
                  {currentCategory.title}
                </h3>

                <p className="mt-3.5 text-sm sm:text-base text-white/80 leading-relaxed font-light">
                  {currentCategory.tagline}
                </p>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#dcc17b]">
                    What We Solve Together:
                  </p>
                  <ul className="mt-4 space-y-3">
                    {currentCategory.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white/90">
                        <CheckCircle2 className="size-4.5 shrink-0 text-[#B98F32] mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Trust Callout */}
              <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-4 text-xs text-white/70">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#dcc17b]">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Direct Advisory Routing</p>
                  <p>Inquiries sent directly to <span className="text-[#dcc17b]">{INBOX}</span></p>
                </div>
              </div>
            </div>

            {/* Right Form Column: Category-Specific Tailored Fields */}
            <div className="p-7 sm:p-10 bg-white">
              {status === 'sent' && submittedData ? (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-rise">
                  <div className="flex size-16 items-center justify-center rounded-full bg-[#fbf7ee] text-[#B98F32] shadow-inner">
                    <CheckCircle2 className="size-8" strokeWidth={2} />
                  </div>
                  <h4 className="mt-5 text-2xl font-bold text-[#021329]">
                    Thank You, {submittedData.name}!
                  </h4>
                  <p className="mt-2 text-sm text-slate-600 max-w-md">
                    Your <strong className="text-[#021329] font-semibold">{submittedData.category}</strong> inquiry has been successfully transmitted to Yasir Ali and the YABN advisory council.
                  </p>

                  <div className="mt-6 rounded-2xl bg-[#f8fafc] border border-slate-200 p-4 text-left w-full max-w-md text-xs space-y-2">
                    <div className="flex justify-between text-slate-500">
                      <span>Routing Inbox:</span>
                      <strong className="text-[#021329]">{INBOX}</strong>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Expected Response:</span>
                      <strong className="text-[#B98F32] flex items-center gap-1">
                        <Clock className="size-3" /> Within 24 Hours
                      </strong>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Communication Channel:</span>
                      <strong className="text-[#021329]">WhatsApp / Phone Call</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#021329] px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#B98F32]"
                  >
                    <span>Submit Another Inquiry</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h4 className="text-base font-bold text-[#021329]">
                      {currentCategory.label} Inquiry Form
                    </h4>
                    <span className="text-xs text-slate-400">All fields routed safely</span>
                  </div>

                  {/* Honeypot Bot Trap */}
                  <input
                    type="text"
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />

                  {/* Common Contact Basics */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Full Name" required>
                      <input
                        required
                        type="text"
                        name="name"
                        data-label="Full Name"
                        placeholder="e.g. John Doe"
                        className={inputCls}
                        autoComplete="name"
                      />
                    </FormField>

                    <FormField label="Phone / WhatsApp" required>
                      <input
                        required
                        type="tel"
                        name="mobile"
                        data-label="Phone / WhatsApp"
                        placeholder="+91 98765 43210"
                        className={inputCls}
                        autoComplete="tel"
                      />
                    </FormField>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Email Address" required>
                      <input
                        required
                        type="email"
                        name="email"
                        data-label="Email"
                        placeholder="you@domain.com"
                        className={inputCls}
                        autoComplete="email"
                      />
                    </FormField>

                    <FormField label="City & State" required>
                      <input
                        required
                        type="text"
                        name="city"
                        data-label="City & State"
                        placeholder="e.g. Aligarh, UP"
                        className={inputCls}
                      />
                    </FormField>
                  </div>

                  {/* CATEGORY-SPECIFIC FIELDS */}

                  {/* 1. FREELANCER SPECIFIC */}
                  {activeTab === 'freelancer' && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Core Skill / Domain" required>
                          <select required name="skill" data-label="Core Skill" className={selectCls}>
                            <option value="">Choose Skill</option>
                            <option value="Web / App Development">Web / App Development</option>
                            <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                            <option value="Performance & Social Marketing">Performance & Social Marketing</option>
                            <option value="Video Editing & Content Creation">Video Editing & Content Creation</option>
                            <option value="Sales / Copywriting / Consulting">Sales / Copywriting / Consulting</option>
                            <option value="Other High-Income Skill">Other High-Income Skill</option>
                          </select>
                        </FormField>

                        <FormField label="Current Monthly Earnings" required>
                          <select required name="revenue" data-label="Monthly Revenue" className={selectCls}>
                            <option value="">Select Range</option>
                            <option value="Under ₹30,000 / month">Under ₹30,000 / month</option>
                            <option value="₹30,000 – ₹75,000 / month">₹30,000 – ₹75,000 / month</option>
                            <option value="₹75,000 – ₹2,00,000 / month">₹75,000 – ₹2,00,000 / month</option>
                            <option value="₹2,00,000+ / month">₹2,00,000+ / month (Scaling to Agency)</option>
                          </select>
                        </FormField>
                      </div>

                      <FormField label="Your Biggest Growth Hurdle" required>
                        <select required name="hurdle" data-label="Biggest Growth Hurdle" className={selectCls}>
                          <option value="">Select Primary Challenge</option>
                          <option value="Finding high-paying clients consistently">Finding high-paying clients consistently</option>
                          <option value="Clients bargaining / cannot charge premium rates">Clients bargaining / cannot charge premium rates</option>
                          <option value="Trapped doing all work alone / need to hire a team">Trapped doing all work alone / need to hire a team</option>
                          <option value="Converting one-time projects into monthly retainers">Converting one-time projects into monthly retainers</option>
                        </select>
                      </FormField>

                      <FormField label="Portfolio or LinkedIn Profile (Optional)">
                        <input
                          type="url"
                          name="portfolio"
                          data-label="Portfolio / Profile"
                          placeholder="https://behance.net/... or https://linkedin.com/in/..."
                          className={inputCls}
                        />
                      </FormField>
                    </>
                  )}

                  {/* 2. RESTAURANT SPECIFIC */}
                  {activeTab === 'restaurant' && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Restaurant / Brand Name" required>
                          <input
                            required
                            type="text"
                            name="restaurantName"
                            data-label="Restaurant Name"
                            placeholder="e.g. Spice Symphony Cafe"
                            className={inputCls}
                          />
                        </FormField>

                        <FormField label="Format / Business Model" required>
                          <select required name="format" data-label="Format" className={selectCls}>
                            <option value="">Select Model</option>
                            <option value="Casual Dine-in Restaurant">Casual Dine-in Restaurant</option>
                            <option value="Cafe / Bistro / Lounge">Cafe / Bistro / Lounge</option>
                            <option value="Quick Service Restaurant (QSR)">Quick Service Restaurant (QSR)</option>
                            <option value="Cloud Kitchen / Delivery Only">Cloud Kitchen / Delivery Only</option>
                            <option value="Bakery / Dessert Parlor">Bakery / Dessert Parlor</option>
                            <option value="Multi-Outlet Food Chain">Multi-Outlet Food Chain</option>
                          </select>
                        </FormField>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Number of Outlets" required>
                          <select required name="outlets" data-label="Number of Outlets" className={selectCls}>
                            <option value="1 Single Outlet">1 Single Outlet</option>
                            <option value="2 – 3 Outlets">2 – 3 Outlets</option>
                            <option value="4 – 10 Outlets">4 – 10 Outlets</option>
                            <option value="10+ Outlets (Franchise)">10+ Outlets (Franchise)</option>
                          </select>
                        </FormField>

                        <FormField label="Monthly Turnover" required>
                          <select required name="turnover" data-label="Monthly Turnover" className={selectCls}>
                            <option value="">Select Turnover</option>
                            <option value="Under ₹3 Lakhs">Under ₹3 Lakhs / month</option>
                            <option value="₹3 Lakhs – ₹8 Lakhs">₹3 Lakhs – ₹8 Lakhs / month</option>
                            <option value="₹8 Lakhs – ₹20 Lakhs">₹8 Lakhs – ₹20 Lakhs / month</option>
                            <option value="₹20 Lakhs+">₹20 Lakhs+ / month</option>
                          </select>
                        </FormField>
                      </div>

                      <FormField label="Primary Operational Problem" required>
                        <select required name="problem" data-label="Primary Problem" className={selectCls}>
                          <option value="">Select Focus Area</option>
                          <option value="High food cost (>32%) & raw material wastage">High food cost (&gt;32%) & raw material wastage</option>
                          <option value="Low table footfalls on weekdays / lack of marketing">Low table footfalls on weekdays / lack of marketing</option>
                          <option value="Staff attrition, lack of trained chefs & SOPs">Staff attrition, lack of trained chefs & SOPs</option>
                          <option value="Excessive aggregator commissions eating all margins">Excessive aggregator commissions eating all margins</option>
                        </select>
                      </FormField>
                    </>
                  )}

                  {/* 3. ACADEMY SPECIFIC */}
                  {activeTab === 'academy' && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Current Status" required>
                          <select required name="status" data-label="Current Status" className={selectCls}>
                            <option value="">Select Status</option>
                            <option value="College / University Student">College / University Student</option>
                            <option value="Fresh Graduate">Fresh Graduate</option>
                            <option value="Working Professional (Planning to quit)">Working Professional (Planning to quit)</option>
                            <option value="First-Time Founder (Idea Stage)">First-Time Founder (Idea Stage)</option>
                            <option value="Early-Stage Founder (Launched)">Early-Stage Founder (Launched)</option>
                          </select>
                        </FormField>

                        <FormField label="Target Program / Focus" required>
                          <select required name="targetProgram" data-label="Target Program" className={selectCls}>
                            <option value="">Select Program</option>
                            <option value="0-to-1 Startup Starter Program">0-to-1 Startup Starter Program</option>
                            <option value="High-Impact Sales & Negotiation Mastery">High-Impact Sales & Negotiation Mastery</option>
                            <option value="Finance For Non-Finance & Cash Flow">Finance For Non-Finance & Cash Flow</option>
                            <option value="Zero-Dollar Digital Marketing & Lead Gen">Zero-Dollar Digital Marketing & Lead Gen</option>
                            <option value="Mission 100 Founder Cohort (90 Days)">Mission 100 Founder Cohort (90 Days)</option>
                          </select>
                        </FormField>
                      </div>

                      <FormField label="Your Business Idea or Startup Goal" required>
                        <textarea
                          required
                          rows={2}
                          name="ideaGoal"
                          data-label="Business Idea / Goal"
                          placeholder="Briefly describe what venture or skill you want to build..."
                          className={inputCls}
                        />
                      </FormField>
                    </>
                  )}

                  {/* 4. BUSINESS PARTNER SPECIFIC */}
                  {activeTab === 'partner' && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Company / Entity Name" required>
                          <input
                            required
                            type="text"
                            name="company"
                            data-label="Company / Entity Name"
                            placeholder="e.g. Apex Global Ventures"
                            className={inputCls}
                          />
                        </FormField>

                        <FormField label="Your Designation" required>
                          <input
                            required
                            type="text"
                            name="designation"
                            data-label="Designation"
                            placeholder="e.g. Director, Managing Partner"
                            className={inputCls}
                          />
                        </FormField>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Partnership Category" required>
                          <select required name="partnerType" data-label="Partnership Category" className={selectCls}>
                            <option value="">Select Partnership Type</option>
                            <option value="Territory Franchise / Regional Center">Territory Franchise / Regional Center</option>
                            <option value="Co-Investment / Equity Backing">Co-Investment / Equity Backing</option>
                            <option value="Corporate Training & Employee Upskilling">Corporate Training & Employee Upskilling</option>
                            <option value="Distribution & Channel Alliance">Distribution & Channel Alliance</option>
                            <option value="Technology & Infrastructure Integration">Technology & Infrastructure Integration</option>
                          </select>
                        </FormField>

                        <FormField label="Target Capital / Resource Scope" required>
                          <select required name="capitalScope" data-label="Capital / Scope" className={selectCls}>
                            <option value="">Select Scope</option>
                            <option value="Under ₹10 Lakhs">Under ₹10 Lakhs</option>
                            <option value="₹10 Lakhs – ₹50 Lakhs">₹10 Lakhs – ₹50 Lakhs</option>
                            <option value="₹50 Lakhs – ₹2 Crores">₹50 Lakhs – ₹2 Crores</option>
                            <option value="₹2 Crores+ (Institutional / Enterprise)">₹2 Crores+ (Institutional / Enterprise)</option>
                          </select>
                        </FormField>
                      </div>
                    </>
                  )}

                  {/* 5. COLLABORATOR & MENTOR SPECIFIC */}
                  {activeTab === 'collaborator' && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Current Role & Organization" required>
                          <input
                            required
                            type="text"
                            name="roleOrg"
                            data-label="Role & Organization"
                            placeholder="e.g. Head of Growth at Tech Corp"
                            className={inputCls}
                          />
                        </FormField>

                        <FormField label="Domain of Expertise" required>
                          <select required name="expertise" data-label="Domain of Expertise" className={selectCls}>
                            <option value="">Select Domain</option>
                            <option value="Sales Mastery & High-Performance Teams">Sales Mastery & High-Performance Teams</option>
                            <option value="Corporate Finance, Cash Flow & IPO Prep">Corporate Finance, Cash Flow & IPO Prep</option>
                            <option value="Legal, Intellectual Property & Compliance">Legal, Intellectual Property & Compliance</option>
                            <option value="Supply Chain, Operations & Logistics">Supply Chain, Operations & Logistics</option>
                            <option value="Brand Positioning, PR & Influencer Growth">Brand Positioning, PR & Influencer Growth</option>
                            <option value="AI, CRM & Business Automation Tools">AI, CRM & Business Automation Tools</option>
                          </select>
                        </FormField>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Preferred Collaboration Format" required>
                          <select required name="collabFormat" data-label="Collaboration Format" className={selectCls}>
                            <option value="">Select Format</option>
                            <option value="Guest Keynote / Live Webinar Speaker">Guest Keynote / Live Webinar Speaker</option>
                            <option value="1-on-1 Mentor to Selected Founders">1-on-1 Mentor to Selected Founders</option>
                            <option value="Curriculum / Case Study Contributor">Curriculum / Case Study Contributor</option>
                            <option value="Institutional / Academic Tie-up">Institutional / Academic Tie-up</option>
                          </select>
                        </FormField>

                        <FormField label="LinkedIn / Professional Link" required>
                          <input
                            required
                            type="text"
                            name="linkedin"
                            data-label="LinkedIn URL"
                            placeholder="linkedin.com/in/... or professional link"
                            className={inputCls}
                          />
                        </FormField>
                      </div>
                    </>
                  )}

                  {/* 6. INTERNSHIP & FELLOWSHIP SPECIFIC */}
                  {activeTab === 'internship' && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Core Domain of Internship" required>
                          <select required name="domainGroup" data-label="Core Domain" className={selectCls}>
                            <option value="">Select Core Domain</option>
                            <option value="Marketing & Digital Growth">Marketing & Digital Growth</option>
                            <option value="Business Development & Operations">Business Development & Operations</option>
                            <option value="Finance, P&L & Cash Flow Systems">Finance, P&L & Cash Flow Systems</option>
                            <option value="B.E. / Tech, Automation & Analytics">B.E. / Tech, Automation & Analytics</option>
                          </select>
                        </FormField>

                        <FormField label="Market-Related Specialization" required>
                          <select required name="specialization" data-label="Specialization" className={selectCls}>
                            <option value="">Select Specialization</option>
                            <optgroup label="Marketing Domains">
                              <option value="Performance Marketing & Paid Ads (Meta, Google, YouTube)">Performance Marketing & Paid Ads (Meta, Google, YouTube)</option>
                              <option value="Social Media Strategy & Short-Form Content Creation">Social Media Strategy & Short-Form Content Creation</option>
                              <option value="Brand Positioning, PR & Influencer Growth">Brand Positioning, PR & Influencer Growth</option>
                              <option value="Growth Hacking, Inbound Funnels & Copywriting">Growth Hacking, Inbound Funnels & Copywriting</option>
                              <option value="Market Research & Customer Discovery">Market Research & Customer Discovery</option>
                            </optgroup>
                            <optgroup label="Business & Operations Domains">
                              <option value="B2B Business Development & High-Ticket Sales Outreach">B2B Business Development & High-Ticket Sales Outreach</option>
                              <option value="Operations Engineering, Store Checklists & SOPs">Operations Engineering, Store Checklists & SOPs</option>
                              <option value="Franchise Network Scaling & Territory Expansion">Franchise Network Scaling & Territory Expansion</option>
                              <option value="Restaurant & MSME Unit Economics & Margin Optimization">Restaurant & MSME Unit Economics & Margin Optimization</option>
                              <option value="Client Advisory, Account Management & Consulting">Client Advisory, Account Management & Consulting</option>
                            </optgroup>
                            <optgroup label="Finance & Accounts Domains">
                              <option value="Financial Modeling, 90-Day Forecasting & Valuation">Financial Modeling, 90-Day Forecasting & Valuation</option>
                              <option value="P&L Architecture & Cash Flow Systems">P&L Architecture & Cash Flow Systems</option>
                              <option value="Cost Accounting & Unit-Level Food Cost Auditing">Cost Accounting & Unit-Level Food Cost Auditing</option>
                              <option value="Working Capital Management & Receivables Funnel">Working Capital Management & Receivables Funnel</option>
                              <option value="Venture Capital Pitch Decks & Financial Due Diligence">Venture Capital Pitch Decks & Financial Due Diligence</option>
                            </optgroup>
                            <optgroup label="B.E. & Tech Domains">
                              <option value="Business Automation, CRM & No-Code Systems">Business Automation, CRM & No-Code Systems</option>
                              <option value="Full-Stack Web & Landing Page Engineering">Full-Stack Web & Landing Page Engineering</option>
                              <option value="Data Analytics, BI Dashboards & Scorecards">Data Analytics, BI Dashboards & Scorecards</option>
                            </optgroup>
                          </select>
                        </FormField>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Degree & Background (e.g. B.E., B.Com, MBA)" required>
                          <select required name="degreeBackground" data-label="Degree Background" className={selectCls}>
                            <option value="">Select Degree Stream</option>
                            <option value="B.E. / B.Tech (Engineering & Tech)">B.E. / B.Tech (Engineering & Tech)</option>
                            <option value="BBA / MBA (Business & Management)">BBA / MBA (Business & Management)</option>
                            <option value="B.Com / M.Com (Commerce & Accounts)">B.Com / M.Com (Commerce & Accounts)</option>
                            <option value="CA / CMA / CS Aspirant">CA / CMA / CS Aspirant</option>
                            <option value="BA / MA Economics / Finance">BA / MA Economics / Finance</option>
                            <option value="BCA / MCA / Computer Science">BCA / MCA / Computer Science</option>
                            <option value="Other Degree / Self-Taught Operator">Other Degree / Self-Taught Operator</option>
                          </select>
                        </FormField>

                        <FormField label="Current Academic Status" required>
                          <select required name="academicStatus" data-label="Academic Status" className={selectCls}>
                            <option value="">Select Status</option>
                            <option value="1st / 2nd Year Student">1st / 2nd Year Student</option>
                            <option value="3rd / Final Year Student">3rd / Final Year Student</option>
                            <option value="Recent Graduate (0-1 Yrs Exp)">Recent Graduate (0-1 Yrs Exp)</option>
                            <option value="Postgraduate Student">Postgraduate Student</option>
                            <option value="Working Professional / Career Switch">Working Professional / Career Switch</option>
                          </select>
                        </FormField>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Respective Days & Schedule" required>
                          <select required name="weeklyDays" data-label="Respective Days & Schedule" className={selectCls}>
                            <option value="">Select Working Days</option>
                            <option value="6 Days / Week (Full-Time Onsite - Aligarh HQ)">6 Days / Week (Full-Time Onsite - Aligarh HQ)</option>
                            <option value="5 Days / Week (Full-Time Hybrid)">5 Days / Week (Full-Time Hybrid)</option>
                            <option value="3–4 Days / Week (Part-Time / Student Schedule)">3–4 Days / Week (Part-Time / Student Schedule)</option>
                            <option value="Flexible Evening & Weekend Fellowship">Flexible Evening & Weekend Fellowship</option>
                          </select>
                        </FormField>

                        <FormField label="Earliest Joining Day" required>
                          <select required name="joiningDay" data-label="Earliest Joining Day" className={selectCls}>
                            <option value="">Select Starting Timeline</option>
                            <option value="Immediate (Within 48 Hours)">Immediate (Within 48 Hours)</option>
                            <option value="Starting Next Monday">Starting Next Monday</option>
                            <option value="Within Next 15 Days">Within Next 15 Days</option>
                            <option value="1st of Next Month">1st of Next Month</option>
                          </select>
                        </FormField>
                      </div>

                      <FormField label="Specific Preferred Days (Optional)">
                        <input
                          type="text"
                          name="specificDays"
                          data-label="Specific Preferred Days"
                          placeholder="e.g. Monday to Friday, Mon-Wed-Fri, Weekends only, or All 6 Days"
                          className={inputCls}
                        />
                      </FormField>

                      <FormField label="Resume / Portfolio / LinkedIn Link" required>
                        <input
                          required
                          type="text"
                          name="resumeLink"
                          data-label="Resume / Portfolio / LinkedIn"
                          placeholder="drive.google.com/... or linkedin.com/in/... or portfolio URL"
                          className={inputCls}
                        />
                      </FormField>
                    </>
                  )}

                  {/* Universal Message / Note Box */}
                  <FormField label="Detailed Message or Specific Questions" required>
                    <textarea
                      required
                      name="message"
                      data-label="Detailed Message"
                      rows={3}
                      placeholder={`Tell Yasir Ali and the YABN team about your background, current stage, and how we can support you...`}
                      className={inputCls}
                    />
                  </FormField>

                  {/* Consent Checkbox */}
                  <label className="flex items-start gap-3 text-xs text-slate-600 pt-1">
                    <input
                      required
                      type="checkbox"
                      name="consent"
                      data-label="Consent Given"
                      defaultChecked
                      className="mt-0.5 size-4 rounded accent-[#B98F32]"
                    />
                    <span>
                      I authorize YABN to contact me via WhatsApp, phone, or email regarding this inquiry.
                    </span>
                  </label>

                  {/* Error Notification with Instant Fallback Options */}
                  {error && (
                    <div className="rounded-2xl bg-amber-50/90 border border-amber-300 p-4 text-xs text-[#021329] space-y-3">
                      <div className="flex items-start gap-2 text-amber-950 font-medium">
                        <span className="text-base leading-none">⚠️</span>
                        <span className="leading-relaxed">{error}</span>
                      </div>

                      {lastSubmission && (
                        <div className="pt-2.5 border-t border-amber-200/80 space-y-2">
                          <p className="text-[11px] font-bold text-[#021329] uppercase tracking-wider">
                            Direct Fallback Options (1-Click Send):
                          </p>
                          <div className="grid sm:grid-cols-2 gap-2">
                            <a
                              href={`https://wa.me/918439417079?text=${encodeURIComponent(
                                `*YABN ${currentCategory.label} Inquiry*\n\n` +
                                `• Name: ${lastSubmission.Name || ''}\n` +
                                `• Mobile: ${lastSubmission['Phone / WhatsApp'] || ''}\n` +
                                `• Email: ${lastSubmission.Email || ''}\n` +
                                `• Category: ${currentCategory.label}\n` +
                                (lastSubmission.domainGroup ? `• Domain: ${lastSubmission.domainGroup}\n` : '') +
                                (lastSubmission.specialization ? `• Specialization: ${lastSubmission.specialization}\n` : '') +
                                (lastSubmission.weeklyDays ? `• Respective Days: ${lastSubmission.weeklyDays}\n` : '') +
                                (lastSubmission.specificDays ? `• Preferred Days: ${lastSubmission.specificDays}\n` : '') +
                                (lastSubmission.joiningDay ? `• Joining: ${lastSubmission.joiningDay}\n` : '') +
                                (lastSubmission.resumeLink ? `• Resume: ${lastSubmission.resumeLink}\n` : '') +
                                `\n• Message:\n${lastSubmission.message || ''}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
                            >
                              <span>Send via WhatsApp (+91 84394 17079)</span>
                            </a>

                            <a
                              href={`mailto:${INBOX}?subject=${encodeURIComponent(
                                `[YABN Query: ${currentCategory.label}] ${lastSubmission.Name || 'Visitor'}`
                              )}&body=${encodeURIComponent(
                                `Inquiry Details:\n\n` +
                                `Category: ${currentCategory.label}\n` +
                                `Name: ${lastSubmission.Name || ''}\n` +
                                `Phone / WhatsApp: ${lastSubmission['Phone / WhatsApp'] || ''}\n` +
                                `Email: ${lastSubmission.Email || ''}\n\n` +
                                `Message:\n${lastSubmission.message || ''}`
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
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-xl bg-[#021329] px-6 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#B98F32] active:scale-95 disabled:opacity-70"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="size-4.5 animate-spin" />
                        <span>Transmitting Query to {INBOX}...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit {currentCategory.label} Query</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </Container>
    </section>
  )
}
