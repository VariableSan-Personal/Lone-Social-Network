<script setup lang="ts">
	const { getLatestHomeEntry } = useHome()
	const { fetchAllProjects } = useProjects()

	const { data: projects, status: projectsStatus } = await useFirebaseWithCache('projects', () =>
		fetchAllProjects()
	)

	const { data: home, status: homeStatus } = await useFirebaseWithCache('home', () =>
		getLatestHomeEntry()
	)
</script>

<template>
	<div class="space-y-2 lg:space-y-12">
		<HomeHero />

		<UContainer>
			<div class="relative flex grid-cols-12 flex-col gap-4 lg:grid">
				<HomeProfileAside
					v-bind="{
						profileImage: home?.profileImage,
						email: home?.email,
						socialLinks: home?.socialLinks,
						loading: homeStatus === 'pending',
					}"
					class="col-span-2"
				/>

				<section class="col-span-10 space-y-4">
					<h2 class="text-2xl font-bold">
						{{ $t('portfolio.projects') }}
					</h2>
					<HomeProjects :projects="projects" :loading="projectsStatus === 'pending'" />
				</section>
			</div>
		</UContainer>
	</div>
</template>
