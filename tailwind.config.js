/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#38a8f8',
          500: '#0e8ce4',
          600: '#026ec5',
          700: '#0358a0',
          800: '#074a83',
          900: '#0c3f6d',
          950: '#082848',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 15px -5px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
