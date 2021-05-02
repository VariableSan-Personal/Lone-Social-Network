<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { home, imageLoader, URL } from '~/logic'

const hero = ref<HTMLElement>()
const fileInput = ref<HTMLElement>()

const settingMode = ref(false)
const imageSrc = ref('')
const lastImageSrc = ref('')

const bgPosition = reactive({
  x: 0,
  y: 0,
  percentY() {
    const value = -(this.y * 100 / (hero.value?.offsetHeight || 380))

    return value > 100 ? 100 : value < 0 ? 0 : value
  },
})
const lastBgPosition = {
  x: 0,
  y: 0,
}
const bgDrag = ref(false)
const initialMouseOffsetY = ref(0)

watch(home, () => {
  imageSrc.value = URL.assets(home.value?.cover_image.id || '')
  bgPosition.y = -(home.value?.y_axis || 0)
})

const onMouseMove = (event: MouseEvent) => {
  if (bgDrag.value)
    bgPosition.y = -(initialMouseOffsetY.value - event.offsetY)
}

const onMouseDown = (event: MouseEvent) => {
  if (settingMode.value) {
    initialMouseOffsetY.value = event.offsetY - bgPosition.y
    bgDrag.value = true
  }
}

const onFileChange = (progressEvent: ProgressEvent<FileReader>) => {
  settingMode.value = true
  saveLastValue()
  imageSrc.value = progressEvent.target?.result as string
}

const onCancel = () => {
  settingMode.value = false

  const { x, y } = lastBgPosition
  bgPosition.x = x
  bgPosition.y = y

  imageSrc.value = lastImageSrc.value
}

const onAdjust = () => {
  settingMode.value = true
  saveLastValue()
}

function saveLastValue() {
  const { x, y } = bgPosition
  lastBgPosition.x = x
  lastBgPosition.y = y
  lastImageSrc.value = imageSrc.value
}
</script>

<template>
  <div
    ref="hero"
    class="hero bg--default"
    :class="{ 'active:cursor-move': settingMode }"
    :style="[`background-position: 0 ${bgPosition.percentY()}%`, `background-image: url(${imageSrc})`]"
    @mousemove="onMouseMove"
    @mousedown="onMouseDown"
    @mouseup="bgDrag = false"
    @mouseleave="bgDrag = false"
  >
    <div v-if="!imageSrc" class="absolute top-0 left-0 flex justify-center items-center w-full h-full">
      <whh:loadingalt class="text-5xl animate-spin"></whh:loadingalt>
    </div>

    <div class="container absolute inset-0 top-1/8">
      <div class="flex justify-end">
        <DropdownComponent :title="false">
          <template v-if="!settingMode" #trigger>
            <div
              class="btn hero__btn bg-cool-gray-500 hover:bg-cool-gray-600 focus:bg-cool-gray-600"
            >
              Edit cover photo
            </div>
          </template>

          <template #list>
            <button class="hero__edit" @click="fileInput?.click()">
              <span>Upload image</span>
              <mdi:upload></mdi:upload>
            </button>

            <button class="hero__edit" @click="onAdjust">
              <span>Adjust image</span>
              <mdi:cursor-move></mdi:cursor-move>
            </button>
          </template>
        </DropdownComponent>

        <div v-if="settingMode" class="flex">
          <button
            class="btn hero__btn bg-green-500 hover:bg-green-600 focus:bg-green-600"
            @click="settingMode = false"
          >
            Save changes
          </button>

          <button
            class="btn hero__btn bg-red-500 hover:bg-red-600 focus:bg-red-600"
            @click="onCancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <input
    ref="fileInput"
    class="hidden"
    type="file"
    accept="image/*"
    @change="imageLoader($event, onFileChange)"
  />
</template>

<style lang="postcss">
.hero {
  @apply relative;
  padding: 15% 0;

  &__btn {
    @apply uppercase bg-opacity-500;

    &:not(:last-child) {
      @apply mr-4;
    }
  }

  &__edit {
    @apply flex justify-between items-center w-full p-4 text-sm text-left;

    &:focus {
      @apply outline-none;
    }
  }
}
</style>
