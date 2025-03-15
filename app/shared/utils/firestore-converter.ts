import type {
	DocumentData,
	FirestoreDataConverter,
	QueryDocumentSnapshot,
} from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'

function convertTimestamps<T>(obj: T): T {
	if (obj instanceof Timestamp) {
		return obj.toDate() as T
	} else if (Array.isArray(obj)) {
		return obj.map((item) => convertTimestamps(item)) as T
	} else if (obj !== null && typeof obj === 'object') {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [key, convertTimestamps(value)])
		) as T
	}
	return obj
}

export const firestoreConverter = <T>(): FirestoreDataConverter<T> => ({
	toFirestore(data: T): DocumentData {
		return data as DocumentData
	},
	fromFirestore(snapshot: QueryDocumentSnapshot): T {
		const data = snapshot.data()
		return convertTimestamps({ id: snapshot.id, ...data } as T)
	},
})
