import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem', lg: '2.5rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        primary: '#931F5A',
        secondary: '#353B77',
        tertiary: '#F8F9FA',
        ink: {
          DEFAULT: '#1B1831',
          950: '#100D22',
          900: '#16132B',
          800: '#221E3D',
        },
        surface: '#FAF7FB',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-urbanist)', ...defaultTheme.fontFamily.sans],
        urbanist: ['var(--font-urbanist)', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #931F5A 0%, #353B77 100%)',
        'brand-gradient-b': 'linear-gradient(180deg, #931F5A 0%, #353B77 100%)',
        'brand-gradient-d':
          'linear-gradient(135deg, #B0256C 0%, #931F5A 35%, #353B77 100%)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(27,24,49,0.04), 0 8px 24px -12px rgba(27,24,49,0.14)',
        lift: '0 2px 4px rgba(27,24,49,0.04), 0 24px 48px -20px rgba(27,24,49,0.28)',
        glow: '0 12px 40px -12px rgba(147,31,90,0.6)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        'page-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(4%, -6%) scale(1.08)' },
          '66%': { transform: 'translate(-5%, 4%) scale(0.95)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      // Entrance animations fill `backwards` only: a transform animation still
      // held in effect afterwards makes Chrome treat the element as the
      // containing block for position:fixed descendants, trapping modals.
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        'page-in': 'page-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        drift: 'drift 18s ease-in-out infinite',
        'pop-in': 'pop-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) backwards',
      },
    },
  },
  plugins: [],
};
export default config;
