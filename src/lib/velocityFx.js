import gsap from "gsap";

// Empirical clamp for Lenis's velocity units at a typical wheel/trackpad
// flick — used to normalize into a -1..1 range before scaling it down into
// a barely-there transform.
const MAX_VELOCITY = 2.2;

export function normalizeVelocity(v) {
  return gsap.utils.clamp(-1, 1, v / MAX_VELOCITY);
}

/**
 * Attaches a velocity-reactive transform to `el`: fast scroll nudges a
 * subtle scale/skew/translate, which eases back to rest (via gsap.quickTo's
 * own tween) as velocity drops back toward zero. Meant to be driven from a
 * Lenis `scroll` callback — see useVelocityDistort for the React wiring.
 *
 * Kept deliberately tiny: this is the "selected elements react, the whole
 * page doesn't shake" effect, not a global scroll-jelly.
 */
export function createVelocityDistort(el, { axis = "y", scaleAmount = 0.025, skewAmount = 0, moveAmount = 0 } = {}) {
  if (!el) return { update: () => {}, reset: () => {} };

  const scaleProp = axis === "y" ? "scaleY" : "scaleX";
  const setScale = gsap.quickTo(el, scaleProp, { duration: 0.6, ease: "sine.out" });
  const setSkew = skewAmount ? gsap.quickTo(el, "skewY", { duration: 0.6, ease: "sine.out" }) : null;
  const setMove = moveAmount ? gsap.quickTo(el, "y", { duration: 0.7, ease: "sine.out" }) : null;

  function update(lenis) {
    const n = normalizeVelocity(lenis.velocity);
    setScale(1 + n * scaleAmount);
    if (setSkew) setSkew(n * skewAmount);
    if (setMove) setMove(n * moveAmount);
  }

  function reset() {
    gsap.set(el, { scaleX: 1, scaleY: 1, skewY: 0, y: 0, clearProps: "transform" });
  }

  return { update, reset };
}
