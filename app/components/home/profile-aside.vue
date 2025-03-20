<script setup lang="ts">
	import type { SocialLink } from '~/shared'

	defineProps<
		Partial<{
			profileImage: string
			email: string
			socialLinks: SocialLink[]
			loading: boolean
		}>
	>()
</script>

<template>
	<div
		class="wrapper top-52 left-0 h-max transform rounded-md p-4 drop-shadow-xl lg:sticky lg:transform-none lg:p-0"
	>
		<div
			class="image-cover relative mx-auto h-36 w-36 transform overflow-hidden rounded-full border-5 lg:-mb-20 lg:-translate-y-20"
		>
			<USkeleton v-if="loading" class="h-full w-full" />
			<img v-else class="inline-block h-full w-full object-cover object-top" :src="profileImage" />
		</div>

		<div class="px-2 py-4 text-center text-lg">
			<p>{{ $t('about.fullname') }}</p>
		</div>

		<ul class="divide-y divide-gray-300 dark:divide-gray-100">
			<template v-if="loading">
				<USkeleton v-for="item in 3" :key="item" class="h-8 w-full" />
			</template>

			<template v-else>
				<li>
					<a class="flex items-center p-3" :href="`mailto:${email}`" target="_blank">
						<Icon name="lucide:mail" />
						<span class="ml-3 inline-block">E-mail</span>
					</a>
				</li>
				<li v-for="(link, index) in socialLinks" :key="index">
					<a class="flex items-center p-3" :href="link.href" target="_blank">
						<Icon :name="link.icon" />
						<span class="ml-3 inline-block">{{ link.title }}</span>
					</a>
				</li>
			</template>
		</ul>
	</div>
</template>

<style scoped>
	.wrapper {
		background-color: var(--ui-bg);
	}

	.image-cover {
		background-color: var(--ui-bg);
	}
</style>
