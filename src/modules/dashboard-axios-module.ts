import axios from 'axios'
import { Router } from 'vue-router'
import { EErrorStatuses } from '~/helpers/enums/ErrorStatuses.enum'
import { loading } from '~/logic'
import { UserModule } from '~/types'

export const install: UserModule = ({ app, router }) => {
  const $dashAxios = axios.create({
    baseURL: import.meta.env.VITE_DASHBOARD as string,
  })

  $dashAxios.interceptors.request.use((onFulfilled) => {
    loading.value = true
    return onFulfilled
  })

  $dashAxios.interceptors.response.use(
    (onFulfilled) => {
      loading.value = false
      if (onFulfilled.status === 200) return onFulfilled.data.data
      return onFulfilled
    },

    (onRejected) => {
      loading.value = false
      redirect(onRejected.response.status, router)
      throw new Error(onRejected)
    },
  )

  app.config.globalProperties.$dashAxios = $dashAxios
}

function redirect(status: number, router: Router) {
  let error = ''

  switch (status) {
    case 400: {
      error = EErrorStatuses.BAD_REQUEST
      break
    }
  }

  if (error) router.push(`/error?status=${error}`)
}
