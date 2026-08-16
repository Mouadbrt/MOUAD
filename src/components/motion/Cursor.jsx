import React, { useEffect, useState } from "react";
import { hasFinePointer, prefersReducedMotion } from "../../lib/motionConfig.js";
import TargetCursor from "./TargetCursor.jsx";

/**
 * Site-specific mount of TargetCursor (reactbits.dev/animations/target-cursor)
 * — desktop/fine-pointer only, off under prefers-reduced-motion, never blocks
 * content (the reticle is pointer-events: none, native cursor untouched
 * anywhere it isn't mounted). Mount once at the app root.
 *
 * Locks onto any link, button, or element flagged `data-cursor` (see
 * ProjectCard.jsx) — no per-target size/state config needed, the corners
 * just snap to that element's own bounding box.
 */
export default function Cursor() {
  const [enabled] = useState(() => hasFinePointer() && !prefersReducedMotion());

  // Native cursor hiding is done via the shared `has-custom-cursor` class
  // (src/index.css) rather than TargetCursor's own body-style toggle, so
  // there's a single source of truth for it across the site.
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, [enabled]);

  if (!enabled) return null;

  return <TargetCursor targetSelector="a, button, [data-cursor]" hideDefaultCursor={false} />;
}
