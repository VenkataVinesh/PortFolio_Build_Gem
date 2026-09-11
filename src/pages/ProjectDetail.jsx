import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { projects, projectDetails } from '../data.js'
import { Github } from '../Icons.jsx'
import ArchStack from '../motion/ArchStack.jsx'
import { useLenis } from '../motion/useMotion.js'
import { Reveal, Kinetic, Magnetic } from '../motion/ui.jsx'
import { DEFAULT_TINT } from '../theme.js'
import Shell from '../components/Shell.jsx'
import NotFound from './NotFound.jsx'

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'build', label: 'What I built' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'features', label: 'Key features' },
  { id: 'outcome', label: 'Outcome' },
]

export default function ProjectDetail({ id }) {
  useLenis()
  const project = projects.find((p) => p.id === id)
  const d = projectDetails[id]
  const tintRef = useRef(d ? { ...d.tint, css: project?.accent } : DEFAULT_TINT)

  useEffect(() => {
    if (project) document.documentElement.style.setProperty('--section-accent', project.accent)
    window.scrollTo(0, 0)
  }, [project])

  if (!project || !d) return <NotFound />

  const i = projects.findIndex((p) => p.id === id)
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]

  return (
    <Shell tintRef={tintRef} veil="heavy">
      <div className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="pb-14 pt-36 md:pt-44">
          <Reveal>
            <a data-cursor href="#/work" className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-white/60 hover:text-white">
              <ArrowLeft size={14} /> All work
            </a>
            <p className="eyebrow mb-4 tracking-[0.3em]" style={{ color: project.accent }}>{project.kind}</p>
          </Reveal>

          <h1 className="text-display font-medium leading-[0.95] tracking-tight">
            <Kinetic lines={[project.name]} start="top 95%" />
          </h1>

          <Reveal delay={0.1}>
            <p className="mt-4 font-mono text-xs text-white/55">{project.period}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{project.summary}</p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tech.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a data-cursor href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black">
                  <Github size={15} /> View repository
                </a>
              </Magnetic>
              {project.demo && (
                <a data-cursor href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm hover:bg-white/5">
                  Live demo <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </Reveal>
        </section>

        {/* Measured results, where they exist and are traceable */}
        {project.metrics?.length > 0 && (
          <Reveal>
            <div className="panel grid grid-cols-1 gap-8 p-7 sm:grid-cols-2 md:p-9">
              {project.metrics.map((m) => (
                <div key={m.k}>
                  <p className="text-4xl font-medium tabular-nums md:text-5xl" style={{ color: project.accent }}>{m.v}</p>
                  <p className="mt-2 text-sm text-white/85">{m.k}</p>
                  {m.sub && <p className="mt-1 font-mono text-[11px] leading-relaxed text-white/55">{m.sub}</p>}
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* In-page contents */}
        <Reveal>
          <nav aria-label="On this page" className="mt-14 flex flex-wrap gap-2 border-y border-white/10 py-4">
            {SECTIONS.map((s) => (
              <a key={s.id} data-cursor href={`#${s.id}`} className="rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/65 hover:border-white/35 hover:text-white">
                {s.label}
              </a>
            ))}
          </nav>
        </Reveal>

        <Section id="overview" label="Overview">
          <p className="max-w-3xl text-xl leading-relaxed text-white/85 md:text-2xl">{d.problem}</p>
        </Section>

        <Section id="build" label="What I built">
          <ol className="space-y-6">
            {d.build.map((b, n) => (
              <Reveal key={n}>
                <li className="grid grid-cols-[auto_1fr] gap-5 border-t border-white/12 pt-6">
                  <span className="font-mono text-sm" style={{ color: project.accent }}>{String(n + 1).padStart(2, '0')}</span>
                  <p className="max-w-3xl text-[15px] leading-relaxed text-white/80">{b}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Section>

        <Section id="architecture" label="System architecture">
          <Reveal>
            <div className="panel p-6 ring-1 ring-inset ring-white/[0.06] md:p-9">
              <ArchStack layers={d.arch.layers} flow={d.arch.flow} accent={project.accent} />
            </div>
          </Reveal>
        </Section>

        <Section id="features" label="Key features">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <Reveal key={h}>
                <div className="flex items-start gap-3 rounded-2xl border border-white/12 bg-white/[0.03] p-5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.accent }} />
                  <span className="text-sm leading-relaxed text-white/85">{h}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="outcome" label="Outcome">
          <p className="max-w-3xl text-xl leading-relaxed text-white/85 md:text-2xl">{d.outcome}</p>

          {/* Stating the limits is the point of the project, not a disclaimer. */}
          {d.limits?.length > 0 && (
            <Reveal>
              <div className="mt-10 rounded-2xl border border-white/15 bg-white/[0.03] p-6 md:p-7">
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-white/60">What it does not do</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {d.limits.map((l) => (
                    <li key={l} className="flex items-start gap-3 text-sm leading-relaxed text-white/80">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </Section>

        {/* Prev / next */}
        <nav aria-label="More projects" className="grid grid-cols-1 gap-4 border-t border-white/10 py-12 sm:grid-cols-2">
          <a data-cursor href={`#/p/${prev.id}`} className="group panel p-6 transition-colors hover:border-white/35">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/55">
              <ArrowLeft size={13} /> Previous
            </span>
            <p className="mt-3 text-lg font-medium text-white">{prev.name}</p>
            <p className="mt-1 font-mono text-[11px]" style={{ color: prev.accent }}>{prev.kind}</p>
          </a>
          <a data-cursor href={`#/p/${next.id}`} className="group panel p-6 text-right transition-colors hover:border-white/35">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/55">
              Next <ArrowRight size={13} />
            </span>
            <p className="mt-3 text-lg font-medium text-white">{next.name}</p>
            <p className="mt-1 font-mono text-[11px]" style={{ color: next.accent }}>{next.kind}</p>
          </a>
        </nav>
      </div>
    </Shell>
  )
}

function Section({ id, label, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-white/10 py-16 md:py-20">
      <Reveal className="section-label mb-8">{label}</Reveal>
      {children}
    </section>
  )
}
