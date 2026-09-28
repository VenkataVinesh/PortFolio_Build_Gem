import { projects } from '../data.js'
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
            {projects.length} projects, each with its own case study covering the problem, what I built, the architecture and
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

      {/* Next up / planned section returns once Project B (the RAG assistant) has evaluation results. */}
    </Shell>
  )
}
