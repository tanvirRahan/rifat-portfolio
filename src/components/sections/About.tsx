import { useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

/** About — profile photo placeholder, bio, and background info. */
export default function About() {
  const containerRef = useRef<HTMLElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const { gsap } = useScrollAnimation() // Ensures plugins are registered

  useGSAP(() => {
    // Reveal image from left
    gsap.from('.about-img', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })

    // Reveal text elements from bottom staggering
    gsap.from('.about-text', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    })
  }, { scope: containerRef })

  return (
    <section
      id="about"
      ref={containerRef}
      className="flex min-h-screen items-center border-b border-surface-lighter/30 py-24"
    >
      <div className="container-main">
        <div className="about-text mb-20 flex items-center gap-4">
          <h2 className="text-3xl font-bold md:text-5xl">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="section-divider"></div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-24 items-center">
          {/* Profile Image */}
          <div className="about-img group relative aspect-[4/5] w-full max-w-sm mx-auto md:max-w-none rounded-[2rem] border border-white/10 bg-surface-light shadow-2xl shadow-black/50 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)]">
            {/* Subtle inner glass overlay */}
            <div className="absolute inset-0 z-10 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none"></div>

            <img
              src="/profile.jpg"
              alt="Rifat - FullStack Developer"
              className="h-full w-full object-cover object-center grayscale transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:grayscale-0"
              onError={(e) => {
                // Fallback if the user hasn't uploaded profile.jpg yet
                e.currentTarget.src = 'https://ui-avatars.com/api/?name=Rifat&background=0D1424&color=ffffff&size=512&font-size=0.33&length=1'
              }}
            />
          </div>

          {/* Bio Content */}
          <div className="flex flex-col gap-6">

            {/* ============================== */}
            {/* SHORT BIO START (Always visible) */}
            {/* ============================== */}
            <div className="about-text flex flex-col gap-4 text-lg text-text-muted leading-relaxed">
              <p>
                Hi, I'm Tanvir Rahan Rifat. I recently graduated with a B.Sc. in Computer Science and Engineering from the University of Asia Pacific, and I currently work as a Full-Stack Developer Intern at Eutropia IT.
              </p>
              <p>
                My engineering work spans across Backend Architecture, Machine Learning, Data Automation, and responsive Frontend Development. My core focus is on building clean APIs, managing system resources, and deploying live applications that solve real-world problems efficiently.
              </p>
            </div>

            {/* ============================== */}
            {/* DETAILED BIO START (Hidden initially) */}
            {/* ============================== */}
            <div
              className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="flex flex-col gap-4 text-lg text-text-muted leading-relaxed pt-2">
                <p>
                  Whether deploying a media-processing platform or an e-commerce site, I lean heavily into backend operations—managing background tasks and optimizing databases with Python, Django, and PostgreSQL. For the frontend, I work with Next.js and React, and I leverage tools like Claude and Copilot to accelerate my general workflow.
                </p>
                <p>
                  I built the interactive 3D interface of this portfolio using React, Three.js, Tailwind CSS, and GSAP. This allows me to craft smooth experiences efficiently while saving my deep focus for backend logic and system scaling.
                </p>
                <p>
                  Beyond web architecture, my academic research involves Data and Machine Learning. Building an ML-based career prediction model and automated ETL pipelines taught me how to process complex information at scale. I also enjoy practical automation, often writing Python scripts that turn hours of manual work into a quick 30-second automated process.
                </p>
              </div>
            </div>

            {/* Read More Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="about-text self-start flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:text-white mt-2"
            >
              {isExpanded ? (
                <>Show Less <ChevronUp size={16} /></>
              ) : (
                <>Read More <ChevronDown size={16} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
