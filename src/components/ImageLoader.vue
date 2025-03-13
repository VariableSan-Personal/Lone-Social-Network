<script setup lang="ts">
import { defineProps } from '@vue/runtime-core'

defineProps({
  size: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="absolute top-0 left-0 flex justify-center items-center w-full h-full">
    <whh:loadingalt :class="size" class="animate-spin"></whh:loadingalt>
  </div>
</template>
