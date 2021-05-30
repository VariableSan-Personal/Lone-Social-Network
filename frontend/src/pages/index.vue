<script setup lang='ts'>
import { getCurrentInstance, onMounted } from 'vue'
import { isEmpty } from 'lodash'
import { DashHomeService, home } from '~/logic'

const instance = getCurrentInstance()

const getHomeData = async() => {
  if (isEmpty(home.value)) {
    const dashHomeService = new DashHomeService(instance)

    try {
      const response = await dashHomeService.getHomeData()

      home.value = response
    }
    catch (error) {
      console.error(error)
    }
  }
}

onMounted(() => {
  getHomeData()
})
</script>

<template>
  <HeroComponent></HeroComponent>

  <div class="container">
    <div class="flex flex-wrap items-start">
      <ProfileAside class="w-9/12 mx-auto lg:w-1/4"></ProfileAside>

      <div class="w-full lg:w-3/4 pl-4 some">
        <h1>Content</h1>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.some {
  height: 200vh;
}
</style>
