export default defineAppConfig({
	// https://ui3.nuxt.dev/getting-started/theme#design-system
	ui: {
		colors: {
			primary: 'emerald',
			neutral: 'slate',
		},

		button: {
			defaultVariants: {
				// Set default button color to neutral
				// color: 'neutral'
			},
		},

		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
			},
		},
	},
})
