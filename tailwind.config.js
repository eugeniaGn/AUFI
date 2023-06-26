/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'blanco': '#F2F2F2',
        'grisC': '#E3E3E3',
        'grisF': '#D9D9D9',
        'negro': '#555555',
        'verdeC': '#C1DDB7',
        'verdeF': '#278617',
      },
      fontFamily: {
        'lato': ['"Lato"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
