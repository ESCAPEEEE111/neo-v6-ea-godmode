/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			// Matrix Theme Colors
  			'matrix-green': '#00FF41',
  			'matrix-bright-green': '#00FF00',
  			'matrix-dark-green': '#003B00',
  			'matrix-cyan': '#00FFFF',
  			'matrix-blue': '#0077BE',
  			'matrix-black': '#000000',
  			'matrix-dark-grey': '#0D0208',
  		},
  		fontFamily: {
  			'mono': ['JetBrains Mono', 'monospace'],
  		},
  		animation: {
  			'matrix-glow': 'matrix-glow 2s ease-in-out infinite',
  			'matrix-text-flow': 'matrix-text-flow 3s ease-in-out infinite',
  			'matrix-loading': 'matrix-loading 1.5s ease-in-out infinite',
  		},
  		keyframes: {
  			'matrix-glow': {
  				'0%, 100%': {
  					textShadow: '0 0 5px #00FF41'
  				},
  				'50%': {
  					textShadow: '0 0 20px #00FF41, 0 0 30px #00FF41'
  				}
  			},
  			'matrix-text-flow': {
  				'0%': {
  					transform: 'translateY(100%)',
  					opacity: '0'
  				},
  				'50%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translateY(-100%)',
  					opacity: '0'
  				}
  			},
  			'matrix-loading': {
  				'0%, 100%': {
  					opacity: '0.3'
  				},
  				'50%': {
  					opacity: '1'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		backgroundImage: {
  			'matrix-grid': 'linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)',
  		},
  		backgroundSize: {
  			'matrix-grid': '20px 20px',
  		},
  		boxShadow: {
  			'matrix': '0 0 20px rgba(0, 255, 65, 0.3)',
  			'matrix-lg': '0 0 30px rgba(0, 255, 65, 0.4)',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};