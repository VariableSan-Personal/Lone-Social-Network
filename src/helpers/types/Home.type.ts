import { TUser } from './User.type'

export type TImage = {
  id: string
}

export type TSocialLink = {
  home_id: number
  href: string
  link_id: number
  sort: number
  title: string
  icon: string
}

export type THome = {
  id: number
  admin_info: TUser
  cover_image: TImage
  x_axis: number
  y_axis: number
  social_links: TSocialLink[]
}
