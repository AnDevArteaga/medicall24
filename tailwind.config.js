/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {'sm': {'max': '768px' }, 'md': { 'min': '769px' ,'max': '1024px' }},

      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fadeInOut": "fadeInOut 0.1s ease-in-out infinite",
      },
    },

    keyframes: {
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
    },
  },
  plugins: [],
}

