import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lenis momentum smooth scroll, synced to GSAP ScrollTrigger.
export function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => { lenis.raf(time * 1000); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    // Lenis changes scroll height after fonts/layout settle — refresh triggers.
    const r = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => { clearTimeout(r); lenis.destroy() }
  }, [])
}

// Split text into word/char spans for kinetic reveals.
export function splitLines(text) {
  return text.split('\n')
}
