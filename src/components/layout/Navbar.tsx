import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utils/cn'

/** Navigation links configuration. */
const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const

/** Fixed navbar with glassmorphism, scroll detection, and mobile menu. */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  /* Track scroll position to toggle background opacity. */
  useEffect(() => {
    const handleScroll = () => {
      // Guard: only update state when the boolean threshold actually changes
      // Prevents a React re-render on every single scroll pixel
      const scrolled = window.scrollY > 50
      setIsScrolled((prev) => (prev === scrolled ? prev : scrolled))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Smooth scroll to section and close mobile menu. */
  const scrollTo = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      id="navbar"
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-surface/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10'
          : 'bg-transparent'
      )}
    >
      <nav className="container-main flex items-center justify-end py-4 pointer-events-none">
        {/* Desktop links - Futuristic Cyan HUD style */}
        <ul className="hidden md:flex items-center gap-6 pointer-events-auto">
          {NAV_LINKS.map(({ label, href }, index) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => { e.preventDefault(); scrollTo(href) }}
                className="animate-hud-float relative flex items-center justify-center rounded-full border border-secondary/30 bg-surface-light/50 backdrop-blur-md px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-secondary/90 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:border-secondary hover:bg-secondary/20 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text-muted transition-colors hover:text-primary cursor-pointer pointer-events-auto"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 bg-surface/95 backdrop-blur-xl',
          isOpen ? 'max-h-80 border-b border-white/5' : 'max-h-0'
        )}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => { e.preventDefault(); scrollTo(href) }}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-light hover:text-primary"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
