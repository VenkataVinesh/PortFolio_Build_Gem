import React from 'react'

// Lightweight, dependency-free SVG motifs derived from the real project domains.
// Used as design elements across variants (especially "Signal").

export function Forecast({ accent = '#22d3ee', className = '' }) {
  return (
    <svg viewBox="0 0 320 160" className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`fc-${accent}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* history */}
      <path d="M0 110 L40 96 L80 104 L120 70 L160 84" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.8" />
      {/* forecast cone */}
      <path d="M160 84 L240 52 L320 36 L320 120 L240 104 L160 84 Z" fill={`url(#fc-${accent})`} />
      <path d="M160 84 L240 78 L320 70" fill="none" stroke={accent} strokeWidth="2.5" strokeDasharray="5 4" />
      <line x1="160" y1="0" x2="160" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />
    </svg>
  )
}

export function Frontier({ accent = '#34d399', className = '' }) {
  return (
    <svg viewBox="0 0 320 160" className={className}>
      <line x1="34" y1="140" x2="320" y2="140" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="12" x2="34" y2="140" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M34 140 Q120 36 320 26" fill="none" stroke={accent} strokeWidth="2.5" />
      <path d="M34 140 Q100 70 320 60" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
      <circle cx="150" cy="44" r="4.5" fill={accent} />
      <circle cx="150" cy="44" r="9" fill="none" stroke={accent} strokeWidth="1" opacity="0.6" />
    </svg>
  )
}

export function Decompose({ accent = '#14b8a6', className = '' }) {
  return (
    <svg viewBox="0 0 320 160" className={className}>
      <path d="M0 40 L60 36 L120 30 L180 24 L240 20 L320 14" fill="none" stroke={accent} strokeWidth="2" />
      <path d="M0 84 Q26 64 52 84 T104 84 T156 84 T208 84 T260 84 T320 84" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      <path d="M0 132 L14 126 L28 134 L42 128 L56 130 L70 124 L84 134 L98 127 L112 133 L126 125 L140 134 L154 128 L168 131 L182 124 L196 134 L210 127 L224 133 L238 126 L252 134 L266 128 L280 131 L294 124 L308 133 L320 128" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

export function GridWorld({ accent = '#818cf8', className = '' }) {
  const blocked = new Set(['1-1', '2-2', '3-1'])
  return (
    <svg viewBox="0 0 160 160" className={className}>
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 5 }).map((_, c) => {
          let fill = 'transparent'
          if (r === 0 && c === 0) fill = `${accent}33`
          if (r === 4 && c === 4) fill = '#ef444433'
          if (blocked.has(`${r}-${c}`)) fill = 'currentColor'
          return (
            <rect key={`${r}-${c}`} x={c * 30 + 5} y={r * 30 + 5} width="28" height="28" rx="3"
              fill={fill} fillOpacity={blocked.has(`${r}-${c}`) ? 0.15 : 1}
              stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
          )
        })
      )}
      <path d="M19 19 L49 19 L49 49 L79 49 L79 79 L109 79 L109 109 L139 109 L139 139"
        fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
    </svg>
  )
}

const MOTIF = { forecast: Forecast, frontier: Frontier, decompose: Decompose, grid: GridWorld }
export function Motif({ name, ...props }) {
  const C = MOTIF[name] || Forecast
  return <C {...props} />
}
