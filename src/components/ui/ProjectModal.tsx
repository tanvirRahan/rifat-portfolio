import { useEffect, useState } from 'react'
import type { Project } from '@/data/projects'
import { X, ExternalLink, CheckCircle2 } from 'lucide-react'
import Button from './Button'
import { getTagColors } from '@/utils/tagColors'
import { createPortal } from 'react-dom'

function GithubIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17 0-1.5-.5-2.73-1.3-3.7.13-.32.6-1.74-.13-3.6 0 0-1.1-.35-3.6 1.35a12.8 12.8 0 0 0-6.6 0c-2.5-1.7-3.6-1.35-3.6-1.35-.73 1.86-.26 3.28-.13 3.6-.8.97-1.3 2.2-1.3 3.7 0 5.75 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8 18v4"></path>
    </svg>
  )
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0) // Reset image index when a new project opens
      setHasScrolled(false) // Reset scroll state
      // Small delay to allow display:block to apply before animating opacity
      requestAnimationFrame(() => setIsVisible(true))
      // Lock background scroll
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      // Unlock background scroll
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  // Auto-play Slider Effect (Crossfades every 5 seconds)
  useEffect(() => {
    if (!project || project.images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
    }, 5000)

    // Reset the timer if the user manually clicks next/prev (dependency array handles this)
    return () => clearInterval(timer)
  }, [project, currentImageIndex])

  const handleClose = () => {
    setIsVisible(false)
    // Wait for fade out animation before unmounting
    setTimeout(() => onClose(), 300)
  }

  if (!project) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 transition-all duration-300 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 md:backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-6xl h-[90vh] md:h-[85vh] overflow-hidden flex flex-col bg-surface-light border border-white/10 rounded-3xl shadow-2xl shadow-primary/20 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
          }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/80 md:backdrop-blur-sm border border-white/10 transition-all hover:rotate-90 hover:scale-110"
        >
          <X size={24} />
        </button>

        {/* Scrollable Area */}
        <div
          className="flex-1 min-h-0 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40 w-full flex flex-col"
          data-lenis-prevent="true"
          onScroll={(e) => setHasScrolled(e.currentTarget.scrollTop > 50)}
        >

          {/* Hero Image Slider (Cinematic Banner) */}
          <div className="relative w-full h-[25vh] sm:h-[30vh] md:h-[35vh] shrink-0 group/slider overflow-hidden bg-surface">
            <div className="absolute inset-0 bg-gradient-to-t from-surface-light via-surface-light/20 to-transparent z-10 pointer-events-none" />

            {/* Render all images for perfect crossfade animation */}
            {project.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${project.title} screenshot ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${currentImageIndex === idx
                    ? 'opacity-100 scale-100 z-0'
                    : 'opacity-0 scale-105 z-[-1]'
                  }`}
                loading="lazy"
                decoding="async"
              />
            ))}

            {/* Slider Controls (Only show if multiple images exist) */}
            {project.images.length > 1 && (
              <>
                {/* Left Arrow */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-primary/80 backdrop-blur-md border border-white/10 transition-all opacity-100 md:opacity-0 group-hover/slider:opacity-100 hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>

                {/* Right Arrow */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-primary/80 backdrop-blur-md border border-white/10 transition-all opacity-100 md:opacity-0 group-hover/slider:opacity-100 hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${currentImageIndex === idx
                          ? 'w-6 bg-primary shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content Body */}
          <div className="flex flex-col p-6 sm:p-8 md:p-12 -mt-16 md:-mt-24 z-20 relative max-w-4xl mx-auto w-full">

            {/* Title & Tags Centered */}
            <div className="flex flex-col items-center text-center mb-10 md:mb-14">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                {project.title}
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-2">
                {project.tags.map((tag) => {
                  const colors = getTagColors(tag)
                  return (
                    <span key={tag} className={`rounded-full border px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur-sm ${colors.bg} ${colors.text} ${colors.border}`}>
                      {tag}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Descriptions & Features */}
            <div className="flex flex-col gap-10">

              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-semibold text-white border-b border-white/10 pb-2">Overview</h3>
                {project.longDescription ? (
                  <div className="flex flex-col gap-4 text-text-muted leading-relaxed text-lg">
                    {project.longDescription.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-text-muted leading-relaxed text-lg">{project.description}</p>
                )}
              </div>

              {project.features && project.features.length > 0 && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-2xl font-semibold text-white border-b border-white/10 pb-2">Key Features</h3>
                  <ul className="flex flex-col gap-4">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-text-muted text-lg">
                        <CheckCircle2 className="text-primary shrink-0 mt-1" size={24} />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions & Details Centered at Bottom */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 mb-8 pt-8 border-t border-white/10">
                {project.offlineMessage ? (
                  <Button 
                    variant="primary" 
                    className="w-full sm:w-auto px-8 gap-2 justify-center py-3"
                    onClick={() => alert(project.offlineMessage)}
                  >
                    <ExternalLink size={18} /> Live Preview
                  </Button>
                ) : project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                    <Button variant="primary" className="w-full sm:w-auto px-8 gap-2 justify-center py-3">
                      <ExternalLink size={18} /> Live Preview
                    </Button>
                  </a>
                )}

                {project.github && project.isPrivate ? (
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto px-8 gap-2 justify-center py-3"
                    onClick={() => alert("This repository is private as the project is currently in production. Please check out the Live Preview instead!")}
                    title="Private Repository"
                  >
                    <GithubIcon size={18} /> Source Code
                  </Button>
                ) : project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto px-8 gap-2 justify-center py-3">
                      <GithubIcon size={18} /> Source Code
                    </Button>
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Animated Scroll Indicator (Fades out when scrolled) */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-2 transition-all duration-500 z-50 ${hasScrolled ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1.5 bg-black/20 backdrop-blur-sm">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
