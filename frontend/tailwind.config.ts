import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        base: '#f8f4ef',
        surface: '#fffdf9',
        ink: '#2f2a26',
        accent: '#8b6f5a',
        accentSoft: '#dfc9b7'
      },
      fontFamily: {
        heading: ['\"Cormorant Garamond\"', 'serif'],
        body: ['\"Source Sans 3\"', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 40px -20px rgba(74, 56, 42, 0.4)'
      }
    }
  },
  plugins: []
};

export default config;
