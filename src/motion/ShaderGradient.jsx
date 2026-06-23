import React, { useEffect, useRef } from 'react'

// Animated mesh-gradient hero, raw WebGL (no Three.js). Domain-warped fBm value noise.
// Palette colours (u_a, u_b) are driven from React via `tintRef` and lerp smoothly,
// so the whole background can change colour as the user scrolls section to section.
// Honors prefers-reduced-motion.

const DEFAULT = { a: [0.30, 0.17, 0.66], b: [0.10, 0.55, 0.80] }

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
precision highp float;
uniform vec2 u_res; uniform float u_t; uniform vec2 u_mouse;
uniform vec3 u_a; uniform vec3 u_b;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){ float v=0., a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p*=2.02; a*=0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 asp = vec2(u_res.x/u_res.y, 1.0);
  vec2 q = uv*asp;
  float t = u_t*0.06;
  vec2 m = (u_mouse - 0.5);
  vec2 w = vec2(fbm(q*2.0 + t + m*0.4), fbm(q*2.0 - t*0.8 - m*0.4));
  float n = fbm(q*2.3 + w*1.8 + t*0.5);
  vec3 c0 = u_a * 0.16 + vec3(0.012,0.010,0.026);   // base carries the section hue
  vec3 col = mix(c0, u_a, smoothstep(0.12,0.58,n));
  col = mix(col, u_b, smoothstep(0.62,0.99, fbm(q*3.0 - t*0.7 + w)));
  float vig = smoothstep(1.4, 0.15, length(uv-0.5));
  col *= mix(0.86, 1.18, vig);
  col *= 1.08;
  col += (hash(gl_FragCoord.xy + u_t)*0.5)*0.02;
  gl_FragColor = vec4(col, 1.0);
}
`

export default function ShaderGradient({ className = '', tintRef }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const gl = canvas.getContext('webgl', { antialias: true, powerPreference: 'high-performance' })
    if (!gl) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compile = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog); gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const U = (n) => gl.getUniformLocation(prog, n)
    const uRes = U('u_res'), uT = U('u_t'), uM = U('u_mouse'), uA = U('u_a'), uB = U('u_b')
    const mouse = { x: 0.5, y: 0.5 }, target = { x: 0.5, y: 0.5 }
    const onMove = (e) => { target.x = e.clientX / innerWidth; target.y = 1 - e.clientY / innerHeight }
    addEventListener('pointermove', onMove)
    // smoothly lerped palette
    const curA = [...DEFAULT.a], curB = [...DEFAULT.b]
    let raf, start = performance.now()
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      canvas.width = canvas.clientWidth * dpr; canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize(); addEventListener('resize', resize)
    const lerp = (cur, tgt, k) => { for (let i = 0; i < 3; i++) cur[i] += (tgt[i] - cur[i]) * k }
    const frame = () => {
      const t = (performance.now() - start) / 1000
      mouse.x += (target.x - mouse.x) * 0.04; mouse.y += (target.y - mouse.y) * 0.04
      const tint = (tintRef && tintRef.current) || DEFAULT
      lerp(curA, tint.a, 0.03); lerp(curB, tint.b, 0.03)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uT, t)
      gl.uniform2f(uM, mouse.x, mouse.y)
      gl.uniform3f(uA, curA[0], curA[1], curA[2])
      gl.uniform3f(uB, curB[0], curB[1], curB[2])
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(frame)
    }
    if (reduce) {
      const tint = (tintRef && tintRef.current) || DEFAULT
      gl.uniform2f(uRes, canvas.width, canvas.height); gl.uniform1f(uT, 12.0); gl.uniform2f(uM, 0.5, 0.5)
      gl.uniform3f(uA, ...tint.a); gl.uniform3f(uB, ...tint.b)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    } else frame()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('pointermove', onMove) }
  }, [tintRef])
  return <canvas ref={ref} className={className} />
}
