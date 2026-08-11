# Mouad Bartal — Portfolio

React + Vite + Tailwind CSS project, structured as separate components
(not a single file).

**Design system: modeled on [heynesh.com](https://heynesh.com/).** Warm putty
background, near-black "Projets" panel, one loud acid-yellow accent, and a
persistent left sidebar (badge, bio, stats, scrollspy nav, tools, email,
CTA) that takes over from the hero onward — a deliberately close structural
match to the reference, adapted to Mouad's real content: a giant name
wordmark with a portrait overlapping it in the hero, horizontally-scrolling
project cards numbered `01`–`06`, a capabilities section ("Ce que vous
obtenez"), an honest trust section instead of fabricated client logos, and
an FAQ accordion. Display type is Plus Jakarta Sans (Bold/ExtraBold) for
headlines and nav, the same family at regular weight for body copy.

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

## ⚠️ Add your photo

The hero's giant name wordmark has a portrait overlapping it, same as the
reference site — **there's no photo yet**, so it currently shows a
placeholder ("Ajoutez votre photo"). Drop a portrait at:

```
public/assets/portrait.png
```

A vertical crop works best (the frame is taller than it is wide); the
photo doesn't need a plain background — a permanent dark gradient sits over
the bottom of it so the overlaid headline stays legible either way.

## Project structure

```
mouad-portfolio/
├── index.html
├── package.json
├── tailwind.config.js       ← colors, fonts (edit palette here)
├── postcss.config.js
├── vite.config.js
├── public/
│   └── assets/
│       ├── bg-blue.jpg      ← no longer referenced
│       └── portrait.png     ← add this (see above)
└── src/
    ├── main.jsx
    ├── App.jsx               ← page layout: Hero, then Sidebar + content column
    ├── index.css             ← Tailwind + global styles
    ├── data/
    │   └── content.js        ← ALL editable text + colors/icons per section
    └── components/
        ├── Hero.jsx           (top nav, giant wordmark, portrait, mobile menu)
        ├── Sidebar.jsx        (persistent nav — desktop only, lg breakpoint+)
        ├── About.jsx          ("À propos (&) Mon parcours" — journey cards)
        ├── WhatYouGet.jsx     ("Ce que vous obtenez" — capabilities)
        ├── Projects.jsx       (black panel, horizontal scroll)
        ├── ProjectCard.jsx
        ├── MockupFrame.jsx    (numbered, colored project "image")
        ├── Services.jsx       (pricing tiers + folded-in work process)
        ├── Clients.jsx        (honest trust section, no fabricated logos)
        ├── Testimonials.jsx
        ├── Faq.jsx            (accordion)
        ├── Contact.jsx        ("collaboration")
        ├── QrBlock.jsx
        ├── Ui.jsx             (Eyebrow, IconChip)
        └── Reveal.jsx         (scroll-in animation, respects reduced motion)
```

## What to edit

- **Everything text-based** (name, bio, projects, services, testimonials,
  FAQ, contact links): `src/data/content.js`. Nothing else needs touching
  for content changes.
- **Sidebar badge / hero wordmark**: `profile.badge` in `content.js`
  (currently "MOUAD").
- **Project accents/icons**: each entry in `projects` carries an `accent`
  hex and a `glyph` (`map` / `site` / `shop` / `stage` / `trading` /
  `portfolio` — picks the icon in `MockupFrame.jsx`).
- **Tools strip / trust section**: `tools` and `trust` in `content.js` — the
  trust section intentionally names Mouad's one real named client instead
  of inventing logos; extend it once there are more.
- **Colors / fonts**: `tailwind.config.js` → `theme.extend.colors` /
  `fontFamily`. Note: `src/index.css` hard-codes a few of these same hex
  values instead of using Tailwind's `theme()` CSS function — that function
  is unreliable in `vite dev` for custom colors with a `DEFAULT` key (throws
  in dev, works in `npm run build`). Keep both in sync by hand if you change
  the palette.
- **Contact placeholders**: `contact` object in `src/data/content.js` —
  the QR codes in the collaboration section read directly from
  `contact.linkedin.href` and `contact.github.href`, so updating the
  links there updates the QR codes automatically.

## Notes on this design pass

- Testimonials are 7 clearly-marked placeholders, ready to be replaced with
  real client quotes.
- The sidebar only renders at the `lg` breakpoint and up. Below that, the
  hero's hamburger button opens a full-screen mobile menu with the same
  navigation plus an email link and CTA, so nothing is lost on small
  screens — it's a different presentation of the same nav, not a cut corner.
- The black "Projets" panel is a large rounded panel spanning the content
  column, not a true edge-to-edge bleed to the browser edges (the
  persistent sidebar sits to its left) — a deliberate simplification of the
  reference's full-bleed section break.
