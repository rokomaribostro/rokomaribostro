/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: {
          50:  '#FAF4F0',
          100: '#F2E8E1',
          200: '#E5D0C5',
          300: '#D4B5A0',
          400: '#C4A097',
          500: '#A07060',
          600: '#7B4E3D',
          700: '#5C3228',
          800: '#4A2828',
          900: '#3D1F1F',
        },
        cream: {
          50:  '#F5EDE6',
          100: '#EDE0D8',
          200: '#E8D5C4',
          300: '#DFC9B6',
          400: '#D4BBA9',
        },
        beige: {
          50:  '#F9F3EE',
          100: '#F2E9E0',
        },
      },
      fontFamily: {
        serif:   ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:    ['Hind Siliguri', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      transitionDuration: {
        400: '400ms',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
      },
    },
  },
  plugins: [],
};
