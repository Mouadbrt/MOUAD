import React from "react";
import { Github, Linkedin, Mail, Instagram, Twitter, MessageCircle } from "lucide-react";
import { Eyebrow } from "./Ui.jsx";
import Reveal from "./Reveal.jsx";
import RevealText from "./motion/RevealText.jsx";
import QrBlock from "./QrBlock.jsx";
import { contactLinks, profile } from "../data/content.js";
import { useTranslations } from "../lib/LanguageContext.jsx";

const ICONS = { email: Mail, whatsapp: MessageCircle, linkedin: Linkedin, github: Github, instagram: Instagram, twitter: Twitter };

export default function Contact() {
  const t = useTranslations();
  const entries = Object.entries(contactLinks).map(([key, link]) => [
    key,
    { ...link, label: t.contact.labels[key], value: t.contact.valuePlaceholder },
  ]);

  return (
    <section id="contact" className="pb-16">
      <Reveal>
        <div className="rounded-[2rem] bg-ink px-8 md:px-12 py-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr,1fr] gap-10 items-center">
            <div>
              <Eyebrow dark>{t.contact.eyebrow}</Eyebrow>
              <RevealText as="h2" className="mt-4 font-display font-extrabold text-3xl md:text-4xl text-paper leading-tight">
                {t.contact.title}
              </RevealText>
              <p className="mt-4 text-paper/60 leading-relaxed max-w-lg">{t.contact.description}</p>

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
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-6">
              </div>
              <div className="flex items-center gap-3">
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
