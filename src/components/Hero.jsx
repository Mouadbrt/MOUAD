import React, { useState } from "react";
import { ArrowUpRight, Menu, X, ImageOff } from "lucide-react";
import { profile, contact } from "../data/content.js";

const NAV_LEFT = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Projets", href: "#projects" },
];
const NAV_RIGHT = [
  { label: "Ce que vous obtenez", href: "#what-you-get" },
  { label: "Services", href: "#services" },
  { label: "Clients", href: "#clients" },
  { label: "FAQ", href: "#faq" },
];

// Sidebar is desktop-only (hidden below lg) — on small screens this overlay
// carries the same navigation plus a way to get in touch, so nothing is
// lost, not just hidden behind a decorative button.
function MobileMenu({ open, onClose }) {
  if (!open) return null;
  const allLinks = [...NAV_LEFT, ...NAV_RIGHT];
  return (
    <div className="fixed inset-0 z-[100] bg-ink flex flex-col md:hidden">
      <div className="flex items-center justify-between px-6 pt-6">
        <span className="font-display text-sm font-bold text-paper">{profile.badge}</span>
        <button
          onClick={onClose}
          aria-label="Fermer le menu"
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
          href={contact.email.href}
          className="text-center rounded-full border border-paper/40 text-paper font-display text-xs font-bold uppercase tracking-widest px-6 py-3.5"
        >
          {contact.email.href.replace("mailto:", "")}
        </a>
        <a
          href="#contact"
          onClick={onClose}
          className="text-center rounded-full bg-acid text-ink font-display text-xs font-bold uppercase tracking-widest px-6 py-3.5"
        >
          Me contacter
        </a>
      </div>
    </div>
  );
}

// Drop your photo at public/assets/portrait.png (portrait crop, transparent
// or plain background works best against the putty ground) — until then this
// renders a placeholder so the layout still previews correctly.
function Portrait() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="w-full h-full rounded-t-[3rem] bg-putty-card border border-ink/10 flex flex-col items-center justify-end gap-3 pb-10 text-center px-6">
        <ImageOff size={28} className="text-ink/60" />
        <p className="font-display text-xs font-semibold uppercase tracking-widest text-ink/70">
          Ajoutez votre photo
        </p>
        <p className="text-[11px] text-ink/70 max-w-[220px]">
          Déposez un portrait dans public/assets/portrait.png
        </p>
      </div>
    );
  }
  return (
    <img
      src="/assets/portrait.png"
      alt={profile.name}
      onError={() => setFailed(true)}
      className="w-full h-full object-cover object-top rounded-t-[3rem]"
    />
  );
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-[100svh] w-full overflow-hidden bg-putty">
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {/* giant name wordmark — the page's own logo, filling the width */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-[3%] -translate-x-1/2 select-none pointer-events-none font-display font-extrabold uppercase whitespace-nowrap z-0 text-acid"
        style={{ fontSize: "clamp(6rem, 19vw, 17rem)", letterSpacing: "-0.02em" }}
      >
        {profile.badge}
      </span>

      <nav className="relative z-40 flex items-center justify-between gap-4 px-6 md:px-10 pt-6 md:pt-8 font-display text-xs md:text-[13px] font-bold uppercase tracking-wide text-ink">
        <ul className="hidden md:flex items-center gap-5">
          {NAV_LEFT.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-ink/70 transition-colors">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <ul className="hidden md:flex items-center gap-5">
          {NAV_RIGHT.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-ink/70 transition-colors">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden ml-auto w-10 h-10 rounded-full border border-ink/50 flex items-center justify-center"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
        >
          <Menu size={18} />
        </button>
      </nav>

      {/* portrait, anchored to the bottom, the giant wordmark showing behind it */}
      <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-0 h-[76%] md:h-[84%] w-[84%] sm:w-[64%] md:w-[46%] max-w-xl">
        <div className="relative w-full h-full">
          <Portrait />
        </div>
      </div>


      {/* small floating credential badge, echoing the reference's partner badge */}
      <div className="hidden lg:flex absolute z-20 right-10 bottom-[15%] items-center gap-2 rounded-2xl bg-ink text-paper px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
        <span className="w-2 h-2 rounded-full bg-acid shrink-0" />
        <span className="font-display text-xs font-semibold">
          {profile.projectsCount} projets livrés · {profile.yearsExperience} ans d'expérience
        </span>
      </div>
    </section>
  );
}
