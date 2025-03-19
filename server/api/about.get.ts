import { collection, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore'
import { type About, COLLECTIONS_KEYS, firestoreConverter } from '~/shared'

export default defineEventHandler(async () => {
	try {
		const db = getFirestore()

		const aboutCollection = collection(db, COLLECTIONS_KEYS.ABOUT).withConverter(
			firestoreConverter<About>()
		)
		const q = query(aboutCollection, orderBy('createdAt', 'desc'), limit(1))
		const querySnapshot = await getDocs(q)

		if (!querySnapshot.empty) {
			return querySnapshot.docs[0]!.data()
		}

		throw createError({
			statusCode: 404,
			statusMessage: 'No about data found',
			message: 'Unable to retrieve about data from the database',
			stack: undefined,
		})
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Server Error',
			message: 'An error occurred while retrieving about data',
			stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
		})
	}
})
