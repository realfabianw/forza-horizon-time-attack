/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        "1/2": "0.125rem",
      },
    },
    // backgroundImage: {
    //   svg: "url(/background.svg)",
    //   /* background by SVGBackgrounds.com */
    // },
  },
  plugins: [],
};
