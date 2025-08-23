/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'heading': ['Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'matrix-green': '#00FF41',
        'matrix-bright-green': '#00FF00',
        'matrix-dark-green': '#003B00',
        'matrix-cyan': '#00FFFF',
        'matrix-bright-cyan': '#40E0D0',
        'matrix-teal': '#008080',
        'matrix-dark-cyan': '#004D4D',
        'matrix-blue': '#0077BE',
        'matrix-black': '#000000',
        'matrix-grey': '#1a1a1a',
        'matrix-light-grey': '#2a2a2a',
      },
      backgroundImage: {
        'matrix-gradient': 'linear-gradient(135deg, rgba(0, 255, 65, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%)',
        'matrix-gradient-dark': 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 255, 65, 0.05) 100%)',
        'matrix-text-gradient': 'linear-gradient(135deg, #00FF41, #00FFFF, #40E0D0)',
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'fadeInLeft': 'fadeInLeft 0.6s ease-out forwards',
        'fadeInRight': 'fadeInRight 0.6s ease-out forwards',
        'scaleIn': 'scaleIn 0.5s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slideInFromRight': 'slideInFromRight 0.8s ease-out forwards',
        'matrix-loading': 'matrix-loading 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInLeft: {
          'from': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeInRight: {
          'from': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        scaleIn: {
          'from': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          'to': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        glow: {
          '0%, 100%': {
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
          },
          '50%': {
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.5)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        slideInFromRight: {
          'from': {
            opacity: '0',
            transform: 'translateX(100px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'matrix-loading': {
          '0%': {
            opacity: '0.3',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0.3',
          },
        },
      },
      boxShadow: {
        'matrix-sm': '0 0 10px rgba(0, 255, 65, 0.3)',
        'matrix': '0 0 20px rgba(0, 255, 65, 0.4)',
        'matrix-lg': '0 0 30px rgba(0, 255, 255, 0.5)',
        'matrix-xl': '0 0 40px rgba(0, 255, 255, 0.6)',
      },
      backdropBlur: {
        'matrix': '10px',
      },
    },
  },
  plugins: [],
}