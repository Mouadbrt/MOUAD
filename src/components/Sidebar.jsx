import React, { useCallback, useEffect, useRef, useState } from "react";
import { Home, MessageCircle, Briefcase, Layers, Zap, Users, HelpCircle, Github, Linkedin, Instagram, Copy, Check } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { profile, contactLinks, tools } from "../data/content.js";
import MagneticButton from "./motion/MagneticButton.jsx";
import LogoLoop from "./motion/LogoLoop.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { useTranslations } from "../lib/LanguageContext.jsx";
import { prefersReducedMotion, EASE, STAGGER } from "../lib/motionConfig.js";

// id → icon, and id → the matching key in t.nav (labels are translated,
// pulled in per-render inside the component below).
const NAV_ITEMS = [
  { id: "hero", icon: Home, navKey: "home" },
  { id: "about", icon: MessageCircle, navKey: "about" },
  { id: "what-you-get", icon: Layers, navKey: "whatYouGet" },
  { id: "projects", icon: Briefcase, navKey: "projects" },
  { id: "services", icon: Zap, navKey: "services" },
  { id: "testimonials", icon: Users, navKey: "testimonials" },
  { id: "faq", icon: HelpCircle, navKey: "faq" },
];

const SOCIALS = [
  { icon: Linkedin, href: contactLinks.linkedin.href, label: "LinkedIn" },
  { icon: Github, href: contactLinks.github.href, label: "GitHub" },
  { icon: Instagram, href: contactLinks.instagram.href, label: "Instagram" },
];

// Tool names as LogoLoop "node" items — same pill styling as before, just
// fed into the marquee instead of a static flex-wrap. Proper nouns
// (tech/tool names), so not translated.
const TOOL_LOGOS = tools.map((t) => ({
  title: t,
  node: (
    <span
      className="rounded-md bg-ink/5 text-ink/70 font-medium whitespace-nowrap"
      style={{ fontSize: "clamp(9px, 1.2vh, 11px)", padding: "clamp(2px, 0.5vh, 4px) clamp(6px, 0.9vh, 8px)" }}
    >
      {t}
    </span>
  ),
}));

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  const ratios = useRef({});

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.current[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });
        const best = Object.entries(ratios.current).sort((a, b) => b[1] - a[1])[0];
        if (best && best[1] > 0) setActive(best[0]);
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1], rootMargin: "-15% 0px -55% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}

export default function Sidebar() {
  const t = useTranslations();
  const NAV = NAV_ITEMS.map((item) => ({ ...item, label: t.nav[item.navKey] }));
  const active = useScrollSpy(NAV.map((n) => n.id));
  const [copied, setCopied] = useState(false);
  const asideRef = useRef(null);
  const reduced = prefersReducedMotion();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactLinks.email.href.replace("mailto:", ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — link below still works */
    }
  };

  // "Waking up" entrance for the sidebar's own cards, matching the hero.
  useGSAP(
    () => {
      if (reduced || !asideRef.current) return;
      gsap.from(asideRef.current.children, {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: EASE.out,
        stagger: STAGGER.base,
        delay: 0.15,
      });
    },
    { scope: asideRef, dependencies: [reduced] }
  );

  // Subtle scroll-direction presence (brief §13/navbar behavior): a light
  // dampening while scrolling down fast, restoring on scroll-up or once
  // scrolling settles — never touches position/size, only opacity+scale.
  const dampen = useRef(null);
  useEffect(() => {
    if (reduced || !asideRef.current) return;
    dampen.current = {
      opacity: gsap.quickTo(asideRef.current, "opacity", { duration: 0.5, ease: EASE.soft }),
      // quickTo doesn't support the "scale" shorthand cleanly — drive
      // scaleX/scaleY as a pair instead.
      scaleX: gsap.quickTo(asideRef.current, "scaleX", { duration: 0.5, ease: EASE.soft }),
      scaleY: gsap.quickTo(asideRef.current, "scaleY", { duration: 0.5, ease: EASE.soft }),
    };
    return () => {
      gsap.set(asideRef.current, { opacity: 1, scaleX: 1, scaleY: 1 });
      dampen.current = null;
    };
  }, [reduced]);

  const onLenisScroll = useCallback((lenis) => {
    if (!dampen.current) return;
    const fast = lenis.direction === 1 && Math.abs(lenis.velocity) > 1.1;
    dampen.current.opacity(fast ? 0.75 : 1);
    dampen.current.scaleX(fast ? 0.985 : 1);
    dampen.current.scaleY(fast ? 0.985 : 1);
  }, []);
  useLenis(reduced ? undefined : onLenisScroll, [reduced]);

  return (
    <aside
      ref={asideRef}
      className="hidden lg:flex flex-col w-[280px] shrink-0 sticky self-start"
      style={{
        top: "clamp(10px, 2vh, 24px)",
        gap: "clamp(6px, 1.4vh, 16px)",
        maxHeight: "calc(100svh - clamp(20px, 4vh, 48px))",
      }}
    >
      {/* Badge + description */}
      <div
        className="rounded-2xl bg-putty-card border border-ink/10 flex flex-col"
        style={{ padding: "clamp(10px, 1.6vh, 20px)", gap: "clamp(6px, 1.2vh, 12px)" }}
      >
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center rounded-lg bg-acid font-display font-extrabold text-ink"
            style={{ padding: "clamp(3px, 0.6vh, 6px) clamp(8px, 1vh, 12px)", fontSize: "clamp(11px, 1.6vh, 14px)" }}
          >
            {profile.badge}
            <sup className="text-[9px] ml-0.5">®</sup>
          </span>
          <div className="flex items-center gap-1.5">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-md bg-ink text-paper flex items-center justify-center hover:bg-ink/80 transition-colors shrink-0"
                style={{ width: "clamp(20px, 2.6vh, 28px)", height: "clamp(20px, 2.6vh, 28px)" }}
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
        <p className="leading-snug text-ink/70" style={{ fontSize: "clamp(10.5px, 1.5vh, 13px)" }}>
          {t.sidebar.bio}
        </p>
      </div>

      {/* Language — `relative z-30` isn't decorative: the entrance stagger
          above leaves every panel with its own inline transform (a stacking
          context, even at rest), so without an explicit z-index here the
          dropdown below would render under the later panels' own contexts
          regardless of its own z-index. */}
      <div
        className="relative z-30 rounded-2xl bg-putty-card border border-ink/10 flex items-center justify-between gap-2"
        style={{ padding: "clamp(8px, 1.4vh, 14px) clamp(10px, 1.6vh, 16px)" }}
      >
        <span className="text-ink/70" style={{ fontSize: "clamp(10.5px, 1.5vh, 13px)" }}>
          {t.sidebar.language}
        </span>
        <LanguageSwitcher align="right" />
      </div>


      {/* Nav */}
      <nav
        className="rounded-2xl bg-putty-card border border-ink/10 flex flex-col"
        style={{ padding: "clamp(6px, 1vh, 10px)", gap: "clamp(2px, 0.5vh, 4px)" }}
      >
        {NAV.map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`flex items-center rounded-xl font-display font-bold transition-colors ${
              active === id ? "bg-acid text-ink" : "text-ink/70 hover:bg-ink/5"
            }`}
            style={{
              gap: "clamp(6px, 1vh, 10px)",
              padding: "clamp(4px, 1vh, 10px) clamp(10px, 1.4vh, 14px)",
              fontSize: "clamp(10.5px, 1.5vh, 13px)",
            }}
          >
            <Icon size={15} strokeWidth={2.25} className="shrink-0" />
            {label}
          </a>
        ))}
      </nav>

      {/* Tools/clients */}
      <div
        className="rounded-2xl bg-putty-card border border-ink/10"
        style={{ padding: "clamp(8px, 1.4vh, 16px)" }}
      >
        <p
          className="font-display font-bold uppercase tracking-widest text-ink/70"
          style={{ fontSize: "clamp(8px, 1.1vh, 10px)", marginBottom: "clamp(4px, 0.8vh, 10px)" }}
        >
          {t.common.tools}
        </p>
        <LogoLoop
          logos={TOOL_LOGOS}
          speed={28}
          gap={6}
          logoHeight={18}
          fadeOut
          fadeOutColor="#e4ebf3"
          pauseOnHover
          ariaLabel={t.common.toolsUsed}
        />
      </div>

      {/* Email */}
      <button
        onClick={copyEmail}
        className="rounded-2xl bg-putty-card border border-ink/10 flex items-center justify-between gap-2 text-left hover:border-ink/25 transition-colors"
        style={{ padding: "clamp(8px, 1.4vh, 14px) clamp(10px, 1.6vh, 16px)" }}
      >
        <span className="text-ink/70 truncate" style={{ fontSize: "clamp(10.5px, 1.5vh, 13px)" }}>
          {contactLinks.email.href.replace("mailto:", "")}
        </span>
        {copied ? <Check size={13} className="text-ink/70 shrink-0" /> : <Copy size={13} className="text-ink/60 shrink-0" />}
      </button>

      {/* CTA */}
      <MagneticButton>
        <a
          href="#contact"
          className="rounded-2xl bg-acid text-ink font-display font-extrabold text-center hover:bg-acid-dim transition-colors"
          style={{ padding: "clamp(10px, 1.8vh, 16px)", fontSize: "clamp(12px, 1.7vh, 14px)" }}
        >
          {t.common.contactCta}
        </a>
      </MagneticButton>
    </aside>
  );
}
