<script setup lang="ts">
	import type { Skill } from '~/shared'

	withDefaults(defineProps<{ skills?: Skill[] }>(), {
		skills: () => [],
	})
</script>

<template>
	<section>
		<h2 class="headline">
			{{ $t('about.skills') }}
		</h2>

		<div class="flex flex-wrap gap-2">
			<UBadge
				v-for="(skill, index) in skills"
				:key="index"
				color="primary"
				variant="soft"
				size="lg"
			>
				{{ skill }}
			</UBadge>
		</div>
	</section>
</template>
