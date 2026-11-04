import { useEffect, useState } from 'react'
import { profile } from '../data.js'
import { Github, Linkedin } from '../Icons.jsx'
import { MobileMenu } from '../motion/ui.jsx'

const NAV_LINKS = [
  { label: 'Work', href: '#/work' },
  { label: 'About', href: '#/about' },
  { label: 'Résumé', href: '#/resume' },
  { label: 'Contact', href: '#/', contact: true },
]

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// A hash router cannot carry a second hash, so Contact routes home, then scrolls.
function onContactClick(e) {
  e.preventDefault()
  const atHome = !window.location.hash.startsWith('#/') || window.location.hash === '#/'
  if (atHome) { scrollToContact(); return }
  window.location.hash = '#/'
  requestAnimationFrame(() => requestAnimationFrame(scrollToContact))
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let frame = 0
    const read = () => { frame = 0; setScrolled(window.scrollY > threshold) }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame) }
  }, [threshold])
  return scrolled
}

export default function Nav({ current }) {
  const scrolled = useScrolled()
  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Backdrop on its own layer so the fixed mobile menu is not trapped by backdrop-filter. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 border-b border-line bg-paper/85 backdrop-blur-md transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
      />
      <nav aria-label="Main" className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#/" className="flex items-center gap-2.5 text-sm font-medium tracking-tight" aria-label={`${profile.short}, home`}>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink font-mono text-[11px] text-paper">VV</span>
          <span className="hidden sm:inline">Venkata Vinesh</span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-line bg-card/80 p-1 font-mono text-[11px] uppercase tracking-[0.16em] backdrop-blur md:flex">
          {NAV_LINKS.map((l) => {
            const active = current && l.href === `#/${current}`
            return (
              <a
                key={l.label}
                data-cursor
                href={l.href}
                onClick={l.contact ? onContactClick : undefined}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-4 py-2 transition-colors ${active ? 'bg-ink text-paper' : 'text-ink/70 hover:bg-ink/5 hover:text-ink'}`}
              >
                {l.label}
              </a>
            )
          })}
        </div>

        <a
          data-cursor
          href={`mailto:${profile.email}`}
          className="btn-fill hidden rounded-full border border-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] md:inline-block"
        >
          Say hello
        </a>

        <MobileMenu
          links={NAV_LINKS.map((l) => (l.contact ? { ...l, onClick: onContactClick } : l))}
          footer={
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2.5">
                <Github size={14} /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2.5">
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          }
        />
      </nav>
    </header>
  )
}
