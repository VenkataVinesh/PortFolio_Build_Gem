import { ArrowUpRight } from 'lucide-react'
import FrameScene from '../motion/FrameScene.jsx'
import { profile } from '../data.js'

/*
  Cinematic chapters: a generated clip that plays as you scroll, with type that
  arrives in beats. The footage is illustration; every word and number on top of it
  is restated from data.js. Each chapter renders nothing until its frames exist.
*/

export function Beat({ at, align = 'left', children }) {
  const pos = align === 'right' ? 'md:ml-auto md:flex md:flex-col md:items-end md:text-right' : align === 'center' ? 'mx-auto flex flex-col items-center text-center' : ''
  return (
    <div data-beat={at} className="invisible absolute inset-x-5 bottom-[14vh] opacity-0 md:inset-x-10 md:bottom-[16vh]">
      <div className={`max-w-[880px] ${pos}`}>{children}</div>
    </div>
  )
}
export const Eyebrow = ({ children }) => (
  <p className="eyebrow mb-5 flex items-center gap-3 text-bone/80">
    <span className="h-px w-8" style={{ background: 'var(--spectrum)' }} />{children}
  </p>
)
export const Big = ({ children }) => <h2 className="text-[clamp(2.6rem,7.4vw,7.6rem)] font-medium leading-[0.9] tracking-[-0.05em] [text-shadow:0_4px_40px_rgba(0,0,0,0.6)]">{children}</h2>
const Num = ({ v, k }) => (
  <p>
    <span className="block text-[clamp(4rem,13vw,13rem)] font-medium leading-[0.85] tracking-[-0.06em] [text-shadow:0_4px_60px_rgba(0,0,0,0.6)]">{v}</span>
    <span className="mt-4 block max-w-md text-base text-bone/85 md:text-lg">{k}</span>
  </p>
)

export function TriageChapter() {
  return (
    <FrameScene id="triagemate" length={300} label="Illustration · generated">
      <Beat at="0.04,0.36"><Eyebrow>(02) Selected work</Eyebrow><Big>Two projects, <span className="font-serif-it tracking-[-0.02em]">on real data.</span></Big></Beat>
      <Beat at="0.4,0.7" align="right"><Num v="20,000" k="support tickets in the TriageMate dataset" /></Beat>
      <Beat at="0.72,1">
        <Num v="173" k="unique descriptions inside them. So I stopped training a classifier and built a triage co-pilot instead." />
        <a href="#/p/triagemate" data-cursor="view" className="group mt-8 inline-flex items-center gap-3 text-lg"><span className="link-spectrum">Read the case study</span><ArrowUpRight size={18} className="arrow-nudge" /></a>
      </Beat>
    </FrameScene>
  )
}

export function PrecitecChapter() {
  return (
    <FrameScene id="precitec" length={320} label="Illustration · generated · not lab footage">
      <Beat at="0.04,0.34"><Eyebrow>PRECITEC sensor · LTDS lab</Eyebrow><Big>White light in. <span className="font-serif-it tracking-[-0.02em]">Two surfaces out.</span></Big></Beat>
      <Beat at="0.38,0.66" align="right"><Num v="120/120" k="real glass-slide channels with exactly 2 surfaces found. The old Gaussian method found 4." /></Beat>
      <Beat at="0.7,1">
        <Num v="0.77 FWHM" k="closest pair resolved on a live frame of the real sensor (4.7 px)." />
        <a href="#/p/precitec" data-cursor="view" className="group mt-8 inline-flex items-center gap-3 text-lg"><span className="link-spectrum">Read the case study</span><ArrowUpRight size={18} className="arrow-nudge" /></a>
      </Beat>
    </FrameScene>
  )
}

export function ForecastChapter() {
  return (
    <FrameScene id="forecast" length={260} label="Illustration · generated">
      <Beat at="0.05,0.5"><Eyebrow>Veltrix · forecasting</Eyebrow><Big>Forecasting, <span className="font-serif-it tracking-[-0.02em]">and the band ahead.</span></Big></Beat>
      <Beat at="0.55,1" align="right"><Num v="94.75%" k="interval coverage against a 95% nominal band, after replacing EWMA with GARCH(1,1) in Veltrix." /></Beat>
    </FrameScene>
  )
}

export function DeskChapter() {
  return (
    <FrameScene id="desk" length={220} label="Illustration · generated">
      <Beat at="0.08,1" align="center"><Eyebrow>(05) What&apos;s next</Eyebrow><Big>{profile.seeking.headline}</Big></Beat>
    </FrameScene>
  )
}

/* Page-top chapters: a short pinned shot under a page's own title. */
export function PageChapter({ id, eyebrow, title, italic, length = 200 }) {
  return (
    <FrameScene id={id} length={length} label="Illustration · generated">
      <Beat at="0,1"><Eyebrow>{eyebrow}</Eyebrow><Big>{title} {italic && <span className="font-serif-it tracking-[-0.02em]">{italic}</span>}</Big></Beat>
    </FrameScene>
  )
}
