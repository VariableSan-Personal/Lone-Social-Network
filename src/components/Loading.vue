<script setup lang='ts'>
import { loading } from '~/logic'
</script>

<template>
  <transition name="fade">
    <div v-if="loading" class="fixed z-9999 inset-0">
      <div
        class="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-70"
      >
        <whh:loadingflowcw class="text-9xl animate-spin"></whh:loadingflowcw>
      </div>
    </div>
  </transition>
</template>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
