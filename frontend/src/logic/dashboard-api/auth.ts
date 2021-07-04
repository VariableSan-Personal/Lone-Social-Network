import JSCookie from 'js-cookie'
import { ComponentInternalInstance } from 'vue'
import { clearUserInfo, token, user } from '../user'
import { fieldsJoiner } from './helpers'
import { DashAxiosService } from '~/helpers/abstracts/BaseAxios'
import { TLogin } from '~/helpers/types/Login.type'
import { TRefresh, TToken, TUser } from '~/helpers/types/User.type'

export class DashAuthService extends DashAxiosService {
  constructor(currentInstance: ComponentInternalInstance | null) {
    super(currentInstance)
  }

  async login(login: TLogin): Promise<boolean> {
    let isProblem = false

    try {
      const response = (await this.axios.post('/auth/login', login)) as TToken

      token.value = response
      this.setCookies(response)
      this.setUser()
    }
    catch (error) {
      isProblem = true
    }

    return isProblem
  }

  async refreshToken() {
    const refresh: TRefresh = {
      refresh_token: token.value?.refresh_token || '',
    }

    try {
      const response = (await this.axios.post(
        '/auth/refresh',
        refresh,
      )) as TToken
      this.setCookies(response)
    }
    catch (error) {
      console.error(error)
    }
  }

  async logout(offline: boolean) {
    try {
      if (!offline) {
        await this.axios.post('/auth/logout', {
          refresh_token: token.value?.refresh_token,
        })
      }

      JSCookie.remove('Authorization')
      localStorage.removeItem('User')
      localStorage.removeItem('Token')
      this.axios.defaults.headers.Authorization = null
      clearUserInfo()
    }
    catch (error) {
      console.error(error)
    }
  }

  private setCookies(response: TToken) {
    if (response.access_token) {
      const bearer = `Bearer ${response.access_token}`

      JSCookie.set('Authorization', bearer, {
        expires: response.expires,
        sameSite: 'Lax',
        secure: false,
      })

      localStorage.setItem('Token', JSON.stringify(response))

      this.axios.defaults.headers.Authorization = bearer
    }
  }

  private async setUser() {
    const params = ['*.*']

    const response = (await this.axios.get(
      `/users/me?${fieldsJoiner(params)}`,
    )) as TUser

    localStorage.setItem('User', JSON.stringify(response))

    user.value = response
  }

  private getUser(): TUser | null {
    const user = localStorage.getItem('User')

    if (!user) {
      clearUserInfo()
      return null
    }

    return JSON.parse(user) as TUser
  }

  autoLogin() {
    const cookieToken = JSCookie.get('Authorization')
    const localToken = localStorage.getItem('Token')
    if (cookieToken && localToken) {
      user.value = this.getUser()
      token.value = JSON.parse(localToken) as TToken
    }
  }
}
