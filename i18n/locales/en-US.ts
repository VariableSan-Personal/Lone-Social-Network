export default defineI18nLocale(() => {
	return {
		about: {
			fullname: 'Nursultan Nurgaliyev',
			now: 'Present',
			skills: 'Skills',
			education: 'Education',
			experience: 'Experience',
		},
		back: 'Back to the main page',
		email: 'E-mail',
		level: 'level',
		header: {
			'account-settings': 'Account settings',
			logout: 'Logout',
			'signed-in': 'Signed in as',
		},
		footer: {
			links: 'Links',
			'resume-design': 'Resume design',
			'home-page-design': 'Home page design',
			dashboard: 'Dashboard',
		},
		intro: { hi: 'Hi, {name}!' },
		login: {
			'forgot-password': 'Forgot password',
			login: 'Login',
			logout: 'Logout',
			register: 'Register',
			'sign-in': 'Sign in',
			'sign-up': 'Sign up',
		},
		'nav-links': { about: 'About me', home: 'Home' },
		errors: {
			'not-found': 'Not found',
			'not-exist': 'Page does not exist',
			'not-auth': 'Not authenticated',
			'bad-request': 'There was a problem with the connection',
			'something-went-wrong': 'Something went wrong',
			'return-home': 'Return to the home page',
		},
		password: 'Password',
		portfolio: {
			date: 'Release date',
			description: 'Description',
			projects: 'Portfolio projects',
			technologies: 'Technologies',
			title: 'Project title',
			visit: 'Visit the website',
		},
		validation: {
			'min-password-length': 'Min password length - {length}',
			'non-correct-email': 'Email is invalid',
			'required-value': 'Value is required',
			'non-correct-data': 'Invalid username or password',
		},
	}
})
