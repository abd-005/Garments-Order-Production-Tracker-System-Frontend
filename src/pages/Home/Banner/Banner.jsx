import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import {
  ArrowRight,
  Package,
  ShieldCheck,
  Truck,
  Star
} from 'lucide-react'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

import img1 from '../../../assets/img/Image-1.jpg'
import img2 from '../../../assets/img/Image-2.jpg'
import img3 from '../../../assets/img/Image-3.jpg'
import img4 from '../../../assets/img/Image-4.jpg'
import img5 from '../../../assets/img/Image-5.jpg'

gsap.registerPlugin(useGSAP)

const slides = [
  img1,
  img2,
  img3,
  img4,
  img5
]

const stats = [
  {
    title: '500+',
    subtitle: 'Successful Orders'
  },
  {
    title: '98%',
    subtitle: 'On-Time Delivery'
  },
  {
    title: '50+',
    subtitle: 'Manufacturing Partners'
  }
]

const features = [
  {
    icon: ShieldCheck,
    text: 'Verified Manufacturers'
  },
  {
    icon: Truck,
    text: 'Live Order Tracking'
  },
  {
    icon: Package,
    text: 'Premium Quality Products'
  }
]

const Banner = () => {
  const navigate = useNavigate()

  const container = useRef()


  useEffect(() => {

    const blobLeft = gsap.to(".blob-left", {
      x: 40,
      y: 20,
      repeat: -1,
      yoyo: true,
      duration: 8,
      ease: "sine.inOut"
    })

    const blobRight = gsap.to(".blob-right", {
      x: -30,
      y: -20,
      repeat: -1,
      yoyo: true,
      duration: 10,
      ease: "sine.inOut"
    })


    return () => {
      blobLeft.kill()
      blobRight.kill()
    }
  }, [])


  useGSAP(
    () => {
      const tl = gsap.timeline()

      tl.from('.hero-badge', {
        y: 30,
        opacity: 0,
        duration: .6
      })

      tl.from('.hero-title', {
        y: 60,
        opacity: 0,
        duration: .8
      }, '-=.2')

      tl.from('.hero-desc', {
        y: 30,
        opacity: 0,
        duration: .6
      }, '-=.4')

      tl.from('.hero-buttons', {
        y: 20,
        opacity: 0,
        duration: .5
      }, '-=.3')

      tl.from('.stat-card', {
        y: 40,
        opacity: 0,
        stagger: .15,
        duration: .6
      }, '-=.2')

      tl.fromTo(
        '.floating-card',
        {
          scale: .8,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: .7,
          stagger: .2
        },
        '-=.5'
      )

    },
    {
      scope: container
    }
  )

  return (
    <section
      ref={container}
      className="relative overflow-hidden bg-base-100 flex items-center py-24 lg:py-32 lg:min-h-screen"
    >
      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      <div className="absolute blob-right -top-52 -left-52 w-[260px] h-[260px] lg:w-[500px] lg:h-[500px] rounded-full bg-primary/25 blur-[120px]" />

      <div className="absolute blob-left bottom-0 right-0 w-[250px] h-[250px] lg:w-[450px] lg:h-[450px] rounded-full bg-accent/30 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 py-14 md:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT */}

        <div className='max-w-xl'>

          <div className='flex justify-center lg:justify-start'>
            <div className="hero-badge inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-xs sm:text-sm font-semibold">

            <Star className="fill-current w-4 h-4" />

            Trusted by Manufacturers Worldwide

          </div>
          </div>

          <h1 className="hero-title mt-6 text-4xl sm:text-5xl lg:text-7xl font-black leading-tight text-base-content text-center lg:text-left">

            Modern Garment

            <span className="block text-primary">

              Manufacturing.

            </span>

            Built Smarter.

          </h1>

          <p className="hero-desc mt-6 text-base sm:text-lg text-base-content/70 leading-7 sm:leading-8 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">

            Manage products, manufacturers, production and deliveries from one beautifully crafted platform.

          </p>

          <div className="hero-buttons mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">

            <button
              onClick={() => navigate('/products')}
              className="btn
              group
              btn-primary
              btn-lg
              rounded-2xl
              shadow-xl
              hover:scale-105
              hover:shadow-primary/30
              transition-all
              duration-300"
            >
              Explore Products
              <ArrowRight
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="btn
              group
              btn-secondary
              btn-lg
              rounded-2xl
              shadow-xl
              hover:scale-105
              hover:shadow-secondary/30
              transition-all
              duration-300"
            >
              Dashboard
            </button>

          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">

            {stats.map(item => (

              <div
                key={item.title}
                className="stat-card bg-base-100 border border-base-300 rounded-2xl shadow-lg p-5 text-center"
              >

                <h2 className="text-2xl sm:text-3xl font-black text-primary">

                  {item.title}

                </h2>

                <p className="text-base-content/60 mt-2">

                  {item.subtitle}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative">

          <div className="overflow-hidden rounded-[40px] lg:rounded-[36px] shadow-2xl border border-base-300">

            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              loop
              speed={1200}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true
              }}
              onSwiper={(swiper) => {

                const current =
                  swiper.slides[swiper.activeIndex].querySelector("img")

                gsap.fromTo(current, {
                  scale: 1.15,
                  opacity: .7
                }, {
                  scale: 1,
                  opacity: 1,
                  duration: 1.4
                })

              }}
              onSlideChange={(swiper) => {

                const currentImage =
                  swiper.slides[swiper.activeIndex].querySelector("img")

                gsap.fromTo(
                  currentImage,
                  {
                    scale: 1.15,
                    opacity: .7,
                    y: 40
                  },
                  {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 1.4,
                    ease: "power3.out"
                  }
                )

              }}
            >
              {slides.map((image, i) => (

                <SwiperSlide key={i}>

                  <img
                    src={image}
                    alt={`Garment manufacturing ${i + 1}`}
                    className="hero-image w-full h-[320px] sm:h-[450px] md:h-[560px] lg:h-[700px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                </SwiperSlide>

              ))}

            </Swiper>

          </div>

          {/* Left Floating */}

          <div className="floating-card hidden md:block z-10 absolute -left-10 top-14 bg-base-100 rounded-3xl shadow-xl p-5 backdrop-blur border border-base-300">

            {features.map(({ icon: Icon, text }) => (

              <div
                key={text}
                className="flex items-center gap-3 py-3"
              >

                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">

                  <Icon
                    className="text-primary"
                    size={18}
                  />

                </div>

                <span className="font-semibold">

                  {text}

                </span>

              </div>

            ))}

          </div>

          {/* Bottom Right */}

          <div className="floating-card hidden md:block z-20 absolute -right-8 bottom-10 bg-base-100 rounded-3xl shadow-xl px-8 py-6 border border-base-300">

            <p className="text-base-content/60">

              Production Growth

            </p>

            <h2 className="text-4xl font-black text-primary mt-1">

              +24%

            </h2>

            <p className="text-green-500 font-semibold mt-2">

              This Month

            </p>

          </div>
          <div className="lg:hidden mt-6 space-y-4">

            {/* Moblie Card */}

            <div className="bg-base-100 border border-base-300 rounded-2xl p-5 shadow-lg">
              {features.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 py-2"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon
                      size={18}
                      className="text-primary"
                    />
                  </div>

                  <span className="font-medium">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-base-100 border border-base-300 rounded-2xl p-5 shadow-lg text-center">
              <p className="text-base-content/60">
                Production Growth
              </p>

              <h2 className="text-3xl font-black text-primary mt-2">
                +24%
              </h2>

              <p className="text-green-500 font-semibold">
                This Month
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Banner