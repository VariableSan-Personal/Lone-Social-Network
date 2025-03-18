const { initializeFirebaseApp, backups } = require('firestore-export-import')
const fs = require('fs')
const path = require('path')
const serviceAccount = require('./serviceAccountKey.json')

// If you want to pass settings for firestore, you can add to the options parameters
const options = {
	autoParseDates: true,
}

// Initiate Firebase App
// appName is optional, you can omit it.
const appName = '[DEFAULT]'
const firestore = initializeFirebaseApp(serviceAccount, appName, options)

// the appName & options are OPTIONAL
// you can initialize the app without them
// const firestore = initializeFirebaseApp(serviceAccount)

backups(firestore) // Array of collection's name is OPTIONAL
	.then((collections) => {
		// You can do whatever you want with collections
		// Create backups directory if it doesn't exist
		const backupDir = path.join(__dirname, 'backups')
		if (!fs.existsSync(backupDir)) {
			fs.mkdirSync(backupDir)
		}

		// Create a timestamp for the filename
		const timestamp = new Date().toISOString().split('T')[0]
		const backupPath = path.join(backupDir, `backup-${timestamp}.json`)

		// Write the collections to the file
		fs.writeFileSync(backupPath, JSON.stringify(collections, null, 2))
		console.log(`Backup saved to: ${backupPath}`)
	})
