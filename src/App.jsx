import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Home from './pages/Home.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Cursor from './motion/Cursor.jsx'
import { projects } from './data.js'
import { startLenis, scrollToTop, ScrollTrigger, reducedMotion } from './motion/core.js'
import { runLoader, curtainCover, curtainReveal } from './motion/transitions.js'
import { consumePendingAnchor } from './components/nav-actions.js'

// Only "#/..." is a route. A bare "#work" is an in-page anchor and falls through to home.
function parseRoute() {
  const h = window.location.hash || ''
  if (!h.startsWith('#/')) return ''
  return h.slice(2).replace(/\/+$/, '')
}

function routeTitle(route) {
  if (route.startsWith('p/')) return projects.find((p) => p.id === route.slice(2))?.name ?? 'Not found'
  return { '': 'Index', work: 'Work', about: 'About', resume: 'Résumé' }[route] ?? 'Not found'
}

// Secondary routes are split out of the first-load bundle and prefetched when idle.
// The route transition awaits the chunk under the curtain, so Suspense never shows.
const loaders = {
  work: () => import('./pages/Work.jsx'),
  about: () => import('./pages/About.jsx'),
  resume: () => import('./pages/Resume.jsx'),
  project: () => import('./pages/ProjectDetail.jsx'),
  notfound: () => import('./pages/NotFound.jsx'),
}
const Work = lazy(loaders.work)
const About = lazy(loaders.about)
const Resume = lazy(loaders.resume)
const ProjectDetail = lazy(loaders.project)
const NotFound = lazy(loaders.notfound)
const loaderFor = (route) =>
  route === '' ? null : route.startsWith('p/') ? loaders.project : loaders[route] ?? loaders.notfound

function Page({ route }) {
  if (route.startsWith('p/')) return <ProjectDetail key={route} id={route.slice(2)} />
  switch (route) {
    case '': return <Home />
    case 'work': return <Work />
    case 'about': return <About />
    case 'resume': return <Resume />
    default: return <NotFound />
  }
}

export default function App() {
  const [route, setRoute] = useState(parseRoute)
  const shown = useRef(route)
  const curtain = useRef(null)
  const busy = useRef(Promise.resolve())

  useEffect(() => {
    startLenis()
    runLoader()
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const prefetch = () => Object.values(loaders).forEach((l) => l())
    const id = setTimeout(() => ('requestIdleCallback' in window ? requestIdleCallback(prefetch) : prefetch()), 3500)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    const onHash = () => {
      const next = parseRoute()
      if (next === shown.current) return
      shown.current = next
      busy.current = busy.current.then(async () => {
        await Promise.all([curtainCover(curtain.current, routeTitle(next)), loaderFor(next)?.()])
        setRoute(next)
        scrollToTop()
        // Let the new page mount and register its triggers before revealing.
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
        ScrollTrigger.refresh()
        curtainReveal(curtain.current)
        const anchor = consumePendingAnchor()
        if (anchor) setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' }), 900)
        document.getElementById('main')?.focus({ preventScroll: true })
      })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => { document.title = route === '' ? 'Venkata Vinesh Kumar Reddy Atluri | ML / AI Engineering Intern' : `${routeTitle(route)} · Venkata Vinesh` }, [route])

  return (
    <div className="relative min-h-screen bg-ink text-bone">
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }}
        className="sr-only z-[3001] rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav route={route} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Page route={route} />
        </Suspense>
      </main>
      <Footer />

      {/* Route curtain */}
      <div ref={curtain} aria-hidden="true" style={{ display: 'none' }}
        className="fixed inset-0 z-[2800] flex-col items-start justify-end bg-ink-2 px-6 pb-10 md:px-12 md:pb-14">
        <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'var(--spectrum)' }} />
        <div className="absolute inset-x-0 top-0 h-40 opacity-40 blur-3xl" style={{ background: 'var(--spectrum)' }} />
        <p className="eyebrow mb-4 text-mute">Loading</p>
        <div className="overflow-hidden pb-[0.14em]">
          <div data-curtain-title className="text-[clamp(2.6rem,8vw,8rem)] font-medium leading-[0.95] tracking-[-0.05em]" />
        </div>
      </div>
    </div>
  )
}
