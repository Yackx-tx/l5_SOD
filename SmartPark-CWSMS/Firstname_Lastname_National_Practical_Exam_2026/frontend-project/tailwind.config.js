/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#15803d', // green-700
          DEFAULT: '#166534', // green-800
          dark: '#14532d', // green-900
        },
        accent: '#f0fdf4' // green-50
      }
    },
  },
  plugins: [],
}
