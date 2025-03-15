export type Translation = {
	description: string
	languages_code: 'ru' | 'en'
}

export type Project = {
	id: string
	title: string
	link: string
	poster: string
	date: Date
	technologies: Technologies[]
	translations: Translation[]
}

export type Technologies =
	| 'Go'
	| 'Typescript'
	| '.Net'
	| 'Java'
	| 'Spring Boot'
	| 'Angular'
	| 'Docker'
	| 'Kubernetes'
	| 'Javascript'
	| 'Webpack'
	| 'Vue'
	| 'React'
	| 'Next'
	| 'Nuxt'
	| 'Node.js'
