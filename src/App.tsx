import { ReactLenis } from 'lenis/react'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticleBackground from '@/components/layout/ParticleBackground'

import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Research from '@/components/sections/Research'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

/** Root layout — assembles navbar, all sections, and footer. */
function App() {
  return (
    <ReactLenis
      root
      options={{
        // Use native scroll on touch — faster than JS-interpolated scroll
        syncTouch: false,
        // Tune scroll feel — 1.2 is the sweet spot between smooth and responsive
        duration: 1.2,
        // Best-performing easing — minimal computation per frame
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // Natural touch momentum multiplier
        touchMultiplier: 1.5,
      }}
    >
      <div className="relative min-h-screen bg-surface text-text">
        {/* Particle network — fixed behind all content */}
        <ParticleBackground />

        {/* All page content sits above the particle layer */}
        <div className="relative z-10">
          <Navbar />

          <main>
            <Hero />
            <About />
            <Projects />
            <Research />
            <Skills />
            <Contact />
          </main>

          <Footer />
        </div>
      </div>
    </ReactLenis>
  )
}

export default App
