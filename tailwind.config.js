/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#0a2540',
        'brand-navy-light': '#0d3b66',
        'brand-gold': '#d4af37',
        'brand-gold-dark': '#b89b2e',
        'brand-cream': '#faf8f1',
        'brand-teal': '#14b8a6',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}