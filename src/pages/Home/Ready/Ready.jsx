import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useNavigate } from 'react-router'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const readyStats = [
  { value: '10k+', label: 'Happy Customers' },
  { value: '500+', label: 'Products Crafted' },
  { value: '99%', label: 'On-Time Delivery' },
]

const Ready = () => {
  const container = useRef(null)
  const navigate = useNavigate()

  useGSAP(() => {
    gsap.to('.ready-blob-1', {
      x: 30,
      y: 20,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to('.ready-blob-2', {
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
      '.ready-badge',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    )
      .fromTo(
        '.ready-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        '.ready-desc',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.45'
      )
      .fromTo(
        '.ready-divider',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        '.ready-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        '.ready-stat',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )
  }, { scope: container })

  return (
    <section ref={container} className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-linear-to-b from-base-200 via-base-100 to-base-200" />

      <div className="ready-blob-1 absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />

      <div className="ready-blob-2 absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="ready-badge inline-flex rounded-full bg-primary/10 px-5 py-2 text-xs font-semibold tracking-widest text-primary uppercase">
            Get Started
          </div>

          <h2 className="ready-title mt-6 text-4xl font-black lg:text-6xl text-base-content">
            Ready to get <span className="text-primary">measured?</span>
          </h2>

          <p className="ready-desc mt-6 text-lg leading-8 text-base-content/70">
            Book a product or request a custom fitting — we&rsquo;ll guide you
            through every step.
          </p>

          <div className="ready-divider h-1 w-16 origin-center rounded-full bg-linear-to-r from-[#4c4452] to-[#dcd3e4] mx-auto mt-6" />
        </div>

        <div className="ready-card relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-primary via-[#57505d] to-accent/90 p-8 shadow-2xl shadow-primary/20 sm:p-12 lg:p-16">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-[100px]" />

          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-accent/40 blur-[110px]" />

          <div className="relative flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
            <div className="max-w-xl">
              <h3 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                Ready to get measured?
              </h3>

              <p className="mt-4 text-lg leading-8 text-white/70">
                Book a product or request a custom fitting — we&rsquo;ll guide
                you through the process from start to finish.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="group btn rounded-2xl border-none bg-white px-7 py-3.5 font-bold text-primary shadow-xl shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-white/90"
              >
                View Products
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn rounded-2xl border-2 border-white/30 bg-transparent px-7 py-3.5 font-bold text-white transition-all duration-300 hover:scale-105 hover:border-white/60 hover:bg-white/10"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {readyStats.map((stat) => (
            <div
              key={stat.label}
              className="ready-stat rounded-3xl border border-base-300 bg-base-100/70 p-8 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="text-3xl font-black text-primary">{stat.value}</div>

              <div className="mt-2 text-base-content/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Ready
