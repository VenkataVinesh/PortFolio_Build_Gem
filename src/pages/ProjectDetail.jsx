import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { projects, projectDetails } from '../data.js'
import { Github } from '../Icons.jsx'
import ArchStack from '../motion/ArchStack.jsx'
import { useLenis } from '../motion/useMotion.js'
import { Reveal, Kinetic, Magnetic } from '../motion/ui.jsx'
import Shell from '../components/Shell.jsx'
import Cover, { PeaksArt } from '../components/Cover.jsx'
import NotFound from './NotFound.jsx'

function Section({ id, label, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-14 md:py-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr] md:gap-12">
        <Reveal><h2 className="section-label md:sticky md:top-28">{label}</h2></Reveal>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

/* Bars for rates. Solid = measured on the real sensor; hatched = simulated benchmark. */
function RateChart({ rows, accent }) {
  return (
    <div className="space-y-5">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-sm">{r.label}</p>
            <p className="font-mono text-sm tabular-nums">{r.value}</p>
          </div>
          <div className="mt-2 h-3.5 overflow-hidden rounded-full bg-ink/8" style={{ background: 'rgb(15 15 18 / 0.07)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${r.pct}%`,
                background: r.kind === 'real'
                  ? accent
                  : `repeating-linear-gradient(45deg, ${accent} 0 6px, transparent 6px 10px)`,
                boxShadow: r.kind === 'real' ? 'none' : `inset 0 0 0 1.5px ${accent}`,
              }}
            />
          </div>
          <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-widest text-mute">{r.kind === 'real' ? 'Real sensor' : 'Simulated benchmark'}</p>
        </div>
      ))}
    </div>
  )
}

export default function ProjectDetail({ id }) {
  useLenis()
  const project = projects.find((p) => p.id === id)
  const d = projectDetails[id]

  useEffect(() => { window.scrollTo(0, 0) }, [project])

  if (!project || !d) return <NotFound />

  const pages = projects.filter((p) => !p.inProgress)
  const i = pages.findIndex((p) => p.id === id)
  const prev = pages[(i - 1 + pages.length) % pages.length]
  const next = pages[(i + 1) % pages.length]
  const buildLabel = d.buildLabel || 'What I built'

  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <section className="pb-10 pt-36 md:pt-44">
          <Reveal>
            <a data-cursor href="#/work" className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-mute hover:text-ink">
              <ArrowLeft size={14} /> All work
            </a>
          </Reveal>
          <h1 className="text-display font-medium leading-[0.95] tracking-tight">
            <Kinetic lines={[project.name]} start="top 95%" />
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-ink/80 md:text-2xl">{project.summary}</p>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-6 md:grid-cols-4">
              <div><dt className="section-label">Period</dt><dd className="mt-2 text-sm">{project.period}</dd></div>
              <div><dt className="section-label">Context</dt><dd className="mt-2 text-sm">{project.kind}</dd></div>
              <div className="col-span-2"><dt className="section-label">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">{project.tech.map((t) => <span key={t} className="chip">{t}</span>)}</dd></div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.codePrivate && (
                <p className="inline-flex items-center rounded-full border border-ink/30 px-5 py-2.5 font-mono text-xs">
                  Code private (lab project); details on request
                </p>
              )}
              {project.repo && (
                <Magnetic>
                  <a data-cursor href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper">
                    <Github size={15} /> View repository
                  </a>
                </Magnetic>
              )}
              {project.demo && (
                <a data-cursor href={project.demo} target="_blank" rel="noreferrer" className="btn-fill inline-flex items-center gap-2 rounded-full border border-ink/40 px-6 py-3 text-sm">
                  Live demo <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </Reveal>
        </section>

        {/* Cover */}
        <Reveal>
          <div className="aspect-[16/10] overflow-hidden rounded-[2rem] bg-dark ring-1 ring-black/10 md:aspect-[16/8]">
            <Cover project={project} />
          </div>
        </Reveal>

        {/* Measured results, where they exist and are traceable */}
        {project.metrics?.length > 0 && (
          <Reveal>
            <div className="mt-6 grid grid-cols-1 gap-8 rounded-[2rem] bg-dark p-8 text-paper sm:grid-cols-2 md:p-10">
              {project.metrics.map((m) => (
                <div key={m.k}>
                  <p className="text-5xl font-medium tabular-nums md:text-6xl" style={{ color: project.accent }}>{m.v}</p>
                  <p className="mt-3 text-sm text-paper/90">{m.k}</p>
                  {m.sub && <p className="mt-1 font-mono text-[11px] leading-relaxed text-paper/60">{m.sub}</p>}
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Section id="overview" label="Overview">
          <p className="max-w-3xl text-xl leading-relaxed md:text-2xl">{d.problem}</p>
        </Section>

        <Section id="build" label={buildLabel}>
          {d.teamNote && (
            <Reveal><p className="mb-8 max-w-3xl rounded-2xl border border-line bg-card p-5 text-sm leading-relaxed text-ink/80">{d.teamNote}</p></Reveal>
          )}
          <ol className="space-y-6">
            {d.build.map((b, n) => (
              <Reveal key={n}>
                <li className="grid grid-cols-[auto_1fr] gap-5 border-t border-line pt-6">
                  <span className="font-mono text-sm text-mute">{String(n + 1).padStart(2, '0')}</span>
                  <p className="max-w-3xl text-[15px] leading-relaxed text-ink/85">{b}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Section>

        {d.results && (
          <Section id="results" label="Real vs simulated results">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Reveal>
                <div className="overflow-hidden rounded-3xl bg-dark">
                  <div className="aspect-[16/10]"><PeaksArt accent={project.accent} /></div>
                </div>
                <p className="mt-3 font-mono text-[11px] text-mute">
                  Schematic of the problem: two close surfaces give two overlapping peaks that merge into one. Drawn for illustration; it is not lab data.
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <div className="card p-7">
                  <RateChart rows={d.results.chart} accent={project.accent} />
                </div>
              </Reveal>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                { title: 'Measured on the real sensor', rows: d.results.real },
                { title: 'Simulated benchmark', rows: d.results.simulated },
              ].map((g) => (
                <Reveal key={g.title}>
                  <div className="card h-full p-7">
                    <h3 className="font-mono text-[11px] uppercase tracking-widest text-mute">{g.title}</h3>
                    <div className="mt-6 flex flex-col gap-6">
                      {g.rows.map((m) => (
                        <div key={m.k}>
                          <p className="text-3xl font-medium tabular-nums">{m.v}</p>
                          <p className="mt-1 text-sm text-ink/85">{m.k}</p>
                          {m.sub && <p className="mt-1 font-mono text-[11px] text-mute">{m.sub}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            {d.results.runtime && <p className="mt-6 max-w-3xl text-sm leading-relaxed text-mute">{d.results.runtime}</p>}
          </Section>
        )}

        {project.screenshots?.length > 0 && (
          <Section id="screenshots" label="Screenshots">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {project.screenshots.map((s) => (
                <Reveal key={s.src}>
                  <div className="overflow-hidden rounded-2xl border border-line bg-card">
                    <img src={s.src} alt={s.alt} loading="lazy" decoding="async" className="w-full" />
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        )}

        <Section id="architecture" label="System architecture">
          <Reveal><ArchStack layers={d.arch.layers} flow={d.arch.flow} accent={project.accent} /></Reveal>
        </Section>

        <Section id="features" label="Key features">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <Reveal key={h}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-card p-5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: project.accent }} />
                  <span className="text-sm leading-relaxed text-ink/85">{h}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="outcome" label="Outcome">
          <p className="max-w-3xl text-xl leading-relaxed md:text-2xl">{d.outcome}</p>
          {d.limits?.length > 0 && (
            <Reveal>
              <div className="mt-10 rounded-2xl border border-line bg-card p-6 md:p-7">
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-mute">{d.limitsLabel || 'What it does not do'}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {d.limits.map((l) => (
                    <li key={l} className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/50" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </Section>

        {/* Prev / next */}
        <nav aria-label="More projects" className="grid grid-cols-1 gap-4 border-t border-line py-12 sm:grid-cols-2">
          <a data-cursor href={`#/p/${prev.id}`} className="group card p-6 transition-colors hover:bg-paper-2">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mute"><ArrowLeft size={13} /> Previous</span>
            <p className="mt-3 text-lg font-medium"><span className="link-line">{prev.name}</span></p>
            <p className="mt-1 font-mono text-[11px] text-mute">{prev.kind}</p>
          </a>
          <a data-cursor href={`#/p/${next.id}`} className="group card p-6 text-right transition-colors hover:bg-paper-2">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mute">Next <ArrowRight size={13} /></span>
            <p className="mt-3 text-lg font-medium"><span className="link-line">{next.name}</span></p>
            <p className="mt-1 font-mono text-[11px] text-mute">{next.kind}</p>
          </a>
        </nav>
      </div>
    </Shell>
  )
}
