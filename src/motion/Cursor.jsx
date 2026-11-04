import { useEffect, useRef } from 'react'
import { coarsePointer, reducedMotion } from './core.js'

/*
  Lens cursor: a dot that tracks exactly and a ring that follows with lag.
  Context states come from the nearest [data-cursor] ancestor:
    link            ring grows and goes hollow
    view|drag|open|next|<any word>   ring becomes a solid disc with that label
  Hidden on touch devices; native cursor stays for <object> (PDF) and inputs.
*/
export default function Cursor() {
  const ring = useRef(null), dot = useRef(null), label = useRef(null)

  useEffect(() => {
    if (coarsePointer()) return
    const html = document.documentElement
    html.classList.add('has-cursor')
    const still = reducedMotion()
    const pos = { x: -100, y: -100 }, rp = { x: -100, y: -100 }
    let state = '', visible = false, down = false
    let raf = 0

    const apply = () => {
      const r = ring.current; if (!r) return
      const solid = state && state !== 'link'
      r.dataset.state = state || 'none'
      label.current.textContent = solid ? state : ''
      r.style.opacity = visible ? '1' : '0'
      dot.current.style.opacity = visible && !solid ? '1' : '0'
    }
    const move = (e) => {
      pos.x = e.clientX; pos.y = e.clientY
      if (!visible) { visible = true; rp.x = pos.x; rp.y = pos.y; apply() }
    }
    const over = (e) => {
      const t = e.target.closest?.('[data-cursor]')
      const next = t ? (t.getAttribute('data-cursor') || 'link') : (e.target.closest?.('a,button,[role=tab]') ? 'link' : '')
      if (next !== state) { state = next; apply() }
    }
    const leave = () => { visible = false; apply() }
    const onDown = () => { down = true }, onUp = () => { down = false }

    const loop = () => {
      const k = still ? 1 : 0.17
      rp.x += (pos.x - rp.x) * k; rp.y += (pos.y - rp.y) * k
      const solid = state && state !== 'link'
      const s = (solid ? 2.6 : state === 'link' ? 1.7 : 1) * (down ? 0.85 : 1)
      if (ring.current) ring.current.style.transform = `translate3d(${rp.x}px,${rp.y}px,0) translate(-50%,-50%) scale(${s})`
      if (label.current) label.current.style.transform = `translate3d(${rp.x}px,${rp.y}px,0) translate(-50%,-50%)`
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      html.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <div aria-hidden="true" className="cursor pointer-events-none fixed inset-0 z-[2500] hidden [@media(pointer:fine)]:block">
      <style>{`
        .cursor .c-ring{position:absolute;left:0;top:0;width:34px;height:34px;border-radius:50%;
          border:1px solid rgba(236,232,223,.55);opacity:0;
          transition:opacity .3s, background-color .45s cubic-bezier(.16,1,.3,1), border-color .45s;will-change:transform}
        .cursor .c-ring[data-state=link]{border-color:rgba(236,232,223,.9);background:rgba(236,232,223,.06)}
        .cursor .c-ring:not([data-state=none]):not([data-state=link]){background:#ece8df;border-color:#ece8df}
        .cursor .c-label{position:absolute;left:0;top:0;font:500 10px/1 'JetBrains Mono Variable',monospace;
          letter-spacing:.16em;text-transform:uppercase;color:#060609;will-change:transform}
        .cursor .c-dot{position:absolute;left:0;top:0;width:5px;height:5px;border-radius:50%;background:#ece8df;opacity:0;transition:opacity .2s;will-change:transform}
      `}</style>
      <div ref={ring} className="c-ring" data-state="none" />
      <div ref={label} className="c-label" />
      <div ref={dot} className="c-dot" />
    </div>
  )
}
