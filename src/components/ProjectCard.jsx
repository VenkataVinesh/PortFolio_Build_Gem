import { ArrowUpRight } from 'lucide-react'
import Cover from './Cover.jsx'

/**
 * Visual project tile: a large cover, then the title, a line of context and
 * the real numbers. `large` is the full-width treatment used for the lead work.
 * In-progress projects have no case page, so their tile is not a link.
 */
export default function ProjectCard({ project: p, index = 1, large = false }) {
  const Tag = p.inProgress ? 'div' : 'a'
  const linkProps = p.inProgress ? {} : { 'data-cursor': true, href: `#/p/${p.id}` }

  return (
    <Tag {...linkProps} className="group block" style={{ '--a': p.accent }}>
      <div
        className={`relative overflow-hidden rounded-[2rem] bg-dark ring-1 ring-black/10 ${large ? 'aspect-[16/10] md:aspect-[16/8.5]' : 'aspect-[16/10]'}`}
      >
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
          <Cover project={p} />
        </div>
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className="rounded-full bg-paper/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink backdrop-blur">
            {String(index).padStart(2, '0')}
          </span>
          {p.inProgress && (
            <span className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink" style={{ background: p.accent }}>
              In progress
            </span>
          )}
        </div>
        {!p.inProgress && (
          <span className="absolute bottom-5 right-5 inline-flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={20} />
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
        <h3 className={`font-medium tracking-tight ${large ? 'text-title leading-[1.02]' : 'text-subtitle'}`}>
          <span className="link-line">{p.name}</span>
        </h3>
        <p className="pt-2 font-mono text-xs text-mute">{p.period}</p>
      </div>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--a)' }}>
        <span className="rounded-sm" style={{ filter: 'brightness(0.72)' }}>{p.kind}</span>
      </p>
      <p className={`mt-3 max-w-2xl leading-relaxed text-ink/75 ${large ? 'text-base md:text-lg' : 'text-sm'}`}>{p.summary}</p>

      {large && p.metrics?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
          {p.metrics.map((m) => (
            <div key={m.k}>
              <p className="text-2xl font-medium tabular-nums md:text-3xl">{m.v}</p>
              <p className="max-w-[15rem] text-[12px] leading-snug text-mute">{m.k}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.tech.map((t) => <span key={t} className="chip">{t}</span>)}
      </div>
    </Tag>
  )
}
