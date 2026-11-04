// Layered architecture diagram: each layer is a labelled lane (left rail = stage
// name, right = node chips). Data-driven and accent-tinted.
export default function ArchStack({ layers = [], flow, accent = '#0f0f12' }) {
  return (
    <div>
      <div className="space-y-2.5">
        {layers.map((layer, i) => (
          <div key={layer.name} className="grid overflow-hidden rounded-2xl border border-line bg-card md:grid-cols-[200px_1fr]">
            <div className="flex items-center gap-2.5 border-b border-line px-4 py-3 md:border-b-0 md:border-r">
              <span className="font-mono text-xs tabular-nums" style={{ color: accent, filter: 'brightness(0.75)' }}>{String(i + 1).padStart(2, '0')}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/70">{layer.name}</span>
            </div>
            <div className="flex flex-wrap gap-2 p-2.5">
              {layer.nodes.map((n) => (
                <div key={n.t} className="flex min-w-[150px] flex-1 items-center gap-2.5 rounded-xl border border-line bg-paper px-3.5 py-2.5">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: accent }} />
                  <span className="leading-tight">
                    <span className="block text-sm font-medium">{n.t}</span>
                    {n.s && <span className="block font-mono text-[10px] text-mute">{n.s}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {flow && <p className="mt-5 text-center font-mono text-[11px] leading-relaxed tracking-wide text-mute">{flow}</p>}
    </div>
  )
}
