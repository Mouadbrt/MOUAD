import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Eyebrow } from "./Ui.jsx";
import Reveal from "./Reveal.jsx";
import { faq } from "../data/content.js";

function FaqItem({ item, open, onToggle }) {
  return (
    <div
      className="faq-item rounded-2xl bg-putty-card border border-ink/10 px-5 overflow-hidden"
      data-open={open}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-display text-sm font-bold text-ink">{item.q}</span>
        <Plus size={16} className={`shrink-0 text-ink/50 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
      </button>
      <div className="faq-answer">
        <div>
          <p className="pb-4 text-sm text-ink/70 leading-relaxed">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-20">
      <Reveal>
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-ink leading-[0.98]">
          Des questions ?
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {faq.map((item, i) => (
          <Reveal key={item.q} delay={(i % 2) * 80}>
            <FaqItem item={item} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
