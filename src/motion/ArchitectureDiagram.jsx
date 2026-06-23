import React from 'react'

// Honest system-architecture diagram of how the projects are built:
// Dashboard → API → Compute engine → Store, with a telemetry/cache return path.
// Connectors animate a flowing dash in the active section accent colour.
const NODES = [
  { x: 24, t: 'Dashboard', s: 'React · Next.js · Recharts' },
  { x: 248, t: 'API', s: 'FastAPI · async' },
  { x: 472, t: 'Compute', s: 'PyTorch · ARIMA · SciPy' },
  { x: 696, t: 'Store', s: 'PostgreSQL · Redis' },
]
const W = 180, H = 92, Y = 96

export default function ArchitectureDiagram({ className = '' }) {
  return (
    <svg viewBox="0 0 900 260" className={className} role="img" aria-label="System architecture: dashboard to API to compute engine to data store">
      <style>{`
        @keyframes flow { to { stroke-dashoffset: -28; } }
        .flow { stroke-dasharray: 6 8; animation: flow 1s linear infinite; }
        @media (prefers-reduced-motion: reduce){ .flow { animation: none; } }
      `}</style>
      {/* forward connectors */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line x1={NODES[i].x + W} y1={Y + H / 2} x2={NODES[i + 1].x} y2={Y + H / 2} stroke="currentColor" strokeOpacity="0.18" strokeWidth="2" />
          <line className="flow" x1={NODES[i].x + W} y1={Y + H / 2} x2={NODES[i + 1].x} y2={Y + H / 2} stroke="var(--section-accent,#7c5cff)" strokeWidth="2" />
        </g>
      ))}
      {/* return path: Store → API (telemetry / cache) */}
      <path d={`M ${NODES[3].x + W / 2} ${Y + H} C ${NODES[3].x} ${Y + H + 70}, ${NODES[1].x + W} ${Y + H + 70}, ${NODES[1].x + W / 2} ${Y + H}`}
        fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2" />
      <path className="flow" d={`M ${NODES[3].x + W / 2} ${Y + H} C ${NODES[3].x} ${Y + H + 70}, ${NODES[1].x + W} ${Y + H + 70}, ${NODES[1].x + W / 2} ${Y + H}`}
        fill="none" stroke="var(--section-accent,#7c5cff)" strokeWidth="2" strokeOpacity="0.7" />
      <text x={(NODES[1].x + NODES[3].x) / 2 + W / 2} y={Y + H + 86} textAnchor="middle" className="font-mono" fill="currentColor" fillOpacity="0.45" fontSize="11">telemetry · cache</text>
      {/* nodes */}
      {NODES.map((n, i) => (
        <g key={n.t}>
          <rect x={n.x} y={Y} width={W} height={H} rx="14" fill="#0e0b1e" stroke="currentColor" strokeOpacity="0.22" />
          <rect x={n.x} y={Y} width={W} height="3" rx="1.5" fill="var(--section-accent,#7c5cff)" />
          <text x={n.x + 18} y={Y + 38} fill="white" fontSize="20" fontWeight="500" className="font-sans-disp">{n.t}</text>
          <text x={n.x + 18} y={Y + 62} fill="white" fillOpacity="0.55" fontSize="11.5" className="font-mono">{n.s}</text>
          <text x={n.x + 18} y={Y - 12} fill="var(--section-accent,#7c5cff)" fontSize="11" className="font-mono">0{i + 1}</text>
        </g>
      ))}
    </svg>
  )
}
