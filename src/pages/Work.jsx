import { projects } from '../data.js'
import { useLenis } from '../motion/useMotion.js'
import { Reveal, Kinetic } from '../motion/ui.jsx'
import Shell from '../components/Shell.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

export default function Work() {
  useLenis()
  const [first, ...rest] = projects

  return (
    <Shell current="work">
      <section className="mx-auto max-w-7xl px-6 pb-14 pt-36 md:pt-44">
        <Reveal><p className="section-label">Work</p></Reveal>
        <h1 className="mt-5 text-display font-medium leading-[0.95] tracking-tight">
          <Kinetic lines={['Everything', <span key="i" className="font-serif-it">I have built.</span>]} start="top 95%" />
        </h1>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
            {projects.length} projects; each finished one has its own case study covering the problem, what I built, the
            architecture and the outcome. Every figure quoted traces to the project's own documentation, and simulated
            results are labelled as such.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28">
        <Reveal y={50}><ProjectCard project={first} index={1} large /></Reveal>
        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.id} y={50} delay={(i % 2) * 0.06}>
              <ProjectCard project={p} index={i + 2} />
            </Reveal>
          ))}
        </div>
        {/* Maintenance Copilot gets a case page once it has published results. */}
      </section>
    </Shell>
  )
}
