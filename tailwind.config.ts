import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#f5f5f5',
        muted: '#a3a3a3',
        'accent-purple': '#c9a4ff',
        'accent-teal': '#7dd3c0',
        'accent-rose': '#e0a8b8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['Caveat', 'cursive'],
      },
    },
  },
} satisfies Config
