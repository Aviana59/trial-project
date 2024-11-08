/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#CA0C64',
        secondary: '#C96895',
        secondary2: '#D4A6BB',
        transparen: '#FFF4F9',
        transparen2: '#FFE8F2',
        deep: '#101828',
        deep2: '#475467'
      }
    },
  },
  plugins: [],
}