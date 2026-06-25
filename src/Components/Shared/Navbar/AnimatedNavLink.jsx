import { useRef } from "react";
import { NavLink } from "react-router";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const AnimatedNavLink = ({ to, children }) => {
  const linkRef = useRef(null);
  const textContainerRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    // Create a paused timeline unique to this specific link
    const tl = gsap.timeline({ paused: true });

    tl.to(textContainerRef.current, {
      yPercent: -50,
      duration: 0.35,
      ease: "power2.inOut",
    });

    timelineRef.current = tl;
  }, { scope: linkRef });

  const handleMouseEnter = () => {
    timelineRef.current.play();
  };

  const handleMouseLeave = () => {
    timelineRef.current.reverse();
  };

  return (
    <NavLink
      ref={linkRef}
      to={to}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={({ isActive }) => 
        `relative block h-8 overflow-hidden rounded-lg px-4 font-medium transition-all duration-300 ${
          isActive 
            ? "text-secondary-content border border-base-300 shadow-sm" 
            : "text-base-content hover:bg-base-200/50"
        }`
      }
    >
      {/* Sliding track containing both textual layers */}
      <div 
        ref={textContainerRef} 
        className="flex flex-col h-[200%] pointer-events-none"
      >
        {/* Layer 1: Visible by default */}
        <span className="flex items-center h-1/2 text-sm">
          {children}
        </span>
        {/* Layer 2: Hidden below, rolls up on hover */}
        <span className="flex items-center h-1/2 text-sm text-accent font-semibold">
          {children}
        </span>
      </div>
    </NavLink>
  );
};

export default AnimatedNavLink;