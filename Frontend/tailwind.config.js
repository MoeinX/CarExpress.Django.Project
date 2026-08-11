/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navyDeep: '#0a111e',
        navyCard: '#121c2d',
        electricOrange: '#ff5500',
        electricOrangeHover: '#e04b00',

        darkBg: '#131b26',
        darkCard: '#1a2432',
        accentBlue: '#00a3e0',
      },
      boxShadow: {
        'neo-flat': '6px 6px 12px #0f151e, -6px -6px 12px #17212e',
        'neo-pressed': 'inset 4px 4px 8px #0f151e, inset -4px -4px 8px #17212e',
        'neo-btn': '4px 4px 10px #0e141c, -4px -4px 10px #182230',
      }
    },
  },
  plugins: [],
}