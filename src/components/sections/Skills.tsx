import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { skillCategories } from '@/data/skills'

/** Skills — technical skills grouped by category. */
export default function Skills() {
  const containerRef = useRef<HTMLElement>(null)
  const { gsap } = useScrollAnimation()

  useGSAP(() => {
    // Title animation
    gsap.fromTo('.skills-title',
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

    // Categories animation (staggered)
    gsap.fromTo('.skill-category',
      { scale: 0.9, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)',
      }
    )
  }, { scope: containerRef })

  return (
    <section
      id="skills"
      ref={containerRef}
      className="flex min-h-screen items-center border-b border-surface-lighter/20 py-24 relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-main relative z-10">
        <div className="skills-title mb-20 flex items-center gap-6">
          <h2 className="text-4xl font-bold md:text-5xl">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="section-divider"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="skill-category group rounded-3xl border border-surface-lighter bg-surface-light/50 backdrop-blur-sm p-8 transition-all duration-300 hover:-translate-y-3 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
            >
              <h3 className="mb-8 text-2xl font-bold text-text group-hover:text-primary transition-colors">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-surface-lighter bg-surface px-4 py-2 text-sm font-medium text-text-muted transition-all group-hover:border-primary/20 hover:!border-primary hover:!bg-primary/10 hover:!text-primary hover:scale-105 cursor-default shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-surface-lighter to-transparent my-16 md:my-24"></div>

        {/* Resume CTA */}
        <div className="flex flex-col items-center justify-center text-center px-4 pb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Interested in my <span className="text-primary">Full Profile?</span>
          </h3>
          <p className="text-text-muted mb-8 max-w-lg mx-auto">
            Get a detailed overview of my experience, education, and technical skills by downloading my professional CV.
          </p>
          <a
            href="/cv/Tanvir_Rahan_Rifat_CV.pdf"
            download="Tanvir_Rahan_Rifat_CV.pdf"
            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-surface bg-primary px-8 py-4 rounded-full transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
          >
            Download CV
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-y-1">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
