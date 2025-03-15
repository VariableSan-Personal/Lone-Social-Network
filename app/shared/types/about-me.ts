export type Experience = {
	id: string
	sort: number
	about_me_id: string
	description: string
	company_name: string
	position_name: string
	start_date: string
	end_date: null | string
	translations: number[]
}

export type Education = {
	about_me_id: string
	degree: string
	end_date: string
	id: string
	sort: null
	start_date: string
	status: string
	title: string
	translations: number[]
}

export type Ability = {
	ams_id: string
	id: string
	sort: null
	title: string
}

export type SkillTranslation = {
	about_me_skills_id: string
	id: number
	languages_code: string
	level: null | string
	subtitle: null
	title: string
}

export type Skill = {
	about_me_id: string
	id: string
	level: null | string
	sort: number
	status: string
	subtitle: null
	title: string
	translations: SkillTranslation[]
	abilities: Ability[]
}

export type AboutMe = {
	id: string
	experience: Experience[]
	education: Education[]
	skills: Skill[]
}
