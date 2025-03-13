import { AxiosInstance } from 'axios'
import { ComponentInternalInstance } from 'vue'

interface IBaseAxios {
  axios: AxiosInstance
}

abstract class BaseAxiosService implements IBaseAxios {
  axios: AxiosInstance

  constructor(
    currentInstance: ComponentInternalInstance | null,
    instanceName: string,
  ) {
    this.axios
      = currentInstance?.appContext.config.globalProperties[instanceName]
  }
}

export abstract class DashAxiosService extends BaseAxiosService {
  constructor(currentInstance: ComponentInternalInstance | null) {
    super(currentInstance, '$dashAxios')
  }
}
