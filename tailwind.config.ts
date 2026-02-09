import type { Config } from 'tailwindcss'

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./components/*.{js,ts,jsx,tsx}",
    "./services/*.{js,ts,jsx,tsx}",
    "./store/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#7f13ec",
        "primary-light": "#d1b3f9",
        "background-light": "#ffffff",
        "background-subtle": "#f7f6f8",
        "background-dark": "#191022",
        "card-dark": "#2a1e36",
        "text-main": "#141118",
        "text-secondary": "#756189",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config
