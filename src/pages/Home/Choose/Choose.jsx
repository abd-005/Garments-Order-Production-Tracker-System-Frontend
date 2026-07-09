import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Feature from "./Feature";

import svg1 from "../../../assets/svg/01.png";
import svg2 from "../../../assets/svg/02.png";
import svg3 from "../../../assets/svg/03.png";
import svg4 from "../../../assets/svg/04.png";
import svg5 from "../../../assets/svg/05.png";
import svg6 from "../../../assets/svg/06.png";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

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

const Choose = () => {
  const container = useRef(null);

  useGSAP(() => {

  // Background blobs

  gsap.to(".blob-left", {
    x: 35,
    y: 18,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".blob-right", {
    x: -30,
    y: -20,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Main reveal timeline

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container.current,
      start: "top 75%",
      end: "bottom top",
      toggleActions: "play none none none",
    }
  });

  tl.fromTo(".choose-badge", 
    {y: 25,
    opacity: 0},
    {y: 0,
    opacity: 1,
    duration: 0.5
  })

  .fromTo(".choose-title", {
    y: 50,
    opacity: 0,},
    {y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.3")

  .fromTo(".choose-desc", {
    y: 25,
    opacity: 0,},
    {y: 0,
    opacity: 1,
    duration: 0.6
  }, "-=0.45")

  .fromTo(".choose-column-left", {
    x: -80,
    opacity: 0,},
    {x: 0,
    opacity: 1,
    duration: 0.9,
    ease: "power3.out"
  }, "-=0.2")

  .fromTo(".choose-column-right", {
    x: 80,
    opacity: 0,},
    {x: 0,
    opacity: 1,
    duration: 0.9,
    ease: "power3.out"
  }, "<")

  .fromTo(".choose-item",
  { y: 35, opacity: 0 },
  { y: 0, opacity: 1, stagger: 0.12, duration: 0.55, ease: "power2.out" }
)

  .fromTo(".choose-icon", {
    scale: 0.6,
    rotate: -20,},
    {
    scale: 1,
    delay: .5,
    rotate: 0,
    stagger: 0.08,
    duration: 0.45,
    ease: "back.out(2)"
  }, "<");

}, {
  scope: container,
});

  return (
    <section
      ref={container}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-base-200 via-base-100 to-base-200" />

      <div className="blob-left absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />

      <div className="blob-right absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="choose-heading mx-auto mb-20 max-w-3xl text-center">

          <div className="choose-badge inline-flex rounded-full bg-primary/10 px-5 py-2 text-xs font-semibold tracking-widest text-primary uppercase">
            Why Choose Us
          </div>

          <h2 className="choose-title mt-6 text-4xl font-black lg:text-6xl text-base-content">
            Crafted for Excellence.
            <span className="block text-primary">
              Built on Trust.
            </span>
          </h2>

          <p className="choose-desc mt-6 text-lg leading-8 text-base-content/70">
            Every garment is backed by premium craftsmanship,
            sustainable production and an uncompromising commitment
            to quality.
          </p>
          
        </div>

        <div className="cards-wrapper grid gap-8 lg:grid-cols-2">

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