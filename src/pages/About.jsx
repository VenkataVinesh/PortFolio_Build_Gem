import { ArrowUpRight } from 'lucide-react'
import { profile, skills, education, experience, certification, languages } from '../data.js'
import { useLenis } from '../motion/useMotion.js'
import { Reveal, Kinetic, ClipReveal } from '../motion/ui.jsx'
import { THEMES, useSectionTheme } from '../theme.js'
import Shell from '../components/Shell.jsx'

export default function About() {
  useLenis()
  const tintRef = useSectionTheme(THEMES.about)

  return (
    <Shell tintRef={tintRef} current="about" veil="heavy">
      {/* Intro */}
      <section data-theme="about" className="mx-auto max-w-7xl px-6 pb-16 pt-36 md:pt-44">
        <Reveal><p className="section-label">About</p></Reveal>
        <h1 className="mt-5 text-display font-medium leading-[0.95] tracking-tight">
          <Kinetic lines={['I build the math myself', <span key="b" className="font-serif-it text-white/85">before reaching for a library.</span>]} start="top 95%" />
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <div className="relative max-w-sm">
              <ClipReveal dir="up" className="overflow-hidden rounded-2xl">
                <img src={profile.photo} alt={`Portrait of ${profile.name}`} loading="lazy" decoding="async"
                  className="aspect-[4/5] w-full object-cover grayscale transition duration-700 hover:grayscale-0" />
              </ClipReveal>
              <div className="absolute -bottom-4 -right-4 rounded-xl border border-white/20 bg-ink-2/80 px-4 py-2 font-mono text-xs backdrop-blur">
                {profile.location}
              </div>
            </div>

            <div className="mt-12 panel p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-white/60">Languages</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="text-white/90">{l.name}</span>
                    <span className="text-right font-mono text-[11px] text-white/60">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-white/85 md:text-xl">{profile.blurb}</p>
            <p className="mt-6 leading-relaxed text-white/75">
              My work clusters around one theme: modelling sequential, noisy real-world data. Forecasting it,
              optimising decisions on top of it, and learning policies that act on it. I would rather report that a
              model has no edge than dress up a backtest, and every number on this site traces to a file in the
              repository it describes.
            </p>
            <p className="mt-6 leading-relaxed text-white/75">
              I am looking for a {profile.seeking.what} starting {profile.seeking.when}, in{' '}
              {profile.seeking.where}.
            </p>

            <div className="mt-10 panel p-7 md:p-9">
              <h2 className="font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--section-accent,#f59e0b)' }}>
                Technical skills
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {skills.map((s) => (
                  <div key={s.group}>
                    <h3 className="font-mono text-[11px] uppercase tracking-widest text-white/60">{s.group}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/90">{s.items.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <Reveal className="mb-8"><h2 className="section-label">Education</h2></Reveal>
        <div className="panel overflow-hidden">
          {education.map((e, i) => (
            <Reveal key={e.school}>
              <div className={`px-7 py-7 md:px-9 ${i > 0 ? 'border-t border-white/10' : ''}`}>
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                  <h3 className="flex flex-wrap items-center gap-3 text-lg font-medium text-white">
                    {e.school}
                    {e.current && (
                      <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                        Current
                      </span>
                    )}
                  </h3>
                  <p className="shrink-0 font-mono text-xs text-white/60">{e.period}</p>
                </div>
                <p className="mt-2 text-sm text-white/85">{e.award}</p>
                <p className="mt-0.5 font-mono text-xs text-white/60">{e.programme} · {e.place}</p>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70">{e.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-6 panel flex flex-col gap-2 p-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-base font-medium text-white">{certification.name}</h3>
              <p className="mt-1 font-mono text-xs text-white/60">
                {certification.issuer} · {certification.instructor} · {certification.date}
              </p>
            </div>
            <p className="font-mono text-[11px] text-white/55">Credential ID {certification.credentialId}</p>
          </div>
        </Reveal>
      </section>

      {/* Leadership */}
      <section data-theme="leadership" className="mx-auto max-w-7xl px-6 pb-24">
        <Reveal className="mb-8"><h2 className="section-label">Leadership and activities</h2></Reveal>
        <div className="panel overflow-hidden">
          {experience.map((e, i) => (
            <Reveal key={e.role}>
              <div className={`grid grid-cols-1 gap-2 px-7 py-6 md:grid-cols-[1fr_2fr] md:items-center md:gap-10 md:px-9 ${i > 0 ? 'border-t border-white/10' : ''}`}>
                <div>
                  <h3 className="text-lg font-medium text-white">{e.role}</h3>
                  <p className="mt-1 font-mono text-xs text-white/60">{e.org} · {e.period}</p>
                </div>
                <p className="text-sm leading-relaxed text-white/80">{e.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            <a data-cursor href="#/resume" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black">
              Read the résumé <ArrowUpRight size={15} />
            </a>
            <a data-cursor href="#/work" className="rounded-full border border-white/25 px-6 py-3 text-sm hover:bg-white/5">
              See the work
            </a>
          </div>
        </Reveal>
      </section>
    </Shell>
  )
}
