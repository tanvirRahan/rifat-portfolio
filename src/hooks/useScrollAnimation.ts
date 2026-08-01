
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

/** 
 * Utility hook for GSAP + ScrollTrigger.
 * Simply importing this registers the plugins, but you can also use it to wrap useGSAP if needed.
 */
export function useScrollAnimation() {
  // We can return gsap and ScrollTrigger for convenience
  return { gsap, ScrollTrigger, useGSAP }
}
