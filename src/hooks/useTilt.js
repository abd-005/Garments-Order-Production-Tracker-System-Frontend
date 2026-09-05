import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'

const useTilt = (containerRef, selector = '.tilt-card', max = 16) => {
  useLayoutEffect(() => {
    if (!containerRef.current) return

    const cards = gsap.utils.toArray(selector, containerRef.current)

    const disposers = cards.map((card) => {
      const rotateX = gsap.quickTo(card, 'rotationX', {
        duration: 0.6,
        ease: 'power3.out',
      })
      const rotateY = gsap.quickTo(card, 'rotationY', {
        duration: 0.6,
        ease: 'power3.out',
      })

      card.style.transformStyle = 'preserve-3d'
      card.style.willChange = 'transform'

      const onEnter = () => {
        gsap.to(card, {
          scale: 1.02,
          boxShadow: '0 30px 60px -15px rgba(203, 166, 85, 0.25)',
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }

      const onMove = (e) => {
        const rect = card.getBoundingClientRect()
        rotateY(((e.clientX - rect.left) / rect.width - 0.5) * max)
        rotateX(((rect.top - e.clientY) / rect.height + 0.5) * max)
      }

      const onLeave = () => {
        rotateX(0)
        rotateY(0)
        gsap.to(card, {
          scale: 1,
          boxShadow: '0 0 0 0 rgba(203, 166, 85, 0)',
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
  }, [containerRef])
}

export default useTilt