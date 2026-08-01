import { useLenis } from 'lenis/react'
import { useEffect } from 'react'

/** Lenis smooth scroll hook — provides access to the lenis instance. */
export function useSmoothScroll() {
  const lenis = useLenis()

  // Optional: Add custom scroll logic or events here if needed
  useEffect(() => {
    if (!lenis) return

    // Example event listener
    // lenis.on('scroll', (e) => {
    //   console.log(e)
    // })
  }, [lenis])

  return lenis
}
