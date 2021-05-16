<script setup lang='ts'>
import { onMounted } from 'vue'
import { home, getHomeData } from '~/logic'

onMounted(async() => {
  const response = await getHomeData()

  home.value = response.data.data
})
</script>

<template>
  <HeroComponent></HeroComponent>

  <div class="container">
    <div class="flex flex-wrap items-start">
      <ProfileAside class="w-1/4"></ProfileAside>

      <div class="w-3/4 pl-4 some">
        <h1>some_text</h1>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.some {
  height: 200vh;
}
</style>
