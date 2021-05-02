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

export type TData = {
  admin_name: string
  avatar: TImage
  cover_image: TImage
  id: number
  x_axis: number
  y_axis: number
  social_links: TSocialLink[]
}

export type THome = {
  data: {
    data: TData
  }
}
