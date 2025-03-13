import { fileURLToPath, URL } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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

	css: ['~/assets/css/main.css'],
	postcss: {
		plugins: {
			'postcss-nested': {},
			'postcss-custom-media': {},
		},
	},

	future: {
		compatibilityVersion: 4,
	},

	compatibilityDate: '2024-11-27',

	i18n: {
		locales: [
			{ code: 'en', files: ['en-US.yml'] },
			{ code: 'ru', files: ['ru-RU.yml'] },
		],
		langDir: './locales',
		defaultLocale: 'en',
		strategy: 'no_prefix',
	},
})
