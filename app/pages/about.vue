<script setup lang="ts">
	const { locale } = useI18n()
	const { getLatestAboutEntry } = useAbout()

	const { data: about, status: aboutStatus } = await useFirebaseWithCache('about', () =>
		getLatestAboutEntry()
	)

	const loading = computed(() => aboutStatus.value === 'pending')
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

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<div class="flex flex-col gap-8">
				<AboutExperience class="about-section" :experience="about?.experience" :loading="loading" />
				<AboutEducation class="about-section" :education="about?.education" :loading="loading" />
			</div>
			<div class="flex flex-col gap-8">
				<AboutSkill class="about-section" :skills="about?.skills" :loading="loading" />
				<AboutSelf class="about-section" :self="about?.self" :loading="loading" />
			</div>
		</div>
	</UContainer>
</template>

<style>
	@reference "@/app/assets/css/main.css";

	.about-section .headline {
		@apply mb-4 border-t pt-4 text-xl font-bold tracking-widest uppercase;
	}
	.about-section .title {
		@apply text-lg leading-snug font-bold;
	}
	.about-section small {
		@apply text-sm;
	}
	.about-section li {
		@apply ml-4 list-disc;
	}
	.about-section .block {
		@apply space-y-4;
	}

	.initials {
		background-color: var(--ui-primary);
	}
</style>
