import { projects, planned } from '../data.js'
import { useLenis } from '../motion/useMotion.js'
import { Reveal, Kinetic } from '../motion/ui.jsx'
import { THEMES, useSectionTheme } from '../theme.js'
import Shell from '../components/Shell.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

// A dedicated index. Previously every project was reachable only by scrolling
// the home page, and two of the five were not surfaced at all.
export default function Work() {
  useLenis()
  const tintRef = useSectionTheme(THEMES.work)

  return (
    <Shell tintRef={tintRef} current="work" veil="heavy">
      <section data-theme="work" className="mx-auto max-w-7xl px-6 pb-16 pt-36 md:pt-44">
        <Reveal>
          <p className="section-label">Work</p>
        </Reveal>
        <h1 className="mt-5 text-display font-medium leading-[0.95] tracking-tight">
          <Kinetic lines={['Everything', <span key="i" className="font-serif-it text-white/85">I have shipped.</span>]} start="top 95%" />
        </h1>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Five projects, each with its own case study covering the problem, what I built, the architecture and
            the outcome. Every figure quoted traces to a file in the repository it describes.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <Reveal y={50}>
          <ProjectCard project={projects[0]} featured />
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.slice(1).map((p, i) => (
            <Reveal key={p.id} y={50} delay={i * 0.05}>
              <ProjectCard project={p} index={i + 2} />
            </Reveal>
          ))}
        </div>
      </section>

      <section data-theme="architecture" className="mx-auto max-w-7xl px-6 pb-24">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <h2 className="section-label text-white/70">Next up</h2>
          <span className="font-mono text-[11px] text-white/60">planned, not started</span>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {planned.map((p) => (
            <Reveal key={p.name} y={40}>
              <div className="flex h-full flex-col rounded-card border border-dashed border-white/25 bg-panel/70 p-7 ring-1 ring-inset ring-white/[0.04] backdrop-blur-2xl">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">{p.kind}</span>
                <h3 className="mt-4 text-xl font-medium tracking-tight md:text-2xl">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{p.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Shell>
  )
}
