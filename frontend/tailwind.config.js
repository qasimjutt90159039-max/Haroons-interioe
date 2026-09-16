/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          black: '#000000',
          deep: '#0A0A0A',
          charcoal: '#151515',
          dark: '#222222',
          medium: '#777777',
          light: '#D6D6D6',
          white: '#FFFFFF',
          soft: '#F5F5F5',
          gold: '#C9A86A',
          goldMuted: '#9B7E45',
          border: 'rgba(255, 255, 255, 0.08)',
          borderSubtle: '#1F1F1F',
          borderLight: '#2D2D2D',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widestEditorial: '0.25em',
        architectural: '0.15em',
      },
      lineHeight: {
        tightEditorial: '1.08',
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
}
