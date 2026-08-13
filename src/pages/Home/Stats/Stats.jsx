import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Users, Shirt, Clock, BadgeCheck } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'Happy Customers' },
  { icon: Shirt, value: 5000, suffix: '+', label: 'Products Crafted' },
  { icon: Clock, value: 99, suffix: '%', label: 'On-Time Delivery' },
  { icon: BadgeCheck, value: 100, suffix: '%', label: 'Quality Standards' },
]

const Stats = () => {
  const container = useRef(null)

  useGSAP(() => {
    gsap.to('.stats-blob-1', {
      x: 35,
      y: 18,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to('.stats-blob-2', {
      x: -30,
      y: -20,
      duration: 10,
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
      '.stats-badge',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    )
      .fromTo(
        '.stats-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        '.stats-desc',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.45'
      )
      .fromTo(
        '.stats-card',
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(
        '.stats-icon',
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(2)',
        },
        '<'
      )
      .add(() => {
        container.current.querySelectorAll('.stats-value').forEach((el) => {
          const target = Number(el.dataset.value)
          const obj = { val: 0 }

          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.floor(obj.val).toLocaleString('en-US')
            },
          })
        })
      })
  }, { scope: container })

  return (
    <section ref={container} className="relative overflow-hidden bg-primary py-24">
      <div className="absolute inset-0 bg-linear-to-br from-primary via-[#57505d] to-accent/80" />

      <div className="stats-blob-1 absolute -left-40 top-0 h-96 w-96 rounded-full bg-white/10 blur-[120px]" />

      <div className="stats-blob-2 absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-accent/40 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="stats-badge inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold tracking-widest text-white uppercase">
            Our Achievements
          </div>

          <h2 className="stats-title mt-6 text-4xl font-black text-white lg:text-6xl">
            Numbers that
            <span className="block text-accent">speak for themselves.</span>
          </h2>

          <p className="stats-desc mt-6 text-lg leading-8 text-white/70">
            Trusted by thousands of customers worldwide for premium garments.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => {
            const StatIcon = stat.icon

            return (
              <div
                key={stat.label}
                className="stats-card group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-white/15 hover:shadow-2xl hover:shadow-black/20"
              >
                <div className="stats-icon mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-white/20">
                  <StatIcon className="h-8 w-8 text-white" />
                </div>

                <div className="mt-6 flex items-baseline justify-center gap-1">
                  <span
                    className="stats-value text-4xl font-black text-white"
                    data-value={stat.value}
                  >
                    0
                  </span>
                  <span className="text-2xl font-black text-accent">
                    {stat.suffix}
                  </span>
                </div>

                <p className="mt-2 font-semibold text-white/70">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Stats
