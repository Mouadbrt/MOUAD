import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../lib/motionConfig.js";

/**
 * Section continuity (brief §7) — every top-level section (besides the
 * hero, which has its own dedicated exit treatment) gently rises + fades
 * into full opacity as it approaches, scrubbed directly to scroll position
 * instead of an on/off "enter" trigger. The goal is a soft "arrival" rather
 * than a hard section-to-section cut — kept intentionally subtle so it
 * reads as continuity, not a slideshow effect. Mounted once in App.jsx.
 */
export default function SectionFlow() {
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const sections = gsap.utils.toArray("section").filter((el) => el.id !== "hero");

    sections.forEach((el) => {
      gsap.fromTo(
        el,
        { yPercent: 3, opacity: 0.85 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 55%",
            scrub: 0.6,
          },
        }
      );
    });
  }, []);

  return null;
}
