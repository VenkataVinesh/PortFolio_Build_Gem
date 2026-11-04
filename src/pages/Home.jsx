import { ArrowUpRight, Mail } from 'lucide-react'
import { profile, projects } from '../data.js'
import { Github, Linkedin } from '../Icons.jsx'
import { useLenis } from '../motion/useMotion.js'
import { Reveal, Kinetic, Magnetic, Marquee } from '../motion/ui.jsx'
import { Loader, ScrubText, CountUp } from '../motion/extras.jsx'
import Shell from '../components/Shell.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

const PRINCIPLES = [
  {
    n: '01',
    t: 'Strict splits',
    d: 'Train on the past, score on the future. A random split lets near-identical readings leak across, which is how public benchmarks end up near-perfect.',
  },
  {
    n: '02',
    t: 'Real and simulated, labelled',
    d: 'If a number comes from a simulator it says so, next to the number. Only results measured on real hardware or real data are headline figures.',
  },
  {
    n: '03',
    t: 'No edge is a result',
    d: 'A forecast that does not beat a coin flip gets reported as exactly that, not tuned until the backtest looks good.',
  },
]

export default function Home() {
  useLenis()
  const allTech = [...new Set(projects.flatMap((p) => p.tech))]
  const lead = projects.slice(0, 3)

  return (
    <Shell>
      <Loader name="VENKAT" />

      {/* Hero */}
      <section id="top" className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-14 pt-32 md:pb-20">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em]">
            <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden="true" />
            {profile.seeking.headline}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">{profile.seeking.where}</span>
        </div>

        <h1 className="text-hero font-medium leading-[0.9] tracking-[-0.035em]">
          <Kinetic lines={['ML systems that', <span key="i" className="font-serif-it">hold up on real data.</span>]} start="top 95%" />
        </h1>

        <div className="mt-10 grid grid-cols-1 items-end gap-8 md:grid-cols-[auto_1fr_auto]">
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            className="h-24 w-24 rounded-full object-cover ring-1 ring-black/10 grayscale md:h-28 md:w-28"
          />
          <p className="max-w-xl text-lg leading-relaxed text-ink/80">
            {profile.name}. {profile.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a data-cursor href="#/work" className="btn-fill inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3.5 text-sm font-medium">
                See the work <ArrowUpRight size={16} />
              </a>
            </Magnetic>
            <Magnetic><a data-cursor aria-label="GitHub profile" href={profile.github} target="_blank" rel="noreferrer" className="btn-fill inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/40"><Github size={17} /></a></Magnetic>
            <Magnetic><a data-cursor aria-label="LinkedIn profile" href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-fill inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/40"><Linkedin size={17} /></a></Magnetic>
          </div>
        </div>
      </section>

      <div className="border-y border-line bg-paper-2 py-4 font-mono text-sm uppercase tracking-widest text-ink/70">
        <Marquee items={allTech} />
      </div>

      {/* Selected work: large stacked tiles */}
      <section id="work" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-section font-medium tracking-tight">
            Selected <span className="font-serif-it">work</span>
          </h2>
          <a data-cursor href="#/work" className="group inline-flex items-center gap-2 font-mono text-sm">
            <span className="link-line">All {projects.length} projects</span>
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <div className="flex flex-col gap-24 md:gap-32">
          {lead.map((p, i) => (
            <Reveal key={p.id} y={60}>
              <ProjectCard project={p} index={i + 1} large />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Statement + real numbers */}
      <section className="bg-dark text-paper">
        <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
          <ScrubText
            text="I care about the math being right, not just the code running. A detector that is measured on real hardware, a model that says so when it has no edge, and a simulated number that is always labelled simulated."
            className="text-3xl font-medium leading-snug tracking-tight md:text-[3.4rem] md:leading-[1.1]" />
          <div className="mt-20 grid grid-cols-1 gap-8 border-t border-white/15 pt-10 sm:grid-cols-3">
            {[
              { n: 120, s: '/120', k: 'Real glass-slide channels with exactly 2 surfaces found' },
              { n: 0.77, s: ' FWHM', k: 'Closest surface pair resolved on a live frame' },
              { n: projects.length, s: '', k: 'Projects' },
            ].map((x) => (
              <div key={x.k}>
                <CountUp to={x.n} suffix={x.s} className="block text-5xl font-medium tabular-nums md:text-7xl" />
                <p className="mt-3 max-w-xs font-mono text-[11px] uppercase tracking-widest text-paper/65">{x.k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How I evaluate */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Reveal>
          <p className="section-label">How I evaluate</p>
          <h2 className="mt-4 max-w-3xl text-section font-medium leading-[1.05] tracking-tight">
            Three rules I do not <span className="font-serif-it">bend.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PRINCIPLES.map((x, i) => (
            <Reveal key={x.n} delay={i * 0.06}>
              <div className="card h-full p-7">
                <p className="font-mono text-xs text-mute">{x.n}</p>
                <h3 className="mt-6 text-xl font-medium">{x.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-6 pb-28 pt-8 text-center md:pb-36">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-display font-medium leading-[0.95] tracking-tight">
            <Kinetic lines={["Let's build", <span key="i" className="font-serif-it">something real.</span>]} />
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a data-cursor href={`mailto:${profile.email}`} className="btn-fill inline-flex items-center gap-2 rounded-full border border-ink px-7 py-3.5 text-sm font-medium">
              <Mail size={16} /> Email me
            </a>
          </Magnetic>
          <a data-cursor href="#/resume" className="btn-fill rounded-full border border-ink/40 px-7 py-3.5 text-sm">Résumé, EN and FR</a>
        </Reveal>
        <p className="mt-8 font-mono text-xs text-mute">{profile.email}</p>
      </section>
    </Shell>
  )
}
