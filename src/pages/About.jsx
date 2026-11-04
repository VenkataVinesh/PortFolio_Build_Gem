import { ArrowUpRight } from 'lucide-react'
import { profile, skills, education, experience, certification, languages } from '../data.js'
import { Lines, Reveal, RevealImage, ScrubWords, Roll, Magnetic } from '../motion/ui.jsx'

function Block({ label, children }) {
  return (
    <section className="mx-auto max-w-[1600px] px-5 md:px-10">
      <div className="grid grid-cols-1 gap-8 border-t border-line pt-10 md:grid-cols-12 md:pt-14">
        <h2 className="eyebrow text-mute md:col-span-3">{label}</h2>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <div className="flex flex-col gap-24 pb-32 md:gap-36">
      <section className="mx-auto w-full max-w-[1600px] px-5 pt-36 md:px-10 md:pt-48">
        <p className="eyebrow mb-6 text-mute">About</p>
        <h1 className="text-display font-medium leading-[0.9] tracking-[-0.05em]">
          <Lines trigger="enter" lines={['I build the math myself', <span key="b" className="font-serif-it tracking-[-0.02em]">before reaching for a library.</span>]} />
        </h1>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="group relative">
              <RevealImage src={profile.photo} alt={`Portrait of ${profile.name}`} width={1600} height={1538}
                className="aspect-[4/5] w-full" imgClassName="grayscale transition-[filter] duration-1000 group-hover:grayscale-0" />
              <span className="chip absolute bottom-4 left-4 bg-ink/70 backdrop-blur">{profile.location}</span>
            </div>
          </div>
          <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
            <Reveal as="p" className="text-[clamp(1.4rem,2.4vw,2.2rem)] font-medium leading-[1.2] tracking-[-0.025em]">{profile.blurb}</Reveal>
            <Reveal as="p" className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/70">
              My work clusters around one theme: modelling noisy, real-world data. Detecting peaks in a confocal sensor
              signal, forecasting time series, and building LLM tools that triage and explain.
            </Reveal>
            <Reveal className="mt-10 rounded-[18px] border border-line p-6">
              <p className="flex items-center gap-2.5 text-bone">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400" />{profile.seeking.headline}
              </p>
              <p className="mt-1 text-bone/70">{profile.seeking.where} {profile.seeking.note}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <ScrubWords className="max-w-5xl text-[clamp(1.8rem,4vw,4rem)] font-medium leading-[1.06] tracking-[-0.035em]"
          text="I would rather report that a method has no edge, or that a number is simulated, than dress up a result." />
      </section>

      <Block label="Technical skills">
        <ul>
          {skills.map((s) => (
            <Reveal as="li" key={s.group} className="grid grid-cols-1 gap-2 border-t border-line py-6 first:border-t-0 first:pt-0 md:grid-cols-[14rem_1fr] md:gap-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">{s.group}</span>
              <span className="text-xl leading-snug tracking-[-0.01em] md:text-2xl">{s.items.join(' · ')}</span>
            </Reveal>
          ))}
        </ul>
      </Block>

      <Block label="Education">
        <ul>
          {education.map((e) => (
            <Reveal as="li" key={e.school} className="border-t border-line py-8 first:border-t-0 first:pt-0">
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-6">
                <h3 className="flex flex-wrap items-center gap-3 text-[clamp(1.6rem,3vw,2.6rem)] font-medium tracking-[-0.035em]">
                  {e.school}
                  {e.current && <span className="chip border-emerald-400/40 text-emerald-300">Current</span>}
                </h3>
                <p className="shrink-0 font-mono text-xs text-mute">{e.period}</p>
              </div>
              <p className="mt-2 text-bone/85">{e.award}</p>
              <p className="mt-1 font-mono text-xs text-mute">{e.programme} · {e.place}</p>
              {e.note && <p className="mt-4 max-w-3xl leading-relaxed text-bone/65">{e.note}</p>}
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-4 flex flex-col gap-2 rounded-[18px] border border-line p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-medium">{certification.name}</h3>
            <p className="mt-1 font-mono text-xs text-mute">{certification.issuer} · {certification.instructor} · {certification.date}</p>
          </div>
          <p className="font-mono text-[11px] text-mute">Credential ID {certification.credentialId}</p>
        </Reveal>
      </Block>

      <Block label="Languages">
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {languages.map((l) => (
            <Reveal as="li" key={l.name}>
              <p className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">{l.name}</p>
              <p className="mt-1 font-mono text-[11px] text-mute">{l.level}</p>
            </Reveal>
          ))}
        </ul>
      </Block>

      <Block label="Leadership">
        <ul>
          {experience.map((e) => (
            <Reveal as="li" key={e.role} className="grid grid-cols-1 gap-3 border-t border-line py-7 first:border-t-0 first:pt-0 md:grid-cols-[1fr_1.4fr] md:gap-10">
              <div>
                <h3 className="text-xl font-medium tracking-[-0.02em]">{e.role}</h3>
                <p className="mt-1 font-mono text-xs text-mute">{e.org} · {e.period}</p>
              </div>
              <p className="leading-relaxed text-bone/70">{e.note}</p>
            </Reveal>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <Magnetic><a href="#/resume" className="btn-pill inline-flex items-center gap-2 rounded-full border border-bone/40 px-6 py-3.5 text-sm"><Roll>Read the résumé</Roll><ArrowUpRight size={15} className="arrow-nudge" /></a></Magnetic>
          <Magnetic><a href="#/work" className="btn-pill inline-flex items-center gap-2 rounded-full border border-bone/40 px-6 py-3.5 text-sm"><Roll>See the work</Roll></a></Magnetic>
        </div>
      </Block>
    </div>
  )
}
