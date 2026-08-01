import { useRef, lazy, Suspense } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Preloader from '@/components/ui/Preloader'

const HeroScene = lazy(() => import('@/three/scenes/HeroScene'))

/** Hero — first viewport section with headline, CTA, and 3D scene placeholder. */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Fade in text elements staggering
    gsap.from('.hero-anim', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.2, // wait for page load slightly
    })
    
    // Fade in the 3D container without scale to prevent Canvas resize glitches
    gsap.from('.hero-3d', {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.5,
    })
  }, { scope: containerRef })

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden border-b border-surface-lighter/30 pt-16"
    >
      {/* 3D Scene (Full screen on all devices) */}
      <div className="hero-3d absolute left-0 top-0 h-[100dvh] w-full z-0 overflow-hidden" style={{ background: 'rgba(6, 182, 212, 0.03)' }}>
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Scroll indicator (Visible on all devices to guide users) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="scroll-indicator flex h-8 w-5 items-start justify-center rounded-full border border-text-dim/30 p-1.5">
          <div className="h-1.5 w-1 rounded-full bg-primary" />
        </div>
      </div>

      <Preloader />
    </section>
  )
}
