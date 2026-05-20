import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accent2: 'rgb(var(--accent-2) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        highlight: 'rgb(var(--highlight) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px -30px rgb(0 0 0 / 0.45)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(60% 60% at 50% 10%, rgb(66 153 120 / 0.25), transparent 60%)',
      },
    },
  },
  plugins: [],
};

export default config;
