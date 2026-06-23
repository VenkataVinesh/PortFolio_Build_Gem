import React, { useEffect, useRef } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { profile, projects, skills, experience } from '../data.js'
import { Github, Linkedin } from '../Icons.jsx'
import ShaderGradient from '../motion/ShaderGradient.jsx'
import PointCloud3D from '../motion/PointCloud3D.jsx'
import { useLenis } from '../motion/useMotion.js'
import { Cursor, Grain, Reveal, Kinetic, Magnetic, Marquee, ClipReveal } from '../motion/ui.jsx'
import { Loader, ScrollProgress, ScrubText, CountUp } from '../motion/extras.jsx'

// Per-section background palettes (RGB 0–1). The shader lerps between them as you scroll.
const THEMES = {
  hero:         { a: [0.30, 0.17, 0.66], b: [0.10, 0.55, 0.80], css: '#7c5cff' },  // violet → cyan
  work:         { a: [0.05, 0.42, 0.55], b: [0.10, 0.66, 0.72], css: '#22d3ee' },  // teal / cyan
  approach:     { a: [0.46, 0.12, 0.62], b: [0.80, 0.24, 0.64], css: '#d946ef' },  // magenta
  architecture: { a: [0.09, 0.30, 0.46], b: [0.14, 0.55, 0.70], css: '#38bdf8' },  // steel cyan
  about:        { a: [0.44, 0.22, 0.05], b: [0.96, 0.64, 0.22], css: '#f59e0b' },  // warm amber/gold
  leadership:   { a: [0.09, 0.40, 0.34], b: [0.20, 0.64, 0.46], css: '#34d399' },  // emerald
  contact:      { a: [0.44, 0.19, 0.56], b: [0.88, 0.40, 0.50], css: '#fb7185' },  // warm rose
}

export default function Aurora() {
  useLenis()
  const allTech = [...new Set(projects.flatMap((p) => p.tech))]
  const featured = projects[0]
  const rest = projects.slice(1)
  const tintRef = useRef(THEMES.hero)

  // Drive the background palette from whichever section is centered in the viewport.
  useEffect(() => {
    const els = document.querySelectorAll('[data-theme]')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && THEMES[e.target.dataset.theme]) {
          tintRef.current = THEMES[e.target.dataset.theme]
          document.documentElement.style.setProperty('--section-accent', THEMES[e.target.dataset.theme].css)
        }
      })
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="font-sans-disp relative min-h-screen text-white selection:bg-white selection:text-black">
      {/* Global animated aurora background — spans the whole page */}
      <div className="fixed inset-0 z-0">
        <ShaderGradient className="h-full w-full" tintRef={tintRef} />
        {/* light legibility veil — keeps the purple vivid across the whole page */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060410]/10 via-[#0a0620]/28 to-[#060410]/42" />
      </div>

      <Loader name="VINESH" />
      <ScrollProgress color="var(--section-accent, #7c5cff)" />
      <Cursor />
      <Grain />

      {/* Nav */}
      <header className="fixed top-0 z-50 w-full">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 mix-blend-difference">
          <a href="#top" className="font-mono text-sm tracking-tight">VINESH<span className="opacity-50">/ML</span></a>
          <div className="hidden gap-8 font-mono text-[11px] uppercase tracking-[0.2em] md:flex">
            <a data-cursor href="#work" className="hover:opacity-60">Work</a>
            <a data-cursor href="#about" className="hover:opacity-60">About</a>
            <a data-cursor href="#contact" className="hover:opacity-60">Contact</a>
          </div>
        </nav>
      </header>

      <div className="relative z-10">
        {/* Hero */}
        <section id="top" data-theme="hero" className="flex h-[100svh] flex-col justify-end overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-6 pb-[8vh]">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-white/75">
              {profile.role} — {profile.location}
            </p>
            <h1 className="font-medium leading-[0.9] tracking-[-0.03em]" style={{ fontSize: 'clamp(2.8rem, 11vw, 11rem)' }}>
              <Kinetic lines={['Modeling the', <span key="i" className="font-serif-it text-white/90">signal in the noise.</span>]} start="top 95%" />
            </h1>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-base leading-relaxed text-white/80">{profile.tagline}</p>
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic>
                  <a data-cursor href="#work" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black">
                    See the work <ArrowUpRight size={16} />
                  </a>
                </Magnetic>
                <Magnetic><a data-cursor href={profile.github} target="_blank" rel="noreferrer" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 backdrop-blur-sm"><Github size={17} /></a></Magnetic>
                <Magnetic><a data-cursor href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 backdrop-blur-sm"><Linkedin size={17} /></a></Magnetic>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee band */}
        <div className="border-y border-white/10 bg-white/[0.03] py-4 font-mono text-sm uppercase tracking-widest text-white/60 backdrop-blur-sm">
          <Marquee items={allTech} />
        </div>

        {/* Work */}
        <section id="work" data-theme="work" className="mx-auto max-w-7xl px-6 py-28 md:py-36">
          <Reveal className="mb-12 flex items-end justify-between">
            <h2 className="font-mono text-sm uppercase tracking-[0.25em] text-white/60">Selected Work</h2>
            <span className="font-mono text-sm text-white/40">/ 0{projects.length}</span>
          </Reveal>

          {/* Featured flagship card */}
          <Reveal y={50}>
            <a data-cursor href={`#/p/${featured.id}`}
              className="group relative block overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#0b0917]/85 p-8 shadow-[0_28px_80px_-28px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-white/35 md:p-10"
              style={{ '--a': featured.accent }}>
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" style={{ background: featured.accent }} />
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30" style={{ background: featured.accent }} />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest" style={{ color: featured.accent, background: `${featured.accent}1a` }}>Flagship</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">{featured.kind}</span>
                  </div>
                  <h3 className="mt-5 flex items-center gap-3 font-medium tracking-tight" style={{ fontSize: 'clamp(2.2rem,4.5vw,3.6rem)' }}>
                    {featured.name}
                    <ArrowUpRight size={28} className="-translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" style={{ color: featured.accent }} />
                  </h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75">{featured.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {featured.tech.map((t) => <span key={t} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] text-white/65">{t}</span>)}
                  </div>
                </div>
                <ul className="flex flex-col justify-center gap-3 border-white/10 md:border-l md:pl-12">
                  {featured.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-white/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: featured.accent }} />{h}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          </Reveal>

          {/* Grid of the rest */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.id} y={50} delay={i * 0.05}>
                <a data-cursor href={`#/p/${p.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#0b0917]/85 p-7 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-white/35"
                  style={{ '--a': p.accent }}>
                  <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" style={{ background: p.accent }} />
                  <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-25" style={{ background: p.accent }} />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white/35">0{i + 2}</span>
                    <ArrowUpRight size={20} className="text-white/30 transition-colors group-hover:text-[color:var(--a)]" />
                  </div>
                  <h3 className="mt-5 font-medium tracking-tight" style={{ fontSize: 'clamp(1.5rem,2.4vw,2rem)' }}>{p.name}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest" style={{ color: p.accent }}>{p.kind}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">{p.summary}</p>
                  <ul className="mt-5 flex flex-col gap-2">
                    {p.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-[13px] text-white/65">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: p.accent }} />{h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                    {p.tech.map((t) => <span key={t} className="rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[10px] text-white/55">{t}</span>)}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Scrub statement */}
        <section className="mx-auto max-w-6xl px-6 py-28 md:py-40">
          <ScrubText
            text="I care about the math being right — not just the code running. Forecasts you can trust, optimizers that converge, policies that actually learn."
            className="text-3xl font-medium leading-snug tracking-tight md:text-[3.6rem] md:leading-[1.1]" />
          <div className="mt-20 grid grid-cols-2 gap-8 border-t border-white/15 pt-10 md:grid-cols-4">
            {[
              { n: 5, s: '', k: 'Shipped projects' },
              { n: 7.96, s: '', k: 'CGPA / 10' },
              { n: 500, s: '+', k: 'TEDx attendees led' },
              { n: 3, s: '', k: 'Leadership roles' },
            ].map((x) => (
              <div key={x.k}>
                <CountUp to={x.n} suffix={x.s} className="block text-4xl font-medium tabular-nums md:text-6xl" />
                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-white/50">{x.k}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Approach — interactive 3D point cloud */}
        <section data-theme="approach" className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <Reveal>
              <p className="font-mono text-sm uppercase tracking-[0.25em] text-white/55">Approach</p>
              <h2 className="mt-5 font-medium leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)' }}>
                High-dimensional data,<br /><span className="font-serif-it text-white/85">made legible.</span>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-white/70">
                From price series to policy spaces, my work turns thousands of noisy points into structure you can
                act on. Drag your cursor across the field to feel it respond.
              </p>
            </Reveal>
            <ClipReveal dir="right" className="overflow-hidden rounded-3xl border border-white/15 bg-[#08060f]/90 shadow-[0_28px_80px_-28px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/[0.06]">
              <div className="relative">
                <div className="pointer-events-none absolute inset-0 z-10" style={{ background: 'radial-gradient(65% 65% at 50% 50%, transparent 40%, rgba(8,6,15,0.7) 100%)' }} />
                <PointCloud3D className="h-[340px] w-full md:h-[460px]" />
              </div>
            </ClipReveal>
          </div>
        </section>

        {/* About */}
        <section id="about" data-theme="about" className="mx-auto max-w-7xl px-6 py-28">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <div className="relative max-w-sm">
                <ClipReveal dir="up" className="overflow-hidden rounded-2xl">
                  <img src={profile.photo} alt={profile.name} className="aspect-[4/5] w-full object-cover grayscale transition duration-700 hover:grayscale-0" />
                </ClipReveal>
                <div className="absolute -bottom-4 -right-4 rounded-xl border border-white/20 bg-[#0a0620]/80 px-4 py-2 font-mono text-xs backdrop-blur">CGPA {profile.cgpa}</div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-medium leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2rem,4vw,3.4rem)' }}>
                <Kinetic lines={['I build the math myself', <span key="b" className="font-serif-it text-white/85">before reaching for a library.</span>]} />
              </h2>
              <div className="mt-8 rounded-3xl border border-white/15 bg-[#0b0917]/80 p-7 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-2xl md:p-9">
                <p className="text-lg leading-relaxed text-white/90">
                  {profile.name} — CS undergrad at {profile.university}, targeting {profile.target}. My work lives where
                  time-series forecasting, optimization and reinforcement learning meet.
                </p>
                <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3">
                  {skills.map((s) => (
                    <div key={s.group}>
                      <h4 className="font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--section-accent,#f59e0b)' }}>{s.group}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-white/90">{s.items.join(' · ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Leadership */}
        <section data-theme="leadership" className="mx-auto max-w-7xl px-6 py-24">
          <Reveal className="mb-8 font-mono text-sm uppercase tracking-[0.25em] text-white/70">Leadership</Reveal>
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-[#0b0917]/85 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-2xl">
            {experience.map((e, i) => (
              <Reveal key={i}>
                <div className={`grid grid-cols-1 gap-2 px-7 py-6 md:grid-cols-[1fr_2fr] md:items-center md:gap-10 md:px-9 ${i > 0 ? 'border-t border-white/10' : ''}`}>
                  <div>
                    <h4 className="text-lg font-medium text-white">{e.role}</h4>
                    <p className="mt-1 font-mono text-xs text-white/60">{e.org} · {e.period}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-white/80">{e.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-theme="contact" className="mx-auto max-w-7xl px-6 py-32 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-4xl font-medium leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(2.4rem,8vw,7rem)' }}>
              <Kinetic lines={["Let's build", <span key="i" className="font-serif-it">something intelligent.</span>]} />
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a data-cursor href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black">
                <Mail size={16} /> {profile.email}
              </a>
            </Magnetic>
            <a data-cursor href={profile.resume} className="rounded-full border border-white/25 px-7 py-3.5 text-sm hover:bg-white/5">Résumé ↗</a>
          </Reveal>
          <p className="mt-20 font-mono text-xs text-white/40">© 2026 {profile.name} · WebGL shader · GSAP · Lenis · built from scratch</p>
        </section>
      </div>
    </div>
  )
}
