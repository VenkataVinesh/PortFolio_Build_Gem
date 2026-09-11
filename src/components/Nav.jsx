import { profile } from '../data.js'
import { Github, Linkedin } from '../Icons.jsx'
import { MobileMenu } from '../motion/ui.jsx'

// Routes are real hash routes now, so the nav is identical on every page.
// "Resume" was previously reachable only from the mobile menu.
const NAV_LINKS = [
  { label: 'Work', href: '#/work' },
  { label: 'About', href: '#/about' },
  { label: 'Resume', href: '#/resume' },
  { label: 'Contact', href: '#/', contact: true },
]

// A hash router cannot carry a second hash, so "#/#contact" is not a usable
// href. Contact instead routes home and then scrolls to the section.
function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function onContactClick(e) {
  e.preventDefault()
  const atHome = !window.location.hash.startsWith('#/') || window.location.hash === '#/'
  if (atHome) {
    scrollToContact()
    return
  }
  window.location.hash = '#/'
  // Let the route render before looking for the target.
  requestAnimationFrame(() => requestAnimationFrame(scrollToContact))
}

export default function Nav({ current }) {
  return (
    <header className="fixed top-0 z-50 w-full">
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a
          href="#/"
          className="font-mono text-sm tracking-tight mix-blend-difference"
          aria-label={`${profile.short} — home`}
        >
          VENKAT<span className="opacity-50">/ML</span>
        </a>

        <div className="hidden gap-8 font-mono text-[11px] uppercase tracking-[0.2em] mix-blend-difference md:flex">
          {NAV_LINKS.map((l) => {
            const active = current && l.href === `#/${current}`
            return (
              <a
                key={l.label}
                data-cursor
                href={l.href}
                onClick={l.contact ? onContactClick : undefined}
                aria-current={active ? 'page' : undefined}
                className={active ? 'underline underline-offset-[6px]' : 'hover:opacity-60'}
              >
                {l.label}
              </a>
            )
          })}
        </div>

        <MobileMenu
          links={NAV_LINKS.map((l) => (l.contact ? { ...l, onClick: onContactClick } : l))}
          footer={
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-white/90">
                <Github size={14} /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-white/90">
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          }
        />
      </nav>
    </header>
  )
}
