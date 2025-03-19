import { StorageSerializers } from '@vueuse/core'

export const useFirebaseWithCache = async <T>(key: string, callback: () => Promise<T>) => {
	const cached = useSessionStorage<T>(key, null, {
		serializer: StorageSerializers.object,
	})
	const error = ref<Error | null>(null)
	const status = ref<'idle' | 'pending' | 'success' | 'error'>('idle')

	if (!cached.value) {
		status.value = 'pending'
		try {
			const res = await callback()
			cached.value = res
			status.value = 'success'
		} catch (e) {
			error.value = e instanceof Error ? e : new Error(String(e))
			status.value = 'error'
		}
	} else {
		status.value = 'success'
	}

	return {
		data: cached,
		status,
		error,
	}
}
