/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          light: '#8B4513',
          dark: '#3E2723'
        }
      }
    },
  },
  plugins: [],
}