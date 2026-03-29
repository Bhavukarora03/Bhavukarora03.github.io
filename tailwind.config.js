/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#fafafa",
        sidebar: "#18181b",
        chat: "#09090b",
        accent: {
          green: "#10b981", // Emerald 500
          hover: "#059669",
        },
        border: "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
}
