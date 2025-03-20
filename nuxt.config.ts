import { fileURLToPath, URL } from 'node:url'

const meta = {
	title: 'Lone Social',
	description:
		"Portfolio of a passionate software developer showcasing projects, skills, and creative solutions. Explore my work and let's build something great together.",
	thumbnail:
		'https://firebasestorage.googleapis.com/v0/b/girls-in-armor.appspot.com/o/lone-social%2FLinkedIn%20Banner.png?alt=media',
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			link: [{ rel: 'icon', type: 'image/png', href: 'pwa-512x512.png' }],
			title: meta.title,
			meta: [
				{ key: 'description', name: 'description', content: meta.description },
				{ key: 'og:title', property: 'og:title', content: meta.title },
				{ key: 'og:description', property: 'og:description', content: meta.description },
				{ key: 'og:image', property: 'og:image', content: meta.thumbnail },
				{ key: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
				{ key: 'twitter:title', name: 'twitter:title', content: meta.title },
				{ key: 'twitter:description', name: 'twitter:description', content: meta.description },
				{ key: 'twitter:image', name: 'twitter:image', content: meta.thumbnail },
			],
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
		'nuxt-easy-lightbox',
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
