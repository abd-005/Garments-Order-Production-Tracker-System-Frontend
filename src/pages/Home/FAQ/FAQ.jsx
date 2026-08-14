import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const faqs = [
  {
    question: 'How long does it take to create a custom garment?',
    answer: 'Typically, custom garments take 2-4 weeks depending on complexity and your chosen materials. Rush orders are available for an additional fee.',
  },
  {
    question: 'What materials do you use?',
    answer: 'We source premium fabrics including cotton, silk, linen, and sustainable blends. All materials are ethically sourced and meet international quality standards.',
  },
  {
    question: 'Can I make changes to my order?',
    answer: 'Yes, you can modify your order within 48 hours of placement. After that, changes may not be possible due to production schedules.',
  },
  {
    question: 'Do you offer alterations?',
    answer: 'Absolutely! We provide complimentary alterations within 30 days of delivery. Additional alterations are available at discounted rates.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days if items are unworn and in original condition. Custom orders are non-returnable unless there is a defect.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Log in to your dashboard and visit "Track Order" to monitor your production status, delivery timeline, and shipping information in real-time.',
  },
]

const FAQ = () => {
  const container = useRef(null)
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggle = (index) =>
    setExpandedIndex(expandedIndex === index ? null : index)

  useGSAP(() => {
    gsap.to('.faq-blob-left', {
      x: 30,
      y: 20,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to('.faq-blob-right', {
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
      '.faq-badge',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    )
      .fromTo(
        '.faq-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        '.faq-desc',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.45'
      )
      .fromTo(
        '.faq-divider',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        '.faq-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
  }, { scope: container })

  return (
    <section ref={container} className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-linear-to-b from-base-200 via-base-100 to-base-200" />

      <div className="faq-blob-left absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />

      <div className="faq-blob-right absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="faq-badge inline-flex rounded-full bg-primary/10 px-5 py-2 text-xs font-semibold tracking-widest text-primary uppercase">
            Support
          </div>

          <h2 className="faq-title mt-6 text-4xl font-black lg:text-6xl text-base-content">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>

          <p className="faq-desc mt-6 text-lg leading-8 text-base-content/70">
            Find answers to common questions about our services and process.
          </p>

          <div className="faq-divider h-1 w-16 origin-center rounded-full bg-linear-to-r from-[#4c4452] to-[#dcd3e4] mx-auto mt-6" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = expandedIndex === index

            return (
              <div
                key={faq.question}
                className={`faq-item overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-primary/30 bg-base-100 shadow-xl shadow-primary/5'
                    : 'border-base-300 bg-base-100/70 hover:border-primary/25 hover:bg-base-100'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
                >
                  <h3 className="font-bold text-base-content">
                    {faq.question}
                  </h3>

                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen ? 'rotate-180 bg-primary' : 'bg-primary/10'
                    }`}
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-colors ${
                        isOpen ? 'text-primary-content' : 'text-primary'
                      }`}
                    />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-base-300 px-6 py-5 leading-7 text-base-content/70 sm:px-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
