import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import useTilt from '../../../hooks/useTilt'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

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
  const [openIndex, setOpenIndex] = useState(null)

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

  useTilt(container)

  return (
    <section ref={container} className="relative overflow-hidden pt-24 pb-40">
      <div className="absolute inset-0 bg-linear-to-b from-base-200 via-base-100 to-base-200" />

      <div className="faq-blob-left absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />

      <div className="faq-blob-right absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge variant="secondary" className="faq-badge rounded-full bg-primary/10 px-5 py-2 text-xs font-semibold tracking-widest text-primary uppercase">
            Support
          </Badge>

          <h2 className="faq-title mt-6 text-4xl font-black lg:text-6xl text-base-content">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>

          <p className="faq-desc mt-6 text-lg leading-8 text-base-content/70">
            Find answers to common questions about our services and process.
          </p>

          <div className="faq-divider h-1 w-16 origin-center rounded-full bg-linear-to-r from-primary to-secondary mx-auto mt-6" />
        </div>

        <Accordion
          type="single"
          collapsible
          value={openIndex}
          onValueChange={setOpenIndex}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={String(index)}
              className="faq-item tilt-card overflow-hidden rounded-2xl border border-base-300 bg-card/70 transition-all duration-300 hover:border-primary/25 hover:bg-card data-[state=open]:border-primary/30 data-[state=open]:bg-card data-[state=open]:shadow-xl data-[state=open]:shadow-primary/5"
            >
              <AccordionTrigger className="flex-1 gap-4 px-6 py-5 text-left focus-visible:ring-primary/20 sm:px-8 [&[data-state=open]]:text-base-content [&_svg]:size-6 [&_svg]:text-primary">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="animate-none pb-0">
                <p className="border-t border-base-300 px-6 py-5 leading-7 text-base-content/70 sm:px-8">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FAQ
