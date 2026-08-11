import React from "react";
import { Eyebrow } from "./Ui.jsx";
import Reveal from "./Reveal.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { projects } from "../data/content.js";

export default function Projects() {
  return (
    <section id="projects" className="py-6">
      <div className="rounded-[2rem] bg-ink px-6 md:px-10 py-14">
        <Reveal>
          <Eyebrow dark>Selected work</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-paper leading-[0.98]">
            Construit pour durer,
            <br />
            fait pour performer
          </h2>
          <p className="mt-4 max-w-lg text-paper/60">
            Du site vitrine à la plateforme Web GIS complète, voici un aperçu de ce que j'ai
            livré.
          </p>
        </Reveal>

        <div className="mt-10 flex gap-5 overflow-x-auto scroll-row pb-4 -mx-1 px-1" style={{ scrollSnapType: "x mandatory" }}>
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 100} className="shrink-0 w-[300px] sm:w-[320px]">
              <div className="h-full" style={{ scrollSnapAlign: "start" }}>
                <ProjectCard project={p} index={i + 1} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
