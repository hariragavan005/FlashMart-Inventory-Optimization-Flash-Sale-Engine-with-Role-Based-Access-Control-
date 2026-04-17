/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'premium-dark': '#0A0F1F',
        'premium-gold': '#F5B041',
        'premium-cream': '#F9F9F9',
        'premium-coral': '#FF6B6B',
        'premium-teal': '#2D9CDB',
        'premium-purple': '#9B59B6',

        background: 'var(--bg-color)',
        surface: 'var(--surface-color)',
        textMain: 'var(--text-main)',
        muted: 'var(--text-muted)',
        primary: 'var(--primary-color)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Sora', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Sora', 'sans-serif'], // keep Tailwind's default sans → Sora
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'flip-in': 'flipIn 0.3s ease both',
        'fade-in-up': 'fadeInUp 0.6s ease both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(245, 176, 65, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(245, 176, 65, 0.6)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        flipIn: {
          '0%':   { transform: 'rotateX(-90deg) scaleY(0.5)', opacity: '0' },
          '60%':  { transform: 'rotateX(12deg)',              opacity: '1' },
          '100%': { transform: 'rotateX(0deg)  scaleY(1)',   opacity: '1' },
        },
        fadeInUp: {
          '0%':   { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'premium-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
    },
  },
  plugins: [],
}