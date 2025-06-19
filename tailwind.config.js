/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'seductive-red': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        'obsidian-black': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        'dark-crimson': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        }
      },
      fontFamily: {
        'seductive': ['Playfair Display', 'serif'],
        'obsession': ['Crimson Text', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite alternate',
        'flicker': 'flicker 0.15s infinite linear',
        'breath': 'breath 4s ease-in-out infinite',
        'blood-drip': 'blood-drip 8s ease-in-out infinite',
        'seductive-pulse': 'seductive-pulse 2s ease-in-out infinite',
        'obsidian-shimmer': 'obsidian-shimmer 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor',
            transform: 'scale(1)'
          },
          '100%': { 
            textShadow: '0 0 20px currentColor, 0 0 40px currentColor',
            transform: 'scale(1.01)'
          }
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'breath': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' }
        },
        'blood-drip': {
          '0%': { transform: 'translateY(-10px) scale(1)' },
          '50%': { transform: 'translateY(5px) scale(1.05)' },
          '100%': { transform: 'translateY(-10px) scale(1)' }
        },
        'seductive-pulse': {
          '0%': { 
            textShadow: '0 0 15px #dc2626, 0 0 30px #dc2626',
            opacity: '0.9'
          },
          '50%': { 
            textShadow: '0 0 25px #dc2626, 0 0 50px #dc2626',
            opacity: '1'
          },
          '100%': { 
            textShadow: '0 0 15px #dc2626, 0 0 30px #dc2626',
            opacity: '0.9'
          }
        },
        'obsidian-shimmer': {
          '0%': { 
            background: 'linear-gradient(45deg, #020617 0%, #0f172a 50%, #020617 100%)'
          },
          '50%': { 
            background: 'linear-gradient(45deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
          },
          '100%': { 
            background: 'linear-gradient(45deg, #020617 0%, #0f172a 50%, #020617 100%)'
          }
        }
      }
    },
  },
  plugins: [],
} 