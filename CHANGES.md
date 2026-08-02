# CHANGES — Refinement pass (Aug 2026)

Refinement of the Aurora portfolio: correctness, accessibility, performance,
mobile, SEO, and content positioning. **The visual identity (aurora shader,
kinetic text, magnetic buttons, grain, custom cursor) is unchanged.**
No libraries added or swapped; `data.js` remains the single source of truth.

## Lighthouse (mobile emulation, headless Chrome, local preview build)

| Category       | Before | After |
|----------------|--------|-------|
| Performance    | ~76*   | 82    |
| Accessibility  | 89     | 100   |
| Best Practices | 100    | 100   |
| SEO            | 100    | 100   |

\* "Before" measured after code-splitting already landed; the original build
shipped one 877 kB JS bundle (252 kB gzip) with Three.js in the critical path,
so the true starting score was lower. Initial JS is now 378 kB (126 kB gzip).
Numbers are from a local machine — treat as relative, re-measure on PSI after
deploy.

## P0 — Mobile navigation

- New `MobileMenu` (hamburger → full-screen overlay) below `md`; previously
  there was **no nav at all** on mobile.
- Focus-trapped while open, Escape closes, closes on link selection, restores
  focus to the trigger, locks body scroll, `aria-expanded`/`aria-modal`, and
  the closed panel is `invisible` so its links leave the tab order.
- Styled to match: mono uppercase type, section-accent numbering,
  mix-blend hamburger, GitHub/LinkedIn/résumé shortcuts in the panel.

## P0 — Accessibility

- **Reduced motion** was already handled by Lenis/Reveal/Kinetic/ClipReveal/
  ScrubText/shader/point-cloud; closed the gaps: `CountUp` now renders the
  final value, the marquee pauses, the loader skips without a setState-in-
  effect, and the global reduce rule no longer restart-loops infinite
  animations (`animation-iteration-count: 1`).
- **Contrast:** meaningful text at `white/35–/55` raised to `white/55–/75`
  (card numbers, kind labels, tech chips, highlights, stat labels, footers,
  ArchStack sublabels/flow). Decorative elements untouched.
- **Keyboard:** global `:focus-visible` outline in the per-section accent
  color; skip-to-content link; logical heading order (h4 → h3 fixes).
- **Screen readers:** `aria-hidden` on shader, grain, cursor, point cloud and
  the duplicated marquee row; `aria-label` on icon-only links; descriptive
  `alt` + lazy loading on the profile photo; `nav aria-label="Main"`.
- **Touch:** custom cursor already no-ops on coarse pointers and never hides
  the system cursor; now also `aria-hidden`.

## P0 — Performance

- `PointCloud3D` is `React.lazy` behind an IntersectionObserver wrapper
  (`LazyMount`, 400px rootMargin) → **Three.js (505 kB) is its own chunk**,
  fetched only when the Approach section nears the viewport. Static CSS
  radial-gradient fallback before/without it.
- **Lite mode** (`liteMotion()`): reduced-motion, `Save-Data`, or small
  touch devices get a *static single-frame* shader render (redrawn only when
  the section palette changes — identity preserved, no rAF loop, lower DPR
  cap) and a static point cloud. Protects battery and frame budget.
- **Context loss:** `webglcontextlost` handled on both canvases; a CSS
  gradient approximating the hero palette shows through. Same fallback if
  WebGL is unavailable.
- Google Fonts moved from render-blocking CSS `@import` to
  `preconnect` + `<link>` in `index.html`.
- `npm audit fix`: 3 high-severity dev-tooling advisories → 0.

## P1 — SEO & sharing

- JSON-LD `Person`: name + variants, jobTitle, `alumniOf` Mahindra
  University, `sameAs` GitHub/LinkedIn, image, knowsAbout.
- `og:image`/`twitter:image` now absolute URLs (scrapers don't resolve
  path-relative images); added `rel=canonical` and `theme-color`.
- Title/description verified accurate for the deployed URL.

## P1 — Positioning

- New **"Currently building"** section, driven from `currentlyBuilding` in
  `data.js`: EU AI Act/GDPR RAG assistant (eval harness: hallucination rate,
  retrieval quality, CI gating) and industrial visual defect detection
  (MLflow, drift monitoring, CI/CD). Both explicitly badged *In progress*,
  dashed-border cards, zero completion metrics — honesty constraint intact.
- Hero tagline broadened to end-to-end ML breadth ("…shipping the services
  around it") without dropping the finance/forecasting work.

## P2 — Polish & hygiene

- All 12 lint errors fixed; `npm run lint` is clean.
- Dead files removed: `src/Charts.jsx`, `src/motion/ArchitectureDiagram.jsx`,
  `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`.
- Favicon verified custom (aurora glyph), not a Vite default; social image is
  the real profile photo.
- Legacy `#/aurora` back-links normalized to `#/`; scroll restores to top on
  home ↔ detail route switches while in-page anchors keep native behavior.
- Résumé link verified (200, `application/pdf` on the base path) and opens in
  a new tab.
- Zero console errors/warnings on home and detail routes.

## Verified

- `npm run build` green after every commit; `npm run lint` clean.
- Checked at 375 px (menu, layout), 768 px (breakpoint switch), and desktop.
- Note: deploy (push to `main`) intentionally **not** done — per ground
  rules, review locally first (`npm run preview`), then say go.
