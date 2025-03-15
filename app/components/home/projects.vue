<script setup lang="ts">
	import type { Project } from '~/shared'

	defineProps<{ projects?: Project[] }>()

	const { locale } = useI18n()

	const getDescription = (translations: Project['translations']) => {
		const translation = translations.find((t) => t.languages_code === locale.value)
		return translation?.description || translations[0]?.description || ''
	}

	const getTechColor = (tech: string) => {
		const colorMap: Record<
			string,
			'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
		> = {
			Go: 'success',
			Typescript: 'info',
			'.Net': 'secondary',
			Java: 'warning',
			'Spring Boot': 'success',
			Angular: 'error',
			Docker: 'info',
			Kubernetes: 'primary',
			Javascript: 'warning',
			Webpack: 'info',
			Vue: 'success',
			React: 'info',
			Next: 'neutral',
			Nuxt: 'success',
			'Node.js': 'success',
		}

		return colorMap[tech as keyof typeof colorMap] || 'neutral'
	}
</script>

<template>
	<ul v-if="projects && projects.length" class="grid grid-cols-1 gap-6">
		<UCard
			v-for="project in projects"
			:key="project.id"
			as="li"
			variant="subtle"
			class="group overflow-hidden transition-all duration-300 hover:shadow-lg"
		>
			<template #header>
				<div class="relative aspect-video overflow-hidden">
					<img
						:src="project.poster"
						:alt="project.title"
						class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>

					<ClientOnly>
						<div class="absolute top-3 right-3">
							<UBadge color="neutral" variant="solid" class="bg-black/50 backdrop-blur-sm">
								{{ $d(new Date(project.date)) }}
							</UBadge>
						</div>
					</ClientOnly>
				</div>
			</template>

			<template #default>
				<h3 class="mb-2 text-xl font-semibold">{{ project.title }}</h3>
				<p class="mb-4 line-clamp-2 text-sm text-gray-500">
					{{ getDescription(project.translations) }}
				</p>

				<div class="mb-4 flex flex-wrap gap-2">
					<UBadge
						v-for="tech in project.technologies"
						:key="tech"
						:color="getTechColor(tech)"
						variant="soft"
						class="font-medium"
					>
						{{ tech }}
					</UBadge>
				</div>
			</template>

			<template #footer>
				<UButton
					:to="project.link"
					target="_blank"
					color="primary"
					variant="ghost"
					icon="i-heroicons-arrow-top-right-on-square"
					icon-right
				>
					{{ $t('project.view-project') }}
				</UButton>
			</template>
		</UCard>
	</ul>

	<UCard v-else class="py-12">
		<div class="text-center">
			<div class="mb-4 flex justify-center">
				<UIcon name="i-heroicons-folder-open" class="text-4xl text-gray-400" />
			</div>
			<h3 class="mb-2 text-lg font-medium">No projects found</h3>
			<p class="text-sm text-gray-500">Projects will appear here once they are added.</p>
		</div>
	</UCard>
</template>
