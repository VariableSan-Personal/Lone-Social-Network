export type SocialLink = {
	href: string
	title: string
	icon: string
}

export type Home = {
	id: number
	coverImage: string
	email: string
	xAxis: number
	yAxis: number
	profileImage: string
	socialLinks: SocialLink[]
}
