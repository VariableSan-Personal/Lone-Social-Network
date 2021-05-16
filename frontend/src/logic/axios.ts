import axios from 'axios'
import { clearUserInfo, token } from './user'
import { THome } from '~/helpers/types/Home.type'
import { TLogin } from '~/helpers/types/Login.type'
import { TToken } from '~/helpers/types/User.type'

export const URL = {
  baseUrl: 'http://localhost:8055',

  assets(url: string): string {
    return `${this.baseUrl}/assets/${url}`
  },
}

export const $axios = axios.create({
  baseURL: URL.baseUrl,
})

export const getHomeData = (): Promise<{data: {data: THome}}> => {
  const params = [
    '*',
    'avatar.id',
    'cover_image.id',
    'social_links.*',
    'admin_info.*.*',
  ]

  return $axios.get(`/items/home?${fieldsJoiner(params)}`)
}

export const login = async(login: TLogin): Promise<void> => {
  try {
    const { data } = await $axios.post('/auth/login', login) as { data: TToken }

    token.value = data
  }
  catch (error) {
    console.error(error)
  }
}

export const logout = async(): Promise<void> => {
  try {
    await $axios.post('/auth/logout', token.value?.refresh_token)
    clearUserInfo()
  }
  catch (error) {
    console.error(error)
  }
}

function fieldsJoiner(params: string[]): string {
  return params.map(field => `fields[]=${field}`).join('&')
}
