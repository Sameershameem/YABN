import { lazy } from 'react'

// One place that knows how to load each page's code and its hero photo,
// so both can be fetched before the visitor clicks.
const loaders = {
  '/about': () => import('./pages/About'),
  '/services': () => import('./pages/Services'),
  '/mission-100': () => import('./pages/Mission100'),
  '/contact': () => import('./pages/Contact'),
}

const heroPhoto = {
  '/': 'hero',
  '/about': 'story',
  '/services': 'class',
  '/mission-100': 'work',
  '/contact': 'connect',
}

export const lazyPage = (path) => lazy(loaders[path])

const done = new Set()

/* Fetch a page's code and hero photo ahead of time. Safe to call repeatedly. */
export function prefetch(path) {
  const clean = path.split(/[?#]/)[0]
  if (done.has(clean)) return
  done.add(clean)
  loaders[clean]?.()
  const photo = heroPhoto[clean]
  if (photo) {
    const img = new Image()
    img.decoding = 'async'
    img.src = `/img/${photo}-${window.innerWidth < 768 ? 800 : 1600}.webp`
  }
}

/* After the first page settles, quietly warm every other tab */
export function prefetchAllWhenIdle() {
  const run = () => Object.keys(heroPhoto).forEach(prefetch)
  // skip on data-saver connections
  if (navigator.connection?.saveData) return
  if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 4000 })
  else setTimeout(run, 2500)
}
