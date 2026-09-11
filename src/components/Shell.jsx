import ShaderGradient from '../motion/ShaderGradient.jsx'
import { Cursor, Grain } from '../motion/ui.jsx'
import { ScrollProgress } from '../motion/extras.jsx'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

/**
 * Page chrome shared by every route: the animated background, the grain and
 * cursor layers, the scroll indicator, the nav and the footer.
 *
 * `veil` controls how much the background is dimmed. The home page keeps it
 * light so the aurora stays vivid; text-dense routes darken it for contrast.
 */
export default function Shell({ tintRef, current, veil = 'light', children, footer = true }) {
  // Text-dense routes need a much darker ground than the home page, which is
  // mostly large type and can afford to let the aurora stay vivid.
  const veils = {
    light: 'from-ink/10 via-ink-2/28 to-ink/42',
    heavy: 'from-ink/70 via-ink-2/78 to-ink/88',
  }

  return (
    <div className="font-sans-disp relative min-h-screen text-white selection:bg-white selection:text-black">
      <a
        href="#main"
        className="sr-only z-[2001] rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <div className="fixed inset-0 z-0" aria-hidden="true">
        <ShaderGradient className="h-full w-full" tintRef={tintRef} />
        <div className={`absolute inset-0 bg-gradient-to-b ${veils[veil]}`} />
      </div>

      <ScrollProgress color="var(--section-accent, #7c5cff)" />
      <Cursor />
      <Grain />
      <Nav current={current} />

      <div className="relative z-10">
        <main id="main">{children}</main>
        {footer && <Footer />}
      </div>
    </div>
  )
}
