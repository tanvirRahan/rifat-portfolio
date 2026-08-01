import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, Group } from 'three'

/**
 * CameraRig adds a slow automatic orbit as an idle state,
 * and mouse-based parallax on top of it.
 * Mobile devices skip mouse parallax (pointer is always 0,0 on touch).
 */
export default function CameraRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null)
  // Detect mobile once — avoid checking window on every frame
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useFrame((state) => {
    if (!groupRef.current) return

    const t = state.clock.getElapsedTime()

    // Slow automatic orbit — Y axis only
    const orbitSpeed = 0.05
    const baseRotationY = Math.sin(t * orbitSpeed) * 0.2

    // Mouse parallax — only on desktop (touch devices have no meaningful pointer)
    const mouseInfluenceX = isMobile ? 0 : state.pointer.y * -0.1
    const mouseInfluenceY = isMobile ? 0 : state.pointer.x * -0.2

    const targetRotationX = MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseInfluenceX,
      0.05  // Reduced lerp factor — smoother, less CPU per frame
    )

    const targetRotationY = MathUtils.lerp(
      groupRef.current.rotation.y,
      baseRotationY + mouseInfluenceY,
      0.05  // Reduced lerp factor
    )

    groupRef.current.rotation.x = targetRotationX
    groupRef.current.rotation.y = targetRotationY
  })

  return <group ref={groupRef}>{children}</group>
}
