/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#a78bfa',  // violet-400
          500: '#8b5cf6',  // violet-500
          600: '#7c3aed',  // violet-600
          700: '#6d28d9',  // violet-700
          800: '#5b21b6',  // violet-800
          900: '#4c1d95'   // violet-900
        },
        secondary: {
          100: '#f5f3ff',  // violet-50
          400: '#c4b5fd',  // violet-300
        },
        accent: {
          DEFAULT: '#e11d48',  // rose-600
          light: '#fb7185',    // rose-400
          dark: '#be123c',     // rose-700
        },
        lavender: {
          100: '#ede9fe',
          400: '#c4b5fd',
          600: '#7c3aed',
          800: '#5b21b6'
        }
      }
    }
  },
  plugins: [],
}