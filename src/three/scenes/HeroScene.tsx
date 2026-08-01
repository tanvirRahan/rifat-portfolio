import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

import { Suspense, useState } from 'react'
import Room from './Room'
import Desk from './Desk'
import Coder from './Coder'
import Hologram from './Hologram'
import CameraRig from './CameraRig'
import IntroCamera from './IntroCamera'

/**
 * Root 3D Scene for the Hero section.
 * Shadows and antialias are disabled on mobile to maximize GPU performance.
 */
export default function HeroScene() {
  const [introComplete, setIntroComplete] = useState(false)
  // Detect mobile once at render — used to strip expensive GPU features
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <div className="h-full w-full absolute inset-0">
      <Canvas
        style={{ width: '100%', height: '100%', display: 'block' }}
        shadows={!isMobile} // Shadows disabled on mobile — removes entire shadow render pass
        dpr={[1, 1.5]}
        camera={{ position: [0, 6, 12], fov: 45 }}
        gl={{
          antialias: !isMobile, // Mobile tile GPUs gain ~20% from skipping MSAA
          alpha: true,
        }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          {!introComplete && <IntroCamera onComplete={() => setIntroComplete(true)} />}
          {introComplete && <OrbitControls target={[0, 2.5, -1]} enableZoom={false} enablePan={false} enableRotate={!isMobile} />}

          <Environment preset="night" />

          {/* LIGHTING */}
          <ambientLight intensity={1.2} color="#a855f7" />

          {/* Main directional light — shadow map smaller on desktop, none on mobile */}
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.5}
            color="#c084fc"
            castShadow={!isMobile}
            shadow-bias={-0.0001}
            shadow-mapSize={[512, 512]} // 512 is visually fine, 4× cheaper than 1024
          />

          <pointLight position={[10, 5, 5]} intensity={2.0} color="#7c3aed" distance={25} />
          <pointLight position={[0, 4, 6]} intensity={1.5} color="#e9d5ff" distance={15} />
          <pointLight position={[-5, 8, -3]} intensity={1.5} color="#a855f7" distance={15} />

          <CameraRig>
            <Room />
            <Desk />
            <Coder />
            <Hologram />
          </CameraRig>

        </Suspense>
      </Canvas>
    </div>
  )
}
