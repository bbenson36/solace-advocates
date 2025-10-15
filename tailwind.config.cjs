/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2fdfa',
          100: '#e6fbf7',
          200: '#bff6ef',
          300: '#8feedc',
          400: '#57e3c1',
          500: '#19caa3',
          600: '#14977a',
          700: '#0f6a57',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          700: '#334155',
        },
        accent: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
        success: { 500: '#16a34a' },
        danger: { 500: '#dc2626' },
      },
      spacing: { 18: '4.5rem', 72: '18rem', 84: '21rem' },
      borderRadius: { lg: '0.75rem' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
