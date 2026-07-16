/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      bg: "#05070f",
      surface: "#0c0f1d",
      surface2: "#12172b",
      border: "#1d264a",
      text: "#f1f5f9",
      textMuted: "#6b7c96",
      gold: "#00f0ff",     // Cyber Cyan (Primary highlight)
      goldDim: "#004b54",  // Cyber Cyan Dim
      teal: "#ff007f",     // Cyber Magenta (Accent highlight)
      tealDim: "#6b0033",  // Cyber Magenta Dim
    },
    fontFamily: {
      display: ["Space Grotesk", "sans-serif"],
      body: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
}
