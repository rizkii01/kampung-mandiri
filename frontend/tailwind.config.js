/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tempe: {
          green: {
            50: 'hsl(142 45% 95%)',
            100: 'hsl(142 45% 90%)',
            200: 'hsl(142 50% 80%)',
            400: 'hsl(142 65% 52%)',
            500: 'hsl(142 70% 46%)',
            600: 'hsl(142 70% 40%)',
            700: 'hsl(142 60% 30%)',
            800: 'hsl(142 60% 24%)',
            900: 'hsl(142 60% 20%)',
            950: 'hsl(142 65% 15%)',
          },
          gold: {
            50: 'hsl(38 95% 94%)',
            100: 'hsl(38 95% 88%)',
            500: 'hsl(38 92% 50%)',
            600: 'hsl(45 93% 47%)',
            700: 'hsl(45 93% 42%)',
          },
          cream: {
            50: 'hsl(33 30% 98%)',
            100: 'hsl(33 30% 96%)',
            200: 'hsl(34 32% 92%)',
          },
        },
        soy: {
          DEFAULT: 'hsl(38 92% 50%)',
          deep: 'hsl(45 93% 47%)',
          light: 'hsl(38 95% 94%)',
        },
        cream: {
          DEFAULT: 'hsl(33 30% 96%)',
          deep: 'hsl(34 32% 92%)',
        },
        stone: {
          150: 'hsl(30 12% 93%)',
          250: 'hsl(30 12% 89%)',
          850: 'hsl(30 10% 18%)',
        },
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.08)',
        'card-hover': '0 12px 32px -12px hsl(142 60% 20% / 0.18)',
        glow: '0 12px 40px -12px hsl(142 60% 30% / 0.35)',
        'glow-sm': '0 6px 20px -8px hsl(142 60% 30% / 0.3)',
        'glow-gold': '0 8px 30px -10px hsl(38 92% 50% / 0.45)',
      },
    },
  },
  plugins: [],
}
