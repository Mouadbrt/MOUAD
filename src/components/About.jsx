import React from "react";
import { Eyebrow } from "./Ui.jsx";
import Reveal from "./Reveal.jsx";
import { profile, journey } from "../data/content.js";

export default function About() {
  return (
    <section id="about" className="pt-16 pb-20">
      <Reveal>
        <Eyebrow>Start small, grow big</Eyebrow>
        <h2 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-ink leading-[0.98]">
          À propos (&)
          <br />
          Mon parcours
        </h2>
        <div className="mt-5 max-w-xl">
          {profile.bioParagraphs.map((p, i) => (
            <p key={i} className={`text-ink/70 leading-relaxed ${i > 0 ? "mt-3" : ""}`}>
              {p}
            </p>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 flex gap-5 overflow-x-auto scroll-row pb-4 -mx-1 px-1" style={{ scrollSnapType: "x mandatory" }}>
        {journey.map((step, i) => (
          <Reveal key={step.title} delay={i * 100} className="shrink-0">
            <div
              className="rounded-2xl bg-putty-card border border-ink/10 p-6 w-[280px] h-full"
              style={{ scrollSnapAlign: "start" }}
            >
              <p className="font-display text-[11px] font-bold uppercase tracking-widest text-ink/70">{step.tag}</p>
              <p className="mt-3 font-display font-bold text-lg text-ink">{step.title}</p>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
