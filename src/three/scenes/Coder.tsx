import { MeshStandardMaterial } from 'three'
import { useMemo } from 'react'
import { Sparkles, Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

/**
 * Low-Poly Faceted Humanoid Coder Character.
 * Perfectly proportioned and mathematically posed to sit at the desk.
 * Built to exactly match the sleek, dark, low-poly reference image.
 */
export default function Coder() {
  // Detect mobile to reduce GPU load — no sparkles on small screens
  const { viewport } = useThree()
  const isMobile = viewport.width < 6  // R3F viewport units, ~768px breakpoint
  const lowPolyMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#0a0a0a', // Deep dark grey/black
    roughness: 0.2,
    metalness: 0.8,
    flatShading: true,
  }), [])

  const helmetMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#050505',
    roughness: 0.1,
    metalness: 0.8,
  }), [])

  const visorMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#ff003c',
    emissive: '#ff003c',
    emissiveIntensity: 2.5,
    toneMapped: false,
  }), [])

  const chairMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#1e1e24',
    roughness: 0.6,
    metalness: 0.5,
  }), [])

  const accentMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#333333',
    roughness: 0.5,
    metalness: 0.8,
  }), [])

  return (
    <group position={[0, -0.1, -1.5]} scale={[1.05, 1.05, 1.05]}>

      {/* --- CHARACTER LIGHTING --- */}
      <pointLight position={[0, 3.0, 0.5]} intensity={1.2} color="#a855f7" distance={3} decay={2} />
      <pointLight position={[-1.5, 2.8, 0.8]} intensity={2.5} color="#ffd9a8" distance={4} decay={2} />
      <spotLight position={[0, 5, 4]} intensity={6} color="#c084fc" distance={10} angle={0.8} penumbra={0.5} />

      {/* --- REALISTIC GAMING CHAIR --- */}
      <group position={[0, 0, 0.35]}>
        {/* Seat Cushion */}
        <mesh position={[0, 0.95, 1.1]} receiveShadow castShadow material={chairMaterial}>
          <boxGeometry args={[1.8, 0.15, 1.4]} />
        </mesh>
        {/* Backrest (Properly angled and positioned for back support) */}
        <mesh position={[0, 2.2, 1.7]} castShadow receiveShadow material={chairMaterial}>
          <boxGeometry args={[1.8, 2.6, 0.2]} />
          
          {/* Glowing Sci-Fi Quote on the back of the chair */}
          <Text
            position={[0, 0.6, 0.11]} // Placed slightly outside the back face
            fontSize={0.16}
            letterSpacing={0.15}
            anchorX="center"
            anchorY="middle"
          >
            VOID
            <meshBasicMaterial attach="material" color="#00ffcc" toneMapped={false} />
          </Text>
          <Text
            position={[0, 0.35, 0.11]} 
            fontSize={0.24}
            letterSpacing={0.2}
            anchorX="center"
            anchorY="middle"
          >
            OBSERVER
            <meshBasicMaterial attach="material" color="#00ffcc" toneMapped={false} />
          </Text>
        </mesh>
        {/* Armrests */}
        <mesh position={[-1.0, 1.6, 1.0]} castShadow material={accentMaterial}><boxGeometry args={[0.2, 0.1, 0.8]} /></mesh>
        <mesh position={[1.0, 1.6, 1.0]} castShadow material={accentMaterial}><boxGeometry args={[0.2, 0.1, 0.8]} /></mesh>
        {/* Armrest Pillars */}
        <mesh position={[-1.0, 1.25, 1.0]} castShadow material={accentMaterial}><cylinderGeometry args={[0.05, 0.05, 0.6]} /></mesh>
        <mesh position={[1.0, 1.25, 1.0]} castShadow material={accentMaterial}><cylinderGeometry args={[0.05, 0.05, 0.6]} /></mesh>
        {/* Base */}
        <mesh position={[0, 0.5, 1.2]} castShadow material={accentMaterial}><cylinderGeometry args={[0.08, 0.1, 0.9]} /></mesh>
        <mesh position={[0, 0.05, 1.2]} castShadow material={accentMaterial}><cylinderGeometry args={[0.8, 0.8, 0.1, 8]} /></mesh>
      </group>

      {/* --- CHARACTER (LOW-POLY FACETED HUMAN) --- */}
      <group position={[0, 0, 0]}>
        
        {/* Sci-Fi Particles — reduced on desktop, disabled on mobile to prevent overdraw */}
        <Sparkles 
          position={[0, 3.0, 1.0]} 
          count={isMobile ? 0 : 40} 
          scale={[4, 4, 4]} 
          size={2.0} 
          color="#06b6d4" 
          speed={0.5} 
          opacity={0.8} 
        />

        {/* Torso */}
        <mesh position={[0, 2.15, 1.35]} rotation={[0.15, 0, 0]} scale={[1, 1, 0.5]} castShadow receiveShadow material={lowPolyMaterial}>
          {/* A squashed 6-sided cylinder for a broad, faceted chest that doesn't clip the chair */}
          <cylinderGeometry args={[0.7, 0.5, 2.4, 6]} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 3.4, 1.2]} rotation={[0.15, 0, 0]} castShadow receiveShadow material={lowPolyMaterial}>
          <cylinderGeometry args={[0.15, 0.2, 0.4, 6]} />
        </mesh>

        {/* Head (Dark Helmet/Mask with Glowing Visor) */}
        <group position={[0, 3.9, 1.1]} rotation={[0.1, 0, 0]}>
          <mesh castShadow receiveShadow material={helmetMaterial}>
            <sphereGeometry args={[0.45, 32, 32]} />
          </mesh>
          {/* Glowing Cyber Visor (Placed on the front of the face, z is towards -z) */}
          <mesh position={[0, 0, -0.42]} material={visorMaterial}>
            <boxGeometry args={[0.6, 0.12, 0.1]} />
          </mesh>
        </group>

        {/* --- LEFT ARM --- */}
        {/* Shoulder Joint */}
        <mesh position={[-0.9, 3.2, 1.2]} castShadow material={lowPolyMaterial}><icosahedronGeometry args={[0.25, 1]} /></mesh>
        {/* Upper Arm */}
        <mesh position={[-0.9, 2.65, 1.1]} rotation={[0.18, 0, 0]} castShadow material={lowPolyMaterial}>
          <cylinderGeometry args={[0.18, 0.15, 1.11, 6]} />
        </mesh>
        {/* Elbow Joint */}
        <mesh position={[-0.9, 2.1, 1.0]} castShadow material={lowPolyMaterial}><icosahedronGeometry args={[0.2, 1]} /></mesh>
        {/* Forearm */}
        <mesh position={[-0.6, 2.1, 0.6]} rotation={[Math.PI / 2, -0.64, 0]} castShadow material={lowPolyMaterial}>
          <cylinderGeometry args={[0.15, 0.12, 1.0, 6]} />
        </mesh>
        {/* Hand */}
        <mesh position={[-0.3, 2.1, 0.2]} castShadow material={lowPolyMaterial}><icosahedronGeometry args={[0.18, 1]} /></mesh>

        {/* --- RIGHT ARM --- */}
        {/* Shoulder Joint */}
        <mesh position={[0.9, 3.2, 1.2]} castShadow material={lowPolyMaterial}><icosahedronGeometry args={[0.25, 1]} /></mesh>
        {/* Upper Arm */}
        <mesh position={[0.9, 2.65, 1.1]} rotation={[0.18, 0, 0]} castShadow material={lowPolyMaterial}>
          <cylinderGeometry args={[0.18, 0.15, 1.11, 6]} />
        </mesh>
        {/* Elbow Joint */}
        <mesh position={[0.9, 2.1, 1.0]} castShadow material={lowPolyMaterial}><icosahedronGeometry args={[0.2, 1]} /></mesh>
        {/* Forearm */}
        <mesh position={[0.6, 2.1, 0.6]} rotation={[Math.PI / 2, 0.64, 0]} castShadow material={lowPolyMaterial}>
          <cylinderGeometry args={[0.15, 0.12, 1.0, 6]} />
        </mesh>
        {/* Hand */}
        <mesh position={[0.3, 2.1, 0.2]} castShadow material={lowPolyMaterial}><icosahedronGeometry args={[0.18, 1]} /></mesh>

        {/* --- LEFT LEG --- */}
        {/* Hip Joint */}
        <mesh position={[-0.4, 1.2, 1.4]} castShadow material={lowPolyMaterial}><icosahedronGeometry args={[0.25, 1]} /></mesh>
        {/* Thigh */}
        <mesh position={[-0.4, 1.2, 0.8]} rotation={[Math.PI / 2, 0, 0]} castShadow material={lowPolyMaterial}>
          <cylinderGeometry args={[0.2, 0.18, 1.2, 6]} />
        </mesh>
        {/* Knee Joint */}
        <mesh position={[-0.4, 1.2, 0.2]} castShadow material={lowPolyMaterial}><icosahedronGeometry args={[0.2, 1]} /></mesh>
        {/* Calf */}
        <mesh position={[-0.4, 0.65, 0.2]} castShadow material={lowPolyMaterial}>
          <cylinderGeometry args={[0.18, 0.15, 1.1, 6]} />
        </mesh>
        {/* Foot */}
        <mesh position={[-0.4, 0.1, 0.3]} castShadow material={lowPolyMaterial}>
          <boxGeometry args={[0.25, 0.2, 0.5]} />
        </mesh>

        {/* --- RIGHT LEG --- */}
        {/* Hip Joint */}
        <mesh position={[0.4, 1.2, 1.4]} castShadow material={lowPolyMaterial}><icosahedronGeometry args={[0.25, 1]} /></mesh>
        {/* Thigh */}
        <mesh position={[0.4, 1.2, 0.8]} rotation={[Math.PI / 2, 0, 0]} castShadow material={lowPolyMaterial}>
          <cylinderGeometry args={[0.2, 0.18, 1.2, 6]} />
        </mesh>
        {/* Knee Joint */}
        <mesh position={[0.4, 1.2, 0.2]} castShadow material={lowPolyMaterial}><icosahedronGeometry args={[0.2, 1]} /></mesh>
        {/* Calf */}
        <mesh position={[0.4, 0.65, 0.2]} castShadow material={lowPolyMaterial}>
          <cylinderGeometry args={[0.18, 0.15, 1.1, 6]} />
        </mesh>
        {/* Foot */}
        <mesh position={[0.4, 0.1, 0.3]} castShadow material={lowPolyMaterial}>
          <boxGeometry args={[0.25, 0.2, 0.5]} />
        </mesh>

      </group>
    </group>
  )
}
