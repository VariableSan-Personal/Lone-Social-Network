<script lang="ts" setup>
	const props = defineProps<
		Partial<{
			coverImage: string
			xAxis?: number
			yAxis?: number
		}>
	>()

	const xPosition = computed(() => `${props.xAxis ?? 50}%`)
	const yPosition = computed(() => `${props.yAxis ?? 50}%`)
</script>

<template>
	<div
		class="relative bg-cover bg-fixed bg-no-repeat py-[15%] shadow-lg"
		:style="{
			backgroundImage: `url(${coverImage})`,
			backgroundPosition: `${xPosition} ${yPosition}`,
		}"
	></div>
</template>
