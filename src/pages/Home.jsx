import { useEffect, useLayoutEffect, useRef } from 'react'
import { ArrowUpRight, ArrowRight, ArrowDown } from 'lucide-react'
import { profile, projects, figures } from '../data.js'
import { Github, Linkedin } from '../Icons.jsx'
import Field from '../motion/Field.jsx'
import { Lines, Reveal, Magnetic, Marquee, ScrubWords, Decode, Roll, Atmosphere } from '../motion/ui.jsx'
import { gsap, ScrollTrigger, reducedMotion, onEnter, getLenis } from '../motion/core.js'
import { ProjectTile, TriageVisual } from '../components/Tiles.jsx'

const pad = (n) => String(n).padStart(2, '0')

function Hero() {
  const root = useRef(null)
  useEffect(() => {
    const el = root.current
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.set('[data-hero-fade]', { opacity: 0, y: 24 })
      const cancel = onEnter(() => {
        gsap.to('[data-hero-fade]', { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08, delay: 0.45 })
      })
      // Scroll: type lifts away faster than the page; the field dims into depth.
      gsap.to('[data-hero-type]', { yPercent: -28, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('[data-hero-field]', { opacity: 0.25, scale: 1.08, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } })
      return cancel
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="top" className="relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden">
      <div data-hero-field className="absolute inset-0 will-change-transform">
        <Field className="absolute inset-0" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(6,6,9,0.96)_0%,rgba(6,6,9,0.78)_38%,rgba(6,6,9,0.1)_70%)] md:bg-[radial-gradient(120%_70%_at_20%_100%,rgba(6,6,9,0.92)_0%,rgba(6,6,9,0.4)_45%,transparent_70%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end px-5 pb-8 pt-28 md:px-10 md:pb-10">
        {/* Selected index, top right on large screens: the first project link is here. */}
        <nav aria-label="Selected projects" data-hero-fade className="absolute right-10 top-32 hidden w-64 lg:block">
          <p className="eyebrow mb-4 text-mute">Selected</p>
          <ol className="flex flex-col">
            {projects.slice(0, 3).map((p, i) => (
              <li key={p.id} className="border-t border-line">
                <a href={`#/p/${p.id}`} data-cursor="view" className="group flex items-baseline justify-between gap-3 py-2.5 text-sm text-bone/80 hover:text-bone">
                  <span className="flex items-baseline gap-3"><span className="font-mono text-[10px] text-mute">{pad(i + 1)}</span><span className="link-line">{p.name.split(':')[0]}</span></span>
                  {p.inProgress ? <span className="font-mono text-[9px] uppercase tracking-widest text-violet">In progress</span> : <ArrowUpRight size={13} className="arrow-nudge opacity-50" />}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <p data-hero-fade className="eyebrow mb-5 flex items-center gap-3 text-bone/70">
          <span className="h-px w-8" style={{ background: 'var(--spectrum)' }} />
          {profile.role} · {profile.location}
        </p>

        <h1 data-hero-type className="text-[25vw] font-medium md:text-mega leading-[0.84] tracking-[-0.055em]">
          <span className="sr-only">{profile.name}: </span>
          <Lines trigger="enter" stagger={0.12} lines={[
            'Signal',
            <span key="b" className="font-serif-it pl-[0.04em] tracking-[-0.02em] text-bone/95">from noise.</span>,
          ]} />
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-7 md:mt-10 md:grid-cols-12 md:items-end">
          <div data-hero-fade className="md:col-span-6 lg:col-span-5">
            <p className="text-base font-medium tracking-tight text-bone md:text-lg">{profile.name}</p>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-bone/70 md:text-base">{profile.tagline}</p>
          </div>
          <div data-hero-fade className="md:col-span-3 lg:col-span-4">
            <p className="flex items-start gap-2.5 text-sm leading-snug text-bone/85">
              <span aria-hidden="true" className="relative mt-1.5 flex h-2 w-2 shrink-0"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
              <span>Internship from <strong className="font-medium text-bone">March 2027</strong> · France, Switzerland, Germany</span>
            </p>
          </div>
          <div data-hero-fade className="flex items-center gap-4 md:col-span-3 md:justify-end">
            <Magnetic strength={0.4}>
              <a href="#work" onClick={(e) => { e.preventDefault(); const t = document.getElementById('work'); const l = getLenis(); if (l) l.scrollTo(t, { duration: 1.6 }); else t?.scrollIntoView({ behavior: 'smooth' }) }}
                data-cursor="link"
                className="btn-pill group inline-flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-full border border-bone/40 text-center text-[13px] font-medium md:h-32 md:w-32">
                <Roll>See the work</Roll>
                <ArrowDown size={15} className="transition-transform duration-500 group-hover:translate-y-1" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}

function Availability() {
  const item = (
    <span className="flex items-center gap-[4vw] pr-[4vw]">
      <span>{profile.seeking.headline}</span>
      <span aria-hidden="true" className="text-spectrum">✦</span>
      <span className="font-serif-it">{profile.seeking.where}</span>
      <span aria-hidden="true" className="text-spectrum">✦</span>
    </span>
  )
  return (
    <section aria-label="Availability" className="relative border-y border-line bg-ink-2/60 py-6 md:py-9">
      <Marquee duration={48} className="text-[clamp(1.8rem,4.6vw,4.4rem)] font-medium leading-none tracking-[-0.04em] whitespace-nowrap">
        {item}
      </Marquee>
    </section>
  )
}

function Statement() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-44">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <p className="eyebrow text-mute md:col-span-3">(01) How I work</p>
        <div className="md:col-span-9">
          <ScrubWords
            className="text-[clamp(1.9rem,4.4vw,4.6rem)] font-medium leading-[1.05] tracking-[-0.035em]"
            text="I would rather report that a method has no edge, or that a number is simulated, than dress up a result." />
          <Reveal className="mt-14 grid grid-cols-1 gap-8 border-t border-line pt-8 md:grid-cols-2">
            <p className="max-w-lg leading-relaxed text-bone/70">{profile.blurb}</p>
            <div className="flex items-end md:justify-end">
              <a href="#/about" className="group inline-flex items-center gap-3 text-lg">
                <span className="link-spectrum">More about me</span>
                <ArrowUpRight size={18} className="arrow-nudge" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Two flagship projects as full-bleed tiles that stack as you scroll. */
function Features() {
  const root = useRef(null)
  const [tm, pr] = projects
  useEffect(() => {
    const el = root.current
    if (reducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const cards = gsap.utils.toArray(el.querySelectorAll('[data-stack-card]'))
      cards.slice(0, -1).forEach((card, i) => {
        gsap.to(card, {
          scale: 0.92, filter: 'brightness(0.45)', ease: 'none',
          scrollTrigger: { trigger: cards[i + 1].parentElement, start: 'top bottom', end: 'top 8%', scrub: true },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="work" ref={root} className="relative mx-auto max-w-[1600px] px-3 md:px-6">
      <div className="flex flex-col gap-6 px-2 pb-12 md:flex-row md:items-end md:justify-between md:px-4 md:pb-16">
        <div>
          <p className="eyebrow mb-5 text-mute">(02) Selected work</p>
          <h2 className="text-display font-medium leading-[0.9] tracking-[-0.05em]">
            <Lines lines={['Two projects,', <span key="b" className="font-serif-it tracking-[-0.02em]">on real data.</span>]} />
          </h2>
        </div>
        <Reveal><a href="#/work" className="group eyebrow inline-flex items-center gap-2 text-bone/75 hover:text-bone"><Roll>All {projects.length} projects</Roll><ArrowUpRight size={14} className="arrow-nudge" /></a></Reveal>
      </div>

      <div className="flex flex-col gap-4 md:gap-0">
        {/* TriageMate */}
        <div className="md:sticky md:top-[5vh] md:h-[100vh]">
          <a data-stack-card href={`#/p/${tm.id}`} data-cursor="view"
            className="group relative block h-[min(92vh,880px)] min-h-[640px] overflow-hidden rounded-[22px] border border-line md:rounded-[30px]">
            <Atmosphere accent={tm.accent} />
            <div className="relative z-10 grid h-full grid-cols-1 gap-6 p-6 md:grid-cols-12 md:p-12">
              <div className="flex flex-col justify-between md:col-span-5">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-bone/70">
                  <span>01 · {tm.period}</span>
                </div>
                <div>
                  <p className="eyebrow mb-4 text-bone/70">{tm.kind}</p>
                  <h3 className="text-[clamp(3.4rem,8.5vw,9rem)] font-medium leading-[0.86] tracking-[-0.055em]">{tm.name}</h3>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-bone/80 md:text-lg">
                    {tm.teaser}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">{tm.tech.slice(0, 5).map((t) => <li key={t} className="chip bg-ink/30 backdrop-blur-sm">{t}</li>)}</ul>
                  <span className="mt-8 inline-flex items-center gap-3 text-lg"><span className="link-spectrum">Read the case study</span><ArrowUpRight size={18} className="arrow-nudge" /></span>
                </div>
              </div>
              <div className="relative hidden md:col-span-7 md:block">
                <TriageVisual shots={tm.screenshots} />
              </div>
              <div className="relative -mx-2 h-56 md:hidden">
                <TriageVisual shots={tm.screenshots} compact />
              </div>
            </div>
          </a>
        </div>

        {/* PRECITEC */}
        <div className="md:sticky md:top-[5vh] md:h-[100vh]">
          <a data-stack-card href={`#/p/${pr.id}`} data-cursor="view"
            className="group relative block h-[min(92vh,880px)] min-h-[640px] overflow-hidden rounded-[22px] border border-line md:rounded-[30px]">
            <Atmosphere accent={pr.accent} intensity={0.9} />
            <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12">
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/70">
                <span>02 · {pr.period}</span>
                <span>Team of 4 · my part: planning, detector, simulator, integration</span>
              </div>
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <p className="eyebrow mb-4 text-bone/70">{pr.kind}</p>
                  <h3 className="text-[clamp(2.6rem,6vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.05em]">
                    Seeing two surfaces <span className="font-serif-it tracking-[-0.02em]">where the sensor sees one.</span>
                  </h3>
                  <p className="mt-5 text-sm text-bone/70">{pr.name}</p>
                  <span className="mt-8 inline-flex items-center gap-3 text-lg"><span className="link-spectrum">Read the case study</span><ArrowUpRight size={18} className="arrow-nudge" /></span>
                </div>
                <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
                  {pr.metrics.map((m) => (
                    <div key={m.v} className="border-t border-bone/20 pt-4">
                      <dt className="sr-only">{m.k}</dt>
                      <dd>
                        <span className="flex items-baseline gap-3">
                          <Decode value={m.v} className="whitespace-nowrap text-[clamp(2.8rem,4.6vw,5rem)] font-medium leading-none tracking-[-0.05em]" />
                          <span className="chip border-emerald-400/40 text-emerald-300">Real sensor</span>
                        </span>
                        <span className="mt-2 block text-sm text-bone/75">{m.k} · {m.sub}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

/* Remaining projects on a pinned horizontal track (native swipe on touch). */
function Track() {
  const root = useRef(null), track = useRef(null), stRef = useRef(null)
  const rest = projects.slice(2)

  useLayoutEffect(() => {
    const el = root.current
    if (reducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (pointer: fine)', () => {
      const t = track.current
      const distance = () => t.scrollWidth - window.innerWidth
      const tween = gsap.to(t, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 },
      })
      stRef.current = tween.scrollTrigger
      // Cards drift slightly against the track for depth.
      t.querySelectorAll('[data-depth]').forEach((c) => {
        gsap.fromTo(c, { xPercent: 6 }, { xPercent: -6, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
      })
      gsap.to('[data-track-progress]', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${distance()}`, scrub: true } })
      return () => { stRef.current = null }
    })
    return () => mm.revert()
  }, [])

  // Keyboard: tabbing to an off-screen card scrolls the pinned track to it.
  const onFocus = (e) => {
    const st = stRef.current; if (!st) return
    const card = e.target.closest('[data-card]'); if (!card) return
    const y = st.start + Math.min(st.end - st.start, Math.max(0, card.offsetLeft - 80))
    const l = getLenis(); if (l) l.scrollTo(y, { immediate: true }); else window.scrollTo(0, y)
  }

  return (
    <section aria-label="More projects" className="relative">
     {/* GSAP pins this inner div (it inserts a pin-spacer around it), so the React-owned parent stays intact. */}
     <div ref={root} className="relative overflow-hidden py-24 lg:flex lg:h-screen lg:items-center lg:py-0">
      <div ref={track} onFocus={onFocus} data-cursor="drag"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none] lg:snap-none lg:gap-6 lg:overflow-visible lg:px-10 lg:pb-0 [&::-webkit-scrollbar]:hidden">
        <div className="flex w-[78vw] shrink-0 snap-start flex-col justify-end pr-6 sm:w-[46vw] lg:w-[34vw]">
          <p className="eyebrow mb-5 text-mute">(03) More work</p>
          <h2 className="text-display font-medium leading-[0.9] tracking-[-0.05em]">
            <Lines lines={['Forecasting,', 'agents and', <span key="c" className="font-serif-it tracking-[-0.02em]">the maths.</span>]} />
          </h2>
          <p className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
            <span className="hidden lg:inline">Scroll</span><span className="lg:hidden">Swipe</span> <ArrowRight size={13} />
          </p>
        </div>
        {rest.map((p, i) => (
          <div key={p.id} data-card className="shrink-0 snap-start">
            <ProjectTile project={p} index={i + 3} />
          </div>
        ))}
        <div data-card className="flex w-[70vw] shrink-0 snap-start items-center sm:w-[40vw] lg:w-[30vw]">
          <a href="#/work" data-cursor="view" className="group flex flex-col gap-4">
            <span className="eyebrow text-mute">Index</span>
            <span className="text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[0.9] tracking-[-0.05em]">
              <span className="link-spectrum">All projects</span>
            </span>
            <ArrowUpRight size={34} className="arrow-nudge" />
          </a>
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-10 bottom-10 hidden h-px bg-line lg:block">
        <div data-track-progress className="h-px origin-left scale-x-0" style={{ background: 'var(--spectrum)' }} />
      </div>
     </div>
    </section>
  )
}

function Figures() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
      <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-5 text-mute">(04) Measured, not tuned</p>
          <h2 className="text-display font-medium leading-[0.9] tracking-[-0.05em]">
            <Lines lines={['Real numbers', <span key="b" className="font-serif-it tracking-[-0.02em]">only.</span>]} />
          </h2>
        </div>
        <Reveal as="p" className="max-w-sm text-sm leading-relaxed text-bone/65">
          Every figure here was measured on real data or real out-of-sample runs. Simulated results stay on the case pages, labelled as simulated.
        </Reveal>
      </div>
      <dl className="grid grid-cols-1 border-t border-line md:grid-cols-2">
        {figures.map((f, i) => {
          const p = projects.find((x) => x.id === f.from)
          return (
            <div key={f.v} className={`group relative border-b border-line py-10 md:py-14 ${i % 2 === 0 ? 'md:border-r md:pr-10' : 'md:pl-10'}`}>
              <dt className="sr-only">{f.k}</dt>
              <dd>
                <Decode value={f.v} className="block whitespace-nowrap text-[clamp(3.4rem,7.6vw,9.5rem)] font-medium leading-[0.9] tracking-[-0.06em]" />
                <span className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="text-base text-bone/80">{f.k}</span>
                </span>
                <span className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="chip border-emerald-400/40 text-emerald-300">{f.tag}</span>
                  <a href={`#/p/${p.id}`} data-cursor="view" className="eyebrow text-mute hover:text-bone"><span className="link-line">{p.name.split(':')[0]}</span></a>
                </span>
              </dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <Atmosphere accent="#7c5cff" className="opacity-80" />
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 pb-16 pt-28 md:px-10 md:pb-20 md:pt-40">
        <p className="eyebrow mb-6 text-bone/70">(05) Contact</p>
        <h2 className="text-hero font-medium leading-[0.86] tracking-[-0.055em]">
          <Lines lines={["Let's build", <span key="b" className="font-serif-it tracking-[-0.02em]">something real.</span>]} />
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <p className="text-lg text-bone md:text-xl">{profile.seeking.headline}</p>
            <p className="mt-1 text-lg text-bone/75 md:text-xl">{profile.seeking.where} <span className="text-bone/55">{profile.seeking.note}</span></p>
            <ul className="mt-10 flex flex-col gap-3">
              <li>
                <span className="eyebrow mb-1 block text-mute">Personal</span>
                <a href={`mailto:${profile.emailAlt}`} className="inline-block break-all text-[clamp(1.1rem,2.4vw,2rem)] font-medium tracking-tight">
                  <span className="link-spectrum">{profile.emailAlt}</span>
                </a>
              </li>
              <li>
                <span className="eyebrow mb-1 block text-mute">École Centrale de Lyon</span>
                <a href={`mailto:${profile.email}`} className="inline-block break-all text-[clamp(1rem,1.8vw,1.5rem)] font-medium tracking-tight text-bone/80">
                  <span className="link-spectrum">{profile.email}</span>
                </a>
              </li>
            </ul>
            <ul className="mt-8 flex flex-wrap gap-3">
              <li><a href={profile.github} target="_blank" rel="noreferrer" data-cursor="open" className="btn-pill inline-flex items-center gap-2 rounded-full border border-bone/30 px-5 py-3 text-sm"><Github size={15} /><Roll>GitHub</Roll></a></li>
              <li><a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="open" className="btn-pill inline-flex items-center gap-2 rounded-full border border-bone/30 px-5 py-3 text-sm"><Linkedin size={15} /><Roll>LinkedIn</Roll></a></li>
              <li><a href="#/resume" className="btn-pill inline-flex items-center gap-2 rounded-full border border-bone/30 px-5 py-3 text-sm"><Roll>Résumé, EN / FR</Roll></a></li>
            </ul>
          </Reveal>
          <div className="flex md:col-span-5 md:justify-end">
            <Magnetic strength={0.45}>
              <a href={`mailto:${profile.emailAlt}`} data-cursor="link"
                className="group relative inline-flex h-40 w-40 items-center justify-center overflow-hidden rounded-full text-ink md:h-52 md:w-52">
                <span aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--spectrum)' }} />
                <span aria-hidden="true" className="absolute inset-[2px] rounded-full bg-bone transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-0" />
                <span className="relative flex items-center gap-2 text-base font-medium"><Roll>Write to me</Roll><ArrowUpRight size={18} className="arrow-nudge" /></span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 600)
    return () => clearTimeout(id)
  }, [])
  return (
    <>
      <Hero />
      <Availability />
      <Statement />
      <Features />
      <Track />
      <Figures />
      <Contact />
    </>
  )
}
