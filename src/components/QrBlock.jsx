import React from "react";
import QRCode from "react-qr-code";

export default function QrBlock({ label, value }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-paper p-2.5 rounded-xl border border-ink/10">
        <QRCode value={value} size={84} bgColor="#ffffff" fgColor="#0f172a" />
      </div>
      <span className="font-display text-[10px] font-bold uppercase tracking-widest text-paper/70">{label}</span>
    </div>
  );
}
