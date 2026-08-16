import React, { useState } from "react";
import { LayoutGrid, ShoppingCart, Code2 } from "lucide-react";
import { Eyebrow, IconChip } from "./Ui.jsx";
import Reveal from "./Reveal.jsx";
import RevealText from "./motion/RevealText.jsx";
import { capabilities as capabilityMeta } from "../data/content.js";
import { useTranslations } from "../lib/LanguageContext.jsx";

const ICONS = { websites: LayoutGrid, ecommerce: ShoppingCart, custom: Code2 };

// Drop the real photos at the paths in content.js (public/assets/...) — until
// then this falls back to a plain icon panel, matching Hero's Portrait
// placeholder pattern, so a missing asset never shows as a broken image.
function CapabilityImage({ src, alt, icon: Icon }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="h-full w-full bg-ink/5 flex items-center justify-center">
        <Icon size={34} strokeWidth={1.5} className="text-ink/25" />
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />;
}

export default function WhatYouGet() {
  const t = useTranslations();
  const capabilities = capabilityMeta.map((c, i) => ({ ...c, ...t.whatYouGet.items[i] }));

  return (
    <section id="what-you-get" className="py-20">
      <Reveal>
        <Eyebrow>{t.whatYouGet.eyebrow}</Eyebrow>
        <RevealText as="h2" className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-ink leading-[0.98]">
          {t.whatYouGet.title}
        </RevealText>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {capabilities.map((c, i) => (
          <Reveal key={c.title} delay={i * 80}>
            <div
              className="group rounded-2xl bg-putty-card border border-ink/10 h-full overflow-hidden
                transition-all duration-300 ease-out
                hover:-translate-y-1.5 hover:shadow-xl hover:border-ink/20"
            >
              {/* image header */}
              <div className="relative h-36 w-full overflow-hidden">
                <CapabilityImage src={c.image} alt={c.title} icon={ICONS[c.icon]} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent" />
                <div className="absolute bottom-3 start-5 transition-transform duration-300 group-hover:-translate-y-1">
                  <IconChip icon={ICONS[c.icon]} className="bg-paper text-ink" />
                </div>
              </div>

              <div className="p-6">
                <p className="font-display font-bold text-lg text-ink">{c.title}</p>
                <p className="mt-2 text-sm text-ink/70 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
