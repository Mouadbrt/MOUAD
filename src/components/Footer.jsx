import React from "react";
import { profile } from "../data/content.js";
import { useTranslations } from "../lib/LanguageContext.jsx";

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="pb-10 flex flex-col md:flex-row items-center justify-between gap-3 font-display text-[11px] font-semibold text-ink/70 uppercase tracking-widest border-t border-ink/10 pt-6">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span>{t.footer.roleLine}</span>
    </footer>
  );
}
