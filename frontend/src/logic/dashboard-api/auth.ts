import { clearUserInfo, token } from '../user'
import { $dashboardAxios } from './axios'
import { fieldsJoiner } from './helpers'
import { TLogin } from '~/helpers/types/Login.type'
import { TRefresh, TToken } from '~/helpers/types/User.type'
import { THome } from '~/helpers/types/Home.type'

export const login = async(login: TLogin): Promise<void> => {
  try {
    const some = await $dashboardAxios.post('/auth/login', login) as TToken

    token.value = some
  }
  catch (error) {
    console.error(error)
  }
}

export const refreshToken = async(): Promise<void> => {
  const refreshedToken = await $dashboardAxios.post('/auth/refresh', {
    refresh_token: token.value?.refresh_token,
  } as TRefresh) as {data: TToken}

  console.info(refreshedToken)
}

export const logout = async(): Promise<void> => {
  try {
    await $dashboardAxios.post('/auth/logout', token.value?.refresh_token)
    clearUserInfo()
  }
  catch (error) {
    console.error(error)
  }
}

export const getHomeData = (): Promise<THome> => {
  const params = [
    '*',
    'avatar.id',
    'cover_image.id',
    'social_links.*',
    'admin_info.*.*',
  ]

  return $dashboardAxios.get(`/items/home?${fieldsJoiner(params)}`)
}
