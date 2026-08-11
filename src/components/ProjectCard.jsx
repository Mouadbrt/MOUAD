import React from "react";
import MockupFrame from "./MockupFrame.jsx";

export default function ProjectCard({ project, index }) {
  const { title, tag, desc, tech, link, accent, glyph } = project;

  return (
    <div className="rounded-2xl bg-ink-soft border border-paper/10 h-full flex flex-col overflow-hidden">
      <MockupFrame accent={accent} glyph={glyph} index={index} link={link} />

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-display font-bold text-paper">{title}</h3>
          <p className="font-display text-[11px] font-bold uppercase tracking-widest" style={{ color: accent }}>
            {tag}
          </p>
        </div>
        <p className="text-sm text-paper/60 leading-relaxed flex-1">{desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span key={t} className="font-display text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-paper/8 text-paper/70">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
