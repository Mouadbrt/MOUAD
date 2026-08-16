import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion, EASE } from "../lib/motionConfig.js";

// Scroll-reveal on section entry — same public API as before (children,
// className, delay) so every existing call-site keeps working unchanged;
// internals now run on GSAP ScrollTrigger (Lenis-synced, shared easing)
// instead of a bespoke IntersectionObserver. Gated behind
// prefers-reduced-motion: with that preference set, content simply renders
// in its final resting state — never hidden behind the animation.
export default function Reveal({ children, className = "", delay = 0, y = 24 }) {
  const ref = useRef(null);
  const reduced = prefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration: 0.8,
        ease: EASE.out,
        delay: delay / 1000,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { scope: ref, dependencies: [delay, y] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
