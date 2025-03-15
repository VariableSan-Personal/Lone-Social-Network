export type Translation = {
	id: number
	description: string
	languages_code: 'ru' | 'en'
}

export type PortfolioWork = {
	id: string
	status: string
	sort: null
	title: string
	link: string
	description: string
	poster: string
	date: string
	technologies: string
	translations: Translation[]
}
