import { useState } from 'react'
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import { Container } from './ui'

const FELLOWSHIP_TRACKS = [
  {
    id: 'track-bd',
    number: '01',
    title: 'Business Development & Revenue Architecture',
    badge: 'High Impact',
    duration: '3 - 6 Months',
    stipend: 'Stipend + Incentives',
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
    number: '02',
    title: 'Operations & Multi-Outlet SOP Engineering',
    badge: 'Operations',
    duration: '3 - 6 Months',
    stipend: 'Stipend + Incentives',
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
    number: '03',
    title: 'Growth Marketing & Performance Media',
    badge: 'Digital Scale',
    duration: '3 - 6 Months',
    stipend: 'Stipend + Incentives',
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
    number: '04',
    title: 'Financial Modeling & Unit Economics',
    badge: 'Venture Capital',
    duration: '3 - 6 Months',
    stipend: 'Stipend + Incentives',
    focus:
      'Dive deep into profit & loss statements, cash flow forecasting, working capital cycles, and debt-free expansion strategies.',
    deliverables: [
      'Re-engineer restaurant contribution margins and raw food cost percentages',
      'Build 90-day rolling cash flow forecasting models in Excel',
      'Prepare franchise investment decks and unit economic scorecards',
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

export default function InternshipSection() {
  const [selectedTrack, setSelectedTrack] = useState('track-bd')
  const activeTrack = FELLOWSHIP_TRACKS.find((t) => t.id === selectedTrack) || FELLOWSHIP_TRACKS[0]

  const handleApplyClick = () => {
    // Set hash with category=internship so the form opens with internship preselected
    window.location.hash = 'inquiry-hub?category=internship'
    const el = document.getElementById('inquiry-hub')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B98F32]/40 bg-[#fcf8ee] px-4 py-1 text-[11px] font-bold tracking-[0.16em] uppercase text-[#96711e] shadow-xs">
            <span className="size-1.5 rounded-full bg-[#96711e]" />
            <span>YABN VENTURE FELLOWSHIP · APPLICATIONS OPEN</span>
          </div>

          <h2 className="mt-5 text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold tracking-tight text-[#021329] leading-[1.15]">
            Step Out of the Classroom.{' '}
            <span className="font-serif italic font-normal text-[#96711e]">Build Real Businesses</span>{' '}
            with Yasir Ali
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl mx-auto font-normal">
            No mundane coffee runs or theoretical case studies. Work directly alongside seasoned founders on live P&L
            turnarounds, growth engineering, and enterprise systems.
          </p>
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
                AVAILABLE FELLOWSHIP TRACKS
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
                    onClick={() => setSelectedTrack(track.id)}
                    className={`w-full text-left rounded-2xl p-4 sm:p-5 transition-all duration-200 flex items-start justify-between border ${
                      isSelected
                        ? 'bg-[#021329] text-white border-[#021329] shadow-md shadow-[#021329]/15'
                        : 'bg-[#fafafa] text-[#021329] border-slate-200 hover:border-[#B98F32]/50 hover:bg-white'
                    }`}
                  >
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

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleApplyClick(activeTrack.title)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#021329] px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#B98F32] active:scale-95"
                >
                  <span>Apply for this Track</span>
                  <ChevronRight className="size-4 text-[#dcc17b]" />
                </button>

                <a
                  href="https://wa.me/919045417079?text=Hi%20YABN%20Team%2C%20I%20am%20interested%20in%20the%20YABN%20Internship%20%26%20Fellowship%20Program."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-300 px-5 py-3.5 text-xs sm:text-sm font-semibold text-slate-700 transition-colors hover:border-[#021329] hover:text-[#021329]"
                >
                  <span>Ask a Question on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
