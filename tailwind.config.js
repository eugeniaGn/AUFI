/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'blanco': '#FFFFFF',
        'witheSmoke': '#F2F2F2',
        'timberWolf': '#E1DCD6',
        'grisC': '#E3E3E3',
        'grisF': '#D9D9D9',
        'silver': '#C5B6B1',
        'teaGreen': '#C1DDB7',
        'indiaGreen': '#278617',
        'imperialRed': '#EF4444',
        'teaRed': '#FFCCCC',
        'coralPink': '#DC9788',
        'davysGray': '#545454',
      },
      fontFamily: {
        'lato': ['"Lato"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
