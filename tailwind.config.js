/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
            pixel:["VT323","monospace"],
            label:["Darumadrop One","cursive"],
      },
    },
  },
  plugins: [],
}

