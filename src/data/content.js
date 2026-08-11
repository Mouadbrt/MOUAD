// ---------------------------------------------------------------------------
// All editable portfolio content lives in this one file.
// Update names, links and copy here — the components just render this data.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Mouad Bartal",
  badge: "MOUAD", // short chip name, shown in the sidebar
  roleLine: "Développeur Web Full-Stack & Data / AI",
  city: "Meknès, Maroc",
  yearsExperience: "2",
  projectsCount: "10+",
  bioParagraphs: [
    "Développeur Web Full-Stack passionné par la donnée et l'intelligence artificielle. Je conçois des plateformes complètes — du frontend au backend — en passant par la cartographie interactive, l'e-commerce et l'automatisation.",
    "Curieux et orienté résultats, j'aime transformer un besoin métier en une application propre, rapide et maintenable.",
  ],
  skills: [
    "React.js / Vite / Tailwind CSS",
    "Laravel / PHP / SQL",
    "Python / Data & automatisation",
    "APIs, dashboards, authentification",
  ],
  signature: "Mouad Bartal",
};

// A short, honest personal-journey timeline for the About section. No
// specific years are invented — phrase milestones relatively instead of
// backfilling dates that aren't confirmed.
export const journey = [
  {
    tag: "Les débuts",
    title: "Premières lignes de code",
    desc: "Découverte du développement web — HTML/CSS puis JavaScript — et l'envie de comprendre comment un besoin devient une application.",
  },
  {
    tag: "Stage — ByteConnect",
    title: "Premier pied dans le pro",
    desc: "Participation à des projets et solutions web en environnement professionnel, mise en pratique du Full-Stack au-delà des cours.",
  },
  {
    tag: "Aujourd'hui",
    title: "Full-Stack, data & IA",
    desc: "Des plateformes complètes livrées pour de vrais clients — du site vitrine au Web GIS — avec un intérêt croissant pour la donnée et l'automatisation.",
  },
];

// What working with Mouad actually gets you — grouped from `profile.skills`
// into capability areas, for the "Ce que vous obtenez" section.
export const capabilities = [
  {
    icon: "layout",
    title: "Sites & applications web",
    desc: "React, Vite et Tailwind CSS pour des interfaces rapides, responsives et faciles à faire évoluer.",
  },
  {
    icon: "server",
    title: "Backend & bases de données",
    desc: "Laravel, PHP et SQL pour une logique métier solide, des APIs propres et des données bien structurées.",
  },
  {
    icon: "chart",
    title: "Data & automatisation",
    desc: "Python pour transformer des données brutes en scripts, dashboards et automatisations utiles.",
  },
  {
    icon: "map",
    title: "Cartographie interactive",
    desc: "Des plateformes Web GIS complètes — visualisation, gestion des couches, authentification et droits d'accès.",
  },
];

export const steps = [
  { n: "01", title: "Prise de contact", desc: "Échange initial sur le projet, les objectifs et le contexte." },
  { n: "02", title: "Brief détaillé", desc: "Collecte des besoins, du contenu et des contraintes techniques." },
  { n: "03", title: "Devis proposé", desc: "Proposition commerciale claire, adaptée au périmètre défini." },
  { n: "04", title: "Validation", desc: "Accord sur le périmètre, le budget et le calendrier de livraison." },
  { n: "05", title: "Développement", desc: "Conception, code, intégration, tests — en itérations suivies." },
  { n: "06", title: "Livraison & suivi", desc: "Mise en ligne, passation, et support après lancement." },
];

// `accent` picks each project's card color — chosen to echo the project's
// own subject (teal for the GIS/mapping platform, terracotta for the stone
// company, gold for the trading bot, etc.), not a repeated brand color.
// Each hue is calibrated to hold at least 4.5:1 contrast as text on the
// dark project-card background (ink-soft #171717) — the same colors also
// fill the card's image panel, so brightening them for text legibility
// keeps the panels a little more vivid too, which reads fine either way.
// `glyph` picks which icon represents it on the card.
export const projects = [
  {
    title: "Atlas de Meknès",
    tag: "Web GIS",
    glyph: "map",
    accent: "#6fa3ae",
    desc: "Plateforme Web GIS de visualisation et gestion des données géographiques de Meknès — annexes administratives, communes, écoles et centres de santé, avec authentification et gestion des utilisateurs.",
    tech: ["React.js", "Vite", "Tailwind CSS", "OpenLayers", "Laravel API", "SQL Server"],
    link: null,
  },
  {
    title: "Les Pierres de Hamza",
    tag: "Site web",
    glyph: "site",
    accent: "#c68f5f",
    desc: "Site web moderne et responsive présentant l'activité et les produits de l'entreprise, avec structure SEO et déploiement en ligne.",
    tech: ["React.js", "Vite", "Tailwind CSS", "SEO", "Vercel / Cloudflare"],
    link: "https://lespierresdehamza.com/",
  },
  {
    title: "MOZAK",
    tag: "E-commerce",
    glyph: "shop",
    accent: "#c8788e",
    desc: "Identité digitale et expérience e-commerce d'une marque de vêtements moderne — identité visuelle, interface, fiches produits et préparation de l'intégration Printify.",
    tech: ["React.js", "Tailwind CSS", "Printify API"],
    link: null,
  },
  {
    title: "ByteConnect",
    tag: "Stage — Dev Web",
    glyph: "stage",
    accent: "#8b9cb5",
    desc: "Expérience professionnelle en développement web : participation à des projets et solutions web, mise en pratique du Full-Stack en environnement pro.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "Laravel", "SQL"],
    link: null,
  },
  {
    title: "ICT Trading Bot",
    tag: "Python",
    glyph: "trading",
    accent: "#c9a23f",
    desc: "Bot de trading basé sur une stratégie algorithmique inspirée de l'ICT / SMC — backtests, analyse des performances et optimisation des paramètres.",
    tech: ["Python", "MetaTrader 5", "Pandas", "Backtesting"],
    link: null,
  },
  {
    title: "Portfolio Personnel",
    tag: "Full-Stack",
    glyph: "portfolio",
    accent: "#7a9b7f",
    desc: "Portfolio professionnel moderne présentant compétences, projets, expériences et services de développement web.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Vite"],
    link: null,
  },
];

export const services = [
  {
    name: "Support continu",
    price: "500 DH",
    period: "/ mois",
    highlight: false,
    icon: "support",
    features: [
      "Maintenance du site",
      "Corrections de bugs",
      "Petites modifications",
      "Optimisation des performances",
      "Support technique",
    ],
  },
  {
    name: "Projet Starter",
    price: "2 500 DH",
    period: "à partir de",
    highlight: true,
    icon: "starter",
    features: [
      "Site vitrine professionnel",
      "Design responsive",
      "Jusqu'à plusieurs pages",
      "Formulaire de contact",
      "Optimisation SEO de base",
      "Mise en ligne",
    ],
  },
  {
    name: "Projet Custom",
    price: "5 000 DH",
    period: "à partir de",
    highlight: false,
    icon: "custom",
    features: [
      "Application web personnalisée",
      "Frontend + Backend",
      "Base de données",
      "Authentification & API",
      "Dashboard",
      "Déploiement et configuration",
    ],
  },
];

// Tools Mouad actually builds with — used as a credibility strip in place
// of client logos he doesn't have yet (only one named client so far, see
// `trust` below). Swap/extend as the stack grows.
export const tools = ["React.js", "Laravel", "Python", "Tailwind CSS", "OpenLayers", "SQL"];

// Honest stand-in for a client-logo wall: name the one real named client,
// rather than inventing logos that don't exist yet.
export const trust = {
  note: "Encore tôt dans le parcours freelance — voici le client qui m'a fait confiance jusqu'ici.",
  client: { name: "Les Pierres de Hamza", href: "https://lespierresdehamza.com/" },
};

export const testimonials = Array.from({ length: 7 }).map((_, i) => ({
  id: i + 1,
  quote: "Ce témoignage sera bientôt disponible — un retour client viendra remplacer ce texte.",
  name: "Client à venir",
}));

export const faq = [
  {
    q: "Travaillez-vous avec des clients en dehors du Maroc ?",
    a: "Oui — le travail se fait à distance, par appel et messagerie, avec des points d'avancement réguliers quel que soit le fuseau horaire du client.",
  },
  {
    q: "Quel est le délai moyen pour un site vitrine ?",
    a: "Comptez une à deux semaines pour un site vitrine (formule Starter), et davantage selon le nombre de pages et les fonctionnalités demandées.",
  },
  {
    q: "Proposez-vous un support après la mise en ligne ?",
    a: "Oui, via la formule Support continu : maintenance, corrections de bugs, petites modifications et optimisation des performances, mois par mois.",
  },
  {
    q: "Puis-je démarrer avec un petit projet avant de voir plus grand ?",
    a: "Tout à fait — beaucoup de projets démarrent en formule Starter et évoluent ensuite vers un projet sur-mesure une fois les bases posées.",
  },
  {
    q: "Comment se déroule le paiement ?",
    a: "Un devis clair est proposé après le brief détaillé, avec les modalités de paiement convenues avant le démarrage du développement.",
  },
  {
    q: "Faites-vous aussi de la data et de l'IA, ou uniquement du web ?",
    a: "Les deux — du site web classique aux plateformes avec cartographie interactive, dashboards et automatisation en Python.",
  },
];

// Replace `value`/`href` with your real links — QR codes below read from `href`.
export const contact = {
  email: { label: "Email", value: "À ajouter", href: "mailto:contact@example.com" },
  linkedin: { label: "LinkedIn", value: "À ajouter", href: "https://linkedin.com" },
  github: { label: "GitHub", value: "À ajouter", href: "https://github.com" },
  instagram: { label: "Instagram", value: "À ajouter", href: "https://instagram.com" },
  twitter: { label: "Twitter / X", value: "À ajouter", href: "https://twitter.com" },
};
