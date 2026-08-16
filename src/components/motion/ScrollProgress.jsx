import React, { useCallback, useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";

/**
 * Minimal scroll progress indicator (brief §14) — a 2px bar tied directly
 * to Lenis's own progress value, nothing more.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);
  const setScale = useRef(null);

  const onScroll = useCallback((lenis) => {
    if (!barRef.current) return;
    if (!setScale.current) {
      setScale.current = gsap.quickTo(barRef.current, "scaleX", { duration: 0.3, ease: "power2.out" });
    }
    setScale.current(lenis.progress);
  }, []);

  useLenis(onScroll, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[997] h-[2px] pointer-events-none" aria-hidden="true">
      <div ref={barRef} className="h-full w-full bg-acid origin-left" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
