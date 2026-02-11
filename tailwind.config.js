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
          100: '#FFF3E0', // Orange 50
          200: '#FFE0B2', // Orange 100
          300: '#FFCC80', // Orange 200
          400: '#FFB74D', // Orange 300
          500: '#FFA726', // Orange 400
          600: '#FF9800', // Orange 500 (Primary)
          700: '#F57C00', // Orange 700
          800: '#EF6C00', // Orange 800
          900: '#E65100', // Orange 900
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
