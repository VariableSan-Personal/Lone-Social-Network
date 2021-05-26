import { AxiosInstance } from 'axios'
import { ComponentInternalInstance } from 'vue'
import { IDashAxios } from '../interfaces/DashAxios.interface'

export abstract class DashAxiosService implements IDashAxios {
  axios: AxiosInstance

  constructor(currentInstance: ComponentInternalInstance | null) {
    this.axios = currentInstance?.appContext.config.globalProperties.$dashAxios
  }
}
