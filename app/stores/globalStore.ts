import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
	const isDark = useDark({
		selector: 'html',
		attribute: 'class',
		valueDark: 'dark',
		valueLight: 'light',
		initialValue: 'auto',
	})

	const toggleDark = useToggle(isDark)

	return {
		isDark,

		toggleDark,
	}
})
