import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
	const colorMode = useColorMode()

	const isDark = computed({
		get() {
			return colorMode.value === 'dark'
		},
		set() {
			colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
		},
	})

	const drawer = ref(false)
	const loading = ref(false)

	const toggleDark = () => {
		isDark.value = !isDark.value
	}

	return {
		isDark,
		drawer,
		loading,

		toggleDark,
	}
})
