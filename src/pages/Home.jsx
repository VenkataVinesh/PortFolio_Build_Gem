import { lazy, Suspense } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { profile, projects, planned } from '../data.js'
import { Github, Linkedin } from '../Icons.jsx'
import { useLenis } from '../motion/useMotion.js'
import { Reveal, Kinetic, Magnetic, Marquee, ClipReveal, LazyMount } from '../motion/ui.jsx'
import { Loader, ScrubText, CountUp } from '../motion/extras.jsx'
import { useSectionTheme } from '../theme.js'
import Shell from '../components/Shell.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

// Three.js only loads with this chunk, and only when the section nears the viewport.
const PointCloud3D = lazy(() => import('../motion/PointCloud3D.jsx'))

const CloudFallback = () => (
  <div aria-hidden="true" className="h-full w-full"
    style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(124,77,255,0.28) 0%, rgba(34,211,238,0.10) 55%, transparent 75%)' }} />
)

export default function Home() {
  useLenis()
  const tintRef = useSectionTheme()
  const allTech = [...new Set(projects.flatMap((p) => p.tech))]
  const featured = projects[0]
  const preview = projects.slice(1, 3)

  return (
    <Shell tintRef={tintRef} veil="light">
      <Loader name="VENKAT" />

      {/* Hero */}
      <section id="top" data-theme="hero" className="flex h-[100svh] flex-col justify-end overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 pb-[8vh]">
          <p className="eyebrow mb-6 tracking-[0.3em] text-white/75">
            {profile.role} · {profile.location}
          </p>
          <h1 className="text-hero font-medium leading-[0.9] tracking-[-0.03em]">
            <Kinetic lines={['Modeling the', <span key="i" className="font-serif-it text-white/90">signal in the noise.</span>]} start="top 95%" />
          </h1>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-base leading-relaxed text-white/80">{profile.tagline}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <a data-cursor href="#/work" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black">
                  See the work <ArrowUpRight size={16} />
                </a>
              </Magnetic>
              <Magnetic><a data-cursor aria-label="GitHub profile" href={profile.github} target="_blank" rel="noreferrer" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 backdrop-blur-sm"><Github size={17} /></a></Magnetic>
              <Magnetic><a data-cursor aria-label="LinkedIn profile" href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 backdrop-blur-sm"><Linkedin size={17} /></a></Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* Availability. The single most useful fact for a recruiter, stated plainly. */}
      <div className="border-y border-white/10 bg-white/[0.03] backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/85">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400 align-middle motion-safe:animate-pulse" aria-hidden="true" />
            Looking for a {profile.seeking.what} starting {profile.seeking.when}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">{profile.seeking.where}</p>
        </div>
      </div>

      <div className="border-b border-white/10 bg-white/[0.02] py-4 font-mono text-sm uppercase tracking-widest text-white/60 backdrop-blur-sm">
        <Marquee items={allTech} />
      </div>

      {/* Work preview */}
      <section id="work" data-theme="work" className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="section-label">Selected Work</h2>
          <a data-cursor href="#/work" className="group inline-flex items-center gap-2 font-mono text-sm text-white/70 hover:text-white">
            All {projects.length} projects
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <Reveal y={50}>
          <ProjectCard project={featured} featured />
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {preview.map((p, i) => (
            <Reveal key={p.id} y={50} delay={i * 0.05}>
              <ProjectCard project={p} index={i + 2} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Planned. Explicitly not started — see data.js. */}
      <section data-theme="architecture" className="mx-auto max-w-7xl px-6 pb-28">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-3">
          <h2 className="section-label text-white/70">Next up</h2>
          <span className="font-mono text-[11px] text-white/60">planned, not started</span>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {planned.map((p) => (
            <Reveal key={p.name} y={40}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-card border border-dashed border-white/25 bg-panel/70 p-7 ring-1 ring-inset ring-white/[0.04] backdrop-blur-2xl">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">{p.kind}</span>
                <h3 className="mt-4 text-xl font-medium tracking-tight md:text-2xl">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{p.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-mono text-[11px] text-white/50">
          No repository links here yet, because there is no code yet. They appear when there is.
        </p>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <ScrubText
          text="I care about the math being right, not just the code running. Forecasts you can trust, optimizers that converge, and a model that says so when it has no edge."
          className="text-3xl font-medium leading-snug tracking-tight md:text-[3.6rem] md:leading-[1.1]" />
        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-white/15 pt-10 md:grid-cols-4">
          {[
            { n: projects.length, s: '', k: 'Shipped projects' },
            { n: 1500, s: '', k: 'Walk-forward calls validated' },
            { n: 500, s: '+', k: 'TEDx attendees led' },
            { n: 7.96, s: '', k: 'CGPA / 10' },
          ].map((x) => (
            <div key={x.k}>
              <CountUp to={x.n} suffix={x.s} className="block text-4xl font-medium tabular-nums md:text-6xl" />
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-white/65">{x.k}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section data-theme="approach" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <Reveal>
            <p className="section-label text-white/70">Approach</p>
            <h2 className="mt-5 text-section font-medium leading-[1.05] tracking-tight">
              High-dimensional data,<br /><span className="font-serif-it text-white/85">made legible.</span>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-white/70">
              From price series to policy spaces, my work turns thousands of noisy points into structure you can
              act on. Drag your cursor across the field to feel it respond.
            </p>
            <a data-cursor href="#/about" className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm hover:bg-white/5">
              More about me <ArrowUpRight size={15} />
            </a>
          </Reveal>
          <ClipReveal dir="right" className="overflow-hidden rounded-3xl border border-white/15 bg-panel-2/90 shadow-panel-lg ring-1 ring-inset ring-white/[0.06]">
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 z-10" style={{ background: 'radial-gradient(65% 65% at 50% 50%, transparent 40%, rgba(8,6,15,0.7) 100%)' }} />
              <LazyMount className="h-[340px] w-full md:h-[460px]" fallback={<CloudFallback />}>
                <Suspense fallback={<CloudFallback />}>
                  <PointCloud3D className="h-full w-full" />
                </Suspense>
              </LazyMount>
            </div>
          </ClipReveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" data-theme="contact" className="mx-auto max-w-7xl px-6 py-32 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-display font-medium leading-[0.95] tracking-tight">
            <Kinetic lines={["Let's build", <span key="i" className="font-serif-it">something intelligent.</span>]} />
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a data-cursor href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black">
              <Mail size={16} /> Email me
            </a>
          </Magnetic>
          <a data-cursor href="#/resume" className="rounded-full border border-white/25 px-7 py-3.5 text-sm hover:bg-white/5">
            Résumé, EN and FR
          </a>
        </Reveal>
        <p className="mt-8 font-mono text-xs text-white/55">{profile.email}</p>
      </section>
    </Shell>
  )
}
