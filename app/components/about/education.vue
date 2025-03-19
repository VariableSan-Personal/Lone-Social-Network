<script setup lang="ts">
	import type { Education } from '~/shared'

	const { locale } = useI18n()
	const dateOption = { year: 'numeric' }

	withDefaults(defineProps<{ education?: Education[]; loading?: boolean }>(), {
		education: () => [],
	})
</script>

<template>
	<section>
		<h2 class="headline">
			{{ $t('about.education') }}
		</h2>

		<div class="block">
			<div v-if="loading">
				<USkeleton class="mb-2 h-6 w-1/2" />
				<USkeleton class="mb-2 h-4 w-1/3" />
				<USkeleton v-for="n in 3" :key="n" class="mb-2 h-4 w-full" />
			</div>

			<template v-else>
				<div v-for="(edu, index) in education" :key="index">
					<h3 class="title">
						{{ edu.title }}
					</h3>
					<small>
						<ClientOnly>
							{{
								`${$d(new Date(edu.startDate), dateOption)} - ${$d(new Date(edu.endDate), dateOption)}`
							}}
						</ClientOnly>
					</small>
					<p>
						{{ edu.translations[locale] }}
					</p>
				</div>
			</template>
		</div>
	</section>
</template>
