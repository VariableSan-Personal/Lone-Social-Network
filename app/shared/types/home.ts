export type SocialLink = {
	href: string
	title: string
	icon: string
}

export type Home = {
	id: number
	coverImage: string
	x_axis: number
	y_axis: number
	socialLinks: SocialLink[]
}
