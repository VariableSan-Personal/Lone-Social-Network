<script setup lang="ts">
	import { ref } from 'vue'
	import type { SocialLink } from '~/shared'

	const imageSrc = ref('')
	const email = ''
	const socialLinks: SocialLink[] = []
</script>

<template>
	<div
		class="top-44 left-0 transform rounded-md p-4 shadow-2xl lg:sticky lg:h-64 lg:-translate-y-10 lg:transform-none lg:p-0"
	>
		<div
			class="relative mx-auto h-36 w-36 transform overflow-hidden rounded-full border-5 lg:-mb-20 lg:-translate-y-20"
		>
			<img class="inline-block h-full w-full" :src="imageSrc" />
		</div>

		<div class="px-2 py-4 text-center text-lg">
			<p>{{ $t('about.fullname') }}</p>
		</div>

		<ul class="divide-y divide-gray-300 dark:divide-gray-100">
			<li>
				<a class="flex items-center p-3" :href="`mailto:${email}`" target="_blank">
					<span class="iconify" data-icon="mdi:email"></span>
					<span class="ml-3 inline-block">E-mail</span>
				</a>
			</li>

			<li v-for="(link, index) in socialLinks" :key="index">
				<a class="flex items-center p-3" :href="link.href" target="_blank">
					<span class="iconify" :data-icon="link.icon"></span>
					<span class="ml-3 inline-block">{{ link.title }}</span>
				</a>
			</li>
		</ul>
	</div>
</template>
