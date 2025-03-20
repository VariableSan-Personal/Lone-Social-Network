<script setup lang="ts">
	import type { Education } from '~/shared'

	const { locale } = useI18n()
	const dateOption = { year: 'numeric' }

	withDefaults(defineProps<{ education?: Education[] }>(), {
		education: () => [],
	})
</script>

<template>
	<section>
		<h2 class="headline">
			{{ $t('about.education') }}
		</h2>

		<div class="block">
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
		</div>
	</section>
</template>
