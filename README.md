# Portfolio

Personal site for **Venkata Vinesh Kumar Reddy Atluri**, live at
[venkatavinesh.github.io/PortFolio_Build_Gem](https://venkatavinesh.github.io/PortFolio_Build_Gem/).

Machine learning work: time-series forecasting, mathematical optimisation and reinforcement
learning. Each project has its own case study covering the problem, what was built, the
architecture and the outcome.

## Stack

| | |
|---|---|
| Framework | React 19, no TypeScript |
| Build | Vite 8 (Rolldown), base path `/PortFolio_Build_Gem/` |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`, tokens in `src/index.css` |
| Routing | Hand-rolled hash router, ~30 lines in `src/App.jsx` |
| Motion | GSAP + ScrollTrigger, Lenis smooth scroll |
| Background | Raw WebGL fragment shader (domain-warped fBm), no library |
| 3D | Three.js point cloud, lazy-loaded behind an IntersectionObserver |
| Deploy | GitHub Actions to GitHub Pages on push to `main` |

## Running it

```bash
npm install
npm run dev      # http://localhost:5173/PortFolio_Build_Gem/
npm run build    # -> dist/
npm run lint
```

## Layout

```
src/
  App.jsx              hash router: #/ #/work #/about #/resume #/p/<id>
  data.js              ALL site content. Single source of truth.
  theme.js             per-section palettes + the IntersectionObserver that swaps them
  index.css            Tailwind v4 @theme tokens and component recipes
  components/          Shell (page chrome), Nav, Footer, ProjectCard
  pages/               Home, Work, About, Resume, ProjectDetail, NotFound
  motion/              shader, point cloud, reveal/kinetic/cursor primitives
public/
  resume-en.pdf        built from career-update/resume_en.tex
  resume-fr.pdf        built from career-update/resume_fr.tex
```

### Content

Everything the site says lives in [`src/data.js`](src/data.js). Nothing is fetched at runtime
and there is no CMS, so editing that one file changes the whole site.

**The rule for this repo: every claim must trace to code, a README, or a document.** The
metrics on the Veltrix case study come from `docs/FORECAST-EVALUATION.md` in the
[Veltrix repo](https://github.com/VenkataVinesh/Veltrix). Work that has not started is listed
under "Next up" and explicitly labelled *planned, not started*, with no tech-stack claims and no
repository links until there is a repository to link.

### Résumé

The résumé is published in English and French and is switchable at `#/resume`. Both PDFs are
built from LaTeX sources (Jake's Resume format) kept outside this repo in `career-update/`. To
update, rebuild the PDFs and copy them over `public/resume-en.pdf` and `public/resume-fr.pdf`.

## Accessibility and performance

Deliberate choices worth preserving if you edit this:

- Every animation respects `prefers-reduced-motion`, including the shader, which falls back to a
  single static frame instead of a render loop.
- The custom cursor is never the only affordance. `:focus-visible` is styled globally and there
  is a skip link.
- Three.js loads only when its section approaches the viewport, keeping it out of the initial
  bundle.
- The mobile menu is a focus-trapped dialog closed by Escape.
- Decorative layers (shader, grain, cursor, marquee duplicate) are `aria-hidden`.

See [CHANGES.md](CHANGES.md) for the refinement pass that established these.

## Credits

Fonts are Space Grotesk and Instrument Serif (SIL OFL 1.1). Library licences are listed in the
sibling `variants/CREDITS.md`.
