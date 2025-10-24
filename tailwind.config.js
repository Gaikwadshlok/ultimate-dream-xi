/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sporty: ['"Bebas Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
