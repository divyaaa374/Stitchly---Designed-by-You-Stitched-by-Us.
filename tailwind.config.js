/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFF9F5',
          50: '#FFFFFF',
          100: '#FFF9F5',
          200: '#FDF0E7',
          300: '#FBE4D5',
        },
        blush: {
          DEFAULT: '#F9D5DC',
          light: '#FCE7EB',
          dark: '#E8A7B5',
        },
        lavender: {
          DEFAULT: '#E4DAF6',
          light: '#F0EAFB',
          dark: '#BCA7E8',
        },
        mint: {
          DEFAULT: '#D5EFE3',
          light: '#EAF8F1',
          dark: '#9BD6BA',
        },
        peach: {
          DEFAULT: '#FFE2CF',
          light: '#FFF0E6',
          dark: '#F7BC98',
        },
        butter: {
          DEFAULT: '#FFF1B8',
          light: '#FFF8DC',
          dark: '#FDE075',
        },
        sky: {
          DEFAULT: '#D8E8F8',
          light: '#EBF3FC',
          dark: '#9EC4ED',
        },
        plum: {
          DEFAULT: '#4A3F5C',
          soft: '#8A7F9C',
          muted: '#685C7E',
          deep: '#2F263D',
        },
        rose: {
          deep: '#D9718A',
          soft: '#E898AC',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'pastel': '0 8px 30px rgba(249, 213, 220, 0.28)',
        'pastel-mint': '0 8px 30px rgba(213, 239, 227, 0.35)',
        'pastel-sky': '0 8px 30px rgba(216, 232, 248, 0.35)',
        'pastel-lavender': '0 8px 30px rgba(228, 218, 246, 0.35)',
        'soft-lift': '0 12px 35px -4px rgba(74, 63, 92, 0.08), 0 4px 12px rgba(249, 213, 220, 0.15)',
        'glow-rose': '0 0 25px rgba(217, 113, 138, 0.35)',
      },
      backgroundImage: {
        'mesh-atelier': 'radial-gradient(at 0% 0%, rgba(249, 213, 220, 0.5) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(228, 218, 246, 0.45) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(213, 239, 227, 0.45) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(255, 241, 184, 0.4) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}
