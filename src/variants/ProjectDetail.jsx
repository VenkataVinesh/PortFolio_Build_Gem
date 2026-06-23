import React, { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { profile, projects, projectDetails } from '../data.js'
import { Github } from '../Icons.jsx'
import ShaderGradient from '../motion/ShaderGradient.jsx'
import ArchStack from '../motion/ArchStack.jsx'
import { useLenis } from '../motion/useMotion.js'
import { Cursor, Grain, Reveal, Kinetic, Magnetic } from '../motion/ui.jsx'

export default function ProjectDetail({ id }) {
  useLenis()
  const project = projects.find((p) => p.id === id)
  const d = projectDetails[id]
  const tintRef = useRef(d ? d.tint : { a: [0.30, 0.17, 0.66], b: [0.10, 0.55, 0.80] })

  useEffect(() => {
    if (project) document.documentElement.style.setProperty('--section-accent', project.accent)
    window.scrollTo(0, 0)
  }, [project])

  if (!project || !d) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060410] text-white">
        <a href="#/aurora" className="font-mono text-sm underline">← project not found — back home</a>
      </div>
    )
  }

  return (
    <div className="font-sans-disp relative min-h-screen text-white selection:bg-white selection:text-black">
      <div className="fixed inset-0 z-0">
        <ShaderGradient className="h-full w-full" tintRef={tintRef} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060410]/35 via-[#0a0620]/55 to-[#060410]/80" />
      </div>
      <Cursor />
      <Grain />

      {/* Nav */}
      <header className="fixed top-0 z-50 w-full">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 mix-blend-difference">
          <a data-cursor href="#/aurora" className="flex items-center gap-2 font-mono text-sm tracking-tight hover:opacity-70">
            <ArrowLeft size={15} /> back
          </a>
          <a data-cursor href={project.repo} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] hover:opacity-70">
            <Github size={14} /> Repo
          </a>
        </nav>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="pt-36 pb-16 md:pt-44">
          <Reveal>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: project.accent }}>{project.kind}</p>
          </Reveal>
          <h1 className="font-medium leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(2.6rem,8vw,6rem)' }}>
            <Kinetic lines={[project.name]} start="top 95%" />
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tech.map((t) => <span key={t} className="rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] text-white/70">{t}</span>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a data-cursor href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black">
                  View repository <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </section>

        {/* Overview */}
        <Section label="Overview">
          <p className="max-w-3xl text-xl leading-relaxed text-white/85 md:text-2xl">{d.problem}</p>
        </Section>

        {/* What I built */}
        <Section label="What I built">
          <ol className="space-y-6">
            {d.build.map((b, i) => (
              <Reveal key={i}>
                <li className="grid grid-cols-[auto_1fr] gap-5 border-t border-white/12 pt-6">
                  <span className="font-mono text-sm" style={{ color: project.accent }}>{String(i + 1).padStart(2, '0')}</span>
                  <p className="max-w-3xl text-[15px] leading-relaxed text-white/80">{b}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* Architecture */}
        <Section label="System Architecture">
          <Reveal>
            <div className="rounded-3xl border border-white/15 bg-[#0b0917]/85 p-6 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-2xl md:p-9">
              <ArchStack layers={d.arch.layers} flow={d.arch.flow} accent={project.accent} />
            </div>
          </Reveal>
        </Section>

        {/* Key features */}
        <Section label="Key Features">
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

        {/* Outcome */}
        <Section label="Outcome">
          <p className="max-w-3xl text-xl leading-relaxed text-white/85 md:text-2xl">{d.outcome}</p>
          <Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <a data-cursor href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black">
                  View repository <ArrowUpRight size={16} />
                </a>
              </Magnetic>
              <a data-cursor href="#/aurora" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm hover:bg-white/5">
                <ArrowLeft size={15} /> All work
              </a>
            </div>
          </Reveal>
        </Section>

        <footer className="border-t border-white/12 py-10 font-mono text-xs text-white/40">
          © 2026 {profile.name} · {project.name}
        </footer>
      </div>
    </div>
  )
}

function Section({ label, children }) {
  return (
    <section className="border-t border-white/10 py-16 md:py-20">
      <Reveal className="mb-8 font-mono text-sm uppercase tracking-[0.25em] text-white/60">{label}</Reveal>
      {children}
    </section>
  )
}
