export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig()

	const api = $fetch.create({
		baseURL: config.public.baseUrl,
		onRequest({ options }) {
			const token = useCookie('token')
			if (token?.value) {
				options.headers = options.headers || {}
				options.headers.set('Authorization', `Bearer ${token.value}`)
			}
		},
	})

	// Expose to useNuxtApp().$api
	return {
		provide: {
			api,
		},
	}
})
