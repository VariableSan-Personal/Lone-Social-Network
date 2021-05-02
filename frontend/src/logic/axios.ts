import axios from 'axios'
import { THome } from '~/helpers/types/Home.type'

export const URL = {
  baseUrl: 'http://localhost:8055',

  assets(url: string): string {
    return `${this.baseUrl}/assets/${url}`
  },
}

export const $axios = axios.create({
  baseURL: URL.baseUrl,
})

export const getHomeData = (): Promise<THome> => {
  const params = [
    '*',
    'avatar.id',
    'cover_image.id',
    'social_links.*',
  ]

  return $axios.get(`/items/home?${fieldsJoiner(params)}`)
}

function fieldsJoiner(params: string[]): string {
  return params.map(field => `fields[]=${field}`).join('&')
}
