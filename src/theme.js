import { useEffect, useRef } from 'react'

// Per-section background palettes (RGB 0-1 for the shader, plus the CSS accent
// that drives --section-accent). Scrolling lerps the shader between them.
export const THEMES = {
  hero:         { a: [0.30, 0.17, 0.66], b: [0.10, 0.55, 0.80], css: '#7c5cff' },
  work:         { a: [0.05, 0.42, 0.55], b: [0.10, 0.66, 0.72], css: '#22d3ee' },
  approach:     { a: [0.46, 0.12, 0.62], b: [0.80, 0.24, 0.64], css: '#d946ef' },
  architecture: { a: [0.09, 0.30, 0.46], b: [0.14, 0.55, 0.70], css: '#38bdf8' },
  about:        { a: [0.44, 0.22, 0.05], b: [0.96, 0.64, 0.22], css: '#f59e0b' },
  leadership:   { a: [0.09, 0.40, 0.34], b: [0.20, 0.64, 0.46], css: '#34d399' },
  contact:      { a: [0.44, 0.19, 0.56], b: [0.88, 0.40, 0.50], css: '#fb7185' },
}

export const DEFAULT_TINT = THEMES.hero

/**
 * Drives the background palette from whichever [data-theme] section is centred
 * in the viewport. Returns the ref to hand to <ShaderGradient>.
 *
 * `initial` lets a route (a project page, say) start from its own palette
 * instead of the hero violet.
 */
export function useSectionTheme(initial = DEFAULT_TINT) {
  const tintRef = useRef(initial)

  useEffect(() => {
    document.documentElement.style.setProperty('--section-accent', initial.css || THEMES.hero.css)

    const els = document.querySelectorAll('[data-theme]')
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const t = THEMES[e.target.dataset.theme]
          if (e.isIntersecting && t) {
            tintRef.current = t
            document.documentElement.style.setProperty('--section-accent', t.css)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // `initial` is a module-level constant per route, not reactive state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return tintRef
}
