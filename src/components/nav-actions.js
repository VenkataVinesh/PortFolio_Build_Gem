import { scrollToEl } from '../motion/core.js'

// A hash router cannot carry a second hash, so "Contact" from another page
// routes home and leaves a note to scroll once the curtain lifts.
let pending = null
export const consumePendingAnchor = () => { const a = pending; pending = null; return a }

export function goToAnchor(e, id) {
  e?.preventDefault()
  const atHome = !window.location.hash.startsWith('#/') || window.location.hash === '#/'
  if (atHome) { scrollToEl(document.getElementById(id)); return }
  pending = id
  window.location.hash = '#/'
}
