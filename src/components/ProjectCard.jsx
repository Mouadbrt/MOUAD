import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import MockupFrame from "./MockupFrame.jsx";
import { prefersReducedMotion, EASE, STAGGER } from "../lib/motionConfig.js";
import { useTranslations } from "../lib/LanguageContext.jsx";

export default function ProjectCard({ project, index }) {
  const { title, tag, desc, tech, link, accent, glyph, image } = project;
  const t = useTranslations();
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const reduced = prefersReducedMotion();

  // Container → image → title → meta stagger as the card enters (brief §8),
  // instead of one flat fade for the whole card.
  useGSAP(
    () => {
      if (reduced || !cardRef.current) return;
      const tl = gsap.timeline({
        defaults: { ease: EASE.out },
        scrollTrigger: { trigger: cardRef.current, start: "top 90%", once: true },
      });
      tl.from(cardRef.current, { opacity: 0, y: 28, duration: 0.7 })
        .from(imageRef.current, { opacity: 0, scale: 1.08, duration: 0.7 }, "-=0.45")
        .from(cardRef.current.querySelectorAll("[data-reveal='title']"), { opacity: 0, y: 10, duration: 0.5, stagger: STAGGER.tight }, "-=0.35")
        .from(cardRef.current.querySelectorAll("[data-reveal='meta']"), { opacity: 0, y: 8, duration: 0.5 }, "-=0.25");
    },
    { scope: cardRef, dependencies: [reduced] }
  );

  // Hover: the full-bleed image zooms in a touch with a physical ease, not a
  // bare CSS transition (brief §8/§12 — "feel physical rather than a simple
  // CSS hover"). The card's own overflow-hidden clips the zoom.
  useGSAP(
    () => {
      const card = cardRef.current;
      const image = imageRef.current;
      if (reduced || !card || !image) return;
      // quickTo doesn't support the "scale" shorthand cleanly — drive
      // scaleX/scaleY as a pair instead.
      const setScaleX = gsap.quickTo(image, "scaleX", { duration: 0.5, ease: EASE.out });
      const setScaleY = gsap.quickTo(image, "scaleY", { duration: 0.5, ease: EASE.out });
      const onEnter = () => {
        setScaleX(1.06);
        setScaleY(1.06);
      };
      const onLeave = () => {
        setScaleX(1);
        setScaleY(1);
      };
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      return () => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: cardRef, dependencies: [reduced] }
  );

  return (
    <div ref={cardRef} data-cursor="project" className="relative rounded-2xl overflow-hidden border border-paper/10 aspect-[3/4]">
      <MockupFrame ref={imageRef} accent={accent} glyph={glyph} image={image} alt={title} />

      {/* Scrim so the overlaid chrome stays legible over any accent color. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10 pointer-events-none" />

      {/* Top chrome: index badge + a few tech tags, pill-on-glass like the
          reference (brief redesign — was a separate header strip before). */}
      <div data-reveal="meta" className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
        <span className="shrink-0 rounded-full bg-ink/70 backdrop-blur-sm text-paper text-[11px] font-display font-bold px-2.5 py-1">
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-ink/70 backdrop-blur-sm text-paper/90 text-[10.5px] font-display font-semibold px-2.5 py-1 whitespace-nowrap"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom chrome: title + description, pinned over the scrim. */}
      <div className="absolute inset-x-0 bottom-0 p-5 pe-16">
        <div data-reveal="title">
          <p className="font-display text-[11px] font-bold uppercase tracking-widest" style={{ color: accent }}>
            {tag}
          </p>
          <h3 className="mt-1 font-display font-bold text-xl text-paper">{title}</h3>
        </div>
        <p data-reveal="meta" className="mt-2 text-sm text-paper/70 leading-relaxed line-clamp-3">
          {desc}
        </p>
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          title={t.common.viewSite}
          className="absolute bottom-5 end-5 w-11 h-11 rounded-full bg-acid text-ink flex items-center justify-center hover:bg-acid-dim hover:-translate-y-0.5 transition-[background-color,transform] duration-300"
          style={{ transitionTimingFunction: "var(--ease-premium)" }}
        >
          <ArrowUpRight size={18} />
        </a>
      )}
    </div>
  );
}
