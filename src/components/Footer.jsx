import { profile } from '../data.js'
import { Github, Linkedin } from '../Icons.jsx'

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-14 pt-10">
      <div className="flex flex-col gap-6 border-t border-white/12 pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-xs text-white/70">{profile.name}</p>
          <p className="mt-1 font-mono text-xs text-white/55">{profile.location}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <a href={`mailto:${profile.email}`} className="rounded-full border border-white/20 px-4 py-2 text-white/80 hover:bg-white/5">
            Email
          </a>
          <a href="#/resume" className="rounded-full border border-white/20 px-4 py-2 text-white/80 hover:bg-white/5">
            Résumé
          </a>
          <a aria-label="GitHub" href={profile.github} target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/5">
            <Github size={15} />
          </a>
          <a aria-label="LinkedIn" href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/5">
            <Linkedin size={15} />
          </a>
        </div>
      </div>

      <p className="mt-8 font-mono text-[11px] text-white/45">
        © 2026 {profile.name}. WebGL shader, GSAP and Lenis, built from scratch.
      </p>
    </footer>
  )
}
