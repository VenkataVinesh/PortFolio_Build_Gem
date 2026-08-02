import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Custom magnetic cursor: a lerped ring + dot that grows over [data-cursor] targets. */
export function Cursor() {
  const ring = useRef(null), dot = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const pos = { x: innerWidth / 2, y: innerHeight / 2 }, ringPos = { ...pos }
    let hovering = false
    const move = (e) => { pos.x = e.clientX; pos.y = e.clientY }
    const over = (e) => { hovering = !!e.target.closest('[data-cursor]') }
    addEventListener('pointermove', move); addEventListener('pointerover', over)
    let raf
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18; ringPos.y += (pos.y - ringPos.y) * 0.18
      if (dot.current) dot.current.style.transform = `translate(${pos.x}px,${pos.y}px)`
      if (ring.current) {
        const s = hovering ? 2.4 : 1
        ring.current.style.transform = `translate(${ringPos.x}px,${ringPos.y}px) translate(-50%,-50%) scale(${s})`
        ring.current.style.opacity = hovering ? '0.5' : '1'
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', move); removeEventListener('pointerover', over) }
  }, [])
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1000] hidden md:block">
      <div ref={ring} className="absolute h-9 w-9 rounded-full border border-white/60 mix-blend-difference transition-[opacity] will-change-transform" style={{ left: 0, top: 0 }} />
      <div ref={dot} className="absolute -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-white mix-blend-difference will-change-transform" style={{ left: 0, top: 0 }} />
    </div>
  )
}

/* Mobile nav: hamburger → full-screen overlay. Focus-trapped, Escape closes,
   closes on link selection, locks body scroll while open. */
export function MobileMenu({ links = [], footer = null }) {
  const [open, setOpen] = useState(false)
  const panel = useRef(null), btn = useRef(null)
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const el = panel.current, trigger = btn.current
    const focusables = () => [...el.querySelectorAll('a[href], button:not([disabled])')]
    focusables()[0]?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key !== 'Tab') return
      const f = focusables(); if (!f.length) return
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; trigger?.focus() }
  }, [open])
  return (
    <div className="md:hidden">
      <button ref={btn} type="button" aria-expanded={open} aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}
        className="relative z-[1101] flex h-10 w-10 flex-col items-center justify-center gap-[7px] mix-blend-difference">
        <span aria-hidden="true" className={`h-px w-6 bg-white transition-transform duration-300 ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
        <span aria-hidden="true" className={`h-px w-6 bg-white transition-transform duration-300 ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
      </button>
      <div id="mobile-menu" ref={panel} role="dialog" aria-modal="true" aria-label="Site navigation"
        className={`fixed inset-0 z-[1100] flex flex-col justify-between overflow-y-auto bg-[#060410]/95 px-6 pb-10 pt-28 backdrop-blur-xl transition-[opacity,visibility] duration-300 ${open ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0'}`}>
        <nav className="flex flex-col">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-white/10 py-5 font-mono text-3xl uppercase tracking-tight text-white">
              <span className="text-xs" style={{ color: 'var(--section-accent, #7c5cff)' }}>0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        {footer}
      </div>
    </div>
  )
}

/* Magnetic wrapper — element drifts toward the cursor while hovered. */
export function Magnetic({ children, strength = 0.4, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength, duration: 0.6, ease: 'power3.out' })
    }
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' })
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [strength])
  return <span ref={ref} className={`inline-block ${className}`}>{children}</span>
}

/* Film grain overlay. */
export function Grain() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[900] opacity-[0.05] mix-blend-overlay"
      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
  )
}

/* Scroll-reveal: children rise + fade as they enter the viewport. */
export function Reveal({ children, y = 40, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const anim = gsap.fromTo(el, { y, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, delay, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    })
    return () => { anim.scrollTrigger?.kill(); anim.kill() }
  }, [y, delay])
  return <div ref={ref} className={className}>{children}</div>
}

/* Kinetic heading: each line sits in an overflow-clip and slides up on entry. */
export function Kinetic({ lines, className = '', start = 'top 90%' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const inner = el.querySelectorAll('[data-line]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { gsap.set(inner, { y: 0 }); return }
    const anim = gsap.fromTo(inner, { yPercent: 115 }, {
      yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12,
      scrollTrigger: { trigger: el, start },
    })
    return () => { anim.scrollTrigger?.kill(); anim.kill() }
  }, [start])
  return (
    <span ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <span data-line className="block will-change-transform">{l}</span>
        </span>
      ))}
    </span>
  )
}

/* Clip-path wipe reveal — content unmasks on scroll entry. */
export function ClipReveal({ children, dir = 'left', className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { gsap.set(el, { clipPath: 'inset(0 0 0 0)' }); return }
    const from = dir === 'up' ? 'inset(100% 0 0 0)' : dir === 'right' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'
    const a = gsap.fromTo(el, { clipPath: from }, {
      clipPath: 'inset(0 0 0 0)', duration: 1.15, ease: 'power4.inOut',
      scrollTrigger: { trigger: el, start: 'top 80%' },
    })
    return () => { a.scrollTrigger?.kill(); a.kill() }
  }, [dir])
  return <div ref={ref} className={className} style={{ clipPath: 'inset(0 100% 0 0)' }}>{children}</div>
}

/* Mount children only when the wrapper nears the viewport (IntersectionObserver).
   Used to defer heavy WebGL components; shows `fallback` until then. */
export function LazyMount({ children, fallback = null, rootMargin = '400px', className = '' }) {
  const ref = useRef(null)
  // No IntersectionObserver support → just mount immediately.
  const [show, setShow] = useState(() => typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    const el = ref.current; if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setShow(true); io.disconnect() }
    }, { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])
  return <div ref={ref} className={className}>{show ? children : fallback}</div>
}

/* Infinite marquee band. */
export function Marquee({ items, className = '', speed = 28 }) {
  const row = items.concat(items)
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div data-marquee className="flex shrink-0 animate-[marquee_linear_infinite] gap-10 pr-10" style={{ animationDuration: `${speed}s` }}>
        {row.map((it, i) => (
          <span key={i} aria-hidden={i >= items.length ? 'true' : undefined} className="flex items-center gap-10 whitespace-nowrap">{it}<span className="opacity-30">/</span></span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media (prefers-reduced-motion: reduce){[data-marquee]{animation:none !important}}`}</style>
    </div>
  )
}
