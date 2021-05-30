<script setup lang='ts'>
import { defineProps, getCurrentInstance, onBeforeUnmount, onMounted } from '@vue/runtime-core'

const instance = getCurrentInstance()

defineProps({
  showWindow: {
    type: Boolean,
    default: false,
  },

  blockClass: {
    type: String,
    defaul: '',
  },
})

onMounted(() => {
  document.addEventListener('keyup', keyInit)
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', keyInit)
})

function keyInit(e: KeyboardEvent) {
  if (e.which === 27)
    instance?.emit('update:showWindow', false)
}
</script>

<template>
  <transition
    enter-from-class="opacity-0"
    enter-active-class="ease-out transition-medium"
    enter-to-class="opacity-100"
    leave-class="opacity-100"
    leave-active-class="ease-out transition-medium"
    leave-to-class="opacity-0"
  >
    <div v-if="showWindow" :class="blockClass" class="fixed inset-0 z-10 transition-opacity">
      <div
        class="modal-window__cover absolute inset-0 bg-black opacity-50 cursor-pointer"
        tabindex="-1"
        @click="$emit('update:showWindow', false)"
      ></div>

      <slot name="content"></slot>
    </div>
  </transition>
</template>

<style lang="postcss">
.modal-window {
  &__cover {
    z-index: -1;
  }
}
</style>
