import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger, liteMode, coarsePointer } from './core.js'

/*
  The home hero as a pinned 3D story (see sensorScene.js). The section is tall;
  a sticky stage holds the canvas, the hero content and four captions. Scroll
  progress through the section drives the camera and the captions together.
  Three.js loads as its own chunk; until it arrives the stage is a dark gradient
  and the hero content is fully readable.
*/

const STAGES = [
  {
    eyebrow: 'PRECITEC CHRocodile CLS 2',
    title: 'White light in.',
    body: 'A confocal line sensor shines white light through a lens and measures 1,200 points along a line at once.',
  },
  {
    eyebrow: 'Chromatic focus',
    title: 'Every colour focuses at its own depth.',
    body: 'The lens spreads focus by wavelength, so each colour comes into focus at a different height.',
  },
  {
    eyebrow: 'Glass slide',
    title: 'Two surfaces, two colours in focus.',
    body: 'Only the colour in focus on a surface reflects strongly back. Each point gives a 200-pixel spectrum, and a glass slide gives two peaks.',
  },
  {
    eyebrow: 'Peak detection · my part',
    title: 'Two peaks. Exactly two.',
    body: 'When peaks overlap, the vendor software reports one wrong height. My detector found exactly 2 surfaces on 120/120 real glass-slide channels; the old Gaussian method found 4.',
    link: { href: '#/p/precitec', label: 'Read the case study' },
  },
]

export default function SensorStory({ ref, children }) {
  const section = useRef(null)
  const canvasRef = useRef(null)
  const setRefs = (el) => {
    section.current = el
    if (typeof ref === 'function') ref(el)
    else if (ref) ref.current = el
  }

  useEffect(() => {
    const el = section.current
    let scene = null, dead = false, st = null
    import('./sensorScene.js')
      .then(({ createSensorScene }) => {
        if (dead) return
        scene = createSensorScene(canvasRef.current, { lite: liteMode(), pointer: !coarsePointer() })
        scene.setProgress(st?.progress ?? 0)
        requestAnimationFrame(() => canvasRef.current?.classList.add('is-on'))
      })
      .catch(() => { /* no scene: the dark stage and the hero content still stand */ })

    const ctx = gsap.context(() => {
      st = ScrollTrigger.create({ trigger: el, start: 'top top', end: 'bottom bottom', onUpdate: (s) => scene?.setProgress(s.progress) })
      // One timeline of length 1 = the whole section, scrubbed with the scroll.
      const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.5 } })
      tl.to('[data-story-hero]', { autoAlpha: 0, y: -70, duration: 0.1 }, 0.03)
      const at = [[0.18, 0.37], [0.4, 0.57], [0.6, 0.77], [0.82, 1]]
      gsap.utils.toArray(el.querySelectorAll('[data-stage]')).forEach((s, i) => {
        const [a, b] = at[i]
        tl.fromTo(s, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 0.05 }, a)
        if (i < at.length - 1) tl.to(s, { autoAlpha: 0, y: -48, duration: 0.04 }, b - 0.04)
      })
      tl.fromTo('[data-story-bar]', { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
      tl.set({}, {}, 1)
    }, el)

    return () => { dead = true; ctx.revert(); scene?.dispose() }
  }, [])

  return (
    <section ref={setRefs} id="top" className="relative h-[480vh]">
      <div className="sticky top-0 flex h-[100svh] min-h-[620px] flex-col overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0"
          style={{ background: 'radial-gradient(90% 70% at 62% 40%, #2a1f5c55 0%, #07070c 60%, #060609 100%)' }}>
          <canvas ref={canvasRef} className="block h-full w-full opacity-0 transition-opacity duration-[1600ms] [&.is-on]:opacity-100" />
        </div>

        <div data-story-hero className="relative z-10 flex flex-1 flex-col">{children}</div>

        <ol aria-label="How the sensor finds two surfaces"
          className="pointer-events-none absolute inset-0 z-10 grid items-end px-4 pb-[9vh] md:items-center md:px-10 md:pb-0">
          {STAGES.map((s, i) => (
            <li key={s.title} data-stage className="invisible max-w-[560px] rounded-2xl border border-line bg-ink/60 p-5 opacity-0 backdrop-blur-md [grid-area:1/1] md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
              <p className="eyebrow mb-4 flex items-center gap-3 text-bone/70">
                <span className="font-mono text-mute">0{i + 1}</span>
                <span className="h-px w-8" style={{ background: 'var(--spectrum)' }} />
                {s.eyebrow}
              </p>
              <h2 className="text-[clamp(2.1rem,4.6vw,4.6rem)] font-medium leading-[0.95] tracking-[-0.045em]">
                {i === STAGES.length - 1
                  ? <>Two peaks. <span className="font-serif-it tracking-[-0.02em]">Exactly two.</span></>
                  : s.title}
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-bone/75 md:text-base">{s.body}</p>
              {s.link && (
                <a href={s.link.href} data-cursor="view" className="pointer-events-auto group mt-6 inline-flex items-center gap-3 text-lg">
                  <span className="link-spectrum">{s.link.label}</span><ArrowUpRight size={18} className="arrow-nudge" />
                </a>
              )}
              {i >= 1 && <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">Schematic, not sensor data</p>}
            </li>
          ))}
        </ol>

        <div aria-hidden="true" className="absolute inset-x-4 bottom-5 z-10 h-px bg-line md:inset-x-10 md:bottom-7">
          <div data-story-bar className="h-px origin-left scale-x-0" style={{ background: 'var(--spectrum)' }} />
        </div>
      </div>
    </section>
  )
}
