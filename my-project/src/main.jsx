import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Lenis smooth scrolling
// Note: run `npm install` after updating package.json to install this package.
import Lenis from '@studio-freight/lenis'

let lenis = null

function initLenis() {
  if (typeof window === 'undefined') return
  if (lenis) return // already initialized
  try {
    // Only init when page is scrollable.
    if (document.documentElement.scrollHeight <= window.innerHeight) return

    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical'
    })

    function raf(time) {
      try {
        lenis.raf(time)
      } catch (e) {
        console.error('Lenis raf error:', e)
        lenis = null
      }
      if (lenis) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    window.lenis = lenis
    console.info('Lenis initialized')
  } catch (err) {
    console.warn('Lenis failed to initialize — falling back to native scrolling.', err)
    lenis = null
    window.lenis = null
  }
}

// debounce helper
function debounce(fn, wait = 150) {
  let t = null
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), wait)
  }
}

// Try to initialize once now (in case page is already tall)
try { initLenis() } catch { /* ignore */ }

// Initialize Lenis when the page becomes scrollable (load/resize/content changes)
if (typeof window !== 'undefined') {
  window.addEventListener('load', initLenis)
  window.addEventListener('resize', debounce(initLenis, 200))
  // MutationObserver can catch dynamic content (optional)
  const mo = new MutationObserver(debounce(() => initLenis(), 200))
  mo.observe(document.body, { childList: true, subtree: true })
}

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
// expose lenis so components can use it for smooth scrolling
if (typeof window !== 'undefined') window.lenis = lenis
// global scroll helper — use Lenis when available, otherwise fall back to
// native smooth scrolling. Components can call window.appScrollTo(element).
if (typeof window !== 'undefined') {
  window.appScrollTo = (el, options = {}) => {
    if (!el) return
    // Lenis supports element input
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(el, options)
      return
    }
    // Fallback: compute top offset and use native smooth scroll
    const top = el.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
