import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { researchData, type Research } from '@/data/research'
import ResearchModal from '@/components/ui/ResearchModal'

const CERTIFICATIONS = [
  {
    type: 'Certification',
    title: 'Backend Developer Certification — Eutropia IT',
    desc: 'Validating practical expertise in building modern, scalable, and production-ready web applications using Next.js and Django.',
    file: '/images/certifications/backend-dev.pdf'
  },
  {
    type: 'Certification',
    title: 'Data Analysis with Python',
    desc: 'Verified certification covering foundational knowledge in data manipulation, cleaning, and statistical analysis using pandas.',
    file: '/images/certifications/Data-analysis-certificate.jpg'
  },
  {
    type: 'Competition',
    title: 'Math Olympiad Certification',
    desc: 'Recognized for strong mathematical problem-solving skills and analytical thinking in a competitive academic environment.',
    file: '/images/certifications/MathOlympiad_certificate.jpg'
  },
  {
    type: 'Certification',
    title: 'UNICEF Certification',
    desc: 'Validated proficiency in data organization, analysis, and visualization using Microsoft Excel in professional scenarios.',
    file: '/images/certifications/Unicef_excel_certificate.jpg'
  },
  {
    type: 'Seminar',
    title: 'Artificial Intelligence Seminar — BFEW',
    desc: 'Explored advanced AI concepts and practical applications under the guidance of industry experts at BFEW Technical Training Center.',
    file: '/images/certifications/BFEW Technical Training Center at Aptech .jpg'
  },
]

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedResearch, setSelectedResearch] = useState<Research | null>(null)
  const [selectedCert, setSelectedCert] = useState<string | null>(null)

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
    <section id="achievements" ref={sectionRef} data-num="05" className="section-pad hairline-top">
      <div className="wrap">

        <div className="section-head reveal">
          <div className="section-label">05 — Achievements</div>
          <h2>Research & <span style={{ color: 'var(--color-accent)' }}>Certifications.</span></h2>
        </div>

        {/* 1. Academic Research Premium Card */}
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          {researchData.map((paper) => (
            <div
              key={paper.id}
              className="research-card"
              style={{
                background: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'grid',
                gridTemplateColumns: '1fr',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.04)'
              }}
              onClick={() => setSelectedResearch(paper)}
            >
              {/* Desktop: Make it a side-by-side layout for research papers if screen is wide enough */}
              <style>{`
                .research-card-inner {
                  display: grid;
                  grid-template-columns: 1fr;
                }
                @media (min-width: 900px) {
                  .research-card-inner {
                    grid-template-columns: 350px 1fr;
                  }
                }
              `}</style>

              <div className="research-card-inner">
                {/* Left: Image Placeholder */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  minHeight: '250px',
                  background: '#f5f5f5',
                  overflow: 'hidden'
                }}>
                  <img
                    src={paper.cardImage}
                    alt={paper.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'var(--color-accent)',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    boxShadow: '0 2px 10px rgba(230, 57, 70, 0.3)'
                  }}>
                    {paper.badge}
                  </div>
                </div>

                {/* Right: Content */}
                <div style={{
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--color-ink)',
                    lineHeight: 1.3,
                    marginBottom: '1rem'
                  }}>
                    {paper.title}
                  </h3>

                  <p style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: 'var(--color-body)',
                    marginBottom: '2rem'
                  }}>
                    {paper.shortDesc}
                  </p>

                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
                      {paper.techStack.slice(0, 4).map((tech, i) => (
                        <span key={i} style={{
                          padding: '4px 10px',
                          background: 'rgba(41, 37, 36, 0.04)',
                          borderRadius: '4px',
                          fontSize: '13px',
                          fontWeight: 500,
                          color: 'var(--color-body)'
                        }}>
                          {tech.name}
                        </span>
                      ))}
                      {paper.techStack.length > 4 && (
                        <span style={{
                          padding: '4px 10px',
                          background: 'rgba(41, 37, 36, 0.04)',
                          borderRadius: '4px',
                          fontSize: '13px',
                          fontWeight: 500,
                          color: 'var(--color-body)'
                        }}>
                          +{paper.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    <button
                      className="btn btn-ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedResearch(paper)
                      }}
                      style={{ padding: '8px 24px', marginLeft: '-24px' }}
                    >
                      Read Abstract ↗
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Regular Certifications Grid */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <style>{`
            .cert-card:hover .cert-preview {
              opacity: 1 !important;
              transform: translateY(0) !important;
            }
            .cert-card:hover .cert-overlay {
              opacity: 1 !important;
            }
            .cert-card:hover .cert-title, .cert-card:hover .cert-desc {
              color: #fff !important;
            }
            .cert-card:hover .cert-type {
              color: rgba(255,255,255,0.8) !important;
            }
            .cert-card:hover .cert-hint {
              opacity: 1 !important;
              transform: translateY(0) !important;
            }
          `}</style>
          {CERTIFICATIONS.map((item) => (
            <div
              key={item.title}
              className="cert-card"
              onClick={() => setSelectedCert(item.file)}
              style={{
                position: 'relative',
                border: '1px solid var(--color-line)',
                padding: '2rem',
                background: 'var(--color-surface)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                borderRadius: '12px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Image Preview on Hover */}
              <div
                className="cert-preview"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  pointerEvents: 'none',
                  overflow: 'hidden'
                }}
              >
                {item.file.toLowerCase().endsWith('.pdf') ? (
                  <iframe
                    src={`${item.file}#toolbar=0&navpanes=0&scrollbar=0`}
                    style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
                    tabIndex={-1}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: `url("${item.file}") center/cover no-repeat` }} />
                )}
              </div>

              {/* Dark Overlay so text is readable */}
              <div
                className="cert-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 3,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.4s ease'
                }}
              />

              {/* Text Content */}
              <div className="cert-content" style={{ position: 'relative', zIndex: 4, display: 'flex', flexDirection: 'column', height: '100%', pointerEvents: 'none' }}>
                <div className="cert-type" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', transition: 'color 0.4s ease' }}>
                  {item.type}
                </div>
                <h3 className="cert-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(17px,1.5vw,20px)', color: 'var(--color-ink)', letterSpacing: '-0.01em', marginBottom: '1rem', lineHeight: 1.3, transition: 'color 0.4s ease' }}>
                  {item.title}
                </h3>
                <p className="cert-desc" style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-body)', flexGrow: 1, transition: 'color 0.4s ease' }}>
                  {item.desc}
                </p>

                <div className="cert-hint" style={{ marginTop: '1.5rem', fontSize: '12px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0, transform: 'translateY(10px)', transition: 'all 0.4s ease', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"></path><path d="M10 14L21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
                  View Certificate
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <ResearchModal
        research={selectedResearch}
        isOpen={!!selectedResearch}
        onClose={() => setSelectedResearch(null)}
      />

      {/* Fullscreen Certificate Image Modal */}
      {selectedCert && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            cursor: 'zoom-out'
          }}
          onClick={() => setSelectedCert(null)}
        >
          {selectedCert.toLowerCase().endsWith('.pdf') ? (
            <iframe
              src={`${selectedCert}#view=FitH`}
              style={{
                width: '100%',
                maxWidth: '900px',
                height: '85vh',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
                animation: 'certFadeUp 0.4s ease-out forwards',
                background: '#fff'
              }}
            />
          ) : (
            <img
              src={selectedCert}
              alt="Certificate"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
                animation: 'certFadeUp 0.4s ease-out forwards'
              }}
            />
          )}

          <button
            onClick={() => setSelectedCert(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <style>{`
            @keyframes certFadeUp {
              from { opacity: 0; transform: translateY(30px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>,
        document.body
      )}
    </section>
  )
}
