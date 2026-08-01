import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
}

/** Full-page canvas particle network — floats behind all content. */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Respect user's reduced-motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const isMobile = window.innerWidth < 768
    const PARTICLE_COUNT = isMobile ? 35 : 80
    const MAX_DIST = isMobile ? 120 : 160
    // Pre-compute squared distance threshold — avoids sqrt in the O(n²) connection loop
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST
    const MOUSE_RADIUS = 120
    const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS
    // Mobile particles throttle to 30fps — humans can't perceive ambient bg particles at 60fps
    const FRAME_SKIP = isMobile ? 2 : 1
    let frameCount = 0

    let width = window.innerWidth
    let height = window.innerHeight
    let animId: number
    const mouse = { x: -9999, y: -9999 }

    // Accent colors matching design system
    const VIOLET_BRIGHT = '192, 132, 252'
    const CYAN   = '6, 182, 212'

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const makeParticles = (): Particle[] =>
      Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      }))

    resize()
    let particles = makeParticles()

    const onResize = () => {
      resize()
      particles = makeParticles()
    }
    window.addEventListener('resize', onResize)

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    if (!isMobile) window.addEventListener('mousemove', onMouseMove)

    // Scroll interaction
    let lastScrollY = window.scrollY
    let scrollVelocity = 0
    const onScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY
      scrollVelocity = delta * 0.05 // Adjust multiplier for stronger/weaker effect
      lastScrollY = currentScrollY

      // Apply push to all particles
      for (let i = 0; i < particles.length; i++) {
        // Scroll down pushes particles up (negative vy), scroll up pushes particles down (positive vy)
        particles[i].vy -= scrollVelocity 
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const draw = () => {
      animId = requestAnimationFrame(draw)

      // Frame throttle: skip odd frames on mobile to target 30fps for particles
      frameCount++
      if (frameCount % FRAME_SKIP !== 0) return

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse repel — uses sqrt since we need actual distance for force direction
        if (!isMobile) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const distSq = dx * dx + dy * dy
          if (distSq < MOUSE_RADIUS_SQ && distSq > 0) {
            const dist = Math.sqrt(distSq)  // sqrt only when within radius
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
            p.vx += (dx / dist) * force * 0.3
            p.vy += (dy / dist) * force * 0.3
          }
        }

        // Damping
        p.vx *= 0.98
        p.vy *= 0.98

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5
          p.vy = (p.vy / speed) * 1.5
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        const color = i % 4 === 0 ? CYAN : VIOLET_BRIGHT

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`
        ctx.fill()

        // Draw connecting lines — squared distance avoids Math.sqrt() in the hot path
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const distSq = dx * dx + dy * dy

          if (distSq < MAX_DIST_SQ) {
            // Only compute sqrt once per line actually drawn (not for every pair)
            const dist = Math.sqrt(distSq)
            const lineAlpha = (1 - dist / MAX_DIST) * 0.3
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${color}, ${lineAlpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      if (!isMobile) window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    />
  )
}
