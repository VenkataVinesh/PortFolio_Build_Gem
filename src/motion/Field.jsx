import { useEffect, useRef } from 'react'
import { liteMode, reducedMotion, coarsePointer, getLenis } from './core.js'

/*
  The "Spectral" field. One raw-WebGL fragment shader (no Three.js):
  isolines of a domain-warped noise field drawn as thin filaments of light,
  each colour channel sampled at a slightly different offset so the lines
  split into a prism-like dispersion fringe. The pointer is a lens: around it
  the filaments tighten, sharpen and brighten. Scroll pulls the field into
  depth. Paused off-screen and in background tabs; static on reduced motion.
*/

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'

const frag = (octaves) => `
precision highp float;
uniform vec2 u_res;
uniform float u_t;
uniform vec2 u_mouse;
uniform float u_focus;
uniform float u_scroll;
uniform float u_vel;
uniform vec3 u_tint;
uniform float u_tintMix;
uniform float u_gain;

vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < ${octaves}; i++){ v += a * snoise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}
vec3 spectrum(float x){
  vec3 v = vec3(0.486, 0.361, 1.0), c = vec3(0.133, 0.827, 0.933), a = vec3(0.961, 0.722, 0.29);
  x = fract(x);
  return x < 0.5 ? mix(v, c, smoothstep(0.0, 0.5, x)) : mix(c, a, smoothstep(0.5, 1.0, x));
}
float lines(float f, float w){
  float d = abs(fract(f) - 0.5);           // 0.5 on the isoline
  return smoothstep(0.5 - w, 0.5, d) + 0.35 * smoothstep(0.5 - w * 5.0, 0.5, d);
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float asp = u_res.x / u_res.y;
  vec2 p = (uv - 0.5) * vec2(asp, 1.0);
  vec2 m = (u_mouse - 0.5) * vec2(asp, 1.0);
  float t = u_t * 0.045;

  float d = length(p - m);
  float lens = exp(-d * d * 4.0) * u_focus;

  vec2 q = p * 0.95;
  q.y -= u_scroll * 0.7;
  q += (m - p) * lens * 0.2;                 // the lens pulls filaments toward the pointer

  float n1 = fbm(q * 0.7 + vec2(t, -t * 0.7));
  float n2 = fbm(q * 1.05 + n1 * 0.75 + vec2(-t * 0.6, t * 0.4));
  float field = n2 * 0.65 + n1 * 0.4 + p.y * 0.8 - p.x * 0.18;

  float freq = 5.5 + lens * 7.0;
  float w = 0.022 + lens * 0.012;
  float disp = 0.010 + lens * 0.022 + u_vel * 0.03;  // dispersion grows in focus and with speed

  float Lr = lines((field + disp) * freq, w);
  float Lg = lines(field * freq, w);
  float Lb = lines((field - disp) * freq, w);

  float ribbon = smoothstep(-0.35, 0.55, fbm(q * 0.45 - vec2(t * 0.35, t * 0.2)) + lens * 0.6);
  vec3 hue = spectrum(field * 0.22 + uv.x * 0.18 + t * 0.4);
  hue = mix(hue, u_tint, u_tintMix);
  vec3 violet = vec3(0.486, 0.361, 1.0), amber = vec3(0.961, 0.722, 0.29);

  // the core line takes the local hue, its fringes split toward violet and amber
  vec3 L = hue * Lg + violet * Lb * 0.45 + amber * Lr * 0.35;
  L = mix(L, vec3(dot(L, vec3(0.33))), 0.25);   // keep it silky, not neon

  vec3 col = vec3(0.014, 0.014, 0.026);
  col += hue * (0.035 + 0.055 * smoothstep(-0.3, 0.9, n1));            // nebula
  col += L * ribbon * (0.42 + lens * 0.9);                               // filaments
  col += mix(hue, vec3(1.0), 0.3) * lens * 0.05;

  float vig = smoothstep(1.25, 0.2, length((uv - vec2(0.55, 0.6)) * vec2(1.0, 1.25)));
  col *= mix(0.45, 1.0, vig);
  col *= u_gain;
  col += (hash(gl_FragCoord.xy + fract(u_t)) - 0.5) * 0.018;            // dither, no banding
  gl_FragColor = vec4(col, 1.0);
}
`

const hexToRgb = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export default function Field({ tint = null, tintMix = 0.55, gain = 1, className = '', interactive = true }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: false })
    if (!gl) { canvas.style.display = 'none'; return }

    const lite = liteMode()
    const still = reducedMotion()
    // No GPU (software rasteriser): keep the field but make it tiny and slow.
    const dbg = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : ''
    const software = /swiftshader|llvmpipe|software/i.test(renderer)
    const weak = software // any device without a GPU: software rasterisers block the main thread
    const compile = (type, src) => {
      const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s)
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
    }
    const vs = compile(gl.VERTEX_SHADER, VERT)
    const fs = compile(gl.FRAGMENT_SHADER, frag(lite ? 3 : 4))
    if (!vs || !fs) { canvas.style.display = 'none'; return }
    const prog = gl.createProgram()
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.style.display = 'none'; return }
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const U = Object.fromEntries(['u_res', 'u_t', 'u_mouse', 'u_focus', 'u_scroll', 'u_vel', 'u_tint', 'u_tintMix', 'u_gain'].map((n) => [n, gl.getUniformLocation(prog, n)]))

    const rgb = tint ? hexToRgb(tint) : [0.5, 0.5, 0.5]
    gl.uniform3f(U.u_tint, ...rgb)
    gl.uniform1f(U.u_tintMix, tint ? tintMix : 0)
    gl.uniform1f(U.u_gain, gain)

    // Pointer: until the visitor moves, the lens drifts on its own so the hero is alive at once.
    const mouse = { x: 0.62, y: 0.55 }, target = { x: 0.62, y: 0.55 }
    let focus = 0, focusTarget = interactive ? 1 : 0.6, vel = 0, userMoved = false, lastMove = 0
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width, ny = 1 - (e.clientY - r.top) / r.height
      vel = Math.min(1, vel + Math.hypot(nx - target.x, ny - target.y) * 4)
      target.x = nx; target.y = ny; userMoved = true; lastMove = performance.now()
    }
    const canTrack = interactive && !coarsePointer() && !still
    if (canTrack) window.addEventListener('pointermove', onMove, { passive: true })

    let w = 0, h = 0
    // Adaptive quality: if frames run slow, render fewer pixels (and the CSS stretches them).
    const levels = weak ? [0.22] : lite ? [0.55, 0.42, 0.33] : [0.85, 0.6, 0.45, 0.33, 0.25]
    let level = 0, slow = 0, lastFrame = 0, throttle = false
    const minDt = weak ? 120 : lite ? 30 : 0 // ms between frames: ~8 fps without a GPU, ~30 fps on phones
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, lite ? 1 : 1.5)
      const scale = levels[level]
      w = Math.max(1, Math.round(canvas.clientWidth * dpr * scale))
      h = Math.max(1, Math.round(canvas.clientHeight * dpr * scale))
      canvas.width = w; canvas.height = h
      gl.viewport(0, 0, w, h)
      gl.uniform2f(U.u_res, w, h)
      if (still) draw(14)
    }

    const start = performance.now()
    let raf = 0, visible = true, running = false, lost = false
    const draw = (t) => {
      gl.uniform1f(U.u_t, t)
      gl.uniform2f(U.u_mouse, mouse.x, mouse.y)
      gl.uniform1f(U.u_focus, focus)
      const sc = getLenis()?.scroll ?? window.scrollY
      gl.uniform1f(U.u_scroll, Math.min(2, sc / Math.max(1, window.innerHeight)))
      gl.uniform1f(U.u_vel, vel)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const frame = () => {
      raf = 0
      if (!visible || lost || document.hidden) { running = false; return }
      const now = performance.now(), t = (now - start) / 1000
      const dt = lastFrame ? now - lastFrame : 999
      if ((throttle && dt < 30) || dt < minDt) { raf = requestAnimationFrame(frame); return }
      lastFrame = now
      if (dt > 28 + minDt && dt < 1000) slow++; else slow = Math.max(0, slow - 1)
      if (slow > 20) {
        slow = 0
        if (level < levels.length - 1) { level++; resize() } else throttle = true
      }
      if (!userMoved || now - lastMove > 4000) {
        // idle: lissajous drift
        target.x = 0.6 + Math.sin(t * 0.23) * 0.22
        target.y = 0.5 + Math.cos(t * 0.31) * 0.2
      }
      mouse.x += (target.x - mouse.x) * 0.06; mouse.y += (target.y - mouse.y) * 0.06
      focus += (focusTarget - focus) * 0.04
      vel *= 0.94
      draw(t + 20)
      raf = requestAnimationFrame(frame)
    }
    const kick = () => { if (!running && !still && visible && !document.hidden && !lost) { running = true; raf = requestAnimationFrame(frame) } }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick() }, { rootMargin: '100px' })
    io.observe(canvas)
    const onVis = () => kick()
    document.addEventListener('visibilitychange', onVis)
    const onLost = (e) => { e.preventDefault(); lost = true; canvas.style.opacity = '0' }
    canvas.addEventListener('webglcontextlost', onLost)
    const ro = new ResizeObserver(resize); ro.observe(canvas)
    let idle = 0
    const begin = () => {
      resize()
      if (still) { focus = 0.7; draw(14) } else kick()
      requestAnimationFrame(() => canvas.classList.add('is-on'))
    }
    // Let the page paint first; the CSS gradient behind the canvas covers the gap.
    if ('requestIdleCallback' in window) idle = requestIdleCallback(begin, { timeout: 700 })
    else idle = setTimeout(begin, 200)

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect()
      if ('cancelIdleCallback' in window) cancelIdleCallback(idle); clearTimeout(idle)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('webglcontextlost', onLost)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [tint, tintMix, gain, interactive])

  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`}
      style={{ background: `radial-gradient(90% 70% at 62% 40%, ${tint ? tint + '33' : '#2a1f5c55'} 0%, #07070c 60%, #060609 100%)` }}>
      <canvas ref={canvasRef} className="field-canvas h-full w-full opacity-0 transition-opacity duration-[1400ms] [&.is-on]:opacity-100" />
    </div>
  )
}
