import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data.js'
import { Lines, Reveal, Atmosphere } from '../motion/ui.jsx'
import Glyph from '../components/Glyphs.jsx'
import { GLYPH_FOR } from '../components/glyph-kinds.js'
import { gsap, reducedMotion, coarsePointer } from '../motion/core.js'

const pad = (n) => String(n).padStart(2, '0')

/* Index of large rows. On fine pointers a preview (real screenshot or the
   project's atmosphere) follows the cursor; other rows dim. */
export default function Work() {
  const preview = useRef(null)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const el = preview.current; if (!el || coarsePointer() || reducedMotion()) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
    // The card leans into the direction of travel, then settles: weight, not just position.
    const rTo = gsap.quickTo(el, 'rotation', { duration: 0.9, ease: 'power3.out' })
    let lastX = null
    const move = (e) => {
      xTo(e.clientX); yTo(e.clientY)
      if (lastX != null) rTo(Math.max(-9, Math.min(9, (e.clientX - lastX) * 0.6)))
      lastX = e.clientX
    }
    const settle = setInterval(() => rTo(0), 160)
    window.addEventListener('pointermove', move, { passive: true })
    return () => { window.removeEventListener('pointermove', move); clearInterval(settle) }
  }, [])

  const p = active != null ? projects[active] : null

  return (
    <div className="relative">
      <section data-tone="#7c5cff" className="relative mx-auto max-w-[1600px] px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
        <p className="eyebrow mb-6 text-mute">Index · {projects.length} projects</p>
        <h1 className="text-hero font-medium leading-[0.86] tracking-[-0.055em]">
          <Lines trigger="enter" lines={['Selected', <span key="b" className="font-serif-it tracking-[-0.02em]">work.</span>]} />
        </h1>
        <Reveal trigger="enter" delay={0.3} as="p" className="mt-8 max-w-xl text-lg leading-relaxed text-bone/70">
          LLM applications, signal processing, forecasting and the maths underneath. Ordered by what I would show first.
        </Reveal>
      </section>

      <section aria-label="All projects" data-tone="#22d3ee" className="relative mx-auto max-w-[1600px] px-5 pb-32 md:px-10" onPointerLeave={() => setActive(null)}>
        <ol className="border-b border-line">
          {projects.map((x, i) => (
            <Reveal as="li" key={x.id} className="border-t border-line">
              <a href={`#/p/${x.id}`} data-cursor="view" onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(null)}
                className={`group relative grid grid-cols-[2.2rem_1fr] items-baseline gap-x-4 gap-y-2 py-7 transition-opacity duration-500 md:grid-cols-[3rem_1fr_12rem_7rem] md:py-9 lg:grid-cols-[4rem_1fr_16rem_8rem] ${active != null && active !== i ? 'md:opacity-30' : ''}`}>
                <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" style={{ background: 'var(--spectrum)' }} />
                <span className="font-mono text-xs text-mute transition-colors duration-500 group-hover:text-bone">{pad(i + 1)}</span>
                <span className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="text-[clamp(2rem,5.4vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.05em] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] md:group-hover:translate-x-3">
                    {x.name.split(':')[0]}
                  </span>
                  {x.inProgress && <span className="chip border-violet/60 bg-violet/15 text-bone">In progress</span>}
                  {x.codePrivate && <span className="chip text-mute">Code private</span>}
                  {x.dataNote && <span className="chip border-amber/50 text-amber">{x.dataNote}</span>}
                </span>
                <span className="col-start-2 text-sm text-bone/65 md:col-start-auto">{x.kind}</span>
                <span className="col-start-2 flex items-center justify-between font-mono text-[11px] text-mute md:col-start-auto md:justify-end md:gap-4">
                  {x.period}<ArrowUpRight size={16} className="arrow-nudge hidden text-bone md:block" />
                </span>
              </a>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Cursor-following preview */}
      <div ref={preview} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[1500] hidden [@media(pointer:fine)]:block">
        <div className={`-translate-x-1/2 -translate-y-1/2 transition-[opacity,transform] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${p ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
          <div className="relative h-[230px] w-[360px] overflow-hidden rounded-[18px] border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            {projects.map((x, i) => (
              <div key={x.id} className={`absolute inset-0 transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-0'}`}>
                {x.screenshots
                  ? <img src={(x.screenshots[1] || x.screenshots[0]).src} alt="" width="800" height="450" loading="lazy" className="h-full w-full object-cover" />
                  : (
                    <>
                      <Atmosphere accent={x.accent} />
                      {GLYPH_FOR[x.id] && <Glyph kind={GLYPH_FOR[x.id]} accent={x.accent} className="absolute inset-x-5 top-4 h-auto w-[calc(100%-2.5rem)]" />}
                      <span className="absolute bottom-4 left-5 right-5 text-3xl font-medium leading-none tracking-[-0.04em]">{x.name.split(':')[0]}</span>
                    </>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
