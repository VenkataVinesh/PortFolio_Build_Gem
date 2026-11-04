import { gsap, reducedMotion, setEntered, lockScroll, liteMode } from './core.js'

/*
  First-load preloader. The markup is static in index.html (outside #root) so it
  paints before any JS; this drives it: count 000 -> 100 (held until fonts are
  ready), then the name slides out and the panel wipes up, which is the hero's cue.
*/
let loaderStarted = false
export function runLoader() {
  if (loaderStarted) return
  loaderStarted = true
  const el = document.getElementById('loader')
  if (!el) { setEntered(true); return }
  if (reducedMotion()) { el.remove(); setEntered(true); return }

  lockScroll(true)
  const count = el.querySelector('.ld-count')
  const bar = el.querySelector('.ld-bar')
  const name = el.querySelector('.ld-name span')
  const meta = el.querySelector('.ld-meta')
  el.style.animation = 'none' // JS is alive; drop the CSS safety net

  const obj = { v: 0 }
  const fonts = document.fonts?.ready ?? Promise.resolve()
  let finished = false
  const finish = () => {
    if (finished) return
    finished = true
    const tl = gsap.timeline({ onComplete: () => { el.remove(); lockScroll(false) } })
    tl.to([name, meta, count], { yPercent: -110, opacity: 0, duration: 0.6, ease: 'power3.in', stagger: 0.04 })
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 1.0, ease: 'power4.inOut' }, '-=0.2')
      .add(() => setEntered(true), '-=0.65')
  }

  gsap.set(el, { clipPath: 'inset(0 0 0% 0)' })
  gsap.from(name, { yPercent: 110, duration: 0.9, ease: 'expo.out' })
  const tl = gsap.to(obj, {
    v: 100, duration: liteMode() ? 0.8 : 1.5, ease: 'power2.inOut',
    onUpdate: () => {
      count.textContent = String(Math.round(obj.v)).padStart(3, '0')
      bar.style.transform = `scaleX(${obj.v / 100})`
    },
  })
  Promise.all([fonts, new Promise((r) => tl.eventCallback('onComplete', r))]).then(finish)
  // Background tabs pause rAF; never leave the site locked behind the loader.
  setTimeout(() => { tl.progress(1); finish() }, 5000)
}

/*
  Spectral curtain between routes: a panel rises from below with a dispersion
  edge and the destination's name, the route swaps underneath, then it leaves.
*/
export function curtainCover(curtain, title) {
  return new Promise((resolve) => {
    if (!curtain || reducedMotion()) { resolve(); return }
    setEntered(false)
    const t = curtain.querySelector('[data-curtain-title]')
    if (t) t.textContent = title || ''
    gsap.killTweensOf(curtain)
    gsap.timeline({ onComplete: resolve })
      .set(curtain, { display: 'flex', yPercent: 100 })
      .set(t, { yPercent: 120 })
      .to(curtain, { yPercent: 0, duration: 0.75, ease: 'power4.inOut' })
      .to(t, { yPercent: 0, duration: 0.6, ease: 'expo.out' }, '-=0.3')
  })
}

export function curtainReveal(curtain) {
  if (!curtain || reducedMotion()) { setEntered(true); return }
  const t = curtain.querySelector('[data-curtain-title]')
  gsap.timeline({ onComplete: () => gsap.set(curtain, { display: 'none' }) })
    .to(t, { yPercent: -120, duration: 0.45, ease: 'power3.in' }, 0.05)
    .to(curtain, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, 0.2)
    .add(() => setEntered(true), 0.55)
}
