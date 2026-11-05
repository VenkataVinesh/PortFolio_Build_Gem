import { useEffect, useState } from 'react'
import { ArrowUpRight, Download } from 'lucide-react'
import { profile, resumes } from '../data.js'
import { Reveal, Lines, Roll, Magnetic } from '../motion/ui.jsx'

const STORE_KEY = 'resume-lang'

// Remembering the chosen language is a per-viewer convenience; storage can throw.
function readStoredLang() {
  try {
    const v = localStorage.getItem(STORE_KEY)
    return resumes.some((r) => r.lang === v) ? v : 'en'
  } catch {
    return 'en'
  }
}

export default function Resume() {
  const [lang, setLang] = useState(readStoredLang)
  const active = resumes.find((r) => r.lang === lang) ?? resumes[0]

  useEffect(() => {
    try { localStorage.setItem(STORE_KEY, lang) } catch { /* storage unavailable */ }
  }, [lang])

  return (
    <div>
      <section className="mx-auto max-w-[1600px] px-5 pb-12 pt-36 md:px-10 md:pt-48">
        <p className="eyebrow mb-6 text-mute">Résumé</p>
        <h1 className="text-hero font-medium leading-[0.86] tracking-[-0.055em]">
          <Lines trigger="enter" lines={['One page,', <span key="i" className="font-serif-it tracking-[-0.02em]">two languages.</span>]} />
        </h1>
        <Reveal trigger="enter" delay={0.3}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/70">
            Read it here or download it. The French version is a full translation, not a machine pass over the English one.
          </p>
          <p className="mt-6 flex items-center gap-2.5 text-bone/85"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400" />{profile.seeking.headline} {profile.seeking.where}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pb-32 md:px-10">
        <Reveal>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div role="tablist" aria-label="Résumé language" className="inline-flex rounded-full border border-line bg-ink-2 p-1">
              {resumes.map((r) => {
                const selected = r.lang === lang
                return (
                  <button
                    key={r.lang}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="resume-viewer"
                    onClick={() => setLang(r.lang)}
                    className={`rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                      selected ? 'bg-bone text-ink' : 'text-bone/70 hover:text-bone'
                    }`}
                  >
                    {r.label}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <Magnetic><a href={active.file} download={active.download} className="inline-flex items-center gap-2 rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink">
                <Download size={15} /> <Roll>Download PDF</Roll>
              </a></Magnetic>
              <Magnetic><a data-cursor="open" href={active.file} target="_blank" rel="noreferrer" className="btn-pill inline-flex items-center gap-2 rounded-full border border-bone/40 px-6 py-3 text-sm">
                <Roll>Open in new tab</Roll> <ArrowUpRight size={15} className="arrow-nudge" />
              </a></Magnetic>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div id="resume-viewer" role="tabpanel" aria-label={`Résumé, ${active.label}`} className="hidden overflow-hidden rounded-[22px] border border-line bg-ink-2 p-2 md:block">
            <object
              key={active.file}
              data={active.file}
              type="application/pdf"
              aria-label={`Résumé of ${profile.name}, ${active.label}`}
              className="h-[min(1100px,140vh)] w-full rounded-[16px] bg-white"
            >
              <p className="p-8 text-sm text-ink">
                Your browser cannot display the PDF inline.{' '}
                <a href={active.file} className="underline" target="_blank" rel="noreferrer">Open it in a new tab</a>.
              </p>
            </object>
          </div>

          <div className="rounded-[18px] border border-line p-6 md:hidden">
            <p className="text-sm leading-relaxed text-bone/80">
              PDFs do not preview reliably on small screens. Use the buttons above to download the {active.label} version or open it in a new tab.
            </p>
          </div>
        </Reveal>

        <p className="mt-6 font-mono text-[11px] text-mute">{profile.emailAlt} · {profile.email} · {profile.location}</p>
      </section>
    </div>
  )
}
