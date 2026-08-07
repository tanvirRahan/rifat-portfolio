import { useState, useEffect, useRef } from 'react'

/** Full nav order: Home → About → Experience → Skills → Projects → Achievements → Contact */
const NAV_LINKS = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Projects',     href: '#work' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact',      href: '#contact' },
] as const

/** Sticky editorial navbar — scrollspy, mobile menu. */
export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false)
  const [activeId, setActiveId] = useState('home')
  const linksRef = useRef<HTMLDivElement>(null)

  /* Scrollspy */
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.getAttribute('id') ?? '')
        })
      },
      { rootMargin: '-20% 0px -70% 0px' } /* Trigger point at 20% from top */
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const handleLinkClick = (href: string) => {
    setIsOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        id="navbar"
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(234, 230, 219, 0.88)', /* Match Soft Oatmeal background */
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '2rem', height: '68px' }}>

          {/* Desktop nav links */}
          <div
            ref={linksRef}
            id="navLinks"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontFamily: 'var(--font-mono)', fontSize: '11.5px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            className="nav-links-desktop"
          >
            {NAV_LINKS.map(({ label, href }, idx) => {
              const id = href.slice(1)
              const isActive = activeId === id
              return (
                <div key={href} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {/* Dot separator before active item */}
                  <span style={{ color: 'var(--color-accent)', fontSize: '8px', opacity: isActive ? 1 : 0, transition: 'opacity .2s', userSelect: 'none', marginRight: '2px' }}>•</span>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(href) }}
                    style={{
                      position: 'relative',
                      color: isActive ? 'var(--color-ink)' : 'var(--color-muted)',
                      padding: '3px 2px',
                      transition: 'color .2s ease',
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                    }}
                    className="nav-link"
                  >
                    {label}
                    <span style={{ position: 'absolute', left: 0, bottom: 0, height: '1px', background: 'var(--color-accent)', transition: 'width .25s ease', width: isActive ? '100%' : '0' }} />
                  </a>
                  <span style={{ color: 'var(--color-accent)', fontSize: '8px', opacity: isActive ? 1 : 0, transition: 'opacity .2s', userSelect: 'none', marginLeft: '2px' }}>•</span>
                  {/* Separator between items — except last */}
                  {idx < NAV_LINKS.length - 1 && (
                    <span style={{ color: 'var(--color-line)', fontSize: '14px', marginLeft: '2px', userSelect: 'none' }}>|</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile toggle */}
          <button
            id="navToggle"
            onClick={() => setIsOpen(!isOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-ink)' }}
            className="nav-toggle"
            aria-label="Toggle menu"
          >
            {isOpen ? 'Close ✕' : 'Menu ☰'}
          </button>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div style={{ background: 'var(--color-base)', borderBottom: '1px solid var(--color-line)' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(href) }}
                style={{ display: 'block', padding: '0.9rem 2rem', borderBottom: '1px solid var(--color-line)', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-muted)' }}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) { .cmdk-hint { display: none !important; } }
        @media (max-width: 780px) { .nav-links-desktop { display: none !important; } .nav-toggle { display: block !important; } }
        .nav-link:hover { color: var(--color-ink) !important; }
        .nav-link:hover span { width: 100% !important; }
      `}</style>
    </>
  )
}
