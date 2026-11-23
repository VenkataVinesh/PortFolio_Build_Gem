import { useEffect, useRef } from 'react'
import { ScrollTrigger, reducedMotion } from './core.js'

/*
  The site's thesis as a single line. While the block scrolls through the viewport
  the trace goes from pure noise to a clean spectrum with two sharp peaks, and a
  read head sweeps across it. A schematic, drawn on a 2D canvas; static (resolved)
  with reduced motion; idle when off-screen.
*/

const STOPS = ['#7c5cff', '#22d3ee', '#f5b84a']

export default function SignalTrace({ className = '', height = 150 }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const reduced = reducedMotion()
    let w = 0, h = 0, dpr = 1, prog = reduced ? 1 : 0, target = prog
    const phases = Array.from({ length: 6 }, () => [Math.random() * 6.28, 0.6 + Math.random() * 3.4])
    const g = (x, c, s) => Math.exp(-0.5 * ((x - c) / s) ** 2)

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      const p = prog, noise = Math.pow(1 - p, 1.4), peak = 0.15 + 0.85 * p
      const base = h * 0.82, amp = h * 0.68
      const sig = 0.018 + 0.03 * (1 - p) // peaks sharpen as they resolve
      const grad = ctx.createLinearGradient(0, 0, w, 0)
      STOPS.forEach((c, i) => grad.addColorStop(i / (STOPS.length - 1), c))
      const N = Math.max(160, Math.round(w / 3))
      const ys = new Float32Array(N + 1)
      for (let i = 0; i <= N; i++) {
        const x = i / N
        let n = 0
        for (const [ph, f] of phases) n += Math.sin(x * f * 31 + ph + t * f * 0.9)
        n = n / phases.length + (Math.random() - 0.5) * 0.9
        ys[i] = base - amp * peak * (g(x, 0.38, sig) + 0.78 * g(x, 0.62, sig)) - n * h * 0.22 * noise
      }
      // soft fill under the trace
      ctx.beginPath(); ctx.moveTo(0, h)
      for (let i = 0; i <= N; i++) ctx.lineTo((i / N) * w, ys[i])
      ctx.lineTo(w, h); ctx.closePath()
      ctx.globalAlpha = 0.08; ctx.fillStyle = grad; ctx.fill(); ctx.globalAlpha = 1
      // the trace, with glow
      ctx.beginPath()
      for (let i = 0; i <= N; i++) { const X = (i / N) * w; i ? ctx.lineTo(X, ys[i]) : ctx.moveTo(X, ys[i]) }
      ctx.lineWidth = 1.6; ctx.strokeStyle = grad; ctx.shadowColor = 'rgba(34,211,238,0.55)'; ctx.shadowBlur = 10 + 10 * p
      ctx.stroke(); ctx.shadowBlur = 0
      // read head
      const hx = Math.min(w - 1, p * w)
      ctx.fillStyle = 'rgba(236,232,223,0.5)'; ctx.fillRect(hx, 0, 1, h)
      // baseline
      ctx.fillStyle = 'rgba(236,232,223,0.12)'; ctx.fillRect(0, base + 0.5, w, 1)
    }

    let raf = 0, visible = false
    const start = performance.now()
    const frame = (now) => {
      raf = 0
      if (!visible || document.hidden) return
      prog += (target - prog) * 0.12
      draw((now - start) / 1000)
      raf = requestAnimationFrame(frame)
    }
    const kick = () => { if (!raf && visible && !reduced) raf = requestAnimationFrame(frame) }

    resize()
    const ro = new ResizeObserver(() => { resize(); if (reduced) draw(0) }); ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick() }, { rootMargin: '80px' })
    io.observe(canvas)
    const st = reduced ? null : ScrollTrigger.create({
      trigger: canvas, start: 'top 90%', end: 'bottom 35%',
      onUpdate: (s) => { target = s.progress },
    })
    const onVis = () => kick()
    document.addEventListener('visibilitychange', onVis)
    if (reduced) draw(0)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); st?.kill(); document.removeEventListener('visibilitychange', onVis) }
  }, [])
  return <canvas ref={ref} aria-hidden="true" className={`block w-full ${className}`} style={{ height }} />
}
