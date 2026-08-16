import React, { forwardRef, useState } from "react";
import { Map, Globe, ShoppingBag, GraduationCap, TrendingUp, LayoutGrid } from "lucide-react";

const GLYPHS = {
  map: Map,
  site: Globe,
  shop: ShoppingBag,
  stage: GraduationCap,
  trading: TrendingUp,
  portfolio: LayoutGrid,
};

// The project's "image" — a real screenshot when one's been dropped in
// (public/assets/..., see content.js), otherwise a bold solid panel in the
// project's own accent color with a glyph naming what kind of build it is,
// so a missing asset never shows as a broken image. Either way this fills
// the whole card as a background layer; ProjectCard owns all the chrome
// (index badge, tags, title, arrow) layered on top of it.
//
// The outer node stays the exact same `<div ref>` in both cases — the
// img/fallback only swap *inside* it — because ProjectCard's hover-zoom
// effect grabs this ref once (via forwardRef) and keeps animating that same
// node; if the ref target itself changed identity when an image failed to
// load, that effect would keep scaling a detached element.
const MockupFrame = forwardRef(function MockupFrame({ accent = "#2563eb", glyph = "site", image, alt = "" }, ref) {
  const Icon = GLYPHS[glyph] || LayoutGrid;
  const [failed, setFailed] = useState(false);
  const showImage = image && !failed;

  return (
    <div ref={ref} className="absolute inset-0" style={showImage ? undefined : { backgroundColor: accent }}>
      {showImage ? (
        <img src={image} alt={alt} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: "radial-gradient(circle at 75% 25%, rgba(255,255,255,0.5) 0%, transparent 45%)",
            }}
          />
          <Icon size={96} strokeWidth={1} className="absolute inset-0 m-auto text-ink/20" />
        </>
      )}
    </div>
  );
});

export default MockupFrame;
