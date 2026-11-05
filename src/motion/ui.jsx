import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, reducedMotion, coarsePointer, onEnter, liteMode } from './core.js'

/* Masked display lines. `trigger="enter"` plays when the page enters (hero),
   otherwise when scrolled into view. Each line: overflow mask + slide + de-blur. */
export function Lines({ lines, as: Tag = 'span', className = '', trigger = 'scroll', delay = 0, stagger = 0.1 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const inner = el.querySelectorAll('[data-line]')
    if (reducedMotion()) return
    // Phones skip the de-blur: animating a filter on display type is a costly repaint there.
    const blur = !liteMode()
    gsap.set(inner, blur ? { yPercent: 115, filter: 'blur(6px)' } : { yPercent: 115 })
    const play = () => gsap.to(inner, { yPercent: 0, ...(blur ? { filter: 'blur(0px)' } : {}), duration: 1.25, ease: 'expo.out', stagger, delay, overwrite: true })
    let cancel = () => {}, st
    if (trigger === 'enter') cancel = onEnter(play)
    else st = ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: play })
    return () => { cancel(); st?.kill(); gsap.killTweensOf(inner) }
  }, [trigger, delay, stagger])
  return (
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask"><span data-line>{l}</span></span>
      ))}
    </Tag>
  )
}

/* Generic reveal: rise + fade + de-blur on scroll (or on page enter). */
export function Reveal({ children, as: Tag = 'div', className = '', y = 36, delay = 0, trigger = 'scroll', stagger = 0, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el || reducedMotion()) return
    const targets = stagger ? el.children : el
    const blur = !liteMode()
    gsap.set(targets, blur ? { y, opacity: 0, filter: 'blur(8px)' } : { y, opacity: 0 })
    const play = () => gsap.to(targets, { y: 0, opacity: 1, ...(blur ? { filter: 'blur(0px)', clearProps: 'filter' } : {}), duration: 1.1, delay, stagger, ease: 'expo.out', overwrite: true })
    let cancel = () => {}, st
    if (trigger === 'enter') cancel = onEnter(play)
    else st = ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: play })
    return () => { cancel(); st?.kill(); gsap.killTweensOf(targets) }
  }, [y, delay, trigger, stagger])
  return <Tag ref={ref} className={className} {...rest}>{children}</Tag>
}

/* Magnetic: the element leans toward the pointer and springs back. */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el || coarsePointer() || reducedMotion()) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => { gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' }) }
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [strength])
  return <span ref={ref} className={`inline-block will-change-transform ${className}`}>{children}</span>
}

/* Text roll label (link effect). Visible text once; the roll copy is a text-shadow. */
export function Roll({ children, className = '' }) {
  return <span className={`roll ${className}`}><span>{children}</span></span>
}

/* Marquee whose speed and direction follow scroll velocity, then settle. */
export function Marquee({ children, className = '', duration = 40 }) {
  const ref = useRef(null)
  useEffect(() => {
    const track = ref.current?.querySelector('[data-track]'); if (!track || reducedMotion()) return
    const tween = gsap.to(track, { xPercent: -50, duration, ease: 'none', repeat: -1 })
    let dir = 1
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity()
        if (v !== 0) dir = v > 0 ? 1 : -1
        const boost = Math.min(Math.abs(v) / 250, 7)
        gsap.to(tween, { timeScale: dir * (1 + boost), duration: 0.25, overwrite: true })
        gsap.to(tween, { timeScale: dir, duration: 1.2, delay: 0.25, ease: 'power2.out' })
      },
    })
    return () => { st.kill(); tween.kill() }
  }, [duration])
  return (
    <div ref={ref} className={`flex overflow-hidden ${className}`}>
      <div data-track className="flex shrink-0 will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}

/* Words brighten one by one as the block scrolls through the viewport. */
export function ScrubWords({ text, className = '', as: Tag = 'p' }) {
  const ref = useRef(null)
  const words = text.split(' ')
  useEffect(() => {
    const el = ref.current; if (!el || reducedMotion()) return
    const ws = el.querySelectorAll('[data-w]')
    // Colour, not opacity: the dim state is the AA-contrast mute tone, so text stays readable.
    const a = gsap.fromTo(ws, { color: '#8f8c99' }, {
      color: '#ece8df', stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.5 },
    })
    return () => { a.scrollTrigger?.kill(); a.kill() }
  }, [text])
  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => <span key={i} data-w>{w}{i < words.length - 1 ? ' ' : ''}</span>)}
    </Tag>
  )
}

/* Decoding number: digits scramble, then settle left to right on the true value.
   The markup always carries the final value (prerender, no-JS, screen readers). */
const DIGITS = '0123456789'
export function Decode({ value, className = '', duration = 1.3 }) {
  const ref = useRef(null)
  useEffect(() => {
    // Mutate the existing text node only, so React's own DOM stays intact.
    const el = ref.current?.firstChild; if (!el || reducedMotion()) return
    const chars = [...value]
    const st = ScrollTrigger.create({
      trigger: ref.current, start: 'top 92%', once: true,
      onEnter: () => {
        const o = { p: 0 }
        gsap.to(o, {
          p: 1, duration, ease: 'power2.out',
          onUpdate: () => {
            const settled = Math.floor(o.p * (chars.length + 2)) - 1
            el.nodeValue = chars.map((c, i) => (/\d/.test(c) && i > settled ? DIGITS[(Math.random() * 10) | 0] : c)).join('')
          },
          onComplete: () => { el.nodeValue = value },
        })
      },
    })
    return () => st.kill()
  }, [value, duration])
  return (
    <span className={className} aria-label={value} role="text">
      <span ref={ref} aria-hidden="true" className="tabular">{value}</span>
    </span>
  )
}

/* Scroll parallax on a single element. */
export function Parallax({ children, speed = 0.15, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el || reducedMotion()) return
    const a = gsap.fromTo(el, { yPercent: speed * 100 }, {
      yPercent: -speed * 100, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    })
    return () => { a.scrollTrigger?.kill(); a.kill() }
  }, [speed])
  return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>
}

/* Image that unmasks on scroll and drifts inside its frame. */
export function RevealImage({ src, alt, className = '', imgClassName = '', width, height, eager = false, ratio }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el || reducedMotion()) return
    const img = el.querySelector('img')
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { clipPath: 'inset(18% 8% 18% 8% round 28px)' }, {
        clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      })
      // Product screenshots (ratio given) keep their edges: a gentle zoom that settles at 1.
      gsap.fromTo(img, ratio ? { scale: 1.08 } : { scale: 1.18, yPercent: -4 }, {
        ...(ratio ? { scale: 1 } : { scale: 1.04, yPercent: 4 }), ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, el)
    return () => ctx.revert()
  }, [ratio])
  return (
    <div ref={ref} className={`overflow-hidden rounded-[20px] ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async"
        className={`h-full w-full object-cover will-change-transform ${imgClassName}`} />
    </div>
  )
}

/* Atmosphere: CSS light for tiles, coloured by the project accent. No WebGL. */
const SECONDARY = ['#7c5cff', '#f5b84a', '#22d3ee', '#fb7185']
export function Atmosphere({ accent = '#7c5cff', className = '', intensity = 1, variant = 0 }) {
  const a = SECONDARY[variant % 4], b = SECONDARY[(variant + 1) % 4]
  const layouts = [
    [['-25%', '-35%'], ['45%', '30%'], ['5%', '55%']],
    [['30%', '-40%'], ['-30%', '25%'], ['50%', '55%']],
    [['-20%', '20%'], ['40%', '-30%'], ['20%', '60%']],
  ][variant % 3]
  const blobs = [
    { c: accent, s: '110%', l: layouts[0][0], t: layouts[0][1], d: '0s' },
    { c: a, s: '80%', l: layouts[1][0], t: layouts[1][1], d: '-6s' },
    { c: b, s: '70%', l: layouts[2][0], t: layouts[2][1], d: '-11s' },
  ]
  return (
    <div aria-hidden="true" className={`atmo ${className}`}>
      {blobs.map((b, i) => (
        <i key={i} style={{ background: `radial-gradient(closest-side, ${b.c}, transparent)`, width: b.s, height: b.s, left: b.l, top: b.t, animationDelay: b.d, opacity: (i === 0 ? 0.6 : i === 1 ? 0.28 : 0.18) * intensity }} />
      ))}
    </div>
  )
}

/* Image that is fetched only when it comes near the viewport. Native lazy-loading
   starts far ahead of the fold on slow connections, which competes with first paint. */
export function LazyImg({ src, srcSet, sizes, alt = '', className = '', width, height, rootMargin = '500px' }) {
  const ref = useRef(null)
  const [near, setNear] = useState(() => typeof IntersectionObserver === 'undefined')
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el || near) return
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setNear(true); io.disconnect() }
    }, { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [near, rootMargin])
  return (
    <img ref={ref} src={near ? src : undefined} srcSet={near ? srcSet : undefined} sizes={sizes} alt={alt}
      width={width} height={height} decoding="async" onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`} />
  )
}
