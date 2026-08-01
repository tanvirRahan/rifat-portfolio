import { useProgress } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader() {
  const { progress } = useProgress()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // When progress reaches 100, trigger the fade-out animation
    if (progress === 100) {
      // Small delay to ensure everything is visually ready
      const timer = setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power3.inOut",
            onComplete: () => {
              if (containerRef.current) {
                containerRef.current.style.display = 'none'
              }
            }
          })
        }
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [progress])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface"
    >
      <div className="flex w-64 flex-col gap-6 sm:w-80">
        {/* Animated Text */}
        <div className="flex justify-between text-xs font-medium tracking-[0.2em] text-primary">
          <span className="animate-pulse">RIFAT PORTFOLIO</span>
          <span>[ {Math.round(progress)}% ]</span>
        </div>

        {/* Progress Bar Container */}
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-surface-lighter/50">
          {/* Progress Bar Fill */}
          <div 
            className="absolute left-0 top-0 h-full bg-primary shadow-[0_0_15px_rgba(168,85,247,0.8)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
