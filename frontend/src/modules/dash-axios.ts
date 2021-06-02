import axios from 'axios'
import { EErrorStatuses } from '~/helpers/enums/ErrorStatuses.enum'
import { UserModule } from '~/types'

export const install: UserModule = ({ app, router }) => {
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
    switch (onFulfilled.status) {
      case 404:
        router.push(`/error?status=${EErrorStatuses.NOT_FOUND}`)
        break
      default:
        break
    }

    if (onFulfilled.config.baseURL === URL.baseUrl)
      return onFulfilled.data.data

    return onFulfilled
  })

  app.config.globalProperties.$dashAxios = $dashAxios
}
