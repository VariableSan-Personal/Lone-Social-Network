<script lang="ts" setup>
	defineProps<
		Partial<{
			coverImage: string
			xAxis: number
			yAxis: number
		}>
	>()

	const screen = useWindowSize()
	const hero = ref<HTMLElement>()

	const bgPosition = reactive({
		x: 0,
		y: 0,
		percentY() {
			const value = -((this.y * 100) / (hero.value?.offsetHeight || 380))
			return value > 100 ? 100 : value < 0 ? 0 : value
		},
	})

	const bgDrag = ref(false)
	const initialMouseOffsetY = ref(0)

	const onMouseMove = (event: MouseEvent) => {
		if (bgDrag.value) bgPosition.y = -(initialMouseOffsetY.value - event.offsetY)
	}

	function getAdjustedImage() {
		let percent = bgPosition.percentY()
		const { width } = screen

		if (width.value < 320) percent -= 30
		else if (width.value < 640) percent -= 20
		else if (width.value < 768) percent -= 25
		else if (width.value < 1024) percent -= 10
		else if (width.value < 1280) percent -= 5

		return percent
	}
</script>

<template>
	<div
		class="relative py-[15%] bg-cover bg-fixed bg-no-repeat shadow-lg"
		:style="[
			`background-position: 0 ${getAdjustedImage()}%`,
			`background-image: url(${coverImage})`,
		]"
		@mousemove="onMouseMove"
		@mouseup="bgDrag = false"
		@mouseleave="bgDrag = false"
	></div>
</template>
