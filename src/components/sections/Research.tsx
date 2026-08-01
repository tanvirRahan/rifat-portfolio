import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { FileText } from 'lucide-react'
import Button from '@/components/ui/Button'
import { getTagColors } from '@/utils/tagColors'
import ResearchModal from '@/components/ui/ResearchModal'

export default function Research() {
  const containerRef = useRef<HTMLElement>(null)
  const { gsap } = useScrollAnimation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const researchTags = ['Machine Learning', 'NLP', 'Data Automation', 'Academic Thesis']

  useGSAP(() => {
    gsap.fromTo('.research-title',
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

    gsap.fromTo('.research-card',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }
    )
  }, { scope: containerRef })

  return (
    <section
      id="research"
      ref={containerRef}
      className="flex flex-col justify-center border-b border-surface-lighter/20 py-24 relative overflow-hidden min-h-screen"
    >
      <div className="container-main">
        <div className="research-title flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <h2 className="text-4xl font-bold md:text-5xl">
              Academic <span className="text-primary">Research</span>
            </h2>
            <div className="section-divider hidden md:block"></div>
          </div>
        </div>

        <div
          onClick={() => setIsModalOpen(true)}
          className="research-card cursor-pointer relative rounded-3xl border border-primary/20 bg-surface-light/50 backdrop-blur-md p-8 md:p-12 overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500 hover:-translate-y-2"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">

            {/* Content Side */}
            <div className="flex-1 flex flex-col">

              {/* Status Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-yellow-500 shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
                  Under Review / Pre-print
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                A Data-Driven Framework for Career Recommendation and Competency Mapping to Bridge the Industry-Academia Gap
              </h3>

              <p className="text-text-muted text-lg leading-relaxed mb-8">
                Bangladesh's job market changes have generated a large gap between industry needs and what students have learned in their universities. This research proposes an Intelligent Career Counseling System utilizing a dual-source architecture and Stacking Meta-Ensemble Machine Learning models to map student profiles against actual employment demands in real-time.
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {researchTags.map((tag) => {
                  const colors = getTagColors(tag)
                  return (
                    <span key={tag} className={`rounded-full border px-4 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm ${colors.bg} ${colors.text} ${colors.border}`}>
                      {tag}
                    </span>
                  )
                })}
              </div>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  variant="primary"
                  className="w-full sm:w-auto justify-center gap-2 py-4 px-8 shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all"
                >
                  <FileText size={18} />
                  Read Full Overview
                </Button>
              </div>
            </div>

            {/* Visual Side */}
            <div className="hidden lg:flex w-[350px] shrink-0 flex-col gap-4 group/visual relative">
              <div className="w-full aspect-[3/4] rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative">

                {/* The actual paper screenshot with a slight blur to protect content */}
                <img
                  src="/images/academic_research/research-paper.jpg"
                  alt="Research Paper First Page"
                  className="w-full h-full object-cover object-top blur-[3px] opacity-80 transition-all duration-700 group-hover/visual:blur-[1px] group-hover/visual:scale-105"
                />

                {/* Gradient overlay to make it blend with the dark theme better */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent pointer-events-none" />

                {/* Confidential Stamp */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 border-4 border-red-500/40 text-red-500/60 font-bold text-4xl tracking-widest uppercase px-6 py-2 rounded-lg shadow-xl shadow-red-500/10 backdrop-blur-sm z-10 transition-transform duration-500 group-hover/visual:scale-110 group-hover/visual:text-red-500/80 group-hover/visual:border-red-500/60 group-hover/visual:-rotate-6 bg-surface/30">
                  Confidential
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <ResearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}
