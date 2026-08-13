import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Quote, Star } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const feedbacks = [
  {
    id: 1,
    name: 'Ayesha',
    role: 'Verified Buyer',
    text: 'Amazing craftsmanship — the fit is absolutely perfect and the fabric feels premium.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rafi',
    role: 'Long-time Customer',
    text: 'Great communication and surprisingly fast delivery. Everything arrived exactly as promised.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mina',
    role: 'Design Partner',
    text: 'Quality materials and excellent finish. Our entire team trusts this platform for production.',
    rating: 5,
  },
]

const Feedback = () => {
  const container = useRef(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % feedbacks.length), 4500)
    return () => clearInterval(t)
  }, [])

  useGSAP(() => {
    gsap.to('.fb-blob-left', {
      x: 30,
      y: 20,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to('.fb-blob-right', {
      x: -25,
      y: -18,
      duration: 11,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
        end: 'bottom top',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      '.fb-badge',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    )
      .fromTo(
        '.fb-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        '.fb-desc',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.45'
      )
      .fromTo(
        '.fb-divider',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        '.fb-card',
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.3'
      )
  }, { scope: container })

  const current = feedbacks[index]

  return (
    <section ref={container} className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-linear-to-b from-base-200 via-base-100 to-base-200" />

      <div className="fb-blob-left absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />

      <div className="fb-blob-right absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="fb-badge inline-flex rounded-full bg-primary/10 px-5 py-2 text-xs font-semibold tracking-widest text-primary uppercase">
            Testimonials
          </div>

          <h2 className="fb-title mt-6 text-4xl font-black lg:text-6xl text-base-content">
            Customer <span className="text-primary">Feedback</span>
          </h2>

          <p className="fb-desc mt-6 text-lg leading-8 text-base-content/70">
            Real words from real customers who trust our craft.
          </p>

          <div className="fb-divider h-1 w-16 origin-center rounded-full bg-linear-to-r from-[#4c4452] to-[#dcd3e4] mx-auto mt-6" />
        </div>

        <div className="fb-card mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="rounded-3xl border border-base-300 bg-base-100/80 p-8 text-center shadow-xl backdrop-blur-xl shadow-primary/5 sm:p-12"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Quote className="h-7 w-7 text-primary" />
              </div>

              <div className="mt-6 flex items-center justify-center gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-accent text-accent"
                  />
                ))}
              </div>

              <p className="mt-6 text-lg font-medium leading-9 text-base-content/80 sm:text-2xl">
                &ldquo;{current.text}&rdquo;
              </p>

              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
                  {current.name.charAt(0)}
                </div>

                <div className="text-left">
                  <p className="font-bold text-base-content">{current.name}</p>
                  <p className="text-sm text-base-content/60">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-3">
            {feedbacks.map((f, i) => (
              <button
                key={f.id}
                type="button"
                aria-label={`Show feedback from ${f.name}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-primary' : 'w-2.5 bg-primary/20 hover:bg-primary/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feedback
