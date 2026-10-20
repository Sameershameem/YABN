import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  FileText,
  GraduationCap,
  Handshake,
  RotateCcw,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Users,
  UtensilsCrossed,
} from 'lucide-react'
import { Container } from './ui'

const SECTORS = [
  {
    id: 'freelancers',
    label: 'Freelancers',
    icon: Briefcase,
    systemTitle: 'Freelancer to Agency Scale System',
    systemSubtitle:
      'Break the feast-or-famine cycle, transition from hourly pricing to monthly retainers, and delegate delivery.',
    modules: [
      {
        step: '01',
        title: 'Retainer Architecture',
        duration: 'WK 1-4',
        text: 'Replace one-off project bids with high-ticket recurring monthly advisory retainers and guaranteed cash flow.',
        active: false,
      },
      {
        step: '02',
        title: 'Zero-Dollar Inbound Authority',
        duration: 'WK 5-8',
        text: 'Build an organic inbound pipeline on LinkedIn and video channels that attracts premium enterprise clients.',
        active: true,
      },
      {
        step: '03',
        title: 'Agency Team Delegation',
        duration: 'WK 9-12',
        text: 'Standardize your deliverables and hire vetted subcontractors so your revenue scales beyond personal hours.',
        active: false,
      },
    ],
  },
  {
    id: 'restaurants',
    label: 'Restaurants & MSMEs',
    icon: UtensilsCrossed,
    systemTitle: 'Restaurant & MSME Scale System',
    systemSubtitle:
      'Tactical execution modules designed to optimize operating cash flow, stabilize margins, and scale multi-unit footprints.',
    modules: [
      {
        step: '01',
        title: 'Cash Flow Stabilization',
        duration: 'WK 1-4',
        text: 'Eliminate operational cash drag, plug kitchen leaks, and lock in a verified 90-day liquid reserve architecture.',
        active: false,
      },
      {
        step: '02',
        title: 'Margin & Menu Engineering',
        duration: 'WK 5-8',
        text: 'Re-architect high-contribution items, reduce raw food cost to under 26%, and enforce unit-level micro-margins.',
        active: true,
      },
      {
        step: '03',
        title: 'Multi-Outlet SOPs & Governance',
        duration: 'WK 9-12',
        text: 'Decouple daily operations from founder bandwidth with automated inventory audits and regional general managers.',
        active: false,
      },
    ],
  },
  {
    id: 'academy',
    label: 'YABN Academy',
    icon: GraduationCap,
    systemTitle: '0-to-1 Founder Accelerator System',
    systemSubtitle:
      'Comprehensive entrepreneurship pedagogy taking students and first-time founders from raw idea to first paying customer.',
    modules: [
      {
        step: '01',
        title: 'Idea Validation & Discovery',
        duration: 'WK 1-4',
        text: 'Test problem urgency with real target buyers and validate willingness to pay before investing working capital.',
        active: false,
      },
      {
        step: '02',
        title: 'High-Conversion Sales Mastery',
        duration: 'WK 5-8',
        text: 'Master 50 proven pitch frameworks, objection demolition, and closing high-margin initial contracts.',
        active: true,
      },
      {
        step: '03',
        title: 'Finance For Non-Finance & Launch',
        duration: 'WK 9-12',
        text: 'Understand cash flow cycles, margin unit economics, and launch your business with founder confidence.',
        active: false,
      },
    ],
  },
  {
    id: 'partners',
    label: 'Business Partners',
    icon: Building2,
    systemTitle: 'Franchise & Enterprise Expansion System',
    systemSubtitle:
      'Scale regional footprints, secure territorial exclusivity, and syndicate co-investment in vetted growth ventures.',
    modules: [
      {
        step: '01',
        title: 'Territory & Franchise Modeling',
        duration: 'WK 1-4',
        text: 'Establish regional exclusivity rights, standard operating playbooks, and automated revenue share structures.',
        active: false,
      },
      {
        step: '02',
        title: 'Corporate Governance & Audit',
        duration: 'WK 5-8',
        text: 'Implement institutional governance standards, financial audit readiness, and scalability compliance.',
        active: true,
      },
      {
        step: '03',
        title: 'Syndicate Capital & Distribution',
        duration: 'WK 9-12',
        text: 'Leverage cross-industry distribution networks to accelerate enterprise customer acquisition and syndication.',
        active: false,
      },
    ],
  },
  {
    id: 'collaborators',
    label: 'Collaborators',
    icon: Users,
    systemTitle: 'Ecosystem Advisory & Mentorship Track',
    systemSubtitle:
      'Join Yasir Ali on the YABN Advisory Council to shape curricula, mentor cohort founders, and deliver masterclasses.',
    modules: [
      {
        step: '01',
        title: 'Curriculum & Case Study Integration',
        duration: 'WK 1-4',
        text: 'Translate your specialized corporate domain knowledge into actionable frameworks for MSME founders.',
        active: false,
      },
      {
        step: '02',
        title: 'Mission 100 Founder Advisory',
        duration: 'WK 5-8',
        text: 'Hold 1-on-1 strategic diagnostic sessions with top-tier cohort entrepreneurs in your specialized field.',
        active: true,
      },
      {
        step: '03',
        title: 'Keynote Masterclasses & Media',
        duration: 'WK 9-12',
        text: 'Lead flagship executive webinars, roundtables, and co-branded enterprise thought leadership.',
        active: false,
      },
    ],
  },
]

export default function Hero() {
  const [selectedSectorId, setSelectedSectorId] = useState('restaurants')
  const currentSector = SECTORS.find((s) => s.id === selectedSectorId) || SECTORS[1]

  return (
    <section className="relative isolate overflow-hidden bg-[#fafafa] pt-24 pb-12 sm:pt-28 sm:pb-16 text-[#021329]">
      {/* Subtle Vertical Architectural Grid Lines */}
      <div className="absolute inset-0 max-w-[1320px] mx-auto pointer-events-none -z-10 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8">
        <div className="border-r border-slate-200/50 h-full" />
        <div className="border-r border-slate-200/50 h-full" />
        <div className="border-r border-slate-200/50 h-full" />
        <div className="border-r border-slate-200/50 h-full" />
        <div className="border-r border-slate-200/50 h-full hidden sm:block" />
        <div className="border-r border-slate-200/50 h-full hidden sm:block" />
        <div className="border-r border-slate-200/50 h-full hidden lg:block" />
        <div className="border-r border-slate-200/50 h-full hidden lg:block" />
      </div>

      <Container className="max-w-[1320px]">
        {/* Top Centered Header */}
        <div className="text-center max-w-3xl mx-auto pt-2 sm:pt-4">
          {/* Kicker Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B98F32]/40 bg-[#fcf8ee] px-4 py-1 text-[11px] font-bold tracking-[0.16em] uppercase text-[#96711e] shadow-xs">
            <span className="size-1.5 rounded-full bg-[#96711e]" />
            <span>YASIR ALI BUSINESS NETWORK · BUSINESS ACCELERATOR</span>
          </div>

          {/* Headline */}
          <h1 className="mt-5 text-[clamp(2.5rem,5.2vw,4.5rem)] font-extrabold tracking-tight text-[#021329] leading-[1.12]">
            Practical Systems to <br />
            <span className="font-serif italic font-normal text-[#96711e] mr-2.5">Build & Scale</span>
            <span>Your Business</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl mx-auto font-normal">
            India's execution-driven network for freelancers, restaurants, MSMEs, and early-stage founders. Engineered around battle-tested cash flow systems and direct 1-on-1 mentorship.
          </p>

          {/* 3 Trust Feature Points */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-wider text-slate-700">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-[#96711e]" />
              <span>ZERO THEORY · PURE P&L ARCHITECTURE</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="size-4 text-[#96711e]" />
              <span>100-DAY SPRINT DEPLOYMENTS</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Handshake className="size-4 text-[#96711e]" />
              <span>SOVEREIGN FOUNDER COMMUNITY</span>
            </div>
          </div>
        </div>

        {/* 3-Card Bento Console */}
        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.85fr_1.25fr] items-stretch">
          
          {/* Card 1: Select Your Sector (Left) */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase">
                <span className="text-slate-400">STEP 01</span>
                <span className="text-[#96711e]">CATEGORY FILTER</span>
              </div>

              <h2 className="mt-2 text-lg font-extrabold text-[#021329] tracking-tight">
                Select Your Sector
              </h2>

              {/* Sector Buttons */}
              <div className="mt-4 space-y-1.5">
                {SECTORS.map((sector) => {
                  const Icon = sector.icon
                  const isSelected = selectedSectorId === sector.id
                  return (
                    <button
                      key={sector.id}
                      type="button"
                      onClick={() => setSelectedSectorId(sector.id)}
                      className={`w-full rounded-xl p-3 text-left transition-all duration-200 flex items-center justify-between text-xs sm:text-[13px] font-bold ${
                        isSelected
                          ? 'bg-[#021329] text-white shadow-md'
                          : 'text-[#021329] hover:bg-slate-50 border border-transparent hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`size-4 ${
                            isSelected ? 'text-[#dcc17b]' : 'text-slate-500'
                          }`}
                        />
                        <span>{sector.label}</span>
                      </div>
                      {isSelected && <ArrowRight className="size-3.5 text-[#dcc17b]" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Bottom Sync Notice */}
            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <RotateCcw className="size-3 text-slate-400" />
              <span>Dynamic roadmap syncs instantly</span>
            </div>
          </div>

          {/* Card 2: Active Track Roadmap (Center) */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                  ACTIVE TRACK ROADMAP
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#fbf7ee] border border-[#e2cc8f] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#96711e]">
                  <span className="size-1.5 rounded-full bg-[#96711e] animate-pulse" />
                  <span>LIVE FRAMEWORK</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="mt-3 text-xl sm:text-2xl font-extrabold text-[#021329] tracking-tight">
                {currentSector.systemTitle}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {currentSector.systemSubtitle}
              </p>

              {/* Stepped Modules */}
              <div className="mt-5 space-y-2.5">
                {currentSector.modules.map((m, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl p-3.5 transition-all ${
                      m.active
                        ? 'border border-[#B98F32] bg-[#fcfaf5] shadow-xs'
                        : 'border border-slate-200/80 bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold mt-0.5 ${
                          m.active
                            ? 'bg-[#B98F32] text-white'
                            : 'bg-[#021329] text-white'
                        }`}
                      >
                        {m.step}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#021329]">
                            {m.title}
                            {m.active && (
                              <span className="ml-1.5 inline-block size-1.5 rounded-full bg-[#96711e]" />
                            )}
                          </h4>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {m.duration}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-600 leading-relaxed font-normal">
                          {m.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="mt-6 pt-4 flex flex-wrap items-center gap-3">
              <a
                href="#inquiry-hub"
                className="inline-flex items-center gap-2 rounded-xl bg-[#8a681c] hover:bg-[#725414] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all active:scale-95"
              >
                <span>CONSULT WITH YASIR ALI</span>
                <ArrowRight className="size-3.5" />
              </a>
              <a
                href="#inquiry-hub"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#021329] transition-all"
              >
                <span>EXPLORE 5 TRACKS</span>
              </a>
            </div>
          </div>

          {/* Card 3: Executive Founder Card (Right) */}
          <div className="rounded-2xl bg-[#021329] text-white p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Top Right Badge */}
            <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-white/90 border border-white/10 backdrop-blur-md">
              <Star className="size-3 fill-[#dcc17b] text-[#dcc17b]" />
              <span>CHIEF MENTOR</span>
            </div>

            <div>
              {/* Photo Frame */}
              <div className="relative aspect-[4/3.8] w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#132d54] via-[#091f3d] to-[#021329] mb-4 border border-white/10 shadow-inner">
                {/* Radial Spotlight behind Yasir Ali */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-48 rounded-full bg-[#B98F32]/25 blur-2xl pointer-events-none" />

                <img
                  src="/img/founder-cutout.png"
                  alt="Yasir Ali - Founder, YABN"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[96%] w-auto max-w-none object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                />

                {/* Floating Award Pill across bottom of photo */}
                <div className="absolute bottom-2.5 inset-x-2.5 rounded-lg bg-[#021329]/90 border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md flex items-center gap-2">
                  <Award className="size-3.5 text-[#dcc17b] shrink-0" />
                  <span className="truncate">Global Excellence Award 2023</span>
                </div>
              </div>

              {/* Bio & Quote */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white tracking-tight">Yasir Ali</h3>
                <span className="size-2 rounded-full bg-[#96711e] animate-pulse" />
              </div>
              <p className="text-[10px] font-bold tracking-widest text-[#dcc17b] uppercase mt-0.5">
                HAR GHAR SE EK ENTREPRENEUR
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-300 font-light italic">
                "Scaling is never about luck or reckless capital. It is an exacting science of unit economics, accountability rhythms, and structural execution."
              </p>
            </div>

            {/* Bottom 3-Metric Footer */}
            <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 text-center divide-x divide-white/10">
              <div className="px-1">
                <p className="text-lg font-extrabold text-white tracking-tight tabular-nums">80K+</p>
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">FOUNDERS</p>
              </div>
              <div className="px-1">
                <p className="text-lg font-extrabold text-[#dcc17b] tracking-tight tabular-nums">6+</p>
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">FRAMEWORKS</p>
              </div>
              <div className="px-1">
                <p className="text-lg font-extrabold text-white tracking-tight tabular-nums">100%</p>
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">EXECUTION</p>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Architecture Cards Below Bento Console */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-[#021329]">
                <FileText className="size-5 text-slate-700" />
              </div>
              <span className="mt-4 block text-[10px] font-bold uppercase tracking-wider text-[#96711e]">
                ARCHITECTURE 01
              </span>
              <h3 className="mt-1 text-base font-extrabold text-[#021329] tracking-tight">
                Predictable Cash Engine
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 font-normal">
                Transition from seasonal revenue anxiety to strict, recurring cash predictability. We audit working capital and rebuild your receivables funnel.
              </p>
            </div>
            <a
              href="#inquiry-hub"
              className="mt-5 pt-4 border-t border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-[#021329] flex items-center justify-between transition-colors"
            >
              <span>FRAMEWORK GUIDE</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-[#021329]">
                <Target className="size-5 text-slate-700" />
              </div>
              <span className="mt-4 block text-[10px] font-bold uppercase tracking-wider text-[#96711e]">
                ARCHITECTURE 02
              </span>
              <h3 className="mt-1 text-base font-extrabold text-[#021329] tracking-tight">
                Founder Liberation SOPs
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 font-normal">
                Stop fighting operational forest fires every morning. We build redundant middle-tier execution checklists that function without daily founder intervention.
              </p>
            </div>
            <a
              href="#inquiry-hub"
              className="mt-5 pt-4 border-t border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-[#021329] flex items-center justify-between transition-colors"
            >
              <span>OPERATIONAL PLAYBOOK</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-[#021329]">
                <Users className="size-5 text-slate-700" />
              </div>
              <span className="mt-4 block text-[10px] font-bold uppercase tracking-wider text-[#96711e]">
                ARCHITECTURE 03
              </span>
              <h3 className="mt-1 text-base font-extrabold text-[#021329] tracking-tight">
                Peer Sovereign Network
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 font-normal">
                Immediate access to peer founders scaling in identical revenue bands. Exchange verified vendor contacts, bulk procurement discounts, and joint ventures.
              </p>
            </div>
            <a
              href="#inquiry-hub"
              className="mt-5 pt-4 border-t border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-[#021329] flex items-center justify-between transition-colors"
            >
              <span>NETWORK ALLIANCE</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Marquee Row Below Cards */}
        <div className="mt-10 py-4 border-y border-slate-200/80 flex flex-wrap items-center justify-between gap-y-2 text-[11px] font-bold uppercase tracking-wider text-[#021329]">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#96711e]" />
            <span>BUSINESS GROWTH</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#96711e]" />
            <span>BUSINESS NETWORK</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#96711e]" />
            <span>MISSION 100</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#96711e]" />
            <span>GROWTH BOOK</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#96711e]" />
            <span>HAR GHAR SE EK ENTREPRENEUR</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#96711e]" />
            <span>YABN ACADEMY</span>
          </div>
        </div>

        {/* Sub-footer / Brand Ribbon */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
          <div>
            <p className="font-extrabold uppercase tracking-wider text-[#021329]">
              YABN ACCELERATOR
            </p>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Calculated modern enterprise acceleration and executive venture development.
            </p>
          </div>
          <div className="flex items-center gap-5 text-slate-500 font-semibold text-[11px]">
            <Link to="/services#assessment" className="hover:text-[#021329] uppercase tracking-wider">
              ASSESSMENT
            </Link>
            <Link to="/services#network" className="hover:text-[#021329] uppercase tracking-wider">
              SOVEREIGN NETWORK
            </Link>
            <span className="text-slate-400">© 2025 YABN. All rights reserved.</span>
          </div>
        </div>

      </Container>
    </section>
  )
}

/* Page Hero for Inner Pages */
export function PageHero({ photo = 'hero-mountain', alt = '', kicker, title, text }) {
  const imgSrc = photo === 'hero-mountain' ? '/img/hero-mountain.jpg' : `/img/${photo}-1600.webp`
  return (
    <section className="relative isolate min-h-[46svh] flex flex-col justify-end overflow-hidden bg-[#021329] text-white pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img
          src={imgSrc}
          alt={alt}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#021329] via-[#021329]/75 to-[#021329]/40" />
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10">
        {kicker && (
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-light uppercase tracking-wider text-[#dcc17b] ring-1 ring-white/15">
            {kicker}
          </div>
        )}
        <h1 className="mt-3 text-[clamp(2.2rem,4.5vw,3.5rem)] font-light leading-[1.1] tracking-[-0.03em] text-white">
          {title}
        </h1>
        {text && (
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-white/85 sm:text-base">
            {text}
          </p>
        )}
      </div>
    </section>
  )
}
