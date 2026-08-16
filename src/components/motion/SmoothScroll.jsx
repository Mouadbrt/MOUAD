import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Registered once, at import time — every motion component in the app can
// then use ScrollTrigger/SplitText without re-registering.
gsap.registerPlugin(ScrollTrigger, SplitText);

// Lenis is the single scroll authority; GSAP's ticker drives Lenis's raf
// loop (instead of Lenis's own autoRaf) and every Lenis "scroll" tick pokes
// ScrollTrigger to re-read the (real, un-transformed) scroll position. This
// is the integration Lenis's own docs recommend for pairing with GSAP.
function ScrollSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    function update(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        anchors: true,
        stopInertiaOnNavigate: true,
        syncTouch: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        // respectReducedMotion defaults to true — Lenis itself already
        // forces 1:1 (non-smoothed) scrolling under prefers-reduced-motion,
        // so no extra branching is needed here for the scroll feel itself.
      }}
    >
      <ScrollSync />
      {children}
    </ReactLenis>
  );
}
