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
// Fetch this far around the playhead first; keep this many decoded frames (each ~8 MB at 1920 px).
const AHEAD = 36, BEHIND = 12, PARALLEL = 4, DECODE_AHEAD = 14, DECODE_BEHIND = 5

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
    const blobs = new Array(count)           // compressed frames, as fetched (false while in flight)
    const bmps = new Map()                   // decoded, canvas-sized frames near the playhead
    let target = reduced ? count - 1 : 0, cur = target, drawnAt = -1, raf = 0, started = false, dead = false, speed = 0
    let cw = 0, ch = 0

    // Never draw bigger than the footage: a 2880 px canvas only costs fill rate.
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth * dpr, k = Math.min(1, 1920 / w)
      cw = canvas.width = Math.round(w * k); ch = canvas.height = Math.round(canvas.clientHeight * dpr * k)
      bmps.forEach((b) => b?.close?.()); bmps.clear()
      drawnAt = -1
    }
    // Cover-fit size and offset of a frame of the given aspect on the canvas.
    const place = (aspect) => { const s = Math.max(cw / aspect, ch); const w = Math.round(aspect * s), h = Math.round(s); return [Math.round((cw - w) / 2), Math.round((ch - h) / 2), w, h] }

    // Decode just ahead of the playhead, off the main thread and already scaled
    // (createImageBitmap from a Blob), and release what falls behind. On a fast scroll,
    // decode every n-th frame ahead (n grows with speed) so there is always a near frame
    // to show; the gaps fill in once the scroll slows.
    let decoding = 0
    const want = (i) => i >= 0 && i < count && blobs[i] && !bmps.has(i)
    const pump = () => {
      if (dead) return
      const t = Math.round(cur), step = Math.max(1, Math.min(8, Math.round(speed * 1.5))), dir = target >= cur ? 1 : -1
      const lo = t - (dir > 0 ? DECODE_BEHIND : DECODE_AHEAD * step), hi = t + (dir > 0 ? DECODE_AHEAD * step : DECODE_BEHIND)
      for (const [i, bm] of bmps) if (bm && (i < lo || i > hi)) { bm.close?.(); bmps.delete(i) }
      while (decoding < 3) {
        let i = -1
        for (let d = 0; d <= DECODE_AHEAD && i < 0; d++) { if (want(t + dir * d * step)) i = t + dir * d * step; else if (d <= DECODE_BEHIND && want(t - dir * d)) i = t - dir * d }
        if (i < 0) return
        const [, , w, h] = place(metas[ids.indexOf(partAt(i).k)].aspect)
        bmps.set(i, null); decoding++
        createImageBitmap(blobs[i], { resizeWidth: w, resizeHeight: h, resizeQuality: 'medium' })
          .then((bm) => { if (dead || !bmps.has(i)) return bm.close?.(); bmps.set(i, bm); if (Math.abs(i - cur) < 2) { drawnAt = -1; kick() } })
          .catch(() => bmps.delete(i))
          .finally(() => { decoding--; pump() })
      }
    }
    const frame = (i) => bmps.get(i) || null
    const nearest = (i) => {
      for (let d = 0; d < count; d++) { if (frame(i - d)) return i - d; if (frame(i + d)) return i + d }
      return -1
    }
    const paint = (bm, alpha) => { ctx.globalAlpha = alpha; ctx.drawImage(bm, Math.round((cw - bm.width) / 2), Math.round((ch - bm.height) / 2)) }
    // Between two frames, blend them by the fraction: 12 fps footage reads as continuous motion.
    const draw = () => {
      if (Math.abs(cur - drawnAt) < 0.01) return
      const i0 = Math.floor(cur), f = cur - i0
      const a = frame(i0) ? i0 : nearest(i0); if (a < 0) return
      paint(frame(a), 1)
      if (a === i0 && f > 0.03 && frame(i0 + 1)) paint(frame(i0 + 1), f)
      ctx.globalAlpha = 1
      drawnAt = cur
      if (!ready) setReady(true)
    }
    const tick = () => {
      raf = 0
      const was = cur
      cur += (target - cur) * 0.18
      speed = speed * 0.8 + Math.abs(cur - was) * 0.2
      if (Math.abs(target - cur) < 0.005) cur = target
      draw(); pump()
      if (cur !== target) raf = requestAnimationFrame(tick); else speed = 0
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick) }

    // Next frame worth fetching: the window around the scroll position, then coarse to fine.
    const order = []
    for (const stride of [16, 8, 4, 2, 1]) for (let i = 0; i < count; i += stride) order.push(i)
    let cursor = 0
    const next = () => {
      const t = Math.round(target)
      for (let d = 0; d <= AHEAD; d++) {
        const a = t + d; if (a < count && blobs[a] === undefined) return a
        if (d <= BEHIND) { const b = t - d; if (b >= 0 && blobs[b] === undefined) return b }
      }
      while (cursor < order.length && blobs[order[cursor]] !== undefined) cursor++
      return cursor < order.length ? order[cursor] : -1
    }
    const fetchOne = async (i) => {
      blobs[i] = false
      try { blobs[i] = await (await fetch(src(i))).blob() } catch { blobs[i] = undefined; return }
      if (!dead && Math.abs(i - cur) <= DECODE_AHEAD) pump()
    }
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
    const ro = new ResizeObserver(() => { fit(); kick(); pump() }); ro.observe(canvas)
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

    return () => { dead = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); ctxG.revert(); bmps.forEach((b) => b?.close?.()) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, missing])

  if (missing) return null
  return (
    <section ref={section} id={sectionId} data-scene={ids[0]} className={`relative ${className}`} style={{ height: `${length}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* The shot fades out top and bottom into the dark (gradients, not a mask: a mask recomposites on every frame). */}
        <canvas ref={canvasRef} aria-hidden="true"
          className={`absolute inset-0 h-full w-full transition-opacity duration-[1200ms] ${ready ? 'opacity-100' : 'opacity-0'}`} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(6,6,9,0.95)_0%,rgba(6,6,9,0.3)_35%,transparent_58%),linear-gradient(to_bottom,rgba(6,6,9,0.85)_0%,transparent_20%)]" />
        <div className="relative z-10 h-full">{children}</div>
        <p className="pointer-events-none absolute bottom-6 right-5 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45 md:right-10">{label}</p>
        <div aria-hidden="true" className="absolute inset-x-5 bottom-4 z-10 h-px bg-bone/10 md:inset-x-10">
          <div data-scene-bar className="h-px origin-left scale-x-0" style={{ background: 'var(--spectrum)' }} />
        </div>
      </div>
    </section>
  )
}
