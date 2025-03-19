import { StorageSerializers } from '@vueuse/core'

export const useFirebaseWithCache = async <T>(key: string, callback: () => Promise<T>) => {
	const cached = useSessionStorage<T>(key, null, {
		serializer: StorageSerializers.object,
	})
	const error = ref<Error | null>(null)

	if (!cached.value) {
		try {
			const res = await callback()
			cached.value = res
		} catch (e) {
			error.value = e instanceof Error ? e : new Error(String(e))
		}
	}

	return {
		data: cached,
		error,
	}
}
