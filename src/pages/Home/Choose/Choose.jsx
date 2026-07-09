import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import svg1 from "../../../assets/svg/01.png";
import svg2 from "../../../assets/svg/02.png";
import svg3 from "../../../assets/svg/03.png";
import svg4 from "../../../assets/svg/04.png";
import svg5 from "../../../assets/svg/05.png";
import svg6 from "../../../assets/svg/06.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const leftItems = [
  {
    image: svg1,
    title: "Collaborative Approach",
    description:
      "We work closely with you throughout the journey, ensuring every garment reflects your vision and measurements.",
  },
  {
    image: svg2,
    title: "Refined Quality",
    description:
      "Premium fabrics, precise tailoring and rigorous quality inspections guarantee lasting excellence.",
  },
  {
    image: svg3,
    title: "Sustainable Process",
    description:
      "Eco-conscious materials and responsible manufacturing minimize waste without sacrificing luxury.",
  },
];

const rightItems = [
  {
    image: svg6,
    title: "Artisanal Craft",
    description:
      "Experienced craftsmen combine traditional techniques with modern precision for exceptional garments.",
  },
  {
    image: svg4,
    title: "Timeless Design",
    description:
      "Designed beyond trends, every piece delivers elegance and longevity for years to come.",
  },
  {
    image: svg5,
    title: "Innovative Touch",
    description:
      "Advanced tailoring methods and thoughtful fabric selection create unmatched comfort and performance.",
  },
];

const Feature = ({ item }) => (
  <div
    className="
      choose-item
      group
      flex
      gap-5
      rounded-3xl
      border
      border-base-300
      bg-base-100/70
      backdrop-blur-xl
      p-6
      transition-all
      duration-500
      hover:-translate-y-2
      hover:shadow-2xl
      hover:border-primary/40
    "
  >
    <div
      className="
        flex
        h-18
        w-18
        shrink-0
        items-center
        justify-center
        rounded-2xl
        bg-primary/10
        transition-transform
        duration-500
        group-hover:rotate-6
        group-hover:scale-110
      "
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-12 w-12 object-contain"
      />
    </div>

    <div>
      <h3 className="text-xl font-bold text-primary">
        {item.title}
      </h3>

      <p className="mt-2 leading-7 text-base-content/70">
        {item.description}
      </p>
    </div>
  </div>
);

const Choose = () => {
  const container = useRef(null);

  useGSAP(() => {

    // Header
    gsap.from(".choose-heading", {
        scrollTrigger: {
            trigger: ".choose-heading",
            start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })

    // Left card
    gsap.from(".left-card", {
        scrollTrigger: {
            trigger: ".left-card",
            start: "top 80%"
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })

    // Right card
    gsap.from(".right-card", {
        scrollTrigger: {
            trigger: ".right-card",
            start: "top 80%"
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })

    // Every feature item
    gsap.from(".choose-item", {
        scrollTrigger: {
            trigger: ".cards-wrapper",
            start: "top 75%"
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: .8,
        ease: "power2.out"
    })

    // Icons
    gsap.from(".choose-icon", {
        scrollTrigger: {
            trigger: ".cards-wrapper",
            start: "top 75%"
        },
        scale: .5,
        rotate: -30,
        opacity: 0,
        stagger: .1,
        duration: .6,
        ease: "back.out(1.8)"
    })

    // Floating animation
    gsap.to(".choose-card", {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: .25
    })

}, {
    scope: container
})

  return (
    <section
      ref={container}
      className="relative overflow-hidden py-24"
    >
      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-b from-base-200 via-base-100 to-base-200" />

      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <div className="choose-badge inline-flex rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
            WHY CHOOSE US
          </div>

          <h2 className="choose-title mt-6 text-4xl font-black lg:text-6xl text-base-content">
            Crafted for Excellence.
            <span className="block text-primary">
              Built on Trust.
            </span>
          </h2>

          <p className="choose-desc mt-6 text-lg leading-8 text-base-content/70">
            Every garment is backed by premium craftsmanship, sustainable
            production and an uncompromising commitment to quality.
          </p>
        </div>

        {/* Grid */}

        <div className="grid gap-8 lg:grid-cols-2">

          <div className="choose-column-left space-y-6">
            {leftItems.map((item) => (
              <Feature
                key={item.title}
                item={item}
              />
            ))}
          </div>

          <div className="choose-column-right space-y-6">
            {rightItems.map((item) => (
              <Feature
                key={item.title}
                item={item}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Choose;