import { useEffect, useRef, useState } from 'react'

/*
  Small animated line drawings, one per project idea. They are motifs, not data:
  every shape is generated from a fixed seed, so nothing here claims a result.
  Lines draw on when the glyph scrolls into view; a few parts keep moving gently.
*/

const W = 400, H = 220
const rng = (s) => () => (s = (s * 16807) % 2147483647) / 2147483647
const P = (pts) => 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')
const walk = (n, seed, vol, start = H / 2) => {
  const r = rng(seed); let y = start
  return Array.from({ length: n }, (_, i) => { y = Math.max(24, Math.min(H - 24, y + (r() - 0.5) * vol)); return [(i * W) / (n - 1), y] })
}
const gauss = (x, c, s) => Math.exp(-0.5 * ((x - c) / s) ** 2)

function Band({ accent }) {
  // A forecast with its interval: history, then a widening band.
  const pts = walk(90, 11, 14, 120)
  const cut = 62
  const hist = pts.slice(0, cut + 1)
  const fc = pts.slice(cut)
  const up = fc.map(([x, y], i) => [x, y - 10 - i * 1.6]), lo = fc.map(([x, y], i) => [x, y + 10 + i * 1.6])
  return (
    <>
      <path d={P(up) + ' L' + P(lo.slice().reverse()).slice(1) + ' Z'} fill={accent} fillOpacity="0.16" className="glyph-fade" />
      <path d={P(up)} stroke={accent} strokeOpacity="0.5" strokeDasharray="3 5" className="glyph-fade" />
      <path d={P(lo)} stroke={accent} strokeOpacity="0.5" strokeDasharray="3 5" className="glyph-fade" />
      <path d={P(hist)} pathLength="1" className="glyph-draw" stroke="#ece8df" strokeWidth="1.6" />
      <path d={P(fc)} pathLength="1" className="glyph-draw glyph-d2" stroke={accent} strokeWidth="1.8" />
      <line x1={pts[cut][0]} x2={pts[cut][0]} y1="14" y2={H - 14} stroke="#ece8df" strokeOpacity="0.25" />
    </>
  )
}

function NoiseFloor({ accent }) {
  const r = rng(5)
  const pts = Array.from({ length: 120 }, (_, i) => { const x = (i * W) / 119; return [x, 110 + Math.sin(i / 9) * 38 + (r() - 0.5) * 26] })
  const smooth = Array.from({ length: 60 }, (_, i) => { const x = (i * W) / 59; return [x, 110 + Math.sin((i * 2) / 9) * 38] })
  return (
    <>
      <path d={P(smooth.map(([x, y]) => [x, y - 14])) + ' L' + P(smooth.map(([x, y]) => [x, y + 14]).reverse()).slice(1) + ' Z'} fill={accent} fillOpacity="0.14" className="glyph-fade" />
      <path d={P(pts)} pathLength="1" className="glyph-draw" stroke="#ece8df" strokeOpacity="0.55" strokeWidth="1.1" />
      <path d={P(smooth)} pathLength="1" className="glyph-draw glyph-d2" stroke={accent} strokeWidth="2" />
    </>
  )
}

function Frontier({ accent }) {
  const r = rng(3)
  const front = Array.from({ length: 40 }, (_, i) => { const t = i / 39; return [60 + t * 300, 190 - Math.sqrt(t) * 150] })
  const dots = Array.from({ length: 70 }, () => { const t = r(); const [x, y] = [60 + t * 300, 190 - Math.sqrt(t) * 150]; return [x + r() * 40, y + 8 + r() * 70] })
  const best = front[14]
  return (
    <>
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={Math.min(y, H - 8)} r="1.8" fill="#ece8df" fillOpacity="0.35" className="glyph-fade" />)}
      <line x1="20" y1="205" x2={best[0] + (best[0] - 20) * 0.6} y2={best[1] - (205 - best[1]) * 0.6} stroke={accent} strokeOpacity="0.6" strokeDasharray="4 5" className="glyph-fade" />
      <path d={P(front)} pathLength="1" className="glyph-draw" stroke={accent} strokeWidth="2" />
      <circle cx={best[0]} cy={best[1]} r="5" fill={accent} />
      <circle cx={best[0]} cy={best[1]} r="5" fill="none" stroke={accent} className="glyph-ping" />
    </>
  )
}

function GridWorld({ accent }) {
  const cols = 8, rows = 4, s = 44, ox = (W - cols * s) / 2, oy = (H - rows * s) / 2
  const route = [[0, 3], [1, 3], [1, 2], [2, 2], [3, 2], [3, 1], [4, 1], [5, 1], [5, 0], [6, 0], [7, 0]]
  const c = ([i, j]) => [ox + i * s + s / 2, oy + j * s + s / 2]
  const walls = [[2, 3], [4, 2], [4, 3], [6, 1], [2, 0]]
  return (
    <>
      {Array.from({ length: cols * rows }, (_, k) => {
        const i = k % cols, j = (k / cols) | 0
        const wall = walls.some(([a, b]) => a === i && b === j)
        return <rect key={k} x={ox + i * s + 2} y={oy + j * s + 2} width={s - 4} height={s - 4} rx="6"
          fill={wall ? '#ece8df' : 'none'} fillOpacity={wall ? 0.08 : 0} stroke="#ece8df" strokeOpacity="0.14" className="glyph-fade" />
      })}
      <rect x={ox + 7 * s + 2} y={oy + 2} width={s - 4} height={s - 4} rx="6" fill={accent} opacity="0.35" className="glyph-ping-soft" />
      <path d={P(route.map(c))} pathLength="1" className="glyph-draw" stroke={accent} strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx={c(route[0])[0]} cy={c(route[0])[1]} r="5" fill="#ece8df" />
    </>
  )
}

function Telemetry({ accent }) {
  const lines = [0, 1, 2].map((k) => walk(80, 21 + k * 7, 9, 50 + k * 60))
  const spikeAt = 52
  const l1 = lines[1].map(([x, y], i) => [x, y - 46 * gauss(i, spikeAt, 1.6)])
  return (
    <>
      {[lines[0], l1, lines[2]].map((pts, k) => (
        <path key={k} d={P(pts)} pathLength="1" className={`glyph-draw ${k ? 'glyph-d2' : ''}`} stroke={k === 1 ? accent : '#ece8df'} strokeOpacity={k === 1 ? 1 : 0.45} strokeWidth={k === 1 ? 1.8 : 1.1} />
      ))}
      <circle cx={l1[spikeAt][0]} cy={l1[spikeAt][1]} r="9" fill="none" stroke={accent} className="glyph-ping" />
      <rect x="0" y="10" width="2" height={H - 20} fill={accent} opacity="0.7" className="glyph-scan" />
    </>
  )
}

function Peaks({ accent }) {
  // Two narrow peaks on a spectrum: the PRECITEC idea, as a line.
  const pts = Array.from({ length: 160 }, (_, i) => { const x = (i * W) / 159; return [x, 190 - 120 * gauss(x, 150, 12) - 100 * gauss(x, 250, 12) - Math.sin(i * 1.7) * 1.5] })
  return (
    <>
      <defs>
        <linearGradient id="glyph-spec" x1="0" x2="1">
          <stop offset="0" stopColor="#7c5cff" /><stop offset="0.5" stopColor="#22d3ee" /><stop offset="1" stopColor="#f5b84a" />
        </linearGradient>
      </defs>
      <path d={P(pts) + ` L${W} ${H} L0 ${H} Z`} fill="url(#glyph-spec)" fillOpacity="0.12" className="glyph-fade" />
      <path d={P(pts)} pathLength="1" className="glyph-draw glyph-glow" stroke="url(#glyph-spec)" strokeWidth="2.4" />
      <circle cx="150" cy="70" r="6" fill="none" stroke={accent} className="glyph-ping" />
      <circle cx="250" cy="90" r="6" fill="none" stroke={accent} className="glyph-ping glyph-d2" />
    </>
  )
}

const KINDS = { band: Band, noise: NoiseFloor, frontier: Frontier, grid: GridWorld, telemetry: Telemetry, peaks: Peaks }

export default function Glyph({ kind, accent = '#7c5cff', className = '' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const Kind = KINDS[kind]
  if (!Kind) return null
  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" fill="none" strokeLinecap="round"
      className={`glyph ${inView ? 'is-in' : ''} ${className}`}>
      <Kind accent={accent} />
    </svg>
  )
}
