<script setup lang='ts'>
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TTab } from '~/helpers/types/Tab.type'

const { t } = useI18n()

defineProps({
  tabs: {
    default: [] as TTab[],
  },

  currentTab: {
    default: 0,
  },

  wrapperClass: {
    default: '',
  },
})
</script>

<template>
  <nav>
    <ul class="flex mb-4">
      <li v-for="(tab, index) in tabs" :key="index">
        <button
          class="link--default py-4 px-6 block"
          :class="{ 'border-b-2 font-medium border-warm-gray-400': index === currentTab }"
          @click="$emit('update:currentTab', index)"
        >
          {{ t(tab.title) }}
        </button>
      </li>
    </ul>

    <div :class="wrapperClass">
      <component :is="tabs[currentTab].component"></component>
    </div>
  </nav>
</template>
