import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Interactive rotating point-cloud sphere (raw Three.js, transparent canvas).
// Points distributed via a Fibonacci sphere; colour ramps violet→cyan by height.
// Mouse tilts the cloud; honors prefers-reduced-motion.
export default function PointCloud3D({ className = '' }) {
  const mount = useRef(null)
  useEffect(() => {
    const el = mount.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const w = () => el.clientWidth, h = () => el.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, w() / h(), 0.1, 100)
    camera.position.z = 6
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(w(), h())
    el.appendChild(renderer.domElement)

    const N = 2600
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    const R = 2.4
    const violet = new THREE.Color('#7c4dff'), cyan = new THREE.Color('#22d3ee')
    const c = new THREE.Color()
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = i * 2.399963 // golden angle
      const jitter = 0.92 + Math.random() * 0.16
      pos[i * 3] = Math.cos(theta) * r * R * jitter
      pos[i * 3 + 1] = y * R * jitter
      pos[i * 3 + 2] = Math.sin(theta) * r * R * jitter
      c.copy(violet).lerp(cyan, (y + 1) / 2)
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const mat = new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    const mouse = { x: 0, y: 0 }, tgt = { x: 0, y: 0 }
    const onMove = (e) => { tgt.x = (e.clientX / window.innerWidth - 0.5); tgt.y = (e.clientY / window.innerHeight - 0.5) }
    window.addEventListener('pointermove', onMove)
    const resize = () => { camera.aspect = w() / h(); camera.updateProjectionMatrix(); renderer.setSize(w(), h()) }
    window.addEventListener('resize', resize)

    let raf
    const render = () => {
      mouse.x += (tgt.x - mouse.x) * 0.05; mouse.y += (tgt.y - mouse.y) * 0.05
      points.rotation.y += 0.0016
      points.rotation.x = mouse.y * 0.5
      points.rotation.z = mouse.x * 0.25
      renderer.render(scene, camera)
      raf = requestAnimationFrame(render)
    }
    if (reduce) { points.rotation.y = 0.6; renderer.render(scene, camera) } else render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove); window.removeEventListener('resize', resize)
      geo.dispose(); mat.dispose(); renderer.dispose()
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }, [])
  return <div ref={mount} className={className} />
}
