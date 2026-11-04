import { useEffect, useRef, useState } from 'react'
import { profile } from '../data.js'
import { Roll, Magnetic } from '../motion/ui.jsx'
import { gsap, reducedMotion, lockScroll, onEnter } from '../motion/core.js'
import { goToAnchor } from './nav-actions.js'

const LINKS = [
  { label: 'Work', href: '#/work', route: 'work' },
  { label: 'About', href: '#/about', route: 'about' },
  { label: 'Résumé', href: '#/resume', route: 'resume' },
  { label: 'Contact', href: '#/', anchor: 'contact' },
]

function useScrolled(threshold = 40) {
  const [s, setS] = useState(false)
  useEffect(() => {
    let f = 0
    const read = () => { f = 0; setS(window.scrollY > threshold) }
    const on = () => { if (!f) f = requestAnimationFrame(read) }
    read(); window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(f) }
  }, [threshold])
  return s
}

export default function Nav({ route }) {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const bar = useRef(null), panel = useRef(null), btn = useRef(null)

  // Nav arrives with the page.
  useEffect(() => {
    if (reducedMotion()) return
    gsap.set(bar.current, { yPercent: -120, opacity: 0 })
    return onEnter(() => gsap.to(bar.current, { yPercent: 0, opacity: 1, duration: 1.1, ease: 'expo.out', delay: 0.35 }))
  }, [])

  // Close the menu when the route changes (adjusting state during render, not in an effect).
  const [lastRoute, setLastRoute] = useState(route)
  if (route !== lastRoute) { setLastRoute(route); setOpen(false) }

  // Mobile menu: focus trap, Escape, scroll lock, staggered links.
  useEffect(() => {
    if (!open) return
    lockScroll(true)
    const el = panel.current, trigger = btn.current
    const items = el.querySelectorAll('[data-menu-item]')
    if (!reducedMotion()) gsap.fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out', delay: 0.1 })
    const focusables = () => [...el.querySelectorAll('a[href], button')]
    focusables()[0]?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key !== 'Tab') return
      const f = focusables(), first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); lockScroll(false); trigger?.focus() }
  }, [open])

  const onLink = (l) => (e) => {
    if (l.anchor) { setOpen(false); goToAnchor(e, l.anchor) }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[1000]">
      <div aria-hidden="true"
        className={`pointer-events-none absolute inset-0 border-b border-line bg-ink/70 backdrop-blur-xl transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      <nav ref={bar} aria-label="Main" className={`relative z-[1102] mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-[padding] duration-500 md:px-10 ${scrolled ? 'py-3 md:py-4' : 'py-5 md:py-7'}`}>
        <a href="#/" className="group flex items-center gap-3">
          <span aria-hidden="true" className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-line font-mono text-[10px] tracking-wider">
            <span className="absolute inset-0 scale-0 rounded-full transition-transform duration-500 group-hover:scale-100" style={{ background: 'var(--spectrum)' }} />
            <span className="relative">VV</span>
          </span>
          <span className="sr-only whitespace-nowrap text-[15px] font-medium tracking-tight sm:not-sr-only sm:block"><Roll>Venkata Vinesh</Roll><span className="sr-only">, home</span></span>
        </a>

        <ul className="hidden items-center gap-6 md:flex lg:gap-9">
          {LINKS.map((l) => {
            const active = l.route && route === l.route
            return (
              <li key={l.label}>
                <a href={l.href} onClick={onLink(l)} aria-current={active ? 'page' : undefined}
                  className={`eyebrow relative flex items-center gap-2 py-2 transition-colors ${active ? 'text-bone' : 'text-bone/70 hover:text-bone'}`}>
                  {active && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cyan" />}
                  <Roll>{l.label}</Roll>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <span className="eyebrow hidden items-center gap-2 text-mute lg:flex">
            <span aria-hidden="true" className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
            Available Mar 2027
          </span>
          <Magnetic strength={0.3}>
            <a href={`mailto:${profile.email}`} className="btn-pill eyebrow inline-flex rounded-full border border-bone/40 px-5 py-3">
              <Roll>Say hello</Roll>
            </a>
          </Magnetic>
        </div>

        <button ref={btn} type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)} className="relative flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full border border-line bg-ink/40 backdrop-blur md:hidden">
          <span aria-hidden="true" className={`h-px w-5 bg-bone transition-transform duration-500 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span aria-hidden="true" className={`h-px w-5 bg-bone transition-transform duration-500 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <div id="mobile-menu" ref={panel} role="dialog" aria-modal="true" aria-label="Site navigation" inert={!open}
        className={`fixed inset-0 z-[1101] flex flex-col justify-between bg-ink px-6 pb-10 pt-28 transition-[clip-path] duration-700 ease-[cubic-bezier(.76,0,.24,1)] md:hidden ${open ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)]'}`}>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px]" style={{ background: 'var(--spectrum)' }} />
        <ul>
          {[{ label: 'Index', href: '#/', route: '' }, ...LINKS].map((l, i) => (
            <li key={l.label} className="overflow-hidden border-b border-line">
              <a data-menu-item href={l.href} onClick={onLink(l)}
                className="flex items-baseline gap-4 py-4 text-[2.6rem] font-medium leading-none tracking-[-0.04em]">
                <span className="font-mono text-[11px] tracking-normal text-mute">0{i + 1}</span>{l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-bone/80">{profile.seeking.headline} {profile.seeking.where}</p>
          <div className="flex gap-3 font-mono text-xs">
            <a href={profile.github} target="_blank" rel="noreferrer" className="chip px-4 py-2.5">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="chip px-4 py-2.5">LinkedIn</a>
            <a href={`mailto:${profile.email}`} className="chip px-4 py-2.5">Email</a>
          </div>
        </div>
      </div>
    </header>
  )
}
