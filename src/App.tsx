import { useState, useEffect } from 'react'
import { ReactLenis } from 'lenis/react'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import CommandPalette from '@/components/ui/CommandPalette'

import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Achievements from '@/components/sections/Achievements'
import Contact from '@/components/sections/Contact'

/** Root layout — assembles navbar, all sections, and footer. */
function App() {
  const [cmdkOpen, setCmdkOpen] = useState(false)

  /* ⌘K / Ctrl+K global shortcut */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdkOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <ReactLenis
      root
      options={{
        syncTouch: false,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
      }}
    >
      {/* Scroll progress bar — 2px red line at top */}
      <ScrollProgress />

      {/* Command palette — ⌘K */}
      <CommandPalette isOpen={cmdkOpen} onClose={() => setCmdkOpen(false)} />

      {/* Custom cursor */}
      <div className="cursor-dot" id="cursorDot">
        <span id="cursorLabel" />
      </div>

      {/* Grain texture overlay */}
      <svg className="grain" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Frame overlay — gallery margin aesthetic */}
      <div className="frame-overlay" aria-hidden="true" />
      <span className="frame-tag tl" aria-hidden="true">Tanvir Rahan Rifat</span>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      <Footer />

      {/* Custom cursor JS */}
      <CursorLogic />
    </ReactLenis>
  )
}

/** Vanilla JS cursor dot — interpolated tracking with hover label. */
function CursorLogic() {
  useEffect(() => {
    const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches
    if (isCoarse) return

    const dot = document.getElementById('cursorDot')
    const label = document.getElementById('cursorLabel')
    if (!dot || !label) return

    let mx = 0, my = 0, cx = 0, cy = 0
    let rafId: number

    const onMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMouseMove)

    const raf = () => {
      cx += (mx - cx) * 0.2
      cy += (my - cy) * 0.2
      dot.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`
      rafId = requestAnimationFrame(raf)
    }
    raf()

    /* Cursor hover labels — attach to elements with [data-cursor] */
    const hoverEls = document.querySelectorAll<HTMLElement>('[data-cursor]')
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hover')
        label.textContent = el.getAttribute('data-cursor') ?? ''
      })
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hover')
        label.textContent = ''
      })
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}

export default App
