import { ArrowUpRight } from 'lucide-react'
import FrameScene from '../motion/FrameScene.jsx'

/*
  Caption pieces for the cinematic scenes (see FrameScene), and the short pinned shot
  under a page's own title. The footage is illustration; every word and number on top
  of it is restated from data.js.
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
export const Num = ({ v, k }) => (
  <p>
    <span data-count={v} className="block text-[clamp(4rem,13vw,13rem)] font-medium leading-[0.85] tracking-[-0.06em] [text-shadow:0_4px_60px_rgba(0,0,0,0.6)]">{v}</span>
    <span className="mt-4 block max-w-md text-base text-bone/85 md:text-lg">{k}</span>
  </p>
)

export const CaseLink = ({ href, children = 'Read the case study' }) => (
  <a href={href} data-cursor="view" className="group mt-8 inline-flex items-center gap-3 text-lg">
    <span className="link-spectrum">{children}</span><ArrowUpRight size={18} className="arrow-nudge" />
  </a>
)

/* Page-top chapters: a short pinned shot under a page's own title. */
export function PageChapter({ id, eyebrow, title, italic, length = 200 }) {
  return (
    <FrameScene id={id} length={length} label="Illustration · generated">
      <Beat at="0,1"><Eyebrow>{eyebrow}</Eyebrow><Big>{title} {italic && <span className="font-serif-it tracking-[-0.02em]">{italic}</span>}</Big></Beat>
    </FrameScene>
  )
}
