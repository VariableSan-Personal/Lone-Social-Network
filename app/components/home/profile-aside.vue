<script setup lang="ts">
	import { ref } from 'vue'

	const imageSrc = ref('')
</script>

<template>
	<div
		class="top-44 left-0 -translate-y-5 transform rounded-md shadow-2xl sm:-translate-y-10 lg:sticky lg:transform-none h-64"
	>
		<div class="group border-cool-gray-50 dark:border-cool-gray-700">
			<!-- <ImageLoader v-if="!imageSrc" size="text-2xl"></ImageLoader> -->

			<img :src="imageSrc" />
		</div>

		<div class="px-2 py-4 text-center text-lg">
			<p>{{ $t('about.fullname') }}</p>
		</div>

		<!-- <SocialLinks></SocialLinks> -->
	</div>
</template>
