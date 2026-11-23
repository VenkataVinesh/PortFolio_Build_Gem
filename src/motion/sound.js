/*
  Site sound: one ambient score (generated with ElevenLabs Music) and a soft whoosh
  as each cinematic chapter begins (ElevenLabs Sound Effects).

  Off until the visitor turns it on: browsers block sound without a gesture, and an
  unasked-for soundtrack is the fastest way to lose a reader. The choice is remembered
  per browser. Volume fades in and out rather than cutting.
*/
const BASE = import.meta.env.BASE_URL
const KEY = 'vv-sound'
const SCORE_VOL = 0.35, WHOOSH_VOL = 0.22

let score = null, on = false, fade = 0
const subs = new Set()

const read = () => { try { return localStorage.getItem(KEY) === 'on' } catch { return false } }
const write = (v) => { try { localStorage.setItem(KEY, v ? 'on' : 'off') } catch { /* private mode: not remembered */ } }

function ramp(to, ms, done) {
  cancelAnimationFrame(fade)
  const from = score.volume, t0 = performance.now()
  const step = (now) => {
    const k = Math.min(1, (now - t0) / ms)
    score.volume = from + (to - from) * k
    if (k < 1) fade = requestAnimationFrame(step); else done?.()
  }
  fade = requestAnimationFrame(step)
}

export const soundOn = () => on
export const wantsSound = read
export function onSound(fn) { subs.add(fn); return () => subs.delete(fn) }

export function setSound(next) {
  on = next
  write(next)
  subs.forEach((fn) => fn(next))
  if (next) {
    if (!score) {
      score = new Audio(`${BASE}audio/score.mp3`)
      score.loop = true
      score.preload = 'auto'
    }
    score.volume = 0
    score.play().then(() => ramp(SCORE_VOL, 2500)).catch(() => { on = false; subs.forEach((fn) => fn(false)) })
  } else if (score) {
    ramp(0, 700, () => score.pause())
  }
}

export function whoosh() {
  if (!on || document.hidden) return
  const a = new Audio(`${BASE}audio/whoosh.mp3`)
  a.volume = WHOOSH_VOL
  a.play().catch(() => {})
}

// Leaving the tab pauses the score; coming back resumes it.
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (!on || !score) return
    if (document.hidden) score.pause(); else score.play().catch(() => {})
  })
}
