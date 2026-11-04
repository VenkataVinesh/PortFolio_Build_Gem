import { profile } from '../data.js'
import { Roll } from '../motion/ui.jsx'
import { scrollToEl } from '../motion/core.js'

export default function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="eyebrow text-mute">© 2026 {profile.name}</p>
        <ul className="eyebrow flex flex-wrap items-center gap-x-7 gap-y-3 text-bone/75">
          <li><a href={profile.github} target="_blank" rel="noreferrer" data-cursor="open" className="hover:text-bone"><Roll>GitHub</Roll></a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="open" className="hover:text-bone"><Roll>LinkedIn</Roll></a></li>
          <li><a href="#/resume" className="hover:text-bone"><Roll>Résumé</Roll></a></li>
          <li>
            <button type="button" onClick={() => scrollToEl(0)} className="eyebrow hover:text-bone">
              <Roll>Back to top ↑</Roll>
            </button>
          </li>
        </ul>
        <p className="eyebrow text-mute">React · GSAP · Lenis · WebGL</p>
      </div>
    </footer>
  )
}
