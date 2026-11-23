import { useEffect, useLayoutEffect, useRef } from 'react'
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

// A real GPU (not a software rasteriser such as SwiftShader or llvmpipe). Checked once.
let gpu
export function hasGpu() {
  if (gpu !== undefined) return gpu
  gpu = false
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') || c.getContext('webgl')
    if (gl) {
      const dbg = gl.getExtension('WEBGL_debug_renderer_info')
      const r = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : ''
      gpu = !/swiftshader|llvmpipe|software/i.test(r)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  } catch { gpu = false }
  return gpu
}
// The scroll-through 3D hero runs only with motion allowed and a real GPU.
export const canRunStory = () => hasWindow && !reducedMotion() && hasGpu()

// The site-wide background pauses while any full-screen scene covers it. Scenes hold
// and release; a count, so two overlapping scenes cannot unpause each other early.
let holds = 0
export const worldPaused = () => holds > 0
export function holdWorld(on) {
  const was = holds > 0
  holds = Math.max(0, holds + (on ? 1 : -1))
  if (was && holds === 0 && hasWindow) window.dispatchEvent(new Event('world:resume'))
}

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

/* ---- Hook: tactile card. Tilts toward the pointer (max degrees) and feeds --mx/--my
   to a `.tilt-sheen` child for the specular highlight and lit border. Fine pointers only. ---- */
export function useTilt(max = 5) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el || coarsePointer() || reducedMotion()) return
    gsap.set(el, { transformPerspective: 1400 })
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.9, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.9, ease: 'power3.out' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
      ry((x - 0.5) * 2 * max); rx(-(y - 0.5) * 2 * max)
      el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
      el.dataset.lit = ''
    }
    const leave = () => { rx(0); ry(0); delete el.dataset.lit }
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [max])
  return ref
}

export { gsap, ScrollTrigger }
