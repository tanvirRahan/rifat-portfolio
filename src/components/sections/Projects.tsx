import { useRef, useState, useEffect } from 'react'
import { projects, type Project } from '@/data/projects'
import ProjectModal from '@/components/ui/ProjectModal'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { getTagColors } from '@/utils/tagColors'

function GithubIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17 0-1.5-.5-2.73-1.3-3.7.13-.32.6-1.74-.13-3.6 0 0-1.1-.35-3.6 1.35a12.8 12.8 0 0 0-6.6 0c-2.5-1.7-3.6-1.35-3.6-1.35-.73 1.86-.26 3.28-.13 3.6-.8.97-1.3 2.2-1.3 3.7 0 5.75 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8 18v4"></path>
    </svg>
  )
}

/** Projects — horizontal carousel of project cards. */
export default function Projects() {
  const containerRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { gsap } = useScrollAnimation()

  // Intersection Observer for Center Highlight Effect
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setActiveIndex(index)
          }
        })
      },
      {
        root: container,
        threshold: 0.6, // Trigger when 60% of the card is visible in the container
      }
    )

    const cards = container.querySelectorAll('.project-card')
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  useGSAP(() => {
    // Title animation
    gsap.fromTo('.projects-title',
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }
    )

    // Staggered cards entrance animation for premium smoothness
    gsap.fromTo('.project-card', 
      { opacity: 0, x: 100, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
      }
    )
  }, { scope: containerRef })

  // Custom Scroll Handlers for Next/Prev Buttons
  const scrollLeft = () => {
    if (scrollRef.current) {
      // Get the width of one card + gap roughly (estimating 600px + gap)
      // Alternatively, we can just scroll by clientWidth
      const cardWidth = window.innerWidth < 768 ? window.innerWidth * 0.85 : 600
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth < 768 ? window.innerWidth * 0.85 : 600
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="projects"
      ref={containerRef}
      className="flex min-h-screen flex-col justify-center border-b border-surface-lighter/20 py-24 relative overflow-hidden"
    >
      <div className="container-main mb-12">
        <div className="projects-title flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h2 className="text-4xl font-bold md:text-5xl">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <div className="section-divider hidden md:block"></div>
          </div>
          
          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex gap-4">
            <button 
              onClick={scrollLeft}
              className="p-3 rounded-full border border-white/10 bg-surface hover:bg-primary/20 hover:border-primary/50 text-white transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollRight}
              className="p-3 rounded-full border border-white/10 bg-surface hover:bg-primary/20 hover:border-primary/50 text-white transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Slider */}
      <div className="slider-container relative w-full px-4 md:px-8">
        
        {/* Mobile Left/Right overlay buttons (optional, but CSS scroll snap handles it mostly) */}
        
        <div 
          ref={scrollRef}
          className="flex w-full overflow-x-auto snap-x snap-mandatory pb-12 pt-8 px-[7.5vw] md:px-[calc(50vw-300px)] gap-8 no-scrollbar [&::-webkit-scrollbar]:hidden items-center"
        >
          {projects.map((project, index) => (
            <div 
              key={project.id}
              data-index={index}
              className={`project-card snap-center shrink-0 w-[85vw] md:w-[600px] group relative flex flex-col rounded-3xl bg-surface-light border border-white/5 p-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:shadow-[0_20px_40px_rgba(6,182,212,0.1)] hover:border-primary/30 ${
                activeIndex === index 
                  ? 'scale-100 opacity-100 z-10 shadow-2xl shadow-black/50' 
                  : 'scale-[0.85] opacity-40 z-0 hover:opacity-60'
              }`}
            >
              {/* Image Container */}
              <div 
                className="relative aspect-video w-full rounded-2xl bg-surface mb-6 overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="absolute inset-0 bg-primary/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10 pointer-events-none" />
                <img 
                  src={project.images[0]} 
                  alt={project.title} 
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-3 text-text-muted z-20">
                    {project.github && project.isPrivate ? (
                      <button 
                        onClick={() => alert("This repository is private as the project is currently in production. Please check out the Live Preview instead!")} 
                        className="hover:text-primary transition-colors hover:scale-110 p-2 rounded-full hover:bg-white/5"
                        title="Private Repository"
                      >
                        <GithubIcon size={22} />
                      </button>
                    ) : project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:scale-110 p-2 rounded-full hover:bg-white/5">
                        <GithubIcon size={22} />
                      </a>
                    )}
                    {project.offlineMessage ? (
                      <button 
                        onClick={() => alert(project.offlineMessage)}
                        className="hover:text-primary transition-colors hover:scale-110 p-2 rounded-full hover:bg-white/5"
                        title="Live Preview Unavailable"
                      >
                        <ExternalLink size={22} />
                      </button>
                    ) : project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:scale-110 p-2 rounded-full hover:bg-white/5">
                        <ExternalLink size={22} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-text-muted mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-auto flex flex-col gap-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => {
                      const colors = getTagColors(tag)
                      return (
                        <span key={tag} className={`rounded-full border px-4 py-1.5 text-xs font-medium shadow-sm ${colors.bg} ${colors.text} ${colors.border}`}>
                          {tag}
                        </span>
                      )
                    })}
                  </div>

                  {/* See More Button */}
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="group/btn flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:text-white mt-2 w-fit"
                  >
                    View Details 
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">↗</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal Overlay */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  )
}
