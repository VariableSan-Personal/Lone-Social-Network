import type { User } from './user'

export type Image = {
	id: string
}

export type SocialLink = {
	home_id: number
	href: string
	link_id: number
	sort: number
	title: string
	icon: string
}

export type Home = {
	id: number
	admin_info: User
	cover_image: Image
	x_axis: number
	y_axis: number
	social_links: SocialLink[]
}
