/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bubble: {
          100: '#E0F7FA',
          200: '#B2EBF2',
          300: '#80DEEA',
          400: '#4DD0E1',
          500: '#26C6DA',
          600: '#00BCD4', // Primary
          700: '#00ACC1',
          800: '#0097A7',
          900: '#006064',
        },
        accent: {
          pink: '#F06292',
          purple: '#BA68C8',
          yellow: '#FFF176',
          orange: '#FFB74D',
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        'bubble': '2rem',
      },
      fontFamily: {
        'sans': ['"Fredoka"', 'sans-serif'], // We'll need to add this font
      },
      animation: {
        'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
