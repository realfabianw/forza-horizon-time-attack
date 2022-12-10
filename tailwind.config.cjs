/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        "1/2": "0.125rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
