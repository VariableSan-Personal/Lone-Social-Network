import { collection, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore'
import { COLLECTIONS_KEYS, firestoreConverter, type About } from '~/shared'

export function useAbout() {
	const db = getFirestore()

	const error = ref<Error | null>(null)

	async function getLatestAboutEntry() {
		error.value = null

		try {
			const aboutCollection = collection(db, COLLECTIONS_KEYS.ABOUT).withConverter(
				firestoreConverter<About>()
			)
			const q = query(aboutCollection, orderBy('createdAt', 'desc'), limit(1))
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
		error: readonly(error),
		getLatestAboutEntry,
	}
}
