import React from "react";
import { CheckCircle2, LifeBuoy, Rocket, Sparkles } from "lucide-react";
import { Eyebrow, IconChip } from "./Ui.jsx";
import Reveal from "./Reveal.jsx";
import RevealText from "./motion/RevealText.jsx";
import { serviceMeta, stepNumbers, contactLinks } from "../data/content.js";
import { useTranslations } from "../lib/LanguageContext.jsx";

const ICONS = { support: LifeBuoy, starter: Rocket, custom: Sparkles };

export default function Services() {
  const t = useTranslations();
  const steps = stepNumbers.map((n, i) => ({ n, ...t.services.steps[i] }));
  const services = serviceMeta.map((meta, i) => ({ ...meta, ...t.services.plans[i] }));

  return (
    <section id="services" className="py-20">
      <Reveal>
        <Eyebrow>{t.services.eyebrow}</Eyebrow>
        <RevealText as="h2" className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-ink leading-[0.98]">
          {t.services.titleLine1}
          <br />
          {t.services.titleLine2}
        </RevealText>
        <p className="mt-4 max-w-lg text-ink/70">{t.services.subtitle}</p>
      </Reveal>

      {/* the work process, folded in as a compact strip right before pricing */}
      <Reveal>
        <div className="mt-10 rounded-2xl bg-putty-card border border-ink/10 p-6 grid grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-5">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="font-display text-lg font-extrabold text-ink">{s.n}</p>
              <p className="mt-1 font-display text-[13px] font-bold text-ink">{s.title}</p>
              <p className="mt-1 text-[11px] text-ink/70 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <Reveal key={s.name} delay={i * 100}>
              <div
                className={`rounded-2xl p-7 h-full flex flex-col relative border ${
                  s.highlight ? "bg-acid border-acid" : "bg-putty-card border-ink/10"
                }`}
              >
                {s.highlight && (
                  <span className="absolute -top-3 start-7 font-display text-[10px] font-bold uppercase tracking-widest bg-ink text-paper px-3 py-1 rounded-full">
                    {t.services.mostChosen}
                  </span>
                )}
                <IconChip icon={Icon} className={s.highlight ? "bg-ink text-paper" : ""} />
                <p className={`mt-4 font-display font-bold text-lg ${s.highlight ? "text-paper" : "text-ink"}`}>{s.name}</p>
                <div className="mt-2 flex items-baseline gap-2">
                </div>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {s.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${s.highlight ? "text-paper/80" : "text-ink/70"}`}>
                      <CheckCircle2 size={15} className={`mt-0.5 shrink-0 ${s.highlight ? "text-paper/60" : "text-ink/50"}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* No fixed price shown — this opens WhatsApp with a
                    pre-filled message naming the plan, so interest turns
                    directly into a chat. */}
                <a
                  href={`${contactLinks.whatsapp.href}?text=${encodeURIComponent(t.services.waMessage.replace("{plan}", s.name))}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-6 inline-flex items-center justify-center rounded-full font-display text-xs font-bold uppercase tracking-widest px-5 py-3 transition-colors ${
                    s.highlight ? "bg-ink text-paper hover:bg-ink/80" : "bg-acid text-ink hover:bg-acid-dim"
                  }`}
                >
                  {t.services.cta}
                </a>
              </div>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs text-ink/70">{t.services.priceNote}</p>
    </section>
  );
}
