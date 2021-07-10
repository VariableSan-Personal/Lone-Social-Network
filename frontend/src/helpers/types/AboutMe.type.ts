export type TExperience = {
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

export type TEducation = {
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

export type TAboutMe = {
  id: string
  experience: TExperience[]
  education: TEducation[]
}
