import React from "react";

// Small pill-outline label used above every section heading
// ("SELECTED WORK", "SERVICES", "FAQ", …).
export function Eyebrow({ children, dark = false }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-widest ${
        dark ? "border-paper/25 text-paper/80" : "border-ink/20 text-ink/70"
      }`}
    >
      {children}
    </span>
  );
}

// Small rounded-square icon holder — yellow-on-ink by default, matching the
// reference's capability/service icon chips.
export function IconChip({ icon: Icon, className = "" }) {
  return (
    <span className={`inline-flex w-9 h-9 items-center justify-center rounded-xl bg-acid text-ink shrink-0 ${className}`}>
      <Icon size={17} strokeWidth={2.25} />
    </span>
  );
}
