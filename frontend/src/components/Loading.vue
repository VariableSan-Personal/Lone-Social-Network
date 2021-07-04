<script setup lang='ts'>
import { loading } from '~/logic'
</script>

<template>
  <div v-if="loading" class="fixed z-9999 inset-0">
    <div
      class="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-70"
    >
      <whh:loadingflowcw class="text-9xl animate-spin"></whh:loadingflowcw>
    </div>
  </div>
</template>
