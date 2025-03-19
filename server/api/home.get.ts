import { collection, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore'
import { COLLECTIONS_KEYS, firestoreConverter, type Home } from '~/shared'

export default defineEventHandler(async () => {
	try {
		const db = getFirestore()
		const homeCollection = collection(db, COLLECTIONS_KEYS.HOME).withConverter(
			firestoreConverter<Home>()
		)
		const q = query(homeCollection, orderBy('createdAt', 'desc'), limit(1))
		const querySnapshot = await getDocs(q)

		if (!querySnapshot.empty) {
			return querySnapshot.docs[0]!.data()
		}

		throw createError({
			statusCode: 404,
			statusMessage: 'No home data found',
			message: 'Unable to retrieve home data from the database',
			stack: undefined,
		})
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Server Error',
			message: 'An error occurred while retrieving home data',
			stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
		})
	}
})
