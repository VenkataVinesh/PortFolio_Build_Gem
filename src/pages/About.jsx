import { ArrowUpRight } from 'lucide-react'
import { profile, skills, education, experience, certification, languages } from '../data.js'
import { useLenis } from '../motion/useMotion.js'
import { Reveal, Kinetic } from '../motion/ui.jsx'
import Shell from '../components/Shell.jsx'

export default function About() {
  useLenis()

  return (
    <Shell current="about">
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-36 md:pt-44">
        <Reveal><p className="section-label">About</p></Reveal>
        <h1 className="mt-5 text-display font-medium leading-[0.95] tracking-tight">
          <Kinetic lines={['I build the math myself', <span key="b" className="font-serif-it">before reaching for a library.</span>]} start="top 95%" />
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <div className="relative max-w-sm">
              <img src={profile.photo} alt={`Portrait of ${profile.name}`} loading="lazy" decoding="async"
                className="aspect-[4/5] w-full rounded-[2rem] object-cover ring-1 ring-black/10 grayscale transition duration-700 hover:grayscale-0" />
              <div className="absolute -bottom-4 -right-4 rounded-full border border-line bg-paper px-4 py-2 font-mono text-xs">
                {profile.location}
              </div>
            </div>

            <div className="card mt-12 p-6">
              <h2 className="section-label">Languages</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-baseline justify-between gap-4 text-sm">
                    <span>{l.name}</span>
                    <span className="text-right font-mono text-[11px] text-mute">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xl leading-relaxed md:text-2xl">{profile.blurb}</p>
            <p className="mt-6 leading-relaxed text-ink/75">
              My work clusters around one theme: modelling noisy, real-world data. Detecting peaks in a confocal sensor
              signal, forecasting time series, and building LLM tools that triage and explain. I would rather report
              that a method has no edge, or that a number is simulated, than dress up a result.
            </p>
            <p className="mt-6 leading-relaxed text-ink/75">
              {profile.seeking.headline} {profile.seeking.where} {profile.seeking.note}
            </p>

            <div className="card mt-10 p-7 md:p-9">
              <h2 className="section-label">Technical skills</h2>
              <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {skills.map((s) => (
                  <div key={s.group}>
                    <h3 className="font-mono text-[11px] uppercase tracking-widest text-mute">{s.group}</h3>
                    <p className="mt-2 text-sm leading-relaxed">{s.items.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <Reveal className="mb-8"><h2 className="section-label">Education</h2></Reveal>
        <div className="card overflow-hidden">
          {education.map((e, i) => (
            <Reveal key={e.school}>
              <div className={`px-7 py-7 md:px-9 ${i > 0 ? 'border-t border-line' : ''}`}>
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                  <h3 className="flex flex-wrap items-center gap-3 text-lg font-medium">
                    {e.school}
                    {e.current && (
                      <span className="rounded-full border border-emerald-600/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-800">
                        Current
                      </span>
                    )}
                  </h3>
                  <p className="shrink-0 font-mono text-xs text-mute">{e.period}</p>
                </div>
                <p className="mt-2 text-sm">{e.award}</p>
                <p className="mt-0.5 font-mono text-xs text-mute">{e.programme} · {e.place}</p>
                {e.note && <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/70">{e.note}</p>}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="card mt-6 flex flex-col gap-2 p-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-base font-medium">{certification.name}</h3>
              <p className="mt-1 font-mono text-xs text-mute">
                {certification.issuer} · {certification.instructor} · {certification.date}
              </p>
            </div>
            <p className="font-mono text-[11px] text-mute">Credential ID {certification.credentialId}</p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28">
        <Reveal className="mb-8"><h2 className="section-label">Leadership</h2></Reveal>
        <div className="card overflow-hidden">
          {experience.map((e, i) => (
            <Reveal key={e.role}>
              <div className={`grid grid-cols-1 gap-2 px-7 py-6 md:grid-cols-[1fr_2fr] md:items-center md:gap-10 md:px-9 ${i > 0 ? 'border-t border-line' : ''}`}>
                <div>
                  <h3 className="text-lg font-medium">{e.role}</h3>
                  <p className="mt-1 font-mono text-xs text-mute">{e.org} · {e.period}</p>
                </div>
                <p className="text-sm leading-relaxed text-ink/75">{e.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            <a data-cursor href="#/resume" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper">
              Read the résumé <ArrowUpRight size={15} />
            </a>
            <a data-cursor href="#/work" className="btn-fill rounded-full border border-ink/40 px-6 py-3 text-sm">See the work</a>
          </div>
        </Reveal>
      </section>
    </Shell>
  )
}
