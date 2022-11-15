/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    // require("flowbite/plugin"),
    // require('@themesberg/flowbite/plugin')
  ],
  theme: {
    fontFamily: {
      'body': 'Poppins, sans-serif'
    },
    extend: {},
  },
  darkMode: 'class',
}
