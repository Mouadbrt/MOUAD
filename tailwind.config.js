/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // cool light grey — the page's default ground (light/minimal theme)
        putty: {
          DEFAULT: "#eef2f7",
          card: "#e4ebf3",
          line: "#d3dde8",
        },
        // deep navy ink — the "Projets" panel and all primary text on putty
        ink: {
          DEFAULT: "#0f172a",
          soft: "#1e293b",
          card: "#101a2e",
        },
        paper: "#ffffff",
        // blue — the one accent, used loud and sparingly
        acid: {
          DEFAULT: "#2563eb",
          dim: "#1d4ed8",
        },
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
