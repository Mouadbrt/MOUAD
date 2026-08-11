import React, { useEffect, useRef, useState } from "react";
import { Home, MessageCircle, Briefcase, Layers, Zap, Users, HelpCircle, Github, Linkedin, Instagram, Copy, Check } from "lucide-react";
import { profile, contact, tools } from "../data/content.js";

const NAV = [
  { id: "hero", label: "Accueil", icon: Home },
  { id: "about", label: "À propos", icon: MessageCircle },
  { id: "what-you-get", label: "Ce que vous obtenez", icon: Layers },
  { id: "projects", label: "Projets", icon: Briefcase },
  { id: "services", label: "Services", icon: Zap },
  { id: "clients", label: "Clients", icon: Users },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

const SOCIALS = [
  { icon: Linkedin, href: contact.linkedin.href, label: "LinkedIn" },
  { icon: Github, href: contact.github.href, label: "GitHub" },
  { icon: Instagram, href: contact.instagram.href, label: "Instagram" },
];

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
  const active = useScrollSpy(NAV.map((n) => n.id));
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email.href.replace("mailto:", ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — link below still works */
    }
  };

  return (
    <aside
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
          Je travaille avec vous pour livrer des plateformes web qui allient rapidité, fiabilité
          et données bien pensées.
        </p>
      </div>

      {/* Stats */}
      <div
        className="rounded-2xl bg-putty-card border border-ink/10 flex items-center"
        style={{ padding: "clamp(8px, 1.4vh, 16px)", gap: "clamp(12px, 2vh, 20px)" }}
      >
        <div className="flex-1 text-center">
          <p className="font-display font-extrabold text-ink" style={{ fontSize: "clamp(15px, 2.2vh, 22px)" }}>
            {profile.projectsCount}
          </p>
          <p className="text-ink/70" style={{ fontSize: "clamp(9px, 1.2vh, 11px)" }}>Projets</p>
        </div>
        <div className="w-px self-stretch bg-ink/10" />
        <div className="flex-1 text-center">
          <p className="font-display font-extrabold text-ink" style={{ fontSize: "clamp(15px, 2.2vh, 22px)" }}>
            {profile.yearsExperience}+
          </p>
          <p className="text-ink/70" style={{ fontSize: "clamp(9px, 1.2vh, 11px)" }}>Ans d'expérience</p>
        </div>
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
          Outils
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tools.map((t) => (
            <span
              key={t}
              className="rounded-md bg-ink/5 text-ink/70 font-medium"
              style={{ fontSize: "clamp(9px, 1.2vh, 11px)", padding: "clamp(2px, 0.5vh, 4px) clamp(6px, 0.9vh, 8px)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Email */}
      <button
        onClick={copyEmail}
        className="rounded-2xl bg-putty-card border border-ink/10 flex items-center justify-between gap-2 text-left hover:border-ink/25 transition-colors"
        style={{ padding: "clamp(8px, 1.4vh, 14px) clamp(10px, 1.6vh, 16px)" }}
      >
        <span className="text-ink/70 truncate" style={{ fontSize: "clamp(10.5px, 1.5vh, 13px)" }}>
          {contact.email.href.replace("mailto:", "")}
        </span>
        {copied ? <Check size={13} className="text-ink/70 shrink-0" /> : <Copy size={13} className="text-ink/60 shrink-0" />}
      </button>

      {/* CTA */}
      <a
        href="#contact"
        className="rounded-2xl bg-acid text-ink font-display font-extrabold text-center hover:bg-acid-dim transition-colors"
        style={{ padding: "clamp(10px, 1.8vh, 16px)", fontSize: "clamp(12px, 1.7vh, 14px)" }}
      >
        Me contacter
      </a>
    </aside>
  );
}
