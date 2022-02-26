const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        turnip: {
          //https://www.colorhexa.com/cf2a2a
          darkest: "#0b0202",
          dark: "#6d1616",
          default: "#cf2a2a",
          light: "#e47878",
          lightest: "#fefafa",
        },
      },
      width: {
        560: "560px",
        420: "420px",
        350: "350px",
        280: "280px",
        135: "135px",
        68: "68px",
      },
      height: {
        560: "560px",
        420: "420px",
        350: "350px",
        280: "280px",
        135: "135px",
        68: "68px",
        2: "2px",
      },
      fontFamily: {
        "small-bunny": "SmallBunny",
        "mama-bunny": "Mama Bunny",
      },
      screens: {
        "3xl": "1815px",
        tall: { raw: "(min-height: 1200px)" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
