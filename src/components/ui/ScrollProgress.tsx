import { useEffect } from 'react'

/** Thin red progress bar that tracks scroll position — fixed at top of page. */
export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return

    const update = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop
      const max = h.scrollHeight - h.clientHeight
      const pct = max > 0 ? (scrolled / max) * 100 : 0
      bar.style.width = pct + '%'
    }

    document.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      document.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <div id="scroll-progress" aria-hidden="true" />
}
