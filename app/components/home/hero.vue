<script lang="ts" setup>
	const { home } = defineProps<{ home: any }>()

	const screen = useWindowSize()
	const hero = ref<HTMLElement>()

	const settingMode = ref(false)
	const imageSrc = ref('')

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

	const onMouseDown = (event: MouseEvent) => {
		if (settingMode.value) {
			initialMouseOffsetY.value = event.offsetY - bgPosition.y
			bgDrag.value = true
		}
	}

	function initValues() {
		imageSrc.value = home.value?.cover_image
		bgPosition.y = -(home.value?.y_axis || 0)
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

	watch(home, () => {
		initValues()
	})
</script>

<template>
	<div
		ref="hero"
		class="relative py-[25%] shadow-lg"
		:class="{ 'active:cursor-move': settingMode }"
		:style="[`background-position: 0 ${getAdjustedImage()}%`, `background-image: url(${imageSrc})`]"
		@mousemove="onMouseMove"
		@mousedown="onMouseDown"
		@mouseup="bgDrag = false"
		@mouseleave="bgDrag = false"
	>
		<ImageLoader v-if="!imageSrc" size="text-5xl"></ImageLoader>
	</div>
</template>
