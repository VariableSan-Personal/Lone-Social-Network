const { initializeFirebaseApp, backups, restore } = require('firestore-export-import')
const fs = require('fs')
const path = require('path')
const serviceAccount = require('./serviceAccountKey.json')
const minimist = require('minimist')

const options = {
	dates: ['about.startDate', 'about.endDate', 'about.createdAt', 'home.createdAt', 'projects.date'],
}

const appName = '[DEFAULT]'
const firestore = initializeFirebaseApp(serviceAccount, appName, options)

const args = minimist(process.argv.slice(2))
const backupDir = path.join(__dirname, 'backups')

if (args.mode === 'import') {
	importCollections()
} else if (args.mode === 'export' && args.filePath) {
	const fileLocation = path.join(__dirname, args.filePath)
	exportCollection(fileLocation)
}

function importCollections() {
	backups(firestore, [], options).then((collections) => {
		if (!fs.existsSync(backupDir)) {
			fs.mkdirSync(backupDir)
		}
		const timestamp = new Date().toISOString().split('T')[0]
		const backupPath = path.join(backupDir, `backup-${timestamp}.json`)
		fs.writeFileSync(backupPath, JSON.stringify(collections, null, 2))
		console.log(`Backup saved to: ${backupPath}`)
	})
}

function exportCollection(fileLocation) {
	restore(firestore, fileLocation, options).then((res) => {
		console.log(res)
	})
}
