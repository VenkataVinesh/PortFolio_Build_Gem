import { useEffect, useRef, useState } from 'react'
import scenes from '../scenes.json'
import { gsap, ScrollTrigger, reducedMotion, coarsePointer } from './core.js'
import { whoosh } from './sound.js'

/*
  A cinematic scene: a pinned, full-screen film that plays frame by frame as you
  scroll (frames cut by scripts/frames.mjs). `id` is one clip or a list of clips
  played back to back: the clips are generated so each one starts on the frame the
  previous one ends on, so a list reads as one unbroken shot.

  Overlay children marked `data-beat="0.1,0.45"` fade in and out over that span of
  the whole film. While it plays, the section's `data-scene` follows the clip on
  screen, so the blurred backdrop behind the page (World.jsx) follows the story.

  Loading: the frames around the scroll position first (ahead before behind), then
  the rest coarse to fine, a few at a time, so scrubbing never waits on the far end
  of a long film. Phones use the lighter set. Reduced motion shows the last frame.
  If any clip has no frames yet the scene renders nothing.
*/

const BASE = import.meta.env.BASE_URL
const AHEAD = 36, BEHIND = 12, PARALLEL = 4

export default function FrameScene({ id, sectionId, length = 320, label = 'Illustration', children, className = '' }) {
  const ids = [].concat(id)
  const key = ids.join(',')
  const metas = ids.map((k) => scenes[k])
  const missing = metas.some((m) => !m)
  const section = useRef(null)
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = section.current, canvas = canvasRef.current
    if (missing || !el || !canvas) return
    const ctx = canvas.getContext('2d')
    const phone = coarsePointer() && window.innerWidth < 900
    const set = phone ? 'm' : 'd'
    // Global frame index -> (clip, local frame).
    const parts = []
    let count = 0
    ids.forEach((k, n) => { const c = phone ? metas[n].phoneFrames : metas[n].frames; parts.push({ k, from: count, c }); count += c })
    const partAt = (i) => parts.find((p) => i < p.from + p.c) ?? parts[parts.length - 1]
    const src = (i) => { const p = partAt(i); return `${BASE}scenes/${p.k}/${set}/${String(i - p.from).padStart(3, '0')}.webp` }

    const reduced = reducedMotion()
    const imgs = new Array(count)
    let target = reduced ? count - 1 : 0, cur = target, drawn = -1, raf = 0, started = false, dead = false

    const loaded = (i) => imgs[i]?.complete && imgs[i].naturalWidth
    const nearestLoaded = (i) => {
      for (let d = 0; d < count; d++) {
        if (loaded(i - d)) return i - d
        if (loaded(i + d)) return i + d
      }
      return -1
    }
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * dpr); canvas.height = Math.round(canvas.clientHeight * dpr)
      drawn = -1
    }
    const draw = () => {
      const k = nearestLoaded(Math.round(cur)); if (k < 0 || k === drawn) return
      const img = imgs[k], cw = canvas.width, ch = canvas.height
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight) // cover
      const w = img.naturalWidth * s, h = img.naturalHeight * s
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
      drawn = k
      if (!ready) setReady(true)
    }
    const tick = () => {
      raf = 0
      cur += (target - cur) * 0.2
      draw()
      if (Math.abs(target - cur) > 0.05) raf = requestAnimationFrame(tick)
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick) }

    // Next frame worth fetching: the window around the scroll position, then coarse to fine.
    const order = []
    for (const stride of [16, 8, 4, 2, 1]) for (let i = 0; i < count; i += stride) order.push(i)
    let cursor = 0
    const next = () => {
      const t = Math.round(target)
      for (let d = 0; d <= AHEAD; d++) {
        const a = t + d; if (a < count && !imgs[a]) return a
        if (d <= BEHIND) { const b = t - d; if (b >= 0 && !imgs[b]) return b }
      }
      while (cursor < order.length && imgs[order[cursor]]) cursor++
      return cursor < order.length ? order[cursor] : -1
    }
    const fetchOne = (i) => new Promise((ok) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = img.onerror = () => { if (!dead) { drawn = -1; kick() } ok() }
      img.src = src(i)
      imgs[i] = img
    })
    const worker = async () => {
      for (let i = next(); i >= 0 && !dead; i = next()) await fetchOne(i)
    }
    const start = async () => {
      if (started) return; started = true
      await fetchOne(reduced ? count - 1 : 0)
      if (reduced) return
      for (let n = 0; n < PARALLEL; n++) worker()
    }

    fit()
    const ro = new ResizeObserver(() => { fit(); kick() }); ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) start() }, { rootMargin: '150% 0px' })
    io.observe(el)

    const ctxG = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el, start: 'top top', end: 'bottom bottom',
        onUpdate: (s) => {
          if (reduced) return
          target = s.progress * (count - 1); kick()
          const k = partAt(Math.round(target)).k
          if (el.dataset.scene !== k) el.dataset.scene = k
        },
        onEnter: whoosh,
        onEnterBack: whoosh,
      })
      // Overlay beats: fade in over the first 12% of their span, out over the last 12%.
      const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.5 } })
      el.querySelectorAll('[data-beat]').forEach((b) => {
        const [a, z] = b.dataset.beat.split(',').map(Number)
        const f = Math.max(0.015, Math.min(0.05, (z - a) * 0.12))
        if (a <= 0) gsap.set(b, { autoAlpha: 1, y: 0 })
        else tl.fromTo(b, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: f }, a)
        if (z < 1) tl.to(b, { autoAlpha: 0, y: -40, duration: f }, z - f)
      })
      tl.fromTo(el.querySelector('[data-scene-bar]'), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
      tl.set({}, {}, 1)
    }, el)

    return () => { dead = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); ctxG.revert() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, missing])

  if (missing) return null
  return (
    <section ref={section} id={sectionId} data-scene={ids[0]} className={`relative ${className}`} style={{ height: `${length}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Shot and veils feather out top and bottom, dissolving into the same footage, blurred, behind the page (World.jsx). */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_14%,#000_78%,transparent_100%)]">
          <canvas ref={canvasRef}
            className={`absolute inset-0 h-full w-full transition-opacity duration-[1200ms] ${ready ? 'opacity-100' : 'opacity-0'}`} />
          {/* Veils: keep type readable at the edges without dulling the centre of the shot. */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,6,9,0.85)_0%,rgba(6,6,9,0.25)_40%,transparent_60%),linear-gradient(to_bottom,rgba(6,6,9,0.6)_0%,transparent_22%)]" />
        </div>
        <div className="relative z-10 h-full">{children}</div>
        <p className="pointer-events-none absolute bottom-6 right-5 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45 md:right-10">{label}</p>
        <div aria-hidden="true" className="absolute inset-x-5 bottom-4 z-10 h-px bg-bone/10 md:inset-x-10">
          <div data-scene-bar className="h-px origin-left scale-x-0" style={{ background: 'var(--spectrum)' }} />
        </div>
      </div>
    </section>
  )
}
