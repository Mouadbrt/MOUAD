import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BREAKPOINTS, prefersReducedMotion } from "../../lib/motionConfig.js";

/**
 * Generic scroll-scrubbed parallax wrapper (brief §4) — different elements
 * move at different speeds to build depth. `speed` is the fraction of the
 * element's own travel distance it additionally shifts by as it crosses
 * the viewport (small values only: 0.05–0.3 reads as depth, not a parallax
 * demo). Automatically toned down on tablet and switched off on mobile via
 * the shared breakpoint tiers, and disabled under reduced motion.
 */
export default function Parallax({ as: Tag = "div", speed = 0.15, className = "", style, children }) {
  const ref = useRef(null);
  const reduced = prefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      function setup(multiplier) {
        if (!multiplier) return;
        return gsap.fromTo(
          ref.current,
          { yPercent: -speed * 100 * multiplier },
          {
            yPercent: speed * 100 * multiplier,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.4,
            },
          }
        );
      }

      ScrollTrigger.matchMedia({
        [BREAKPOINTS.desktop]: () => setup(1),
        [BREAKPOINTS.tablet]: () => setup(0.5),
        // mobile: no parallax at all (brief §17)
      });
    },
    { scope: ref, dependencies: [speed] }
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
