import { Cursor } from '../motion/ui.jsx'
import { ScrollProgress } from '../motion/extras.jsx'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

/** Page chrome shared by every route: cursor, scroll indicator, nav, footer. */
export default function Shell({ current, children, footer = true }) {
  return (
    <div className="font-sans-disp relative min-h-screen bg-paper text-ink selection:bg-ink selection:text-paper">
      <a
        href="#main"
        className="sr-only z-[2001] rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <ScrollProgress color="#0f0f12" />
      <Cursor />
      <Nav current={current} />
      <main id="main">{children}</main>
      {footer && <Footer />}
    </div>
  )
}
