<script setup lang='ts'>
import { useHead } from '@vueuse/head'

useHead({
  title: 'Lone Social Network',
  meta: [
    { name: 'description', content: 'Lone Social Network Template' },
  ],
})
</script>

<template>
  <router-view></router-view>
</template>
