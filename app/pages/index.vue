<script setup lang="ts">
	const { fetchAllProjects } = useProjects()

	const { data: projects } = await useAsyncData('projects', () => fetchAllProjects())
</script>

<template>
	<div class="space-y-4">
		<KeepAlive>
			<ul>
				<li v-for="item in projects" :key="item.id">
					{{ item }}
				</li>
			</ul>
		</KeepAlive>
	</div>
</template>
