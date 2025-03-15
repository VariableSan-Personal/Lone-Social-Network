<script setup lang="ts">
	const { fetchAllProjects } = useProjects()

	const { data: projects } = await useAsyncData('projects', () => fetchAllProjects())
</script>

<template>
	<UContainer>
		<div class="relative grid-cols-12 gap-4 lg:grid">
			<HomeProfileAside class="col-span-2" />

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
</template>
