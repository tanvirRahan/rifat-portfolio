import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import Button from '@/components/ui/Button'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import emailjs from '@emailjs/browser'

// -------------------------------------------------------------
// USER INSTRUCTIONS FOR EMAILJS:
// 1. Go to https://www.emailjs.com/ and create a free account.
// 2. Add an Email Service (e.g., Gmail) and get your SERVICE_ID.
// 3. Create an Email Template with variables {{user_name}}, {{user_email}}, {{message}} and get your TEMPLATE_ID.
// 4. Go to Account -> API Keys and get your PUBLIC_KEY.
// 5. Replace the placeholder strings below with your actual IDs.
// -------------------------------------------------------------

const EMAILJS_SERVICE_ID = 'service_2zsi6dq'
const EMAILJS_TEMPLATE_ID = 'template_huzov74'
const EMAILJS_PUBLIC_KEY = 'zvVdfMS9fhnLqFTM2'

/** Contact — message form powered by EmailJS. */
export default function Contact() {
  const containerRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { gsap } = useScrollAnimation()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useGSAP(() => {
    gsap.fromTo('.contact-header',
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }
    )

    gsap.fromTo('.contact-form',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }
    )
  }, { scope: containerRef })

  const sendEmail = (e: FormEvent) => {
    e.preventDefault()

    if (!formRef.current) return

    setIsSubmitting(true)
    setStatus('idle')

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsSubmitting(false)
          setStatus('success')
          formRef.current?.reset() // clear the form
          setTimeout(() => setStatus('idle'), 5000) // Reset after 5s
        },
        (error) => {
          console.error('EmailJS Error:', error)
          setIsSubmitting(false)
          setStatus('error')
          setTimeout(() => setStatus('idle'), 5000)
        }
      )
  }

  return (
    <section
      id="contact"
      ref={containerRef}
      className="flex min-h-screen items-center py-24"
    >
      <div className="container-main text-center">
        <h2 className="contact-header mb-6 text-4xl font-bold md:text-5xl">
          Get In <span className="text-primary">Touch</span>
        </h2>
        
        {/* Animated Social Links */}
        <div className="contact-header flex items-center justify-center gap-6 mb-8">
          <a href="https://github.com/tanvirRahan" target="_blank" rel="noreferrer" className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-surface-lighter/50 border border-white/5 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted group-hover:text-primary transition-colors"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17 0-1.5-.5-2.73-1.3-3.7.13-.32.6-1.74-.13-3.6 0 0-1.1-.35-3.6 1.35a12.8 12.8 0 0 0-6.6 0c-2.5-1.7-3.6-1.35-3.6-1.35-.73 1.86-.26 3.28-.13 3.6-.8.97-1.3 2.2-1.3 3.7 0 5.75 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8 18v4"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/tanvirrahanrifat/" target="_blank" rel="noreferrer" className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-surface-lighter/50 border border-white/5 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted group-hover:text-primary transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="mailto:tanvirrahanrifat@gmail.com" target="_blank" rel="noreferrer" className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-surface-lighter/50 border border-white/5 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted group-hover:text-primary transition-colors"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
          </a>
        </div>

        <p className="contact-header mb-12 text-lg text-text-muted max-w-2xl mx-auto">
          Whether you have a question, want to collaborate on a project, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
        </p>

        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="contact-form mx-auto flex w-full flex-col gap-6 text-left"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-text-muted">Name</label>
              <input
                type="text"
                id="name"
                name="user_name"
                required
                placeholder="John Doe"
                className="rounded-lg border border-surface-lighter bg-surface-light px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-text-muted">Email</label>
              <input
                type="email"
                id="email"
                name="user_email"
                required
                placeholder="john@example.com"
                className="rounded-lg border border-surface-lighter bg-surface-light px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-text-muted">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="Your message here..."
              className="resize-none rounded-lg border border-surface-lighter bg-surface-light px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            ></textarea>
          </div>

          <div className="flex flex-col items-center gap-4 mt-4">
            <Button
              variant="primary"
              className="w-full md:w-auto min-w-[200px] flex justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Sending... <Loader2 size={18} className="animate-spin" /></>
              ) : (
                <>Send Message <Send size={18} /></>
              )}
            </Button>

            {/* Status Messages */}
            <div className="h-8 transition-all duration-300">
              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-500 animate-in fade-in slide-in-from-bottom-2">
                  <CheckCircle2 size={18} />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 animate-in fade-in slide-in-from-bottom-2">
                  <AlertCircle size={18} />
                  <span>Failed to send message. Please try again later.</span>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
