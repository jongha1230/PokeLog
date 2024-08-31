/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxl: "1660px",
      },
      backgroundImage: {
        "digimon-image": "url('/digimon.jpg')",
        "pokemon-image": "url('/pokemon.jpg')",
        "mypage-image": "url('/mypage.jpg')",
      },
      colors: {
        brown: {
          50: "#f5f0eb",
          100: "#e6dcd1",
          200: "#ccb9a3",
          300: "#b39976",
          400: "#997a49",
          500: "#7f5f33",
          600: "#664729",
          700: "#4d311e",
          800: "#331d14",
          900: "#1a0e0a",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".bg-position-center-85": {
            "background-position": "center 85%",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
