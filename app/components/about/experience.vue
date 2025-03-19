<script setup lang="ts">
	import type { Experience } from '~/shared'

	const { locale, t } = useI18n()
	const dateOption = { month: 'short', year: 'numeric' }

	const props = withDefaults(defineProps<{ experience?: Experience[]; loading?: boolean }>(), {
		experience: () => [],
	})

	const sortedExperience = computed(() => {
		return [...props.experience].sort(
			(a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
		)
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
			<div v-if="loading">
				<USkeleton class="mb-2 h-6 w-1/2" />
				<USkeleton class="mb-2 h-4 w-1/3" />
				<USkeleton v-for="n in 3" :key="n" class="mb-2 h-4 w-full" />
			</div>

			<template v-else>
				<div v-for="(exp, index) in sortedExperience" :key="index" class="space-y-2">
					<div>
						<h3 class="title">
							{{ exp.companyName }}
						</h3>
						<small>
							<ClientOnly>
								{{
									`${$d(new Date(exp.startDate), dateOption)} - ${exp.endDate ? $d(new Date(exp.endDate), dateOption) : $t('experience.present')}`
								}}
								|
								{{
									getDuration(new Date(exp.startDate), exp.endDate ? new Date(exp.endDate) : null)
								}}
							</ClientOnly>
						</small>
					</div>
					<ul>
						<li v-for="(el, i) in exp.translations[locale].split('---')" :key="i">
							{{ el }}
						</li>
					</ul>
				</div>
			</template>
		</div>
	</section>
</template>
