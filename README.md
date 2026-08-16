# Mouad Bartal — Portfolio

My personal portfolio — React + Vite + Tailwind CSS, structured as separate
components (not a single file), fully translated into French/English/Spanish,
and animated throughout with GSAP + Lenis.

**Design system.** Warm putty background, a near-black "Projets" panel, one
loud acid-blue accent, and a persistent left sidebar (badge, bio, language
switcher, stats, scrollspy nav, tools, email, CTA) that takes over from the
hero onward. A giant name wordmark with a portrait overlapping it in a
cinematic pinned hero, an alternating scroll-drawn journey timeline,
horizontally-scrolling project cards, a pricing section with per-plan
WhatsApp CTAs, and an FAQ accordion. Display type is Plus Jakarta Sans
(Bold/ExtraBold) for headlines and nav, the same family at regular weight
for body copy.

## Setup

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

Build for production:

```bash
npm run build
npm run preview
```

## Deploying to Vercel

The project needs no server/API and no environment variables — it's a
static Vite build, and `vercel.json` already pins the framework, build
command (`npm run build`) and output directory (`dist`).

**Option A — via GitHub (recommended, gives you auto-deploys on push):**

```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

Then in the [Vercel dashboard](https://vercel.com/new), import that
repository — it will detect the Vite framework automatically and deploy on
every push.

**Option B — directly from your machine, no GitHub needed:**

```bash
npx vercel        # first deploy — follow the prompts to link/create a project
npx vercel --prod # promote to your production URL
```

Before your first real deploy:

- Add the missing images noted below (at minimum `portrait.png` — the site
  works and looks intentional without the rest, via icon-panel fallbacks).
- Add `public/assets/og-image.png` (1200×630) for link-preview cards, and
  once you have a real domain, update `og:url`/`twitter:url` in
  `index.html` (currently omitted since it isn't known yet).
- Once you have a real domain, replace the placeholder
  `https://your-domain.vercel.app/` in `public/sitemap.xml` and
  `public/robots.txt` with it, then submit the sitemap in
  [Google Search Console](https://search.google.com/search-console) so the
  site gets indexed.

## ⚠️ Add your photo

The hero's giant name wordmark has a portrait overlapping it — **there's no
photo yet**, so it currently shows a placeholder ("Ajoutez votre photo").
Drop a portrait at:

```
public/assets/portrait.png
```

A vertical crop works best (the frame is taller than it is wide); the
photo doesn't need a plain background — a permanent dark gradient sits over
the bottom of it so the overlaid headline stays legible either way.

The same graceful-fallback pattern (real image if present, otherwise a
clean icon placeholder — never a broken-image icon) also covers the
"Ce que vous obtenez" cards and the project cards; see `capabilities` and
`projectMeta` in `src/data/content.js` for the expected paths.

## Project structure

```
mouad-portfolio/
├── index.html                ← meta tags, favicon, fonts
├── vercel.json                ← Vercel build/deploy settings
├── package.json
├── tailwind.config.js         ← colors, fonts (edit palette here)
├── postcss.config.js
├── vite.config.js
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml             ← update the placeholder domain once deployed
│   └── assets/                ← portrait, project screenshots, etc. (see above)
└── src/
    ├── main.jsx                ← mounts <App> inside <LanguageProvider>
    ├── App.jsx                 ← page layout: loader, Hero, then Sidebar + content column
    ├── index.css                ← Tailwind + global styles
    ├── lib/
    │   ├── LanguageContext.jsx  ← i18n: active language, translations, RTL/persist, useTranslations()
    │   └── motionConfig.js      ← shared GSAP easing/breakpoints, prefersReducedMotion()
    ├── locales/
    │   ├── fr.json              ← French (default) — every UI/section string
    │   ├── en.json               ← English
    │   └── es.json               ← Spanish
    ├── data/
    │   └── content.js            ← language-independent data only: names, links, colors,
    │                                 icon keys, tech-stack labels, prices — translatable
    │                                 text lives in src/locales/*.json instead, keyed by
    │                                 the same array order
    └── components/
        ├── Hero.jsx               (nav, giant wordmark, portrait, mobile menu, pinned scroll-exit)
        ├── Sidebar.jsx            (persistent nav — desktop only, lg breakpoint+)
        ├── LanguageSwitcher.jsx   (reusable dropdown — mounted in Navbar + Sidebar, shared state)
        ├── About.jsx              (scroll-drawn alternating journey path)
        ├── WhatYouGet.jsx         ("Ce que vous obtenez" — capability cards)
        ├── Projects.jsx           (black panel, horizontal scroll)
        ├── ProjectCard.jsx
        ├── MockupFrame.jsx        (project "image" — real screenshot or color+icon fallback)
        ├── Services.jsx           (pricing tiers + folded-in work process + WhatsApp CTA)
        ├── Testimonials.jsx
        ├── Faq.jsx                (accordion)
        ├── Contact.jsx            ("collaboration" — email/WhatsApp/socials + QR codes)
        ├── QrBlock.jsx
        ├── Ui.jsx                 (Eyebrow, IconChip)
        ├── Reveal.jsx             (scroll-in fade/rise, respects reduced motion)
        └── motion/                (GSAP-driven primitives: RevealText split-text headings,
                                     PageLoader splash, TargetCursor, LogoLoop marquee,
                                     SmoothScroll/Lenis wiring, ScrollProgress, Parallax, …)
```

## What to edit

- **Language/UI text** (nav, headings, section copy, FAQ, testimonials,
  pricing plans, project tags/descriptions): `src/locales/fr.json` /
  `en.json` / `es.json`. All three must stay the same shape — array lengths
  in particular need to match `content.js`'s metadata arrays (same index,
  same order).
- **Non-text data** (names, links, colors, icon keys, tech-stack labels,
  prices): `src/data/content.js`.
- **Sidebar badge / hero wordmark**: `profile.badge` in `content.js`
  (currently "MOUAD").
- **Project accents/icons**: each entry in `projectMeta` carries an
  `accent` hex and a `glyph` (`map` / `site` / `shop` / `stage` / `trading`
  / `portfolio` — picks the icon in `MockupFrame.jsx`).
- **Tools strip**: `tools` in `content.js`.
- **Contact links**: `contactLinks` in `src/data/content.js` — the QR codes
  in the collaboration section read directly from `contactLinks.linkedin.href`
  and `contactLinks.github.href`, so updating the links there updates the QR
  codes automatically. `contactLinks.whatsapp.href` also powers each pricing
  plan's "choose this plan" button.
- **Colors / fonts**: `tailwind.config.js` → `theme.extend.colors` /
  `fontFamily`. Note: `src/index.css` hard-codes a few of these same hex
  values instead of using Tailwind's `theme()` CSS function — that function
  is unreliable in `vite dev` for custom colors with a `DEFAULT` key (throws
  in dev, works in `npm run build`). Keep both in sync by hand if you change
  the palette.

## Notes on this design pass

- Testimonials are 7 invented placeholders (fictional names/quotes, not
  real client feedback) — ready to be swapped for real ones once available.
- The sidebar only renders at the `lg` breakpoint and up. Below that, the
  hero's hamburger button opens a full-screen mobile menu with the same
  navigation plus an email link and CTA, so nothing is lost on small
  screens — it's a different presentation of the same nav, not a cut corner.
- The black "Projets" panel is a large rounded panel spanning the content
  column, not a true edge-to-edge bleed to the browser edges — the
  persistent sidebar sits to its left, so a full-bleed section break would
  have fought that layout instead of sitting inside it.
