/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		extend: {},
	},
	plugins: [
		plugin(({ addComponents, theme, addUtilies }) => {
			addComponents({
				'.btn-castom': {
					backgroundColor: theme('colors.orange.500'),
					color: 'rgb(254 202 202)',
					padding: '3px 10px',
					fontSize: 18,
					display: 'inline-block',
					borderRadius: '20px',
					fontWeight: '600',
					transition: 'all 1s ease-out',
					'&:hover': {
						backgroundColor: theme('colors.orange.600'),
					},
				},
				'.flex-50': {
					flex: '0 1 46%',
				},
			})
		}),
	],
}
