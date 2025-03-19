<script lang="ts" setup>
	import * as locales from '@nuxt/ui/locale'
	const { locale } = useI18n()

	const meta = {
		title: 'Lone Social',
		description:
			"Portfolio of a passionate software developer showcasing projects, skills, and creative solutions. Explore my work and let's build something great together.",
		thumbnail:
			'https://firebasestorage.googleapis.com/v0/b/girls-in-armor.appspot.com/o/lone-social%2FLinkedIn%20Banner.png?alt=media',
	}

	const lang = computed(() => locales[locale.value].code)
	const dir = computed(() => locales[locale.value].dir)

	useHead({
		htmlAttrs: {
			lang,
			dir,
		},
	})

	useSeoMeta({
		ogTitle: () => meta.title,
		title: () => meta.title,
		description: () => meta.description,
		ogDescription: () => meta.description,
		ogImage: () => meta.thumbnail,
		ogImageUrl: () => meta.thumbnail,
		twitterCard: () => 'summary_large_image',
		twitterTitle: () => meta.title,
		twitterDescription: () => meta.description,
		twitterImage: () => meta.thumbnail,
	})
</script>

<template>
	<UApp :locale="locales[locale]">
		<NuxtLayout>
			<NuxtLoadingIndicator />
			<NuxtPage />
		</NuxtLayout>
	</UApp>
</template>
