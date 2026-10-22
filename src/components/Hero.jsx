import { ArrowRight } from 'lucide-react'
import { GoldMark, NotchLine, Shell } from './landing'

const faces = ['founder', 'class', 'shop', 'work', 'connect']

/* Home hero: light gradient, one big promise, proof and a single clear action.
   The gold emblem floats beside it and returns through the page. */
export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-[radial-gradient(70%_45%_at_100%_0%,#f6ebcf,transparent),radial-gradient(70%_45%_at_0%_100%,#e8eef7,transparent)] pt-28 pb-10 sm:pt-40 sm:pb-28 lg:block lg:min-h-0">
      <Shell>
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <span className="inline-flex animate-rise items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#021329] shadow-sm ring-1 ring-slate-200">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#B98F32]/60" />
                <span className="relative size-2 rounded-full bg-[#B98F32]" />
              </span>
              Mission 100 · Applications open
            </span>

            <h1 className="relative mt-7 text-[clamp(2.35rem,10.4vw,5.6rem)] leading-[0.98] font-medium tracking-[-0.045em] text-[#021329]">
              <span className="line-mask">
                <span className="animate-lineup" style={{ animationDelay: '120ms' }}>
                  Turn your idea into
                </span>
              </span>
              <span className="line-mask">
                <span className="animate-lineup" style={{ animationDelay: '240ms' }}>
                  a business that <span className="font-light text-[#dcc17b]">[</span>
                  <span className="font-serif text-[1.06em] font-normal text-[#96711e] italic">pays</span>
                  <span className="font-light text-[#dcc17b]">]</span>.
                </span>
              </span>
            </h1>

            <NotchLine />

            <div className="mt-7 grid animate-rise gap-7 md:mt-8 md:grid-cols-[auto_1fr] md:gap-12" style={{ animationDelay: '420ms' }}>
              <div className="order-last flex items-center gap-4 rounded-2xl bg-white/80 p-3.5 ring-1 ring-slate-200/80 md:order-none md:block md:bg-transparent md:p-0 md:ring-0">
                <div className="flex shrink-0 -space-x-2.5">
                  {faces.map((f) => (
                    <img
                      key={f}
                      src={`/img/${f}-800.webp`}
                      alt=""
                      width="44"
                      height="44"
                      decoding="async"
                      className="size-9 rounded-full object-cover ring-[3px] ring-white sm:size-11"
                    />
                  ))}
                </div>
                <div className="md:mt-3">
                  <p className="text-[15px] leading-tight font-medium text-[#021329]">80,000+ learners mentored</p>
                  <p className="mt-0.5 text-[14px] text-slate-600">4.9★ rating on Google</p>
                </div>
              </div>
              <div>
                <p className="max-w-md text-[17px] leading-relaxed text-slate-700 max-sm:text-[16px]">
                  Practical training, 1-on-1 mentorship and a trusted founder network. Led by Yasir Ali.
                </p>
                <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
                  <a
                    href="#apply"
                    className="group inline-flex items-center justify-between gap-2 rounded-full bg-[#021329] py-2 pr-2 pl-6 text-[16px] font-medium text-white shadow-[0_14px_30px_-12px_rgba(2,19,41,0.5)] transition-colors hover:bg-[#0b2a52] sm:justify-start sm:text-[15px] sm:shadow-none"
                  >
                    Apply in 60 seconds
                    <span className="grid size-9 place-items-center rounded-full bg-[#B98F32] text-[#021329]">
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </a>
                  <a
                    href="#offer"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[15px] font-medium text-[#021329] ring-1 ring-slate-300 transition-colors hover:ring-[#B98F32]"
                  >
                    How it works
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-6 -right-3 animate-tile sm:-top-10 lg:static" style={{ animationDelay: '300ms', '--tilt-from': '-30deg' }}>
            <GoldMark className="w-24 sm:w-36 lg:mx-auto lg:w-[340px]" />
          </div>
        </div>
      </Shell>
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
