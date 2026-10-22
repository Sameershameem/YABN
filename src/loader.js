// Lifts the inline loader from index.html once the page is ready to be seen.
// Waits for the hero photo (when the page has one), but never less than MIN_MS
// so the reveal feels intentional, and never more than MAX_MS so a slow network can't trap visitors.
const MIN_MS = 1200
const MAX_MS = 4000

export function dismissLoader() {
  const el = document.getElementById('loader')
  if (!el) return
  const root = document.documentElement
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const start = performance.now()

  const heroReady = new Promise((resolve) => {
    // the hero <img> is rendered by React; give it a moment to appear
    setTimeout(() => {
      const img = document.querySelector('img[fetchpriority="high"]')
      if (!img || img.complete) return resolve()
      img.addEventListener('load', resolve, { once: true })
      img.addEventListener('error', resolve, { once: true })
    }, 60)
  })
  const timeout = new Promise((resolve) => setTimeout(resolve, MAX_MS))

  Promise.race([heroReady, timeout]).then(() => {
    const wait = Math.max(0, (reduce ? 200 : MIN_MS) - (performance.now() - start))
    setTimeout(() => {
      el.classList.add('is-done')
      // start the page's entrance animations as the curtain begins to lift
      setTimeout(() => root.classList.remove('is-loading'), 250)
      // remove it once the lift finishes (with a fallback in case transitionend never fires)
      el.addEventListener('transitionend', (e) => e.target === el && el.remove())
      setTimeout(() => el.remove(), 1500)
    }, wait)
  })
}
