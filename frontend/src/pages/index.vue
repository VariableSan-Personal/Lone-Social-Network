<script setup lang='ts'>
import { getCurrentInstance, onMounted } from 'vue'
import { DashHomeService, home } from '~/logic'

const instance = getCurrentInstance()
const dashHomeService = new DashHomeService(instance)

onMounted(async() => {
  try {
    const response = await dashHomeService.getHomeData()

    home.value = response
  }
  catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <HeroComponent></HeroComponent>

  <div class="container">
    <div class="flex flex-wrap items-start">
      <ProfileAside class="w-9/12 mx-auto lg:w-1/4"></ProfileAside>

      <div class="w-full lg:w-3/4 pl-4 some">
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
