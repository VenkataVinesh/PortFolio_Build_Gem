# Design research and brief: portfolio v2

Branch `redesign-v2`. Written before any build work, then used as the spec.

## How this research was done (read this first)

The build container's network policy denies direct connections to awwwards.com, godly.website,
webflow.com, tympanus.net (Codrops), siteinspire.com, cssdesignawards.com, onepagelove.com,
lapa.ninja and the personal sites themselves (`CONNECT tunnel failed, response 403` from the egress
proxy, and `ENOTFOUND` from the fetch tool). I could not open these sites in a browser from here.

What I could do was search. Every note below comes from search-indexed material: Codrops case
studies and tutorials written by the authors of these sites, Awwwards element and award pages
(titles, tags, dates, jury notes), Awwwards annual-award pages, and a handful of curated roundups.
Where a source did not describe something (most often mobile handling and performance), the
table says **not reported** rather than guessing. Award dates and scores come from Awwwards listing
pages as quoted in search results; I did not see the pages themselves. Treat the notes as a reading
of what these builders say they did, not a hands-on audit.

To let a human verify, every site lists its source.

## 1. Sites studied (31)

Columns: hero / loader / cursor / scroll / project reveal + hover / page transitions / mobile and performance.

### Award-level creative-developer portfolios

| # | Site | What it does well | Source |
|---|------|-------------------|--------|
| 1 | **Stas Bondar '25** (Awwwards; GSAP Site of the Week and Month) | Hero: WebGL. Loader: two transparent spheres carrying a text texture rise, idle, then sink while the hero fades in. Cursor: an "awards cursor" state. Hover: project titles and hero images react with fluid distortion and a velocity-driven chromatic split. Transitions: Barba.js; a staged exit (WebGL background, grid overlay, side text and cursor fade together) then a View Transition API clip-path morph. Mobile/perf: not reported. | Codrops 2025-03-25, 2025-12-02, 2026-05-06 |
| 2 | **Federico Pian 2024** | Nuxt + GSAP + TresJS. Transitions differ by origin and destination page; a dark-mode "switch theme" transition and a projects transition are catalogued as Awwwards elements. Hover details not reported. | Codrops case study 2024-10-02; Awwwards elements |
| 3 | **Joffrey Spitzer** | Astro + GSAP + Lenis + Swup + Three.js. GSAP Flip moves a clicked link into the next page's title position; the project index switches list and grid with Flip. Motion described as subtle, "nothing announces itself". Restraint as a feature. | Codrops 2026-02-18; landing.love |
| 4 | **Gabriel Contassot 2024** (SOTD 7.34) | Minimal design with subtle animation; Astro + Taxi. Transition: one coloured element, its colour chosen by the clicked link, wipes up and away. Proves a single, well-timed curtain beats a complex one. | Codrops 2024-04-24; Awwwards |
| 5 | **Joseph Santamaria 2026** (Awwwards nominee) | Scroll-driven 3D world (Three.js, GSAP, shaders); "navigation as spatial storytelling". Works list uses snap scroll; a 3D WebGL transition between views. | Codrops 2026-04-28; Awwwards elements |
| 6 | **"From Shader Uniforms to Clip-Path Wipes"** portfolio | GSAP drives both shader uniforms and DOM text reveals off one timeline; Lenis scroll; a state machine for a scroll-triggered "next project" morph at the end of each case page. | Codrops 2026-05-06 |
| 7 | **"Sketching the Impossible"** portfolio | No 3D models at all: clickable things start as black-and-white sketches and fill with colour through a shader brush-stroke on hover. Pre-compiles shaders to avoid first-hover stutter. | Codrops 2026-06-11 |
| 8 | **HAOQI.DESIGN** | DOM owns type; one fixed canvas owns glass and image effects. Fixed a one-frame DOM/WebGL lag by running Lenis with `autoRaf: false` inside the same frame loop as rendering. One pointer state drives DOM readouts, camera parallax, rim light and a fluid effect. | Codrops 2026-08-15 |
| 9 | **Juan Mora Romero '26** | Next 16, React 19, Tailwind 4, R3F, GSAP. A chromatic channel split that only kicks in above a scroll-speed threshold and grows with velocity up to a cap; the cursor split lingers briefly after movement. Wind-blown cloth posters on About. A draggable Lab. | Codrops 2026-10-22 |
| 10 | **Trionn** | Next + GSAP (useGSAP) + ScrollTrigger + Three.js + Lenis on `gsap.ticker` + Web Audio. Animations wait for the page transition to finish. Chose raw Three.js over R3F to own one shared render loop. Hero symbol: idle motion, magnetic hover, hold-to-blast. | Codrops 2026-07-15 |
| 11 | **Dennis Snellenberg** (17 SOTD, Developer Award 2022) | Parallax-rich, micro-animations and transitions with GSAP, Barba and Locomotive Scroll. So widely copied there is an Awwwards "Copy Dennis" collection, which says the pattern set (big name, rounded magnetic CTA, curtain transitions) works, and that copying it reads as template. | Awwwards; ResearchMan case page |
| 12 | **Pacôme Pertant** by Louis Bocquet (Developer Award + SOTD, 9 Jun 2026) | Motion-first portfolio for a motion and sound designer; Awwwards catalogues separate desktop, mobile, list-view and video-player elements, i.e. mobile was designed, not shrunk. | Awwwards elements and winners page |
| 13 | **Cathy Dolle** (Developer Award + SOTD, 27 Feb 2026) | Designer and front-end developer; minimalist layout carrying immersive visuals for luxury, fashion and arts work. | Awwwards listing; uiuxshowcase |
| 14 | **Minh Pham** by Hon Tran (SOTD, dev score 7.77) | Designer portfolio built for performance; also FWA of the Day. | hontran.dev case study (self-published) |
| 15 | **Matt Bierman** | Interactive WebGL hero rendered as ASCII 3D; a separate WebGL mouse-interaction element. Type-as-texture is a cheap way to look bespoke. | Awwwards elements |
| 16 | **Meet Vora** | Text-based loading screen, custom cursor and an entry animation that hands off from the loader. | Awwwards element |
| 17 | **NAYA Studio** | Preloader with a countdown and a custom cursor; the count is the brand moment. | Awwwards element |
| 18 | **Ajanwachuku P. portfolio** | Hero is a mouse-drag fluid/smoke WebGL simulation with a preloader in front. | Awwwards element |
| 19 | **Aristide Benoist** (Folio 2021, TM, CRSA, Paul & Henriette) | WebGL wave and shockwave transitions, hover image roll-overs on project lists. Widely re-implemented ("WebGL image interactions inspired by Aristide"). | Dribbble; GitHub derivative |
| 20 | **Bruno Simon folio-2025** | A drivable 3D world; rebuilt for WebGPU with Three.js TSL so it runs on WebGPU when available. Most-cited dev portfolio; aimed at the hiring manager who will remember you, not the skimming recruiter. Mobile fallback not reported. | Awwwards case study; GeekNews; roundups |

### Studio sites (award benchmarks for atmosphere)

| # | Site | What it does well | Source |
|---|------|-------------------|--------|
| 21 | **Lusion v3** (Awwwards Site of the Year + Developer SOTY 2023) | Real-time 3D hero kept inside a rounded framed card with "Scroll to explore", so nav and headline stay readable over the scene. | Web Designer Wall; Awwwards; Codrops 2026-04-13 |
| 22 | **Igloo Inc** (Awwwards Site of the Year + Developer SOTY 2024) | Each project lives inside an ice block grown by a custom crystal-growth algorithm; jury praised an immersive 3D experience that stays easy to navigate by scroll. One idea, executed fully. | Awwwards annual awards; case study |
| 23 | **Uncommon Studio** | SOTD + Developer Award + FWA. | hontran.dev 2026 roundup |
| 24 | **By-Kin** | Four awards including an Awwwards Developer Award; Next.js. | hontran.dev case study |
| 25 | **OHZI Interactive** | SOTD + Developer Award for WebGL work. | roundup cited in search |

### Engineer and ML portfolios (the audience I actually need to convince)

| # | Site | What it does well | Source |
|---|------|-------------------|--------|
| 26 | **Brittany Chiang v4** | Most cited developer portfolio: clean type, tidy structure, built for a recruiter reading fast. Gatsby. | roundups; GitHub v4 repo |
| 27 | **Josh W. Comeau** | "The case for whimsy": thoughtful interactions and smooth organic motion inside readable technical writing; interactive demos inside posts. | talk and course coverage |
| 28 | **Lynn Fisher** (lynnandtonic.com) | Redesigned yearly; the design changes at each breakpoint because her audience resizes windows. Mobile as a designed state. | web.dev; Adobe; usesthis |
| 29 | **Eugene Yan** | ML engineer site: Markdown to Jekyll to GitHub Pages; a prototyping page linking code and demos. Speed and content first. | Engineered.at; Colorlib |
| 30 | **Randal S. Olson** | ML/data scientist; homepage leads with numbered featured work. | Colorlib 2026 |
| 31 | **Nadieh Bremer** | Data-art portfolio (Webby People's Voice): proof that "data" work can be presented as beauty rather than as a chart. | Colorlib 2026 |

Plus the Webflow **"20 CSS Link Effects"** cloneable (css-link-effects.webflow.io, listed on
Made in Webflow): plug-and-play line hover animations, the canonical set being underline wipe in
from the left / out to the right, underline grow from centre, double line, strike-through on hover,
text roll (duplicate glyphs slide up), and arrow nudge. Codrops' LineHoverStyles repo is the
reference implementation linked alongside it.

## 2. Patterns that recur in the best ones

1. **One concept, carried everywhere.** Igloo's ice, Lusion's tumbling shapes, Juan Mora's channel
   split. The winners pick one physical idea and let the hero, hovers and transitions all speak it.
   Sites that stack unrelated effects read as template.
2. **DOM for type, one canvas for atmosphere.** HAOQI, Trionn and Stas Bondar keep text in the DOM
   (accessible, crisp, indexable) and push only atmosphere into WebGL, ideally one shared render
   loop that is paused when off-screen.
3. **Scroll and render in the same frame.** Lenis driven from the GSAP ticker or a manual raf so
   ScrollTrigger and shaders never lag a frame behind the DOM (HAOQI, Trionn).
4. **A loader that is a brand moment and hands off to the hero.** A count, a name or an object;
   the exit *is* the hero entrance (Bondar's spheres, NAYA's countdown, Meet Vora).
5. **Masked line reveals for display type.** Lines slide up from overflow masks with a stagger,
   timed to start the moment the loader leaves. Everyone does this; the craft is in timing and in
   *not* splitting long body copy.
6. **A single, well-timed curtain transition** (Contassot, Bondar's staged exit, Snellenberg).
   Content animations wait for the curtain (Trionn). Simple beats elaborate.
7. **Velocity-aware motion.** Effects scale with scroll or pointer speed and settle at rest
   (Juan Mora's split, Bondar's chromatic hover). Motion that responds feels alive; loops feel canned.
8. **Context cursor.** A small dot plus a lagging ring that becomes a labelled disc ("View",
   "Drag", "Open") over specific targets; hidden on touch.
9. **Big project tiles with real imagery, and a strong "next project" exit** at the end of each
   case page (shader-uniforms portfolio, Federico Pian).
10. **Mobile is designed, not shrunk** (Pacôme Pertant's separate mobile elements, Lynn Fisher):
    lighter effects, native scroll, the same concept in a cheaper form.

And from the engineer sites: recruiters read fast. Big claims must be scannable in seconds, and
honesty about results is itself a differentiator (Brittany Chiang, Eugene Yan).

## 3. Design brief

### Concept: **Spectral**: signal resolving out of noise

My best work is literally about pulling signal out of noise: a chromatic confocal sensor encodes
height as *colour* (each wavelength focuses at a different depth), and the job was to find every
surface peak in a noisy spectrum. TriageMate found 173 real descriptions hiding inside 20,000
tickets. Veltrix reports when there is no edge. The site makes that idea physical, without a single
chart: **everything arrives as noise, and resolves into sharp signal.**

- **Hero:** a full-viewport WebGL field of fine, flowing *spectral filaments*: thin lines of light
  that drift like silk through a dark volume, with a chromatic-dispersion fringe (violet to cyan to
  amber) like light through a prism. The cursor is a **lens**: around it the filaments tighten,
  sharpen and brighten, as if brought into focus. Scrolling pulls the field into depth and dims it.
  It is light and motion, not a plot: no axes, no peaks, no labels.
- **Type over it:** an enormous two-line statement, "Signal / *from noise.*", revealed line by line
  from masks the moment the loader lifts.

### Palette

| Token | Value | Use |
|---|---|---|
| ink | `#060609` | page background (near-black, slightly blue) |
| ink-2 | `#0d0d13` | raised surfaces |
| bone | `#ece8df` | primary text (contrast ~16:1 on ink) |
| mute | `#8f8c99` | secondary text (contrast ~6:1 on ink, passes AA) |
| line | `rgba(236,232,223,0.12)` | hairlines |
| spectrum | `#7c5cff → #22d3ee → #f5b84a` | the dispersion gradient; used only for light (shader, curtain edge, focus states), never as large flat fills |
| per-project accent | from `src/data.js` | tints each project's atmosphere |

### Typography (self-hosted via Fontsource, no third-party font request)

- **Display:** Inter Tight (variable), 500 weight, tracking −0.045em, set huge (up to 17vw).
- **Accent:** Instrument Serif *italic*, mixed into display lines for the "signal" words.
- **Labels and data:** JetBrains Mono, uppercase, wide tracking. Numbers in tabular figures.

### Motion language: *resolve*

- Entrances go from **noisy to sharp**: masked line slides with a short blur-to-sharp, numbers
  *decode* (digits scramble and settle on the true value) rather than counting up.
- Easing: `expo.out` for arrivals, `power4.inOut` for curtains. Durations 0.9–1.3 s for display
  type, 0.6 s for UI.
- Velocity-aware: the hero field and marquee respond to scroll speed and settle at rest.
- Reduced motion: no loader, no curtain, a static frame of the field, instant reveals, numbers
  shown final.

### Signature interactions

1. **Lens cursor.** Dot plus ring; over the hero the field focuses around it; over project tiles it
   becomes a labelled disc ("View"); over the horizontal track, "Drag"; over external links, "Open".
2. **Spectral curtain transition.** On every route change a dark curtain sweeps up with a thin
   dispersion-gradient leading edge, the destination's name set in it; content reveals only after
   it leaves.
3. **Decoding numbers.** Results such as 120/120 and 0.77 FWHM appear as huge type that
   scrambles then resolves. Simulated figures carry a "Simulated" tag next to the number itself.
4. **Preloader** counting 000 to 100 under the name, whose exit is the hero entrance.
5. **Link effects** from the Webflow 20: text roll on navigation, underline wipe on inline links,
   arrow nudge on CTAs; magnetic buttons.

### Structure

- **Home:** hero, availability marquee (velocity-driven), an honesty statement that brightens word
  by word as you scroll, two *stacked full-bleed feature tiles* (TriageMate with its real
  screenshots in parallax; PRECITEC as pure typographic atmosphere around its two real-data
  numbers), a *pinned horizontal track* for the remaining projects, a numbers band, contact.
- **Work:** an index of large rows; a preview (screenshot or atmosphere) follows the cursor.
- **Case pages:** tinted field hero with the title, then short numbered sections (Problem,
  Approach, Results, Outcome, Limits), big numbers, real screenshots where they exist, and a
  full-width "Next project" exit.
- **About, Résumé (EN/FR viewer and downloads kept), 404**, all in the same world.

### Hard constraints carried into the build

No diagrams, bar charts, schematics, architecture stacks or peak illustrations anywhere.
PRECITEC: my parts only, team of 4, no names, simulated numbers labelled, no lab links or images,
"Code private (lab project); details on request". Maintenance Copilot: "In progress", no metrics,
no link. Every number comes from `src/data.js`.

### Budgets

Mobile Lighthouse performance ≥ 85. One WebGL context per page, paused off-screen and in
background tabs, lower resolution on phones, static on reduced motion. No Three.js (raw WebGL,
about 3 kB). Images lazy-loaded with explicit dimensions.
