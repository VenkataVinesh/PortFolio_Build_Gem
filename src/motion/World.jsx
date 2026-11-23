import { useEffect, useState } from 'react'
import Field from './Field.jsx'

/*
  One live background behind every page: the spectral field, fixed to the viewport.
  Each section may declare `data-tone="#hex"` (and text-heavy ones `data-gain` to dim it); the field eases toward the tone of the
  section crossing the middle of the screen, so colour changes as the story moves on.
  A dark veil keeps body text at full contrast over it.
*/
const GAIN = 0.82

export default function World({ route }) {
  const [tone, setTone] = useState(null)
  const [gain, setGain] = useState(GAIN)

  useEffect(() => {
    let raf = 0
    const pick = () => {
      raf = 0
      const mid = window.innerHeight / 2
      let next = null, g = GAIN
      for (const el of document.querySelectorAll('[data-tone],[data-gain]')) {
        const r = el.getBoundingClientRect()
        if (r.top > mid || r.bottom < mid) continue
        // innermost wins (later in DOM)
        if (el.dataset.tone) next = el.dataset.tone
        if (el.dataset.gain) g = Number(el.dataset.gain)
      }
      setTone(next); setGain(g)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(pick) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const t = setTimeout(pick, 400) // after the new route has rendered
    pick()
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); clearTimeout(t); cancelAnimationFrame(raf) }
  }, [route])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Field world className="absolute inset-0" tint={tone} tintMix={0.55} gain={gain} />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,rgba(6,6,9,0.08)_0%,rgba(6,6,9,0.5)_75%,rgba(6,6,9,0.8)_100%)]" />
    </div>
  )
}
