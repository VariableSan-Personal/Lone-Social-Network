<script setup lang='ts'>
import { defineProps } from 'vue'
import type { TTab } from '~/helpers/types/Tab.type'

defineProps({
  tabs: {
    default: [] as TTab[],
  },
})
</script>

<template>
  <nav class="flex flex-col sm:flex-row">
    <div v-for="(tab, index) in tabs" :key="index">
      <button
        class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
        :class="{ 'text-blue-500 border-b-2 font-medium border-blue-500': true }"
      >
        {{ tab.title }}
      </button>

      <component :is="tab.component"></component>
    </div>
  </nav>
</template>
