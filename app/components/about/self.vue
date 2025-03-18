<script setup lang="ts">
	import type { Self } from '~/shared'

	const { locale } = useI18n()

	const props = withDefaults(defineProps<{ self?: Self }>(), {
		self: () => ({
			translations: {
				en: '',
				ru: '',
			},
		}),
	})

	const formattedText = computed(() => {
		return props.self.translations[locale.value]?.replace(/\\n/g, '<br>')
	})
</script>

<template>
	<section>
		<h2 class="headline">
			{{ $t('about.self') }}
		</h2>

		<div v-html="formattedText"></div>
	</section>
</template>
