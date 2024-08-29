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
    colors: {
      'theme-white': '#fffdfc',
      'theme-grey': '#739193',
      'theme-black-dark': '#000103',
      'theme-black-light': '#28263b',
      'theme-pink': '#d45784',
      'theme-green': '#1ce592',
    },
  },
  plugins: [require('tailwindcss-primeui')]
}


