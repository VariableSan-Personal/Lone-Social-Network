export enum EEmailKeys {
  MESSAGES = 'messages',
  SOME = 'some',
}

export enum ETheme {
  DARK = 'dark',
  LIGHT = 'light'
}

export type TEmailPreference = {
  [key in EEmailKeys]: Boolean
}

export type TUserSettings = {
  theme: ETheme
  emailPreference: TEmailPreference
}

export type TUser = {
  login: string
  password: string
  firstName: string
  lastName: string
  email: string
  settings: TUserSettings
}
