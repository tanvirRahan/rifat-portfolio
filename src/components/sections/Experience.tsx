import { useEffect, useRef } from 'react'

const EXPERIENCE = [
  {
    role: 'Full-Stack Developer Intern',
    company: 'Eutropia IT Solutions Ltd',
    location: 'Dhaka, Bangladesh',
    date: 'Feb 2026 — Present',
    points: [
      <span key="yankvid">Architecting and maintaining YankVid.me, an end-to-end media processing platform. Engineered a resilient backend using Django, Celery, and Redis to process background tasks and serve seamless user experiences at scale. <a href="https://yankvid.me" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: 'var(--color-ink)', borderBottom: '1px solid var(--color-line)', textDecoration: 'none', transition: 'all 0.2s', fontWeight: 500 }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; e.currentTarget.style.borderColor = 'var(--color-accent)' }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-ink)'; e.currentTarget.style.borderColor = 'var(--color-line)' }}>Live Link ↗</a></span>,
      'Engineered an adaptive restaurant ordering system (Gasthaus Peking Duck) using Python and Tkinter. Architected a responsive UI with custom iterative animation logic, a dynamic side-drawer, and a self-healing header to ensure a seamless cross-device experience.',
      'Managing full-cycle server deployments on Azure VMs using Docker and NGINX, implementing automated cookie rotation and failover mechanisms for high availability.',
      'Automated critical administrative workflows using Python scripts for dynamic document generation, reducing manual processing time to under 30 seconds.',
      'Designing and deploying secure, scalable REST APIs with PostgreSQL, enforcing strict data validation to support responsive frontend interfaces built with Next.js.',
    ]
  }
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>('.reveal') ?? []
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in-view')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target) } })
    }, { threshold: 0.15 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} data-num="02" className="section-pad hairline-top">
      <div className="wrap">

        <div className="section-head reveal">
          <div className="section-label">02 — Experience</div>
          <h2 className="kinetic-text">Building systems that scale.</h2>
        </div>

        <div className="reveal">
          {EXPERIENCE.map((job, i) => (
            <div
              key={job.company}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr',
                gap: '3rem',
                padding: '3rem 0',
                borderTop: '1px solid var(--color-line)',
                borderBottom: i === EXPERIENCE.length - 1 ? '1px solid var(--color-line)' : 'none',
              }}
              className="exp-item"
            >
              {/* Left col: Date & Location */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-ink)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  {job.date}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {job.location}
                </div>
              </div>

              {/* Right col: Details */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(19px,2vw,24px)', color: 'var(--color-ink)', letterSpacing: '-0.01em', marginBottom: '4px', lineHeight: 1.3 }}>
                  {job.role}
                </h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                  {job.company}
                </div>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {job.points.map((pt, idx) => (
                    <li key={idx} style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--color-body)', maxWidth: '68ch' }}>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .exp-item { 
            grid-template-columns: 1fr !important; 
            gap: 1.5rem !important; 
            padding: 2rem 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
