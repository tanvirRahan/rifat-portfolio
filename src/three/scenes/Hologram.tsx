import { Text, Float, RoundedBox } from '@react-three/drei'
import { MeshStandardMaterial, MeshBasicMaterial } from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Holographic floating text displaying the coder's name.
 */
export default function Hologram() {
  // Hologram panel material (transparent, glowing violet)
  const panelMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#a855f7',
    emissive: '#a855f7',
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 0.12,
    wireframe: true,
  }), [])

  const textMatRef = useRef<MeshBasicMaterial>(null)

  // Subtle pulsing animation for the hologram text
  useFrame((state) => {
    if (!textMatRef.current) return
    const time = state.clock.getElapsedTime()
    // Pulse between 0.7 and 1.0 opacity
    const pulse = Math.sin(time * 1.5) * 0.15 + 0.85
    textMatRef.current.opacity = pulse
    textMatRef.current.transparent = true
  })

  return (
    <Float
      position={[0, 5.5, -2.5]} // Pushed further back as requested
      speed={2}
      rotationIntensity={0.1}
      floatIntensity={0.8}
      floatingRange={[-0.1, 0.1]}
    >
      <group scale={[1.2, 1.2, 1.2]}> {/* Scaled up slightly since it's further away */}
        {/* Hologram Base Panel */}
        <RoundedBox args={[4.2, 1.2, 0.05]} radius={0.1} smoothness={4} material={panelMaterial} />

        {/* Glowing Text */}
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.4}
          color="#c084fc"
          anchorX="center"
          anchorY="middle"
        >
          Tanvir Rahan Rifat
          <meshBasicMaterial ref={textMatRef} attach="material" color="#a855f7" toneMapped={false} />
        </Text>
      </group>
    </Float>
  )
}
