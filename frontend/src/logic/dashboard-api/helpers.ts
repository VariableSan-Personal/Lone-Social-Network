import { URL } from './axios'

export function fieldsJoiner(params: string[]): string {
  return params.map(field => `fields[]=${field}`).join('&')
}

export function getAsset(url: string): string {
  return `${URL.baseUrl}/assets/${url}`
}
