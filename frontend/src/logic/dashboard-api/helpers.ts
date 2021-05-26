import { AxiosInstance } from 'axios'
import { ComponentInternalInstance } from '.pnpm/vue@3.0.10/node_modules/vue'

export function fieldsJoiner(params: string[]): string {
  return params.map(field => `fields[]=${field}`).join('&')
}

export function getAsset(url: string, instance: ComponentInternalInstance | null): string {
  const $dashAxios = instance?.appContext.config.globalProperties.$dashAxios as AxiosInstance

  return `${$dashAxios.defaults.baseURL}/assets/${url}`
}
