import { profile } from '../data.js'
import { Github, Linkedin } from '../Icons.jsx'

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-12 pt-10">
      <div className="flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-xs text-ink/80">{profile.name}</p>
          <p className="mt-1 font-mono text-xs text-mute">{profile.location}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <a data-cursor href={`mailto:${profile.email}`} className="btn-fill rounded-full border border-ink/30 px-4 py-2">Email</a>
          <a data-cursor href="#/resume" className="btn-fill rounded-full border border-ink/30 px-4 py-2">Résumé</a>
          <a data-cursor aria-label="GitHub" href={profile.github} target="_blank" rel="noreferrer" className="btn-fill inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/30"><Github size={15} /></a>
          <a data-cursor aria-label="LinkedIn" href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-fill inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/30"><Linkedin size={15} /></a>
        </div>
      </div>
      <p className="mt-8 font-mono text-[11px] text-mute">© 2026 {profile.name}. Built with React, GSAP and Lenis.</p>
    </footer>
  )
}
