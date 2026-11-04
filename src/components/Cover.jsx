// Cover art for each project. Everything here is generated from code, so no
// lab images or data are published. Where a figure is a schematic rather than
// real data, it says so in a caption (see PeaksFigure and the `schematic` flag).

const W = 800
const H = 500

// Small seeded generator so every render draws the same picture.
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const line = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
const gauss = (x, c, s) => Math.exp(-((x - c) ** 2) / (2 * s * s))

function Frame({ bg, children, label }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <rect width={W} height={H} fill={bg} />
      {children}
    </svg>
  )
}

function Grid({ stroke = 'rgba(255,255,255,0.06)' }) {
  const v = [], h = []
  for (let x = 0; x <= W; x += 50) v.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={H} stroke={stroke} />)
  for (let y = 0; y <= H; y += 50) h.push(<line key={`h${y}`} x1={0} y1={y} x2={W} y2={y} stroke={stroke} />)
  return <g>{v}{h}</g>
}

/* Two overlapping surface peaks and their merged sum. A schematic, not lab data. */
export function PeaksArt({ accent = '#fb7185', captions = true }) {
  const base = 400, amp = 250
  const xs = Array.from({ length: 171 }, (_, i) => 70 + i * 4)
  const p1 = xs.map((x) => [x, base - amp * gauss(x, 335, 46)])
  const p2 = xs.map((x) => [x, base - amp * 0.82 * gauss(x, 425, 46)])
  const sum = xs.map((x) => [x, base - amp * Math.min(1.12, gauss(x, 335, 46) + 0.82 * gauss(x, 425, 46))])
  return (
    <Frame bg="#150b10" label="Schematic: two close surfaces produce two overlapping peaks that merge into one">
      <Grid />
      <line x1={60} y1={base} x2={740} y2={base} stroke="rgba(255,255,255,0.35)" />
      <path d={line(p1)} fill="none" stroke="rgba(255,255,255,0.45)" strokeDasharray="5 6" strokeWidth="2" />
      <path d={line(p2)} fill="none" stroke="rgba(255,255,255,0.45)" strokeDasharray="5 6" strokeWidth="2" />
      <path d={`${line(sum)} L740,${base} L70,${base} Z`} fill={accent} opacity="0.18" />
      <path d={line(sum)} fill="none" stroke={accent} strokeWidth="4" strokeLinejoin="round" />
      <circle cx={335} cy={base - amp * 1.02} r="6" fill="#fff" />
      <circle cx={425} cy={base - amp * 0.9} r="6" fill="#fff" />
      <line x1={335} y1={base + 24} x2={425} y2={base + 24} stroke="#fff" strokeWidth="2" />
      <line x1={335} y1={base + 17} x2={335} y2={base + 31} stroke="#fff" strokeWidth="2" />
      <line x1={425} y1={base + 17} x2={425} y2={base + 31} stroke="#fff" strokeWidth="2" />
      {captions && (
        <>
          <text x={380} y={base + 52} textAnchor="middle" fill="#fff" fontFamily="ui-monospace, monospace" fontSize="15">two surfaces, one merged peak</text>
          <text x={60} y={44} fill="rgba(255,255,255,0.55)" fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="2">SCHEMATIC, NOT LAB DATA</text>
        </>
      )}
    </Frame>
  )
}

/* Compressor telemetry with an anomaly window. */
export function TelemetryArt({ accent = '#a78bfa' }) {
  const r = rng(11)
  const ys = (k) => Array.from({ length: 161 }, (_, i) => {
    const x = 40 + i * 4.5
    const anomaly = i > 108 && i < 128 ? (i - 108) * 0.9 : 0
    const y = 120 + k * 105 + Math.sin(i / 7 + k) * 16 + (r() - 0.5) * 9 - anomaly * (k === 1 ? 2.2 : 0.8)
    return [x, y]
  })
  return (
    <Frame bg="#100d1c" label="Telemetry traces with a highlighted anomaly window">
      <Grid />
      <rect x={40 + 108 * 4.5} y={60} width={20 * 4.5} height={380} fill={accent} opacity="0.14" />
      <line x1={40 + 108 * 4.5} y1={60} x2={40 + 108 * 4.5} y2={440} stroke={accent} strokeDasharray="4 5" />
      {[0, 1, 2].map((k) => (
        <path key={k} d={line(ys(k))} fill="none" stroke={k === 1 ? accent : 'rgba(255,255,255,0.55)'} strokeWidth={k === 1 ? 3 : 2} />
      ))}
      <text x={40 + 108 * 4.5 + 6} y={52} fill={accent} fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="2">ANOMALY WINDOW</text>
    </Frame>
  )
}

/* LSTM vs ARIMA forecast fan. */
export function ForecastArt({ accent = '#22d3ee' }) {
  const r = rng(5)
  let v = 280
  const hist = Array.from({ length: 70 }, (_, i) => { v += (r() - 0.48) * 14; return [40 + i * 6.4, v] })
  const [lx, ly] = hist[hist.length - 1]
  const fc = (slope, wob) => Array.from({ length: 36 }, (_, i) => [lx + i * 9, ly + slope * i + Math.sin(i / 3) * wob])
  const a = fc(-1.6, 6), b = fc(-3.4, 12)
  const band = [...b.map(([x, y], i) => [x, y - 4 - i * 1.6]), ...[...b].reverse().map(([x, y], i, arr) => [x, y + 4 + (arr.length - 1 - i) * 1.6])]
  return (
    <Frame bg="#07151c" label="Price history followed by two forecast paths">
      <Grid />
      <path d={`${line(band)} Z`} fill={accent} opacity="0.16" />
      <path d={line(hist)} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" />
      <path d={line(a)} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeDasharray="6 6" />
      <path d={line(b)} fill="none" stroke={accent} strokeWidth="3.5" />
      <line x1={lx} y1={60} x2={lx} y2={440} stroke="rgba(255,255,255,0.3)" strokeDasharray="3 5" />
    </Frame>
  )
}

/* Candles with a signal marker. */
export function CandlesArt({ accent = '#06b6d4' }) {
  const r = rng(21)
  let v = 260
  const candles = Array.from({ length: 44 }, (_, i) => {
    const o = v; v += (r() - 0.5) * 36; const c = v
    return { x: 50 + i * 16, o, c, hi: Math.min(o, c) - r() * 14, lo: Math.max(o, c) + r() * 14 }
  })
  return (
    <Frame bg="#061a1f" label="Candlestick chart">
      <Grid />
      {candles.map((k, i) => (
        <g key={i}>
          <line x1={k.x} y1={k.hi} x2={k.x} y2={k.lo} stroke={k.c < k.o ? accent : 'rgba(255,255,255,0.5)'} />
          <rect x={k.x - 4.5} y={Math.min(k.o, k.c)} width="9" height={Math.max(3, Math.abs(k.c - k.o))} fill={k.c < k.o ? accent : 'rgba(255,255,255,0.5)'} />
        </g>
      ))}
      <rect x={560} y={70} width={170} height={64} rx={10} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
      <text x={576} y={96} fill="rgba(255,255,255,0.65)" fontFamily="ui-monospace, monospace" fontSize="12" letterSpacing="2">SIGNAL</text>
      <text x={576} y={122} fill={accent} fontFamily="ui-monospace, monospace" fontSize="22">votes, not vibes</text>
    </Frame>
  )
}

/* 5x5 GridWorld with a path. */
export function GridArt({ accent = '#818cf8' }) {
  const s = 66, ox = 235, oy = 85
  const path = [[0, 4], [0, 3], [1, 3], [1, 2], [2, 2], [3, 2], [3, 1], [4, 1], [4, 0]]
  return (
    <Frame bg="#13123a" label="A five by five grid world with a learned path">
      {Array.from({ length: 25 }, (_, i) => (
        <rect key={i} x={ox + (i % 5) * s} y={oy + Math.floor(i / 5) * s} width={s - 4} height={s - 4} rx={8} fill="rgba(255,255,255,0.07)" />
      ))}
      <rect x={ox + 3 * s} y={oy + 3 * s} width={s - 4} height={s - 4} rx={8} fill="rgba(251,113,133,0.55)" />
      <rect x={ox + 4 * s} y={oy} width={s - 4} height={s - 4} rx={8} fill="rgba(52,211,153,0.6)" />
      <path d={line(path.map(([c, rr]) => [ox + c * s + s / 2 - 2, oy + rr * s + s / 2 - 2]))} fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={ox + s / 2 - 2} cy={oy + 4 * s + s / 2 - 2} r="9" fill="#fff" />
    </Frame>
  )
}

/* Efficient frontier. */
export function FrontierArt({ accent = '#34d399' }) {
  const r = rng(3)
  const pts = Array.from({ length: 90 }, () => { const x = 140 + r() * 520; const y = 400 - (Math.sqrt((x - 120) / 540) * 280 + r() * 90); return [x, y] })
  const curve = Array.from({ length: 60 }, (_, i) => { const x = 150 + i * 8.6; return [x, 400 - Math.sqrt((x - 120) / 540) * 300 - 6] })
  return (
    <Frame bg="#07201a" label="Efficient frontier with a maximum Sharpe point">
      <Grid />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.2" fill="rgba(255,255,255,0.35)" />)}
      <path d={line(curve)} fill="none" stroke={accent} strokeWidth="4" />
      <circle cx={curve[34][0]} cy={curve[34][1]} r="9" fill="#fff" stroke={accent} strokeWidth="4" />
    </Frame>
  )
}

/* Trend + seasonality. */
export function WavesArt({ accent = '#14b8a6' }) {
  const r = rng(8)
  const mk = (f) => Array.from({ length: 160 }, (_, i) => [40 + i * 4.5, f(i)])
  return (
    <Frame bg="#061d1c" label="Seasonal series with trend and a forecast">
      <Grid />
      <path d={line(mk((i) => 330 - i * 0.8 + Math.sin(i / 5) * 40 + (r() - 0.5) * 8))} fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" />
      <path d={line(mk((i) => 330 - i * 0.8 + Math.sin(i / 5) * 40))} fill="none" stroke={accent} strokeWidth="3.5" />
      <path d={line(mk((i) => 150 + Math.sin(i / 5) * 40))} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4 6" />
    </Frame>
  )
}

/* TriageMate uses its real screenshots on an amber ground. */
function TriageArt({ screenshots = [] }) {
  const [a, b, c] = screenshots
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: 'linear-gradient(135deg,#f59e0b 0%,#ea580c 100%)' }}>
      {c && <img src={c.src} alt={c.alt} loading="lazy" decoding="async" className="absolute right-[4%] top-[12%] w-[46%] rotate-[4deg] rounded-xl shadow-2xl ring-1 ring-black/10" />}
      {b && <img src={b.src} alt={b.alt} loading="lazy" decoding="async" className="absolute left-[30%] top-[22%] w-[46%] -rotate-[2deg] rounded-xl shadow-2xl ring-1 ring-black/10" />}
      {a && <img src={a.src} alt={a.alt} loading="lazy" decoding="async" className="absolute left-[4%] top-[8%] w-[46%] -rotate-[5deg] rounded-xl shadow-2xl ring-1 ring-black/10" />}
    </div>
  )
}

const ART = {
  precitec: PeaksArt,
  'maintenance-copilot': TelemetryArt,
  asset: ForecastArt,
  veltrix: CandlesArt,
  rl: GridArt,
  portfolio: FrontierArt,
  weather: WavesArt,
}

export default function Cover({ project }) {
  if (project.id === 'triagemate') return <TriageArt screenshots={project.screenshots} />
  const Art = ART[project.id]
  return Art ? <Art accent={project.accent} /> : null
}
