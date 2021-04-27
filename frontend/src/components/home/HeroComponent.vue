<script lang="ts" setup>
import { reactive, ref } from 'vue'
import mockFileSrc from '~/../public/mock-image.jpg'

const hero = ref<HTMLElement>()
const fileInput = ref<HTMLElement>()

const settingMode = ref(false)
const imageSrc = ref(mockFileSrc)
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

const onFileChange = (event: Event) => {
  const el = event.currentTarget as HTMLInputElement

  const fileList: FileList | null = el.files

  if (fileList) {
    const file = fileList.item(0)
    const fileExt = file?.name.slice(file.name.lastIndexOf('.'))

    const allowedExtensions = ['png', 'jpeg', 'jpg']

    if (allowedExtensions.includes(fileExt?.slice(1) || '')) {
      settingMode.value = true

      const reader = new FileReader()
      reader.readAsDataURL(file as Blob)

      reader.onload = (progresEvent: ProgressEvent<FileReader>) => {
        saveLastValue()
        imageSrc.value = progresEvent.target?.result as string
      }
    }
  }
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

  <input ref="fileInput" class="hidden" type="file" accept="image/*" @change="onFileChange" />
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
