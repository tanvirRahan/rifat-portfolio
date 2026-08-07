import { useRef, useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import emailjs from '@emailjs/browser'

// EmailJS credentials
const EMAILJS_SERVICE_ID  = 'service_2zsi6dq'
const EMAILJS_TEMPLATE_ID = 'template_huzov74'
const EMAILJS_PUBLIC_KEY  = 'zvVdfMS9fhnLqFTM2'

/** Contact section — 2-column grid: copy + form. Editorial style matching prototype. */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const formRef    = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  /* Animated node-graph canvas for Contact section (denser) */
  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext('2d')!
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    type Node = { x: number; y: number; vx: number; vy: number }
    let nodes: Node[] = []
    let W = 0, H = 0
    const mouse = { x: null as number | null, y: null as number | null }
    let rafId: number

    const resize = () => {
      W = section.offsetWidth
      H = section.offsetHeight
      canvas.width = W * devicePixelRatio
      canvas.height = H * devicePixelRatio
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      
      // Denser particles for Contact section (12000 instead of 26000)
      const count = Math.max(30, Math.floor((W * H) / 12000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
      }))
    }

    const onMouseMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    const onMouseLeave = () => { mouse.x = null; mouse.y = null }

    window.addEventListener('resize', resize)
    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)

    const LINK_DIST = 150
    const LINE_COLOR = 'rgba(41, 37, 36, 0.15)' 
    const NODE_COLOR = 'rgba(41, 37, 36, 0.4)'

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
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  /* Scroll reveal */
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>('.reveal') ?? []
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in-view')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      formRef.current.reset()
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" ref={sectionRef} data-num="06" className="section-pad hairline-top" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Node canvas background */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      />
      
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>

        <div className="section-head reveal">
          <div className="section-label">06 — Contact</div>
          <h2 className="kinetic-text">Let's work together.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '4rem' }} className="contact-grid reveal">

          {/* Left — copy */}
          <div>
            <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--color-body)', maxWidth: '44ch' }}>
              Open to full-stack, AI/ML, and automation work. Best way to reach me is email — I read everything.
            </p>
            <a
              href="mailto:tanvirrahanrifat@gmail.com"
              data-cursor="Email"
              style={{ display: 'block', marginTop: '2rem', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(20px,2.4vw,28px)', color: 'var(--color-ink)', letterSpacing: '-0.01em', width: 'fit-content', position: 'relative', transition: 'color .2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-ink)')}
            >
              tanvirrahanrifat@gmail.com
              <span style={{ position: 'absolute', left: 0, bottom: '-2px', width: '100%', height: '1px', background: 'var(--color-line)' }} />
            </a>
          </div>

          {/* Right — form */}
          <div style={{
            background: 'var(--color-surface)',
            padding: '3rem',
            borderRadius: '16px',
            border: '1px solid var(--color-line)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.02)',
          }}>
            <form ref={formRef} onSubmit={handleSubmit} id="contact-form">
            <Field id="name" label="Name" type="text" placeholder="Your name" required name="user_name" />
            <Field id="email" label="Email" type="email" placeholder="you@example.com" required name="user_email" />

            <div style={{ marginBottom: '2rem' }}>
              <label htmlFor="message" style={LABEL_STYLE}>Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="What are you building?"
                required
                style={{ ...INPUT_STYLE, resize: 'none' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-line)')}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              data-cursor="Send"
              disabled={status === 'sending'}
              style={{ opacity: status === 'sending' ? 0.6 : 1 }}
            >
              {status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent ✓' : status === 'error' ? 'Error — try again' : 'Send Message →'}
            </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) { .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }
      `}</style>
    </section>
  )
}

/** Reusable form field with borderless input style. */
function Field({ id, label, type, placeholder, required, name }: {
  id: string; label: string; type: string; placeholder: string; required?: boolean; name: string
}) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <label htmlFor={id} style={LABEL_STYLE}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        style={INPUT_STYLE}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-line)')}
      />
    </div>
  )
}

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--color-muted)',
  marginBottom: '8px',
}

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  background: 'rgba(0,0,0,0.02)',
  border: '1px solid var(--color-line)',
  borderRadius: '8px',
  padding: '16px 20px',
  fontFamily: 'var(--font-sans)',
  fontSize: '16px',
  color: 'var(--color-ink)',
  transition: 'border-color .3s ease, background .3s ease, box-shadow .3s ease',
  outline: 'none',
}
