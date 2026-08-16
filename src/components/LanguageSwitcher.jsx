import React, { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext.jsx";

/**
 * Reusable language dropdown — mounted independently in the Navbar,
 * Sidebar, and mobile menu, but all instances share one selection via
 * LanguageContext, so switching in any one of them updates the others too.
 * Each instance owns only its own open/closed UI state.
 *
 * @param {"left"|"right"} align - which edge the dropdown panel hangs from
 * @param {boolean} dark - use paper-on-ink colors for dark host surfaces
 *   (the mobile menu) instead of the default ink-on-putty
 */
export default function LanguageSwitcher({ align = "right", dark = false, className = "" }) {
  const { language, languages, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // Close on outside click or Escape — standard popover behavior, not
  // scroll-driven, so plain listeners are simpler here than a GSAP effect.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.common.chooseLanguage}
        className={`inline-flex items-center gap-1.5 rounded-full border font-display font-bold uppercase tracking-wide transition-colors shrink-0 ${
          dark ? "border-paper/25 text-paper/80 hover:bg-paper/10" : "border-ink/15 text-ink/70 hover:bg-ink/5"
        }`}
        style={{ fontSize: "11px", padding: "6px 10px" }}
      >
        <Globe size={13} strokeWidth={2.25} />
        <span aria-hidden="true">{language.flag}</span>
        <span>{language.code}</span>
      </button>

      <div
        role="listbox"
        aria-label={t.common.availableLanguages}
        className={`absolute z-50 mt-2 w-44 rounded-xl border shadow-[0_12px_30px_rgba(15,23,42,0.14)] overflow-hidden origin-top transition-[opacity,transform] duration-200 ${
          align === "right" ? "right-0" : "left-0"
        } ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"} ${
          dark ? "bg-ink-soft border-paper/15" : "bg-paper border-ink/10"
        }`}
        style={{ transitionTimingFunction: "var(--ease-premium, cubic-bezier(0.16,1,0.3,1))" }}
      >
        {languages.map((l) => {
          const selected = l.code === language.code;
          return (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => {
                setLanguage(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-display font-medium transition-colors ${
                selected ? "bg-acid text-ink" : dark ? "text-paper/75 hover:bg-paper/10" : "text-ink/70 hover:bg-ink/5"
              }`}
            >
              <span className="text-base leading-none" aria-hidden="true">
                {l.flag}
              </span>
              <span className="flex-1">{l.label}</span>
              {selected && <Check size={14} className="shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
