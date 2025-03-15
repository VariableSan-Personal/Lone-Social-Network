<script setup lang="ts">
	const { fetchAllProjects } = useProjects()

	const { data: projects } = await useAsyncData('projects', () => fetchAllProjects())
</script>

<template>
	<UContainer>
		<section class="space-y-4">
			<h2 class="text-2xl font-bold">Projects</h2>
			<KeepAlive>
				<HomeProjects :projects="projects" />
			</KeepAlive>
		</section>
	</UContainer>
</template>
