<script setup lang="ts">
	const { locale } = useI18n()
	const { getLatestAboutEntry } = useAbout()

	const { data: about } = await useAsyncData('about', () => getLatestAboutEntry())
</script>

<template>
	<UContainer class="container mt-8 space-y-12">
		<div class="flex items-center gap-4">
			<div class="initials p-3 text-sm leading-none font-bold text-white">
				<template v-if="locale === 'ru'">
					<h4>Н</h4>
					<h4>Н</h4>
				</template>
				<template v-else>
					<h4>N</h4>
					<h4>N</h4>
				</template>
			</div>

			<h1 class="text-2xl font-bold">
				{{ $t('about.fullname') }}
			</h1>
		</div>

		<div class="grid grid-cols-2 gap-8">
			<AboutExperience class="about-section" :experience="about?.experience" />
			<AboutSkill class="about-section" :skills="about?.skills" />
			<AboutEducation class="about-section" :education="about?.education" />
		</div>
	</UContainer>
</template>

<style>
	@reference "@/app/assets/css/main.css";

	.about-section .headline {
		@apply mb-4 border-t pt-4 text-lg font-bold tracking-widest uppercase;
	}
	.about-section .title {
		@apply text-2xl leading-snug font-bold;
	}
	.about-section small {
		@apply text-sm;
	}

	.initials {
		background-color: var(--ui-primary);
	}
</style>
