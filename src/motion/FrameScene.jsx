import { useEffect, useRef, useState } from 'react'
import scenes from '../scenes.json'
import { gsap, ScrollTrigger, reducedMotion, coarsePointer, holdWorld } from './core.js'

/*
  A cinematic chapter: a pinned, full-screen clip that plays frame by frame as you
  scroll (frames cut by scripts/frames.mjs). Overlay content sits on top; children
  marked `data-beat="0.1,0.45"` fade in and out over that span of the chapter.

  Frames load only when the chapter is near: first frame, then a coarse pass
  (every 8th), then the gaps, so scrubbing works early and sharpens as it loads.
  Phones use the lighter set. Reduced motion shows the last frame, still.
  If a scene has no frames yet it renders nothing at all.
*/

const BASE = import.meta.env.BASE_URL

export default function FrameScene({ id, length = 320, label = 'Illustration', children, className = '' }) {
  const meta = scenes[id]
  const section = useRef(null)
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = section.current, canvas = canvasRef.current
    if (!meta || !el || !canvas) return
    const ctx = canvas.getContext('2d')
    const phone = coarsePointer() && window.innerWidth < 900
    const set = phone ? 'm' : 'd'
    const count = phone ? meta.phoneFrames : meta.frames
    const reduced = reducedMotion()
    const imgs = new Array(count)
    let target = reduced ? count - 1 : 0, cur = target, drawn = -1, raf = 0, started = false, dead = false

    const nearestLoaded = (i) => {
      for (let d = 0; d < count; d++) {
        if (imgs[i - d]?.complete && imgs[i - d].naturalWidth) return i - d
        if (imgs[i + d]?.complete && imgs[i + d].naturalWidth) return i + d
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

    const load = (i) => new Promise((ok) => {
      if (imgs[i]) return ok()
      const img = new Image()
      img.decoding = 'async'
      img.onload = img.onerror = () => { if (!dead) { drawn = -1; kick() } ok() }
      img.src = `${BASE}scenes/${id}/${set}/${String(i).padStart(3, '0')}.webp`
      imgs[i] = img
    })
    const start = async () => {
      if (started) return; started = true
      await load(reduced ? count - 1 : 0)
      if (reduced) return
      for (const stride of [8, 4, 2, 1]) {
        for (let i = 0; i < count; i += stride) { if (dead) return; await load(i) }
      }
    }

    fit()
    const ro = new ResizeObserver(() => { fit(); kick() }); ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) start() }, { rootMargin: '150% 0px' })
    io.observe(el)

    let held = false
    const hold = (on) => { if (on !== held) { held = on; holdWorld(on) } }
    const ctxG = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el, start: 'top top', end: 'bottom bottom',
        onUpdate: (s) => { if (!reduced) { target = s.progress * (count - 1); kick() } },
        onToggle: (s) => hold(s.isActive),
      })
      // Overlay beats: fade in over the first 12% of their span, out over the last 12%.
      const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.5 } })
      el.querySelectorAll('[data-beat]').forEach((b) => {
        const [a, z] = b.dataset.beat.split(',').map(Number)
        const f = Math.max(0.02, (z - a) * 0.12)
        if (a <= 0) gsap.set(b, { autoAlpha: 1, y: 0 })
        else tl.fromTo(b, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: f }, a)
        if (z < 1) tl.to(b, { autoAlpha: 0, y: -40, duration: f }, z - f)
      })
      tl.fromTo(el.querySelector('[data-scene-bar]'), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
      tl.set({}, {}, 1)
    }, el)

    return () => { dead = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); hold(false); ctxG.revert() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, meta])

  if (!meta) return null
  return (
    <section ref={section} className={`relative ${className}`} style={{ height: `${length}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-ink">
        <canvas ref={canvasRef} aria-hidden="true"
          className={`absolute inset-0 h-full w-full transition-opacity duration-[1200ms] ${ready ? 'opacity-100' : 'opacity-0'}`} />
        {/* Veils: keep type readable at the edges without dulling the centre of the shot. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(6,6,9,0.92)_0%,rgba(6,6,9,0.25)_40%,transparent_60%),linear-gradient(to_bottom,rgba(6,6,9,0.6)_0%,transparent_22%)]" />
        <div className="relative z-10 h-full">{children}</div>
        <p className="pointer-events-none absolute bottom-6 right-5 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45 md:right-10">{label}</p>
        <div aria-hidden="true" className="absolute inset-x-5 bottom-4 z-10 h-px bg-bone/10 md:inset-x-10">
          <div data-scene-bar className="h-px origin-left scale-x-0" style={{ background: 'var(--spectrum)' }} />
        </div>
      </div>
    </section>
  )
}
