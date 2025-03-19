import { collection, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore'
import { COLLECTIONS_KEYS, firestoreConverter, type Home } from '~/shared'

export function useHome() {
	const db = getFirestore()

	const error = ref<Error | null>(null)

	async function getLatestHomeEntry() {
		error.value = null

		try {
			const homeCollection = collection(db, COLLECTIONS_KEYS.HOME).withConverter(
				firestoreConverter<Home>()
			)
			const q = query(homeCollection, orderBy('createdAt', 'desc'), limit(1))
			const querySnapshot = await getDocs(q)

			if (!querySnapshot.empty) {
				return querySnapshot.docs[0]!.data()
			}

			return null
		} catch (err) {
			error.value = err instanceof Error ? err : new Error(String(err))
			throw error.value
		}
	}

	return {
		getLatestHomeEntry,
	}
}
