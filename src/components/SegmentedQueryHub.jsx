import { useState } from 'react'
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
} from 'lucide-react'
import { sendForm, readForm, INBOX } from '../lib/submit'
import { Container, Heading, Kicker } from './ui'

const CATEGORIES = [
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
      setError(err.message || 'Unable to submit your query. Please try again.')
      setStatus('idle')
    }
  }

  return (
    <section id="inquiry-hub" className="bg-[#f8fafc] py-20 sm:py-28 border-t border-slate-200/80 scroll-mt-24">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Kicker>Dedicated Consultation & Query Portals</Kicker>
          <Heading className="mt-3">
            Tailored Consultation for <em>Your Business</em>
          </Heading>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Select your category below to access a specialized diagnostic form. Every inquiry is reviewed directly by Yasir Ali and the YABN leadership team.
          </p>
        </div>

        {/* 5-Category Interactive Switcher Bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
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
                className={`inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? 'bg-[#021329] text-white shadow-lg shadow-[#021329]/20 ring-2 ring-[#B98F32]'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#B98F32] hover:text-[#021329]'
                }`}
              >
                <Icon className={`size-4 ${isSelected ? 'text-[#dcc17b]' : 'text-[#B98F32]'}`} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Main Form & Context Grid */}
        <div className="mt-10 max-w-5xl mx-auto rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-[1.1fr_1.4fr]">
            
            {/* Left Context Column: What YABN Provides for This Specific Audience */}
            <div className="bg-[#021329] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 size-60 rounded-full bg-[#B98F32]/10 blur-3xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#dcc17b] ring-1 ring-white/15">
                  <Sparkles className="size-3" />
                  <span>{currentCategory.badge}</span>
                </div>

                <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold text-white leading-tight">
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
                            type="url"
                            name="linkedin"
                            data-label="LinkedIn URL"
                            placeholder="https://linkedin.com/in/..."
                            className={inputCls}
                          />
                        </FormField>
                      </div>
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

                  {/* Error Notification */}
                  {error && (
                    <div className="rounded-xl bg-red-50 p-3.5 text-xs text-red-700">
                      {error}
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
