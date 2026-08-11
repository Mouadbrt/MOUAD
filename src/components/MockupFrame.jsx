import React from "react";
import { Map, Globe, ShoppingBag, GraduationCap, TrendingUp, LayoutGrid, ArrowUpRight } from "lucide-react";

const GLYPHS = {
  map: Map,
  site: Globe,
  shop: ShoppingBag,
  stage: GraduationCap,
  trading: TrendingUp,
  portfolio: LayoutGrid,
};

// The project's "image" — since no real screenshots were supplied, a bold
// solid panel in the project's own accent color stands in, with a big
// glyph naming what kind of build it is, and the same numbered-badge +
// tag-pill + arrow-out chrome a real screenshot card would carry.
export default function MockupFrame({ accent = "#2563eb", glyph = "site", index = 1, link }) {
  const Icon = GLYPHS[glyph] || LayoutGrid;
  return (
    <div className="relative h-48 md:h-56 rounded-t-2xl overflow-hidden" style={{ backgroundColor: accent }}>
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "radial-gradient(circle at 75% 25%, rgba(255,255,255,0.5) 0%, transparent 45%)",
        }}
      />
      <span className="absolute top-3 left-3 rounded-full bg-ink/80 text-paper text-[11px] font-display font-bold px-2.5 py-1">
        {String(index).padStart(2, "0")}
      </span>
      <Icon size={56} strokeWidth={1.25} className="absolute inset-0 m-auto text-ink/25" />
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          title="Voir le site"
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-acid text-ink flex items-center justify-center hover:bg-acid-dim transition-colors"
        >
          <ArrowUpRight size={16} />
        </a>
      )}
    </div>
  );
}
