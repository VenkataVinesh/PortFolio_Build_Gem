import { ArrowUpRight } from 'lucide-react'

/**
 * One project card. `featured` renders the wide two-column flagship treatment,
 * otherwise a stacked grid card. Both link into the case study at #/p/<id>.
 */
export default function ProjectCard({ project: p, index, featured = false }) {
  if (featured) {
    return (
      <a
        data-cursor
        href={`#/p/${p.id}`}
        className="group panel relative block overflow-hidden rounded-card-lg p-8 ring-1 ring-inset ring-white/[0.06] transition-all duration-500 hover:-translate-y-1 hover:border-white/35 md:p-10"
        style={{ '--a': p.accent }}
      >
        <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" style={{ background: p.accent }} />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30" style={{ background: p.accent }} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest" style={{ color: p.accent, background: `${p.accent}1a` }}>
                Flagship
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">{p.kind}</span>
            </div>

            <h3 className="mt-5 flex items-center gap-3 text-title font-medium tracking-tight">
              {p.name}
              <ArrowUpRight size={28} className="-translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" style={{ color: p.accent }} />
            </h3>

            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75">{p.summary}</p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {p.tech.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-5 border-white/10 md:border-l md:pl-12">
            {p.metrics?.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {p.metrics.map((m) => (
                  <div key={m.k}>
                    <p className="text-2xl font-medium tabular-nums" style={{ color: p.accent }}>{m.v}</p>
                    <p className="mt-1 text-[11px] leading-snug text-white/65">{m.k}</p>
                  </div>
                ))}
              </div>
            )}
            <ul className="flex flex-col gap-3">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </a>
    )
  }

  return (
    <a
      data-cursor
      href={`#/p/${p.id}`}
      className="group panel relative flex h-full flex-col overflow-hidden p-7 ring-1 ring-inset ring-white/[0.06] transition-all duration-500 hover:-translate-y-1 hover:border-white/35"
      style={{ '--a': p.accent }}
    >
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" style={{ background: p.accent }} />
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-25" style={{ background: p.accent }} />

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-white/55">{String(index).padStart(2, '0')}</span>
        <ArrowUpRight size={20} className="text-white/30 transition-colors group-hover:text-[color:var(--a)]" />
      </div>

      <h3 className="mt-5 text-subtitle font-medium tracking-tight">{p.name}</h3>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest" style={{ color: p.accent }}>{p.kind}</p>
      <p className="mt-4 text-sm leading-relaxed text-white/70">{p.summary}</p>

      <ul className="mt-5 flex flex-col gap-2">
        {p.highlights.slice(0, 3).map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-[13px] text-white/75">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: p.accent }} />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {p.tech.map((t) => <span key={t} className="chip">{t}</span>)}
      </div>
    </a>
  )
}
