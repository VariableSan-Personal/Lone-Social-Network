import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore'
import { COLLECTIONS_KEYS, type Project } from '~/shared'

export function useProjects() {
	const db = getFirestore()

	const error = ref<Error | null>(null)

	async function fetchAllProjects() {
		error.value = null

		try {
			const projectsCollection = collection(db, COLLECTIONS_KEYS.PROJECTS)
			const projectsSnapshot = await getDocs(projectsCollection)
			return projectsSnapshot.docs.map(
				(doc) =>
					({
						id: doc.id,
						...doc.data(),
					}) as Project
			)
		} catch (err) {
			error.value = err instanceof Error ? err : new Error(String(err))
			throw error.value
		}
	}

	async function addProject(projectData: Omit<Project, 'id'>) {
		error.value = null

		try {
			const docRef = await addDoc(collection(db, COLLECTIONS_KEYS.PROJECTS), projectData)
			console.log('Created a document with the ID: ', docRef.id)
		} catch (err) {
			error.value = err instanceof Error ? err : new Error(String(err))
			throw error.value
		}
	}

	return {
		error: readonly(error),
		fetchAllProjects,
		addProject,
	}
}
