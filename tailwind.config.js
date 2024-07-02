/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "digimon-image": "url('/digimon.jpg')",
        "pokemon-image": "url('/pokemon.jpg')",
      },
    },
  },
  plugins: [],
};
