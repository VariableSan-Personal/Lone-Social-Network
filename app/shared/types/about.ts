import type { Translation } from './translation'

export type Experience = {
	companyName: string
	positionName: string
	startDate: string
	endDate: null | string
	translations: Translation
}

export type Education = {
	endDate: string
	startDate: string
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
