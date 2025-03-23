/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",

  theme: {
    extend: {
      colors: {
        primary: "#b57edc",
        stroke: "#262626",
      },
      boxShadow: {
        form: "0px 4px 18px 0px #4B465C1A",
      },
      animation: {
        "go-up": "go-up 0.3s ease-in-out ",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
