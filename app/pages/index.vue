<script setup lang="ts">
	const { fetchAllProjects } = useProjects()
	const { getLatestHomeEntry } = useHome()

	const { data: projects } = await useAsyncData('projects', () => fetchAllProjects())
	const { data: home } = await useAsyncData('home', () => getLatestHomeEntry())
</script>

<template>
	<div class="space-y-2 lg:space-y-12">
		<KeepAlive>
			<HomeHero v-bind="home" />
		</KeepAlive>

		<UContainer>
			<div class="relative flex grid-cols-12 flex-col gap-4 lg:grid">
				<KeepAlive>
					<HomeProfileAside v-bind="home" class="col-span-2" />
				</KeepAlive>
				<section class="col-span-10 space-y-4">
					<h2 class="text-2xl font-bold">
						{{ $t('portfolio.projects') }}
					</h2>
					<KeepAlive>
						<HomeProjects :projects="projects" />
					</KeepAlive>
				</section>
			</div>
		</UContainer>
	</div>
</template>
