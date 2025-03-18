<script setup lang="ts">
	import type { Experience } from '~/shared'

	const { locale, t } = useI18n()
	const dateOption = { month: 'short', year: 'numeric' }

	const props = withDefaults(defineProps<{ experience?: Experience[] }>(), {
		experience: () => [],
	})

	const sortedExperience = computed(() => {
		return [...props.experience].sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
	})

	const getDuration = (startDate: Date, endDate: Date | null) => {
		const end = endDate || new Date()
		const years = end.getFullYear() - startDate.getFullYear()
		const months = end.getMonth() - startDate.getMonth() + 1

		let adjustedYears = years
		let adjustedMonths = months

		if (months < 0) {
			adjustedYears = years - 1
			adjustedMonths = months + 12
		}

		let durationText = ''

		if (adjustedYears > 0) {
			durationText += t('experience.year', { years: adjustedYears })
		}

		if (adjustedMonths > 0) {
			if (durationText) durationText += ' '
			durationText += t('experience.month', { months: adjustedMonths })
		}

		return durationText || t('experience.lessThanMonth')
	}
</script>

<template>
	<section>
		<h2 class="headline">
			{{ $t('about.experience') }}
		</h2>

		<div class="block">
			<div v-for="(exp, index) in sortedExperience" :key="index" class="space-y-2">
				<div>
					<h3 class="title">
						{{ exp.companyName }}
					</h3>
					<small>
						<ClientOnly>
							{{
								`${$d(exp.startDate, dateOption)} - ${exp.endDate ? $d(exp.endDate, dateOption) : $t('experience.present')}`
							}}
							|
							{{ getDuration(exp.startDate, exp.endDate) }}
						</ClientOnly>
					</small>
				</div>
				<ul>
					<li v-for="(el, i) in exp.translations[locale].split('---')" :key="i">
						{{ el }}
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>
