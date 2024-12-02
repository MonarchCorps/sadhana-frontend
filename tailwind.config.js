/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				roboto: 'Roboto',
				cursive: 'cursive',
				crimson: 'Crimson Pro',
				arial: 'Arial',
				cuba: 'Playwrite CU'
			},
			fontWeight: {
				'100': '100',
				'200': '200',
				'300': '300',
				'400': '400',
				'500': '500',
				'600': '600',
				'700': '700',
				'800': '800',
				'900': '900'
			},
			animation: {
				slideInOut: 'slideIn 1s forwards, slideOut 1s 3.5s forwards',
				shrink: 'shrink 4.5s linear forwards',
				scaleIn: 'scaleIn 0.5s ease-out'
			},
			keyframes: {
				slideIn: {
					to: {
						right: '20px'
					}
				},
				slideOut: {
					to: {
						right: '-400px'
					}
				},
				shrink: {
					to: {
						transform: 'scaleX(0)'
					}
				},
				scaleIn: {
					'0%': {
						transform: 'scale(0)'
					},
					'100%': {
						transform: 'scale(1)'
					}
				}
			},
			boxShadow: {
				shadow: '0px 20px 50px 0px rgba(0, 0, 0, 0.05)'
			},
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			}
		},
		screens: {
			'xl': { 'max': '1279px' },
			'lg': { 'max': '1023px' },
			'ilg': { 'max': '1199px' },
			'clg': { 'min': '987px' },
			'hrmd': { 'max': '986px' },
			'imd': { 'max': '852px' },
			'hrmd2': { 'max': '825px' },
			'hmd': { 'max': '854px' },
			'md': { 'max': '767px' },
			'tmd': { 'max': '658px' },
			'fmd': { 'max': '605px' },
			'sm': { 'max': '639px' },
			'ism': { 'max': '585px' },
			'ixsm': { 'max': '473px' },
			'xsm': { 'max': '393px' }
		}
	},
	plugins: [require("tailwindcss-animate")],
}