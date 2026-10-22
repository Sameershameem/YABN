import { useEffect, useRef, useState } from 'react'

// One observer shared by every element on the page keeps scroll work minimal
const callbacks = new WeakMap()
let observer = null

function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        callbacks.get(e.target)?.()
        observer.unobserve(e.target)
        callbacks.delete(e.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  )
  return observer
}

/* Fires once when the element first scrolls into view */
export function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    const io = getObserver()
    if (!el || !io) {
      setInView(true)
      return
    }
    callbacks.set(el, () => setInView(true))
    io.observe(el)
    return () => {
      io.unobserve(el)
      callbacks.delete(el)
    }
  }, [])
  return [ref, inView]
}

/* Counts from 0 to `to` once `start` is true */
export function useCountUp(to, start, duration = 1800, decimals = 0) {
  const [val, setVal] = useState(0)
  const f = 10 ** decimals
  useEffect(() => {
    if (!start) return
    // reduced motion jumps straight to the final value on the first frame
    const dur = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : duration
    let raf = 0
    const t0 = performance.now()
    const tick = (now) => {
      const p = dur ? Math.min((now - t0) / dur, 1) : 1
      setVal(Math.round(to * f * (1 - Math.pow(1 - p, 3))) / f)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, start, duration, f])
  return val
}

/* Locks page scroll while a menu or dialog is open */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}

/* ---------- Scroll-linked motion ----------
   One passive scroll listener and one rAF per frame drive every scroll animation.
   Only elements near the viewport are measured, and all rects are read before any
   callback writes styles, so the browser never has to lay out twice in a frame. */
const scrollSubs = new Set()
let ticking = false
let scrollIO = null

function runFrame() {
  ticking = false
  const vh = window.innerHeight
  const reads = []
  for (const s of scrollSubs) if (s.active) reads.push([s, s.el.getBoundingClientRect()])
  for (const [s, rect] of reads) s.cb.current(rect, vh)
}

function requestFrame() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(runFrame)
}

function getScrollIO() {
  if (scrollIO || typeof IntersectionObserver === 'undefined') return scrollIO
  scrollIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        for (const s of scrollSubs) if (s.el === e.target) s.active = e.isIntersecting
      }
      requestFrame()
    },
    { rootMargin: '25% 0px 25% 0px' },
  )
  return scrollIO
}

/* Calls cb(rect, viewportHeight) on every frame the element is near the viewport */
export function useScrollFrame(ref, cb) {
  const cbRef = useRef(cb)
  useEffect(() => {
    cbRef.current = cb
  })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const sub = { el, cb: cbRef, active: true }
    if (!scrollSubs.size) {
      window.addEventListener('scroll', requestFrame, { passive: true })
      window.addEventListener('resize', requestFrame, { passive: true })
    }
    scrollSubs.add(sub)
    getScrollIO()?.observe(el)
    requestFrame()
    return () => {
      scrollIO?.unobserve(el)
      scrollSubs.delete(sub)
      if (!scrollSubs.size) {
        window.removeEventListener('scroll', requestFrame)
        window.removeEventListener('resize', requestFrame)
      }
    }
  }, [ref])
}

export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)

/* 0 when a tall section's top reaches the viewport top, 1 when its bottom reaches the viewport bottom */
export const stickyProgress = (rect, vh) => clamp01(-rect.top / Math.max(1, rect.height - vh))

/* Live boolean for a media query, e.g. useMedia('(min-width: 1024px)') */
export function useMedia(query) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}
