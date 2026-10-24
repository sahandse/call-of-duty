import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cod-bg': '#0a0b09',
        'cod-panel': '#0f110e',
        'cod-card': '#141612',
        'cod-card2': '#1b1e19',
        'cod-border': '#2c3027',
        'cod-border-light': '#3d4236',
        'cod-gold': '#c9a44c',
        'cod-gold-light': '#e9cf85',
        'cod-sand': '#b9a77a',
        'cod-olive': '#77855a',
        'cod-green': '#86a15f',
        'cod-red': '#c4472f',
        'cod-steel': '#8d9289',
        gray: {
          50: '#f4f4ee',
          100: '#e6e6dd',
          200: '#cfd0c4',
          300: '#b0b2a6',
          400: '#8d9289',
          500: '#6c7266',
          600: '#555b4e',
          700: '#40463a',
          800: '#2a2f25',
          900: '#1b1e18',
          950: '#101210',
        },
        blue: {
          300: '#9db4b8',
          400: '#7f9a9f',
          500: '#5f7d83',
          600: '#4a646a',
          700: '#38504f',
          900: '#1b2a29',
        },
        purple: {
          300: '#b9aab5',
          400: '#9c8a96',
          500: '#7d6a76',
          700: '#4f4149',
          900: '#2a2228',
        },
        amber: {
          300: '#d9c08a',
          400: '#c9a44c',
          700: '#6d5626',
          900: '#2d2411',
        },
        yellow: {
          400: '#e9cf85',
          500: '#c9a44c',
          700: '#6d5626',
          900: '#2d2411',
        },
        green: {
          300: '#b5c79c',
          400: '#86a15f',
          500: '#6f8a4e',
          700: '#3d4b2c',
          900: '#1d2416',
        },
        red: {
          400: '#d9705c',
          500: '#c4472f',
          600: '#a53722',
          700: '#6d2c1e',
          900: '#2b1712',
        },
        orange: {
          400: '#c9975f',
          500: '#b07c44',
        },
      },
      borderRadius: {
        none: '0px',
        sm: '1px',
        DEFAULT: '2px',
        md: '2px',
        lg: '2px',
        xl: '3px',
        '2xl': '3px',
        '3xl': '4px',
        full: '2px',
      },
      fontFamily: {
        sans: ['Vazirmatn', 'Tahoma', 'Arial', 'sans-serif'],
        display: ['Oswald', 'Vazirmatn', 'Tahoma', 'sans-serif'],
        mono: ['Consolas', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        hud: '0.22em',
      },
      boxShadow: {
        hud: '0 18px 40px -24px rgba(0, 0, 0, 0.95)',
        'gold-glow': '0 0 26px -8px rgba(201, 164, 76, 0.5)',
      },
      backgroundImage: {
        'hud-grid':
          'linear-gradient(rgba(201,164,76,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,164,76,0.05) 1px, transparent 1px)',
        'hud-sheen': 'linear-gradient(180deg, rgba(27,30,25,0.85), rgba(12,14,11,0.95))',
      },
      animation: {
        'fade-in': 'fadeIn 0.28s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'sweep': 'sweep 5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        sweep: {
          '0%': { transform: 'translateX(120%)' },
          '100%': { transform: 'translateX(-120%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
