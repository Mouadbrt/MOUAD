import React, { useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "./Ui.jsx";
import Reveal from "./Reveal.jsx";
import RevealText from "./motion/RevealText.jsx";
import { useTranslations } from "../lib/LanguageContext.jsx";
import { prefersReducedMotion, EASE } from "../lib/motionConfig.js";

export default function About() {
  const t = useTranslations();
  const journey = t.about.journey;
  const reduced = prefersReducedMotion();

  // Path host is the positioning context for the SVG behind the stack and
  // the coordinate space every node position is measured against. The path
  // itself is regenerated from the nodes' *actual* rendered positions (see
  // buildPath below) rather than hard-coded coordinates — the nodes'
  // left/right/center placement already responds to viewport width via the
  // Tailwind classes on each stage below, so the path just follows whatever
  // that produced. No breakpoint logic is duplicated here.
  const pathHostRef = useRef(null);
  const svgPathRef = useRef(null);
  const nodeRefs = useRef([]);
  const cardRefs = useRef([]);
  nodeRefs.current = [];
  cardRefs.current = [];
  const setNodeRef = (i) => (el) => {
    nodeRefs.current[i] = el;
  };
  const setCardRef = (i) => (el) => {
    cardRefs.current[i] = el;
  };

  const buildPath = useCallback(() => {
    const host = pathHostRef.current;
    const svgPath = svgPathRef.current;
    const nodes = nodeRefs.current;
    if (!host || !svgPath || nodes.length < 2 || nodes.some((n) => !n)) return;

    const hostRect = host.getBoundingClientRect();
    const points = nodes.map((n) => {
      const r = n.getBoundingClientRect();
      return { x: r.left + r.width / 2 - hostRect.left, y: r.top + r.height / 2 - hostRect.top };
    });

    // Smooth S-curve through every node: each segment is a cubic bezier
    // whose control points sit directly above/below its own endpoints, so
    // the line eases into and out of each turn instead of kinking — an
    // organic path rather than a straight zig-zag timeline.
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midY = (prev.y + curr.y) / 2;
      d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }
    svgPath.setAttribute("d", d);

    const length = svgPath.getTotalLength();
    svgPath.style.strokeDasharray = String(length);
    svgPath.style.strokeDashoffset = reduced ? "0" : String(length);
  }, [reduced]);

  // PATH → NODE → CARD: the connecting line draws itself as the stack
  // scrolls through view (stroke-dashoffset, scrubbed); each card then
  // arrives from the side it sits on (right-side cards from the right,
  // left-side from the left) with its node popping in alongside it — not a
  // synchronized master timeline, but tied to the same scroll so the two
  // read as one continuous, cinematic reveal. No pinning: a plain
  // scroll-driven reveal already delivers that without the extra fragility
  // of hijacking scroll for a variable-height stack.
  //
  // Everything here is `scrub`-tied, not `once`-triggered: a scrubbed tween
  // has no "played" state, its output is a pure function of the
  // ScrollTrigger's current progress, so scrolling back up re-evaluates
  // that same function backwards for free — the path un-draws, cards
  // retreat back toward the side they came from, nodes dim — with no
  // special-cased reverse logic needed anywhere below.
  useGSAP(
    () => {
      if (!pathHostRef.current) return;
      buildPath();

      if (reduced) {
        // Resting state only — full path, full opacity, no motion.
        gsap.set(cardRefs.current, { opacity: 1, x: 0, y: 0 });
        gsap.set(nodeRefs.current, { opacity: 1, scale: 1 });
      } else {
        gsap.to(svgPathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: pathHostRef.current, start: "top 78%", end: "bottom 65%", scrub: 0.5 },
        });

        cardRefs.current.forEach((card, i) => {
          const node = nodeRefs.current[i];
          if (!card || !node) return;
          const fromSide = i % 2 === 0 ? 36 : -36; // even (card 1, 3…) sits right → enters from the right; odd sits left → enters from the left
          gsap
            .timeline({
              scrollTrigger: { trigger: card, start: "top 90%", end: "top 50%", scrub: 0.4 },
              defaults: { ease: EASE.out },
            })
            .fromTo(node, { opacity: 0.25, scale: 0.5 }, { opacity: 1, scale: 1 }, 0)
            .fromTo(card, { opacity: 0, x: fromSide, y: 24 }, { opacity: 1, x: 0, y: 0 }, 0.08);
        });
      }

      // Node positions shift when the responsive left/right/center
      // alternation responds to viewport width — rebuild the path to match.
      let resizeTimer;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          buildPath();
          ScrollTrigger.refresh();
        }, 150);
      };
      window.addEventListener("resize", onResize);

      // Re-measure once webfonts settle — card heights (and therefore node
      // positions) can shift slightly between first paint and font swap.
      document.fonts?.ready?.then(() => {
        buildPath();
        ScrollTrigger.refresh();
      });

      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: pathHostRef, dependencies: [reduced] }
  );

  return (
    <section id="about" className="pt-16 pb-20">
      <Reveal>
        <Eyebrow>{t.about.eyebrow}</Eyebrow>
        <RevealText as="h2" className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-ink leading-[0.98]">
          {t.about.titleLine1}
          <br />
          {t.about.titleLine2}
        </RevealText>
        <div className="mt-5 max-w-xl">
          {t.about.bio.map((p, i) => (
            <p key={i} className={`text-ink/70 leading-relaxed ${i > 0 ? "mt-3" : ""}`}>
              {p}
            </p>
          ))}
        </div>
      </Reveal>

      {/* Cinematic journey path — cards alternate right/left along an
          organic SVG curve instead of a horizontal row. Only this outer
          arrangement is new; the card itself (classes below) is untouched. */}
      <div ref={pathHostRef} className="relative mt-14">
        <svg className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
          <path ref={svgPathRef} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-ink/15" />
        </svg>

        <div className="relative flex flex-col gap-16 md:gap-24">
          {journey.map((step, i) => {
            const side = i % 2 === 0 ? "right" : "left";
            return (
              <div key={step.title} className={`flex justify-center ${side === "right" ? "sm:justify-end" : "sm:justify-start"}`}>
                {/* Node is positioned relative to the card wrapper itself
                    (not the full-width stage), so it always hugs *this*
                    card's own edge no matter which side the stage justifies
                    it to. */}
                <div ref={setCardRef(i)} className="relative w-[280px] max-w-full">
                  <span
                    ref={setNodeRef(i)}
                    aria-hidden="true"
                    className={`absolute w-2.5 h-2.5 rounded-full bg-acid ring-4 ring-putty left-1/2 -translate-x-1/2 -top-4 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 ${
                      // Only the side actually being positioned gets a rule
                      // for that axis — pairing e.g. both `right-auto` and
                      // `-right-1` for the same property at the same
                      // breakpoint is an undefined-precedence conflict.
                      side === "right" ? "sm:-left-1" : "sm:left-auto sm:-right-1"
                    }`}
                  />
                  <div className="rounded-2xl bg-putty-card border border-ink/10 p-6 w-[280px] h-full">
                    <p className="font-display text-[11px] font-bold uppercase tracking-widest text-ink/70">{step.tag}</p>
                    <p className="mt-3 font-display font-bold text-lg text-ink">{step.title}</p>
                    <p className="mt-2 text-sm text-ink/70 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
