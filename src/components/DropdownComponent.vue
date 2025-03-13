<script setup lang='ts'>
import { defineProps, ref } from 'vue'

const activator = ref(false)

defineProps({
  title: {
    type: [String, Boolean],
    default: 'Options',
  },

  triggerClass: {
    default: '',
  },

  dropItemClass: {
    default: 'bg-white border-white dark:bg-black dark:border-black',
  },
})
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="relative">
      <button
        :class="triggerClass"
        class="focus:outline-none"
        @blur="activator = false"
        @click="activator = !activator"
      >
        <slot name="trigger" :activator="activator">
          <div v-if="title">
            <span>{{ title }}</span>
            <mdi:menu-down class="mt-1"></mdi:menu-down>
          </div>
        </slot>
      </button>

      <div
        class="transition-all duration-300 transform origin-top-right"
        :class="activator ? 'translate-y-0 scale-100 opacity-100' : 'opacity-0 invisible -translate-y-2 scale-95'"
      >
        <div
          class="absolute right-0 w-56 z-50 mt-2 border origin-top-right divide-y divide-gray-100 rounded-md shadow-lg outline-none"
          :class="dropItemClass"
        >
          <slot name="headline"></slot>

          <slot name="list"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>
