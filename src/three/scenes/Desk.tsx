import * as THREE from 'three'
import { MeshStandardMaterial } from 'three'
import { useMemo, useRef, useEffect } from 'react'
import Monitor from './Monitor'

/**
 * Main Desk Component containing the table, monitors, keyboard, and accessories.
 */
export default function Desk() {
  const deskMetalMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#222222',
    roughness: 0.6,
    metalness: 0.8,
  }), [])

  const deskWoodMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#1c1714',
    roughness: 0.9,
    metalness: 0.1,
  }), [])

  const keyboardMaterial = useMemo(() => new MeshStandardMaterial({
    color: '#111111',
    roughness: 0.8,
  }), [])

  // Pre-compute cable curve geometry once — prevents THREE object allocation every render
  const cable1Curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-0.5, 0, 0.2),
    new THREE.Vector3(0.2, 0, -0.1),
    new THREE.Vector3(1, 0, 0.3),
  ]), [])

  const cable2Curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(2, 0, -0.2),
    new THREE.Vector3(1.5, 0, 0.4),
    new THREE.Vector3(0.5, 0, 0.1),
    new THREE.Vector3(-0.2, 0, 0.6),
  ]), [])

  // Pre-compute the shared keycap geometry for instancing
  const keycapGeometry = useMemo(() => new THREE.BoxGeometry(0.08, 0.04, 0.08), [])
  const keycapMaterial = useMemo(() => new MeshStandardMaterial({ color: '#0f0f0f', roughness: 0.8 }), [])

  // InstancedMesh ref for 65 keycaps — 1 draw call instead of 65
  const keycapRef = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    if (!keycapRef.current) return
    const matrix = new THREE.Matrix4()
    let idx = 0

    // 4 main rows × 13 keys
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 13; col++) {
        matrix.setPosition(-0.65 + col * 0.1, 0.05, -0.2 + row * 0.1)
        keycapRef.current.setMatrixAt(idx++, matrix)
      }
    }
    // Bottom row (skip spacebar slots 3-8)
    for (let col = 0; col < 13; col++) {
      if (col >= 3 && col <= 8) continue
      matrix.setPosition(-0.65 + col * 0.1, 0.05, -0.2 + 0.4)
      keycapRef.current.setMatrixAt(idx++, matrix)
    }
    // Numpad 5×4
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 4; col++) {
        matrix.setPosition(-0.65 + 1.4 + col * 0.1, 0.05, -0.2 + row * 0.1)
        keycapRef.current.setMatrixAt(idx++, matrix)
      }
    }
    keycapRef.current.instanceMatrix.needsUpdate = true
    keycapRef.current.count = idx
  }, [])

  // Dummy code snippets for the monitors
  const centerCode = `function deployToProduction() {
  console.log("Initiating sequence...");
  const status = await checkSystems();
  if(status.ok) {
    executeProtocol('OMEGA');
  }
}
> System ready.
> _`

  const leftCode = `// SYSTEM DIAGNOSTICS
[OK] Memory allocation
[OK] Neural net sync
[WARN] Temperature 85C
> Analyzing data streams...
> 01010110 01101111
> 01101001 01100100`

  const rightCode = `const SERVER_IP = "192.168.1.1"
function bypassFirewall(ip) {
  // Inject payload
  inject(ip, PAYLOAD_HEX);
  return true;
}
> Access Granted.`

  return (
    <group position={[0, 0, -2]}>
      {/* Desk Top */}
      <mesh position={[0, 2, 0]} receiveShadow castShadow material={deskWoodMaterial}>
        <boxGeometry args={[10, 0.1, 3]} />
      </mesh>

      {/* Desk Legs */}
      <mesh position={[-4.5, 1, 0]} castShadow material={deskMetalMaterial}>
        <boxGeometry args={[0.2, 2, 2.5]} />
      </mesh>
      <mesh position={[4.5, 1, 0]} castShadow material={deskMetalMaterial}>
        <boxGeometry args={[0.2, 2, 2.5]} />
      </mesh>

      {/* Desk Lamp Light (Warm Spotlight) */}
      <spotLight
        position={[2, 4, 1]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={1.5}
        color="#ffd9a8"
        castShadow
        shadow-bias={-0.0001}
      />

      {/* Monitors */}
      {/* Center Curved Monitor */}
      <Monitor
        position={[0, 2.8, -0.8]}
        color="#00d4ff" // Cyan
        codeText={centerCode}
        isCurved={true}
        scale={[1.1, 1.1, 1.1]}
      />

      {/* Left Monitor */}
      <Monitor
        position={[-3.2, 2.7, -0.4]}
        rotation={[0, 0.4, 0]}
        color="#00ff66" // Green
        codeText={leftCode}
        scale={[0.9, 0.9, 0.9]}
      />

      {/* Right Monitor */}
      <Monitor
        position={[3.2, 2.7, -0.4]}
        rotation={[0, -0.4, 0]}
        color="#00d4ff" // Cyan
        codeText={rightCode}
        scale={[0.9, 0.9, 0.9]}
      />

      {/* --- Extended Desk Mat (Mousepad for both Keyboard & Mouse) --- */}
      <group position={[0.5, 2.052, 1.0]}>
        <mesh receiveShadow>
          <boxGeometry args={[2.4, 0.01, 0.8]} />
          <meshStandardMaterial color="#0a0a0a" roughness={1.0} />
        </mesh>
        {/* RGB Edge around the mat */}
        <mesh position={[0, -0.002, 0]}>
          <boxGeometry args={[2.42, 0.006, 0.82]} />
          <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* --- Realistic RGB Mechanical Keyboard --- */}
      <group position={[0, 2.057, 1.0]} rotation={[0.04, 0, 0]}>
        {/* Keyboard Base */}
        <mesh castShadow receiveShadow position={[0, 0.02, 0]}>
          <boxGeometry args={[1.5, 0.04, 0.55]} />
          <meshStandardMaterial color="#111111" roughness={0.7} metalness={0.5} />
        </mesh>

        {/* RGB Under-plate (Glows between keys) */}
        <mesh position={[0, 0.041, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.45, 0.5]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1.5} />
        </mesh>

        {/* Real Keycaps (Grid) */}
        {/* Single InstancedMesh for all keycaps — 65 keys in 1 draw call */}
        <instancedMesh
          ref={keycapRef}
          args={[keycapGeometry, keycapMaterial, 65]}
          castShadow
          position={[-0.65, 0, -0.2]}
        />
      </group>

      {/* --- Realistic RGB Gaming Mouse --- */}
      <group position={[1.3, 2.057, 1.0]}>
        {/* Mouse Body */}
        <mesh castShadow receiveShadow position={[0, 0.04, 0]}>
          <boxGeometry args={[0.15, 0.08, 0.25]} />
          <meshStandardMaterial color="#111111" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Scroll Wheel */}
        <mesh position={[0, 0.08, -0.08]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.02, 8]} />
          <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} />
        </mesh>

        {/* Mouse Side Grips */}
        <mesh position={[-0.08, 0.04, 0]}>
          <boxGeometry args={[0.02, 0.06, 0.15]} />
          <meshStandardMaterial color="#050505" roughness={0.9} />
        </mesh>
        <mesh position={[0.08, 0.04, 0]}>
          <boxGeometry args={[0.02, 0.06, 0.15]} />
          <meshStandardMaterial color="#050505" roughness={0.9} />
        </mesh>

        {/* Mouse RGB Strip (Bottom Edge) */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.16, 0.015, 0.26]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* Desk Accessory: Glowing Sci-Fi Plant (Replaces Coffee Mug) */}
      <group position={[-2.5, 2.0, 0.2]}>
        {/* Glowing Pot */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.08, 0.2, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#00d4ff" emissiveIntensity={2.5} />
        </mesh>

        {/* Spiky Sci-Fi Succulent Leaves */}
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh
            key={i}
            position={[0, 0.25, 0]}
            rotation={[
              Math.PI / 3.5,
              (i * Math.PI * 2) / 7,
              0
            ]}
            castShadow
          >
            {/* The actual leaf rotated to point outwards */}
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.03, 0.25, 4]} />
              <meshStandardMaterial color="#00ffcc" roughness={0.3} metalness={0.8} />
            </group>
          </mesh>
        ))}
        {/* Center Leaf (Standing straight up) */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <coneGeometry args={[0.04, 0.35, 4]} />
          <meshStandardMaterial color="#00ffcc" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Point light to cast a glow on the desk around the plant */}
        <pointLight position={[0, 0.1, 0]} color="#00d4ff" intensity={1.5} distance={2.0} />
      </group>

      {/* Removed the stack of books on the left side of the desk as requested */}

      {/* Organized Chaos: Headphones hanging off edge */}
      <group position={[4.6, 1.8, 0.5]} rotation={[0, 0, 0.2]}>
        {/* Headband */}
        <mesh castShadow material={deskMetalMaterial} position={[0, 0.3, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.25, 0.05, 16, 32, Math.PI]} />
        </mesh>
        {/* Ear cups */}
        <mesh castShadow material={keyboardMaterial} position={[-0.25, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        </mesh>
        <mesh castShadow material={keyboardMaterial} position={[0.25, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        </mesh>
      </group>

      {/* Scattered Cables — geometry pre-computed via useMemo, no allocation per render */}
      <group position={[0, 2.02, -0.5]}>
        <mesh receiveShadow castShadow>
          <tubeGeometry args={[cable1Curve, 20, 0.015, 8, false]} />
          <meshStandardMaterial color="#050505" roughness={0.9} />
        </mesh>
        {/* Glowing Data Cable */}
        <mesh receiveShadow castShadow>
          <tubeGeometry args={[cable2Curve, 20, 0.015, 8, false]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} roughness={0.5} />
        </mesh>
      </group>
    </group>
  )
}
