export default defineI18nLocale(() => {
	return {
		about: {
			fullname: 'Нургалиев Нурсултан',
			education: 'Образование',
			experience: 'Опыт',
			now: 'Настоящее время',
			skills: 'Навыки и умения',
		},
		back: 'Вернуться на главную',
		email: 'Электронная почта',
		errors: {
			'bad-request': 'Возникла проблема с подключением',
			'not-auth': 'Не аутентифицирован',
			'not-exist': 'Страница не существует',
			'not-found': 'Не найдено',
		},
		footer: {
			dashboard: 'Админ-панель',
			'home-page-design': 'Дизайн домашней страницы',
			links: 'Ссылки',
			'resume-design': 'Дизайн резюме',
		},
		header: {
			'account-settings': 'Настройки аккаунта',
			logout: 'Выйти',
			'signed-in': 'Вы вошли как',
		},
		intro: {
			hi: 'Привет, {name}!',
		},
		level: 'уровень',
		login: {
			'forgot-password': 'Забыли пароль',
			login: 'Вход',
			logout: 'Выйти',
			register: 'Регистрация',
			'sign-in': 'Войти',
			'sign-up': 'Зарегистрироваться',
		},
		'nav-links': {
			about: 'Обо мне',
			home: 'Главная',
		},
		password: 'Пароль',
		portfolio: {
			date: 'Дата создания',
			description: 'Описание',
			projects: 'Портфолио проекты',
			technologies: 'Технологии',
			title: 'Название проекта',
			visit: 'Посетить сайт',
		},
		validation: {
			'min-password-length': 'Минимальная длина пароля - {length}',
			'non-correct-data': 'Неправильное имя пользователя или пароль',
			'non-correct-email': 'Электронная почта недействительна',
			'required-value': 'Требуется значение',
		},
	}
})
