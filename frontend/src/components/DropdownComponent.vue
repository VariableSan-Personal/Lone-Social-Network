<script setup lang='ts'>
import { defineProps, ref } from 'vue'
import type { TLink } from '~/helpers/types/Link.type'

const activator = ref(false)

defineProps({
  title: {
    default: 'Options',
  },

  list: {
    default: Array<TLink>(),
  },

  triggerClass: {
    default: '',
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
          <span>{{ title }}</span>
          <mdi:menu-down class="mt-1"></mdi:menu-down>
        </slot>
      </button>

      <div
        class="transition-all duration-300 transform origin-top-right"
        :class="activator ? 'translate-y-0 scale-100 opacity-100' : 'opacity-0 invisible -translate-y-2 scale-95'"
      >
        <div
          class="absolute right-0 w-56 mt-2 bg-black border border-black origin-top-right divide-y divide-gray-100 rounded-md shadow-lg outline-none"
        >
          <slot name="headline"></slot>

          <slot name="list">
            <router-link
              v-for="(item, index) in list"
              :key="index"
              :to="item.href"
              class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
            >
              {{ item.title }}
            </router-link>
          </slot>
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
