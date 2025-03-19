import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { COLLECTIONS_KEYS, firestoreConverter, type Project } from '~/shared'

export function useProjects() {
	const db = getFirestore()

	const error = ref<Error | null>(null)

	async function fetchAllProjects() {
		error.value = null

		try {
			const projectsCollection = collection(db, COLLECTIONS_KEYS.PROJECTS).withConverter(
				firestoreConverter<Project>()
			)
			const projectsSnapshot = await getDocs(projectsCollection)
			return projectsSnapshot.docs.map((doc) => doc.data())
		} catch (err) {
			error.value = err instanceof Error ? err : new Error(String(err))
			throw error.value
		}
	}

	return {
		error: readonly(error),
		fetchAllProjects,
	}
}
