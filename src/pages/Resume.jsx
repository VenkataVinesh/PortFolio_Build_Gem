import { useEffect, useState } from 'react'
import { ArrowUpRight, Download } from 'lucide-react'
import { profile, resumes } from '../data.js'
import { Reveal, Kinetic } from '../motion/ui.jsx'
import { THEMES, useSectionTheme } from '../theme.js'
import Shell from '../components/Shell.jsx'

const STORE_KEY = 'resume-lang'

// Remembering the chosen language is a per-viewer convenience, so localStorage
// is the right home for it. It can throw in private modes, hence the guards.
function readStoredLang() {
  try {
    const v = localStorage.getItem(STORE_KEY)
    return resumes.some((r) => r.lang === v) ? v : 'en'
  } catch {
    return 'en'
  }
}

export default function Resume() {
  const tintRef = useSectionTheme(THEMES.contact)
  const [lang, setLang] = useState(readStoredLang)
  const active = resumes.find((r) => r.lang === lang) ?? resumes[0]

  useEffect(() => {
    try { localStorage.setItem(STORE_KEY, lang) } catch { /* storage unavailable */ }
  }, [lang])

  return (
    <Shell tintRef={tintRef} current="resume" veil="heavy">
      <section data-theme="contact" className="mx-auto max-w-6xl px-6 pb-12 pt-36 md:pt-44">
        <Reveal><p className="section-label">Résumé</p></Reveal>
        <h1 className="mt-5 text-display font-medium leading-[0.95] tracking-tight">
          <Kinetic lines={['One page,', <span key="i" className="font-serif-it text-white/85">two languages.</span>]} start="top 95%" />
        </h1>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Read it here or download it. The French version is a full translation, not a machine pass over the
            English one.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Language switch */}
            <div
              role="tablist"
              aria-label="Résumé language"
              className="inline-flex rounded-full border border-white/20 bg-panel/70 p-1 backdrop-blur"
            >
              {resumes.map((r) => {
                const selected = r.lang === lang
                return (
                  <button
                    key={r.lang}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="resume-viewer"
                    data-cursor
                    onClick={() => setLang(r.lang)}
                    className={`rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                      selected ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                data-cursor
                href={active.file}
                download={active.download}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black"
              >
                <Download size={15} /> Download PDF
              </a>
              <a
                data-cursor
                href={active.file}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm hover:bg-white/5"
              >
                Open in new tab <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Viewer. Hidden below md, where embedded PDF rendering is unreliable. */}
        <Reveal>
          <div
            id="resume-viewer"
            role="tabpanel"
            aria-label={`Résumé, ${active.label}`}
            className="panel hidden overflow-hidden p-2 md:block"
          >
            <object
              key={active.file}
              data={active.file}
              type="application/pdf"
              aria-label={`Résumé of ${profile.name}, ${active.label}`}
              className="h-[min(1100px,140vh)] w-full rounded-[1rem] bg-white/95"
            >
              <p className="p-8 text-sm text-white/75">
                Your browser cannot display the PDF inline.{' '}
                <a href={active.file} className="underline" target="_blank" rel="noreferrer">Open it in a new tab</a>.
              </p>
            </object>
          </div>

          {/* Mobile fallback */}
          <div className="panel p-7 md:hidden">
            <p className="text-sm leading-relaxed text-white/80">
              PDFs do not preview reliably on small screens. Use the buttons above to download the{' '}
              {active.label} version or open it in a new tab.
            </p>
          </div>
        </Reveal>

        <p className="mt-6 font-mono text-[11px] text-white/50">
          {profile.email} · {profile.location}
        </p>
      </section>
    </Shell>
  )
}
