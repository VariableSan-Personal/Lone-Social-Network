import { fileURLToPath, URL } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			link: [{ rel: 'icon', type: 'image/png', href: 'pwa-512x512.png' }],
		},
	},

	devtools: { enabled: false },

	alias: {
		'@': fileURLToPath(new URL('./', import.meta.url)),
	},

	modules: [
		'@nuxt/ui',
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxt/scripts',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'@vueuse/nuxt',
	],

	runtimeConfig: {
		public: {
			baseUrl: process.env.BASE_URL,
		},
	},

	css: ['~/assets/css/main.css'],

	future: {
		compatibilityVersion: 4,
	},

	nitro: {
		esbuild: {
			options: {
				target: 'esnext',
			},
		},
		prerender: {
			routes: ['/', '/about'],
		},
	},

	compatibilityDate: '2024-11-27',

	i18n: {
		locales: [
			{ code: 'ru', file: 'ru-RU.ts' },
			{ code: 'en', file: 'en-US.ts' },
		],
		defaultLocale: 'en',
		strategy: 'no_prefix',
	},

	ui: {
		theme: {
			colors: ['primary', 'secondary', 'info', 'success', 'warning', 'error', 'neutral'],
		},
	},

	icon: {
		customCollections: [
			{
				prefix: 'custom',
				dir: './public',
			},
		],
	},
})
