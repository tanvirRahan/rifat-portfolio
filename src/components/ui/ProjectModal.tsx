import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import type { Project } from '@/data/projects'
import { useLenis } from 'lenis/react'

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Reset image index when modal opens
  useEffect(() => {
    if (isOpen) setCurrentImageIndex(0)
  }, [isOpen, project])

  // Lock background scroll perfectly
  const lenis = useLenis()
  useEffect(() => {
    if (isOpen) {
      lenis?.stop()
      // Fallback for mobile native scroll
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

  // Automatic slideshow interval
  useEffect(() => {
    if (!isOpen || !project || project.details.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % project.details.images.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [isOpen, project])

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

  useEffect(() => {
    if (isOpen && project) {
      // Entry animations
      const tl = gsap.timeline()
      
      tl.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power3.out'
      })
      
      tl.fromTo(contentRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        "-=0.2"
      )

    } else {
      // Exit animations
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.3,
          ease: 'power3.in'
        })
      }
    }

    return () => {}
  }, [isOpen, project])

  if (!project) return null;

  return createPortal(
    <div 
      ref={overlayRef}
      data-lenis-prevent="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(250, 247, 239, 0.95)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
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
          gap: 3rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 6rem 2rem;
        }

        .modal-left {
          display: flex;
          flex-direction: column;
        }

        .modal-right {
          display: flex;
          flex-direction: column;
        }

        .modal-slideshow {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 24px 48px -12px rgba(0,0,0,0.1);
          background: var(--color-surface);
        }

        @media (min-width: 1024px) {
          .modal-grid {
            grid-template-columns: 1fr 1fr;
            align-items: start;
            padding: 0 4rem 8rem 4rem;
            gap: 4rem;
          }

          .modal-left {
            position: sticky;
            top: 6rem;
            /* Ensures the sticky column doesn't exceed viewport height causing scrolling issues */
            height: fit-content;
          }
        }

        @media (max-width: 1023px) {
          .modal-grid {
            padding-top: 1rem;
          }
          .modal-slideshow {
            max-height: 50vh;
          }
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
          WebkitOverflowScrolling: 'touch',
          paddingTop: '60px' // Space for the close button
        }}
      >
        <div ref={contentRef} className="modal-grid">
          
          {/* LEFT COLUMN: Sticky Slideshow */}
        <div className="modal-left">
          <div className="modal-slideshow">
            {project.details.images.map((img, i) => (
              <img 
                key={i}
                src={img} 
                alt={`${project.title} preview ${i+1}`} 
                style={{ 
                  position: 'absolute',
                  inset: 0,
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  opacity: currentImageIndex === i ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out'
                }} 
              />
            ))}

            {/* Dots Indicator */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
              zIndex: 10,
              background: 'rgba(0,0,0,0.25)',
              padding: '8px 12px',
              borderRadius: '20px',
              backdropFilter: 'blur(8px)'
            }}>
              {project.details.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: currentImageIndex === i ? '#fff' : 'rgba(255,255,255,0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Scrollable Content */}
        <div className="modal-right">
          
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(32px, 4vw, 56px)', 
            fontWeight: 600, 
            color: 'var(--color-ink)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem'
          }}>
            {project.title}
          </h2>

          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            flexWrap: 'wrap',
            marginBottom: '4rem'
          }}>
            {project.liveLink && (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  padding: '14px 28px', 
                  fontSize: '14px', 
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  background: 'var(--color-accent, #E63946)', 
                  color: '#fff',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 14px rgba(230, 57, 70, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(230, 57, 70, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(230, 57, 70, 0.3)'
                }}
              >
                Visit Live Site
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>
            )}
            {project.githubLink && (
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  padding: '14px 28px', 
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  background: 'rgba(0,0,0,0.04)', 
                  color: 'var(--color-ink)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
                }}
              >
                Source Code
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17 0-1.5-.5-2.73-1.3-3.7.13-.32.6-1.74-.13-3.6 0 0-1.1-.35-3.6 1.35a12.8 12.8 0 0 0-6.6 0c-2.5-1.7-3.6-1.35-3.6-1.35-.73 1.86-.26 3.28-.13 3.6-.8.97-1.3 2.2-1.3 3.7 0 5.75 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8 18v4"></path></svg>
              </a>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '1.5rem', color: 'var(--color-ink)' }}>Overview</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {project.details.overview.map((para, i) => (
                  <p key={i} style={{ fontSize: '16.5px', lineHeight: 1.8, color: 'var(--color-body)' }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '1.5rem', color: 'var(--color-ink)' }}>Key Features</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingLeft: '0', margin: 0, listStyle: 'none' }}>
                {project.details.features.map((feature, i) => {
                  const [title, desc] = feature.split(': ')
                  return (
                    <li key={i} style={{ 
                      fontSize: '16.5px', 
                      lineHeight: 1.8, 
                      color: 'var(--color-body)',
                      position: 'relative',
                      paddingLeft: '1.5rem'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '10px',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--color-accent)'
                      }} />
                      <strong style={{ color: 'var(--color-ink)', fontWeight: 600 }}>{title}:</strong> {desc}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

        </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
