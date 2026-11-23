import { useEffect, useState } from 'react'
import { soundOn, setSound, onSound, wantsSound } from '../motion/sound.js'

/*
  Sound on/off. Four bars that move while the score plays and lie flat when muted.
  A visitor who turned sound on last time gets it back on their first interaction
  (browsers need a gesture before audio can start).
*/
export default function SoundToggle({ className = '' }) {
  const [on, setOn] = useState(soundOn)

  useEffect(() => {
    const off = onSound(setOn)
    if (!soundOn() && wantsSound()) {
      const resume = () => { if (!soundOn()) setSound(true) }
      window.addEventListener('pointerdown', resume, { once: true })
      window.addEventListener('keydown', resume, { once: true })
      return () => { off(); window.removeEventListener('pointerdown', resume); window.removeEventListener('keydown', resume) }
    }
    return off
  }, [])

  return (
    <button type="button" aria-pressed={on} aria-label={on ? 'Turn sound off' : 'Turn sound on'}
      onClick={() => setSound(!on)}
      className={`group flex h-11 items-center gap-2.5 rounded-full border border-line bg-ink/40 px-4 backdrop-blur transition-colors hover:border-bone/40 ${className}`}>
      <span aria-hidden="true" className="flex h-3.5 items-end gap-[3px]">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`sound-bar w-[2px] rounded-full bg-bone ${on ? 'is-on' : ''}`} style={{ animationDelay: `${i * -0.27}s` }} />
        ))}
      </span>
      <span className="eyebrow hidden text-bone/80 lg:inline">{on ? 'Sound on' : 'Sound'}</span>
    </button>
  )
}
