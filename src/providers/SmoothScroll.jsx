import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const SmoothScroll = () => {
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    })

    // Re-measure all ScrollTriggers (including pins) now that the smoother exists
    let raf
    raf = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(raf)
      smoother?.kill()
    }
  }, [])

  return null
}

export default SmoothScroll