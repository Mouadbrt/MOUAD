import React, { useCallback, useState } from "react";
import Hero from "./components/Hero.jsx";
import Sidebar from "./components/Sidebar.jsx";
import About from "./components/About.jsx";
import WhatYouGet from "./components/WhatYouGet.jsx";
import Projects from "./components/Projects.jsx";
import Services from "./components/Services.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import SmoothScroll from "./components/motion/SmoothScroll.jsx";
import Cursor from "./components/motion/Cursor.jsx";
import ScrollProgress from "./components/motion/ScrollProgress.jsx";
import SectionFlow from "./components/motion/SectionFlow.jsx";
import PageLoader from "./components/motion/PageLoader.jsx";

export default function App() {
  // Custom cursor mounts only once the loader is fully gone — otherwise its
  // reticle floats over the splash screen, which reads as a glitch rather
  // than an intentional layer.
  const [loading, setLoading] = useState(true);
  const handleLoaderDone = useCallback(() => setLoading(false), []);

  return (
    <SmoothScroll>
      <div className="min-h-screen w-full text-ink font-body bg-putty">
        <PageLoader onDone={handleLoaderDone} />
        {!loading && <Cursor />}
        <ScrollProgress />
        <SectionFlow />
        <Hero />

        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex gap-8 items-start">
            <Sidebar />
            <div className="flex-1 min-w-0">
              <About />
              <WhatYouGet />
              <Projects />
              <Services />
              <Testimonials />
              <Faq />
              <Contact />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
