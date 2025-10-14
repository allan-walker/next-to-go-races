/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '"Open Sans"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
