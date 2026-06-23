import React from 'react'

// Clean layered architecture diagram: each layer is a labelled lane (left rail =
// stage name, right = compact node chips). Data-driven, accent-tinted.
export default function ArchStack({ layers = [], flow, accent = '#7c5cff' }) {
  return (
    <div>
      <div className="space-y-2.5">
        {layers.map((layer, i) => (
          <div key={layer.name} className="grid overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] md:grid-cols-[180px_1fr]">
            {/* left rail */}
            <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3 md:border-b-0 md:border-r"
              style={{ background: `linear-gradient(90deg, ${accent}1f, transparent)` }}>
              <span className="font-mono text-xs tabular-nums" style={{ color: accent }}>{String(i + 1).padStart(2, '0')}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/65">{layer.name}</span>
            </div>
            {/* node chips */}
            <div className="flex flex-wrap gap-2 p-2.5">
              {layer.nodes.map((n) => (
                <div key={n.t} className="flex min-w-[150px] flex-1 items-center gap-2.5 rounded-lg border border-white/10 bg-[#13111f] px-3.5 py-2.5 transition-colors hover:border-white/25">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                  <span className="leading-tight">
                    <span className="block text-sm font-medium text-white">{n.t}</span>
                    {n.s && <span className="block font-mono text-[10px] text-white/45">{n.s}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {flow && (
        <p className="mt-5 text-center font-mono text-[11px] leading-relaxed tracking-wide text-white/50">{flow}</p>
      )}
    </div>
  )
}
