import type { Config } from 'tailwindcss'

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#C48B54",
        "primary-dark": "#A66E38",
        "primary-light": "#D4A574",
        "background-light": "#F7F6F3",
        "background-subtle": "#EFECE5",
        "background-warm": "#F3F0EA",
        "background-dark": "#2D2A26",
        "card-dark": "#3A3632",
        "text-main": "#2D2A26",
        "text-secondary": "#5C6B7B",
        "text-muted": "#8A9AAD",
        "paper": "#F7F6F3",
        "coffee": "#2D2A26",
        "caramel": "#C48B54",
        "cambridge": "#5C6B7B",
        "border-light": "#E8E4DC",
        "border-subtle": "#DDD8CF",
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "Noto Sans SC", "sans-serif"],
        serif: ["Playfair Display", "Noto Serif SC", "serif"],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'drip': 'drip 1.8s ease-in-out infinite',
        'steam': 'steam 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        drip: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '30%': { opacity: '1' },
          '60%': { transform: 'translateY(16px)', opacity: '1' },
          '80%': { transform: 'translateY(20px)', opacity: '0.3' },
          '100%': { transform: 'translateY(24px)', opacity: '0' },
        },
        steam: {
          '0%, 100%': { transform: 'translateY(0) scaleX(1)', opacity: '0.3' },
          '50%': { transform: 'translateY(-8px) scaleX(1.2)', opacity: '0.6' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(45, 42, 38, 0.06)',
        'warm': '0 4px 20px -4px rgba(45, 42, 38, 0.08)',
        'warm-lg': '0 8px 30px -4px rgba(45, 42, 38, 0.1)',
        'warm-xl': '0 20px 50px -12px rgba(45, 42, 38, 0.15)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config
