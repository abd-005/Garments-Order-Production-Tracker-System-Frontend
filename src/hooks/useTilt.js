import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'

const useTilt = (
  containerRef,
  selector = '.tilt-card',
  innerSelector = '.tilt-inner',
  deps = []
) => {
  useLayoutEffect(() => {
    if (!containerRef.current) return
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) return

    const cards = gsap.utils.toArray(selector, containerRef.current)

    const glow = '0 30px 60px -15px rgba(203, 166, 85, 0.25)'
    const emptyGlow = '0 0 0 0 rgba(203, 166, 85, 0)'

    const disposers = cards.map((card) => {
      card.style.willChange = 'transform'
      card.style.transformStyle = 'preserve-3d'

      const cardProxy = gsap.quickTo(card, 'rotationX', {
        duration: 0.6,
        ease: 'power3.out',
      })
      const inner = card.querySelector(innerSelector)
      const innerProxy = inner
        ? gsap.quickTo(inner, 'rotation', { duration: 0.6, ease: 'power3.out' })
        : null

      const onEnter = () => {
        gsap.to(card, {
          scale: 1.02,
          boxShadow: glow,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }

      const onMove = (e) => {
        const rect = card.getBoundingClientRect()
        const relX = (e.clientX - rect.left) / rect.width
        const relY = (e.clientY - rect.top) / rect.height
        cardProxy((0.5 - relY) * 18)
        if (innerProxy) innerProxy((relX - 0.5) * 22)
      }

      const onLeave = () => {
        cardProxy(0)
        if (innerProxy) innerProxy(0)
        gsap.to(card, {
          scale: 1,
          boxShadow: emptyGlow,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }

      card.addEventListener('pointerenter', onEnter)
      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerleave', onLeave)

      return () => {
        card.removeEventListener('pointerenter', onEnter)
        card.removeEventListener('pointermove', onMove)
        card.removeEventListener('pointerleave', onLeave)
      }
    })

    return () => disposers.forEach((dispose) => dispose())
  }, [containerRef, ...deps])
}

export default useTilt