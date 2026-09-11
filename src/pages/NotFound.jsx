import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="font-sans-disp flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-6 text-center text-white">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/50">404</p>
      <h1 className="max-w-lg text-3xl font-medium leading-tight tracking-tight md:text-5xl">
        That page does not exist.
      </h1>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <a href="#/" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black">
          <ArrowLeft size={15} /> Home
        </a>
        <a href="#/work" className="rounded-full border border-white/25 px-6 py-3 text-sm hover:bg-white/5">
          See the work
        </a>
      </div>
    </div>
  )
}
