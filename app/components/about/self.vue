<script setup lang="ts">
	import type { Self } from '~/shared'

	const { locale } = useI18n()

	const props = withDefaults(defineProps<{ self?: Self; loading?: boolean }>(), {
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
	<!-- eslint-disable vue/no-v-html -->
	<section>
		<h2 class="headline">
			{{ $t('about.self') }}
		</h2>

		<div v-if="loading">
			<USkeleton v-for="n in 3" :key="n" class="mb-2 h-4 w-full" />
		</div>

		<div v-else v-html="formattedText"></div>
	</section>
</template>
