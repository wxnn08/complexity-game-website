/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["emerald", "dark", "light"],
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
}
