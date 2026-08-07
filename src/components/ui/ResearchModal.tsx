import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import type { Research } from '@/data/research'
import { useLenis } from 'lenis/react'

interface ResearchModalProps {
  research: Research | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResearchModal({ research, isOpen, onClose }: ResearchModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Reset image index when modal opens
  useEffect(() => {
    if (isOpen) setCurrentImageIndex(0)
  }, [isOpen, research])

  // Lock background scroll perfectly
  const lenis = useLenis()
  useEffect(() => {
    if (isOpen) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isOpen, lenis])

  /* Animated node-graph canvas for background */
  useEffect(() => {
    const canvas = canvasRef.current
    const overlay = overlayRef.current
    if (!canvas || !overlay || !isOpen) return

    const ctx = canvas.getContext('2d')!
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    type Node = { x: number; y: number; vx: number; vy: number }
    let nodes: Node[] = []
    let W = 0, H = 0
    const mouse = { x: null as number | null, y: null as number | null }
    let rafId: number

    const resize = () => {
      W = overlay.offsetWidth
      H = overlay.offsetHeight
      canvas.width = W * devicePixelRatio
      canvas.height = H * devicePixelRatio
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      const count = Math.max(24, Math.floor((W * H) / 30000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.1, vy: (Math.random() - 0.5) * 0.1,
      }))
    }

    const onMouseMove = (e: MouseEvent) => {
      const r = overlay.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    const onMouseLeave = () => { mouse.x = null; mouse.y = null }

    window.addEventListener('resize', resize)
    overlay.addEventListener('mousemove', onMouseMove)
    overlay.addEventListener('mouseleave', onMouseLeave)

    const LINK_DIST = 168
    const LINE_COLOR = 'rgba(41, 37, 36, 0.1)' 
    const NODE_COLOR = 'rgba(41, 37, 36, 0.25)' 

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
      overlay.removeEventListener('mousemove', onMouseMove)
      overlay.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [isOpen])

  // Automatic slideshow interval
  useEffect(() => {
    if (!isOpen || !research || research.details.images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % research.details.images.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [isOpen, research])

  useEffect(() => {
    if (isOpen && research) {
      // Entry animations
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power2.out'
      })

      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power3.out' }
      )
    } else {
      // Exit animations
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in'
      })
    }

    return () => {}
  }, [isOpen, research])

  if (!research) return null;

  return createPortal(
    <div 
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        opacity: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Backdrop Layer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(250, 247, 239, 0.95)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        zIndex: -1
      }} />

      {/* Node Canvas Background */}
      <canvas
        ref={canvasRef}
        className="modal-canvas"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      />

      <style>{`
        .modal-canvas {
          opacity: 0.8;
        }
        @media (max-width: 768px) {
          .modal-canvas {
            opacity: 0.3;
          }
        }
        .modal-grid {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 1.5rem 6rem 1.5rem;
          min-height: 100%;
        }
        @media (min-width: 1024px) {
          .modal-grid {
            grid-template-columns: 1fr 1fr;
            align-items: start;
            padding: 6rem 4rem 8rem 4rem;
            gap: 4rem;
          }
        }
        .modal-slideshow {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 12px;
          overflow: hidden;
          background: #f5f5f5;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .modal-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .modal-image.active {
          opacity: 1;
        }
        .modal-left {
          position: relative;
        }
        @media (min-width: 1024px) {
          .modal-left {
            position: sticky;
            top: 6rem;
          }
        }
        .modal-right {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .research-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 4px;
          background: rgba(230, 57, 70, 0.1);
          color: var(--color-accent);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .research-author {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-ink);
          margin-top: -0.5rem;
        }
        .research-dept {
          font-size: 0.95rem;
          color: var(--color-body);
          margin-top: -0.5rem;
          font-style: italic;
        }
        .stat-block {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.05);
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transition: transform 0.3s ease;
        }
        .stat-block:hover {
          transform: translateY(-2px);
        }
        .stat-metric {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-accent);
          line-height: 1;
          margin-bottom: 0.5rem;
        }
      `}</style>

      {/* Fixed Close Button (Outside scroll container to guarantee it never scrolls away) */}
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 100,
          pointerEvents: 'auto',
          background: 'var(--color-ink)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'
          e.currentTarget.style.background = 'var(--color-accent)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
          e.currentTarget.style.background = 'var(--color-ink)'
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      {/* Scrollable Content Container */}
      <div 
        data-lenis-prevent="true"
        style={{
          position: 'absolute',
          inset: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          zIndex: 10,
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div ref={contentRef} className="modal-grid">
          
          {/* LEFT COLUMN: Sticky Slideshow */}
          <div className="modal-left">
            <div className="modal-slideshow">
              {research.details.images.map((img, i) => (
                <img 
                  key={i}
                  src={img} 
                  alt={`${research.title} Screenshot ${i + 1}`}
                  className={`modal-image ${i === currentImageIndex ? 'active' : ''}`}
                />
              ))}
            </div>
            
            {/* Dots indicator */}
            {research.details.images.length > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
                {research.details.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: i === currentImageIndex ? 'var(--color-accent)' : 'rgba(41, 37, 36, 0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease'
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Details */}
          <div className="modal-right">
            <div>
              <span className="research-badge">{research.badge}</span>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 700, 
                color: 'var(--color-ink)',
                lineHeight: 1.2,
                marginBottom: '1rem'
              }}>
                {research.title}
              </h2>
              
              <div className="research-author">{research.author}</div>
              <div className="research-dept">{research.department}</div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {research.techStack.map((tech, i) => (
                <span key={i} style={{
                  padding: '6px 14px',
                  background: 'rgba(41, 37, 36, 0.05)',
                  border: '1px solid rgba(41, 37, 36, 0.1)',
                  borderRadius: '30px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {tech.icon && (
                    <img 
                      src={tech.icon} 
                      alt="" 
                      style={{ width: '14px', height: '14px', objectFit: 'contain' }}
                    />
                  )}
                  {tech.name}
                </span>
              ))}
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '1rem', borderBottom: '2px solid rgba(0,0,0,0.1)', paddingBottom: '0.5rem' }}>
                I. Abstract
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {research.details.abstract.map((paragraph, i) => (
                  <p key={i} style={{
                    fontSize: '15.5px',
                    lineHeight: 1.8,
                    color: 'var(--color-body)',
                    margin: 0
                  }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '1rem', borderBottom: '2px solid rgba(0,0,0,0.1)', paddingBottom: '0.5rem' }}>
                II. Architecture & Methodology
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {research.details.methodologies.map((item, i) => (
                  <li key={i} style={{ position: 'relative', paddingLeft: '20px' }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '10px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-accent)'
                    }} />
                    <strong style={{ color: 'var(--color-ink)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                      {item.title}
                    </strong>
                    <span style={{ color: 'var(--color-body)', fontSize: '15px', lineHeight: 1.6 }}>
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '1.5rem', borderBottom: '2px solid rgba(0,0,0,0.1)', paddingBottom: '0.5rem' }}>
                III. Key Findings
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {research.details.findings.map((item, i) => (
                  <div key={i} className="stat-block">
                    {item.metric && <div className="stat-metric">{item.metric}</div>}
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '0.5rem' }}>
                      {item.title}
                    </h4>
                    <p style={{ color: 'var(--color-body)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>,
    document.body
  )
}
