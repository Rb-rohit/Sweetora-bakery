/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Matches the original site's max-width breakpoints (1100 / 900 / 640)
    // so mobile-first Tailwind utilities line up at the same viewport widths.
    screens: {
      sm: '640px',
      md: '900px',
      lg: '1100px',
      xl: '1280px',
    },
    extend: {
      colors: {
        pink: '#E85D75',
        'pink-deep': '#D14A63',
        'pink-soft': '#F7B2B7',
        'pink-ghost': '#FDECEF',
        cream: '#FFF9F4',
        'cream-2': '#FBF1E8',
        ink: '#2B1B18',
        choc: '#5A3028',
        gold: '#D6A756',
        green: '#3A9D5D',
        line: '#F0E2D8',
        muted: '#8A6C62',
        'muted-2': '#B79A8E',
        'muted-3': '#5F463F',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm2: '10px',
        md2: '16px',
        lg2: '24px',
      },
      boxShadow: {
        sm2: '0 2px 10px rgba(90,48,40,.07)',
        md2: '0 10px 30px rgba(90,48,40,.10)',
        lg2: '0 24px 60px rgba(90,48,40,.16)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        pulseDot: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(58,157,93,.4)' },
          '50%': { boxShadow: '0 0 0 6px rgba(58,157,93,0)' },
        },
        heroIn: {
          from: { opacity: 0, transform: 'scale(.9) translateY(24px)' },
          to: { opacity: 1, transform: 'none' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0) rotate(-3deg)' },
          '50%': { transform: 'translateY(-16px) rotate(3deg)' },
        },
        heartPop: {
          '0%': { transform: 'scale(.4)' },
          '60%': { transform: 'scale(1.35)' },
          '100%': { transform: 'scale(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        toastIn: {
          from: { opacity: 0, transform: 'translateX(60px)' },
          to: { opacity: 1, transform: 'none' },
        },
        toastOut: {
          to: { opacity: 0, transform: 'translateX(60px)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn .25s ease',
        'pulse-dot': 'pulseDot 2s infinite',
        'hero-in': 'heroIn 1s cubic-bezier(.2,.8,.3,1) both .15s',
        floaty: 'floaty 5s ease-in-out infinite',
        'heart-pop': 'heartPop .45s cubic-bezier(.3,1.8,.5,1)',
        'spin-slow': 'spin 30s linear infinite',
        shimmer: 'shimmer 1.4s infinite',
        'toast-in': 'toastIn .4s cubic-bezier(.2,.8,.3,1.2)',
        'toast-out': 'toastOut .35s forwards',
      },
    },
  },
  plugins: [],
}
