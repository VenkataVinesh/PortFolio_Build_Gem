# Portfolio

Personal site for **Venkata Vinesh Kumar Reddy Atluri**, live at
[venkatavinesh.github.io/PortFolio_Build_Gem](https://venkatavinesh.github.io/PortFolio_Build_Gem/).

ML / AI engineering work: LLM applications, signal processing, time-series forecasting and the
maths underneath. Each project has a case study with the problem, what was built, results set as
large type (real and simulated figures labelled separately), the outcome and the limits.

The visual concept, **Spectral** (signal resolving out of noise), and the research behind it are in
[docs/design-research.md](docs/design-research.md).

## Stack

| | |
|---|---|
| Framework | React 19, no TypeScript |
| Build | Vite 8 (Rolldown), base path `/PortFolio_Build_Gem/` |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`, tokens in `src/index.css` |
| Fonts | Inter Tight, Instrument Serif, JetBrains Mono, self-hosted via Fontsource (no third-party font request) |
| Routing | Hand-rolled hash router in `src/App.jsx`, with a curtain transition between routes |
| Motion | GSAP + ScrollTrigger, Lenis smooth scroll driven from the GSAP ticker |
| Atmosphere | One raw-WebGL fragment shader (`src/motion/Field.jsx`), no Three.js |
| Deploy | GitHub Actions to GitHub Pages on push to `main`, with a headless-Chrome prerender of the home page |

## Running it

```bash
npm install
npm run dev      # http://localhost:5173/PortFolio_Build_Gem/
npm run build    # -> dist/
npm run lint
CHROME_PATH=/path/to/chrome npm run prerender   # what CI runs after the build
```

## Layout

```
index.html             static preloader markup (paints before JS), SEO and JSON-LD
src/
  App.jsx              hash router (#/ #/work #/about #/resume #/p/<id>), route curtain, lazy routes
  data.js              ALL site content. Single source of truth.
  index.css            design tokens, link effects, preloader, atmosphere and grain
  components/          Nav, Footer, Tiles (home project tiles), nav-actions
  pages/               Home, Work, About, Resume, ProjectDetail, NotFound
  motion/
    core.js            Lenis + GSAP setup, reduced-motion/lite detection, page-enter bus
    Field.jsx          the "Spectral" WebGL field (lens cursor, scroll depth, adaptive quality)
    Cursor.jsx         context cursor (link / view / drag / open / next)
    transitions.js     preloader and route curtain
    ui.jsx             masked line reveals, magnetic, marquee, scrub words, decoding numbers,
                       parallax, image reveal, CSS atmosphere
scripts/prerender.mjs  post-build prerender of the home page (fails the deploy on any problem)
public/
  resume-en.pdf        built from career-update/resume_en.tex
  resume-fr.pdf        built from career-update/resume_fr.tex
docs/
  design-research.md   research on 31 portfolio sites and the design brief
  screenshots/         before / after captures
```

### Content

Everything the site says lives in [`src/data.js`](src/data.js). Nothing is fetched at runtime
and there is no CMS, so editing that one file changes the whole site.

**The rule for this repo: every claim must trace to code, a README, or a document.** The
metrics on the Veltrix case study come from `docs/FORECAST-EVALUATION.md` in the
[Veltrix repo](https://github.com/VenkataVinesh/Veltrix). PRECITEC is private lab work: the site
claims only my parts, labels every simulated-benchmark figure "Simulated" next to the number, and
never links the lab repository. Work in progress (Maintenance Copilot) carries an "In progress"
badge, no metrics and no link.

There are deliberately no diagrams or charts on the site; results are set as type.

### Résumé

The résumé is published in English and French and is switchable at `#/resume`.

`public/resume-en.pdf` and `public/resume-fr.pdf` are build artefacts, copied by hand from the private
`career-update` repository (LaTeX, MiKTeX pdfTeX). The deploy workflow does not build them: to change
the résumé, rebuild it in `career-update` and re-copy both PDFs here.

## Accessibility and performance

Deliberate choices worth preserving if you edit this:

- `prefers-reduced-motion`: no preloader, no curtain, no Lenis, a single static frame of the
  shader, content shown in place, numbers shown final.
- The WebGL field starts after first paint, pauses off-screen and in background tabs, lowers its
  resolution when frames run slow, and on phones without a GPU renders tiny and slow.
- Display numbers decode by mutating their own text node only; the markup always carries the
  final value, so prerendered HTML and screen readers get the real number.
- GSAP pins an inner element inside a React-owned wrapper, so the pin-spacer never breaks React's
  DOM on route changes.
- The custom cursor is never the only affordance. `:focus-visible` is styled globally, there is a
  skip link, and keyboard focus inside the pinned horizontal track scrolls the track to the card.
- The mobile menu is a focus-trapped dialog closed by Escape, and inert when closed.
- Secondary routes are code-split and prefetched when idle; the route curtain waits for the chunk,
  so there is never a loading flash.

## Credits

Fonts are Inter Tight, Instrument Serif and JetBrains Mono (SIL OFL 1.1), via Fontsource.
