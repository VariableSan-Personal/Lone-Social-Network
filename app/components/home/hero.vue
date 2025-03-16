<script setup lang="ts">
	const randomCodeSnippet = (index: number) => {
		const snippets = [
			'const app = createApp({...})',
			'export default defineComponent({...})',
			"await useFetch('/api/data')",
			'<div class="flex items-center justify-between">',
			'function useCustomHook() { return { ... } }',
			"const { data } = await useAsyncData('posts')",
			'const routes = useRouter().getRoutes()',
			'watch(() => props.value, (newVal) => { ... })',
			'const state = reactive({ count: 0 })',
			'<template><client-only>...</client-only></template>',
			'onMounted(() => { ... })',
			'const store = useStore()',
			"const { data: user } = useFetch('/api/user')",
			'return { props, setup() { ... } }',
			"useHead({ title: 'Portfolio' })",
		]

		return snippets[index % snippets.length]
	}
</script>

<template>
	<div class="relative flex overflow-hidden bg-gray-900 px-12 py-16">
		<div
			class="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-700 to-blue-800 opacity-80"
		></div>

		<div class="absolute inset-0 opacity-10">
			<div class="h-full overflow-hidden p-8 font-mono text-2xl text-white">
				<div v-for="i in 15" :key="i" class="mb-2">
					{{ randomCodeSnippet(i) }}
				</div>
			</div>
		</div>

		<div class="relative z-[1] w-full">
			<div class="flex w-full justify-center lg:justify-end">
				<div class="max-w-3xl space-y-3">
					<h1 class="title text-4xl font-bold tracking-tight md:text-6xl">
						{{ $t('home.banner.title') }}
					</h1>
					<p class="text-xl text-gray-100">
						{{ $t('home.banner.subtitle') }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.title {
		color: var(--ui-primary);
	}
</style>
