import { StorageSerializers } from '@vueuse/core'

/**
 * @example
 * ```typescript
 * const users = await useFetchWithCache<User[]>('/api/users');
 * ```
 */
export const useFetchWithCache = async <T>(url: string) => {
	const cached = useSessionStorage<T>(url, null, {
		serializer: StorageSerializers.object,
	})

	if (!cached.value) {
		const { data, error } = await useFetch<T>(url)

		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Could not fetch data from ${url}`,
			})
		}

		cached.value = data.value as T
	} else {
		console.log(`Getting value from cache for ${url}`)
	}

	return cached
}
