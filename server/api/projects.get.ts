import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { COLLECTIONS_KEYS, firestoreConverter, type Project } from '~/shared'

export default defineEventHandler(async () => {
	try {
		const db = getFirestore()

		const projectsCollection = collection(db, COLLECTIONS_KEYS.PROJECTS).withConverter(
			firestoreConverter<Project>()
		)
		const projectsSnapshot = await getDocs(projectsCollection)

		return projectsSnapshot.docs.map((doc) => doc.data())
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to fetch projects',
			data: { message: error instanceof Error ? error.message : 'Unknown error' },
			stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
		})
	}
})
