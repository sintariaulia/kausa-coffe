/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),       // Plugin untuk menggunakan Tailwind CSS
    require('daisyui'),          // Plugin DaisyUI untuk komponen lebih lanjut
    require('autoprefixer'),    // Plugin untuk menambahkan vendor prefixes
  ],
}