import React from "react";
import { CheckCircle2, LifeBuoy, Rocket, Sparkles } from "lucide-react";
import { Eyebrow, IconChip } from "./Ui.jsx";
import Reveal from "./Reveal.jsx";
import { services, steps } from "../data/content.js";

const ICONS = { support: LifeBuoy, starter: Rocket, custom: Sparkles };

export default function Services() {
  return (
    <section id="services" className="py-20">
      <Reveal>
        <Eyebrow>Services</Eyebrow>
        <h2 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-ink leading-[0.98]">
          Solutions
          <br />
          Simples & justes
        </h2>
        <p className="mt-4 max-w-lg text-ink/70">
          Même exigence, même attention aux détails. Seul le périmètre change.
        </p>
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
                  <span className="absolute -top-3 left-7 font-display text-[10px] font-bold uppercase tracking-widest bg-ink text-paper px-3 py-1 rounded-full">
                    Le plus choisi
                  </span>
                )}
                <IconChip icon={Icon} className={s.highlight ? "bg-ink text-acid" : ""} />
                <p className="mt-4 font-display font-bold text-lg text-ink">{s.name}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-2xl font-extrabold text-ink">{s.price}</span>
                  <span className="text-xs text-ink/70">{s.period}</span>
                </div>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink/70">
                      <CheckCircle2 size={15} className="text-ink/50 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs text-ink/70">
        prix final selon la complexité et les fonctionnalités demandées
      </p>
    </section>
  );
}
