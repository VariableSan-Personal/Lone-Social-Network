import { ComponentInternalInstance } from 'vue'
import { clearUserInfo, token } from '../user'
import { DashAxiosService } from '~/helpers/abstracts/BaseAxios'
import { TLogin } from '~/helpers/types/Login.type'
import { TRefresh, TToken } from '~/helpers/types/User.type'

export class DashAuthService extends DashAxiosService {
  constructor(currentInstance: ComponentInternalInstance | null) {
    super(currentInstance)
  }

  async login(login: TLogin) {
    try {
      const response = await this.axios.post('/auth/login', login) as TToken

      token.value = response
    }
    catch (error) {
      console.error(error)
    }
  }

  async refreshToken() {
    const refresh: TRefresh = {
      refresh_token: token.value?.refresh_token || '',
    }

    const refreshedToken = await this.axios.post('/auth/refresh', refresh) as TToken

    console.info(refreshedToken)
  }

  async logout() {
    try {
      await this.axios.post('/auth/logout', token.value?.refresh_token)
      clearUserInfo()
    }
    catch (error) {
      console.error(error)
    }
  }
}
