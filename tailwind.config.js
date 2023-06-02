/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: '#0F7EBA',
        green: '#61876E',
        lightGreen: '#13A59E',
        yellow: '#EAE7B1',
        navbar: '#F2F9FA',
        bgIcon: '#F9F9F9'
      }
    }
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
