import { Text } from '@react-three/drei'
import { MeshStandardMaterial, PointLight, MeshBasicMaterial } from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

interface MonitorProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  color: string
  glowIntensity?: number
  codeText: string
  isCurved?: boolean
}

/**
 * Reusable Monitor Component for the Hacker Room.
 * Features a glowing screen with code text overlay.
 * Includes a subtle pulsing animation for realism.
 */
export default function Monitor({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  color,
  glowIntensity = 1.5,
  codeText,
  isCurved = false,
}: MonitorProps) {
  // Bezel material
  const plasticMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#050505',
    roughness: 0.8,
    metalness: 0.2,
  }), [])

  // Screen material (base dark color)
  const screenMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#000000',
    roughness: 0.2,
    metalness: 0.8,
  }), [])

  const lightRef = useRef<PointLight>(null)
  const textMatRef = useRef<MeshBasicMaterial>(null)

  // Subtle pulsing animation
  useFrame((state) => {
    if (!lightRef.current || !textMatRef.current) return

    // Create a gentle sine wave pulse based on time, offset by position X so monitors pulse slightly out of sync
    const time = state.clock.getElapsedTime()
    const offset = position[0] * 0.5
    const pulse = Math.sin(time * 2 + offset) * 0.15 + 0.85 // Oscillates between 0.7 and 1.0 multiplier

    lightRef.current.intensity = glowIntensity * pulse
    textMatRef.current.opacity = pulse
    textMatRef.current.transparent = true // Required for opacity to work
  })

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Stand Base */}
      <mesh position={[0, -0.6, -0.2]} material={plasticMaterial}>
        <boxGeometry args={[1, 0.05, 0.8]} />
      </mesh>

      {/* Stand Neck */}
      <mesh position={[0, -0.3, -0.3]} rotation={[0.2, 0, 0]} material={plasticMaterial}>
        <cylinderGeometry args={[0.05, 0.08, 0.6]} />
      </mesh>

      {/* Monitor Body/Bezel */}
      <mesh position={[0, 0, 0]} material={plasticMaterial} castShadow receiveShadow>
        <boxGeometry args={isCurved ? [3.8, 1.8, 0.2] : [3, 1.8, 0.2]} />
      </mesh>

      {/* Screen Surface */}
      <mesh position={[0, 0, 0.11]} material={screenMaterial}>
        <planeGeometry args={isCurved ? [3.6, 1.6] : [2.8, 1.6]} />
      </mesh>

      {/* Emissive Code Text Overlay */}
      <Text
        position={[0, 0, 0.12]}
        fontSize={0.08}
        color={color}
        maxWidth={isCurved ? 3.4 : 2.6}
        lineHeight={1.5}
        textAlign="left"
        anchorX="center"
        anchorY="middle"
      >
        {codeText}
        <meshBasicMaterial ref={textMatRef} attach="material" color={color} toneMapped={false} />
      </Text>

      {/* Screen Glow (Point Light) */}
      <pointLight ref={lightRef} position={[0, 0, 0.5]} intensity={glowIntensity} color={color} distance={4} decay={2} />
    </group>
  )
}
