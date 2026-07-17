/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      navyDeep: "#0A1128",
      navy: "#111B3D",
      navyLight: "#1B2F5C",
      white: "#F5F6FA",
      textMuted: "#8C96B8",
      gold: "#E8A33D",
      steel: "#3E7CB1",
      teal: "#22D3B8",
      tealDim: "#12564C",
      border: "#26305A",
    },
    fontFamily: {
      display: ["Space Grotesk", "sans-serif"],
      body: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
}
