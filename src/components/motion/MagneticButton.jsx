import React, { cloneElement, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion, hasFinePointer, EASE } from "../../lib/motionConfig.js";

/**
 * Wraps a single interactive element (button/link) with a subtle magnetic
 * pull toward the cursor (brief §10). Adds no wrapper DOM node — the ref
 * and listeners are attached directly to the child, so it has zero layout
 * impact on its own. No-ops (renders the child untouched) on touch devices
 * and under reduced motion.
 */
export default function MagneticButton({ children, strength = 0.35, max = 14 }) {
  const ref = useRef(null);
  const active = hasFinePointer() && !prefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!active || !el) return;

      const setX = gsap.quickTo(el, "x", { duration: 0.5, ease: EASE.soft });
      const setY = gsap.quickTo(el, "y", { duration: 0.5, ease: EASE.soft });

      function onMove(e) {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        setX(gsap.utils.clamp(-max, max, relX * strength));
        setY(gsap.utils.clamp(-max, max, relY * strength));
      }
      function onLeave() {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: EASE.snap });
      }

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref, dependencies: [active, strength, max] }
  );

  if (!active) return children;

  return cloneElement(children, { ref });
}
