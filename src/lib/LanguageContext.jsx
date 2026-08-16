import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import fr from "../locales/fr.json";
import en from "../locales/en.json";
import es from "../locales/es.json";
import { prefersReducedMotion } from "./motionConfig.js";

// Single source of truth for the site's selected language — every
// LanguageSwitcher instance (Navbar, Sidebar, mobile menu) reads/writes
// through this, so picking a language in one place updates all the others
// instantly, and the choice survives reloads via localStorage. `t` (the
// active language's full translation tree, from src/locales/*.json) is
// exposed alongside it — every component reads its copy from there instead
// of hard-coded strings.
export const LANGUAGES = [
  { code: "fr", label: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "en", label: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "es", label: "Español", flag: "🇪🇸", dir: "ltr" },
];

const TRANSLATIONS = { fr, en, es };

const STORAGE_KEY = "site-language";
const DEFAULT_CODE = "fr"; // matches the site's original (baseline) content language

function readStoredCode() {
  if (typeof window === "undefined") return DEFAULT_CODE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.some((l) => l.code === stored) ? stored : DEFAULT_CODE;
  } catch {
    return DEFAULT_CODE; // localStorage unavailable (private mode, etc.)
  }
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [code, setCode] = useState(readStoredCode);
  const language = useMemo(() => LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0], [code]);
  const t = TRANSLATIONS[code] ?? TRANSLATIONS[DEFAULT_CODE];

  // The two global side effects of a language change: <html lang/dir> (dir
  // is what actually flips the page to RTL for Arabic) and persistence.
  // Runs on first mount too, so a page that was reloaded onto a previously
  // chosen language still gets these set correctly.
  useEffect(() => {
    document.documentElement.lang = language.code;
    document.documentElement.dir = language.dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, language.code);
    } catch {
      /* localStorage unavailable — selection just won't persist across reloads */
    }
  }, [language]);

  // Switching language does a real page reload — every GSAP/ScrollTrigger
  // instance, the pinned-scroll Hero, the journey path's SplitText headings,
  // etc. all start over completely clean rather than needing to be
  // individually taught to re-sync mid-session. The new choice is persisted
  // *before* reloading so the reload actually comes back in that language
  // (LanguageProvider reads it fresh via readStoredCode on the next mount).
  // A brief fade-to-dim plays first so it reads as an intentional
  // transition rather than an abrupt flash — skipped under reduced motion,
  // where the reload just happens immediately.
  const setLanguage = useCallback(
    (newCode) => {
      if (newCode === code || !LANGUAGES.some((l) => l.code === newCode)) return;
      try {
        window.localStorage.setItem(STORAGE_KEY, newCode);
      } catch {
        /* localStorage unavailable — the reload will fall back to the default language */
      }
      if (prefersReducedMotion()) {
        window.location.reload();
        return;
      }
      document.body.classList.add("lang-transition");
      window.setTimeout(() => window.location.reload(), 220);
    },
    [code]
  );

  const value = useMemo(() => ({ language, languages: LANGUAGES, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

// Convenience alias for components that only need the translation tree.
export function useTranslations() {
  return useLanguage().t;
}
