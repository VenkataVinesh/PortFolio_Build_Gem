import React, { useEffect, useRef } from 'react'
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
    <div className="pointer-events-none fixed inset-0 z-[1000] hidden md:block">
      <div ref={ring} className="absolute h-9 w-9 rounded-full border border-white/60 mix-blend-difference transition-[opacity] will-change-transform" style={{ left: 0, top: 0 }} />
      <div ref={dot} className="absolute -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-white mix-blend-difference will-change-transform" style={{ left: 0, top: 0 }} />
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
    <div className="pointer-events-none fixed inset-0 z-[900] opacity-[0.05] mix-blend-overlay"
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

/* Infinite marquee band. */
export function Marquee({ items, className = '', speed = 28 }) {
  const row = items.concat(items)
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div className="flex shrink-0 animate-[marquee_linear_infinite] gap-10 pr-10" style={{ animationDuration: `${speed}s` }}>
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">{it}<span className="opacity-30">/</span></span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
