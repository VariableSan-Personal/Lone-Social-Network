import type { Translation } from './translation'

export type Experience = {
	companyName: string
	positionName: string
	startDate: Date
	endDate: null | Date
	translations: Translation
}

export type Education = {
	endDate: Date
	startDate: Date
	title: string
	translations: Translation
}

export type Self = {
	translations: Translation
}

export type Skill = string

export type About = {
	id: string
	experience: Experience[]
	education: Education[]
	skills: Skill[]
	self: Self
}
