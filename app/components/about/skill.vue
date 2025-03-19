<script setup lang="ts">
	import type { Skill } from '~/shared'

	withDefaults(defineProps<{ skills?: Skill[]; loading?: boolean }>(), {
		skills: () => [],
	})
</script>

<template>
	<section>
		<h2 class="headline">
			{{ $t('about.skills') }}
		</h2>

		<div class="flex flex-wrap gap-2">
			<template v-if="loading">
				<USkeleton v-for="n in 8" :key="n" class="h-6 w-20" />
			</template>

			<template v-else>
				<UBadge
					v-for="(skill, index) in skills"
					:key="index"
					color="primary"
					variant="soft"
					size="lg"
				>
					{{ skill }}
				</UBadge>
			</template>
		</div>
	</section>
</template>
