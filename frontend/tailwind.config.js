/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#4ade80',  // green-400
          500: '#22c55e',  // green-500
          600: '#16a34a',  // green-600
          700: '#15803d',  // green-700
          800: '#166534',  // green-800
          900: '#14532d'   // green-900
        },
        secondary: {
          100: '#dcfce7',  // green-100
          400: '#4ade80',  // green-400
        },
        accent: {
          DEFAULT: '#16a34a',  // green-600
          light: '#22c55e',    // green-500
          dark: '#15803d',     // green-700
        },
        lavender: {
          100: '#f0fdf4',  // green-50
          400: '#4ade80',  // green-400
          600: '#16a34a',  // green-600
          800: '#166534'   // green-800
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [],
}