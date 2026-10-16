import {
  BookOpen, Rocket, TrendingUp, Handshake, Lightbulb, ClipboardCheck, LineChart,
  Target, Megaphone, Calculator, MessagesSquare, Map, Palette, Workflow, Cpu,
  Users, GraduationCap, Briefcase, Building2, FileText, CalendarDays, Search,
} from 'lucide-react'

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Mission 100', to: '/mission-100' },
  { label: 'Contact', to: '/contact' },
]

export const engines = [
  {
    icon: GraduationCap,
    title: 'YABN Academy',
    text: 'Practical learning journeys for students, new founders and entrepreneurs: courses, events, guided assignments and tracked progress.',
    to: '/services#academy',
  },
  {
    icon: TrendingUp,
    title: 'Business Growth',
    text: 'Structured growth consultation across branding, marketing, sales, financial basics and hands-on execution support.',
    to: '/services#growth',
  },
  {
    icon: Handshake,
    title: 'Business Network',
    text: 'A trusted, permission-based community for collaboration, networking, mentors and business partnerships.',
    to: '/services#network',
  },
]

export const journey = ['Visitor', 'Learner', 'Member', 'Founder', 'Growth Partner']

export const paths = [
  {
    id: 'students',
    icon: BookOpen,
    label: 'Students',
    headline: 'Turn curiosity into a business mindset.',
    text: 'Start with the fundamentals: spotting problems worth solving, talking to customers and building confidence before you invest a rupee.',
    steps: ['Entrepreneurship Foundation', 'Free Growth Book & templates', 'Live webinars with founders'],
    cta: 'Start learning',
    to: '/services#academy',
  },
  {
    id: 'founders',
    icon: Rocket,
    label: 'New Founders',
    headline: 'Validate, plan and launch with clarity.',
    text: 'Move from idea to first customers with a structured roadmap covering validation, pricing, positioning and a focused launch plan.',
    steps: ['Business Starter Program', 'Mission 100 application', 'Startup & business planning'],
    cta: 'Join Mission 100',
    to: '/mission-100',
  },
  {
    id: 'owners',
    icon: Briefcase,
    label: 'Business Owners',
    headline: 'Build systems that make growth repeatable.',
    text: 'Diagnose what is holding you back, then strengthen sales, marketing, operations and digital tools with guided consultation.',
    steps: ['5-minute growth assessment', 'Business Growth Accelerator', 'One-to-one consultation'],
    cta: 'Take the assessment',
    to: '/services#assessment',
  },
  {
    id: 'partners',
    icon: Building2,
    label: 'Business Partners',
    headline: 'Mentor, collaborate and grow together.',
    text: 'Share your expertise, meet ambitious founders and build partnerships inside a moderated, permission-based network.',
    steps: ['Partner / mentor application', 'Network directory (opt-in)', 'Collaboration events'],
    cta: 'Become a partner',
    to: '/services#network',
  },
]

export const programs = [
  { icon: Lightbulb, title: 'Entrepreneurship Foundation', text: 'Ideas, customer discovery and the business mindset.', level: 'Beginner', tags: ['Mindset', 'Discovery'] },
  { icon: ClipboardCheck, title: 'Business Starter Program', text: 'Validate, plan, price, position and launch.', level: 'Beginner', tags: ['Validation', 'Launch'] },
  { icon: LineChart, title: 'Business Growth Accelerator', text: 'Customers, operations, retention and systems.', level: 'Intermediate', tags: ['Systems', 'Retention'] },
  { icon: Target, title: 'Sales Mastery', text: 'Offers, objections, conversions and follow-up.', level: 'Intermediate', tags: ['Offers', 'Closing'] },
  { icon: Megaphone, title: 'Digital Growth & Branding', text: 'Positioning, content, lead generation and tools.', level: 'All levels', tags: ['Brand', 'Leads'] },
  { icon: Calculator, title: 'Finance & AI for Business', text: 'Cash flow, pricing, analytics and automation.', level: 'Intermediate', tags: ['Finance', 'AI'] },
]

export const services = [
  { icon: MessagesSquare, title: 'Business Consultation', text: 'Diagnostic and one-to-one consultation to find your biggest growth levers.' },
  { icon: Map, title: 'Startup & Business Planning', text: 'Validate opportunities and create a practical launch roadmap.' },
  { icon: Palette, title: 'Brand Strategy', text: 'Brand identity, messaging and positioning that earns trust.' },
  { icon: Workflow, title: 'Marketing & Sales Systems', text: 'Lead generation, conversion and customer retention systems.' },
  { icon: Cpu, title: 'Digital Transformation', text: 'CRM, website, automation and AI workflows for modern teams.' },
  { icon: Users, title: 'Mentorship & Partnerships', text: 'Guidance, warm introductions and meaningful collaboration.' },
]

export const howItWorks = [
  { n: '01', title: 'Learn', text: 'Build fundamentals through structured courses, the Growth Book and live sessions.' },
  { n: '02', title: 'Build', text: 'Apply it to your own idea with guided assignments, templates and mentor check-ins.' },
  { n: '03', title: 'Grow', text: 'Scale with consultation, sales systems and a network of founders and partners.' },
]

export const starterSteps = [
  'Learn the basics of business',
  'Identify a real customer problem',
  'Build a simple offer',
  'Take action consistently',
  'Grow with the right network',
]

export const missionFeatures = [
  'Mission story, program outcomes and who can apply',
  'Eligibility, selection criteria, schedule and key milestones',
  '90-day participant roadmap with events and mentorship check-ins',
  'Verified progress updates and completed participant stories',
]

export const missionRoadmap = [
  { phase: 'Days 1–30', title: 'Foundation', text: 'Mindset, idea selection and customer discovery.' },
  { phase: 'Days 31–60', title: 'Build', text: 'Offer design, pricing, branding and first sales conversations.' },
  { phase: 'Days 61–90', title: 'Launch', text: 'Go to market, track results and plan your next stage.' },
]

export const networkBenefits = [
  { title: 'Opt-in directory', text: 'Find members by city, business sector and collaboration interests.' },
  { title: 'Mentor access', text: 'Get guidance from experienced operators and domain experts.' },
  { title: 'Partnerships', text: 'Discover collaborators, suppliers and co-founders you can trust.' },
  { title: 'You control visibility', text: 'Choose exactly which profile fields are public. Opt out anytime.' },
]

export const resources = [
  { icon: BookOpen, title: 'YABN Growth Book', text: 'A practical business growth guide: featured download with sample chapters.', format: 'PDF', featured: true },
  { icon: ClipboardCheck, title: 'Business Starter Checklist', text: 'Validate your idea before investing.', format: 'PDF' },
  { icon: Calculator, title: 'Pricing & Profit Calculator', text: 'Simple unit economics and cash-flow basics.', format: 'Sheet' },
  { icon: Search, title: 'Customer Research Template', text: 'Interview questions and a validation worksheet.', format: 'Doc' },
  { icon: CalendarDays, title: '90-Day Business Planner', text: 'Milestones, weekly actions and measurable goals.', format: 'PDF' },
  { icon: FileText, title: 'Blog & Founder Insights', text: 'Guides, event summaries and founder interviews.', format: 'Articles' },
]

export const eventTypes = [
  { tag: 'Online', title: 'Webinars', text: 'Live sessions with Q&A, reminders and replays for registered attendees.' },
  { tag: 'In person', title: 'Workshops & Seminars', text: 'Hands-on sessions with agendas, speakers, venue details and feedback.' },
  { tag: 'Community', title: 'Networking Meetups', text: 'Meet founders, mentors and partners in a moderated, welcoming setting.' },
]

export const assessment = [
  {
    q: 'What stage is your business at?',
    options: ['Just an idea', 'Just launched (< 1 year)', 'Growing (1–3 years)', 'Established (3+ years)'],
  },
  {
    q: 'What is your biggest challenge right now?',
    options: ['Finding customers', 'Pricing & profit', 'Branding & visibility', 'Systems & operations'],
  },
  {
    q: 'What do you want in the next 90 days?',
    options: ['Validate my idea', 'Get my first sales', 'Increase revenue', 'Build a team & systems'],
  },
]

export const recommendations = {
  'Just an idea': { title: 'Entrepreneurship Foundation', text: 'Start with mindset, idea selection and customer discovery, and consider applying to Mission 100.' },
  'Just launched (< 1 year)': { title: 'Business Starter Program', text: 'Tighten your offer, pricing and positioning, then build a repeatable way to win your first customers.' },
  'Growing (1–3 years)': { title: 'Business Growth Accelerator', text: 'Strengthen retention, operations and sales systems so growth does not depend on you alone.' },
  'Established (3+ years)': { title: 'One-to-one Consultation', text: 'A diagnostic consultation to unlock digital transformation, automation and new partnerships.' },
}

export const approach = [
  { title: 'Guidance grounded in real-world practice', text: 'Every program is built around doing: real customers, real offers and real numbers, not theory for its own sake.' },
  { title: 'Learning that turns into action', text: 'Guided assignments and mentor check-ins help you apply each lesson to your own idea or business right away.' },
  { title: 'Support at every stage of growth', text: 'From validating an idea to building sales systems and automation, there is a clear next step wherever you are.' },
  { title: 'A network built on lasting trust', text: 'A moderated, permission-based community where founders, mentors and partners grow together.' },
]

export const strengths = [
  'Practical training means you learn what truly matters.',
  'Hands-on growth support for genuine, measurable progress.',
  'A trusted network beside you at every stage.',
]

export const programPhotos = [
  { name: 'class', alt: 'A trainer presenting to a group of learners' },
  { name: 'shop', alt: 'A small business owner smiling at his sewing machine' },
  { name: 'work', alt: 'An entrepreneur working on a laptop' },
]

export const faqs = [
  { q: 'Who is YABN for?', a: 'Students, new founders, business owners and business partners. Each has a dedicated path, from learning the basics to scaling with systems and partnerships.' },
  { q: 'Do I need a business idea to start?', a: 'No. The Entrepreneurship Foundation program begins with idea selection and customer discovery.' },
  { q: 'Does Mission 100 guarantee income or funding?', a: 'No. Mission 100 is a training and guidance program. Participation is not a promise of income or funding.' },
  { q: 'When are fees and dates published?', a: 'Fees, batch dates and schedules are published only once they are confirmed.' },
  { q: 'How is my data used?', a: 'Only to respond to your enquiry, with your consent. You can ask us to delete it at any time.' },
]

// Founder details as published on yasiraliclasses.in (home, faculty and centres pages)
export const founder = {
  name: 'Yasir Ali',
  role: 'Founder & Teacher, Yasir Ali Classes · Director, Accounts',
  motto: 'We debit efforts, to credit your success.',
  award: 'Educator of the Year, Global Excellence Awards 2023',
  bio: [
    'Yasir Ali is the founder of Yasir Ali Classes (YAC) in Aligarh and an active classroom teacher, guiding students with practical concepts, disciplined practice and exam-focused mentoring.',
    'Over 10+ years in Aligarh, YAC has mentored 80,000+ students across Commerce, Science, Junior (Classes 5–10), CA Foundation, CMA, B.Com, Class 11–12 and entrance exams, and holds a 4.9★ Google rating.',
    'YABN carries the same belief into entrepreneurship: with the right mindset, guidance and action, anyone can build a business.',
  ],
  highlights: [
    'Founder & Teacher, Yasir Ali Classes (YAC), Aligarh',
    'Educator of the Year, Global Excellence Awards 2023',
    '80,000+ students mentored over 10+ years',
    'Leading Mission 100: Har Ghar Se Ek Entrepreneur',
  ],
  stats: [
    { value: 80000, suffix: '+', label: 'Students mentored at YAC' },
    { value: 10, suffix: '+', label: 'Years teaching in Aligarh' },
    { value: 4.9, suffix: '★', label: 'Google rating', decimals: 1 },
  ],
  campus: 'Grand Bazaar, 1st Floor, Lal Diggi Road, Aligarh, Uttar Pradesh 202001',
  online: ['Delhi NCR', 'Lucknow', 'Moradabad', 'Agra'],
  links: [
    { label: 'Yasir Ali Classes', href: 'https://yasiraliclasses.in' },
    { label: 'Instagram', href: 'https://www.instagram.com/yasiraliclasses/' },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCUlHYg9DL5LACF_fHQI7I_g' },
    { label: 'Facebook', href: 'https://www.facebook.com/yasiraliclasses/' },
    { label: 'YAC App', href: 'https://play.google.com/store/apps/details?id=co.classplus.yasir&hl=en' },
  ],
}
