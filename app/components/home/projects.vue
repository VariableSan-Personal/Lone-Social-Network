<script setup lang="ts">
	import type { Project } from '~/shared'

	const props = withDefaults(defineProps<Partial<{ projects: Project[]; loading: boolean }>>(), {
		projects: () => [],
	})
	const dateOption = { year: 'numeric' }

	const { locale } = useI18n()

	const sortedProjects = computed(() => {
		return [...props.projects].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		)
	})

	const getTechColor = (tech: string) => {
		const colorMap: Record<
			string,
			'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
		> = {
			Go: 'info',
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
	<ul v-if="props.loading" class="grid grid-cols-1 gap-6">
		<UCard
			v-for="n in 3"
			:key="n"
			as="li"
			variant="subtle"
			class="group overflow-hidden transition-all duration-300 hover:shadow-lg"
		>
			<template #header>
				<div class="relative aspect-video overflow-hidden">
					<USkeleton class="h-full w-full" />
				</div>
			</template>

			<template #default>
				<USkeleton class="mb-2 h-8 w-3/4" />
				<USkeleton class="mb-4 h-4 w-full" />
				<USkeleton class="h-4 w-1/2" />
			</template>

			<template #footer>
				<USkeleton class="h-10 w-24" />
			</template>
		</UCard>
	</ul>

	<ul v-else-if="sortedProjects.length" class="grid grid-cols-1 gap-6">
		<UCard
			v-for="project in sortedProjects"
			:key="project.id"
			as="li"
			variant="subtle"
			:ui="{
				header: 'p-0!',
			}"
			class="group overflow-hidden transition-all duration-300 hover:shadow-lg"
		>
			<template #header>
				<div class="relative aspect-video overflow-hidden">
					<img
						:src="project.poster"
						:alt="project.title"
						class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>

					<div class="absolute top-3 right-3">
						<UBadge color="neutral" variant="solid" class="bg-black/50 text-white backdrop-blur-sm">
							<ClientOnly>
								{{ $d(new Date(project.date), dateOption) }}
							</ClientOnly>
						</UBadge>
					</div>
				</div>
			</template>

			<template #default>
				<h3 class="mb-2 text-2xl font-semibold">{{ project.title }}</h3>

				<p class="mb-4 text-gray-500">
					{{ project.translations[locale] }}
				</p>

				<div class="flex flex-wrap gap-2">
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
					{{ $t('portfolio.view-project') }}
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
