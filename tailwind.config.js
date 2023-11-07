/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pokemon: ["pokemon", "sans-serif"]
      },
      colors: {
        "pokemon-yellow": "#FFCC00"
      }
    },
  },
  plugins: [],
}