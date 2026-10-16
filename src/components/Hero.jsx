import { useEffect, useRef, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { previews } from '../data/previews'
import { Pill } from './ui'

const d = (ms) => ({ animationDelay: `${ms}ms` })

function HeroPhoto({ name, alt }) {
  const img = useRef(null)
  const [loaded, setLoaded] = useState(false)
  // a cached photo can finish before React attaches onLoad, so check once on mount too
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth) setLoaded(true)
  }, [])

  const phonePreview = previews[`${name}-m`] || previews[name]
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-ink">
      {/* tiny inline previews paint instantly; blurred once, never animated */}
      <img src={phonePreview} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl md:hidden" />
      <img src={previews[name]} alt="" aria-hidden="true" className="absolute inset-0 hidden h-full w-full scale-110 object-cover blur-xl md:block" />
      <picture>
        <source media="(max-width: 767px)" srcSet={`/img/${name}-800.webp`} />
        <img
          ref={img}
          src={`/img/${name}-1600.webp`}
          alt={alt}
          fetchPriority="high"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`relative h-full w-full animate-settle object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </picture>
      {/* legibility: a light shade only where the copy sits, so the photo stays bright */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end text-white">
      <HeroPhoto name="hero" alt="An office desk by a window overlooking hills at sunset" />

      <div className="mx-auto w-full max-w-[1200px] px-5 pb-10 sm:px-8 sm:pb-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[880px]">
            <h1 className="animate-rise text-[clamp(2rem,5.6vw,4.25rem)] leading-[1.08] font-normal tracking-[-0.03em]" style={d(150)}>
              Building the Next Generation of Entrepreneurs
            </h1>
            <p className="mt-4 max-w-[460px] animate-rise text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-[15px]" style={d(300)}>
              YABN brings practical training, hands-on growth support and a trusted founder network together, from your first idea to a growing business.
            </p>
            <div className="mt-7 flex animate-rise flex-wrap gap-2.5 sm:mt-8 sm:gap-3" style={d(450)}>
              <Pill to="/contact" variant="white">Get in touch</Pill>
              <Pill to="/services" variant="dark" arrow={false}>Our Programs</Pill>
            </div>
          </div>

          <div className="hidden flex-col items-end gap-14 lg:flex">
            <div className="glass w-[220px] animate-rise rounded-2xl p-5" style={d(650)}>
              <p className="text-[28px] leading-none tracking-[-0.02em]">100</p>
              <p className="mt-2 text-[13px] text-white/80">Entrepreneurs: our Mission 100 target</p>
            </div>
            <a href="#story" className="inline-flex animate-fade items-center gap-2 text-[13px] text-white/80 hover:text-white" style={d(900)}>
              Scroll to Explore <ArrowDown className="size-3.5 animate-nudge" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Shorter photo hero for inner pages */
export function PageHero({ photo, alt = '', kicker, title, text }) {
  return (
    <section className="relative isolate flex min-h-[64svh] flex-col justify-end text-white sm:min-h-[70vh]">
      <HeroPhoto name={photo} alt={alt} />
      <div className="mx-auto w-full max-w-[1200px] px-5 pt-32 pb-12 sm:px-8 sm:pb-14">
        {kicker && <p className="animate-rise text-[13px] text-white/75">{kicker}</p>}
        <h1 className="mt-3 max-w-3xl animate-rise text-[clamp(2rem,5.6vw,4.25rem)] leading-[1.08] font-normal tracking-[-0.03em]" style={d(120)}>
          {title}
        </h1>
        {text && <p className="mt-4 max-w-lg animate-rise text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-[15px]" style={d(260)}>{text}</p>}
      </div>
    </section>
  )
}
