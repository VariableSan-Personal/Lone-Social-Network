import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	setDoc,
	type DocumentData,
} from 'firebase/firestore'

export function useProjects() {
	const db = getFirestore()

	const error = ref<Error | null>(null)

	async function fetchAllProjects() {
		error.value = null

		try {
			const projectsCollection = collection(db, 'projects')
			const projectsSnapshot = await getDocs(projectsCollection)

			const projects: Record<string, unknown>[] = []
			projectsSnapshot.forEach((doc) => {
				projects.push({
					id: doc.id,
					...doc.data(),
				})
			})

			return projects
		} catch (err) {
			error.value = err instanceof Error ? err : new Error(String(err))
			throw error.value
		}
	}

	async function fetchProjectById(id: string) {
		error.value = null

		try {
			const docRef = doc(db, 'projects', id)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				return {
					id: docSnap.id,
					...docSnap.data(),
				}
			}

			return null
		} catch (err) {
			error.value = err instanceof Error ? err : new Error(String(err))
			throw error.value
		}
	}

	async function createProject(projectData: DocumentData) {
		error.value = null

		try {
			const projectId = projectData.id || 'project' + Date.now()
			await setDoc(doc(db, 'projects', projectId), projectData)
			return projectId
		} catch (err) {
			error.value = err instanceof Error ? err : new Error(String(err))
			throw error.value
		}
	}

	return {
		error: readonly(error),
		fetchAllProjects,
		fetchProjectById,
		createProject,
	}
}
