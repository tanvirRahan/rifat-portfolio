import { useEffect, useRef } from 'react'
import { skillCategories } from '@/data/skills'

/** Skills section — Dark Glassmorphic UI with logos. */
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section id="skills" ref={sectionRef} data-num="03" className="section-pad hairline-top">
      <div className="wrap">

        <div className="section-head reveal">
          <div className="section-label">03 — Skills</div>
          <h2 className="kinetic-text">Tech Stack & Tools.</h2>
        </div>

        {/* Tech Stack Card */}
        <div 
          className="reveal tech-card"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-line)',
            borderRadius: '20px',
            padding: '3.5rem',
            boxShadow: '0 4px 24px -12px rgba(0, 0, 0, 0.03)',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem' }}>
            {skillCategories.map((cat) => (
              <div key={cat.title}>
                <div style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '13px', 
                  color: 'var(--color-muted)', 
                  letterSpacing: '0.05em', 
                  textTransform: 'uppercase', 
                  marginBottom: '1.25rem' 
                }}>
                  {cat.title}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {cat.skills.map((skill, idx) => (
                    <div 
                      key={skill.name} 
                      className="skill-badge"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(0, 0, 0, 0.02)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        padding: '6px 12px',
                        borderRadius: '99px',
                        color: 'var(--color-ink)',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'default',
                        /* We apply the delay dynamically */
                        animationDelay: `${idx * 0.05}s`,
                        transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                      }}
                    >
                      {skill.icon && (
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          style={{ width: '16px', height: '16px', objectFit: 'contain' }} 
                        />
                      )}
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .reveal.in-view .skill-badge {
          animation: badgePop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        
        .skill-badge:hover {
          background: rgba(0, 0, 0, 0.04) !important;
          border-color: rgba(0, 0, 0, 0.08) !important;
          text-shadow: 2px 2px 0px rgba(176, 40, 30, 0.2), -2px -2px 0px rgba(176, 40, 30, 0.1);
          color: var(--color-ink);
          animation: waveBadge 1.2s cubic-bezier(0.36, 0, 0.66, -0.56) infinite !important;
        }

        @keyframes badgePop {
          0% { opacity: 0; transform: scale(0.85) translateY(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        @keyframes waveBadge {
          0%, 100% { transform: translateY(-2px) rotate(0deg); }
          25% { transform: translateY(-4px) rotate(-1.5deg); }
          50% { transform: translateY(-2px) rotate(1.5deg); }
          75% { transform: translateY(-4px) rotate(-1deg); }
        }

        @media (max-width: 768px) {
          .tech-card { 
            padding: 1.5rem !important; 
            border-radius: 16px !important; 
          }
          .tech-card > div {
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}
