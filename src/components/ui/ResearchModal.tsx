import { useEffect, useState } from 'react'
import { X, Mail, BookOpen, CheckCircle2, FileText, Activity } from 'lucide-react'
import Button from './Button'
import { getTagColors } from '@/utils/tagColors'

interface ResearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ResearchModal({ isOpen, onClose }: ResearchModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  const tags = ['Machine Learning', 'Stacking Ensemble', 'TF-IDF', 'Cosine Similarity', 'NLP']

  useEffect(() => {
    if (isOpen) {
      setHasScrolled(false)
      requestAnimationFrame(() => setIsVisible(true))
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 300)
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 transition-all duration-300 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 md:backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-5xl h-[90vh] md:h-[85vh] overflow-hidden flex flex-col bg-surface-light border border-white/10 rounded-3xl shadow-2xl shadow-primary/20 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
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

          {/* Academic Header Banner */}
          <div className="relative w-full py-16 px-6 sm:px-12 bg-surface flex flex-col items-center justify-center text-center border-b border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <BookOpen size={48} className="text-primary/40 mb-6" />
            
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white mb-6 max-w-4xl leading-tight">
              A Data-Driven Framework for Career Recommendation and Competency Mapping to Bridge the Industry-Academia Gap
            </h1>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-white mb-8 font-medium">
              <span>Tanvir Rahan Rifat</span>
            </div>

            <p className="text-xs sm:text-sm text-text-muted/70 uppercase tracking-widest">
              Department of Computer Science & Engineering, University of Asia Pacific, Dhaka, Bangladesh
            </p>

            <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
              {tags.map((tag) => {
                const colors = getTagColors(tag)
                return (
                  <span key={tag} className={`rounded-full border px-4 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm ${colors.bg} ${colors.text} ${colors.border}`}>
                    {tag}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Paper Content */}
          <div className="flex flex-col p-6 sm:p-10 md:p-16 gap-12 max-w-4xl mx-auto w-full">
            
            {/* Abstract */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-2">
                <FileText className="text-primary" size={24} />
                <h3 className="text-2xl font-bold text-white font-serif tracking-wide">I. Abstract</h3>
              </div>
              <p className="text-text-muted leading-relaxed text-lg text-justify">
                Bangladesh's job market changes have generated a large gap between industry needs and what students have learned in their universities (industry-academia gap). The gap between students' skills and the skills required by employers often results in difficulty matching students with jobs. We have also found that CGPA and other common academic measures are not good indicators of technical employability of graduates.
              </p>
              <p className="text-text-muted leading-relaxed text-lg text-justify">
                To mitigate these difficulties, we developed a data-driven intelligent system to create personalized careers and to map competencies to actual jobs based on historical academic performance data from students and job postings from employers at any given time. Specifically, we utilized a dual-source architecture mapping 3,785 student profiles against 2,272 actual employment postings.
              </p>
            </div>

            {/* Methodology */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-2">
                <Activity className="text-primary" size={24} />
                <h3 className="text-2xl font-bold text-white font-serif tracking-wide">II. Architecture & Methodology</h3>
              </div>
              <ul className="flex flex-col gap-6">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">Stacking Meta-Ensemble ML Model</h4>
                    <p className="text-text-muted leading-relaxed text-md">
                      Developed a predictive model using Random Forest (RF), XGBoost, and LightGBM as base learners, with Logistic Regression acting as a meta-classifier to predict optimal career paths across ten macro-classes.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">Competency Gap Vector Engine</h4>
                    <p className="text-text-muted leading-relaxed text-md">
                      Created a cosine similarity-based vector space engine utilizing TF-IDF logic to measure specific competency gaps between individual students and current industry standards.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">Dual-Source Data Ingestion</h4>
                    <p className="text-text-muted leading-relaxed text-md">
                      Built an asynchronous ETL pipeline to aggregate unstructured data from regional job portals and academic repositories, harmonizing it into a highly discriminative decision boundary dataset.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Key Findings */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-2">
                <CheckCircle2 className="text-primary" size={24} />
                <h3 className="text-2xl font-bold text-white font-serif tracking-wide">III. Key Findings</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-surface border border-white/5 p-6 rounded-2xl shadow-lg hover:border-primary/30 transition-colors">
                  <div className="text-4xl font-bold text-white mb-2">87.05%</div>
                  <div className="text-primary font-semibold mb-2">Peak Prediction Accuracy</div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    The stacking ensemble outshined all isolated baseline models, providing highly reliable predictive separability.
                  </p>
                </div>
                <div className="bg-surface border border-white/5 p-6 rounded-2xl shadow-lg hover:border-primary/30 transition-colors">
                  <div className="text-2xl font-bold text-white mb-3 mt-1">Disproving the "CGPA Paradox"</div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Provided quantitative evidence that CGPA has almost no correlation (Pearson r ≈ -0.05) with technical employability.
                  </p>
                </div>
                <div className="bg-surface border border-white/5 p-6 rounded-2xl shadow-lg md:col-span-2 hover:border-primary/30 transition-colors">
                  <div className="text-xl font-bold text-white mb-2">Actionable Skill-Gap Framework</div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Demonstrated that cross-functional skill diversity correlates directly to higher market remuneration, providing students with an evidence-based framework for bridging their skill gaps proactively.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions at Bottom */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-12 border-t border-white/10">
              <a 
                href="mailto:tanvirrahanrifat@gmail.com?subject=Request for Research Paper: A Data-Driven Framework for Career Recommendation&body=Hi Tanvir,%0D%0A%0D%0AI was reviewing your portfolio and I would like to request access to the full text of your research paper titled 'A Data-Driven Framework for Career Recommendation'.%0D%0A%0D%0ACould you please share a copy with me?%0D%0A%0D%0AThanks," 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="primary" className="w-full sm:w-auto px-10 py-4 justify-center gap-3 bg-white text-black hover:bg-gray-200 border-none shadow-[0_0_30px_rgba(255,255,255,0.2)] font-bold tracking-wide">
                  <Mail size={20} /> 
                  Request Full Text via Email
                </Button>
              </a>
            </div>

          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <div 
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-2 transition-all duration-500 z-50 ${
            hasScrolled ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1.5 bg-black/20 backdrop-blur-sm">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  )
}
