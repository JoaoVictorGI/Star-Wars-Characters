/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "star-wars": "url('./assets/imgs/background.png')",
      },
      fontFamily: {
        starWars: ["Star Wars", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
