import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const contactItems = [
  { icon: Mail, href: 'mailto:contact@tailorflow.com', text: 'contact@tailorflow.com' },
  { icon: Phone, href: 'tel:+1234567890', text: '+1 (234) 567-890' },
  { icon: MapPin, text: '123 Tailor Street, Fashion City' },
]

const Newsletter = () => {
  const container = useRef(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }, 1000)
  }

  useGSAP(() => {
    gsap.to('.news-blob-1', {
      x: 30,
      y: 20,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to('.news-blob-2', {
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
      '.news-badge',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    )
      .fromTo(
        '.news-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        '.news-desc',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.45'
      )
      .fromTo(
        '.news-contact',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(
        '.news-form',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
  }, { scope: container })

  return (
    <section ref={container} className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-linear-to-br from-primary via-[#57505d] to-accent/80" />

      <div className="news-blob-1 absolute -left-40 top-0 h-96 w-96 rounded-full bg-white/10 blur-[120px]" />

      <div className="news-blob-2 absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-accent/40 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="news-badge inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold tracking-widest text-white uppercase">
              Newsletter
            </div>

            <h2 className="news-title mt-6 text-4xl font-black text-white lg:text-6xl">
              Stay <span className="text-accent">Updated.</span>
            </h2>

            <p className="news-desc mt-6 text-lg leading-8 text-white/70">
              Subscribe to our newsletter for exclusive offers, new collections,
              and style tips delivered directly to your inbox.
            </p>

            <div className="mt-10 space-y-4">
              {contactItems.map((item) => {
                const ContactIcon = item.icon

                return (
                  <div key={item.text} className="news-contact flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                      <ContactIcon className="h-5 w-5 text-accent" />
                    </div>

                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-medium text-white transition-colors hover:text-accent"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="font-medium text-white">{item.text}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="news-form rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl sm:p-10">
            <h3 className="text-2xl font-bold text-white">Get the latest first</h3>

            <p className="mt-2 text-white/60">Join our community and never miss a drop.</p>

            <form onSubmit={handleSubscribe} className="mt-8 space-y-4">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/80">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-white/40 outline-none transition-all duration-300 focus:border-accent focus:bg-white/15"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group btn w-full rounded-2xl border-none bg-accent px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:bg-accent/90 disabled:opacity-50"
              >
                {loading ? (
                  'Subscribing...'
                ) : (
                  <>
                    Subscribe Now
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {submitted && (
                <p className="flex items-center justify-center gap-2 text-sm font-medium text-accent">
                  <CheckCircle2 className="h-4 w-4" />
                  Thanks for subscribing!
                </p>
              )}
            </form>

            <p className="mt-6 text-center text-sm text-white/50">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
