import { useEffect, useRef } from 'react'
import { getLenis, reducedMotion, coarsePointer, filmOnScreen } from './core.js'

/*
  Lumen: a live layer of drifting light over the film, so the scene never freezes when
  the scroll stops. Glowing motes at three depths, in the film's violet, cyan and amber,
  drift and twinkle on their own, part around the pointer, and rush past (nearer ones
  faster) when you scroll. One raw-WebGL point shader, additive blending, no library.
  Runs only while on screen and in a visible tab; off for reduced motion.
  `yieldToFilm`: the site-wide copy goes dark while a pinned film fills the screen
  (the film has its own), so two light layers never run at once.
*/

const VERT = `
attribute vec3 a_p;      // x, y in 0..1, z = depth (0 near, 1 far)
attribute float a_s;     // seed
uniform float u_t, u_scroll, u_vel, u_dpr, u_asp;
uniform vec2 u_mouse;
varying float v_s, v_a, v_z;
void main(){
  float z = a_p.z, near = 1.0 - z;
  vec2 p = a_p.xy;
  // drift: slow wander, nearer motes wander more
  p += vec2(sin(u_t * (0.05 + a_s * 0.07) + a_s * 40.0), cos(u_t * (0.04 + a_s * 0.05) + a_s * 17.0)) * (0.02 + 0.05 * near);
  // scroll parallax: rise with the page, nearer faster; wrap
  p.y = fract(p.y + u_scroll * (0.15 + 0.85 * near));
  p.x = fract(p.x + u_t * 0.004 * (0.5 + a_s));
  // pointer: motes part around the cursor
  vec2 d = (p - u_mouse) * vec2(u_asp, 1.0);
  float f = exp(-dot(d, d) * 18.0) * near;
  p += normalize(d + 1e-4) / vec2(u_asp, 1.0) * f * 0.06;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
  float tw = 0.55 + 0.45 * sin(u_t * (0.6 + a_s * 1.8) + a_s * 90.0);
  v_a = tw * (0.25 + 0.75 * near) * (1.0 + u_vel * 1.5);
  gl_PointSize = (2.0 + 14.0 * near * near * near) * u_dpr * (1.0 + u_vel * 0.8);
  v_s = a_s; v_z = z;
}`

const FRAG = `
precision mediump float;
varying float v_s, v_a, v_z;
vec3 spectrum(float x){
  vec3 v = vec3(0.486, 0.361, 1.0), c = vec3(0.133, 0.827, 0.933), a = vec3(0.961, 0.722, 0.29);
  return x < 0.5 ? mix(v, c, x * 2.0) : mix(c, a, x * 2.0 - 1.0);
}
void main(){
  vec2 q = gl_PointCoord - 0.5;
  float r = length(q) * 2.0;
  float core = smoothstep(1.0, 0.0, r);
  float glow = core * core + 0.6 * smoothstep(0.35, 0.0, r);
  vec3 col = mix(spectrum(v_s), vec3(1.0), 0.35 * glow);
  float a = glow * v_a * 1.6;
  gl_FragColor = vec4(col * a, a); // premultiplied: transparent outside the glow
}`

export default function Lumen({ className = '', density = 1, yieldToFilm = false }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || reducedMotion()) return
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false })
    if (!gl) return

    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s }
    const prog = gl.createProgram()
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const N = Math.round((coarsePointer() ? 260 : 720) * density)
    const data = new Float32Array(N * 4)
    for (let i = 0; i < N; i++) {
      const z = Math.pow(Math.random(), 0.6) // more far motes than near
      data.set([Math.random(), Math.random(), z, Math.random()], i * 4)
    }
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    const aP = gl.getAttribLocation(prog, 'a_p'), aS = gl.getAttribLocation(prog, 'a_s')
    gl.enableVertexAttribArray(aP); gl.vertexAttribPointer(aP, 3, gl.FLOAT, false, 16, 0)
    gl.enableVertexAttribArray(aS); gl.vertexAttribPointer(aS, 1, gl.FLOAT, false, 16, 12)
    const U = Object.fromEntries(['u_t', 'u_scroll', 'u_vel', 'u_dpr', 'u_asp', 'u_mouse'].map((n) => [n, gl.getUniformLocation(prog, n)]))
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE)
    gl.clearColor(0, 0, 0, 0)

    let dpr = 1
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(canvas.clientWidth * dpr); canvas.height = Math.round(canvas.clientHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(canvas)

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    const onMove = (e) => { const r = canvas.getBoundingClientRect(); mouse.tx = (e.clientX - r.left) / r.width; mouse.ty = 1 - (e.clientY - r.top) / r.height }
    window.addEventListener('pointermove', onMove, { passive: true })

    let raf = 0, visible = false, vel = 0, scroll = 0, lastY = window.scrollY, idle = false
    const t0 = performance.now()
    const frame = (now) => {
      raf = 0
      if (!visible || document.hidden) return
      const y = getLenis()?.scroll ?? window.scrollY
      if (yieldToFilm && filmOnScreen()) {
        if (!idle) { gl.clear(gl.COLOR_BUFFER_BIT); idle = true }
        lastY = y; raf = requestAnimationFrame(frame); return
      }
      idle = false
      const dy = y - lastY; lastY = y
      scroll += dy / window.innerHeight * 0.35
      vel += (Math.min(1, Math.abs(dy) / 40) - vel) * 0.08
      mouse.x += (mouse.tx - mouse.x) * 0.06; mouse.y += (mouse.ty - mouse.y) * 0.06
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(U.u_t, (now - t0) / 1000)
      gl.uniform1f(U.u_scroll, scroll)
      gl.uniform1f(U.u_vel, vel)
      gl.uniform1f(U.u_dpr, dpr)
      gl.uniform1f(U.u_asp, canvas.width / Math.max(1, canvas.height))
      gl.uniform2f(U.u_mouse, mouse.x, mouse.y)
      gl.drawArrays(gl.POINTS, 0, N)
      raf = requestAnimationFrame(frame)
    }
    const kick = () => { if (!raf && visible && !document.hidden) { lastY = getLenis()?.scroll ?? window.scrollY; raf = requestAnimationFrame(frame) } }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick() })
    io.observe(canvas)
    document.addEventListener('visibilitychange', kick)

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect()
      window.removeEventListener('pointermove', onMove); document.removeEventListener('visibilitychange', kick)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [density, yieldToFilm])

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none mix-blend-screen ${className}`} />
}
