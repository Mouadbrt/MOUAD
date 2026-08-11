import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "./Ui.jsx";
import Reveal from "./Reveal.jsx";
import { trust } from "../data/content.js";

export default function Clients() {
  return (
    <section id="clients" className="py-20">
      <Reveal>
        <Eyebrow>Clients</Eyebrow>
        <h2 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-ink leading-[0.98]">
          La confiance,
          <br />
          ça se construit
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-8 rounded-2xl bg-putty-card border border-ink/10 p-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
          <p className="text-ink/70 max-w-md">{trust.note}</p>
          <a
            href={trust.client.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-paper font-display text-sm font-bold px-5 py-3 shrink-0 hover:bg-ink/80 transition-colors"
          >
            {trust.client.name}
            <ArrowUpRight size={15} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
