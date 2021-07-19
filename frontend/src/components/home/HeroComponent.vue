<script lang="ts" setup>
import { isEmpty } from 'lodash'
import { getCurrentInstance, onBeforeMount, reactive, ref, watch } from 'vue'
import { useScreen } from 'vue-screen'
import { getAsset, home, imageLoader, user } from '~/logic'

/* ==================== variables START ==================== */
const screen = useScreen()
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

const instance = getCurrentInstance()
/* ==================== variables END ==================== */

/* ==================== hooks START ==================== */
watch(home, () => {
  initValues()
})

onBeforeMount(() => {
  if (!isEmpty(home.value))
    initValues()
})
/* ==================== hooks END ==================== */

/* ==================== methods START ==================== */
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
/* ==================== methods END ==================== */

/* ==================== helpers START ==================== */
function initValues() {
  imageSrc.value = getAsset((home.value?.cover_image.id || ''), instance)
  bgPosition.y = -(home.value?.y_axis || 0)
}

function saveLastValue() {
  const { x, y } = bgPosition
  lastBgPosition.x = x
  lastBgPosition.y = y
  lastImageSrc.value = imageSrc.value
}

function getAdjustedImage() {
  let percent = bgPosition.percentY()
  const { width } = screen

  if (width < 320)
    percent -= 30
  else if (width < 640)
    percent -= 20
  else if (width < 768)
    percent -= 25
  else if (width < 1024)
    percent -= 10
  else if (width < 1280)
    percent -= 5

  return percent
}
/* ==================== helpers END ==================== */
</script>

<template>
  <div
    ref="hero"
    class="hero bg--default"
    :class="{ 'active:cursor-move': settingMode }"
    :style="[`background-position: 0 ${getAdjustedImage()}%`, `background-image: url(${imageSrc})`]"
    @mousemove="onMouseMove"
    @mousedown="onMouseDown"
    @mouseup="bgDrag = false"
    @mouseleave="bgDrag = false"
  >
    <ImageLoader v-if="!imageSrc" size="text-5xl"></ImageLoader>

    <div v-if="user?.role.admin_access" class="container absolute inset-0 top-1/8">
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
  @apply relative shadow-lg;
  padding: 25% 0;
  @screen sm {
    padding: 15% 0;
  }

  &__btn {
    @apply uppercase bg-opacity-50;

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
