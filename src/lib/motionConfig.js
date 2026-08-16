// Single source of truth for the motion system's physics, so every
// component that animates agrees on the same durations/eases/breakpoints
// instead of picking its own numbers ad hoc.

// Responsive tiers (used with GSAP's ScrollTrigger.matchMedia()).
export const BREAKPOINTS = {
  desktop: "(min-width: 1024px)",
  tablet: "(min-width: 641px) and (max-width: 1023px)",
  mobile: "(max-width: 640px)",
};

// GSAP ease tokens — a small, deliberate set reused everywhere instead of
// ad hoc curves per component.
export const EASE = {
  out: "power3.out", // reveals settling into place
  inOut: "power2.inOut", // section-to-section continuity
  soft: "sine.out", // velocity distortion returning to rest
  snap: "back.out(1.6)", // magnetic release
};

// Matching cubic-bezier for plain CSS transitions (hover states etc.) where
// pulling in GSAP for a single property isn't worth it. Same "premium"
// settle feel as EASE.out.
export const CSS_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export const DURATION = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
};

export const STAGGER = {
  tight: 0.05,
  base: 0.08,
  loose: 0.12,
};

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
}

export function hasFinePointer() {
  return typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(pointer: fine)").matches
    : false;
}
