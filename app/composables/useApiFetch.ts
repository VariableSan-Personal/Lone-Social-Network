import type { FetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'

export function useAPIFetch<T>(url: string, options?: FetchOptions): Promise<T> {
	const config = useRuntimeConfig()

	const customFetch = ofetch.create({ baseURL: config.public.baseUrl })

	return customFetch(url, {
		onRequest({ options }) {
			const token = 'MTg3NTg4NDM3NzI4MTY1ODg5.MTc0MTk0MzYyMQ--.9b9b5b2e369f'
			options.headers.set('Authorization', token)
		},
		...options,
	}) as Promise<T>
}
