import React, { useRef, useState } from "react";
import { ArrowUpRight, Menu, X, ImageOff } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, contactLinks } from "../data/content.js";
import { prefersReducedMotion, EASE, BREAKPOINTS } from "../lib/motionConfig.js";
import { useTranslations } from "../lib/LanguageContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

// Sidebar is desktop-only (hidden below lg) — on small screens this overlay
// carries the same navigation plus a way to get in touch, so nothing is
// lost, not just hidden behind a decorative button.
function MobileMenu({ open, onClose, navLeft, navRight, t }) {
  if (!open) return null;
  const allLinks = [...navLeft, ...navRight];
  return (
    <div className="fixed inset-0 z-[100] bg-ink flex flex-col md:hidden">
      <div className="flex items-center justify-between px-6 pt-6">
        <span className="font-display text-sm font-bold text-paper">{profile.badge}</span>
        <button
          onClick={onClose}
          aria-label={t.common.closeMenu}
          className="w-10 h-10 rounded-full border border-paper/40 flex items-center justify-center text-paper"
        >
          <X size={18} />
        </button>
      </div>
      <ul className="flex-1 flex flex-col justify-center gap-1 px-6">
        {allLinks.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={onClose}
              className="block py-3 font-display text-2xl font-extrabold uppercase text-paper hover:text-acid transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="px-6 pb-8 flex flex-col gap-3">
        <a
          href={contactLinks.email.href}
          className="text-center rounded-full border border-paper/40 text-paper font-display text-xs font-bold uppercase tracking-widest px-6 py-3.5"
        >
          {contactLinks.email.href.replace("mailto:", "")}
        </a>
        <a
          href="#contact"
          onClick={onClose}
          className="text-center rounded-full bg-acid text-ink font-display text-xs font-bold uppercase tracking-widest px-6 py-3.5"
        >
          {t.common.contactCta}
        </a>
      </div>
    </div>
  );
}

// Drop your photo at public/assets/portrait.png (portrait crop, transparent
// or plain background works best against the putty ground) — until then this
// renders a placeholder so the layout still previews correctly.
function Portrait({ t }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    // Not a photo, so there's nothing to preserve an aspect ratio for —
    // keeps its own minimum height so it doesn't collapse to near-nothing
    // now that the wrapper around it is auto-height on mobile (see below).
    return (
      <div className="w-full h-full min-h-[280px] rounded-t-[3rem] bg-putty-card border border-ink/10 flex flex-col items-center justify-end gap-3 pb-10 text-center px-6">
        <ImageOff size={28} className="text-ink/60" />
        <p className="font-display text-xs font-semibold uppercase tracking-widest text-ink/70">{t.hero.addPhoto}</p>
        <p className="text-[11px] text-ink/70 max-w-[220px]">{t.hero.dropPhoto}</p>
      </div>
    );
  }
  return (
    <img
      src="/assets/portrait.png"
      alt={profile.name}
      onError={() => setFailed(true)}
      // Mobile: width-driven, height auto, object-contain — the whole photo
      // stays visible, never cropped, matching whatever aspect ratio it
      // actually has. sm+ (unchanged): fixed-height box, object-cover.
      className="w-full h-auto sm:h-full object-contain sm:object-cover object-top rounded-t-[3rem]"
    />
  );
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = prefersReducedMotion();
  const t = useTranslations();

  const navLeft = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
  ];
  const navRight = [
    { label: t.nav.whatYouGet, href: "#what-you-get" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.testimonials, href: "#testimonials" },
    { label: t.nav.faq, href: "#faq" },
  ];

  // Refs for the Hero's distinct visual layers — each one gets its own
  // timing/distance below so the scene reads as physical depth (a wordmark
  // plane, a foreground subject, a UI chrome layer) instead of one flat
  // block moving as a unit.
  const pinRef = useRef(null);
  const wordmarkRef = useRef(null);
  const navRef = useRef(null);
  const portraitWrapRef = useRef(null);
  const badgeRef = useRef(null);

  // ENTRANCE — runs once on mount. Wordmark settles in first, the portrait
  // is revealed like a curtain rising from the bottom (clip-path, not a
  // translate, so the image itself never shifts/distorts), nav fades in
  // quickly after, and the badge arrives last with a small delay. No-ops
  // under reduced motion — content simply renders in its final resting
  // state, never hidden behind the animation.
  useGSAP(
    () => {
      if (reduced || !pinRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: EASE.out } });
      tl.from(wordmarkRef.current, { opacity: 0, y: 14, scale: 1.05, duration: 1 }, 0)
        .fromTo(
          portraitWrapRef.current,
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.03 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1 },
          0.15
        )
        .from(navRef.current.querySelectorAll("li, button"), { opacity: 0, y: -10, duration: 0.55, stagger: 0.05 }, 0.45)
        .from(badgeRef.current, { opacity: 0, y: 18, duration: 0.7 }, 0.75);
    },
    { scope: pinRef, dependencies: [reduced] }
  );

  // SCROLL EXIT — the Hero sticks in place (`sticky top-0` below) for a bit
  // of extra scroll room past its own height, courtesy of the wrapping div's
  // taller height. Instead of just scrolling out of view, its layers drift
  // apart at different speeds and dim while pinned; once that extra room
  // runs out the section un-sticks and the next section's own content
  // physically slides up over it — a real cinematic reveal rather than an
  // opacity fade standing in for one. Note the pinned <section> itself is
  // never transformed (only its children) — a transform on it would create
  // a new containing block and break MobileMenu's fixed full-screen overlay.
  // Intensity is toned down per breakpoint, same tiers Parallax.jsx uses.
  useGSAP(
    () => {
      if (reduced || !pinRef.current) return;

      function setup(intensity) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: pinRef.current, start: "top top", end: "bottom top", scrub: 0.6 },
        });
        tl.to(
          // Background wordmark: the biggest, farthest layer — moves and
          // scales the most, like a physical plane receding in space.
          wordmarkRef.current,
          { yPercent: -18 * intensity, scale: 1 + 0.14 * intensity, opacity: 1 - 0.55 * intensity, ease: "none" },
          0
        )
          .to(
            // Portrait: the foreground subject — only a gentle drift/scale
            // so it never distorts, staying the visual anchor the longest.
            portraitWrapRef.current,
            { yPercent: -6 * intensity, scale: 1 - 0.08 * intensity, opacity: 1 - 0.35 * intensity, ease: "none" },
            0
          )
          .to(navRef.current, { yPercent: -14 * intensity, opacity: 0, ease: "none" }, 0) // nav: gradual fade, gone well before the transition ends
          .to(badgeRef.current, { yPercent: 18 * intensity, opacity: 0, ease: "none" }, 0); // badge: drifts opposite the wordmark, for variety
        return tl;
      }

      ScrollTrigger.matchMedia({
        [BREAKPOINTS.desktop]: () => setup(1),
        [BREAKPOINTS.tablet]: () => setup(0.7),
        [BREAKPOINTS.mobile]: () => setup(0.45),
      });
    },
    { scope: pinRef, dependencies: [reduced] }
  );

  return (
    // Pin host — strictly for the scroll-exit animation above (extra scroll
    // room for the Hero to stay stuck in place while its layers transition).
    // At scroll position 0, or under reduced motion, this is visually a
    // no-op: no extra height, no sticky, the section renders exactly as
    // before. Uniform across every breakpoint — the section below is a full
    // `100svh` at every size now, so there's no mobile-specific formula to
    // keep in sync with here anymore.
    <div ref={pinRef} className={reduced ? undefined : "relative h-[calc(100svh+24vh)] md:h-[calc(100svh+32vh)]"}>
      <section id="hero" className={`w-full min-h-[100svh] overflow-hidden bg-putty ${reduced ? "relative" : "sticky top-0"}`}>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} navLeft={navLeft} navRight={navRight} t={t} />
        {/* giant name wordmark — the page's own logo, filling the width */}
        <span
          ref={wordmarkRef}
          aria-hidden="true"
          className="absolute left-1/2 top-[3%] -translate-x-1/2 select-none pointer-events-none font-display font-extrabold uppercase whitespace-nowrap z-0 text-acid"
          style={{ fontSize: "clamp(6rem, 19vw, 17rem)", letterSpacing: "-0.02em" }}
        >
          {profile.badge}
        </span>

        {/* Below `sm` the nav is pulled out of normal flow entirely — it floats
            top-right (`absolute`) instead of occupying its own full-width row,
            so it can never push the wordmark/portrait down or add vertical
            space of its own. `sm` and up restore the original in-flow row
            (`relative`, full-width, padded) untouched. `justify-between` only
            still applies at `sm`+ too, since below that `navLeft`'s `<ul>` is
            `hidden` anyway (nothing to justify against — it was already a
            no-op below `md`, just made explicit now). */}
        <nav ref={navRef} className="absolute top-6 end-6 flex items-center gap-4 z-40 font-display text-xs md:text-[13px] font-bold uppercase tracking-wide text-ink sm:relative sm:top-auto sm:end-auto sm:justify-between sm:px-6 md:px-10 sm:pt-6 md:pt-8">
          <ul className="hidden md:flex items-center gap-5">
            {navLeft.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-ink/70 transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {/* navRight + switcher share one flex group (instead of the
              switcher being its own justify-between segment) so it sits
              right after FAQ on the same line, not stranded at the far edge. */}
          <div className="flex items-center gap-5 ms-auto md:ms-0">
            <ul className="hidden md:flex items-center gap-5">
              {navRight.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-ink/70 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <LanguageSwitcher align="right" />
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-full border border-ink/50 flex items-center justify-center"
              aria-label={t.common.openMenu}
              aria-expanded={menuOpen}
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>

        {/* portrait, anchored to the bottom, the giant wordmark showing behind it —
            literally: the wordmark is `z-0`, this wrapper is `z-10`, and below
            `sm` its `top` is pulled up onto the wordmark's lower half on purpose,
            so the photo's box overlaps and hides most of that part of the
            letters rather than sitting underneath them as a separate,
            non-overlapping block. The wordmark's own top sliver stays visible
            above the image, same silhouette as the desktop composition. Below
            `sm` the box is also auto-height (width-driven, matching the
            photo's own aspect ratio) so the entire image stays visible, never
            cropped — sm and up keep the original fixed-height, object-cover
            box untouched.

            NOTE on the source photo itself: it's a perfectly square PNG
            (1254×1254 — confirmed from the file, and it's cropped tight to
            that square already, essentially no spare transparent margin to
            trim). Capped at 90vw wide, its rendered height is therefore also
            only ~90vw — on a ~390×844 phone that's ~350px tall, well short of
            the ~700px of vertical room between "overlapping the wordmark" and
            "touching the very bottom of a `100svh` section". There's no
            layout trick that makes a square image span both at once here, so
            this keeps the overlap (the priority — the image starts high,
            overlapping most of the wordmark's height) and accepts that it
            can't also reach the section's bottom edge without cropping,
            stretching, or exceeding the width cap — all explicitly ruled out.
            The leftover is `bg-putty` — the Hero's own background, not the
            next section bleeding in, since the section is a full `100svh`. */}
        <div
          ref={portraitWrapRef}
          className="absolute z-10 left-1/2 -translate-x-1/2 top-16 sm:top-auto sm:bottom-0 h-auto sm:h-[76%] md:h-[84%] w-[90%] sm:w-[64%] md:w-[46%] max-w-xl"
        >
          <div className="relative w-full h-auto sm:h-full">
            <Portrait t={t} />
          </div>
        </div>



        {/* small floating credential badge, echoing the reference's partner badge */}
        <div ref={badgeRef} className="hidden lg:flex absolute z-20 end-10 bottom-[15%] items-center gap-2 rounded-2xl bg-ink text-paper px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
          <span className="w-2 h-2 rounded-full bg-acid shrink-0" />
          <span className="font-display text-xs font-semibold">
            {t.hero.tagline}
          </span>
        </div>
      </section>
    </div>
  );
}
