import { useEffect, useRef } from 'react'

/** Hero / Home section — name left + roles + social icons, circular photo right. */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  /* Animated node-graph canvas */
  useEffect(() => {
    const canvas = canvasRef.current
    const hero = heroRef.current
    if (!canvas || !hero) return

    const ctx = canvas.getContext('2d')!
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    type Node = { x: number; y: number; vx: number; vy: number }
    let nodes: Node[] = []
    let W = 0, H = 0
    const mouse = { x: null as number | null, y: null as number | null }
    let rafId: number

    const resize = () => {
      W = hero.offsetWidth
      H = hero.offsetHeight
      canvas.width = W * devicePixelRatio
      canvas.height = H * devicePixelRatio
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      const count = Math.max(24, Math.floor((W * H) / 26000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.13, vy: (Math.random() - 0.5) * 0.13,
      }))
    }

    const onMouseMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    const onMouseLeave = () => { mouse.x = null; mouse.y = null }

    window.addEventListener('resize', resize)
    hero.addEventListener('mousemove', onMouseMove)
    hero.addEventListener('mouseleave', onMouseLeave)

    const LINK_DIST = 168
    const LINE_COLOR = 'rgba(41, 37, 36, 0.12)' /* Sophisticated graphite lines */
    const NODE_COLOR = 'rgba(41, 37, 36, 0.35)' /* Sophisticated graphite nodes */

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - n.x, dy = mouse.y - n.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) { n.x += dx / d * 0.5; n.y += dy / d * 0.5 }
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DIST) {
            ctx.strokeStyle = LINE_COLOR
            ctx.globalAlpha = 1 - dist / LINK_DIST
            ctx.lineWidth = 1.2
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
      ctx.fillStyle = NODE_COLOR
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduceMotion) rafId = requestAnimationFrame(draw)
    }

    resize(); draw()

    return () => {
      window.removeEventListener('resize', resize)
      hero.removeEventListener('mousemove', onMouseMove)
      hero.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        minHeight: 'calc(100vh - 68px)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '5rem',
        paddingBottom: '5rem',
      }}
    >
      {/* Node canvas background */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      />
      {/* Radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 55% 50%, rgba(176,40,30,0.045), transparent 65%)', pointerEvents: 'none', zIndex: 1 }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div
          className="hero-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '5rem' }}
        >

          {/* ── Left: Content ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* "Hi, I'm" tag */}
            <p className="hero-greeting" style={{
              fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--color-muted)',
              display: 'flex', alignItems: 'center', gap: '8px',
              marginBottom: '1.1rem',
              animation: 'fade-up .55s ease forwards', opacity: 0,
            }}>
              <span className="hero-greeting-line" style={{ width: '20px', height: '1px', background: 'var(--color-accent)', display: 'inline-block', flexShrink: 0 }} />
              Hi, I'm
            </p>

            {/* Full name */}
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: 'clamp(38px, 6vw, 82px)',
              lineHeight: 1.02, letterSpacing: '-0.02em',
              color: 'var(--color-ink)',
              marginBottom: '1.4rem',
              animation: 'fade-up .7s ease .08s forwards', opacity: 0,
            }}>
              <span className="kinetic-text">Tanvir</span> <span className="kinetic-text">Rahan</span><br />
              <span className="kinetic-text" style={{ color: '#B0281E' }}>Rifat</span>
            </h1>

            {/* Role line — separator dots like reference */}
            <p className="hero-sub" style={{
              fontFamily: 'var(--font-mono)', fontSize: '13px', textTransform: 'uppercase',
              letterSpacing: '0.12em', color: 'var(--color-body)',
              marginTop: '1.5rem', marginBottom: '2.5rem',
              animation: 'fade-up .7s ease .12s forwards', opacity: 0,
            }}>
              <span className="kinetic-text">Software Developer</span> &nbsp;|&nbsp; <span className="kinetic-text">AI Agents & ML Engineer</span> &nbsp;|&nbsp; <span className="kinetic-text">Data Automation</span>
            </p>

            {/* Location */}
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-muted)',
              letterSpacing: '0.06em', marginBottom: '1.25rem',
              display: 'flex', alignItems: 'center', gap: '8px',
              animation: 'fade-up .7s ease .20s forwards', opacity: 0,
            }}>
              <span>🇧🇩</span> Dhaka, Bangladesh
            </p>

            {/* CTA buttons */}
            <div style={{
              display: 'flex', gap: '1rem', flexWrap: 'wrap',
              marginBottom: '2.75rem',
              animation: 'fade-up .7s ease .24s forwards', opacity: 0,
            }}>
              <button onClick={() => scrollTo('work')} className="btn btn-primary" data-cursor="View">
                View Projects →
              </button>
              <a href="/cv/Rifat_Cv_Main.pdf" download="Rifat_Cv_Main.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" data-cursor="Download" style={{ textDecoration: 'none' }}>
                Download CV
              </a>
            </div>

            {/* Social icon links */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1.75rem',
              animation: 'fade-up .7s ease .32s forwards', opacity: 0,
            }}>
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  style={{ color: 'var(--color-muted)', transition: 'color .2s ease, transform .2s ease', display: 'flex', alignItems: 'center' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-ink)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Magazine Portrait Photo ── */}
          <div
            className="hero-photo-wrap kinetic-photo"
            style={{
              width: 'clamp(220px, 26vw, 340px)',
              aspectRatio: '3 / 4',
              borderRadius: '16px', // soft corners
              overflow: 'hidden',
              background: 'var(--color-surface)',
              boxShadow: '0 24px 48px -12px rgba(0,0,0,0.08)', // elegant subtle pop
              flexShrink: 0,
              animation: 'fade-up .85s ease .1s forwards', opacity: 0,
            }}
          >
            <img
              src="/profile.jpg"
              alt="Tanvir Rahan Rifat"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 820px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; gap: 2.5rem !important; }
          .hero-photo-wrap { width: clamp(160px, 45vw, 240px) !important; margin: 0 auto; order: -1; }
          .hero-grid > div:first-child { align-items: center; }
          .hero-grid p, .hero-grid div { justify-content: center; }
          .hero-greeting-line { display: none !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── Social links ─────────────────────────────────────────── */
const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/tanvirRahan',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17 0-1.5-.5-2.73-1.3-3.7.13-.32.6-1.74-.13-3.6 0 0-1.1-.35-3.6 1.35a12.8 12.8 0 0 0-6.6 0c-2.5-1.7-3.6-1.35-3.6-1.35-.73 1.86-.26 3.28-.13 3.6-.8.97-1.3 2.2-1.3 3.7 0 5.75 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8 18v4" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tanvirrahanrifat/',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:tanvirrahanrifat@gmail.com',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/home',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]
