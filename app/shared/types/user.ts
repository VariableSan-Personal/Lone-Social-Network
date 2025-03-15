export type Refresh = {
	refresh_token: string
}

export type Token = {
	access_token: string
	expires: number
	refresh_token: string
}

export type Metadata = Record<string, string>

export type Avatar = {
	charset: null
	description: null
	duration: null
	embed: null
	filename_disk: string
	filename_download: string
	filesize: number
	folder: null
	height: number
	id: string
	location: null
	metadata: Metadata
	modified_by: null
	modified_on: string
	storage: string
	tags: null
	title: string
	type: string
	uploaded_by: string
	uploaded_on: string
	width: number
}

export type Role = {
	admin_access: boolean
	app_access: boolean
	collection_list: null
	description: string
	enforce_tfa: boolean
	icon: string
	id: string
	ip_access: null
	module_list: null
	name: string
	users: string[]
}

export type User = {
	description: null
	email: string
	first_name: string
	id: string
	language: string
	last_access: string
	last_name: string
	last_page: string
	location: string
	password: string
	status: string
	tags: null
	tfa_secret: null
	theme: string
	title: string
	token: null
	avatar: Avatar
	role: Role
}
