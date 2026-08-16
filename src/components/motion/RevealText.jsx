import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { prefersReducedMotion } from "../../lib/motionConfig.js";
import { useLanguage } from "../../lib/LanguageContext.jsx";

/**
 * Per-character split reveal for headings/major statements — adapted from
 * reactbits.dev/text-animations/split-text (same recipe: chars split via
 * GSAP SplitText, each rising from `{opacity:0, y:40}` with a short
 * per-char stagger). Reserved for headings; body copy stays as-is on
 * purpose.
 *
 * trigger="scroll" (default): plays once when the heading enters the
 * viewport — used by section headings.
 * trigger="mount": plays immediately on mount — for a heading that needs
 * to join a hand-authored entrance timeline instead of waiting on scroll.
 *
 * Wrapped so a language switch fully remounts the inner implementation
 * (`key={language.code}`) instead of letting it re-render in place.
 * SplitText mutates the DOM directly — it wraps each character in its own
 * generated span, outside React's diffing — so reverting/re-splitting in
 * an effect left stale text behind when only `children` changed (React
 * updates the text node it originally rendered, but that node has since
 * been relocated inside SplitText's wrapper structure and is no longer the
 * one visually shown). A full unmount/remount sidesteps that entirely: no
 * old GSAP-owned DOM survives, so there's nothing to go stale.
 */
export default function RevealText(props) {
  const { language } = useLanguage();
  return <RevealTextInner key={language.code} {...props} />;
}

function RevealTextInner({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  trigger = "scroll",
  start = "top 85%",
}) {
  const ref = useRef(null);
  const reduced = prefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      SplitText.create(ref.current, {
        type: "chars",
        smartWrap: true,
        reduceWhiteSpace: false,
        charsClass: "split-char",
        onSplit(self) {
          return gsap.fromTo(
            self.chars,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.25,
              ease: "power3.out",
              stagger: 0.025,
              delay: delay / 1000,
              force3D: true,
              scrollTrigger: trigger === "scroll" ? { trigger: ref.current, start, once: true } : undefined,
            }
          );
        },
      });
    },
    { scope: ref, dependencies: [trigger, start, delay] }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
