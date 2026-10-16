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
