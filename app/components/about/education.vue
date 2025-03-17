<script setup lang="ts">
	import type { Education } from '~/shared'

	withDefaults(defineProps<{ education?: Education[] }>(), {
		education: () => [],
	})
</script>

<template>
	<section>
		<h2 class="headline">
			{{ $t('about.education') }}
		</h2>

		<div v-for="(edu, index) in education" :key="index">
			<h3 class="title">
				{{ edu.title }}
			</h3>
			<p>
				{{ `${edu.startDate} - ${edu.endDate}` }}
			</p>
		</div>
	</section>
</template>
