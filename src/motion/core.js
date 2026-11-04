import { useLayoutEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.config({ nullTargetWarn: false })

const hasWindow = typeof window !== 'undefined'
const mq = (q) => hasWindow && window.matchMedia(q).matches

export const reducedMotion = () => mq('(prefers-reduced-motion: reduce)')
export const coarsePointer = () => mq('(pointer: coarse)')
// "Lite": phones, Save-Data and reduced motion get cheaper effects.
export const liteMode = () =>
  reducedMotion() || navigator.connection?.saveData === true || (coarsePointer() && mq('(max-width: 900px)'))

/* ---- Lenis, driven from the GSAP ticker so scroll and ScrollTrigger share a frame ---- */
let lenis = null
export function startLenis() {
  if (lenis || reducedMotion()) return lenis
  lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}
export const getLenis = () => lenis
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  window.scrollTo(0, 0)
}
export function scrollToEl(el, offset = 0) {
  if (el === 0) { if (lenis) lenis.scrollTo(0, { duration: 1.6 }); else window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' }); return }
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.4 })
  else el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
}
export function lockScroll(on) {
  if (lenis) (on ? lenis.stop() : lenis.start())
  document.documentElement.style.overflow = on ? 'hidden' : ''
}

/* ---- Page-enter bus: content animations wait until the loader/curtain has lifted ---- */
let entered = false
let queue = []
export function setEntered(v) {
  entered = v
  if (v) { const q = queue; queue = []; q.forEach((fn) => fn()) }
}
/** Run `fn` once the current page is visible. Returns a cancel function. */
export function onEnter(fn) {
  let live = true
  const run = () => { if (live) fn() }
  if (entered) requestAnimationFrame(run)
  else queue.push(run)
  return () => { live = false }
}

/* ---- Hook: scoped GSAP context that reverts on unmount ---- */
export function useGsap(fn, deps = []) {
  const scope = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => fn(scope.current), scope.current || undefined)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return scope
}

export { gsap, ScrollTrigger }
