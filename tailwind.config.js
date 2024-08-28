/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./presets/**/*.{js,vue,ts}",
    // other paths
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')]
}


