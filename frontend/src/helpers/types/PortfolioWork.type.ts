import { ELanguages } from '../enums/Languages.enum'

export type Translation = {
  id: number
  description: string
  languages_code: ELanguages
}

export type TPortfolioWork = {
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
