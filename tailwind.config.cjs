/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    backgroundImage: {
      svg: "url(/background.svg)",
      /* background by SVGBackgrounds.com */
    },
  },
  plugins: [],
};
