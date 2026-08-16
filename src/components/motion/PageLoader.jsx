import { useEffect, useState } from "react";
import "./PageLoader.css";
import { prefersReducedMotion } from "../../lib/motionConfig.js";
import { useTranslations } from "../../lib/LanguageContext.jsx";

// A fan of short "spoke" tracks radiating from a shared center, each
// carrying a small dot that bounces along it with a per-spoke delay — the
// staggered delays turn nine independent bounces into one ripple sweeping
// across the fan. Rendered as a full-screen splash on first load only.
const SPOKE_COUNT = 9;
const SPOKE_STEP_DEG = 20; // 9 spokes × 20° = a 160° fan, not a full wheel
const SPOKES = Array.from({ length: SPOKE_COUNT }, (_, i) => i * SPOKE_STEP_DEG);

const MIN_VISIBLE_MS = 900; // long enough to read as intentional, not a flash
const FADE_MS = 500; // keep in sync with the CSS transition duration below

// `onDone` fires once the loader is fully gone (or immediately, if it never
// showed at all under reduced motion) — App.jsx uses it to hold off mounting
// the custom cursor until then, so its reticle doesn't float over the splash.
export default function PageLoader({ onDone }) {
  const t = useTranslations();
  const [visible, setVisible] = useState(() => !prefersReducedMotion());
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) {
      onDone?.();
      return;
    }
    const shownAt = performance.now();

    const startLeaving = () => {
      const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - shownAt));
      setTimeout(() => {
        setLeaving(true);
        setTimeout(() => {
          setVisible(false);
          onDone?.();
        }, FADE_MS);
      }, remaining);
    };

    if (document.readyState === "complete") {
      startLeaving();
    } else {
      window.addEventListener("load", startLeaving, { once: true });
      return () => window.removeEventListener("load", startLeaving);
    }
  }, [visible, onDone]);

  if (!visible) return null;

  return (
    <div className={`page-loader${leaving ? " page-loader--leaving" : ""}`} role="status" aria-label={t.common.loading}>
      <div className="page-loader__fan">
        {SPOKES.map((deg, i) => (
          <span key={deg} className="page-loader__spoke" style={{ transform: `rotate(${deg}deg)` }}>
            <span className="page-loader__dot" style={{ animationDelay: `${i * 0.16}s` }} />
          </span>
        ))}
      </div>
    </div>
  );
}
