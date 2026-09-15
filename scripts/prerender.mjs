// Post-build prerender for the home page.
//
// Loads the built site in headless Chrome, waits for a specific element, and
// copies the rendered #root content into dist/index.html. Also writes a
// <noscript> project list generated from src/data.js.
//
// The hash router is unchanged, so only the home page becomes indexable.
// main.jsx uses createRoot, so the prerendered markup is replaced on load
// rather than hydrated: no mismatch warnings, motion unchanged.
//
// Any failed check exits non-zero, so CI never deploys a bad build and the
// live site stays on its last good version.

import { readFile, writeFile } from 'node:fs/promises'
import { preview } from 'vite'
import puppeteer from 'puppeteer-core'
import { profile, projects } from '../src/data.js'

const DIST = new URL('../dist/index.html', import.meta.url)
const BASE = '/PortFolio_Build_Gem/'
const READY_SELECTOR = `#root a[href="#/p/${projects[0].id}"]`
const TIMEOUT_MS = 60_000

const fail = (msg) => {
  console.error(`prerender: FAILED - ${msg}`)
  process.exit(1)
}

// Hard stop for the whole script, whatever hangs.
const watchdog = setTimeout(() => fail(`timed out after ${TIMEOUT_MS * 1.5} ms`), TIMEOUT_MS * 1.5)

const chromePath = process.env.CHROME_PATH
if (!chromePath) fail('CHROME_PATH is not set')

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const decodeText = (html) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+/g, ' ')

function noscriptProjects() {
  const items = projects.map((p) => {
    const links = [`<a href="${escapeHtml(p.repo)}">Code</a>`]
    if (p.demo) links.push(`<a href="${escapeHtml(p.demo)}">Live demo</a>`)
    return `<li><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.kind)}. ${escapeHtml(p.summary)}</p><p>${links.join(' · ')}</p></li>`
  })
  return `<noscript><section aria-label="Projects"><h2>Projects</h2><ul>${items.join('')}</ul></section></noscript>`
}

const original = await readFile(DIST, 'utf8')
const headOf = (html) => html.slice(0, html.indexOf('</head>') + '</head>'.length)
const htmlTagOf = (html) => html.match(/<html[^>]*>/)?.[0]

const ROOT_EMPTY = '<div id="root"></div>'
if (original.split(ROOT_EMPTY).length !== 2) fail('dist/index.html must contain exactly one empty #root')

const server = await preview({ preview: { port: 4180, strictPort: true }, logLevel: 'error' })
let browser
let rootHtml
try {
  browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    // CI runners restrict Chrome's user-namespace sandbox; this is our own static build.
    args: ['--no-sandbox', '--disable-gpu'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(`http://localhost:4180${BASE}`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT_MS })
  await page.waitForSelector(READY_SELECTOR, { timeout: TIMEOUT_MS })
  if (errors.length) fail(`page errors: ${errors.join(' | ')}`)
  rootHtml = await page.$eval('#root', (el) => el.innerHTML)
} catch (e) {
  fail(e.message)
} finally {
  await browser?.close()
  await new Promise((r) => server.httpServer.close(r))
}

const output = original.replace(ROOT_EMPTY, `<div id="root">${rootHtml}</div>\n    ${noscriptProjects()}`)

// --- Checks. Nothing is written unless every one passes. ---
if (headOf(output) !== headOf(original)) fail('<head> is not byte-identical to the vite build output')
if (htmlTagOf(output) !== htmlTagOf(original)) fail('<html> tag changed')
if ((output.match(/application\/ld\+json/g) || []).length !== 1) fail('expected exactly one JSON-LD block')

const body = output.slice(output.indexOf('<body'))
const rootText = decodeText(rootHtml)
const required = [
  profile.name,
  profile.tagline.slice(0, 43),
  profile.seeking.what,
  profile.seeking.where,
  profile.email,
  ...projects.slice(0, 3).map((p) => p.name),
]
for (const phrase of required) {
  if (!rootText.includes(phrase)) fail(`prerendered #root is missing: "${phrase}"`)
}
for (const url of [profile.github, profile.linkedin]) {
  if (!body.includes(`href="${url}`)) fail(`prerendered body is missing link: ${url}`)
}
const noscript = body.slice(body.indexOf('<noscript>'), body.indexOf('</noscript>'))
for (const p of projects) {
  if (!noscript.includes(escapeHtml(p.name)) || !noscript.includes(`href="${p.repo}"`)) {
    fail(`<noscript> list is missing project or link: ${p.name}`)
  }
}

await writeFile(DIST, output)
clearTimeout(watchdog)
console.log(`prerender: ok - #root ${rootHtml.length} chars, ${projects.length} projects in <noscript>, <head> unchanged`)
process.exit(0)
