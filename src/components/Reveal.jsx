import React, { useEffect, useRef, useState } from "react";

const prefersReducedMotion =
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export default function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: prefersReducedMotion ? "none" : `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
