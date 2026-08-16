import React from "react";
import { Eyebrow } from "./Ui.jsx";
import Reveal from "./Reveal.jsx";
import RevealText from "./motion/RevealText.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { projectMeta } from "../data/content.js";
import { useTranslations } from "../lib/LanguageContext.jsx";

export default function Projects() {
  const t = useTranslations();
  const projects = projectMeta.map((meta, i) => ({ ...meta, ...t.projects.items[i] }));

  return (
    <section id="projects" className="py-6">
      <div className="rounded-[2rem] bg-ink px-6 md:px-10 py-14">
        <Reveal>
          <Eyebrow dark>{t.projects.eyebrow}</Eyebrow>
          <RevealText as="h2" className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-paper leading-[0.98]">
            {t.projects.titleLine1}
            <br />
            {t.projects.titleLine2}
          </RevealText>
          <p className="mt-4 max-w-lg text-paper/60">{t.projects.subtitle}</p>
        </Reveal>

        {/* each card owns its own container→image→title→meta reveal
            timeline (see ProjectCard.jsx) instead of a uniform outer fade */}
        <div className="mt-10 flex gap-5 overflow-x-auto scroll-row pb-4 -mx-1 px-1" style={{ scrollSnapType: "x mandatory" }}>
          {projects.map((p, i) => (
            <div key={p.title} className="h-full shrink-0 w-[300px] sm:w-[320px]" style={{ scrollSnapAlign: "start" }}>
              <ProjectCard project={p} index={i + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
