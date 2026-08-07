import { useEffect, useRef } from 'react'

/** About section — Glassmorphism Card style, ultra-readable, no photo. */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  /* Scroll reveal */
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
    <section id="about" ref={sectionRef} data-num="01" className="section-pad hairline-top" style={{ position: 'relative' }}>
      
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section head */}
        <div className="section-head reveal">
          <div className="section-label">01 — About</div>
          <h2 className="kinetic-text">Get to Know Me.</h2>
        </div>

        {/* Glassmorphic Card Container */}
        <div 
          className="reveal about-card" 
          style={{ 
            border: '1px solid rgba(0, 0, 0, 0.04)', 
            borderRadius: '20px', 
            padding: '4rem', 
            background: 'rgba(250, 247, 239, 0.65)', /* Frosted glass background */
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            maxWidth: '1000px',
            margin: '0 auto',
            boxShadow: '0 32px 64px -16px rgba(0, 0, 0, 0.04)', /* Ultra-soft floating shadow */
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Intro text */}
            <p className="about-text" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(19px,2vw,24px)', color: 'var(--color-ink)', lineHeight: 1.5, letterSpacing: '-0.01em' }}>
              Hi, I'm Tanvir Rahan Rifat. I recently graduated with a B.Sc. in Computer Science and Engineering from the University of Asia Pacific, and I currently work as a Full-Stack Developer Intern at Eutropia IT.
            </p>

            <p className="about-text" style={{ fontSize: '16.5px', lineHeight: 1.8, color: 'var(--color-body)' }}>
              My engineering work spans across Backend Architecture, Machine Learning, Data Automation, and responsive Frontend Development. My core focus is on building clean APIs, managing system resources, and deploying live applications that solve real-world problems efficiently.
            </p>

            <p className="about-text" style={{ fontSize: '16.5px', lineHeight: 1.8, color: 'var(--color-body)' }}>
              Whether deploying a media-processing platform or an e-commerce site, I lean heavily into backend operations — managing background tasks and optimizing databases with Python, Django, and PostgreSQL. For the frontend, I work with Next.js and React, and I leverage tools like Claude and Copilot to accelerate my general workflow.
            </p>

            <p className="about-text" style={{ fontSize: '16.5px', lineHeight: 1.8, color: 'var(--color-body)' }}>
              Beyond web architecture, my academic research involves Data and Machine Learning. Building an ML-based career prediction model and automated ETL pipelines taught me how to process complex information at scale. I also enjoy practical automation, often writing Python scripts that turn hours of manual work into a quick 30-second automated process.
            </p>
            
          </div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .about-card { 
            padding: 1.75rem !important; 
            border-radius: 16px !important;
          }
          .about-text {
            font-size: 15px !important;
            line-height: 1.7 !important;
          }
          .about-text:first-child {
            font-size: 17px !important;
          }
        }
      `}</style>
    </section>
  )
}
