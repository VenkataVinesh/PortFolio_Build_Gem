import { useEffect, useRef } from 'react'
import scenes from '../scenes.json'
import Lumen from './Lumen.jsx'
import { reducedMotion, coarsePointer } from './core.js'

/*
  One live background behind every page, made from the same generated footage as the
  films, so the whole site reads as one world rather than footage pasted onto an
  unrelated backdrop.

  - Backdrop: the scene you are in or last passed (else the page's first), as a tiny
    frame drawn into a 96x54 canvas and upscaled (the upscale is the blur, so it costs
    nothing per frame). It never holds still: every few seconds it crossfades to
    another moment of the same scene, and the whole layer drifts slowly.
  - Light: the same drifting motes as the films (Lumen), dimmer, yielding to a film
    while one fills the screen.
  - Glow: a soft light that follows the pointer through the content sections.
  A dark veil keeps body text at full contrast.
*/
const BASE = import.meta.env.BASE_URL
const W = 96, H = 54
const FALLBACK = 'film3'
const MOMENTS = [0.5, 0.15, 0.85, 0.35, 0.65] // points in a clip the backdrop moves between
const DWELL = 6000
const LAYER = 'absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[3000ms] ease-in-out'

function drawFrame(canvas, id, at) {
  const meta = scenes[id]
  return new Promise((ok) => {
    if (!meta) return ok(false)
    const img = new Image()
    img.onload = () => {
      const ctx = canvas.getContext('2d')
      ctx.filter = 'blur(1.5px) saturate(1.15)'
      ctx.drawImage(img, -4, -4, W + 8, H + 8)
      ok(true)
    }
    img.onerror = () => ok(false)
    img.src = `${BASE}scenes/${id}/d/${String(Math.round((meta.frames - 1) * at)).padStart(3, '0')}.webp`
  })
}

export default function World({ route }) {
  const a = useRef(null), b = useRef(null), glow = useRef(null)
  const state = useRef({ id: null, moment: 0, front: 0, seq: 0 })

  useEffect(() => {
    const layers = [a.current, b.current]
    const s = state.current
    let raf = 0
    const show = async (id, moment) => {
      const seq = ++s.seq
      const back = layers[1 - s.front]
      if (!(await drawFrame(back, id, MOMENTS[moment])) || seq !== s.seq) return
      back.style.opacity = '1'
      layers[s.front].style.opacity = '0'
      s.front = 1 - s.front
    }
    const pick = () => {
      raf = 0
      const line = window.innerHeight * 0.6
      const els = [...document.querySelectorAll('[data-scene]')]
      let id = els[0]?.dataset.scene ?? FALLBACK
      for (const el of els) if (el.getBoundingClientRect().top <= line) id = el.dataset.scene
      if (id !== s.id) { s.id = id; s.moment = 0; show(id, 0) }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(pick) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const t = setTimeout(pick, 400) // after the new route has rendered
    pick()
    // The backdrop keeps moving: the next moment of the same scene every few seconds.
    const cycle = reducedMotion() ? 0 : setInterval(() => {
      if (document.hidden || !s.id) return
      s.moment = (s.moment + 1) % MOMENTS.length
      show(s.id, s.moment)
    }, DWELL)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); clearTimeout(t); clearInterval(cycle); cancelAnimationFrame(raf) }
  }, [route])

  // Pointer glow: eased toward the cursor, written as CSS variables (no layout work).
  useEffect(() => {
    const el = glow.current
    if (!el || reducedMotion() || coarsePointer()) return
    let x = 0.5, y = 0.4, tx = x, ty = y, raf = 0
    const step = () => {
      x += (tx - x) * 0.08; y += (ty - y) * 0.08
      el.style.setProperty('--gx', `${(x * 100).toFixed(2)}%`); el.style.setProperty('--gy', `${(y * 100).toFixed(2)}%`)
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(step) : 0
    }
    const onMove = (e) => { tx = e.clientX / window.innerWidth; ty = e.clientY / window.innerHeight; if (!raf) raf = requestAnimationFrame(step) }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink">
      <div className="world-drift absolute inset-[-8%]">
        <canvas ref={a} width={W} height={H} className={LAYER} />
        <canvas ref={b} width={W} height={H} className={LAYER} />
      </div>
      <div className="absolute inset-0 bg-[rgba(6,6,9,0.5)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_0%,rgba(6,6,9,0.55)_70%,rgba(6,6,9,0.9)_100%)]" />
      <div ref={glow} className="absolute inset-0 mix-blend-screen [background:radial-gradient(38vmax_38vmax_at_var(--gx,50%)_var(--gy,40%),rgba(124,92,255,0.10),rgba(34,211,238,0.05)_45%,transparent_70%)]" />
      <Lumen className="absolute inset-0 h-full w-full opacity-90" density={0.75} yieldToFilm />
    </div>
  )
}
