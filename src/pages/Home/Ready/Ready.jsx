import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useNavigate } from 'react-router'
import { ArrowRight } from 'lucide-react'
import useTilt from '../../../hooks/useTilt'
import countUp from '../../../utils/countUp'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const readyStats = [
  { value: 10, suffix: 'k+', label: 'Happy Customers' },
  { value: 500, suffix: '+', label: 'Products Crafted' },
  { value: 99, suffix: '%', label: 'On-Time Delivery' },
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

    gsap.to('.ready-blob-1, .ready-blob-2', {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
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
      '.ready-card',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
    )
      .fromTo(
        '.ready-badge',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.4'
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
        '.ready-stat',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )
      .add(() => countUp(container.current, '.ready-stat-value', { duration: 1.6 }))
  }, { scope: container })

  useTilt(container)

  return (
    <section ref={container} className="relative overflow-x-clip py-24">
      <div className="absolute inset-0 bg-linear-to-b from-base-200 via-base-100 to-base-200" />

      <div className="ready-blob-1 absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />

      <div className="ready-blob-2 absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Card className="ready-card relative z-10 -mt-36 gap-0 overflow-hidden rounded-[2.5rem] border-0 bg-[var(--app-bg-sectional)] p-8 shadow-2xl shadow-primary/10 sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-accent/20" />

          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-base-100/30 blur-[100px]" />

          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-primary/25 blur-[110px]" />

          <div className="relative flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
            <div className="max-w-xl">
              <h3 className="text-3xl font-black text-base-content sm:text-4xl lg:text-5xl">
                Ready to get measured?
              </h3>

              <p className="mt-4 text-lg leading-8 text-base-content/70">
                Book a product or request a custom fitting — we&rsquo;ll guide
                you through the process from start to finish.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                type="button"
                onClick={() => navigate('/products')}
                className="group rounded-2xl px-7 py-3.5 font-bold shadow-xl shadow-black/10 transition-all duration-300 hover:scale-105"
              >
                View Products
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                type="button"
                onClick={() => navigate('/dashboard')}
                className="rounded-2xl border-2 border-primary/40 bg-transparent px-7 py-3.5 font-bold text-base-content transition-all duration-300 hover:scale-105 hover:border-primary/70 hover:bg-primary/10"
              >
                Get Started
              </Button>
            </div>
          </div>
        </Card>

        <div className="mx-auto mt-20 mb-16 max-w-3xl text-center">
          <Badge variant="secondary" className="ready-badge rounded-full bg-primary/10 px-5 py-2 text-xs font-semibold tracking-widest text-primary uppercase">
            Get Started
          </Badge>

          <h2 className="ready-title mt-6 text-4xl font-black lg:text-6xl text-base-content">
            Ready to get <span className="text-primary">measured?</span>
          </h2>

          <p className="ready-desc mt-6 text-lg leading-8 text-base-content/70">
            Book a product or request a custom fitting — we&rsquo;ll guide you
            through every step.
          </p>

          <div className="ready-divider h-1 w-16 origin-center rounded-full bg-linear-to-r from-primary to-secondary mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {readyStats.map((stat) => (
            <Card
              key={stat.label}
              className="ready-stat tilt-card flex-col items-center gap-0 rounded-3xl border-0 bg-card p-8 text-center"
            >
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className="ready-stat-value text-3xl font-black text-primary"
                  data-value={stat.value}
                >
                  0
                </span>
                <span className="text-3xl font-black text-primary">{stat.suffix}</span>
              </div>

              <div className="mt-2 text-base-content/60">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Ready