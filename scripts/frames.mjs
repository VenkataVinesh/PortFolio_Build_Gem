// Cuts scene clips into scroll frames.
//
//   CHROME_PATH=... node scripts/frames.mjs            (every scenes-src/*.mp4|webm)
//   CHROME_PATH=... node scripts/frames.mjs precitec   (one scene)
//
// Headless Chrome decodes the clip (no ffmpeg needed), seeks to evenly spaced
// times and exports each frame as WebP: a desktop set (1920 px wide) and a
// lighter phone set (900 px, every other frame). Output goes to
// public/scenes/<id>/{d,m}/NNN.webp, and src/scenes.json records what exists,
// which is how the site knows a scene is ready (scenes without frames stay hidden).

import { readdir, mkdir, writeFile, readFile, rm } from 'node:fs/promises'
import { createServer } from 'node:http'
import { createReadStream, statSync } from 'node:fs'
import { existsSync } from 'node:fs'
import { join, resolve, extname, basename } from 'node:path'
import puppeteer from 'puppeteer-core'

const ROOT = resolve(import.meta.dirname, '..')
const SRC = join(ROOT, 'scenes-src')
const OUT = join(ROOT, 'public', 'scenes')
const MANIFEST = join(ROOT, 'src', 'scenes.json')
// 12 frames per second of footage: smooth when scrubbed, without flooding the page.
const FPS = 12, DESKTOP_W = 1920, PHONE_W = 900, QUALITY = 0.82

const chromePath = process.env.CHROME_PATH
if (!chromePath) { console.error('frames: CHROME_PATH is not set'); process.exit(1) }

const only = process.argv[2]
const clips = (await readdir(SRC)).filter((f) => ['.mp4', '.webm', '.mov'].includes(extname(f).toLowerCase()))
  .filter((f) => !only || basename(f, extname(f)) === only)
if (!clips.length) { console.error(`frames: no clips in ${SRC}${only ? ` named ${only}` : ''}`); process.exit(1) }

// Serve the clips over http: a file:// page taints the canvas and frames cannot be exported.
const server = createServer((req, res) => {
  const name = decodeURIComponent(new URL(req.url, 'http://x').pathname.slice(1))
  if (name === 'page') { res.writeHead(200, { 'Content-Type': 'text/html' }); return res.end('<!doctype html><title>frames</title>') }
  const file = join(SRC, name)
  if (!clips.includes(name) || !existsSync(file)) { res.writeHead(404); return res.end() }
  const size = statSync(file).size, range = /bytes=(\d+)-(\d*)/.exec(req.headers.range || '')
  if (range) { // media elements seek with range requests
    const a = +range[1], z = range[2] ? +range[2] : size - 1
    res.writeHead(206, { 'Content-Type': 'video/mp4', 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${a}-${z}/${size}`, 'Content-Length': z - a + 1 })
    return createReadStream(file, { start: a, end: z }).pipe(res)
  }
  res.writeHead(200, { 'Content-Type': 'video/mp4', 'Accept-Ranges': 'bytes', 'Content-Length': size })
  createReadStream(file).pipe(res)
})
await new Promise((ok) => server.listen(0, '127.0.0.1', ok))
const origin = `http://127.0.0.1:${server.address().port}`

const manifest = existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, 'utf8')) : {}
const browser = await puppeteer.launch({ executablePath: chromePath, headless: true, protocolTimeout: 60_000, args: [
  '--autoplay-policy=no-user-gesture-required',
  // Headless pages count as background tabs: media seeks stall and timers throttle to ~1/min.
  '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows',
] })

try {
  for (const clip of clips) {
    const id = basename(clip, extname(clip)).toLowerCase().replace(/[^a-z0-9-]/g, '')
    const page = await browser.newPage()
    await page.bringToFront()
    await page.goto(`${origin}/page`)
    const meta = await page.evaluate((src) => new Promise((ok, no) => {
      const v = document.createElement('video')
      v.id = 'v'; v.muted = true; v.playsInline = true; v.preload = 'auto'; v.src = src
      document.body.append(v)
      const done = () => ok({ d: v.duration, w: v.videoWidth, h: v.videoHeight })
      v.onloadedmetadata = done; v.onerror = () => no(new Error('cannot decode clip'))
    }), `${origin}/${encodeURIComponent(clip)}`)
    if (!meta.w || !isFinite(meta.d)) throw new Error(`${clip}: no video track or unknown duration`)

    // Never upscale: a wider frame than the clip only costs bytes.
    const dW = Math.min(DESKTOP_W, meta.w), mW = Math.min(PHONE_W, meta.w)
    await rm(join(OUT, id), { recursive: true, force: true })
    await mkdir(join(OUT, id, 'd'), { recursive: true }); await mkdir(join(OUT, id, 'm'), { recursive: true })
    const grab = (t, width) => page.evaluate((t, width, q) => new Promise((ok, no) => {
      const v = document.getElementById('v')
      let fired = false
      const shoot = () => {
        if (fired) return; fired = true
        try {
          const c = document.createElement('canvas')
          c.width = width; c.height = Math.round(width * v.videoHeight / v.videoWidth)
          c.getContext('2d').drawImage(v, 0, 0, c.width, c.height)
          ok(c.toDataURL('image/webp', q).split(',')[1])
        } catch (e) { no(e) } // fail loudly; an exception in a handler would otherwise hang
      }
      v.onseeked = shoot // (requestVideoFrameCallback never fires for a paused video headless)
      setTimeout(() => { if (!fired) window.__late = (window.__late || 0) + 1; shoot() }, 3000) // never hang on one frame
      v.currentTime = t
    }), t, width, QUALITY)

    // Stay a hair inside both ends: the very last timestamp often has no frame.
    const span = Math.max(0, meta.d - 0.06)
    const FRAMES = Math.max(48, Math.round(meta.d * FPS))
    let m = 0
    for (let i = 0; i < FRAMES; i++) {
      const t = 0.02 + (span * i) / (FRAMES - 1)
      const name = String(i).padStart(3, '0') + '.webp'
      await writeFile(join(OUT, id, 'd', name), Buffer.from(await grab(t, dW), 'base64'))
      if (i % 2 === 0) { await writeFile(join(OUT, id, 'm', String(m).padStart(3, '0') + '.webp'), Buffer.from(await grab(t, mW), 'base64')); m++ }
    }
    const late = await page.evaluate(() => window.__late || 0)
    if (late) console.warn(`frames: ${id} - ${late} frames taken on the timeout path (seek event missing)`)
    manifest[id] = { frames: FRAMES, phoneFrames: m, aspect: +(meta.w / meta.h).toFixed(4) }
    console.log(`frames: ${id} - ${FRAMES} desktop + ${m} phone frames from ${clip} (${meta.w}x${meta.h}, ${meta.d.toFixed(1)} s)`)
    await page.close()
  }
} finally {
  await browser.close()
  server.close()
}
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
