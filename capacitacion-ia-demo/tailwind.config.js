/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      bg: "#0E1118",
      surface: "#161B26",
      surface2: "#1D2330",
      border: "#2A3141",
      text: "#F2F0E9",
      textMuted: "#8B93A7",
      gold: "#E8A33D",
      goldDim: "#8A6A34",
      teal: "#22D3B8",
      tealDim: "#1B7F71",
    },
    fontFamily: {
      display: ["Space Grotesk", "sans-serif"],
      body: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
}
