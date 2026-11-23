import { useEffect, useRef } from 'react'
import scenes from '../scenes.json'

/*
  One live background behind every page, made from the same generated footage as the
  cinematic chapters, so the whole site reads as one film rather than footage pasted
  onto an unrelated backdrop.

  It shows the chapter you are in or last passed (else the page's first chapter),
  as a tiny frame drawn into a 96x54 canvas and upscaled: the upscale is the blur,
  so it costs nothing per frame. Two layers crossfade when the scene changes, and
  the whole thing drifts slowly. A dark veil keeps body text at full contrast.
*/
const BASE = import.meta.env.BASE_URL
const W = 96, H = 54
const FALLBACK = 'film3'
const LAYER = 'absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[1600ms] ease-out'

function drawScene(canvas, id) {
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
    img.src = `${BASE}scenes/${id}/d/${String(Math.floor(meta.frames / 2)).padStart(3, '0')}.webp`
  })
}

export default function World({ route }) {
  const a = useRef(null), b = useRef(null)
  const state = useRef({ id: null, front: 0, seq: 0 })

  useEffect(() => {
    const layers = [a.current, b.current]
    let raf = 0
    const show = async (id) => {
      const s = state.current
      if (id === s.id) return
      s.id = id
      const seq = ++s.seq
      const back = layers[1 - s.front]
      if (!(await drawScene(back, id)) || seq !== s.seq) return
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
      show(id)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(pick) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const t = setTimeout(pick, 400) // after the new route has rendered
    pick()
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); clearTimeout(t); cancelAnimationFrame(raf) }
  }, [route])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink">
      <div className="world-drift absolute inset-[-8%]">
        <canvas ref={a} width={W} height={H} className={LAYER} />
        <canvas ref={b} width={W} height={H} className={LAYER} />
      </div>
      <div className="absolute inset-0 bg-[rgba(6,6,9,0.5)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_0%,rgba(6,6,9,0.55)_70%,rgba(6,6,9,0.9)_100%)]" />
    </div>
  )
}
