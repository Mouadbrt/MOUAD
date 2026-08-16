// ---------------------------------------------------------------------------
// Language-independent data only: names, links, colors, icon keys, tech
// stack labels, prices. Anything that needs to read differently per
// language (titles, descriptions, feature lists, questions/answers, …)
// lives in src/locales/{fr,en,es,ar}.json instead, keyed by the same order
// as the arrays below so components zip metadata[i] with translations[i].
// ---------------------------------------------------------------------------

export const profile = {
  name: "Mouad Bartal",
  badge: "MOUAD", // short chip name, shown in the sidebar
  city: "Meknès, Maroc",
  yearsExperience: "2",
  projectsCount: "10+",
  signature: "Mouad Bartal",
};

// Icon key + header image per "Ce que vous obtenez" capability — title/desc
// live in locales[lang].whatYouGet.items, same order. Drop the actual photos
// at the paths below (public/assets/...) — cards fall back to a plain icon
// panel (see WhatYouGet.jsx) until then, so nothing looks broken meanwhile.
export const capabilities = [
  { icon: "websites", image: "/assets/whatyouget-websites.png" },
  { icon: "ecommerce", image: "/assets/whatyouget-ecommerce.png" },
  { icon: "custom", image: "/assets/whatyouget-custom.png" },
];

// Step number per pricing-process step — text lives in
// locales[lang].services.steps, same order.
export const stepNumbers = ["01", "02", "03", "04", "05", "06"];

// `accent` picks each project's card color — chosen to echo the project's
// own subject (teal for the GIS/mapping platform, terracotta for the stone
// company, gold for the trading bot, etc.), not a repeated brand color.
// Each hue is calibrated to hold at least 4.5:1 contrast as text on the
// dark project-card background (ink-soft #171717) — the same colors also
// fill the card's image panel, so brightening them for text legibility
// keeps the panels a little more vivid too, which reads fine either way.
// `glyph` picks which icon represents it on the card. `title` and `tech`
// are proper nouns/tech-stack names — not translated. `tag`/`desc` live in
// locales[lang].projects.items, same order.
// `image` is a real screenshot when one's been dropped in at that path
// (public/assets/...) — until then the card falls back to the `accent`
// color + `glyph` icon panel (see MockupFrame.jsx), so a missing asset
// never shows as a broken image.
export const projectMeta = [
  {
    title: "Atlas de Meknès",
    glyph: "map",
    image: "/assets/project-atlas-meknes.png",
    tech: ["React.js", "Vite", "Tailwind CSS", "OpenLayers", "Laravel API", "SQL Server"],
    link: null,
  },
  {
    title: "Les Pierres de Hamza",
    glyph: "site",
    image: "/assets/project-pierres-hamza.png",
    tech: ["React.js", "Vite", "Tailwind CSS", "SEO", "Vercel / Cloudflare"],
  },
  {
    title: "MOZAK",
    glyph: "shop",
    image: "/assets/project-mozak.png",
    tech: ["React.js", "Tailwind CSS", "Printify API"],
    link: null,
  },
  {
    title: "ByteConnect",
    glyph: "stage",
    image: "/assets/project-byteconnect.png",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "Laravel", "SQL"],
    link: null,
  },
];

// Price + highlight + icon per plan — name/period/features live in
// locales[lang].services.plans, same order. Prices are Moroccan Dirham
// amounts, not translated strings.
export const serviceMeta = [
  { price: "", highlight: false, icon: "support" },
  { price: "", highlight: true, icon: "starter" },
  { price: "", highlight: false, icon: "custom" },
];

// Tools Mouad actually builds with — proper nouns, same in every language.
export const tools = ["React.js", "Laravel", "Python", "Tailwind CSS", "OpenLayers", "SQL"];
export const faqCount = 6;

// Replace `href` with your real links. `whatsapp.href` has no `?text=` of
// its own — callers append that per-message (see Services.jsx's plan CTA).
export const contactLinks = {
  email: { href: "mailto:mouaddcode@gmail.com" },
  whatsapp: { href: "https://wa.me/212710528351" },
  linkedin: { href: "https://www.linkedin.com/in/mouad-bartal-65b962358/" },
  github: { href: "https://github.com/Mouadbrt" },
  instagram: { href: "https://www.instagram.com/mouad.code/" },
  twitter: { href: "https://x.com/mouadcode" },
};
