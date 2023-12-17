/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pokemon: ["pokemon", "sans-serif"],
        inter: ["inter", "sans-serif"],
      },
      colors: {
        "pokemon-yellow": "#FFCC00",
        "pokemon-blue": "#2C72B8",
        "pokemon-black": "#212633",
      }
    },
  },
  plugins: [],
}