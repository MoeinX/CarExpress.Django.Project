/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // این خط ارور bg-navyDeep را برای همیشه حل می‌کند
        navyDeep: '#1A223E', 
        
        brand: {
          red: '#E31837',     // قرمز تند
          orange: '#FF8C00',  // نارنجی زنده
          slate: '#333F4A',   // خاکستری تیره
          light: '#F5F7FA',   // خاکستری روشن
        }
      },
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}