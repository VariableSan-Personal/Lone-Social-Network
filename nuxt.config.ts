import { fileURLToPath, URL } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			link: [{ rel: 'icon', type: 'image/png', href: 'pwa-512x512.png' }],
			title: 'Lone Social',
		},
	},

	devtools: { enabled: false },

	alias: {
		'@': fileURLToPath(new URL('./', import.meta.url)),
	},

	modules: [
		'@nuxt/ui',
		'@nuxt/eslint',
		'@nuxt/icon',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@crazydos/nuxt-msw',
		'nuxt-vuefire',
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
		routeRules: {
			'*': { swr: 5 * 60 },
		},
	},

	compatibilityDate: '2024-11-27',

	i18n: {
		locales: [
			{ code: 'ru', file: 'ru.json' },
			{ code: 'en', file: 'en.json' },
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

	msw: {
		enable: process.env.MOCK_SERVICE_WORKER === 'true',
	},

	hooks: {
		close: (nuxt) => {
			if (!nuxt.options._prepare) {
				process.exit(0)
			}
		},
	},

	vuefire: {
		config: {
			apiKey: process.env.FIREBASE_APIKEY,
			authDomain: process.env.FIREBASE_AUTHDOMAIN,
			projectId: process.env.FIREBASE_PROJECTID,
			storageBucket: process.env.FIREBASE_STORAGEBUCKET,
			messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
			appId: process.env.FIREBASE_APPID,
		},
	},
})
