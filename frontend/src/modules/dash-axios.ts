import axios from 'axios'
import { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  const URL = {
    baseUrl: 'http://localhost:8055',
  }

  const $dashAxios = axios.create({
    baseURL: URL.baseUrl,
  })

  $dashAxios.interceptors.request.use((onFulfilled) => {
    return onFulfilled
  })

  $dashAxios.interceptors.response.use((onFulfilled) => {
    if (onFulfilled.config.baseURL === URL.baseUrl)
      return onFulfilled.data.data

    return onFulfilled
  })

  app.config.globalProperties.$dashAxios = $dashAxios
}
