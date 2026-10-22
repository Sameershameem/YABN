import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useInView } from './hooks'

export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={delay ? { '--d': `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 ${className}`}>{children}</div>
}

/* Section heading in high-impact executive grotesque; <em> gets italic serif gold accent */
export function Heading({ children, light = false, className = '', as: Tag = 'h2' }) {
  return (
    <Tag
      className={`text-[clamp(2rem,3.8vw,3rem)] leading-[1.14] font-extrabold tracking-tight [&_em]:font-serif [&_em]:italic [&_em]:font-normal ${
        light ? 'text-white [&_em]:text-[#dcc17b]' : 'text-[#021329] [&_em]:text-[#96711e]'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

/* Executive Kicker Pill */
export function Kicker({ children, light = false }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-bold tracking-[0.16em] uppercase shadow-2xs ${
        light
          ? 'border-white/20 bg-white/10 text-[#dcc17b]'
          : 'border-[#B98F32]/40 bg-[#fcf8ee] text-[#96711e]'
      }`}
    >
      <span className={`size-1.5 rounded-full ${light ? 'bg-[#dcc17b]' : 'bg-[#96711e]'}`} />
      <span>{children}</span>
    </div>
  )
}

const pills = {
  white: 'bg-white text-[#021329] border border-slate-200 hover:border-[#B98F32] hover:bg-slate-50 shadow-xs',
  dark: 'bg-[#021329] text-white border border-white/15 hover:bg-[#021329]/90 shadow-md',
  gold: 'bg-gradient-to-r from-[#B98F32] to-[#cca244] text-[#021329] font-bold hover:brightness-110 shadow-md shadow-[#B98F32]/25',
  cocoa: 'bg-[#021329] text-white hover:bg-[#B98F32] transition-colors shadow-sm',
  ink: 'bg-[#021329] text-white hover:bg-[#B98F32] transition-colors shadow-sm',
  outline: 'text-[#021329] border border-slate-300 hover:border-[#B98F32] hover:text-[#96711e]',
}

/* Rounded pill button */
const sizes = {
  md: 'min-h-10 gap-1.5 px-5 text-[13px] sm:min-h-11 sm:gap-2 sm:px-6 sm:text-sm',
  sm: 'min-h-9 gap-1.5 px-4 text-[13px]',
}

export function Pill({
  to,
  href,
  children,
  variant = 'white',
  size = 'md',
  arrow = true,
  className = '',
  ...props
}) {
  const cls = `group inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 active:scale-[0.98] ${sizes[size]} ${pills[variant]} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="size-3.5 transition-transform sm:size-4 group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      )}
    </>
  )
  if (to)
    return (
      <Link to={to} className={cls} {...props}>
        {inner}
      </Link>
    )
  if (href)
    return (
      <a href={href} className={cls} {...props}>
        {inner}
      </a>
    )
  return (
    <button className={cls} {...props}>
      {inner}
    </button>
  )
}

/* Underlined text link */
export function UnderLink({ to, children, light = false }) {
  return (
    <Link
      to={to}
      className={`group relative inline-block pb-1 text-sm font-bold tracking-wide ${
        light ? 'text-[#dcc17b]' : 'text-[#96711e]'
      }`}
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-current transition-transform duration-300 group-hover:scale-x-110" />
    </Link>
  )
}

/* Responsive photo helper supporting webp and generated jpg assets */
export function Photo({ name, alt = '', className = '', eager = false }) {
  // every photo ships as 800/1600 webp except the original mountain jpg
  const isJpg = name === 'hero-mountain'
  const src = isJpg ? `/img/${name}.jpg` : `/img/${name}-800.webp`
  const srcSet = isJpg ? undefined : `/img/${name}-800.webp 800w, /img/${name}-1600.webp 1600w`

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes="(min-width: 768px) 60vw, 100vw"
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  )
}

/* Text that types itself in, character by character, once it scrolls into view.
   Wrap a phrase in [brackets] to set it as the gold serif accent: "The YABN [Method]".
   Pass `play` to control the timing yourself instead of using the scroll trigger. */
export function TypeReveal({ text, play, light = false, as: Tag = 'span', className = '', step = 22, delay = 0 }) {
  const [ref, inView] = useInView()
  const on = play ?? inView
  const plain = text.replace(/[[\]]/g, '')
  let i = 0
  const word = (w, key) => (
    <span key={key} className="inline-block whitespace-nowrap">
      {[...w].map((c, k) => (
        <span key={k} className="type-char" style={{ '--i': i++ }}>
          {c}
        </span>
      ))}
    </span>
  )
  const words = (s, keyBase) =>
    s.split(/(\s+)/).map((w, k) => (/^\s+$/.test(w) ? (i++, ' ') : w && word(w, `${keyBase}-${k}`)))

  return (
    <Tag
      ref={ref}
      className={`${on ? 'is-typed' : ''} ${className}`}
      style={{ '--step': `${step}ms`, '--d': `${delay}ms` }}
    >
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {text.split(/(\[[^\]]+\])/).map((part, k) =>
          part.startsWith('[') ? (
            <span key={k} className="whitespace-nowrap">
              <span className={`font-light ${light ? 'text-white/45' : 'text-[#dcc17b]'}`}>[</span>
              <span className={`font-serif text-[1.06em] font-normal italic ${light ? 'text-[#e6cf94]' : 'text-[#96711e]'}`}>
                {words(part.slice(1, -1), k)}
              </span>
              <span className={`font-light ${light ? 'text-white/45' : 'text-[#dcc17b]'}`}>]</span>
            </span>
          ) : (
            words(part, k)
          ),
        )}
      </span>
    </Tag>
  )
}

/* Numbered section title in the reference layout: a big index, then the typed heading */
export function SectionHead({ n, title, aside, className = '' }) {
  return (
    <div className={`grid grid-cols-[2.75rem_1fr] items-baseline gap-x-3 sm:grid-cols-[5rem_1fr] lg:grid-cols-[1fr_3fr] ${className}`}>
      <span className="text-[clamp(1.4rem,2.6vw,2.4rem)] font-medium tracking-tight text-[#021329] tabular-nums">
        {String(n).padStart(2, '0')}
      </span>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <TypeReveal
          as="h2"
          text={title}
          className="text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.04] font-medium tracking-[-0.035em] text-[#021329]"
        />
        {aside && <p className="max-w-xs shrink-0 font-mono text-[12px] leading-relaxed text-slate-500">{aside}</p>}
      </div>
    </div>
  )
}

/* Small navy button in the reference's monospace style */
export function MonoButton({ to, href, children, onClick, variant = 'navy', className = '' }) {
  const cls = `group inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-mono text-[11px] tracking-wide uppercase transition-colors ${
    variant === 'navy' ? 'bg-[#021329] text-white hover:bg-[#0b2a52]' : 'bg-[#f5ecd7] text-[#7a5a14] hover:bg-[#efe0bd]'
  } ${className}`
  const inner = (
    <>
      {children}
      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </>
  )
  if (to)
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    )
  if (href)
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    )
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  )
}
