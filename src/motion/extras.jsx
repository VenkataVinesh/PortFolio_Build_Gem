import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Intro loader: name + 0→100 counter, then a curtain wipes up to reveal the page. */
export function Loader({ name = 'VINESH' }) {
  const root = useRef(null), num = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.style.overflow = 'hidden'
    const obj = { v: 0 }
    const tl = gsap.timeline({ onComplete: () => { document.body.style.overflow = ''; ScrollTrigger.refresh() } })
    if (reduce) { setN(100); tl.set(root.current, { display: 'none' }); document.body.style.overflow = ''; return }
    tl.to(obj, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => setN(Math.round(obj.v)) })
      .to('[data-loadbar]', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
      .to('[data-loadinner]', { yPercent: -110, duration: 0.7, ease: 'power4.inOut' }, '+=0.15')
      .to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.35')
      .set(root.current, { display: 'none' })
    return () => { document.body.style.overflow = '' }
  }, [])
  return (
    <div ref={root} className="fixed inset-0 z-[2000] flex items-end justify-between bg-[#060410] px-6 pb-8 md:px-10 md:pb-10">
      <div data-loadinner className="font-mono text-[12vw] font-medium leading-none tracking-tighter text-white md:text-[8vw]">{name}</div>
      <div ref={num} className="font-mono text-2xl tabular-nums text-white/60">{String(n).padStart(3, '0')}</div>
      <div className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-white/40" data-loadbar />
    </div>
  )
}

/* Thin scroll-progress bar pinned to the top. */
export function ScrollProgress({ color = '#a855f7' }) {
  const bar = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`
    }
    addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => removeEventListener('scroll', onScroll)
  }, [])
  return <div className="fixed left-0 top-0 z-[1500] h-[2px] w-full origin-left scale-x-0" ref={bar} style={{ background: color }} />
}

/* Pinned scrub statement: words brighten as you scroll through. */
export function ScrubText({ text, className = '' }) {
  const ref = useRef(null)
  const words = text.split(' ')
  useEffect(() => {
    const el = ref.current; if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { gsap.set(el.children, { opacity: 1 }); return }
    const a = gsap.fromTo(el.children, { opacity: 0.16 }, {
      opacity: 1, stagger: 0.25, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
    })
    return () => { a.scrollTrigger?.kill(); a.kill() }
  }, [])
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => <span key={i} className="inline-block">{w}&nbsp;</span>)}
    </p>
  )
}

/* Count-up number when it enters the viewport. */
export function CountUp({ to, suffix = '', className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obj = { v: 0 }
    const a = gsap.to(obj, {
      v: to, duration: 1.6, ease: 'power3.out',
      onUpdate: () => { el.textContent = (Number.isInteger(to) ? Math.round(obj.v) : obj.v.toFixed(2)) + suffix },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
    return () => { a.scrollTrigger?.kill(); a.kill() }
  }, [to, suffix])
  return <span ref={ref} className={className}>0{suffix}</span>
}
