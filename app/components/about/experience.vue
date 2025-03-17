<script setup lang="ts">
	import type { Experience } from '~/shared'

	const { locale, t } = useI18n()
	const dateOption = { month: 'short', year: 'numeric' }

	withDefaults(defineProps<{ experience?: Experience[] }>(), {
		experience: () => [],
	})

	const getDescription = (translations: Experience['translations']) => {
		const translation = translations.find((t) => t.languageCode === locale.value)
		return translation?.description || translations[0]?.description || ''
	}
</script>

<template>
	<section>
		<h2 class="headline">
			{{ t('about.experience') }}
		</h2>

		<div v-for="(exp, index) in experience" :key="index" class="space-y-2">
			<div>
				<h3 class="title">
					{{ exp.companyName }}
				</h3>
				<small>
					<ClientOnly>
						{{ `${$d(exp.startDate, dateOption)} - ${exp.endDate && $d(exp.endDate, dateOption)}` }}
					</ClientOnly>
				</small>
			</div>

			<ul>
				<li
					v-for="(el, i) in getDescription(exp.translations).split('---')"
					:key="i"
					class="list-disc"
				>
					{{ el }}
				</li>
			</ul>
		</div>
	</section>
</template>
