import { AxiosInstance } from 'axios'
import { ComponentInternalInstance } from 'vue'
import { ELanguages } from '~/helpers/enums/Languages.enum'

export function fields(params: string[]): string {
  return `fields=${params.join(',')}`
}

export function nested(
  root: string,
  translations = true,
  ...enclosure: string[]
) {
  if (translations) enclosure.push('translations.*')

  return `${root}.${enclosure.join(`,${root}.`)}`
}

export function getAsset(
  url: string,
  instance: ComponentInternalInstance | null,
): string {
  const $dashAxios = instance?.appContext.config.globalProperties
    .$dashAxios as AxiosInstance

  return `${$dashAxios.defaults.baseURL}/assets/${url}`
}

export function getTranslate(locale: string, object: any, key: string): string {
  switch (locale) {
    case ELanguages.RU: {
      const translation = object.translations.find(
        (translate: { languages_code: ELanguages }) =>
          translate.languages_code === ELanguages.RU,
      )

      return translation[key]
    }
    default:
      return object[key]
  }
}

export function getMonthAndYear(
  date: string | null,
  locale: string,
  t: Function,
): string {
  if (date) {
    const dateLocale = new Date(date).toLocaleString(locale, {
      month: 'short',
      year: 'numeric',
    })
    return dateLocale.charAt(0).toUpperCase() + dateLocale.slice(1)
  }

  return t('about.now')
}
