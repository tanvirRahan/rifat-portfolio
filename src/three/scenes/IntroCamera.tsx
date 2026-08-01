import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function IntroCamera({ onComplete, isMobile }: { onComplete: () => void, isMobile: boolean }) {
  const { camera } = useThree()
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    // Start position: zoomed in close to the keyboard/coder, slightly to the side
    camera.position.set(-4, 3, 1)

    // Animate to the final normal position [0, 6, 12] on Desktop, or [-2, 7, 18] on Mobile
    // The fast rotation effect happens naturally as it interpolates from the side back to center/angled!
    gsap.to(camera.position, {
      x: isMobile ? -2 : 0,
      y: isMobile ? 7 : 6,
      z: isMobile ? 18 : 12,
      duration: 3.0,
      ease: "power4.inOut", // Very cinematic, starts slow, goes fast, ends extremely smooth
      delay: 0.5, // Wait a tiny bit after preloader fades
      onComplete: () => {
        onComplete() // Enable OrbitControls when done!
      }
    })
  }, [camera, onComplete, isMobile])

  // Constantly force the camera to look at the Coder/Keyboard during the flight
  useFrame(() => {
    camera.lookAt(0, 2.5, -1)
  })

  return null
}
