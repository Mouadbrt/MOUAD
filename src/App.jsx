import React from "react";
import Hero from "./components/Hero.jsx";
import Sidebar from "./components/Sidebar.jsx";
import About from "./components/About.jsx";
import WhatYouGet from "./components/WhatYouGet.jsx";
import Projects from "./components/Projects.jsx";
import Services from "./components/Services.jsx";
import Clients from "./components/Clients.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen w-full text-ink font-body bg-putty">
      <Hero />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex gap-8 items-start">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <About />
            <WhatYouGet />
            <Projects />
            <Services />
            <Clients />
            <Testimonials />
            <Faq />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
