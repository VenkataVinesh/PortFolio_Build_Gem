import { ArrowLeft } from 'lucide-react'
import Field from '../motion/Field.jsx'
import { Lines, Roll } from '../motion/ui.jsx'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <Field className="absolute inset-0" gain={0.6} />
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-16 md:px-10 md:pb-24">
        <p className="eyebrow mb-6 text-mute">404</p>
        <h1 className="text-hero font-medium leading-[0.88] tracking-[-0.055em]">
          <Lines trigger="enter" lines={['Only noise', <span key="b" className="font-serif-it tracking-[-0.02em]">here.</span>]} />
        </h1>
        <p className="mt-6 text-lg text-bone/70">That page does not exist.</p>
        <a href="#/" className="btn-pill mt-10 inline-flex items-center gap-2 rounded-full border border-bone/40 px-6 py-3.5 text-sm">
          <ArrowLeft size={15} /> <Roll>Back to the index</Roll>
        </a>
      </div>
    </section>
  )
}
