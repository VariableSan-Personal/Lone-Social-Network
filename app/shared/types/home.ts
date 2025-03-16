export type SocialLink = {
	href: string
	title: string
	icon: string
}

export type Home = {
	id: number
	email: string
	profileImage: string
	socialLinks: SocialLink[]
}
