import { useEffect, useRef, useState } from 'react'
import { projectsData, type Project } from '@/data/projects'
import ProjectModal from '@/components/ui/ProjectModal'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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
    <>
      <section id="work" ref={sectionRef} data-num="03" className="section-pad hairline-top" style={{ position: 'relative' }}>
        
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-head reveal">
            <div className="section-label">03 — Projects</div>
            <h2 className="kinetic-text">Featured Work.</h2>
          </div>

          {/* 2-Column Grid Layout for Desktop, 1-Column for Mobile */}
          <div className="projects-grid">
            {projectsData.map((project) => (
              <div 
                key={project.id}
                className="reveal project-card"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Section */}
                <div className="project-image-wrap">
                  {/* We use an image if available, else a colored placeholder block */}
                  {project.cardImage ? (
                    <img src={project.cardImage} alt={project.title} className="project-img" />
                  ) : (
                    <div className="project-placeholder" />
                  )}
                </div>

                {/* Content Section */}
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.shortDesc}</p>
                  
                  {/* Tech Stack */}
                  <div className="project-techs">
                    {project.techStack.map((tech) => (
                      <div key={tech.name} className="tech-pill">
                        {/* Sometimes logos might be black/white, filter for dark mode is optional */}
                        <img src={tech.icon} alt={tech.name} className="tech-icon" />
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Section */}
                <div className="project-footer">
                  <div className="footer-links">
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="footer-link-item"
                        title="Visit Live Site"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        <span>Live</span>
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="footer-link-item"
                        title="View Source Code"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17 0-1.5-.5-2.73-1.3-3.7.13-.32.6-1.74-.13-3.6 0 0-1.1-.35-3.6 1.35a12.8 12.8 0 0 0-6.6 0c-2.5-1.7-3.6-1.35-3.6-1.35-.73 1.86-.26 3.28-.13 3.6-.8.97-1.3 2.2-1.3 3.7 0 5.75 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8 18v4"></path></svg>
                        {/* Only show 'GitHub' text if Live Link doesn't exist to save space, or just show icon */}
                        {!project.liveLink && <span>GitHub</span>}
                      </a>
                    )}
                  </div>
                  
                  <div className="footer-view">
                    VIEW →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }

          .project-card {
            display: flex;
            flex-direction: column;
            background: rgba(250, 247, 239, 0.65);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-radius: 4px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            position: relative;
          }

          .project-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 40px 80px -16px rgba(0, 0, 0, 0.08);
            border-color: rgba(0, 0, 0, 0.1);
            background: rgba(250, 247, 239, 0.95);
          }

          .project-image-wrap {
            width: 100%;
            aspect-ratio: 16/10;
            overflow: hidden;
            background: #111;
          }

          .project-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          }
          
          .project-card:hover .project-img {
            transform: scale(1.03);
          }

          .project-placeholder {
            width: 100%;
            height: 100%;
            background: var(--color-surface);
          }

          .project-content {
            padding: 2.5rem 2rem 2rem 2rem;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }

          .project-title {
            font-family: var(--font-display);
            font-size: clamp(22px, 2vw, 26px);
            font-weight: 600;
            color: var(--color-ink);
            line-height: 1.3;
            letter-spacing: -0.01em;
            margin-bottom: 1rem;
          }

          .project-desc {
            font-size: 15.5px;
            line-height: 1.7;
            color: var(--color-body);
            margin-bottom: 2rem;
          }

          .project-techs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-top: auto; /* Pushes tags to the bottom of the content area */
          }

          .tech-pill {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 4px 10px;
            background: rgba(0, 0, 0, 0.03);
            border: 1px solid rgba(0, 0, 0, 0.06);
            border-radius: 4px; /* Slightly squared pill to match image aesthetic */
            font-family: var(--font-mono);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--color-ink);
            transition: all 0.3s ease;
          }

          .tech-pill:hover {
            background: rgba(0, 0, 0, 0.06);
            border-color: rgba(0, 0, 0, 0.1);
          }

          .tech-icon {
            width: 12px;
            height: 12px;
            object-fit: contain;
          }

          .project-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5rem 2rem;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
          }

          .footer-links {
            display: flex;
            gap: 1.25rem;
          }

          .footer-link-item {
            display: flex;
            align-items: center;
            gap: 6px;
            color: var(--color-ink);
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: color 0.3s ease;
          }

          .footer-link-item:hover {
            color: var(--color-accent);
          }

          .footer-view {
            font-family: var(--font-mono);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--color-muted);
            transition: color 0.3s ease;
          }

          .project-card:hover .footer-view {
            color: var(--color-ink);
          }

          @media (max-width: 900px) {
            .projects-grid {
              grid-template-columns: 1fr;
              gap: 2rem;
            }
          }
          
          @media (max-width: 600px) {
            .project-content {
              padding: 1.5rem;
            }
            .project-footer {
              padding: 1.25rem 1.5rem;
            }
            .tech-pill {
              font-size: 10px;
              padding: 4px 8px;
            }
          }
        `}</style>
      </section>

      {/* Full-screen GSAP Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  )
}
