import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowUpRight, Lock } from 'lucide-react'
import { projects, projectDetails } from '../data.js'
import Field from '../motion/Field.jsx'
import { Lines, Reveal, Magnetic, ScrubWords, Decode, Roll, RevealImage, Atmosphere } from '../motion/ui.jsx'
import { gsap, reducedMotion, onEnter } from '../motion/core.js'
import NotFound from './NotFound.jsx'

const pad = (n) => String(n).padStart(2, '0')

function titleLines(name) {
  const [a, b] = name.split(':')
  if (b) return [a + ':', <span key="b" className="font-serif-it tracking-[-0.02em]">{b.trim()}</span>]
  return [name]
}

function Section({ n, label, children, className = '', accent }) {
  return (
    <section className={`relative mx-auto max-w-[1600px] px-5 md:px-10 ${className}`}>
      {accent && <div aria-hidden="true" className="pointer-events-none absolute -left-[10%] -top-24 h-[420px] w-[60%] opacity-60" style={{ background: `radial-gradient(closest-side, ${accent}1f, transparent)` }} />}
      <div className="relative grid grid-cols-1 gap-8 border-t border-line pt-10 md:grid-cols-12 md:gap-10 md:pt-14">
        <div className="md:col-span-3">
          <div className="md:sticky md:top-28">
            <p className="font-mono text-[11px] text-mute">({pad(n)})</p>
            <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] md:text-3xl">{label}</h2>
          </div>
        </div>
        <div className="relative md:col-span-9">{children}</div>
      </div>
    </section>
  )
}

/* A single result as large decoding type, with its provenance tag beside the number. */
function Figure({ v, k, sub, tag, tone = 'real', small = false }) {
  const tagCls = tone === 'sim' ? 'border-amber/50 text-amber' : 'border-emerald-400/40 text-emerald-300'
  return (
    <div className="border-t border-line py-8">
      <dt className="sr-only">{k}</dt>
      <dd>
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <Decode value={v} className={`whitespace-nowrap font-medium leading-[0.9] tracking-[-0.055em] ${small ? 'text-[clamp(2.4rem,4.6vw,4.6rem)]' : 'text-[clamp(3rem,7.5vw,7.5rem)]'}`} />
          <span className={`chip ${tagCls}`}>{tag}</span>
        </span>
        <span className="mt-3 block max-w-xl text-base text-bone/80">{k}</span>
        {sub && <span className="mt-1 block text-sm text-mute">{sub}</span>}
      </dd>
    </div>
  )
}

function Hero({ p, idx }) {
  const root = useRef(null)
  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.set('[data-fade]', { opacity: 0, y: 20 })
      const cancel = onEnter(() => gsap.to('[data-fade]', { opacity: 1, y: 0, duration: 1.1, stagger: 0.07, ease: 'expo.out', delay: 0.35 }))
      gsap.to('[data-hero-field]', { opacity: 0.2, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('[data-hero-type]', { yPercent: -20, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      return cancel
    }, root.current)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div data-hero-field className="absolute inset-0"><Field className="absolute inset-0" tint={p.accent} tintMix={0.6} gain={0.9} /></div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#060609_5%,rgba(6,6,9,0.55)_45%,rgba(6,6,9,0.2)_100%)]" />
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between px-5 pb-10 pt-28 md:px-10 md:pb-14 md:pt-36">
        <div data-fade className="flex items-center justify-between">
          <a href="#/work" className="group eyebrow inline-flex items-center gap-2 text-bone/75 hover:text-bone">
            <ArrowLeft size={14} className="transition-transform duration-500 group-hover:-translate-x-1" /><Roll>All work</Roll>
          </a>
          <span className="font-mono text-[11px] text-bone/60">{pad(idx + 1)} / {pad(projects.length)}</span>
        </div>
        <div data-hero-type>
          <p data-fade className="eyebrow mb-6 flex flex-wrap items-center gap-3 text-bone/75">
            {p.inProgress && <span className="chip border-violet/60 bg-violet/15 text-bone">In progress</span>}
            {p.kind}
          </p>
          <h1 className="text-hero font-medium leading-[0.88] tracking-[-0.055em]">
            <Lines trigger="enter" lines={titleLines(p.name)} />
          </h1>
          <dl data-fade className="mt-10 grid grid-cols-2 gap-6 border-t border-bone/15 pt-6 md:grid-cols-4">
            <div><dt className="eyebrow text-mute">Period</dt><dd className="mt-2 text-sm">{p.period}</dd></div>
            <div className="col-span-1 md:col-span-3"><dt className="eyebrow text-mute">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">{p.tech.map((t) => <span key={t} className="chip">{t}</span>)}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}

function Links({ p }) {
  if (p.codePrivate) {
    return (
      <p className="inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-sm text-bone/85">
        <Lock size={15} className="text-mute" /> Code private (lab project); details on request
      </p>
    )
  }
  if (p.inProgress) return <p className="text-sm text-mute">In progress. No public link yet.</p>
  return (
    <div className="flex flex-wrap gap-3">
      {p.repo && <Magnetic><a href={p.repo} target="_blank" rel="noreferrer" data-cursor="open" className="btn-pill inline-flex items-center gap-2 rounded-full border border-bone/40 px-6 py-3.5 text-sm"><Roll>Source code</Roll><ArrowUpRight size={15} className="arrow-nudge" /></a></Magnetic>}
      {p.demo && <Magnetic><a href={p.demo} target="_blank" rel="noreferrer" data-cursor="open" className="btn-pill inline-flex items-center gap-2 rounded-full border border-bone/40 px-6 py-3.5 text-sm"><Roll>Live demo</Roll><ArrowUpRight size={15} className="arrow-nudge" /></a></Magnetic>}
    </div>
  )
}

export default function ProjectDetail({ id }) {
  const idx = projects.findIndex((x) => x.id === id)
  if (idx < 0) return <NotFound />
  const p = projects[idx]
  const d = projectDetails[id] || {}
  const next = projects[(idx + 1) % projects.length]
  let n = 0

  return (
    <article>
      <Hero p={p} idx={idx} />

      {/* Summary */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <ScrubWords text={p.summary} className="max-w-[22ch] text-[clamp(1.7rem,3.6vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.035em] md:max-w-[30ch]" />
        {d.teamNote && (
          <Reveal className="mt-12 max-w-2xl border-l-2 pl-5" style={{ borderColor: p.accent }}>
            <p className="eyebrow mb-2 text-mute">My part</p>
            <p className="leading-relaxed text-bone/85">{d.teamNote}</p>
          </Reveal>
        )}
      </section>

      {/* Real imagery where it exists */}
      {p.screenshots && (
        <section aria-label="Screenshots" className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10 md:pb-36">
          <figure>
            <RevealImage src={p.screenshots[0].src} alt={p.screenshots[0].alt} width={800} height={450} className="aspect-[16/9] w-full md:mx-auto md:w-[82%]" />
            <figcaption className="mt-4 text-center font-mono text-[11px] text-mute">{p.screenshots[0].alt}</figcaption>
          </figure>
          <div className="mt-6 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-2">
            {p.screenshots.slice(1).map((s, i) => (
              <figure key={s.src} className={i === 1 ? 'md:mt-24' : ''}>
                <RevealImage src={s.src} alt={s.alt} width={800} height={450} className="aspect-[16/9] w-full" />
                <figcaption className="mt-4 font-mono text-[11px] text-mute">{s.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-col gap-24 pb-24 md:gap-36 md:pb-36">
        {d.problem && (
          <Section accent={p.accent} n={++n} label="Problem">
            <Reveal as="p" className="max-w-3xl text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.4] tracking-[-0.01em] text-bone/90">{d.problem}</Reveal>
          </Section>
        )}

        {(d.build || p.inProgress) && (
          <Section accent={p.accent} n={++n} label={d.buildLabel || (p.inProgress ? 'What it will do' : 'What I built')}>
            <ol>
              {(d.build || p.highlights).map((b, i) => (
                <Reveal as="li" key={i} className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-7 first:border-t-0 first:pt-0 md:grid-cols-[5rem_1fr]">
                  <span className="font-mono text-sm text-mute transition-colors group-hover:text-bone">{pad(i + 1)}</span>
                  <p className="max-w-3xl text-lg leading-relaxed text-bone/85 md:text-xl">{b}</p>
                </Reveal>
              ))}
            </ol>
            {p.inProgress && <p className="mt-8 text-sm text-mute">Being built. No results yet, and none are claimed here.</p>}
          </Section>
        )}

        {/* Results as type */}
        {(d.results || p.metrics) && (
          <Section accent={p.accent} n={++n} label="Results">
            {d.results ? (
              <>
                <h3 className="eyebrow mb-2 text-emerald-300">On real data</h3>
                <dl className="mb-16">
                  {d.results.real.map((r) => <Figure key={r.v} {...r} tag="Real sensor" />)}
                </dl>
                <h3 className="eyebrow mb-2 text-amber">Simulated benchmark</h3>
                <p className="mb-4 max-w-2xl text-sm text-mute">Fixed benchmark from a realistic simulator (seed 2026, a different calibration from the one the detector uses). Every number in this group is simulated.</p>
                <dl className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
                  {d.results.simulated.map((r) => <Figure key={r.v} {...r} tag="Simulated" tone="sim" small />)}
                </dl>
                {d.results.runtime && <p className="mt-10 max-w-2xl border-t border-line pt-6 text-sm leading-relaxed text-bone/70">{d.results.runtime}</p>}
              </>
            ) : (
              <dl>{p.metrics.map((m) => <Figure key={m.v} {...m} tag="Out of sample" />)}</dl>
            )}
          </Section>
        )}

        {d.outcome && (
          <Section accent={p.accent} n={++n} label="Outcome">
            <ScrubWords text={d.outcome} className="max-w-4xl text-[clamp(1.5rem,2.8vw,2.6rem)] font-medium leading-[1.18] tracking-[-0.025em]" />
          </Section>
        )}

        {d.limits && (
          <Section accent={p.accent} n={++n} label={d.limitsLabel || 'Limits'}>
            <ul>
              {d.limits.map((l) => (
                <Reveal as="li" key={l} className="flex gap-4 border-t border-line py-5 text-bone/80 first:border-t-0 first:pt-0">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-bone/40" />{l}
                </Reveal>
              ))}
            </ul>
          </Section>
        )}

        <Section accent={p.accent} n={n + 1} label="Links">
          <Links p={p} />
        </Section>
      </div>

      {/* Next project */}
      <section aria-label="Next project" className="relative overflow-hidden border-t border-line">
        <a href={`#/p/${next.id}`} data-cursor="next" className="group relative block px-5 py-24 md:px-10 md:py-40">
          <div className="absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-100"><Atmosphere accent={next.accent} /></div>
          <div className="relative z-10 mx-auto max-w-[1600px]">
            <p className="eyebrow mb-6 text-bone/70">Next project</p>
            <p className="text-[clamp(3rem,10vw,10rem)] font-medium leading-[0.86] tracking-[-0.055em] transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4">
              {next.name.split(':')[0]}
            </p>
            <p className="mt-6 flex items-center gap-3 text-bone/75">{next.kind} <ArrowUpRight size={18} className="arrow-nudge" /></p>
          </div>
        </a>
      </section>
    </article>
  )
}
