import React from "react";
import { Quote } from "lucide-react";
import { Eyebrow } from "./Ui.jsx";
import Reveal from "./Reveal.jsx";
import { testimonials } from "../data/content.js";

export default function Testimonials() {
  return (
    <section className="py-20">
      <Reveal>
        <Eyebrow>Testimonials</Eyebrow>
        <h2 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-ink leading-[0.98]">
          Ce qu'on en dit
        </h2>
      </Reveal>

      <div className="mt-10 flex gap-5 overflow-x-auto scroll-row pb-4 -mx-1 px-1" style={{ scrollSnapType: "x mandatory" }}>
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl bg-putty-card border border-ink/10 p-6 min-w-[260px] max-w-[260px] shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <Quote size={18} className="text-ink/60" />
            <p className="mt-3 text-sm text-ink/70 italic leading-relaxed">{t.quote}</p>
            <p className="mt-5 font-display text-xs font-bold uppercase tracking-widest text-ink/70">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
