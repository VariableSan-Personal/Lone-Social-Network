<script lang="ts" setup>
import { reactive, ref } from 'vue'

const hero = ref<HTMLElement>()

const bgPosition = reactive({
  x: 0,
  y: 0,
  percentY() {
    const value = -(this.y * 100 / (hero.value?.offsetHeight || 380))

    return value > 100 ? 100 : value < 0 ? 0 : value
  },
})
const bgDrag = ref(false)
const initialMouseOffsetY = ref(0)

const onMouseMove = (event: MouseEvent) => {
  if (bgDrag.value)
    bgPosition.y = -(initialMouseOffsetY.value - event.offsetY)
}
</script>

<template>
  <div
    ref="hero"
    class="hero bg--default"
    style="background-image: url('https://i.pinimg.com/originals/d9/e6/5c/d9e65c99f9063d54ea6820f4227aed27.jpg')"
    :style="`background-position: 0 ${bgPosition.percentY()}%`"
    @mousemove="onMouseMove"
    @mousedown="initialMouseOffsetY = $event.offsetY - bgPosition.y; bgDrag = true"
    @mouseup="bgDrag = false"
    @mouseleave="bgDrag = false"
  >
    <div class="container absolute inset-0 top-1/8">
      <div class="flex justify-end">
        <button class="btn uppercase bg-cool-gray-500 bg-opacity-500">
          Change image
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.hero {
  @apply relative;
  padding: 12.5% 0;

  &:active {
    @apply cursor-move;
  }
}
</style>
