/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1E1E1E',
        accent: {
          DEFAULT: '#3C3C3C',
          green: '#4ADE80',
          blue: '#60A5FA',
          yellow: '#FACC15',
        },
        font: '#F3F4F6',
      }
    },
  },
  plugins: [],
}
