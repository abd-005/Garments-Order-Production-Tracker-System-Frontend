import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ShoppingBag, ClipboardList, Factory, PackageCheck, ArrowRight } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const steps = [
  {
    icon: ShoppingBag,
    title: 'Choose Product',
    desc: 'Browse our curated collection and pick your favorite.',
  },
  {
    icon: ClipboardList,
    title: 'Customize & Book',
    desc: 'Provide measurements and preferences for a perfect fit.',
  },
  {
    icon: Factory,
    title: 'Production',
    desc: 'Skilled artisans craft your order with care.',
  },
  {
    icon: PackageCheck,
    title: 'Delivery',
    desc: 'Track your order until it reaches your doorstep.',
  },
]

const HowItWorks = () => {
  const container = useRef(null)

  useGSAP(() => {
    gsap.to('.hiw-blob-left', {
      x: 30,
      y: 20,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to('.hiw-blob-right', {
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
      '.hiw-badge',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    )
      .fromTo(
        '.hiw-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        '.hiw-desc',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.45'
      )
      .fromTo(
        '.hiw-divider',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        '.hiw-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        '.hiw-card',
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.14, duration: 0.6, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        '.hiw-step',
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.14,
          duration: 0.5,
          ease: 'back.out(2)',
        },
        '-=0.8'
      )
  }, { scope: container })

  return (
    <section ref={container} className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-base-200 via-base-100 to-base-200" />

      <div className="hiw-blob-left absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />

      <div className="hiw-blob-right absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="hiw-heading mx-auto mb-20 max-w-3xl text-center">
          <div className="hiw-badge inline-flex rounded-full bg-primary/10 px-5 py-2 text-xs font-semibold tracking-widest text-primary uppercase">
            How It Works
          </div>

          <h2 className="hiw-title mt-6 text-4xl font-black lg:text-6xl text-base-content">
            Simple steps,
            <span className="block text-primary">Seamless delivery.</span>
          </h2>

          <p className="hiw-desc mt-6 text-lg leading-8 text-base-content/70">
            From selection to doorstep, follow a clear and effortless journey
            built around your garment.
          </p>

          <div className="hiw-divider h-1 w-16 origin-center rounded-full bg-linear-to-r from-[#4c4452] to-[#dcd3e4] mx-auto mt-6" />
        </div>

        <div className="relative">
          <div className="hiw-line absolute top-12 right-[12.5%] left-[12.5%] hidden h-px border-t-2 border-dashed border-primary/20 lg:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon

              return (
              <div key={step.title} className="relative">
                <div className="hiw-card group relative flex h-full flex-col items-center rounded-3xl border border-base-300 bg-base-100/80 p-8 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:bg-base-100 hover:shadow-2xl hover:shadow-primary/5">
                  <div className="relative mb-6">
                    <div className="hiw-step flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-primary/15">
                      <Icon className="h-9 w-9 text-primary" strokeWidth={1.8} />
                    </div>

                    <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-content shadow-lg shadow-primary/30">
                      {i + 1}
                    </span>
                  </div>

                  <h4 className="mb-2 text-xl font-bold text-base-content transition-colors duration-500 group-hover:text-primary">
                    {step.title}
                  </h4>

                  <p className="leading-7 text-base-content/70">{step.desc}</p>
                </div>

                {i < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-5 z-10 hidden -translate-y-1/2 lg:flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-base-100 text-primary shadow-lg">
                      <ArrowRight className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                  </div>
                )}
              </div>
            )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
