import { http, HttpResponse } from 'msw'

export default defineNuxtMswServerOption(() => {
	// assume your server listening at http://localhost:3000
	const baseURL = 'http://localhost:3000'

	// composables that not related to NuxtApp can be used here, like: useRuntimeConfig

	const handlers = [
		// Intercept "GET http://localhost:3000/user" requests...
		http.get(baseURL + '/api/user', () => {
			// ...and respond to them using this JSON response.
			return HttpResponse.json({
				message: 'Hello msw server!',
			})
		}),
	]
	return {
		baseURL, // baseURL is required
		handlers,
		serverOptions: {
			onUnhandledRequest: 'bypass',
		},

		onRequest(mswServer, h3Event) {
			// This funtion will be call when Nitro server "request" hook
			console.log('Hello from onRequest')
			mswServer.use(/*...*/)
		},
	}
})
