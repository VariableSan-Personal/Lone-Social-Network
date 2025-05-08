<script setup lang="ts">
	import type { TabsItem } from '@nuxt/ui'

	const { getLatestHomeEntry } = useHome()
	const { fetchAllProjects } = useProjects()
	const { t } = useI18n()

	const { data: projects } = await useFirebaseWithCache('projects', () => fetchAllProjects())
	const { data: home } = await useFirebaseWithCache('home', () => getLatestHomeEntry())

	const activeTab = ref('0')

	const filteredProjects = computed(() => [
		projects.value.filter((project) => project.type === 'commercial'),
		projects.value.filter((project) => project.type === 'personal'),
	])

	const items: TabsItem[] = computed(() => [
		{
			label: t('home.involvement'),
			icon: 'lucide:user',
		},
		{
			label: t('home.personal'),
			icon: 'lucide:lock',
		},
	])
</script>

<template>
	<div class="space-y-2 lg:space-y-8">
		<HomeHero />

		<UContainer>
			<div class="relative flex grid-cols-12 flex-col gap-8 lg:grid">
				<HomeProfileAside
					v-bind="{
						profileImage: home?.profileImage,
						email: home?.email,
						socialLinks: home?.socialLinks,
					}"
					class="col-span-2 lg:-translate-y-8"
				/>

				<section class="col-span-10 space-y-6">
					<UTabs
						v-model="activeTab"
						:content="false"
						:items="items"
						variant="link"
						class="w-full"
						:ui="{ trigger: 'flex-1' }"
					/>

					<HomeProjects :projects="filteredProjects[Number(activeTab)]" />
				</section>
			</div>
		</UContainer>
	</div>
</template>
