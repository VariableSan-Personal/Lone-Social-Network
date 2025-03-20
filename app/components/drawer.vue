<script setup lang="ts">
	import { useI18n } from 'vue-i18n'
	import { LINKS } from '~/shared'

	const { t } = useI18n()
	const { drawer } = storeToRefs(useGlobalStore())
</script>

<template>
	<nav
		:class="drawer ? 'translate-x-0' : '-translate-x-full'"
		class="bg-drawer fixed top-0 left-0 z-30 min-h-full w-7/12 transform px-4 py-12 transition-all duration-300 ease-in-out sm:w-64"
	>
		<ul class="space-y-4">
			<li v-for="(link, index) in LINKS" :key="index">
				<NuxtLink
					tabindex="-1"
					class="duration block rounded-lg p-2 transition-colors"
					exact-active-class="bg-gray-300 font-bold text-black"
					:to="{ name: link.name }"
					@click="drawer = false"
				>
					{{ t(link.title) }}
				</NuxtLink>
			</li>
		</ul>
	</nav>

	<transition
		enter-from-class="opacity-0"
		enter-active-class="ease-out transition-medium"
		enter-to-class="opacity-100"
		leave-class="opacity-100"
		leave-active-class="ease-out transition-medium"
		leave-to-class="opacity-0"
	>
		<div v-show="drawer" class="fixed inset-0 z-20 cursor-pointer transition-opacity">
			<div class="absolute inset-0 bg-black opacity-50" tabindex="0" @click="drawer = false" />
		</div>
	</transition>
</template>

<style scoped>
	.bg-drawer {
		background-color: var(--ui-neutral);
	}
</style>
