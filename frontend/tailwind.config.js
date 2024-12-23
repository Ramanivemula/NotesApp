/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBackground: '#f6f6f6', // Replace this with your desired color
      },
    },
  },
  plugins: [],
}
