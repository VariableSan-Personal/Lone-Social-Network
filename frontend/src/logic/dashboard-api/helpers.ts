import { AxiosInstance } from 'axios'
import { ComponentInternalInstance } from 'vue'
import { ELanguages } from '~/helpers/enums/Languages.enum'

export function fieldsJoiner(params: string[]): string {
  return params.map(field => `fields[]=${field}`).join('&')
}

export function getAsset(url: string, instance: ComponentInternalInstance | null): string {
  const $dashAxios = instance?.appContext.config.globalProperties.$dashAxios as AxiosInstance

  return `${$dashAxios.defaults.baseURL}/assets/${url}`
}

export function getTranslate(locale: string, object: any, key: string) {
  switch (locale) {
    case ELanguages.RU:
      return object.translations
        .find(
          (translate: { languages_code: ELanguages }) => translate.languages_code === ELanguages.RU,
        )
        ?.description
    default:
      return object[key]
  }
}
