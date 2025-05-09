<script setup lang="ts">
	import type { Project } from '~/shared'

	const props = withDefaults(defineProps<Partial<{ projects: Project[] }>>(), {
		projects: () => [],
	})
	const dateOption = { year: 'numeric' }

	const { locale } = useI18n()

	const visibleRef = ref(false)
	const imgs = ref<string[]>([])

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
			'Nest.js': 'error',
			Docker: 'info',
			Kubernetes: 'primary',
			Javascript: 'warning',
			Webpack: 'info',
			Vue: 'success',
			React: 'info',
			Next: 'neutral',
			Nuxt: 'success',
			'Node.js': 'success',
			'Express.js': 'success',
		}

		return colorMap[tech as keyof typeof colorMap] || 'neutral'
	}

	const showImg = (poster: string) => {
		imgs.value = [poster]
		visibleRef.value = true
	}
	const onHide = () => {
		visibleRef.value = false
	}
</script>

<template>
	<div>
		<ul class="grid grid-cols-1 gap-8">
			<UCard
				v-for="project in sortedProjects"
				:key="project.id"
				as="li"
				variant="subtle"
				:ui="{
					header: 'p-0!',
				}"
				class="overflow-hidden transition-all duration-300 hover:shadow-lg"
			>
				<template #header>
					<div class="relative aspect-video overflow-hidden">
						<img
							:src="project.poster || 'img/not found.jpg'"
							:alt="project.title"
							class="h-full w-full cursor-pointer object-contain transition-transform duration-500"
							@click="showImg(project.poster || 'img/not found.jpg')"
						/>

						<div class="absolute top-3 right-3">
							<UBadge
								color="neutral"
								variant="solid"
								class="bg-black/50 text-white backdrop-blur-sm"
							>
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
					<div class="flex flex-wrap gap-2">
						<UButton
							v-if="project.link"
							:to="project.link"
							target="_blank"
							color="primary"
							variant="ghost"
							icon="lucide:square-arrow-out-up-right"
						>
							{{ $t('portfolio.view-project') }}
						</UButton>

						<UButton
							v-if="project.githubLink"
							:to="project.githubLink"
							target="_blank"
							color="primary"
							variant="ghost"
							icon="lucide:github"
						>
							{{ $t('portfolio.github') }}
						</UButton>
					</div>
				</template>
			</UCard>

			<UCard v-if="!projects.length" class="py-12">
				<div class="text-center">
					<div class="mb-4 flex justify-center">
						<UIcon name="lucide:folder-open" class="text-4xl text-gray-400" />
					</div>
					<h3 class="mb-2 text-lg font-medium">No projects found</h3>
					<p class="text-sm text-gray-500">Projects will appear here once they are added.</p>
				</div>
			</UCard>
		</ul>

		<VueEasyLightbox :visible="visibleRef" :imgs="imgs" :index="0" @hide="onHide" />
	</div>
</template>
