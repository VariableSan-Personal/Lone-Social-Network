import axios from 'axios'

export const URL = {
  baseUrl: 'http://localhost:8055',
}

export const $dashboardAxios = axios.create({
  baseURL: URL.baseUrl,
})

$dashboardAxios.interceptors.request.use((onFulfullied) => {
  console.info('onFulfullied.url', onFulfullied)

  return onFulfullied
})

$dashboardAxios.interceptors.response.use((onFulfullied) => {
  if (onFulfullied.config.baseURL === URL.baseUrl)
    return onFulfullied.data.data

  return onFulfullied
})
