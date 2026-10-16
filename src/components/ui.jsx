import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useInView } from './hooks'

export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView()
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'is-in' : ''} ${className}`} style={delay ? { '--d': `${delay}ms` } : undefined}>
      {children}
    </Tag>
  )
}

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>
}

/* Section heading in the reference's light grotesk; <em> gets the bronze accent */
export function Heading({ children, light = false, className = '', as: Tag = 'h2' }) {
  return (
    <Tag
      className={`text-[clamp(1.85rem,3.6vw,2.75rem)] leading-[1.15] font-normal tracking-[-0.02em] [&_em]:not-italic ${
        light ? 'text-white [&_em]:text-bronze-300' : 'text-ink [&_em]:text-bronze'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

export function Kicker({ children, light = false }) {
  return (
    <p className={`flex items-center gap-2 text-[13px] ${light ? 'text-white/75' : 'text-ink-soft'}`}>
      <span className={`size-1 rounded-full ${light ? 'bg-white/75' : 'bg-ink-soft'}`} />
      {children}
    </p>
  )
}

const pills = {
  white: 'bg-white text-ink hover:bg-cream',
  dark: 'bg-black/35 text-white ring-1 ring-white/15 hover:bg-black/50',
  cocoa: 'bg-cocoa text-white hover:bg-cocoa-soft',
  ink: 'bg-ink text-white hover:bg-cocoa',
  outline: 'text-ink ring-1 ring-ink/15 hover:ring-ink/40',
}

/* Rounded pill button, as used throughout the reference */
const sizes = {
  md: 'min-h-10 gap-1.5 px-5 text-[13px] sm:min-h-11 sm:gap-2 sm:px-6 sm:text-sm',
  sm: 'min-h-9 gap-1.5 px-4 text-[13px]',
}

export function Pill({ to, href, children, variant = 'white', size = 'md', arrow = true, className = '', ...props }) {
  const cls = `group inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 active:scale-[0.98] ${sizes[size]} ${pills[variant]} ${className}`
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight className="size-3.5 transition-transform sm:size-4 group-hover:translate-x-0.5" strokeWidth={1.75} />}
    </>
  )
  if (to) return <Link to={to} className={cls} {...props}>{inner}</Link>
  if (href) return <a href={href} className={cls} {...props}>{inner}</a>
  return <button className={cls} {...props}>{inner}</button>
}

/* Underlined text link ("More on Our Approach") */
export function UnderLink({ to, children, light = false }) {
  return (
    <Link to={to} className={`group relative inline-block pb-1.5 text-sm font-medium ${light ? 'text-white' : 'text-ink'}`}>
      {children}
      <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-current transition-transform duration-300 group-hover:scale-x-[1.08]" />
    </Link>
  )
}

/* Responsive photo: phones get the 800px file, larger screens the 1600px one */
export function Photo({ name, alt = '', className = '', eager = false }) {
  return (
    <img
      src={`/img/${name}-800.webp`}
      srcSet={`/img/${name}-800.webp 800w, /img/${name}-1600.webp 1600w`}
      sizes="(min-width: 768px) 60vw, 100vw"
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  )
}
