import { useRef } from 'react'
import { Link } from 'react-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react'
import logo from '../../../assets/logo.png'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'All Products' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

const supportLinks = [
  { to: '/help', label: 'Help & Support' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms-conditions', label: 'Terms & Conditions' },
]

const contactItems = [
  { icon: Mail, text: 'contact@tailorflow.com' },
  { icon: Phone, text: '+1 (234) 567-890' },
  { icon: MapPin, text: '123 Tailor Street, Fashion City' },
]

const socials = [
  { icon: FaXTwitter, href: 'https://www.x.com/ab0ahad', label: 'Twitter / X' },
  { icon: FaFacebook, href: 'https://www.facebook.com/ab0ahad', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/ab0ahad/', label: 'Instagram' },
]

const Footer = () => {
  const container = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      '.footer-col',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
    )
  }, { scope: container })

  return (
    <footer ref={container} className="relative overflow-hidden bg-[#211c29] text-white">
      <div className="absolute inset-0 bg-linear-to-br from-[#2b2433]/80 via-transparent to-[#3d2a3a]/60" />

      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-white/10 blur-[120px]" />

      <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-accent/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="footer-col">
            <div className="flex items-center gap-3">
              <img src={logo} alt="TailorFlow logo" className="w-10" />
              <span className="text-3xl font-black tracking-tight text-white">
                Tailor<span className="text-accent">Flow</span>
              </span>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              Premium garment production and order tracking for discerning
              customers worldwide. Your trusted partner in quality craftsmanship.
            </p>
          </div>

          <div className="footer-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1.5 text-white/70 transition-colors duration-300 hover:text-accent"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-accent/60 transition-transform duration-300 group-hover:translate-x-0.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">
              Support
            </h3>

            <ul className="mt-6 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1.5 text-white/70 transition-colors duration-300 hover:text-accent"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-accent/60 transition-transform duration-300 group-hover:translate-x-0.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">
              Get in Touch
            </h3>

            <ul className="mt-6 space-y-3">
              {contactItems.map((item) => {
                const ContactIcon = item.icon

                return (
                  <li key={item.text} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                      <ContactIcon className="h-4 w-4 text-accent" />
                    </span>
                    {item.text}
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 flex gap-3">
              {socials.map((item) => {
                const SocialIcon = item.icon

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-white/15 hover:text-accent"
                  >
                    <SocialIcon size={16} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-sm text-white/50">
            Copyright © {new Date().getFullYear()} TailorFlow. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link to="/privacy" className="transition-colors hover:text-accent">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="transition-colors hover:text-accent">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
