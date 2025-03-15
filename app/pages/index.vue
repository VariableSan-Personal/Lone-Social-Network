<script setup lang="ts">
	const { $api } = useNuxtApp()
	const { fetchAllProjects, fetchProjectById, createProject } = useProjects()

	const { data: projects } = await useAsyncData('projects', () => fetchAllProjects())

	const handleCreateProject = async () => {
		await createProject({
			title: 'Мой проект',
			description: 'Описание проекта',
			createdAt: new Date().toISOString(),
			tags: ['nuxt', 'firebase'],
			author: {
				name: 'Нурсултан',
				email: 'user@example.com',
			},
		})
	}

	const handleFetchProjectById = async () => {
		const project = await fetchProjectById('project1')
		console.log(project)
	}

	const handleFetchAllProjects = async () => {
		const projects = await fetchAllProjects()
		console.log(projects)
	}

	const testMsw = async () => {
		const data = await $api('/api/user')
		console.info(data)
	}
</script>

<template>
	<div>
		<div>Projects: {{ projects }}</div>

		<div class="flex gap-4">
			<UButton @click="testMsw">Test MSW</UButton>
			<UButton @click="handleCreateProject">Create project</UButton>
			<UButton @click="handleFetchProjectById">Fetch project by id</UButton>
			<UButton @click="handleFetchAllProjects">Fetch all projects</UButton>
		</div>
	</div>
</template>
