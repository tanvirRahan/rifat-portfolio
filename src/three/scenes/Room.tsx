import { MeshStandardMaterial } from 'three'
import { useMemo } from 'react'

/** 
 * Room Geometry: Floor, Walls, Ceiling, and Window frame.
 */
export default function Room() {
  // Pre-define materials for performance
  const floorMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#1a1a1a',
    roughness: 0.2,
    metalness: 0.8,
  }), [])

  const wallMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#0f0f0f',
    roughness: 0.9,
    metalness: 0.1,
  }), [])

  const ceilingMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#0a0a0a',
    roughness: 1,
    metalness: 0,
  }), [])

  const windowFrameMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#111111',
    roughness: 0.5,
    metalness: 0.8,
  }), [])

  const glassMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#000000',
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.3,
  }), [])

  return (
    <group name="room">
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow material={floorMaterial}>
        <planeGeometry args={[100, 100]} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 10, 0]} material={ceilingMaterial}>
        <planeGeometry args={[30, 30]} />
      </mesh>

      {/* --- ADDED BACKGROUND DENSITY --- */}
      {/* Poster / Artwork on right wall */}
      <group position={[14.8, 4, -4]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 4, 0.1]} />
          <meshStandardMaterial color="#111" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.8, 3.8]} />
          <meshStandardMaterial color="#1a1a2e" emissive="#00d4ff" emissiveIntensity={0.05} />
        </mesh>
      </group>

      {/* Sci-Fi Server / Storage Crates in left corner (Cinematic RGB) */}
      <group position={[-8, 0, -8]}>
        {/* Main large crate */}
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
          <boxGeometry args={[1.5, 1, 1.2]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
        {/* LED Strip on large crate (Cyan) */}
        <mesh position={[0.76, 0.8, 0]}>
          <boxGeometry args={[0.02, 0.1, 1.0]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={2} />
        </mesh>

        {/* Medium crate on top */}
        <mesh castShadow receiveShadow position={[0.2, 1.3, -0.1]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[1.2, 0.6, 1]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        {/* LED Strip on medium crate (Magenta) */}
        <mesh position={[0.8, 1.4, 0.1]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.02, 0.05, 0.8]} />
          <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={2} />
        </mesh>

        {/* Small crate on the side */}
        <mesh castShadow receiveShadow position={[1.5, 0.4, 0.5]} rotation={[0, -0.1, 0]}>
          <boxGeometry args={[1, 0.8, 1]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>
        {/* LED Strip on small crate (Blue) */}
        <mesh position={[2.01, 0.6, 0.5]} rotation={[0, -0.1, 0]}>
          <boxGeometry args={[0.02, 0.05, 0.6]} />
          <meshStandardMaterial color="#0055ff" emissive="#0055ff" emissiveIntensity={2} />
        </mesh>

        {/* A soft point light to cast a subtle RGB cinematic glow on the nearby wall/floor */}
        <pointLight position={[1.5, 1.5, 1]} intensity={0.5} color="#00d4ff" distance={5} />
      </group>

      {/* Back Wall */}
      <mesh position={[0, 5, -10]} receiveShadow material={wallMaterial}>
        <boxGeometry args={[30, 10, 0.5]} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-15, 5, 0]} receiveShadow material={wallMaterial}>
        <boxGeometry args={[0.5, 10, 30]} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[15, 5, 0]} receiveShadow material={wallMaterial}>
        <boxGeometry args={[0.5, 10, 30]} />
      </mesh>

      {/* Window Frame on Left Wall */}
      <group position={[-14.7, 5, 0]}>
        {/* Frame */}
        <mesh material={windowFrameMaterial}>
          <boxGeometry args={[0.2, 6, 8]} />
        </mesh>

        {/* Glass panes */}
        <mesh position={[0.1, 0, 0]} material={glassMaterial}>
          <planeGeometry args={[8, 6]} />
        </mesh>

        {/* Window mullions (crossbars) */}
        <mesh position={[0.1, 0, 0]} material={windowFrameMaterial}>
          <boxGeometry args={[0.05, 6, 0.1]} />
        </mesh>
        <mesh position={[0.1, 0, 0]} material={windowFrameMaterial}>
          <boxGeometry args={[0.05, 0.1, 8]} />
        </mesh>
      </group>
    </group>
  )
}
