import React from "react";
import { Github, Linkedin, Mail, Instagram, Twitter } from "lucide-react";
import { Eyebrow } from "./Ui.jsx";
import Reveal from "./Reveal.jsx";
import QrBlock from "./QrBlock.jsx";
import { contact, profile } from "../data/content.js";

const ICONS = { email: Mail, linkedin: Linkedin, github: Github, instagram: Instagram, twitter: Twitter };

export default function Contact() {
  const entries = Object.entries(contact);

  return (
    <section id="contact" className="pb-16">
      <Reveal>
        <div className="rounded-[2rem] bg-ink px-8 md:px-12 py-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr,1fr] gap-10 items-center">
            <div>
              <Eyebrow dark>Collaboration</Eyebrow>
              <h2 className="mt-4 font-display font-extrabold text-3xl md:text-4xl text-paper leading-tight">
                Un projet web, data ou IA en tête ?
              </h2>
              <p className="mt-4 text-paper/60 leading-relaxed max-w-lg">
                Écrivez-moi et je vous aide à construire une solution sur mesure, du site
                vitrine à l'application complète avec dashboard et API.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {entries.map(([key, c]) => {
                  const Icon = ICONS[key];
                  return (
                    <a
                      key={key}
                      href={c.href}
                      title={`${c.label} : ${c.value}`}
                      className="flex items-center gap-2 rounded-full border border-paper/15 bg-paper/5 px-4 py-2 text-sm text-paper hover:bg-acid hover:text-ink hover:border-acid transition-colors"
                    >
                      <Icon size={15} />
                      {c.label}
                    </a>
                  );
                })}
              </div>
              <p className="mt-5 font-display text-[11px] text-paper/70">
                * coordonnées à compléter avec vos liens réels dans src/data/content.js
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-6">
                <QrBlock label="linkedin" value={contact.linkedin.href} />
                <QrBlock label="github" value={contact.github.href} />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-acid text-ink font-display text-xs font-extrabold flex items-center justify-center">
                  MB
                </span>
                <span className="font-display italic text-paper/80 text-lg">{profile.signature}</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
