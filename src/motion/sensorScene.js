import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

/*
  The home hero as a short film you scroll through: how a chromatic confocal
  sensor turns white light into two peaks.

    0.00  a cloud of noise behind "Signal from noise."
    0.22  the sensor head descends; white light leaves the lens
    0.45  the light splits: every colour focuses at its own depth
    0.70  two colours land in focus on the two glass surfaces
    1.00  the noise reforms into the spectrum: two sharp peaks

  It is a schematic, not sensor data. Plain Three.js, created only on devices
  with a real GPU (the caller decides), paused off-screen and in background tabs.
*/

const BG = 0x060609
const LENS_Y = 2.3
const SURF = 0.4 // the slide's two surfaces sit at +SURF and -SURF (thick, for legibility)
// Violet -> red. Shorter wavelengths focus nearer the lens (axial chromatic aberration).
const COLORS = ['#7c5cff', '#4f7dff', '#22d3ee', '#34d399', '#facc15', '#f59e0b', '#fb7185']
const FOCUS = COLORS.map((_, i) => 1.2 - i * 0.4) // 1.2 .. -1.2; index 2 hits +SURF, index 4 hits -SURF
const SPEC_Z = -2.6, SPEC_BASE = 0.9

const KEYS = [
  { p: 0.0, pos: [0, 2.0, 12], look: [0, 1.6, 0] },
  { p: 0.22, pos: [4.2, 3.8, 7.4], look: [0, 2.5, 0] },
  { p: 0.45, pos: [2.8, 1.7, 4.8], look: [0, 1.0, 0] },
  { p: 0.7, pos: [2.6, 0.9, 4.6], look: [0, 0.1, 0] },
  { p: 0.84, pos: [0.9, 1.6, 6.0], look: [0, 1.0, -1.2] },
  { p: 1.0, pos: [0, 2.3, 9.2], look: [0, 2.0, SPEC_Z] },
]

const clamp01 = (x) => Math.min(1, Math.max(0, x))
const ramp = (p, a, b) => clamp01((p - a) / (b - a))
const smooth = (t) => t * t * (3 - 2 * t)
const gauss = (x, c, s) => Math.exp(-0.5 * ((x - c) / s) ** 2)
// The schematic spectrum: two peaks, at the colours focused on the two surfaces.
const peakX = (i) => -4.5 + i * 1.5
const spectrum = (x) => SPEC_BASE + 2.7 * gauss(x, peakX(2), 0.3) + 2.2 * gauss(x, peakX(4), 0.3)
const colorAt = (x, out) => {
  const f = clamp01((x + 4.5) / 9) * (COLORS.length - 1)
  const i = Math.min(COLORS.length - 2, Math.floor(f))
  return out.set(COLORS[i]).lerp(new THREE.Color(COLORS[i + 1]), f - i)
}

function camAt(p, pos, look) {
  let k = 0
  while (k < KEYS.length - 2 && p > KEYS[k + 1].p) k++
  const a = KEYS[k], b = KEYS[k + 1]
  const t = smooth(clamp01((p - a.p) / (b.p - a.p)))
  pos.set(...a.pos).lerp(new THREE.Vector3(...b.pos), t)
  look.set(...a.look).lerp(new THREE.Vector3(...b.look), t)
}

/* ---- Particles: noise cloud that reforms into the spectrum ---- */
function makeParticles(count) {
  const pos = new Float32Array(count * 3), spec = new Float32Array(count * 3)
  const col = new Float32Array(count * 3), seed = new Float32Array(count), sz = new Float32Array(count)
  const c = new THREE.Color()
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 22
    pos[i * 3 + 1] = -2.5 + Math.random() * 9
    pos[i * 3 + 2] = -11 + Math.random() * 14
    sz[i] = 0.5 + Math.pow(Math.random(), 4) * 3.2 // mostly fine dust, a few bright motes
    const x = (Math.random() - 0.5) * 10
    const onCurve = Math.random() < 0.68
    const top = spectrum(x)
    spec[i * 3] = x
    spec[i * 3 + 1] = onCurve ? top + (Math.random() - 0.5) * 0.05 : SPEC_BASE + Math.random() * (top - SPEC_BASE)
    spec[i * 3 + 2] = SPEC_Z + (Math.random() - 0.5) * (onCurve ? 0.08 : 0.4)
    colorAt(x, c).multiplyScalar(onCurve ? 1 : 0.3)
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    seed[i] = Math.random()
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  g.setAttribute('aSpec', new THREE.BufferAttribute(spec, 3))
  g.setAttribute('aCol', new THREE.BufferAttribute(col, 3))
  g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
  g.setAttribute('aSize', new THREE.BufferAttribute(sz, 1))
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uMorph: { value: 0 }, uFade: { value: 1 }, uSize: { value: 60 }, uPR: { value: 1 } },
    vertexShader: `
      attribute vec3 aSpec; attribute vec3 aCol; attribute float aSeed; attribute float aSize;
      uniform float uTime, uMorph, uSize, uPR;
      varying vec3 vCol; varying float vM; varying float vTw;
      void main(){
        vec3 p = position;
        float t = uTime * 0.22 + aSeed * 6.2831;
        p += vec3(sin(t + p.y * 0.7), cos(t * 0.8 + p.x * 0.45), sin(t * 0.6 + p.z * 0.6)) * 0.4;
        vec3 s = aSpec + vec3(0.0, sin(uTime * 1.4 + aSeed * 40.0) * 0.012, 0.0);
        float m = smoothstep(0.0, 1.0, clamp(uMorph * 1.5 - aSeed * 0.5, 0.0, 1.0));
        vec4 mv = modelViewMatrix * vec4(mix(p, s, m), 1.0);
        gl_Position = projectionMatrix * mv;
        // Points right next to the camera would balloon to the whole screen: cap them.
        gl_PointSize = min(uSize * uPR * mix(aSize, 0.7, m) / max(-mv.z, 0.1), 48.0 * uPR);
        vCol = mix(mix(vec3(0.8, 0.78, 0.85), aCol * 1.4, 0.6), aCol * 1.6, m);
        vM = m;
        vTw = 0.55 + 0.45 * sin(uTime * (1.0 + aSeed * 2.5) + aSeed * 50.0);   // twinkle while noise
      }`,
    fragmentShader: `
      uniform float uFade;
      varying vec3 vCol; varying float vM; varying float vTw;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d) * uFade * mix(0.5 * vTw, 1.0, vM);
        gl_FragColor = vec4(vCol * a, a);
      }`,
  })
  return new THREE.Points(g, m)
}

/* ---- Light cones: fresnel-lit, additive. Unit height, top at local y = 0. ---- */
function makeCone(color, radius) {
  const g = new THREE.CylinderGeometry(radius, 0.002, 1, 64, 1, true)
  g.translate(0, -0.5, 0)
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { uColor: { value: new THREE.Color(color) }, uOpacity: { value: 0 } },
    vertexShader: `
      varying vec3 vN; varying vec3 vV; varying float vY;
      void main(){
        vN = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vV = normalize(-mv.xyz); vY = position.y;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor; uniform float uOpacity;
      varying vec3 vN; varying vec3 vV; varying float vY;
      void main(){
        // clamp: rounding can push the base below 0, and pow() of a negative is NaN,
        // which the bloom pass smears into flickering black blocks.
        float rim = pow(clamp(1.0 - abs(dot(normalize(vN), normalize(vV))), 0.0, 1.0), 1.6);
        float tip = 0.55 + 0.45 * smoothstep(-0.2, -1.0, vY);   // brighter toward the focus
        float a = uOpacity * (0.04 + rim * 0.5) * tip;
        gl_FragColor = vec4(uColor * a, a);
      }`,
  })
  return new THREE.Mesh(g, m)
}

function glowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128
  const x = c.getContext('2d')
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.25, 'rgba(255,255,255,0.45)'); g.addColorStop(1, 'rgba(255,255,255,0)')
  x.fillStyle = g; x.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace
  return t
}

function makeHead(env) {
  const head = new THREE.Group()
  const metal = new THREE.MeshStandardMaterial({ color: 0x1b1c24, metalness: 0.92, roughness: 0.32, envMap: env, envMapIntensity: 1.1 })
  const satin = new THREE.MeshStandardMaterial({ color: 0x3a3b46, metalness: 0.8, roughness: 0.5, envMap: env })
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 1.9, 64), metal)
  body.position.y = LENS_Y + 1.35
  const nose = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.4, 0.32, 64), satin)
  nose.position.y = LENS_Y + 0.24
  const lens = new THREE.Mesh(new THREE.SphereGeometry(0.36, 48, 24),
    new THREE.MeshPhysicalMaterial({ color: 0xbfe9ff, metalness: 0, roughness: 0.04, clearcoat: 1, envMap: env, emissive: 0x6fd8ff, emissiveIntensity: 0.25 }))
  lens.scale.set(1, 0.22, 1); lens.position.y = LENS_Y + 0.07
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.63, 0.018, 12, 96), new THREE.MeshBasicMaterial({ color: 0x7c5cff }))
  ring.rotation.x = Math.PI / 2; ring.position.y = LENS_Y + 0.75
  const ring2 = ring.clone(); ring2.material = new THREE.MeshBasicMaterial({ color: 0x22d3ee }); ring2.position.y = LENS_Y + 0.82
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 6, 24), satin)
  cable.position.y = LENS_Y + 5.2
  head.add(body, nose, lens, ring, ring2, cable)
  return head
}

// Dark glass: almost clear face-on, lit only toward grazing angles, so it never blows out under bloom.
function makeSlide() {
  const g = new THREE.BoxGeometry(7, SURF * 2, 3)
  const glass = new THREE.Mesh(g, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uOpacity: { value: 1 } },
    vertexShader: `
      varying vec3 vN; varying vec3 vV;
      void main(){
        vN = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0); vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform float uOpacity;
      varying vec3 vN; varying vec3 vV;
      void main(){
        float f = pow(clamp(1.0 - abs(dot(normalize(vN), normalize(vV))), 0.0, 1.0), 3.0);
        gl_FragColor = vec4(vec3(0.55, 0.75, 0.9) * (0.08 + f * 0.35), (0.06 + f * 0.3) * uOpacity);
      }`,
  }))
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(g), new THREE.LineBasicMaterial({ color: 0xbfe3ff, transparent: true, opacity: 0.45 }))
  const slide = new THREE.Group(); slide.add(glass, edges)
  return slide
}

export function createSensorScene(canvas, { lite = false, pointer = true } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lite, powerPreference: 'high-performance' })
  renderer.setClearColor(BG, 1)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  let pr = Math.min(window.devicePixelRatio || 1, lite ? 1 : 1.75)
  renderer.setPixelRatio(pr)

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(BG, 0.055)
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80)
  const pmrem = new THREE.PMREMGenerator(renderer)
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

  scene.add(new THREE.HemisphereLight(0x8f8cff, 0x060609, 0.35))
  const key = new THREE.PointLight(0xffffff, 18, 12, 2); key.position.set(2.5, 5, 3); scene.add(key)

  const grid = new THREE.GridHelper(60, 120, 0x2a2a38, 0x14141c)
  grid.material.transparent = true
  grid.position.y = -1.8; scene.add(grid)

  const particles = makeParticles(lite ? 6000 : 16000)
  particles.material.uniforms.uSize.value = lite ? 70 : 58
  scene.add(particles)

  const head = makeHead(env); scene.add(head)
  const slide = makeSlide(); scene.add(slide)

  const white = makeCone('#f4f1ea', 0.34); scene.add(white)
  const cones = COLORS.map((c) => { const m = makeCone(c, 0.34); scene.add(m); return m })
  // Below each focus the colour diverges again (short, faint).
  const tails = COLORS.map((c) => { const m = makeCone(c, 0.22); m.rotation.z = Math.PI; scene.add(m); return m })

  const tex = glowTexture()
  const mkGlow = (color, y) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }))
    s.position.set(0, y, 0); scene.add(s); return s
  }
  const glowTop = mkGlow(COLORS[2], SURF), glowBot = mkGlow(COLORS[4], -SURF)
  // The sensor reads a whole line: a lit line across each surface.
  const mkLine = (color, y) => {
    const l = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.03), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }))
    l.rotation.x = -Math.PI / 2; l.position.set(0, y + 0.002, 0); scene.add(l); return l
  }
  const lineTop = mkLine(COLORS[2], SURF), lineBot = mkLine(COLORS[4], -SURF)

  let composer = null, bloom = null
  if (!lite) {
    composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.7, 0.5, 0.22)
    composer.addPass(bloom)
    composer.addPass(new OutputPass())
  }

  const size = { w: 1, h: 1 }
  const resize = () => {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1
    size.w = w; size.h = h
    renderer.setSize(w, h, false)
    composer?.setSize(w, h); composer?.setPixelRatio?.(pr)
    camera.aspect = w / h
    camera.fov = w / h < 0.8 ? 52 : 38
    // On wide screens shift the frame so the subject sits right of the captions.
    if (w / h > 1.1) camera.setViewOffset(w, h, -w * 0.13, 0, w, h); else camera.clearViewOffset()
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize()

  let target = 0, prog = 0
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 }
  const onMove = (e) => { ptr.tx = e.clientX / window.innerWidth - 0.5; ptr.ty = e.clientY / window.innerHeight - 0.5 }
  if (pointer) window.addEventListener('pointermove', onMove, { passive: true })

  const cPos = new THREE.Vector3(), cLook = new THREE.Vector3()
  const update = (t) => {
    const p = prog
    camAt(p, cPos, cLook)
    cPos.x += ptr.x * 0.5; cPos.y -= ptr.y * 0.3
    camera.position.copy(cPos); camera.lookAt(cLook)

    const headY = (1 - smooth(ramp(p, 0.06, 0.22))) * 4 + smooth(ramp(p, 0.82, 0.94)) * 5
    head.position.y = headY
    head.visible = headY < 4.5
    head.rotation.y = t * 0.15

    const lensY = LENS_Y + headY
    const whiteA = ramp(p, 0.18, 0.28) * (1 - ramp(p, 0.4, 0.5))
    white.position.y = lensY; white.scale.y = lensY - 0.0; white.material.uniforms.uOpacity.value = whiteA * 1.3
    white.visible = whiteA > 0.001

    const split = smooth(ramp(p, 0.38, 0.56))
    const colA = ramp(p, 0.38, 0.48) * (1 - ramp(p, 0.8, 0.9))
    const focusHit = ramp(p, 0.58, 0.68) * (1 - ramp(p, 0.84, 0.92))
    cones.forEach((c, i) => {
      const fy = FOCUS[i] * split
      c.position.y = lensY; c.scale.y = Math.max(0.01, lensY - fy)
      const inFocus = i === 2 || i === 4
      c.material.uniforms.uOpacity.value = colA * (inFocus ? 1 + focusHit * 0.8 : 1 - focusHit * 0.55)
      c.visible = colA > 0.001
      const tl = tails[i]
      tl.position.y = fy; tl.scale.y = 0.8 * split
      tl.material.uniforms.uOpacity.value = colA * 0.5 * split
      tl.visible = c.visible && split > 0.01
    })

    const pulse = 0.85 + 0.15 * Math.sin(t * 3.2)
    for (const [g, l] of [[glowTop, lineTop], [glowBot, lineBot]]) {
      g.material.opacity = focusHit * pulse
      g.scale.setScalar(0.5 + focusHit * 0.7)
      l.material.opacity = focusHit * 0.9
    }

    const slideIn = smooth(ramp(p, 0.24, 0.4))
    slide.position.y = (1 - slideIn) * -3
    slide.visible = slideIn > 0.001
    const slideDim = 1 - 0.6 * ramp(p, 0.86, 0.98)
    slide.children[0].material.uniforms.uOpacity.value = slideIn * slideDim
    slide.children[1].material.opacity = 0.45 * slideIn * slideDim
    grid.material.opacity = 0.7 * ramp(p, 0.14, 0.3)
    grid.visible = grid.material.opacity > 0.001

    const u = particles.material.uniforms
    u.uTime.value = t
    u.uMorph.value = smooth(ramp(p, 0.8, 0.98))
    u.uFade.value = 1 - 0.8 * ramp(p, 0.12, 0.3) + 0.8 * ramp(p, 0.78, 0.9)
    u.uPR.value = pr
    if (bloom) bloom.strength = 0.6 + focusHit * 0.4 + u.uMorph.value * 0.3
  }

  let raf = 0, visible = true, running = false, last = 0, slow = 0
  const start = performance.now()
  const frame = (now) => {
    raf = 0
    if (!visible || document.hidden) { running = false; return }
    const dt = last ? now - last : 16
    last = now
    // Adaptive quality: sustained slow frames drop the pixel ratio, then bloom.
    if (dt > 26 && dt < 500) slow++; else slow = Math.max(0, slow - 1)
    if (slow > 45) {
      slow = 0
      if (pr > 1) { pr = 1; renderer.setPixelRatio(pr); resize() } else if (composer) { composer.dispose?.(); composer = null; bloom = null }
    }
    prog += (target - prog) * 0.14
    ptr.x += (ptr.tx - ptr.x) * 0.05; ptr.y += (ptr.ty - ptr.y) * 0.05
    update((now - start) / 1000)
    if (composer) composer.render(); else renderer.render(scene, camera)
    raf = requestAnimationFrame(frame)
  }
  const kick = () => { if (!running && visible && !document.hidden) { running = true; last = 0; raf = requestAnimationFrame(frame) } }
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick() })
  io.observe(canvas)
  const onVis = () => kick()
  document.addEventListener('visibilitychange', onVis)
  kick()

  return {
    setProgress(p) { target = clamp01(p) },
    dispose() {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      scene.traverse((o) => {
        o.geometry?.dispose()
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : []
        mats.forEach((m) => m.dispose())
      })
      tex.dispose(); env.dispose(); pmrem.dispose(); composer?.dispose?.()
      renderer.dispose()
    },
  }
}
