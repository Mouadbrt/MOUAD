import React from "react";
import { LayoutGrid, Server, LineChart, Map } from "lucide-react";
import { Eyebrow, IconChip } from "./Ui.jsx";
import Reveal from "./Reveal.jsx";
import { capabilities } from "../data/content.js";

const ICONS = { layout: LayoutGrid, server: Server, chart: LineChart, map: Map };

export default function WhatYouGet() {
  return (
    <section id="what-you-get" className="py-20">
      <Reveal>
        <Eyebrow>What you get</Eyebrow>
        <h2 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-ink leading-[0.98]">
          Ce que vous obtenez
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {capabilities.map((c, i) => (
          <Reveal key={c.title} delay={i * 80}>
            <div className="rounded-2xl bg-putty-card border border-ink/10 p-6 h-full">
              <IconChip icon={ICONS[c.icon]} />
              <p className="mt-4 font-display font-bold text-lg text-ink">{c.title}</p>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
