import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Atmosphere, LazyImg } from '../motion/ui.jsx'
import { gsap, reducedMotion, coarsePointer } from '../motion/core.js'

const pad = (n) => String(n).padStart(2, '0')

/* TriageMate's real screenshots, fanned in depth. Scroll drifts each layer at
   its own speed; the pointer tilts the stack. */
export function TriageVisual({ shots, compact = false }) {
  const root = useRef(null)
  useEffect(() => {
    const el = root.current; if (!el || reducedMotion()) return
    const ctx = gsap.context(() => {
      const layers = el.querySelectorAll('[data-shot]')
      layers.forEach((l, i) => {
        gsap.fromTo(l, { yPercent: 18 + i * 14 }, {
          yPercent: -10 - i * 12, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
      if (!coarsePointer()) {
        const card = el.closest('a') || el
        const rx = gsap.quickTo(el, 'rotationY', { duration: 0.9, ease: 'power3.out' })
        const ry = gsap.quickTo(el, 'rotationX', { duration: 0.9, ease: 'power3.out' })
        const move = (e) => {
          const r = card.getBoundingClientRect()
          rx(((e.clientX - r.left) / r.width - 0.5) * 10)
          ry(-((e.clientY - r.top) / r.height - 0.5) * 8)
        }
        const leave = () => { rx(0); ry(0) }
        card.addEventListener('pointermove', move); card.addEventListener('pointerleave', leave)
        return () => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave) }
      }
    }, el)
    return () => ctx.revert()
  }, [])

  const pos = compact
    ? ['left-[4%] top-[8%] w-[62%] rotate-[-4deg]', 'left-[36%] top-[22%] w-[60%] rotate-[3deg]', 'left-[16%] top-[44%] w-[56%] rotate-[-1deg]']
    : ['left-[2%] top-[10%] w-[66%] rotate-[-5deg]', 'right-[0%] top-[26%] w-[62%] rotate-[4deg]', 'left-[14%] top-[52%] w-[58%] rotate-[-1.5deg]']

  return (
    <div className="absolute inset-0 [perspective:1400px]">
      <div ref={root} className="absolute inset-0 [transform-style:preserve-3d]">
        {shots.map((s, i) => (
          <div key={s.src} data-shot className={`absolute ${pos[i]}`} style={{ zIndex: i + 1 }}>
            <div className="overflow-hidden rounded-[14px] border border-white/15 bg-ink shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.02]">
              <LazyImg src={s.src} alt={s.alt} width={800} height={450} className="block h-auto w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Horizontal-track tile for the remaining projects. Atmosphere + type, no diagrams. */
export function ProjectTile({ project: p, index }) {
  const name = p.name.split(':')[0]
  return (
    <a href={`#/p/${p.id}`} data-cursor="view"
      className="group relative flex h-[min(74vh,640px)] w-[82vw] flex-col justify-between overflow-hidden rounded-[22px] border border-line p-6 sm:w-[52vw] md:p-8 lg:w-[34vw] lg:min-w-[440px]">
      <div data-depth className="absolute -inset-[8%] transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]">
        <Atmosphere accent={p.accent} intensity={0.85} variant={index} />
      </div>
      {p.screenshots ? (
        <div aria-hidden="true" className="pointer-events-none absolute right-[-14%] top-[17%] z-0 w-[92%] rotate-[-4deg] transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-x-3 group-hover:-translate-y-2 group-hover:rotate-[-2deg]">
          <div className="overflow-hidden rounded-[12px] border border-white/15 bg-ink shadow-[0_40px_100px_-20px_rgba(0,0,0,0.85)]">
            <LazyImg src={p.screenshots[0].small || p.screenshots[0].src} srcSet={p.screenshots[0].small ? `${p.screenshots[0].small} 800w, ${p.screenshots[0].src} ${p.screenshots[0].w}w` : undefined}
              sizes="(max-width: 1023px) 76vw, 32vw" width={p.screenshots[0].w || 800} height={p.screenshots[0].h || 450} className="block h-auto w-full" />
          </div>
          <div className="absolute inset-0 rounded-[12px] bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        </div>
      ) : p.motif && (
        <span aria-hidden="true" className="pointer-events-none absolute -right-[4%] top-[18%] z-0 select-none whitespace-nowrap text-[clamp(4rem,7.5vw,8rem)] font-medium leading-none tracking-[-0.06em] text-bone/[0.07] transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-x-6">
          {p.motif}
        </span>
      )}
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-bone/75">
        <span>{pad(index)}</span>
        {p.inProgress
          ? <span className="chip border-violet/60 bg-violet/15 text-bone">In progress</span>
          : <span>{p.period}</span>}
      </div>
      <div className="relative z-10">
        {p.dataNote && <span className="chip mb-3 border-amber/50 bg-ink/40 text-amber backdrop-blur-sm">{p.dataNote}</span>}
        <p className="eyebrow mb-3 text-bone/70">{p.kind}</p>
        <h3 className="text-[clamp(2.2rem,3.6vw,3.8rem)] font-medium leading-[0.92] tracking-[-0.05em]">{name}</h3>
        <ul className="mt-5 space-y-1.5 text-sm leading-snug text-bone/75">
          {p.highlights.slice(0, 2).map((h) => <li key={h} className="flex gap-2"><span aria-hidden="true" className="mt-[0.55em] h-px w-3 shrink-0 bg-bone/40" />{h}</li>)}
        </ul>
        <div className="mt-6 flex items-end justify-between gap-4">
          <ul className="flex flex-wrap gap-1.5">{p.tech.slice(0, 4).map((t) => <li key={t} className="chip bg-ink/30 backdrop-blur-sm">{t}</li>)}</ul>
          <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bone/30 transition-colors duration-500 group-hover:bg-bone group-hover:text-ink">
            <ArrowUpRight size={18} className="arrow-nudge" />
          </span>
        </div>
      </div>
    </a>
  )
}
