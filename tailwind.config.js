/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Cosmic Theme Colors
        cosmic: {
          amber: {
            DEFAULT: '#fbbf24',
            light: '#fcd34d',
            dark: '#f59e0b',
            glow: 'rgba(251, 191, 36, 0.5)',
          },
          violet: {
            DEFAULT: '#8b5cf6',
            light: '#a78bfa',
            dark: '#7c3aed',
            glow: 'rgba(139, 92, 246, 0.4)',
          },
          cyan: {
            DEFAULT: '#22d3ee',
            light: '#67e8f9',
            dark: '#06b6d4',
            glow: 'rgba(34, 211, 238, 0.4)',
          },
          rose: {
            DEFAULT: '#f472b6',
            glow: 'rgba(244, 114, 182, 0.4)',
          },
        },
        space: {
          bg: '#050510',
          lighter: '#0a0a1a',
          void: '#020208',
        },
      },
      boxShadow: {
        'glow-amber': '0 0 20px rgba(251, 191, 36, 0.3), 0 0 40px rgba(251, 191, 36, 0.2)',
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.3), 0 0 40px rgba(34, 211, 238, 0.2)',
        'glow-cosmic': '0 0 30px rgba(251, 191, 36, 0.25), 0 0 60px rgba(139, 92, 246, 0.15)',
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #fbbf24 0%, #8b5cf6 50%, #22d3ee 100%)',
        'aurora-gradient': 'linear-gradient(135deg, #22d3ee 0%, #8b5cf6 50%, #f472b6 100%)',
        'amber-violet-gradient': 'linear-gradient(135deg, #fbbf24 0%, #8b5cf6 100%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'cosmic-flow': 'cosmicFlow 5s linear infinite',
        'shimmer': 'shimmer 3s infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(251, 191, 36, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        cosmicFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
