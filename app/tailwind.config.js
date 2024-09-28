/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Menyertakan semua file di direktori app
    "./components/**/*.{js,ts,jsx,tsx}", // Menyertakan semua file di direktori components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

