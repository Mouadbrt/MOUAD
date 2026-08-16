import { useCallback, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { createVelocityDistort } from "./velocityFx.js";
import { prefersReducedMotion, hasFinePointer } from "./motionConfig.js";

/**
 * Hooks a DOM node up to scroll-velocity-driven distortion (see
 * velocityFx.js). Disabled under prefers-reduced-motion and on coarse
 * (touch) pointers, where the brief asks for reduced/no velocity effects.
 *
 * @param {React.RefObject<HTMLElement>} ref
 * @param {{ axis?: 'x'|'y', scaleAmount?: number, skewAmount?: number, moveAmount?: number, enabled?: boolean }} opts
 */
export function useVelocityDistort(ref, opts = {}) {
  const { enabled = true, ...fxOpts } = opts;
  const fxRef = useRef(null);
  const active = enabled && !prefersReducedMotion() && hasFinePointer();

  useEffect(() => {
    if (!active || !ref.current) return;
    fxRef.current = createVelocityDistort(ref.current, fxOpts);
    return () => {
      fxRef.current?.reset();
      fxRef.current = null;
    };
    // fxOpts is a fresh object each render — intentionally only keyed off
    // the stable primitives that actually change the effect's behavior.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, active, opts.axis, opts.scaleAmount, opts.skewAmount, opts.moveAmount]);

  const onScroll = useCallback((lenis) => {
    fxRef.current?.update(lenis);
  }, []);

  useLenis(active ? onScroll : undefined, [active]);
}
